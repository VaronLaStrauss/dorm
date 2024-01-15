import {
  DormMutation,
  FragmentOpts,
  QueryOpts,
  RelationsRecord,
  TypeRecord,
} from "../types";
import { PredicateType } from "../utils";
import { Fragment } from "./fragment";
import { DormQuery } from "./query";
import { Forward, Reverse } from "./relations";
import { Type } from "./type";

export class Schema<
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>
> {
  allowedValues = new Set<string>();

  constructor(public types: TR, public relations: RR) {
    this.init();
  }

  init() {
    for (const typeName in this.types) {
      const type = this.types[typeName];
      this.allowedValues.add(typeName);
      const preds = type.extendedPreds();
      for (const predName in preds) {
        const pred = preds[predName];
        this.allowedValues.add(`${pred.typeName}.${predName}`);
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

  fragment<key extends keyof TR, FO extends FragmentOpts<TR, key, RR>>(
    typeName: key,
    fragmentOpts: FO,
    asRecurse?: true,
    usedVars = new Map<string, unknown>()
  ): Fragment<TR, RR, key, FO> {
    const type = this.types[typeName];
    const allowedValues = new Set(this.allowedValues);

    const fragment = type.buildPreds<TR, key>(
      fragmentOpts as never,
      this.relations,
      usedVars,
      allowedValues,
      2,
      asRecurse ? new Set<Type>([type]) : undefined
    );

    return new Fragment<TR, RR, key, FO>(
      this,
      fragment,
      usedVars,
      typeName,
      allowedValues
    );
  }

  query<QO extends QueryOpts<TR, RR>>(queries: QO) {
    return new DormQuery<TR, RR, QO>(queries);
  }

  compileMutation<key extends keyof TR, Mut extends DormMutation<TR, RR, key>>(
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
      if (predKey === "dtype") {
        vars["dgraph.type"] = value;
        continue;
      }
      if (value === undefined) {
        continue;
      }

      const pred = preds[predKey];
      if (pred.options.type === PredicateType.NODE) value = mut[predKey];
      const mutKey = `${pred.typeName}.${predKey}`;

      vars[mutKey] = value;
    }

    if (!("dtype" in mut)) vars["dgraph.type"] = this.types[key].typeNames;

    return vars;
  }
}

export function schema<TR extends TypeRecord, RR extends RelationsRecord<TR>>(
  types: TR,
  relations: RR
) {
  return new Schema(types, relations);
}
