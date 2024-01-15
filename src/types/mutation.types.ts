import { Forward, Relations, Type } from "../classes";
import { NullableType, PredicateType } from "../utils";
import {
  BoolPredicate,
  DateTimePredicate,
  ExtendedPredicates,
  FloatPredicate,
  GeoPredicate,
  GoGeomTypes,
  IntPredicate,
  PasswordPredicate,
  PredicateInitOpts,
  StaticPredicate,
  StringPredicate,
} from "./predicate.types";
import { RelationsRecord } from "./relation.types";
import { GeoType } from "./return.types";
import { TypeRecord } from "./type.types";

export type InferMutationLeaf<Opts extends PredicateInitOpts> = Opts extends
  | FloatPredicate
  | IntPredicate
  ? number
  : Opts extends DateTimePredicate | PasswordPredicate
  ? string
  : Opts extends StringPredicate
  ? Opts["fromValues"] extends Array<infer U>
    ? U
    : string
  : Opts extends BoolPredicate
  ? boolean
  : Opts extends GeoPredicate
  ? GeoType<(typeof GoGeomTypes)[number]>
  : Opts["type"] extends PredicateType.UID
  ? string
  : string[] | string;

export type MutationLeafOpts<Opts extends PredicateInitOpts> = NullableType<
  Opts,
  InferMutationLeaf<Opts>
>;

export type PickleNullableFields<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof EP]: EP[key]["options"]["nullable"] extends true
    ? key
    : EP[key]["options"] extends StaticPredicate
    ? key
    : EP[key]["options"]["type"] extends PredicateType.NODE
    ? TypeName extends keyof RR
      ? RR[TypeName] extends Relations<TR[TypeName]>
        ? key extends keyof RR[TypeName]["relations"]
          ? key
          : never
        : never
      : never
    : never;
}[keyof EP];

export type PickleNonNullableFields<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof EP]: EP[key]["options"] extends StaticPredicate
    ? never
    : EP[key]["options"]["nullable"] extends true
    ? never
    : key;
}[keyof EP];

export type _InferMutation<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  key extends keyof EP,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = EP[key]["options"]["type"] extends PredicateType.NODE
  ? NullableType<EP[key]["options"], object>
  : MutationLeafOpts<EP[key]["options"]>;

export type MutationNullableFields<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof Pick<
    EP,
    PickleNullableFields<TR, RR, TypeName>
  >]?: _InferMutation<TR, TypeName, key>;
};

export type MutationNonNullableFields<
  TR extends TypeRecord,
  TypeName extends keyof TR,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof Pick<
    EP,
    PickleNonNullableFields<TR, TypeName>
  >]: _InferMutation<TR, TypeName, key>;
};

export type InferMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR
> = MutationNonNullableFields<TR, TypeName> &
  MutationNullableFields<TR, RR, TypeName>;

export type DormMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR
> = Partial<InferMutation<TR, RR, TypeName>> & {
  uid?: string;
  dtype?: string[];
};
