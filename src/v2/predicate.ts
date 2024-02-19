import type { DNode, DNodeExtended } from "./node";
import type { InitOpts, UnionToIntersection } from "./utils/types";

export function pred<
  alias extends string | undefined,
  asVar extends string | undefined
>(
  alias: alias = undefined as alias,
  asVar: asVar = undefined as asVar,
  custom?: string
) {
  return { alias, asVar, custom };
}

export type PredOpt = ReturnType<typeof pred>;

export function pass<
  alias extends string | undefined,
  asVar extends string | undefined
>(
  pwdVar: string,
  alias: alias = undefined as alias,
  asVar: asVar = undefined as asVar,
  custom?: string
) {
  return { pwdVar, alias, asVar, custom };
}

export type PassOpt = ReturnType<typeof pass>;

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

export function predicateNode<
  NextDN extends DNode,
  Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>,
  Opts extends InitOpts = InitOpts
>(nextNode: NextDN, relation: Rel, opts: Opts = {} as Opts) {
  return { nextNode, relation, opts };
}

export type PredicateNode<
  NextDN extends DNode,
  Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>,
  Opts extends InitOpts = InitOpts
> = ReturnType<typeof predicateNode<NextDN, Rel, Opts>>;

export type ExtendedPredicates<DN extends DNode | DNodeExtended> =
  DN extends DNodeExtended
    ? UnionToIntersection<
        DN["predicates"] & ExtendedPredicates<DN["extendedNodes"][number]>
      >
    : DN["predicates"];
