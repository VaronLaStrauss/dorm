import { Mutation, type DgraphClient, type Txn } from "dgraph-js";
import { Metrics, Latency } from "../types";

export class MutClass {
  constructor(private vars: Record<string, unknown>) {}

  async execute(dbOrTxn: DgraphClient | Txn, commit = true, del = false) {
    const txn = "query" in dbOrTxn ? dbOrTxn : dbOrTxn.newTxn();
    const mutx = new Mutation();

    if (del) mutx.setDeleteJson(this.vars);
    else mutx.setSetJson(this.vars);

    const res = await txn.mutate(mutx);
    if (commit) await txn.commit();

    return {
      metrics: res.getMetrics()?.toObject() as Metrics | undefined,
      latency: res.getLatency()?.toObject() as Latency | undefined,
    };
  }
}
