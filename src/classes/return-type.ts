import { PredicateType } from "../utils/pred-type";
import { UnionToIntersection } from "../utils/types";
import { FragmentOpts, WithFragment } from "./fragment";
import {
  BoolPredicate,
  DateTimePredicate,
  FloatPredicate,
  GeoPredicate,
  IntPredicate,
  PasswordPredicate,
  Predicate,
  PredicateInitOpts,
  StringPredicate,
  UidPredicate,
  predOpts,
} from "./predicate";
import { Forward, Relations, RelationsRecord, Reverse } from "./relations";
import { ExtendedPredicates, Type, TypeRecord } from "./type";

export type InferLeafType<
  P extends Predicate<PredicateInitOpts>,
  Opts extends P["options"] = P["options"]
> = Opts extends StringPredicate
  ? Opts["fromValues"] extends Array<infer U>
    ? U
    : string
  : Opts extends BoolPredicate
  ? boolean
  : Opts extends DateTimePredicate
  ? Date
  : Opts extends FloatPredicate
  ? number
  : Opts extends GeoPredicate
  ? { x: number; y: number }
  : Opts extends IntPredicate
  ? number
  : Opts extends PasswordPredicate
  ? string
  : never;

export type PickleAllLeaf<T extends Type, EP extends ExtendedPredicates<T>> = {
  [key in keyof EP]: EP[key]["options"]["type"] extends PredicateType.UID
    ? never
    : key;
}[keyof EP];

export type InferPredicateOpts<P extends Predicate<PredicateInitOpts>> =
  P["options"]["asArray"] extends true
    ? Array<InferLeafType<P>>
    : P["options"]["nullable"] extends true
    ? InferLeafType<P> | null | undefined
    : InferLeafType<P>;

export type PickLeaf<
  T extends Type,
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = {
  [key in keyof Pick<EP, PickleAllLeaf<Type, EP>>]: InferPredicateOpts<EP[key]>;
};

export type FragmentPreds<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  FO extends FragmentOpts<TR, TypeName, RR>,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = UnionToIntersection<
  {
    [key in keyof FO]: key extends keyof EP
      ? FO[key] extends true
        ? EP[key]["options"] extends UidPredicate
          ? RR[TypeName] extends Relations<TR[TypeName]>
            ? key extends keyof RR[TypeName]["relations"]
              ? RR[TypeName]["relations"][key] extends Forward | Reverse
                ? {
                    [k in key]: PickLeaf<
                      RR[TypeName]["relations"][key]["type"]
                    >;
                  }
                : never
              : never
            : never
          : { [k in key]: InferPredicateOpts<EP[key]> }
        : FO[key] extends ReturnType<typeof predOpts>
        ? FO[key]["alias"] extends infer U
          ? {
              [k in U & string]: InferPredicateOpts<EP[key]>;
            }
          : { [k in key]: InferPredicateOpts<EP[key]> }
        : RR[TypeName] extends Relations<TR[TypeName]>
        ? key extends keyof RR[TypeName]["relations"]
          ? RR[TypeName]["relations"][key] extends Forward | Reverse
            ? FO[key] extends WithFragment<
                TR,
                RR[TypeName]["relations"][key]["type"]["name"],
                RR
              >
              ? FO[key]["opts"] extends ReturnType<typeof predOpts>
                ? FO[key]["opts"]["alias"] extends string
                  ? {
                      [k in FO[key]["opts"]["alias"]]: FragmentPreds<
                        TR,
                        RR[TypeName]["relations"][key]["type"]["name"],
                        RR,
                        FO[key]["with"]
                      >;
                    }
                  : {
                      [k in key]: FragmentPreds<
                        TR,
                        RR[TypeName]["relations"][key]["type"]["name"],
                        RR,
                        FO[key]["with"]
                      >;
                    }
                : {
                    [k in key]: FragmentPreds<
                      TR,
                      RR[TypeName]["relations"][key]["type"]["name"],
                      RR,
                      FO[key]["with"]
                    >;
                  }
              : never
            : never
          : never
        : never
      : never;
  }[keyof FO]
>;
