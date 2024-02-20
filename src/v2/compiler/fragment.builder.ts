import type { Fragment, NextFragment } from "../fragment";
import type { DNode } from "../node";
import type { PredOpt, PredicateNode } from "../predicate";
import { buildStatic, buildEdge } from "./edge.builder";
import { buildNode } from "./node.builder";

export function buildFragment<DN extends DNode, F extends Fragment<DN>>(
  node: DN,
  fragment: F,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 2
): string {
  const predToNode = node.getPredToNode();
  const inners: string[] = [];

  for (const predName in fragment) {
    const opts = fragment[predName];
    if (!opts) continue;

    if (predName === "uid" || predName === "dtype") {
      const inner = buildStatic(
        predName as Parameters<typeof buildStatic>[0],
        opts as boolean | PredOpt,
        allowedValues,
        level
      );
      inners.push(inner);
      continue;
    }

    const currentNode = predToNode[predName];
    const predicates = currentNode.extendedPredicates;
    const pred = predicates[predName];

    if (typeof pred === "function") {
      const nextPredNode = pred() as PredicateNode<DNode>;
      for (const allowedValue of nextPredNode.nextNode.getAllowedValues())
        allowedValues.add(allowedValue);

      const inner = buildNode(
        currentNode,
        nextPredNode,
        predName,
        opts as NextFragment<DNode>,
        usedVars,
        allowedValues,
        level
      );
      inners.push(inner);
      continue;
    }

    const inner = buildEdge(
      predName,
      pred,
      currentNode,
      opts as boolean | PredOpt ,
      usedVars,
      allowedValues,
      level
    );
    inners.push(inner);
  }

  return inners.join("\n");
}
