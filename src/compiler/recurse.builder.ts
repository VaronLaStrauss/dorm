import type { RecurseOpts } from "../filter";
import type { DNode } from "../node";
import type { CountOpt, PredOpt, PredicateNode } from "../predicate";
import type { RecurseFragment, SingleNextRecurseFragment } from "../recurse";
import { spacing } from "../utils/spacing";
import { buildEdge, buildStatic, buildStaticCount } from "./edge.builder";
import { compileDirectives } from "./filter.compiler";
import { buildCountable, forwardReverseNode } from "./node.builder";
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
      let inner: string;
      if (opts instanceof Array) {
        inner = opts
          .map((opt) => {
            if ("asCount" in opt) {
              return buildStaticCount(
                "uid",
                opt as CountOpt,
                allowedValues,
                level
              );
            }
            return buildStatic(
              predName as Parameters<typeof buildStatic>[0],
              opt,
              allowedValues,
              level
            );
          })
          .join("\n");
      } else {
        if (typeof opts === "object" && "asCount" in opts) {
          inner = buildStaticCount(
            "uid",
            opts as CountOpt,
            allowedValues,
            level
          );
        } else {
          inner = buildStatic(
            predName,
            opts as boolean | PredOpt,
            allowedValues,
            level
          );
        }
      }
      inners.push(inner);
      continue;
    }

    const currentNode = _predToNode[predName];
    const predicates = currentNode.extendedPredicates;

    const pred = predicates[predName];

    if (typeof pred === "function") {
      const nextPredNode = pred() as PredicateNode<DNode>;
      let inner: string;
      if (opts instanceof Array) {
        inner = opts
          .map((opt) => {
            if ("asCount" in opt) {
              return buildCountable(
                currentNode,
                nextPredNode,
                predName,
                opt as CountOpt,
                allowedValues,
                level
              );
            }
            return buildRecurseNode(
              currentNode,
              nextPredNode,
              predName,
              opt as SingleNextRecurseFragment,
              usedVars,
              allowedValues,
              level
            );
          })
          .join("\n");
      } else {
        if (typeof opts === "object" && "asCount" in opts) {
          inner = buildCountable(
            currentNode,
            nextPredNode,
            predName,
            opts as CountOpt,
            allowedValues,
            level
          );
        } else {
          inner = buildRecurseNode(
            currentNode,
            nextPredNode,
            predName,
            opts as SingleNextRecurseFragment,
            usedVars,
            allowedValues,
            level
          );
        }
      }
      inners.push(inner);
      continue;
    }

    let inner: string;
    if (opts instanceof Array) {
      inner = opts
        .map((opt) =>
          buildEdge(
            predName,
            pred,
            currentNode,
            opt,
            usedVars,
            allowedValues,
            level
          )
        )
        .join("\n");
    } else {
      inner = buildEdge(
        predName,
        pred,
        currentNode,
        opts,
        usedVars,
        allowedValues,
        level
      );
    }
    inners.push(inner);
  }

  return inners.join("\n");
}

export function buildRecurseNode(
  currentNode: DNode,
  nextPredNode: PredicateNode<DNode>,
  predName: string,
  nextFragment: SingleNextRecurseFragment,
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
