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

export type Constructor<T extends Object = Object> = new () => T;

export type Predicate = BasicScalarTypes | SpecialScalarTypes | Constructor;

export type PredicateIndex<P extends Predicate> = P extends Constructor
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
    {
      next: Predicate;
      asArray?: boolean;
      index?: Record<string, boolean>;
      reverse?: string;
      encode?: <T>(v: T) => string;
      decode?: <T>(v: string) => T;
    }
  >;
  facets: Record<string, Record<string, BasicScalarTypes>>;
  dName: string;
}

export function Node(name: string) {
  return function <Class extends Constructor>(target: Class) {
    target.prototype.dName = name;
  };
}

export function Predicate<
  P extends Predicate,
  K extends (string | symbol) & keyof T,
  T extends Object
>(
  type: P,
  opts?: {
    index?: PredicateIndex<P>;
    asArray?: boolean;
  } & (P extends Constructor<infer U>
    ? { reverse?: keyof U }
    : {
        encode?: (v: T[K]) => string | (new (v: T[K]) => string);
        decode?: ((v: string) => T[K]) | (new (v: string) => T[K]);
      })
) {
  return function (_target: T, propertyKey: K) {
    const target = _target as any;
    if (!target.predicates) target.predicates = {};
    target.predicates[propertyKey as string] = { next: type, ...(opts ?? {}) };
  };
}

export function Facet<T extends Object>(key: keyof T, type: BasicScalarTypes) {
  return function (_target: T, propertyKey: string | symbol) {
    const target = _target as any;
    if (!target.facets) target.facets = {};
    if (!target.facets[key]) target.facets[key] = {};
    target.facets[key][propertyKey as string] = type;
  };
}

type FacetType<O extends Object, K extends keyof O, T> = T;

export function DateToIsoString(date: Date) {
  return date.toISOString();
}

@Node("User")
class User {
  @Predicate(BasicScalarTypes.string, { index: { exact: true } })
  email: string;

  @Facet("email", BasicScalarTypes.bool)
  active: FacetType<User, "email", string>;

  @Predicate(BasicScalarTypes.dateTime, {
    encode: DateToIsoString,
    decode: Date,
  })
  registeredDate: Date;

  @Predicate(User, {
    index: { count: true },
    asArray: true,
    reverse: "friends",
  })
  friends?: User[];

  @Facet("friends", BasicScalarTypes.dateTime)
  becameFriendsOn: FacetType<User, "friends", Date>;
}

type JsScalarTypes =
  | string
  | boolean
  | number
  | Date
  | string[]
  | boolean[]
  | number[]
  | Date[];

type Fragment<T extends Object> = {
  [key in keyof T]?: T[key] extends JsScalarTypes
    ? boolean // TODO: predopts?
    : T[key] extends Array<infer U> | infer U
    ? U extends Object
      ? Fragment<U> // TODO: filters, page, etc
      : never
    : never;
};

function fragment<T extends Object, F extends Fragment<T>>(
  _class: T,
  fragment: F
) {
  return fragment;
}

const frag = fragment(User.prototype, {
  friends: { friends: { email: true } },
});
