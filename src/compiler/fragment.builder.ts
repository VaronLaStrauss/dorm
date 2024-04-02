import type { Fragment, FragmentReturn, NextFragment } from "../fragment";
import type { DNode } from "../node";
import type { CountOpt, PredOpt, PredicateNode } from "../predicate";
import { buildStatic, buildEdge, buildStaticCount } from "./edge.builder";
import { buildCountable, buildNode } from "./node.builder";

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

    if (predName === "dExtend") {
      const _opts = opts as FragmentReturn<never, never>;
      inners.push(_opts.fragmentStr ?? _opts.build());

      for (const [key, value] of _opts.usedVars) {
        usedVars.set(key, value);
      }
      continue;
    }

    if (predName === "uid" || predName === "dtype") {
      let inner: string;
      if (opts instanceof Array) {
        inner = opts
          .map((opt) => {
            if (typeof opt === "object" && "asCount" in opt) {
              return buildStaticCount(
                "uid",
                opt as CountOpt,
                allowedValues,
                level
              );
            }
            return buildStatic(
              predName as Parameters<typeof buildStatic>[0],
              opt as boolean | PredOpt,
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
            predName as Parameters<typeof buildStatic>[0],
            opts as boolean | PredOpt,
            allowedValues,
            level
          );
        }
      }
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

      let inner: string;
      if (opts instanceof Array) {
        inner = opts
          .map((opt) => {
            if (typeof opt === "object" && "asCount" in opt) {
              return buildCountable(
                currentNode,
                nextPredNode,
                predName,
                opt as CountOpt,
                allowedValues,
                level
              );
            }
            return buildNode(
              currentNode,
              nextPredNode,
              predName,
              opt as NextFragment<DNode>,
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
          inner = buildNode(
            currentNode,
            nextPredNode,
            predName,
            opts as NextFragment<DNode>,
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
            opt as boolean | PredOpt,
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
        opts as boolean | PredOpt,
        usedVars,
        allowedValues,
        level
      );
    }
    inners.push(inner);
  }

  return inners.join("\n");
}
