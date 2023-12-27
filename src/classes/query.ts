import { DgraphClient } from "dgraph-js";
import { FilterValue, Query } from "../query-schema";
import { Fragment, FragmentOpts } from "./fragment";
import { RelationsRecord } from "./relations";
import { TypeRecord } from "./type";
import { compileDirectives, compileMainFunc } from "./compiler";
import { Schema } from ".";
import { parseDqlType, spacing } from "..";

export type QueryOpts<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>
> = Record<
  string,
  {
    fragment?: Fragment<TR, RR, keyof TR, FragmentOpts<TR, keyof TR, RR>>;
    mainFunc: FilterValue;
  } & Query
>;

export type QueryReturn<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  QO extends QueryOpts<TR, RR>
> = {
  [key in keyof QO]: QO[key]["fragment"] extends Fragment<
    never,
    never,
    never,
    never
  >
    ? ReturnType<QO[key]["fragment"]["execute"]>
    : never;
};

export class DormQuery<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  QO extends QueryOpts<TR, RR>
> {
  constructor(private queries: QO, private schema: Schema<TR, RR>) {}

  build<key extends keyof QO & string>(key: key, space = 1) {
    const _space = spacing(space);
    const q = this.queries[key];
    const { filter, cascade, fragment } = q;
    const usedVars = new Map<string, unknown>(q.fragment?.usedVars);

    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      this.schema.hasOrTypeValues
    );
    const mainFunc = compileMainFunc(q, usedVars, this.schema.hasOrTypeValues);

    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (fragment) query += `{\n${fragment.fragment}\n${_space}}`;
    return { query, usedVars };
  }

  async execute(db: DgraphClient) {
    const vars: Record<string, unknown> = {};
    const varDec: string[] = [];

    const queries: string[] = [];
    for (const queryKey in this.queries) {
      const { query, usedVars } = this.build(queryKey);
      queries.push(query);
      for (const [key, val] of usedVars) {
        vars[key] = val;
        varDec.push(`${key}: ${parseDqlType(val)}`);
      }
    }

    let query = `query q`;
    if (varDec.length) query += `(${varDec.join(", ")})`;
    query += `{\n${queries.join("\n")}\n}`;

    return query as QueryReturn<TR, RR, QO>;

    // const txn = db.newTxn({ readOnly: true });
    // let res: ReturnType<typeof txn.queryWithVars>;
    // if (varDec.length) res = txn.queryWithVars(query, vars);
    // else res = txn.query(query);

    // const data = await res;

    // return {
    //   data: data.getJson() as QueryReturn<TR, RR, QO>,
    //   metris: data.getMetrics(),
    //   latency: data.getLatency(),
    // };
  }
}
