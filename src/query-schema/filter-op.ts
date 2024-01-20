import { ExtendedPredicates } from "../types";
import { Type, fromValues } from "../classes";
import {
  DateTimeIndex,
  DefaultIndex,
  GeoIndex,
  Indexless,
  PredicateType,
  StringIndex,
  UnionToIntersection,
} from "../utils";

export type PickleFilterable<T extends Type> = {
  [key in keyof ExtendedPredicates<T>]: ExtendedPredicates<T>[key]["options"] extends {
    indexes: true | Array<string>;
  }
    ? key
    : never;
}[keyof ExtendedPredicates<T>];

export type AllowedPreds<T extends Type> =
  | keyof Pick<ExtendedPredicates<T>, PickleFilterable<T>> & string;

export type PredFuncs<
  T extends Type,
  AP extends AllowedPreds<T> | "uid" | "type",
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = UnionToIntersection<
  AP extends "uid"
    ? { uid: (typeof Indexless)["uid"] }
    : AP extends "type"
    ? { type: (typeof Indexless)["type"] }
    : (EP[AP]["options"] extends {
        indexes: Array<keyof typeof StringIndex>;
      }
        ? (typeof StringIndex)[EP[AP]["options"]["indexes"][number]]
        : EP[AP]["options"] extends {
            indexes: Array<keyof typeof DateTimeIndex>;
          }
        ? (typeof DateTimeIndex)[EP[AP]["options"]["indexes"][number]]
        : EP[AP]["options"]["type"] extends PredicateType.GEO
        ? typeof GeoIndex
        : typeof DefaultIndex) &
        typeof Indexless
>;

export type AllowedFilter<
  T extends Type,
  AP extends AllowedPreds<T> | "uid" | "type"
> = {
  ops: PredFuncs<T, AP>;
  typeName: T["name"];
  field: AP extends "uid"
    ? "uid"
    : AP extends "type"
    ? T["name"]
    : `${T["name"]}.${AP}`;
};

export type ExtendedAllowedFilter<
  T extends Type,
  AP extends AllowedPreds<T> | "uid" | "type",
  VN extends string | undefined = undefined,
  AV extends unknown[] | undefined = undefined
> = AllowedFilter<T, AP> & { alias: VN; allowedValues: AV };

export function uidFilter<
  T extends Type,
  VN extends string | undefined = `${T["name"]} ID`
>(type: T, alias: VN = `${type.name} ID` as VN) {
  return {
    field: "uid",
    ops: { uid: Indexless.uid },
    typeName: type.name as T["name"],
    alias,
  } satisfies AllowedFilter<T, "uid"> & { alias: VN };
}

export function typeFilter<
  T extends Type,
  VN extends string | undefined = "Type"
>(type: T, alias: VN = "Type" as VN) {
  return {
    field: type.name as T["name"],
    ops: { type: Indexless.type },
    typeName: type.name as T["name"],
    alias,
    allowedValues: fromValues(type.name) as [T["name"]],
  } satisfies ExtendedAllowedFilter<T, "type", VN, [T["name"]]>;
}

export function defaultFilter<T extends Type>(type: T) {
  return {
    uid: uidFilter(type),
    type: typeFilter(type),
  };
}

export function allowedFilter<
  T extends Type,
  AP extends AllowedPreds<T>,
  VN extends string | undefined = undefined,
  AV extends unknown[] | undefined = undefined
>(
  type: T,
  predName: AP,
  viewName: VN,
  allowedValues: AV = undefined as AV
): ExtendedAllowedFilter<T, AP, VN, AV> {
  let indexes: Record<string, unknown> = {};

  const { options } = type.extendedPreds()[predName];

  if (!("indexes" in options)) {
    throw new Error("Predicate must have an index");
  }

  if (typeof options.indexes === "boolean") {
    if (options.type === PredicateType.GEO)
      indexes = { ...indexes, ...GeoIndex };
    else indexes = { ...indexes, ...DefaultIndex };
  } else if (options.indexes instanceof Array) {
    if (options.type === PredicateType.STRING) {
      const stringIdx = options.indexes.reduce(
        (acc, key) => ({ ...acc, ...StringIndex[key] }),
        {} as Record<string, unknown>
      );

      indexes = { ...indexes, ...stringIdx };
    } else {
      const dateIdx = (
        Object.keys(options.indexes) as (keyof typeof DateTimeIndex)[]
      ).reduce(
        (acc, key) => ({ ...acc, ...DateTimeIndex[key] }),
        {} as Record<string, unknown>
      );
      indexes = { ...indexes, ...dateIdx };
    }
  }

  const field = `${type.name}.${predName}` as AllowedFilter<T, AP>["field"];

  return {
    alias: viewName,
    field,
    typeName: type.name,
    ops: indexes as never,
    allowedValues,
  };
}
