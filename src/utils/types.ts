import { PredicateInitOpts, PredicateRecord } from "../types";
import { PredicateType } from "./pred-type";

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type _PicklePredicates<PR extends PredicateRecord> = {
  [key in keyof PR]: PR[key]["options"]["type"] extends PredicateType.NODE
    ? key
    : never;
}[keyof PR];

export type AsArray<
  Opts extends PredicateInitOpts,
  V
> = Opts["asArray"] extends true ? Array<V> : V;

export type Nullable<
  Opts extends PredicateInitOpts,
  V
> = Opts["nullable"] extends true ? V | null | undefined : V;

export type NullableType<Opts extends PredicateInitOpts, V> = Nullable<
  Opts,
  AsArray<Opts, V>
>;

export type Composite<V> = {
  [key in keyof V]: V[key];
};
