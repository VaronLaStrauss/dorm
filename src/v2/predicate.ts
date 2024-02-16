import type { StringIndex, DateTimeIndex } from "./indexes";
import type { DNode, DNodeExtended } from "./node";
import type { InitOpts, UnionToIntersection } from "./types";

export enum PredicateType {
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOL = "bool",
  GEO = "geo",
  DATETIME = "dateTime",
  PASSWORD = "password",
  NODE = "node",
  UID = "uid",
  TYPE = "dgraph.type",
}

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
} & Pred &
  InitOpts;

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

export function pred<alias extends string | undefined>(
  alias: alias = undefined as alias,
  asVar?: string,
  custom?: string
) {
  return { alias, asVar, custom };
}

export type PredOpt = ReturnType<typeof pred>;

export function pass<alias extends string | undefined>(
  pwdVar: string,
  alias: alias = undefined as alias,
  asVar?: string,
  custom?: string
) {
  return { pwdVar, alias, asVar, custom };
}

export type PassOpt = ReturnType<typeof pass>;

export type ExtendedPredicates<DN extends DNode | DNodeExtended> =
  DN extends DNodeExtended
    ? UnionToIntersection<
        DN["predicates"] & ExtendedPredicates<DN["extendedNodes"][number]>
      >
    : DN["predicates"];
