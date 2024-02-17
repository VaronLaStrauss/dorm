import { compileDirectives, compileMainFunc } from "./compiler/filter.compiler";
import { buildRecurse, compileRecurse } from "./compiler/recurse.builder";
import type { DEdge, EdgeInit, EdgeType, InferEdge } from "./edge";
import type { FilterEdge, FilterFull, RecurseOpts } from "./filter";
import type { ExpoundPred } from "./fragment";
import { DNode } from "./node";
import type {
  DPredicateNode,
  ExtendedPredicates,
  PassOpt,
  PredOpt,
} from "./predicate";
import type { Flatten, UnionToIntersection } from "./utils/types";
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

  return { build, allowedValues, usedVars };
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
        ? EP[key] extends DEdge<EdgeInit>
          ? ExpoundPred<
              RF[key],
              EP[key]["opts"],
              key,
              InferEdge<EP[key]["opts"]>
            >
          : EP[key] extends () => DPredicateNode<infer NextDN>
          ? NextDN extends DNs[number]
            ? RF[key] extends {
                opts: PredOpt;
              } & FilterFull
              ? RF[key]["opts"]["alias"] extends string
                ? {
                    [k in RF[key]["opts"]["alias"]]: InferRecurseFragment<
                      NextDN,
                      DNs,
                      RF
                    >;
                  }
                : { [k in key]: InferRecurseFragment<NextDN, DNs, RF> }
              : { [k in key]: InferRecurseFragment<NextDN, DNs, RF> }
            : { [k in key]: InferRecurseFragment<NextDN, DNs, RF> }
          : never
        : never;
    }[keyof RF]
  >
>;

export type RecurseFragmentReturn<
  MainDN extends DNode,
  DNs extends DNode[],
  RF extends RecurseFragment<MainDN | DNs[number]>
> = {
  fragment: RF;
  build: () => string;
  type: InferRecurseFragment<MainDN, DNs, RF>;
  fragmentStr?: string;
  usedVars: Map<string, unknown>;
  allowedValues: Set<string>;
};

export type NextRecurseFragment =
  | boolean
  | Flatten<
      {
        opts?: PredOpt;
      } & FilterFull
    >;

export type RecurseFragment<
  CurrentDN extends DNode,
  EP extends ExtendedPredicates<CurrentDN> = ExtendedPredicates<CurrentDN>
> = {
  [predName in keyof EP]?: EP[predName] extends () => infer U
    ? U extends DPredicateNode<DNode>
      ? NextRecurseFragment
      : never
    : EP[predName] extends DEdge<infer Opts>
    ? Opts["type"] extends EdgeType.PASSWORD
      ? PassOpt
      : boolean | PredOpt
    : never;
} & Partial<{ uid: boolean | PredOpt; dtype: boolean | PredOpt }>;
