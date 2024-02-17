import { type DNode } from "../node";
import type { ExtendedPredicates } from "../predicate";

export type PredToNode = Record<keyof ExtendedPredicates<DNode>, DNode>;

export function predToNode(nodes: DNode[]) {
  const predToType: PredToNode = {};
  for (const node of nodes) {
    const preds = node.predicates;
    for (const key in preds) {
      predToType[key] = node;
    }
  }

  return predToType;
}
