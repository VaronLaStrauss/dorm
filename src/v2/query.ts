import { parseDqlType } from "./compiler/dql-type.parser";
import { compileDirectives, compileMainFunc } from "./compiler/filter.compiler";
import type { FilterEdge, FilterFull } from "./filter";
import type { Fragment, FragmentReturn } from "./fragment";
import type { DNode } from "./node";
import type { recurse } from "./recurse";
import { spacing } from "./utils/spacing";

type QueryItems = Record<string, ReturnType<typeof query | typeof recurse>>;

export function queryBlock<QI extends QueryItems>(
  queries: QI,
  outsourcedVars: Record<string, unknown> = {}
) {
  const vars: Record<string, unknown> = {};
  const varDec = new Set<string>();
  const queryStrs: string[] = [];

  let usedVars = new Map<string, unknown>();
  let allowedValues = new Set<string>();

  for (const queryKey in queries) {
    const query = queries[queryKey];
    allowedValues = new Set<string>([...allowedValues, ...query.allowedValues]);
    usedVars = new Map<string, unknown>([...usedVars, ...query.usedVars]);
  }

  for (const queryKey in queries) {
    const query = queries[queryKey];
    const queryStr = query.build(queryKey, usedVars, allowedValues);
    queryStrs.push(queryStr);
  }

  for (let [key, val] of usedVars) {
    if (key in outsourcedVars) val = outsourcedVars[key];
    if (!val) continue;
    let actualVal = String(val);
    if (val instanceof Array) actualVal = `[${actualVal}]`;
    vars[key] = actualVal;
    varDec.add(`${key}: ${parseDqlType(val)}`);
  }

  let query = `query q`;
  let _varDec = Array.from(varDec);
  if (varDec.size) query += `(${_varDec.join(", ")})`;
  query += `{\n${queryStrs.join("\n")}\n}`;
  return { query, varDec: _varDec, vars };
}

export function query<DN extends DNode, F extends Fragment<DN>>(
  _queries: Query<DN, F>
) {
  const _space = spacing(1);

  const { filter, cascade, fragOpts } = _queries;
  const { allowedValues, usedVars } = fragOpts;

  function build(
    key: string,
    usedVars: Map<string, unknown>,
    allowedValues: Set<string>
  ) {
    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      allowedValues
    );

    const mainFunc = compileMainFunc(_queries, usedVars, allowedValues);
    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (fragOpts)
      query += `{\n${fragOpts.fragmentStr ?? fragOpts.build()}\n${_space}}`;
    return query;
  }

  return { build, allowedValues, usedVars };
}

export type QueryOpts = { mainFunc: FilterEdge } & FilterFull;

export type Query<DN extends DNode, F extends Fragment<DN>> = {
  fragOpts: FragmentReturn<DN, F>;
} & QueryOpts;
