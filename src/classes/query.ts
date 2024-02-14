import type { QueryOpts, RelationsRecord, TypeRecord } from "../types";
import {
  compileDirectives,
  compileMainFunc,
  compileRecurse,
  parseDqlType,
  spacing,
} from "../utils";

export class DormQuery<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  QO extends QueryOpts<TR, RR>
> {
  allowedValues = new Set<string>();

  constructor(private queries: QO) {
    for (const key in queries) {
      const { fragment } = queries[key];
      if (!fragment) continue;
      for (const allowedValue of fragment.allowedValues) {
        this.allowedValues.add(allowedValue);
      }
    }
  }

  buildOneQuery<key extends keyof QO & string>(
    key: key,
    _usedVars: Map<string, unknown>,
    space = 1
  ) {
    const _space = spacing(space);
    const q = this.queries[key];
    const { filter, cascade, fragment, recurse } = q;
    const usedVars = new Map<string, unknown>([
      ...(q.fragment?.usedVars ?? []),
      ..._usedVars,
    ]);

    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      this.allowedValues
    );

    const mainFunc = compileMainFunc(q, usedVars, this.allowedValues);

    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (recurse) query += `${compileRecurse(recurse)} `;
    if (fragment) query += `{\n${fragment.fragment}\n${_space}}`;
    return { query, usedVars };
  }

  compile(outsourcedVars: Record<string, unknown> = {}) {
    const vars: Record<string, unknown> = {};
    const varDec = new Set<string>();

    const queries: string[] = [];
    let _usedVars = new Map<string, unknown>();
    for (const queryKey in this.queries) {
      const { query, usedVars } = this.buildOneQuery(queryKey, _usedVars);
      _usedVars = new Map<string, unknown>([..._usedVars, ...usedVars]);
      queries.push(query);
      for (let [key, val] of usedVars) {
        if (key in outsourcedVars) val = outsourcedVars[key];
        if (!val) continue;
        let actualVal = String(val);
        if (val instanceof Array) actualVal = `[${actualVal}]`;
        vars[key] = actualVal;
        varDec.add(`${key}: ${parseDqlType(val)}`);
      }
    }

    let query = `query q`;
    let _varDec = Array.from(varDec);
    if (varDec.size) query += `(${_varDec.join(", ")})`;
    query += `{\n${queries.join("\n")}\n}`;
    return { query, varDec: _varDec, vars };
  }
}
