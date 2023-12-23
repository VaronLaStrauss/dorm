import { PredicateType } from "../utils/pred-type";
import { _PicklePredicates } from "../utils/types";
import { ExtendedPredicates, ExtendedType, Type, TypeRecord } from "./type";

type PickleReverse<T extends Type> = {
  [key in keyof T["predicateRecord"]]: T["predicateRecord"][key]["options"]["type"] extends PredicateType.UID
    ? key
    : never;
}[keyof T["predicateRecord"]];

export class Forward<T extends Type = Type> {
  constructor(public type: T) {}
}

export class Reverse<
  T extends Type = Type,
  Field extends PickleReverse<T> = PickleReverse<T>
> {
  constructor(public type: T, public field: Field) {}
}

export function forward<T extends Type>(type: T) {
  return new Forward(type);
}

export function reverse<T extends Type, field extends PickleReverse<T>>(
  type: T,
  field: field
) {
  return new Reverse(type, field);
}

export type Relation<T extends Type | ExtendedType> = {
  [key in keyof Pick<
    ExtendedPredicates<T>,
    _PicklePredicates<ExtendedPredicates<T>>
  >]: ReturnType<typeof forward> | ReturnType<typeof reverse>;
};

export class Relations<
  T extends Type | ExtendedType = Type,
  R extends Relation<T> = Relation<T>
> {
  constructor(public type: T, public relations: R) {}
}

export function relations<T extends Type | ExtendedType, R extends Relation<T>>(
  type: T,
  relations: R
) {
  return new Relations(type, relations);
}

export type RelationsRecord<TR extends TypeRecord> = {
  [key in keyof TR]?: Relations<TR[key]>;
};

// ! Working
// const x = createType("waw", {
//   x: predicate({ type: PredicateType.UID, asArray: true }),
// });
// const x2 = createType("waw", {
//   x2: predicate({ type: PredicateType.UID, asArray: true }),
// });
// const y = createType("another", {
//   y: predicate({ type: PredicateType.STRING, asArray: true, nullable: true }),
// }).extends(x, x2);

// new Relations(x, {});

// new Relations(x2, {});

// const r = relations(y, {
//   x: forward(x),
//   x2: reverse(x, "x"),
// });
