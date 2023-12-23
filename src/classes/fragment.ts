import { PredicateType } from "../utils/pred-type";
import { predOpts } from "./predicate";
import { Relations, RelationsRecord } from "./relations";
import { ExtendedPredicates, TypeRecord } from "./type";

export type WithFragment<
  TR extends TypeRecord,
  ThisType extends keyof TR,
  RR extends RelationsRecord<TR>
> = {
  with: FragmentOpts<TR, ThisType, RR>;
  opts?: ReturnType<typeof predOpts>;
}; // TODO: Query type

export type FragmentOpts<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof EP]?: EP[key]["options"]["type"] extends PredicateType.UID
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
    : true | ReturnType<typeof predOpts>;
};
