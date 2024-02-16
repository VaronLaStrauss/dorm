import { compileAsVar, compileDirectives } from "./filter.compiler";
import type { Fragment, NextFragment } from "../fragment";
import type { DNode, DPredicateNode } from "../node";
import { buildEdge, buildStatic } from "./edge.builder";
import { spacing } from "../..";

export function build<DN extends DNode, F extends Fragment<DN>>(
  node: DN,
  fragment: F,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 1
): string {
  const predToNode = node.getPredToNode();
  const inners: string[] = [];

  for (const predName in fragment) {
    const opts = fragment[predName];
    if (!opts) continue;

    if (predName === "uid" || predName === "dtype") {
      const inner = buildStatic(
        predName as Parameters<typeof buildStatic>[0],
        opts,
        allowedValues,
        level
      );
      inners.push(inner);
      continue;
    }

    const currentNode = predToNode[predName];
    const pred = currentNode.predicates[predName];

    if (typeof pred === "function") {
      const nextPredNode = pred() as DPredicateNode<DNode>;
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
      node,
      opts,
      usedVars,
      allowedValues,
      level
    );
    inners.push(inner);
  }

  return inners.join("\n");
}

export function buildNode(
  currentNode: DNode,
  nextPredNode: DPredicateNode<DNode>,
  predName: string,
  nextFragment: NextFragment<DNode>,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 1
): string {
  const _space = spacing(level);
  const { cascade, filter, opts, order, page, predicates } = nextFragment;

  const relationStr = forwardReverseType(
    currentNode,
    nextPredNode,
    predName,
    allowedValues,
    opts?.alias,
    opts?.asVar
  );

  const directives = compileDirectives(
    { cascade, page, filter, order },
    usedVars,
    allowedValues
  );

  const inner = build(
    nextPredNode.nextNode,
    predicates as Fragment<DNode>,
    usedVars,
    allowedValues,
    level + 1
  );

  return `${_space}${relationStr} ${directives} {\n${inner}\n${_space}}`;
}

export function forwardReverseType(
  currentNode: DNode,
  nextPredNode: DPredicateNode<DNode>,
  predName: string,
  allowedValues: Set<string>,
  alias?: string,
  asVar?: string
) {
  const nodeName = currentNode.name;
  const { relation } = nextPredNode;
  let type = `${alias ?? predName}: `;
  if (typeof relation === "boolean") type += `${nodeName}.${predName}`;
  else type += `~${nextPredNode.nextNode.name}.${relation}`;
  if (asVar) type = `${compileAsVar(asVar, allowedValues)}${type}`;
  return type;
}
