import {
  PredicateInitOpts,
  FloatPredicate,
  IntPredicate,
  DateTimePredicate,
  PasswordPredicate,
  StringPredicate,
  BoolPredicate,
  GeoPredicate,
  GoGeomTypes,
  RelationsRecord,
  ExtendedPredicates,
  StaticPredicate,
} from ".";
import {
  GeoType,
  PredicateType,
  Nullable,
  AsArray,
  TypeRecord,
  Type,
  Relations,
} from "..";

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

export type MutationLeafOpts<Opts extends PredicateInitOpts> = Nullable<
  Opts,
  AsArray<Opts, InferMutationLeaf<Opts>>
>;

export type MutationUidOpts<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  ThisKey extends keyof TR,
  Opts extends PredicateInitOpts,
  PrevType extends Type | undefined
> = Nullable<Opts, AsArray<Opts, DormMutation<TR, RR, ThisKey, PrevType>>>;

export type PickleNullableFields<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  PrevType extends Type | undefined,
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
          ? RR[TypeName]["relations"][key]["type"] extends PrevType
            ? never
            : key
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
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  key extends keyof EP,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = EP[key]["options"]["type"] extends PredicateType.NODE
  ? TypeName extends keyof RR
    ? RR[TypeName] extends Relations<TR[TypeName]>
      ? key extends keyof RR[TypeName]["relations"]
        ? RR[TypeName]["relations"][key]["type"]["name"] extends keyof TR
          ? MutationUidOpts<
              TR,
              RR,
              RR[TypeName]["relations"][key]["type"]["name"],
              EP[key]["options"],
              TR[TypeName]
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
  PrevType extends Type | undefined,
  EP extends ExtendedPredicates<TR[TypeName]> = ExtendedPredicates<TR[TypeName]>
> = {
  [key in keyof Pick<
    EP,
    PickleNullableFields<TR, RR, TypeName, PrevType>
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
  TypeName extends keyof TR,
  PrevType extends Type | undefined = undefined
> = MutationNonNullableFields<TR, RR, TypeName> &
  MutationNullableFields<TR, RR, TypeName, PrevType>;

export type DormMutation<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR,
  PrevType extends Type | undefined = undefined
> =
  | (InferMutation<TR, RR, TypeName, PrevType> & {
      type: string[];
    })
  | (Partial<InferMutation<TR, RR, TypeName, PrevType>> & {
      uid: string;
      type?: string[];
    });
