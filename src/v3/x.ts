import type { DateTimeIndex, GeoOps, StringIndex } from "..";

export enum BasicScalarTypes {
  string = "string",
  bool = "bool",
  int = "int",
  float = "float",
  dateTime = "dateTime",
}

export enum SpecialScalarTypes {
  password = "password",
  geo = "geo",
}

export type Predicate =
  | BasicScalarTypes
  | SpecialScalarTypes
  | (new () => Object);

export type PredicateIndex<P extends Predicate> = P extends new () => Object
  ? { count?: true }
  : P extends SpecialScalarTypes.geo
  ? { [key in keyof typeof GeoOps]?: true }
  : P extends BasicScalarTypes.dateTime
  ? { [key in keyof typeof DateTimeIndex]?: true }
  : P extends BasicScalarTypes.int
  ? { int?: true }
  : P extends BasicScalarTypes.bool
  ? { bool?: true }
  : P extends BasicScalarTypes.float
  ? { float?: true }
  : P extends BasicScalarTypes.string
  ? { [key in keyof typeof StringIndex]?: true }
  : never;

export class DNode {
  uid: string;
  dtype: string[];

  predicates: Record<
    string,
    { next: Predicate; asArray?: boolean; index: Record<string, boolean> }
  >;
  facets: Record<string, Record<string, BasicScalarTypes>>;
  dName: string;
}

export function Node(name: string) {
  return function <Class extends new () => Object>(target: Class) {
    target.prototype.dName = name;
  };
}

export function Predicate<P extends Predicate>(
  type: P,
  opts?: {
    indexes: PredicateIndex<P>;
    asArray?: boolean;
  } & (P extends new () => infer U ? { reverse?: keyof U } : {})
) {
  return function (target: any, propertyKey: string | symbol) {
    if (!target.predicates) target.predicates = {};
    target.predicates[propertyKey as string] = { next: type, ...(opts ?? {}) };
  } satisfies PropertyDecorator;
}

export function Facet(key: string, type: BasicScalarTypes) {
  return function (target: any, propertyKey: string | symbol) {
    if (!target.facets) target.facets = {};
    if (!target.facets[key]) target.facets[key] = {};
    target.facets[key][propertyKey as string] = type;
  } satisfies PropertyDecorator;
}

@Node("User")
class User {
  @Predicate(BasicScalarTypes.string, { indexes: { exact: true } })
  email: string;

  @Predicate(User, {
    indexes: { count: true },
    asArray: true,
    reverse: "friends",
  })
  friends?: User[];
}

const user = new User();

console.log(user);

type Fragment<T extends Object> = {
  [key in keyof T]?: T[key] extends string | boolean | number | Date
    ? boolean
    : T[key] extends Array<infer U> | infer U
    ? U extends Object
      ? Fragment<U>
      : never
    : never;
};

function fragment<T extends Object, F extends Fragment<T>>(
  _class: T,
  fragment: F
) {
  return fragment;
}

fragment(user, { friends: { friends: { email: true, friends: {} } } });
