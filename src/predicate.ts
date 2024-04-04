import type { DNode, DNodeExtended } from "./node";
import type { InitOpts, UnionToIntersection } from "./utils/types";

export function pred<
  alias extends string | undefined,
  asVar extends string | undefined
>(alias: alias = undefined as alias, asVar: asVar = undefined as asVar) {
  return { alias, asVar };
}

export type PredOpt = ReturnType<typeof pred>;

export function pass<
  alias extends string | undefined,
  asVar extends string | undefined
>(
  pwdVar: string,
  alias: alias = undefined as alias,
  asVar: asVar = undefined as asVar
) {
  return { pwdVar, alias, asVar };
}

export type PassOpt = ReturnType<typeof pass>;

// export function outsource<
//   alias extends string | undefined,
//   asVar extends string | undefined
// >(
//   outsourceVar: string,
//   alias: alias = undefined as alias,
//   asVar: asVar = undefined as asVar
// ) {
//   return { outsourceVar, alias, asVar };
// }

// export type OutsourceOpt = ReturnType<typeof outsource>;

export function reverse<
  DN extends DNode,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>,
  predName extends keyof EP & string = keyof EP & string
>(predName: predName) {
  return { predName };
}

export type Reverse<DN extends DNode> = ReturnType<typeof reverse<DN>>;

export function forward() {
  return { forward: true } as const;
}

export type Forward = ReturnType<typeof forward>;

export function count<
  alias extends string | undefined,
  asVar extends string | undefined
>(alias: alias = undefined as alias, asVar: asVar = undefined as asVar) {
  return { asCount: true as true, alias, asVar };
}

export type CountOpt = ReturnType<typeof count>;

// type AggregationFunc = "min" | "max" | "sum" | "avg";

// export function aggregate<
//   alias extends string | undefined,
//   asVar extends string | undefined
// >(
//   func: AggregationFunc,
//   alias: alias = undefined as alias,
//   asVar: asVar = undefined as asVar
// ) {
//   return { asCount: true as true, alias, asVar, aggregationFunc: func };
// }

// export type AggregateOpt = ReturnType<typeof aggregate>;

export type PredNodeOpts = InitOpts & { count?: true; asType?: boolean };

export function predicateNode<
  NextDN extends DNode,
  Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>,
  Opts extends PredNodeOpts = PredNodeOpts
>(nextNode: NextDN, relation: Rel, opts: Opts = {} as Opts) {
  return { nextNode, relation, opts };
}

export type PredicateNode<
  NextDN extends DNode,
  Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>,
  Opts extends PredNodeOpts = PredNodeOpts
> = ReturnType<typeof predicateNode<NextDN, Rel, Opts>>;

export type ExtendedPredicates<DN extends DNode | DNodeExtended> =
  DN extends DNodeExtended
    ? UnionToIntersection<
        DN["predicates"] &
          ExtendedPredicates<ReturnType<DN["extendedNodes"]>[number]>
      >
    : DN["predicates"];
