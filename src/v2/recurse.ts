import { compileDirectives, compileMainFunc } from "./compiler/filter.compiler";
import { buildRecurse, compileRecurse } from "./compiler/recurse.builder";
import type { DEdge, EdgeInit, EdgeType, InferEdge } from "./edge";
import type { FilterEdge, FilterFull, RecurseOpts } from "./filter";
import type { EdgeFragment, ExpoundPred, ExpoundStatic } from "./fragment";
import { DNode } from "./node";
import type {
  PredicateNode,
  ExtendedPredicates,
  PassOpt,
  PredOpt,
  CountOpt,
  PredNodeOpts,
} from "./predicate";
import type {
  Countable,
  Flatten,
  FragmentCommonReturn,
  InitOpts,
  NullableType,
  UnionToIntersection,
} from "./utils/types";
import { spacing } from "./utils/spacing";

export function recurse<
  MainDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<DNs[number] | MainDN>
>(_query: RecurseQuery<MainDN, DNs, RF>) {
  const _space = spacing(1);
  const { filter, cascade, fragOpts, recurseOpts } = _query;
  const { allowedValues, usedVars } = fragOpts;

  function build(
    key: string,
    usedVars: Map<string, unknown>,
    allowedValues: Set<string>
  ) {
    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      allowedValues
    );

    const mainFunc = compileMainFunc(_query, usedVars, allowedValues);
    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (recurseOpts) query += `${compileRecurse(recurseOpts)} `;
    if (fragOpts)
      query += `{\n${fragOpts.fragmentStr ?? fragOpts.build()}\n${_space}}`;
    return query;
  }

  return {
    build,
    allowedValues,
    usedVars,
    type: undefined as never as Array<(typeof _query)["fragOpts"]["type"]>,
  };
}

export function recurseFragment<
  MainDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<DNs[number] | MainDN>
>(
  mainNode: MainDN,
  nodes: DNs,
  fragment: RF,
  buildNow = true
): RecurseFragmentReturn<MainDN, DNs, RF> {
  const usedVars = new Map<string, unknown>();
  const allowedValues = new Set<string>([
    ...mainNode.getAllowedValues(),
    ...nodes.flatMap((node) => [...node.getAllowedValues()]),
  ]);

  function build() {
    return buildRecurse(mainNode, nodes, fragment, usedVars, allowedValues);
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

export type RecurseQuery<
  MainDN extends DNode,
  DNs extends DNode[],
  F extends RecurseFragment<MainDN | DNs[number]>
> = {
  fragOpts: RecurseFragmentReturn<MainDN, DNs, F>;
  mainFunc: FilterEdge;
  recurseOpts?: RecurseOpts;
} & FilterFull;

export type InferRecurseFragment<
  MainDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<MainDN | DNs[number]>,
  EP = UnionToIntersection<ExtendedPredicates<MainDN>>
> = Flatten<
  UnionToIntersection<
    {
      [key in keyof RF]: key extends keyof EP
        ? EP[key] extends DEdge<infer Opts>
          ? RF[key] extends boolean | PredOpt
            ? ExpoundPred<RF[key], Opts, key, InferEdge<Opts>>
            : RF[key] extends Array<PredOpt>
            ? ExpoundPred<RF[key][number], Opts, key, InferEdge<Opts>>
            : never // when undefined
          : EP[key] extends () => PredicateNode<
              infer NextDN,
              infer _,
              infer Opts
            >
          ? _SwitchingInferRecurseFragment<MainDN, NextDN, Opts, DNs, RF, key>
          : never
        : key extends "uid" | "dtype"
        ? RF[key] extends PredOpt | boolean
          ? ExpoundStatic<RF[key], key>
          : never
        : never;
    }[keyof RF]
  >
>;

type _SwitchingInferRecurseFragment<
  MainDN extends DNode,
  NextDN extends DNode,
  Opts extends PredNodeOpts,
  DNs extends DNode[],
  RF extends RecurseFragment<MainDN | DNs[number]>,
  key extends keyof RF
> = RF[key] extends CountOpt
  ? Countable<RF[key], Opts, key>
  : RF[key] extends {
      opts: PredOpt;
    }
  ? RF[key]["opts"]["alias"] extends string
    ? InferNextRecurseFragment<RF[key]["opts"]["alias"], NextDN, DNs, RF, Opts>
    : InferNextRecurseFragment<key, NextDN, DNs, RF, Opts>
  : RF[key] extends Array<infer RFOpts>
  ? RFOpts extends CountOpt
    ? Countable<RFOpts, Opts, key>
    : RFOpts extends { opts: PredOpt }
    ? RFOpts["opts"]["alias"] extends string
      ? InferNextRecurseFragment<RFOpts["opts"]["alias"], NextDN, DNs, RF, Opts>
      : InferNextRecurseFragment<key, NextDN, DNs, RF, Opts>
    : never
  : InferNextRecurseFragment<key, NextDN, DNs, RF, Opts>;

type InferNextRecurseFragment<
  key extends string | symbol | number,
  NextDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<NextDN | DNs[number]>,
  Opt extends InitOpts
> = {
  [k in key]: NullableType<Opt, InferRecurseFragment<NextDN, DNs, RF>>;
};

export type RecurseFragmentReturn<
  MainDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<MainDN | DNs[number]>
> = {
  fragment: RF;
  type: InferRecurseFragment<MainDN, DNs, RF>;
} & FragmentCommonReturn;

export type SingleNextRecurseFragment = Flatten<
  {
    opts?: PredOpt;
  } & FilterFull
>;

export type NextRecurseFragment =
  | boolean
  | SingleNextRecurseFragment
  | SingleNextRecurseFragment[];

export type RecurseFragment<
  CurrentDN extends DNode,
  EP extends ExtendedPredicates<CurrentDN> = ExtendedPredicates<CurrentDN>
> = {
  [predName in keyof EP]?: EP[predName] extends () => infer U
    ? U extends PredicateNode<DNode>
      ? NextRecurseFragment
      : never
    : EP[predName] extends DEdge<infer Opts>
    ? Opts["type"] extends EdgeType.PASSWORD
      ? PassOpt | PassOpt[]
      : EdgeFragment
    : never;
} & Partial<{ uid: boolean | PredOpt; dtype: boolean | PredOpt }>;
