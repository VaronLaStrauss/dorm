import type { DateTimeIndex, StringIndex } from "./indexes";
import type {
  BoolPredicate,
  DateTimePredicate,
  FloatPredicate,
  GeoPredicate,
  IntPredicate,
  PasswordPredicate,
  PredicateType,
  StringPredicate,
} from "./predicate";

export class DEdge<Opts extends EdgeInit> {
  constructor(public readonly opts: Opts) {}
}

export function edge<Opts extends EdgeInit>(opts: Opts) {
  return new DEdge(opts);
}

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

export type InferEdge<Opts extends DEdge<EdgeInit>["opts"]> =
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

export enum EdgeType {
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOL = "bool",
  GEO = "geo",
  DATETIME = "dateTime",
  PASSWORD = "password",
  UID = "uid",
  TYPE = "dgraph.type",
}

export type Edge =
  | PasswordEdge
  | IntEdge
  | FloatEdge
  | BoolEdge
  | GeoEdge
  | DateTimeEdge
  | StringEdge
  | StaticEdge;

export type EdgeInit = {
  count?: true;
  nullable?: true;
  asArray?: true;
} & Edge;

export type StaticEdge = {
  type: PredicateType.UID | PredicateType.TYPE;
};

export type StringEdge = {
  indexes?: (keyof typeof StringIndex)[];
  type: PredicateType.STRING;
  fromValues?: ReadonlyArray<string>;
};

export type DateTimeEdge = {
  indexes?: (keyof typeof DateTimeIndex)[];
  type: PredicateType.DATETIME;
};

export type PasswordEdge = {
  type: PredicateType.PASSWORD;
};

export type IntEdge = {
  indexes?: true;
  type: PredicateType.INT;
};

export type FloatEdge = {
  indexes?: true;
  type: PredicateType.FLOAT;
};

export type BoolEdge = {
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

export type GeoEdge = {
  indexes?: true;
  type: PredicateType.GEO;
  geoType: (typeof GoGeomTypes)[number];
};

export type PredFragmentOpt<A extends string = string> = {
  custom?: string;
  alias?: A;
  asVar?: string;
};

export function pred<PO extends PredFragmentOpt>(opts: PO) {
  return opts;
}
