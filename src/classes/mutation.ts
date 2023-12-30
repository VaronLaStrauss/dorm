import {
  BoolPredicate,
  DateTimePredicate,
  ExtendedPredicates,
  FloatPredicate,
  GeoType,
  GoGeomTypes,
  IntPredicate,
  PasswordPredicate,
  PredicateInitOpts,
  Relations,
  RelationsRecord,
  StringPredicate,
  Type,
  TypeRecord,
} from ".";
import { AsArray, Nullable, PredicateType, UnionToIntersection } from "..";

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
  : GeoType<(typeof GoGeomTypes)[number]>;

export type MutationLeafOpts<Opts extends PredicateInitOpts> = Nullable<
  Opts,
  AsArray<Opts, InferMutationLeaf<Opts>>
>;

export type InsertMutationUidOpts<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  ThisKey extends keyof TR,
  Opts extends PredicateInitOpts
> = Nullable<Opts, AsArray<Opts, DormMutation<TR, RR, ThisKey>>>;

export type PickleNullableFields<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  PrevType extends Type | undefined = undefined,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof EP]: EP[key]["options"]["nullable"] extends true
    ? key
    : EP[key]["options"]["type"] extends PredicateType.UID
    ? TypeName extends keyof RR
      ? RR[TypeName] extends Relations<TR[TypeName]>
        ? key extends keyof RR[TypeName]["relations"]
          ? RR[TypeName]["relations"][key]["type"] extends PrevType
            ? key
            : never
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
  [key in keyof EP]: EP[key]["options"]["nullable"] extends true ? never : key;
}[keyof EP];

export type _InferMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  key extends keyof EP,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = EP[key]["options"]["type"] extends PredicateType.UID
  ? TypeName extends keyof RR
    ? RR[TypeName] extends Relations<TR[TypeName]>
      ? key extends keyof RR[TypeName]["relations"]
        ? RR[TypeName]["relations"][key]["type"]["name"] extends keyof TR
          ? InsertMutationUidOpts<
              TR,
              RR,
              RR[TypeName]["relations"][key]["type"]["name"],
              EP[key]["options"]
            >
          : never
        : never
      : never
    : never
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
  >]?: _InferMutation<TR, RR, TypeName, key>;
};

export type MutationNonNullableFields<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof Pick<
    EP,
    PickleNonNullableFields<TR, TypeName>
  >]: _InferMutation<TR, RR, TypeName, key>;
};

export type InferMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR
> = MutationNonNullableFields<TR, RR, TypeName> &
  MutationNullableFields<TR, RR, TypeName>;

export type DormMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR
> =
  | (UnionToIntersection<InferMutation<TR, RR, TypeName>> & {
      types: string | string[];
    })
  | (Partial<InferMutation<TR, RR, TypeName>> & {
      uid: string;
      types?: string | [];
    });
