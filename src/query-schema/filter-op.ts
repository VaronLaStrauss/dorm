import { t } from "elysia";
import { ExtendedPredicates, Type } from "../classes";
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

export type AllowedPreds<T extends Type> = keyof Pick<
  ExtendedPredicates<T>,
  PickleFilterable<T>
> &
  string;

export type PredFuncs<
  T extends Type,
  AP extends AllowedPreds<T> = AllowedPreds<T>,
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = UnionToIntersection<
  (EP[AP]["options"] extends {
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
  AP extends AllowedPreds<T> = AllowedPreds<T>
> = {
  ops: PredFuncs<T, AP>;
  typeName: T["name"];
  field: AP | string;
};

export function allowedFilter<
  T extends Type,
  AP extends AllowedPreds<T> = AllowedPreds<T>,
  VN extends string | undefined = undefined
>(type: T, preds: AP, viewName: VN): AllowedFilter<T> & { alias: VN } {
  let indexes: Record<string, unknown> = { ...Indexless };
  const predName = preds;

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

  return {
    alias: viewName,
    field: predName,
    typeName: type.name,
    ops: indexes as never,
  };
}
