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
  usedVars: Map<string, unknown>,
  hasOrTypeValues: Set<string>
) {
  const _filter = compileFilter(filter, usedVars, hasOrTypeValues);
  const _cascade = compileCascade(cascade, hasOrTypeValues);
  const _order = compileOrder(order, hasOrTypeValues);
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
  usedVars: Map<string, unknown>,
  hasOrTypeValues: Set<string>
) {
  const _mainFunc = compileFilter(mainFunc, usedVars, hasOrTypeValues);
  if (!_mainFunc) throw Error("Cannot query without main function");

  const funcDeclaration: (string | undefined)[] = [`func: ${_mainFunc}`];
  funcDeclaration.push(compileOrder(order, hasOrTypeValues));
  funcDeclaration.push(compilePage(page));

  return funcDeclaration.filter((v) => !!v).join(", ");
}

export function compileCascade(
  cascade: Query["cascade"],
  hasOrTypeValues: Set<string>
) {
  const cascadeStr = "@cascade";
  if (typeof cascade === "boolean") return cascadeStr;
  if (typeof cascade === "string" && hasOrTypeValues.has(cascade))
    return cascadeStr + `(${cascade})`;
  return;
}

export function compileFilter(
  filter: Query["filter"],
  usedVars: Map<string, unknown>,
  hasOrTypeValues: Set<string>
): string | undefined {
  if (!filter) return;

  if ("connector" in filter) {
    const filters = filter.values
      .map((v) => compileFilter(v, usedVars, hasOrTypeValues))
      .filter((v) => !!v);
    if (!filters.length) return;

    const joined = filters.join(` ${filter.connector.toUpperCase()} `);
    if (filters.length > 1) return `(${joined})`;

    return joined;
  }
  if ("not" in filter) {
    const _filter = compileFilter(filter.not, usedVars, hasOrTypeValues);
    if (!_filter) return;
    return `NOT(${_filter})`;
  }

  const parsed = parseFilter(filter, usedVars, hasOrTypeValues);
  if (!parsed) return;
  return parsed;
}

export function compilePage(page: Query["page"]) {
  if (!page) return;

  return `first: ${page.limit ?? defaultListLimit}, offset: ${
    page.offset ?? 0
  }`;
}

export function compileOrder(
  orders: Query["order"],
  hasOrTypeValues: Set<string>
) {
  if (!orders) return;

  const _orders: string[] = [];
  for (const order of orders) {
    if (!order || !hasOrTypeValues.has(order.field)) continue;
    _orders.push(`order${order.format ?? "asc"}: ${order.field}`);
  }
  return _orders.join(", ");
}
