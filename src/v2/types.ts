import type { DEdge, EdgeInit, InferEdge } from "./edge";
import type { Fragment } from "./fragment";
import type { DNode, DNodeExtended, DPredicateNode } from "./node";
import type { PredOpt } from "./predicate";

export type Composite<V> = {
  [key in keyof V]: V[key];
};

export type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type ExtendedPredicates<DN extends DNode | DNodeExtended> =
  DN extends DNodeExtended
    ? UnionToIntersection<
        DN["predicates"] & ExtendedPredicates<DN["extendedNodes"][number]>
      >
    : DN["predicates"];

export type InitOpts = {
  nullable?: true;
  asArray?: true;
};

export type AsArray<Opts extends InitOpts, V> = Opts["asArray"] extends true
  ? Array<V>
  : V;

export type Nullable<Opts extends InitOpts, V> = Opts["nullable"] extends true
  ? V | null | undefined
  : V;

export type NullableType<Opts extends InitOpts, V> = Nullable<
  Opts,
  AsArray<Opts, V>
>;

type ExpoundPred<
  PO extends PredOpt | boolean | undefined,
  Opts extends InitOpts | undefined,
  key extends string | number | symbol,
  V
> = PO extends PredOpt
  ? PO["alias"] extends string
    ? Opts extends InitOpts
      ? Opts["nullable"] extends true
        ? { [k in PO["alias"]]?: NullableType<Opts, V> }
        : { [k in PO["alias"]]: NullableType<Opts, V> }
      : { [k in PO["alias"]]: V }
    : { [k in key]: V }
  : Opts extends InitOpts
  ? Opts["nullable"] extends true
    ? { [k in key]?: NullableType<Opts, V> }
    : { [k in key]: NullableType<Opts, V> }
  : { [k in key]: V };

type ExpoundStaticValue<key extends "uid" | "dtype"> = key extends "uid"
  ? string
  : string[];

type ExpoundStatic<
  PO extends PredOpt | boolean,
  key extends "uid" | "dtype"
> = PO extends PredOpt
  ? PO["alias"] extends string
    ? { [k in PO["alias"]]: ExpoundStaticValue<key> }
    : { [k in key]: ExpoundStaticValue<key> }
  : { [k in key]: ExpoundStaticValue<key> };

export type InferReturn<
  DN extends DNode,
  QF extends Fragment<DN>,
  EP = ExtendedPredicates<DN>
> = Flatten<
  UnionToIntersection<
    {
      [key in keyof QF]: key extends keyof EP
        ? EP[key] extends DEdge<EdgeInit>
          ? QF[key] extends boolean | PredOpt
            ? ExpoundPred<
                QF[key],
                EP[key]["opts"],
                key,
                InferEdge<EP[key]["opts"]>
              >
            : never
          : EP[key] extends () => DPredicateNode<infer U>
          ? QF[key] extends {
              predicates: Fragment<U>;
              opts?: PredOpt;
            }
            ? ExpoundPred<
                QF[key]["opts"],
                ReturnType<EP[key]>["opts"],
                key,
                InferReturn<U, QF[key]["predicates"]>
              >
            : never
          : never
        : key extends "uid" | "dtype"
        ? QF[key] extends PredOpt | boolean
          ? ExpoundStatic<QF[key], key>
          : never
        : never;
    }[keyof QF]
  >
>;
