import type { RecurseOpts } from "../filter";
import type { DNode } from "../node";
import type { DPredicateNode } from "../predicate";
import type { NextRecurseFragment, RecurseFragment } from "../recurse";
import { spacing } from "../utils/spacing";
import { buildEdge, buildStatic } from "./edge.builder";
import { compileDirectives } from "./filter.compiler";
import { forwardReverseNode } from "./node.builder";
import { type PredToNode } from "./pred-to-node";

export function buildRecurse<MainDN extends DNode, DNs extends DNode[]>(
  mainNode: MainDN,
  nodes: DNs,
  fragment: RecurseFragment<DNs[number] | MainDN>,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 2
) {
  const _predToNode = {
    ...nodes.reduce((acc, node) => {
      return { ...acc, ...node.getPredToNode() };
    }, {} as PredToNode),
    ...mainNode.getPredToNode(),
  };
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

    const currentNode = _predToNode[predName];
    const predicates = currentNode.extendedPredicates;

    const pred = predicates[predName];

    if (typeof pred === "function") {
      const nextPredNode = pred() as DPredicateNode<DNode>;
      const inner = buildRecurseNode(
        currentNode,
        nextPredNode,
        predName,
        opts as NextRecurseFragment,
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
      opts,
      usedVars,
      allowedValues,
      level
    );
    inners.push(inner);
  }

  return inners.join("\n");
}

export function buildRecurseNode(
  currentNode: DNode,
  nextPredNode: DPredicateNode<DNode>,
  predName: string,
  nextFragment: NextRecurseFragment,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 2
): string {
  const _space = spacing(level);
  if (typeof nextFragment === "boolean") {
    const relationStr = forwardReverseNode(
      currentNode,
      nextPredNode,
      predName,
      allowedValues
    );
    return `${_space}${relationStr}`;
  }

  const { cascade, filter, opts, order, page } = nextFragment;

  const relationStr = forwardReverseNode(
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

  return `${_space}${relationStr} ${directives}`;
}

export function compileRecurse(opts: RecurseOpts) {
  return typeof opts === "boolean"
    ? `@recurse`
    : `@recurse(loop: ${opts.loop}, depth: ${opts.depth})`;
}
