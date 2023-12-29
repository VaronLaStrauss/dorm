import { PredicateType } from "../utils/pred-type";
import { AsArray, Nullable, UnionToIntersection } from "../utils/types";
import { FragmentOpts, WithFragment } from "./fragment";
import {
  BoolPredicate,
  DateTimePredicate,
  FloatPredicate,
  GeoPredicate,
  GoGeomTypes,
  IntPredicate,
  PasswordPredicate,
  PredicateInitOpts,
  StringPredicate,
  UidPredicate,
  passwordOpts,
  predOpts,
} from "./predicate";
import { Forward, Relations, RelationsRecord, Reverse } from "./relations";
import { ExtendedPredicates, Type, TypeRecord } from "./type";

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
    ? InferGeo<Opts["geoType"]>
    : Opts extends IntPredicate
    ? number
    : Opts extends PasswordPredicate
    ? boolean
    : never;

export type PickleAllLeaf<T extends Type, EP extends ExtendedPredicates<T>> = {
  [key in keyof EP]: EP[key]["options"]["type"] extends
    | PredicateType.UID
    | PredicateType.PASSWORD
    ? never
    : key;
}[keyof EP];

export type InferPredicateOpts<Opts extends PredicateInitOpts> = Nullable<
  Opts,
  AsArray<Opts, InferLeafType<Opts>>
>;

export type PickLeaf<
  T extends Type,
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = {
  [key in keyof Pick<EP, PickleAllLeaf<Type, EP>>]: InferPredicateOpts<
    EP[key]["options"]
  >;
};

export type InnerFragmentPreds<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  RR extends RelationsRecord<TR>,
  FO extends FragmentOpts<TR, TypeName, RR>,
  Opts extends PredicateInitOpts
> = Nullable<Opts, AsArray<Opts, FragmentPreds<TR, TypeName, RR, FO>>>;

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
                    [k in key]: AsArray<
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
                ? FO[key]["opts"]["alias"] extends string
                  ? {
                      [k in FO[key]["opts"]["alias"]]: InnerFragmentPreds<
                        TR,
                        RR[TypeName]["relations"][key]["type"]["name"],
                        RR,
                        FO[key]["with"],
                        EP[key]["options"]
                      >;
                    }
                  : never
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
> & { uid: string; type: string[] };
