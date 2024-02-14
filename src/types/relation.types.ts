import type {
  ExtendedType,
  Forward,
  Relations,
  Reverse,
  Type,
} from "../classes";
import type { PredicateType, _PicklePredicates } from "../utils";
import type { ExtendedPredicates } from "./predicate.types";
import type { TypeRecord } from "./type.types";

export type PickleReverse<
  T extends Type,
  EP extends ExtendedPredicates<T> = ExtendedPredicates<T>
> = {
  [key in keyof EP]: EP[key]["options"]["type"] extends PredicateType.NODE
    ? key
    : never;
}[keyof EP];

export type Relation<T extends Type | ExtendedType> = {
  [key in keyof Pick<
    ExtendedPredicates<T>,
    _PicklePredicates<ExtendedPredicates<T>>
  >]: Forward | Reverse;
};

export type RelationsRecord<TR extends TypeRecord> = {
  [key in keyof TR]?: Relations<TR[key]>;
};
