import type { DNode, DNodeExtended } from "./node";
import type { InitOpts, UnionToIntersection } from "./utils/types";

export function pred<alias extends string | undefined>(
  alias: alias = undefined as alias,
  asVar?: string,
  custom?: string
) {
  return { alias, asVar, custom };
}

export type PredOpt = ReturnType<typeof pred>;

export function pass<alias extends string | undefined>(
  pwdVar: string,
  alias: alias = undefined as alias,
  asVar?: string,
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

export type Reverse = ReturnType<typeof reverse>;

export function forward() {
  return { forward: true } as const;
}

export type Forward = ReturnType<typeof forward>;

export class DPredicateNode<
  NextDN extends DNode,
  Rel extends Reverse | Forward = Forward | Reverse,
  Opts extends InitOpts = InitOpts
> {
  constructor(
    public readonly nextNode: NextDN,
    public readonly relation: Rel,
    public readonly opts: Opts = {} as Opts
  ) {}
}

export function predicateNode<
  NextDN extends DNode,
  Rel extends Reverse | Forward = Forward | Reverse,
  Opts extends InitOpts = InitOpts
>(node: NextDN, relation: Rel, opts: Opts = {} as Opts) {
  return new DPredicateNode<NextDN, Rel, Opts>(node, relation, opts);
}

export type ExtendedPredicates<DN extends DNode | DNodeExtended> =
  DN extends DNodeExtended
    ? UnionToIntersection<
        DN["predicates"] & ExtendedPredicates<DN["extendedNodes"][number]>
      >
    : DN["predicates"];
