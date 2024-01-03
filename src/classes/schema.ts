import { DgraphClient, Operation } from "dgraph-js";
import { TypeRecord, Fragment, DormQuery, Forward, Reverse } from ".";
import { PredicateType } from "..";
import {
  RelationsRecord,
  FragmentOpts,
  QueryOpts,
  DormMutation,
} from "../types";
import { MutClass } from "./mutation";

export class Schema<
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>
> {
  hasOrTypeValues = new Set<string>();

  constructor(public types: TR, public relations: RR) {
    this.init();
  }

  init() {
    for (const typeName in this.types) {
      const type = this.types[typeName];
      this.hasOrTypeValues.add(typeName);
      const preds = type.extendedPreds();
      for (const predName in preds) {
        const pred = preds[predName];
        this.hasOrTypeValues.add(`${pred.typeName}.${predName}`);
      }
    }
  }

  build() {
    const schema: string[] = [];
    for (const typeName in this.types) {
      const type = this.types[typeName];
      schema.push(type.buildSchema(this.relations));
    }

    return schema.join("\n");
  }

  async setSchema(db: DgraphClient) {
    const schema = this.build();
    const op = new Operation();
    op.setSchema(schema);
    const alterOp = await db.alter(op);
    return alterOp.getData();
  }

  fragment<key extends keyof TR, FO extends FragmentOpts<TR, key, RR>>(
    typeName: key,
    fragmentOpts: FO,
    asRecurse?: true,
    usedVars = new Map<string, unknown>()
  ): Fragment<TR, RR, key, FO> {
    const type = this.types[typeName];
    const fragment = type.buildPreds<TR, key>(
      fragmentOpts as never,
      this.relations,
      usedVars,
      this.hasOrTypeValues,
      2,
      asRecurse
    );

    return new Fragment<TR, RR, key, FO>(this, fragment, usedVars, typeName);
  }

  query<QO extends QueryOpts<TR, RR>>(queries: QO) {
    return new DormQuery<TR, RR, QO>(queries, this);
  }

  private _mutate<key extends keyof TR, Mut extends DormMutation<TR, RR, key>>(
    key: key,
    mut: Mut
  ) {
    const vars: Record<string, unknown> = {};
    const preds = this.types[key].extendedPreds();
    for (const predKey in mut) {
      let value: unknown = mut[predKey];

      if (predKey === "uid") {
        vars["uid"] = value;
        continue;
      }
      if (predKey === "type") {
        vars["dgraph.type"] = value;
        continue;
      }
      if (value === undefined) {
        continue;
      }

      const pred = preds[predKey];

      if (pred.options.type === PredicateType.NODE) {
        const next = this.relations[key]!.relations[predKey as never]! as
          | Forward
          | Reverse;

        const nextType = next.type.name;

        value =
          value instanceof Array
            ? value.map((v) => this._mutate(nextType, v as never))
            : this._mutate(nextType, value as never);
      }
      const mutKey = `${pred.typeName}.${predKey}`;

      vars[mutKey] = value;
    }

    return vars;
  }

  mutate<key extends keyof TR, Mut extends DormMutation<TR, RR, key>>(
    key: key,
    mut: Mut
  ) {
    return new MutClass(this._mutate(key, mut));
  }
}

export function schema<TR extends TypeRecord, RR extends RelationsRecord<TR>>(
  types: TR,
  relations: RR
) {
  return new Schema(types, relations);
}
