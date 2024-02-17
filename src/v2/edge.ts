import type { DateTimeIndex, StringIndex } from "./utils/indexes";

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
  Opts extends StringEdge
    ? Opts["fromValues"] extends Array<infer U>
      ? U
      : string
    : Opts extends BoolEdge
    ? boolean
    : Opts extends DateTimeEdge
    ? Date
    : Opts extends FloatEdge
    ? number
    : Opts extends GeoEdge
    ? GeoType<Opts["geoType"]>
    : Opts extends IntEdge
    ? number
    : Opts extends PasswordEdge
    ? boolean
    : string[];

export enum EdgeType {
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOL = "bool",
  GEO = "geo",
  DATETIME = "dateTime",
  PASSWORD = "password",
}

export type Edge =
  | PasswordEdge
  | IntEdge
  | FloatEdge
  | BoolEdge
  | GeoEdge
  | DateTimeEdge
  | StringEdge;

export type EdgeInit = {
  count?: true;
  nullable?: true;
  asArray?: true;
} & Edge;

export type StringEdge = {
  indexes?: (keyof typeof StringIndex)[];
  type: EdgeType.STRING;
  fromValues?: ReadonlyArray<string>;
};

export type DateTimeEdge = {
  indexes?: (keyof typeof DateTimeIndex)[];
  type: EdgeType.DATETIME;
};

export type PasswordEdge = {
  type: EdgeType.PASSWORD;
};

export type IntEdge = {
  indexes?: true;
  type: EdgeType.INT;
};

export type FloatEdge = {
  indexes?: true;
  type: EdgeType.FLOAT;
};

export type BoolEdge = {
  indexes?: true;
  type: EdgeType.BOOL;
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
  type: EdgeType.GEO;
  geoType: (typeof GoGeomTypes)[number];
};

export type PredFragmentOpt<A extends string = string> = {
  custom?: string;
  alias?: A;
  asVar?: string;
};
