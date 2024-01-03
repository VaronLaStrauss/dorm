import { DgraphClient, Txn } from "dgraph-js";
import { TypeRecord, Schema } from ".";
import {
  RelationsRecord,
  QueryOpts,
  spacing,
  compileDirectives,
  compileMainFunc,
  compileRecurse,
  parseDqlType,
  QueryReturn,
} from "..";

export class DormQuery<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  QO extends QueryOpts<TR, RR>
> {
  constructor(private queries: QO, private schema: Schema<TR, RR>) {}

  build<key extends keyof QO & string>(key: key, space = 1) {
    const _space = spacing(space);
    const q = this.queries[key];
    const { filter, cascade, fragment, recurse } = q;
    const usedVars = new Map<string, unknown>(q.fragment?.usedVars);

    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      this.schema.hasOrTypeValues
    );
    const mainFunc = compileMainFunc(q, usedVars, this.schema.hasOrTypeValues);

    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (recurse) query += `${compileRecurse(recurse)} `;
    if (fragment) query += `{\n${fragment.fragment}\n${_space}}`;
    return { query, usedVars };
  }

  async execute(
    dbOrTxn: DgraphClient | Txn,
    outsourcedVars: Record<string, unknown> = {}
  ) {
    const vars: Record<string, unknown> = {};
    const varDec: string[] = [];

    const queries: string[] = [];
    for (const queryKey in this.queries) {
      const { query, usedVars } = this.build(queryKey);
      queries.push(query);
      for (let [key, val] of usedVars) {
        if (key in outsourcedVars) val = outsourcedVars[key];
        vars[key] = val;
        varDec.push(`${key}: ${parseDqlType(val)}`);
      }
    }

    let query = `query q`;
    if (varDec.length) query += `(${varDec.join(", ")})`;
    query += `{\n${queries.join("\n")}\n}`;

    const txn =
      dbOrTxn instanceof DgraphClient
        ? dbOrTxn.newTxn({ readOnly: true })
        : dbOrTxn;
    let res: ReturnType<typeof txn.queryWithVars>;
    if (varDec.length) res = txn.queryWithVars(query, vars);
    else res = txn.query(query);

    const data = await res;

    return {
      data: data.getJson() as QueryReturn<TR, RR, QO>,
      metrics: data.getMetrics(),
      latency: data.getLatency(),
    };
  }
}
