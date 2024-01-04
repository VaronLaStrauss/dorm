import { ExtendedPredicates } from "./predicate.types";
import { RelationsRecord } from "./relation.types";
import { TypeRecord } from "./type.types";
import { PasswordOpts, PredOpts, Relations } from "../classes";
import { PredicateType } from "../utils";
import { Query } from "../query-schema";

export type WithFragment<
  TR extends TypeRecord,
  ThisType extends keyof TR,
  RR extends RelationsRecord<TR>
> = {
  with?: FragmentOpts<TR, ThisType, RR>;
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
