import type { FilterFull } from "../filter";
import type { QueryOpts } from "../query";
import { parseFilter, parseFilterValue } from "./filter.parser";

export type FilterReturn = { node: string; usedVars: Set<string> };

export function compileDirectives(
  { cascade, filter, order, page }: FilterFull,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  const _filter = compileFilter(filter, usedVars, allowedValues);
  const _cascade = compileCascade(cascade, allowedValues);
  const _order = compileOrder(order, allowedValues);
  const _page = compilePage(page, usedVars, allowedValues);

  const directives: (string | undefined)[] = [
    _filter ? `@filter(${_filter})` : undefined,
    _order ? `(${_order})` : undefined,
    _page ? `(${_page})` : undefined,
    _cascade,
  ];

  return directives.filter((v) => !!v).join(" ");
}

export function compileMainFunc(
  { mainFunc, order, page }: QueryOpts,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  const _mainFunc = compileFilter(mainFunc, usedVars, allowedValues);
  if (!_mainFunc) throw Error("Cannot query without main function");

  const funcDeclaration: (string | undefined)[] = [`func: ${_mainFunc}`];
  funcDeclaration.push(compileOrder(order, allowedValues));
  funcDeclaration.push(compilePage(page, usedVars, allowedValues));

  return funcDeclaration.filter((v) => !!v).join(", ");
}

export function compileCascade(
  cascade: FilterFull["cascade"],
  allowedValues: Set<string>
) {
  const cascadeStr = "@cascade";
  if (typeof cascade === "boolean") return cascadeStr;
  if (typeof cascade === "string" && allowedValues.has(cascade))
    return cascadeStr + `(${cascade})`;
  return;
}

export function compileFilter(
  filter: FilterFull["filter"],
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
): string | undefined {
  if (!filter) return;

  if ("connector" in filter) {
    const filters = filter.values
      .map((v) => compileFilter(v, usedVars, allowedValues))
      .filter((v) => !!v);
    if (!filters.length) return;

    const joined = filters.join(` ${filter.connector.toUpperCase()} `);
    if (filters.length > 1)
      return filter.not ? `NOT(${joined})` : `(${joined})`;
    return joined;
  }

  const parsed = parseFilter(filter, usedVars, allowedValues);
  if (!parsed) return;
  return filter.not ? `NOT(${parsed})` : parsed;
}

export function compilePage(
  page: FilterFull["page"],
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  if (!page) return;

  const _page = [];

  if ("limit" in page)
    _page.push(
      `first: ${parseFilterValue(page.limit, usedVars, allowedValues)}`
    );
  if ("offset" in page)
    _page.push(
      `offset: ${parseFilterValue(page.offset, usedVars, allowedValues)}`
    );
  if ("after" in page)
    _page.push(
      `after: ${parseFilterValue(page.after, usedVars, allowedValues)}`
    );

  return _page.filter((v) => !!v).join(", ");
}

export function compileOrder(
  orders: FilterFull["order"],
  allowedValues: Set<string>
) {
  if (!orders) return;
  const _orders: string[] = [];

  for (const order of orders) {
    if (!order || !allowedValues.has(order.field)) continue;
    _orders.push(`order${order.format ?? "asc"}: ${order.field}`);
  }

  return _orders.join(", ");
}

export function compileAsVar(asVar?: string, allowedValues?: Set<string>) {
  const _asVar = asVar ? `${asVar} as ` : " ";
  if (asVar && allowedValues) allowedValues.add(asVar);
  return _asVar;
}
