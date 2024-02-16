import type { FilterFull, RecurseOpts } from "../filter";
import type { Fragment } from "../fragment";
import type { DNode } from "../node";
import type { Query } from "../query";
import { parseFilter } from "./filter.parser";

export type FilterReturn = { node: string; usedVars: Set<string> };

export function compileDirectives(
  { cascade, filter, order, page }: FilterFull,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  const _filter = compileFilter(filter, usedVars, allowedValues);
  const _cascade = compileCascade(cascade, allowedValues);
  const _order = compileOrder(order, allowedValues);
  const _page = compilePage(page);

  const directives: (string | undefined)[] = [
    _filter ? `@filter(${_filter})` : undefined,
    _order ? `(${_order})` : undefined,
    _page ? `(${_page})` : undefined,
    _cascade,
  ];

  return directives.filter((v) => !!v).join(" ");
}

export function compileMainFunc(
  { mainFunc, order, page }: Query<DNode, Fragment<DNode>>,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  const _mainFunc = compileFilter(mainFunc, usedVars, allowedValues);
  if (!_mainFunc) throw Error("Cannot query without main function");

  const funcDeclaration: (string | undefined)[] = [`func: ${_mainFunc}`];
  funcDeclaration.push(compileOrder(order, allowedValues));
  funcDeclaration.push(compilePage(page));

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
    if (filters.length > 1) return `(${joined})`;

    return joined;
  }
  if ("not" in filter) {
    const _filter = compileFilter(filter.not, usedVars, allowedValues);
    if (!_filter) return;
    return `NOT(${_filter})`;
  }

  const parsed = parseFilter(filter, usedVars, allowedValues);
  if (!parsed) return;
  return parsed;
}

export function compilePage(page: FilterFull["page"]) {
  if (!page) return;
  const { limit, offset } = page;
  const _page = [];
  _page.push(limit ? `first: ${limit} ` : "");
  _page.push(offset ? `offset: ${offset} ` : "");

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

export function compileRecurse(opts: RecurseOpts) {
  return typeof opts === "boolean"
    ? `@recurse`
    : `@recurse(loop: ${opts.loop}, depth: ${opts.depth})`;
}

export function compileAsVar(asVar?: string, allowedValues?: Set<string>) {
  const _asVar = asVar ? `${asVar} as ` : " ";
  if (asVar && allowedValues) allowedValues.add(asVar);
  return _asVar;
}
