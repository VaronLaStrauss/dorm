import { FragmentPreds, Schema } from ".";
import { Query } from "../query-schema";
import { PredicateType } from "../utils/pred-type";
import { PasswordOpts, PredOpts } from "./predicate";
import { Relations, RelationsRecord } from "./relations";
import { ExtendedPredicates, TypeRecord } from "./type";

export type WithFragment<
  TR extends TypeRecord,
  ThisType extends keyof TR,
  RR extends RelationsRecord<TR>
> = {
  with: FragmentOpts<TR, ThisType, RR>;
  opts?: PredOpts;
} & Query;

export type FragmentOpts<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof EP]?: {
    [k in key]: EP[key]["options"]["type"] extends PredicateType.NODE
      ? TypeName extends keyof RR
        ? RR[TypeName] extends Relations<TR[TypeName]>
          ? key extends keyof RR[TypeName]["relations"]
            ? RR[TypeName]["relations"][key]["type"]["name"] extends keyof TR
              ?
                  | WithFragment<
                      TR,
                      RR[TypeName]["relations"][key]["type"]["name"],
                      RR
                    >
                  | true
              : never
            : never
          : never
        : never
      : EP[key]["options"]["type"] extends PredicateType.PASSWORD
      ? PasswordOpts
      : true | PredOpts;
  };
}[keyof EP];

export class Fragment<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  key extends keyof TR,
  FO extends FragmentOpts<TR, key, RR>,
  FP extends FragmentPreds<TR, key, RR, FO> = FragmentPreds<TR, key, RR, FO>
> {
  constructor(
    private schema: Schema<TR, RR>,
    public fragment: string,
    public usedVars: Map<string, unknown>,
    private key: key
  ) {}

  append<F extends FragmentOpts<TR, key, RR>>(opts: F) {
    const relations = this.schema.relations;
    const type = this.schema.types[this.key];
    const fragment = type.buildPreds(
      opts as never,
      relations,
      this.usedVars,
      this.schema.hasOrTypeValues,
      2
    );
    const f = this.fragment + `\n${fragment}`;
    return new Fragment<
      TR,
      RR,
      key,
      FO,
      FP & FragmentPreds<TR, key, RR, typeof opts>
    >(this.schema, f, this.usedVars, this.key);
  }

  execute(): FP {
    throw new Error("Not callable - used only for type");
  }
}

export type InferReturn<
  F extends Fragment<TR, RR, key, FO>,
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>,
  key extends keyof TR = keyof TR,
  FO extends FragmentOpts<TR, key, RR> = FragmentOpts<TR, key, RR>
> = ReturnType<F["execute"]>;
