import type { Fragment, NextFragment } from "../fragment";
import type { DNode } from "../node";
import type { PredicateNode } from "../predicate";
import { spacing } from "../utils/spacing";
import { compileAsVar, compileDirectives } from "./filter.compiler";
import { buildFragment } from "./fragment.builder";

export function buildNode(
  currentNode: DNode,
  nextPredNode: PredicateNode<DNode>,
  predName: string,
  nextFragment: NextFragment<DNode>,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 1
): string {
  const _space = spacing(level);
  const { cascade, filter, opts, order, page, predicates } = nextFragment;

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

  const inner = buildFragment(
    nextPredNode.nextNode,
    predicates as Fragment<DNode>,
    usedVars,
    allowedValues,
    level + 1
  );

  return `${_space}${relationStr} ${directives} {\n${inner}\n${_space}}`;
}

export function forwardReverseNode(
  currentNode: DNode,
  nextPredNode: PredicateNode<DNode>,
  predName: string,
  allowedValues: Set<string>,
  alias?: string,
  asVar?: string
) {
  const nodeName = currentNode.name;
  const { relation } = nextPredNode;
  let type = "";
  if ("forward" in relation) type += `${nodeName}.${predName}`;
  else type += `~${nextPredNode.nextNode.name}.${relation.predName}`;
  if (asVar) type = `${compileAsVar(asVar, allowedValues)}${type}`;
  return `${alias ?? predName}: ${type}`;
}
