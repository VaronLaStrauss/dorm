import { buildFragment } from "./compiler/fragment.builder";
import type { DEdge, EdgeType, InferEdge } from "./edge";
import type { FilterFull } from "./filter";
import type { DNode } from "./node";
import type {
  CountOpt,
  ExtendedPredicates,
  PassOpt,
  PredNodeOpts,
  PredOpt,
  PredicateNode,
} from "./predicate";
import type {
  Countable,
  Flatten,
  FragmentCommonReturn,
  InitOpts,
  NullableType,
  UnionToIntersection,
} from "./utils/types";

export type FragmentReturn<DN extends DNode, F extends Fragment<DN>> = {
  fragment: F;
  type: InferFragment<DN, F>;
} & FragmentCommonReturn;

type FragmentOpts = {
  allowedValues?: Set<string>;
  usedVars?: Map<string, unknown>;
};

export function fragment<DN extends DNode, F extends Fragment<DN>>(
  node: DN,
  fragment: F,
  opts: FragmentOpts = {
    allowedValues: new Set<string>(),
    usedVars: new Map<string, unknown>(),
  },
  buildNow = true
): FragmentReturn<DN, F> {
  const { allowedValues: _av, usedVars: _uv } = opts;
  const usedVars = new Map<string, unknown>([...(_uv ?? [])]);
  const allowedValues = new Set<string>([
    ...node.getAllowedValues(),
    ...node.typeNames,
    ...(_av ?? []),
  ]);

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

export function multi<
  DN extends DNode,
  Frags extends Array<NodeFragment<DN, InitOpts>>
>(_type: DN, ...frags: [...Frags]) {
  return frags;
}

export type NextFragment<NextDN extends DNode> = {
  predicates?: Fragment<NextDN>;
  opts?: PredOpt;
} & FilterFull;

export type EdgeFragment = boolean | PredOpt | PredOpt[];
type NodeFragment<DN extends DNode, Opts extends PredNodeOpts> =
  | (Opts["count"] extends true ? CountOpt : never)
  | NextFragment<DN>;

export type Fragment<
  CurrentDN extends DNode,
  EP extends ExtendedPredicates<CurrentDN> = ExtendedPredicates<CurrentDN>
> = {
  [predName in keyof EP]?: EP[predName] extends () => PredicateNode<
    infer NextDN,
    infer _,
    infer Opts
  >
    ? NodeFragment<NextDN, Opts> | ReturnType<typeof multi<NextDN, any>>
    : EP[predName] extends DEdge<infer Opts>
    ? Opts["type"] extends EdgeType.PASSWORD
      ? PassOpt | PassOpt[]
      : EdgeFragment
    : never; // : EdgeFragment;
} & {
  uid?: boolean | PredOpt | CountOpt | (PredOpt | CountOpt)[];
  dtype?: boolean | PredOpt;
  dExtend?: FragmentReturn<CurrentDN, any>;
};

export type InferFragment<
  DN extends DNode,
  QF extends Fragment<DN>,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>
> = Flatten<
  UnionToIntersection<
    {
      [key in keyof QF]: key extends keyof EP
        ? EP[key] extends DEdge<infer Opts>
          ? QF[key] extends boolean | PredOpt
            ? ExpoundPred<QF[key], Opts, key, InferEdge<Opts>>
            : QF[key] extends PredOpt[]
            ? ExpoundPred<QF[key][number], Opts, key, InferEdge<Opts>>
            : never
          : EP[key] extends () => PredicateNode<
              infer NextDN,
              infer _,
              infer Opts
            >
          ? QF[key] extends NextFragment<NextDN>
            ? QF[key]["predicates"] extends Fragment<NextDN>
              ? ExpoundPred<
                  QF[key]["opts"],
                  Opts,
                  key,
                  InferFragment<NextDN, QF[key]["predicates"]>
                >
              : never
            : QF[key] extends CountOpt
            ? Countable<QF[key], Opts, key>
            : QF[key] extends Array<infer QFPortion>
            ? QFPortion extends NextFragment<NextDN>
              ? QFPortion["predicates"] extends Fragment<NextDN>
                ? ExpoundPred<
                    QFPortion["opts"],
                    Opts,
                    key,
                    InferFragment<NextDN, QFPortion["predicates"]>
                  >
                : never
              : QFPortion extends CountOpt
              ? Countable<QFPortion, Opts, key>
              : never
            : never
          : never
        : key extends "uid" | "dtype"
        ? QF[key] extends CountOpt
          ? Countable<QF[key], "uid", key>
          : QF[key] extends PredOpt | boolean
          ? ExpoundStatic<QF[key], key>
          : QF[key] extends Array<infer PO>
          ? PO extends CountOpt
            ? Countable<PO, "uid", key>
            : PO extends PredOpt | boolean
            ? ExpoundStatic<PO, key>
            : never
          : never
        : key extends "dExtend"
        ? QF[key] extends FragmentReturn<DN, any>
          ? QF[key]["type"]
          : never
        : never;
    }[keyof QF]
  >
>;

export type ExpoundPred<
  PO extends PredOpt | boolean | undefined,
  Opts extends InitOpts,
  key extends string | number | symbol,
  V
> = PO extends PredOpt
  ? PO["alias"] extends string
    ? Opts["nullable"] extends true
      ? { [k in PO["alias"]]?: NullableType<Opts, V> }
      : { [k in PO["alias"]]: NullableType<Opts, V> }
    : { [k in key]: V }
  : Opts["nullable"] extends true
  ? { [k in key]?: NullableType<Opts, V> }
  : { [k in key]: NullableType<Opts, V> };

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
