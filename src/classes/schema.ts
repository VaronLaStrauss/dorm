import { DgraphClient, Operation } from "dgraph-js";
import { PredicateType } from "..";
import { Fragment, FragmentOpts } from "./fragment";
import { DormInsert } from "./mutation";
import { DormQuery, QueryOpts } from "./query";
import { Forward, RelationsRecord, Reverse } from "./relations";
import { TypeRecord } from "./type";

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
    usedVars = new Map<string, unknown>()
  ): Fragment<TR, RR, key, FO> {
    const type = this.types[typeName];
    const fragment = type.buildPreds<TR, key>(
      fragmentOpts as never,
      this.relations,
      usedVars,
      this.hasOrTypeValues,
      2
    );

    return new Fragment<TR, RR, key, FO>(this, fragment, usedVars, typeName);
  }

  query<QO extends QueryOpts<TR, RR>>(queries: QO) {
    return new DormQuery<TR, RR, QO>(queries, this);
  }

  prepareMutation<key extends keyof TR, Mut extends DormInsert<TR, RR, key>>(
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
      if (predKey === "types") {
        vars["dgraph.type"] = value;
        continue;
      }
      if (value === undefined) {
        continue;
      }

      const pred = preds[predKey];

      if (pred.options.type === PredicateType.UID) {
        const next = this.relations[key]!.relations[predKey as never]! as
          | Forward
          | Reverse;

        const nextType = next.type.name;

        value =
          value instanceof Array
            ? value.map((v) => this.prepareMutation(nextType, v as never))
            : this.prepareMutation(nextType, value as never);
      }
      const mutKey = `${pred.typeName}.${predKey}`;

      vars[mutKey] = value;
    }

    return vars;
  }
}

export function schema<TR extends TypeRecord, RR extends RelationsRecord<TR>>(
  types: TR,
  relations: RR
) {
  return new Schema(types, relations);
}
