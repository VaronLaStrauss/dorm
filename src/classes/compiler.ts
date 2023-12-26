import { Forward, QueryOpts, RelationsRecord, Reverse, TypeRecord } from ".";
import { Query, defaultListLimit } from "../query-schema";
import { parseFilter } from "../utils";

export type FilterReturn = { node: string; usedVars: Set<string> };

export function forwardReverseType(
  typeName: string,
  predKey: string,
  relation: Forward | Reverse,
  alias?: string,
  asVar?: string
) {
  const forward = relation instanceof Forward;
  let type = `${alias ?? predKey}: `;
  if (forward) type += `${typeName}.${predKey}`;
  else type += `<~${relation.type.name}.${relation.field}>`;
  if (asVar) type += ` as ${asVar}`;
  return type;
}

export function compileDirectives(
  { cascade, filter, order, page }: Query,
  usedVars: Map<string, unknown>
) {
  const _filter = compileFilter(filter, usedVars);
  const _cascade = compileCascade(cascade);
  const _order = compileOrder(order);
  const _page = compilePage(page);

  const directives: (string | undefined)[] = [
    _filter ? `@filter(${_filter})` : undefined,
    _order ? `(${_order})` : undefined,
    _page ? `(${_page})` : undefined,
    _cascade,
  ];

  return directives.filter((v) => !!v).join(" ");
}

export function compileMainFunc<TR extends TypeRecord>(
  { mainFunc, order, page }: QueryOpts<TR, RelationsRecord<TR>, keyof TR>,
  usedVars: Map<string, unknown>
) {
  const _mainFunc = compileFilter(mainFunc, usedVars);
  if (!_mainFunc) throw Error("Cannot query without main function");

  const funcDeclaration: (string | undefined)[] = [`func: ${_mainFunc}`];
  funcDeclaration.push(compileOrder(order));
  funcDeclaration.push(compilePage(page));

  return funcDeclaration.filter((v) => !!v).join(", ");
}

export function compileCascade(cascade: Query["cascade"]) {
  const cascadeStr = "@cascade";
  if (typeof cascade === "boolean") return cascadeStr;
  if (typeof cascade === "string") return cascadeStr + `(${cascade})`;
  return;
}

export function compileFilter(
  filter: Query["filter"],
  usedVars: Map<string, unknown>
): string | undefined {
  if (!filter) return;

  if ("connector" in filter) {
    const filters = filter.values
      .map((v) => compileFilter(v, usedVars))
      .filter((v) => !!v);
    if (!filters.length) return;

    const joined = filters.join(` ${filter.connector.toUpperCase()} `);
    if (filters.length > 1) return `(${joined})`;

    return joined;
  }
  if ("not" in filter) {
    const _filter = compileFilter(filter.not, usedVars);
    if (!_filter) return;
    return `NOT(${_filter})`;
  }

  const parsed = parseFilter(filter, usedVars);
  if (!parsed) return;
  return parsed;
}

export function compilePage(page: Query["page"]) {
  if (!page) return;

  return `first: ${page.limit ?? defaultListLimit}, offset: ${
    page.offset ?? 0
  }`;
}

export function compileOrder(orders: Query["order"]) {
  if (!orders) return;

  const _orders: string[] = [];
  for (const order of orders) {
    if (!order) continue;
    _orders.push(`order${order.format ?? "asc"}: ${order.field}`);
  }
  return _orders.join(", ");
}
