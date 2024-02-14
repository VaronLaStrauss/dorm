import type {
  BoolPredicate,
  DateTimePredicate,
  ExtendedPredicates,
  FloatPredicate,
  GeoPredicate,
  GoGeomTypes,
  IntPredicate,
  NodePredicate,
  PasswordPredicate,
  PredicateInitOpts,
  StringPredicate,
} from "./predicate.types";
import { RelationsRecord } from "./relation.types";
import type { WithFragment, FragmentOpts } from "./fragment.types";
import type { TypeRecord } from "./type.types";
import {
  type Composite,
  type NullableType,
  PredicateType,
  type UnionToIntersection,
} from "../utils";
import {
  Fragment,
  Forward,
  Relations,
  Reverse,
  Type,
  predOpts,
  passwordOpts,
} from "../classes";

export type GeoType<GeoKey extends (typeof GoGeomTypes)[number]> = {
  type: GeoKey;
  coordinates: InferGeo<GeoKey>;
};

export type InferGeo<Geo extends (typeof GoGeomTypes)[number]> =
  Geo extends (typeof GoGeomTypes)[0]
    ? [number, number]
    : Geo extends (typeof GoGeomTypes)[1 | 2 | 3]
    ? [number, number][]
    : Geo extends (typeof GoGeomTypes)[4 | 5]
    ? [number, number][][]
    : GeoType<(typeof GoGeomTypes)[number]>;

export type InferLeafType<Opts extends PredicateInitOpts> =
  Opts extends StringPredicate
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
    ? GeoType<Opts["geoType"]>
    : Opts extends IntPredicate
    ? number
    : Opts extends PasswordPredicate
    ? boolean
    : Opts["type"] extends PredicateType.UID
    ? string
    : string[];

export type PickleAllLeaf<T extends Type, EP extends ExtendedPredicates<T>> = {
  [key in keyof EP]: EP[key]["options"]["type"] extends
    | PredicateType.NODE
    | PredicateType.PASSWORD
    ? never
    : key;
}[keyof EP];

export type InferPredicateOpts<Opts extends PredicateInitOpts> = NullableType<
  Opts,
  InferLeafType<Opts>
>;

export type PickLeaf<
  T extends Type,
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = Composite<{
  [key in keyof Pick<EP, PickleAllLeaf<Type, EP>>]: InferPredicateOpts<
    EP[key]["options"]
  >;
}>;

export type FragmentPreds<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  FO extends FragmentOpts<TR, TypeName, RR>,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = Composite<
  UnionToIntersection<
    {
      [key in keyof FO]: key extends keyof EP
        ? FO[key] extends true
          ? EP[key]["options"] extends NodePredicate
            ? RR[TypeName] extends Relations<TR[TypeName]>
              ? key extends keyof RR[TypeName]["relations"]
                ? RR[TypeName]["relations"][key] extends Forward | Reverse
                  ? {
                      [k in key]: NullableType<
                        EP[key]["options"],
                        PickLeaf<RR[TypeName]["relations"][key]["type"]>
                      >;
                    }
                  : never
                : never
              : never
            : { [k in key]: InferPredicateOpts<EP[key]["options"]> }
          : FO[key] extends ReturnType<typeof predOpts | typeof passwordOpts>
          ? FO[key]["alias"] extends string
            ? {
                [k in FO[key]["alias"]]: InferPredicateOpts<EP[key]["options"]>;
              }
            : { [k in key]: InferPredicateOpts<EP[key]["options"]> }
          : RR[TypeName] extends Relations<TR[TypeName]>
          ? key extends keyof RR[TypeName]["relations"]
            ? RR[TypeName]["relations"][key] extends Forward | Reverse
              ? FO[key] extends WithFragment<
                  TR,
                  RR[TypeName]["relations"][key]["type"]["name"],
                  RR
                >
                ? FO[key]["opts"] extends ReturnType<typeof predOpts>
                  ? {
                      [k in FO[key]["opts"]["alias"] &
                        string]: InnerFragmentPreds<
                        TR,
                        RR[TypeName]["relations"][key]["type"]["name"],
                        RR,
                        FO[key]["with"],
                        EP[key]["options"]
                      >;
                    }
                  : {
                      [k in key]: InnerFragmentPreds<
                        TR,
                        RR[TypeName]["relations"][key]["type"]["name"],
                        RR,
                        FO[key]["with"],
                        EP[key]["options"]
                      >;
                    }
                : never
              : never
            : never
          : never
        : never;
    }[keyof FO]
  >
>;

export type InnerFragmentPreds<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  FO extends FragmentOpts<TR, TypeName, RR>,
  Opts extends PredicateInitOpts
> = NullableType<Opts, FragmentPreds<TR, TypeName, RR, FO>>;

export type InferReturn<
  F extends Fragment<TR, RR, key, FO>,
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>,
  key extends keyof TR = keyof TR,
  FO extends FragmentOpts<TR, key, RR> = FragmentOpts<TR, key, RR>
> = ReturnType<F["execute"]>;
