import { Type, ExtendedType } from ".";
import { PickleReverse, Relation } from "../types";

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
