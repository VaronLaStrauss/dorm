import type { InitOpts } from "./utils/types";
import type { DateTimeIndex, StringIndex } from "./utils/indexes";

export class DEdge<Opts extends EdgeInit> {
  constructor(public readonly opts: Opts) {}
}

export function edge<Opts extends EdgeInit>(opts: Opts) {
  return new DEdge(opts);
}

export function from<T extends Array<string | number>>(keys: [...T]) {
  return keys.reduce((acc, curr) => {
    return { ...acc, [curr + ""]: curr };
  }, {} as { [key in T[number]]: key });
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

export type InferEdge<Opts extends EdgeInit> = Opts extends StringEdge
  ? Opts["allowedValues"] extends Record<string, infer U>
    ? U
    : string
  : Opts extends BoolEdge
  ? boolean
  : Opts extends DateTimeEdge
  ? Date | string
  : Opts extends FloatEdge | IntEdge
  ? Opts["allowedValues"] extends Record<number, infer U>
    ? U
    : number
  : Opts extends GeoEdge
  ? GeoType<Opts["geoType"]>
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

export type IndexableEdge =
  | IntEdge
  | FloatEdge
  | BoolEdge
  | GeoEdge
  | DateTimeEdge
  | StringEdge;

export type Edge = IndexableEdge | PasswordEdge;

export type EdgeInit = InitOpts & Edge;

export type StringEdge = {
  indexes?: (keyof typeof StringIndex)[];
  type: EdgeType.STRING;
  allowedValues?: Record<string, string>;
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
  allowedValues?: Record<number, number>;
};

export type FloatEdge = {
  indexes?: true;
  type: EdgeType.FLOAT;
  allowedValues?: Record<number, number>;
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
  alias?: A;
  asVar?: string;
};
