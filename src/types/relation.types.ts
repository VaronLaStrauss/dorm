import { ExtendedPredicates } from "./predicate.types";
import { Type, ExtendedType, forward, reverse, Relations } from "../classes";
import { TypeRecord } from "./type.types";
import { _PicklePredicates, PredicateType } from "../utils";

export type PickleReverse<T extends Type> = {
  [key in keyof T["predicateRecord"]]: T["predicateRecord"][key]["options"]["type"] extends PredicateType.NODE
    ? key
    : never;
}[keyof T["predicateRecord"]];

export type Relation<T extends Type | ExtendedType> = {
  [key in keyof Pick<
    ExtendedPredicates<T>,
    _PicklePredicates<ExtendedPredicates<T>>
  >]: ReturnType<typeof forward> | ReturnType<typeof reverse>;
};

export type RelationsRecord<TR extends TypeRecord> = {
  [key in keyof TR]?: Relations<TR[key]>;
};
