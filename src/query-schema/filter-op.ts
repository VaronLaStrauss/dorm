import { ExtendedPredicates, PredicateInitOpts } from "../types";
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
        : typeof DefaultIndex) & {
        has: (typeof Indexless)["has"];
        uid_in: (typeof Indexless)["uid_in"];
      }
>;

export type AllowedFilter<
  T extends Type,
  AP extends AllowedPreds<T> | "uid" | "type" = AllowedPreds<T>,
  VN extends string = string
> = {
  ops: PredFuncs<T, AP>;
  typeName: T["name"];
  jsType: "number" | "string" | "date" | "boolean";
  field:
    | (AP extends "uid"
        ? "uid"
        : AP extends "type"
        ? T["name"]
        : `${T["name"]}.${AP}`)
    | string;
  alias: VN;
};

export type ExtendedAllowedFilter<
  T extends Type,
  AP extends AllowedPreds<T> | "uid" | "type" = AllowedPreds<T>,
  VN extends string = string,
  AV extends unknown[] | undefined = undefined
> = AllowedFilter<T, AP, VN> & { allowedValues: AV };

export function uidFilter<
  T extends Type,
  VN extends string = `${T["name"]} ID`
>(type: T, alias: VN = `${type.name} ID` as VN) {
  return {
    field: "uid",
    ops: { uid: Indexless.uid },
    typeName: type.name as T["name"],
    alias,
    jsType: "string",
  } satisfies AllowedFilter<T, "uid", VN>;
}

export function typeFilter<T extends Type, VN extends string = "Type">(
  type: T,
  alias: VN = "Type" as VN
) {
  return {
    field: type.name as T["name"],
    ops: { type: Indexless.type },
    typeName: type.name as T["name"],
    alias,
    allowedValues: fromValues(type.name) as [T["name"]],
    jsType: "string",
  } satisfies ExtendedAllowedFilter<T, "type", VN, [T["name"]]>;
}

export function defaultFilters<T extends Type>(type: T) {
  return {
    uid: uidFilter(type),
    type: typeFilter(type),
  };
}

export function allowedFilter<
  T extends Type,
  AP extends AllowedPreds<T>,
  VN extends string,
  AV extends unknown[] | undefined = undefined
>(
  type: T,
  predName: AP,
  viewName: VN,
  allowedValues: AV = undefined as AV
): ExtendedAllowedFilter<T, AP, VN, AV> {
  let indexes: Record<string, unknown> = {
    has: Indexless["has"],
    uid_in: Indexless["uid_in"],
  };

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
    jsType: parseJsType(options),
  };
}

function parseJsType(ops: PredicateInitOpts): AllowedFilter<Type>["jsType"] {
  if (ops.type === PredicateType.BOOL) return "boolean";
  if (ops.type === PredicateType.DATETIME) return "date";
  if (
    ops.type === PredicateType.FLOAT ||
    ops.type === PredicateType.INT ||
    ops.type === PredicateType.GEO
  )
    return "number";
  return "string";
}
