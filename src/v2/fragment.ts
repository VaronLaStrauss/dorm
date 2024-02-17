import type { NullableType } from "./types";
import type { DEdge, EdgeInit, InferEdge } from "./edge";
import type { DNode, DPredicateNode } from "./node";
import type {
  ExtendedPredicates,
  PassOpt,
  PredOpt,
  PredicateType,
} from "./predicate";
import type { Flatten, InitOpts, UnionToIntersection } from "./types";
import type { FilterFull } from "./filter";
import { buildFragment } from "./compiler/fragment.builder";

export type FragmentReturn<DN extends DNode, F extends Fragment<DN>> = {
  fragment: F;
  build: () => string;
  type: InferFragment<DN, F>;
  fragmentStr?: string;
  usedVars: Map<string, unknown>;
  allowedValues: Set<string>;
};

export function fragment<DN extends DNode, F extends Fragment<DN>>(
  node: DN,
  fragment: F,
  buildNow = true
): FragmentReturn<DN, F> {
  const usedVars = new Map<string, unknown>();
  const allowedValues = new Set<string>([...node.getAllowedValues()]);

  function build() {
    return buildFragment(node, fragment, usedVars, allowedValues, 2);
  }

  return {
    build,
    fragment,
    type: undefined as never,
    fragmentStr: buildNow ? build() : undefined,
    usedVars,
    allowedValues,
  };
}

export type NextFragment<NextDN extends DNode> = {
  predicates?: Fragment<NextDN>;
  opts?: PredOpt;
} & FilterFull;

export type Fragment<
  CurrentDN extends DNode,
  EP extends ExtendedPredicates<CurrentDN> = ExtendedPredicates<CurrentDN>
> = {
  [predName in keyof EP]?: EP[predName] extends () => infer U
    ? U extends DPredicateNode<infer NextDN>
      ? NextFragment<NextDN>
      : never
    : EP[predName] extends DEdge<infer Opts>
    ? Opts["type"] extends PredicateType.PASSWORD
      ? PassOpt
      : boolean | PredOpt
    : never;
} & Partial<{ uid: boolean | PredOpt; dtype: boolean | PredOpt }>;

export type InferFragment<
  DN extends DNode,
  QF extends Fragment<DN>,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>
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
          : EP[key] extends () => DPredicateNode<infer NextDN>
          ? QF[key] extends {
              predicates: Fragment<NextDN>;
              opts?: PredOpt;
            }
            ? ExpoundPred<
                QF[key]["opts"],
                ReturnType<EP[key]>["opts"],
                key,
                InferFragment<NextDN, QF[key]["predicates"]>
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

export type ExpoundPred<
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

export type ExpoundStaticValue<key extends "uid" | "dtype"> = key extends "uid"
  ? string
  : string[];

export type ExpoundStatic<
  PO extends PredOpt | boolean,
  key extends "uid" | "dtype"
> = PO extends PredOpt
  ? PO["alias"] extends string
    ? { [k in PO["alias"]]: ExpoundStaticValue<key> }
    : { [k in key]: ExpoundStaticValue<key> }
  : { [k in key]: ExpoundStaticValue<key> };
