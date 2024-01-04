import {
  PredicateType,
  StringIndex,
  DateTimeIndex,
  UnionToIntersection,
} from "../utils";
import { ExtendedType, Predicate, Type } from "../classes";

export type Pred =
  | PasswordPredicate
  | IntPredicate
  | FloatPredicate
  | BoolPredicate
  | GeoPredicate
  | DateTimePredicate
  | StringPredicate
  | NodePredicate
  | StaticPredicate;

export type PredicateInitOpts = {
  count?: true;
  nullable?: true;
  asArray?: true;
} & Pred;

export type StaticPredicate = {
  type: PredicateType.UID | PredicateType.TYPE;
};

export type StringPredicate = {
  indexes?: (keyof typeof StringIndex)[];
  type: PredicateType.STRING;
  fromValues?: ReadonlyArray<string>;
};

export type DateTimePredicate = {
  indexes?: (keyof typeof DateTimeIndex)[];
  type: PredicateType.DATETIME;
};

export type NodePredicate = {
  type: PredicateType.NODE;
};

export type PasswordPredicate = {
  type: PredicateType.PASSWORD;
};

export type IntPredicate = {
  indexes?: true;
  type: PredicateType.INT;
};

export type FloatPredicate = {
  indexes?: true;
  type: PredicateType.FLOAT;
};

export type BoolPredicate = {
  indexes?: true;
  type: PredicateType.BOOL;
};

export const GoGeomTypes = [
  "Point",
  "LineString",
  "Polygon",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon",
  "GeometryCollection",
] as const;

export type GeoPredicate = {
  indexes?: true;
  type: PredicateType.GEO;
  geoType: (typeof GoGeomTypes)[number];
};

export type ExtPredicateUnion<ET extends ExtendedType> = ET["predicateRecord"] &
  UnionToIntersection<ReturnType<ET["extendedTypes"][number]["extendedPreds"]>>;

export type ExtendedPredicates<T extends Type | ExtendedType> =
  T extends ExtendedType
    ? {
        [key in keyof ExtPredicateUnion<T>]: ExtPredicateUnion<T>[key] & {
          typeName: string;
        };
      }
    : {
        [key in keyof T["predicateRecord"]]: T["predicateRecord"][key] & {
          typeName: string;
        };
      };

export type PredicateRecord = Record<string, Predicate<PredicateInitOpts>>;
