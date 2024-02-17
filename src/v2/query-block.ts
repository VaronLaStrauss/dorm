import { parseDqlType } from "./compiler/dql-type.parser";
import type { query } from "./query";
import type { recurse } from "./recurse";

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
