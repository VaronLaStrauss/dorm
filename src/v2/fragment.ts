import type { Query } from "../..";
import type { DNode, DPredicateNode } from "./node";
import type { PredOpt } from "./predicate";
import type { ExtendedPredicates } from "./types";

type FragmentReturn<
  DN extends DNode,
  QF extends Fragment<DN>,
  b extends boolean
> = b extends true
  ? { fragment: QF; build: () => string; fragmentStr: string }
  : { fragment: QF; build: () => string };

export function fragment<
  DN extends DNode,
  QF extends Fragment<DN>,
  _build extends boolean
>(
  node: DN,
  fragment: QF,
  buildNow: _build
): FragmentReturn<DN, QF, typeof buildNow> {
  function build() {
    // FIXME: node.build()
    return "";
  }
  if (!buildNow)
    return { fragment, build } as FragmentReturn<DN, QF, typeof buildNow>;
  return { fragment, build, fragmentStr: build() } as FragmentReturn<
    DN,
    QF,
    typeof buildNow
  >;
}

export type Fragment<DN extends DNode, EP = ExtendedPredicates<DN>> = {
  [predName in keyof EP]?: EP[predName] extends () => infer U
    ? U extends DPredicateNode<infer DN>
      ? {
          predicates?: Fragment<DN>;
          opts?: PredOpt;
        } & Query
      : never
    : boolean | PredOpt;
} & Partial<{ uid: boolean | PredOpt; dtype: boolean | PredOpt }>;
