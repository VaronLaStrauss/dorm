import type { Forward, PredicateNode, Reverse } from "./predicate";
import type { DNode } from "./node";
import { spacing } from "./utils/spacing";
import type { DEdge, EdgeInit } from "./edge";

export function schema(...nodes: DNode[]) {
  const schema: string[] = [];
  for (const node of nodes) {
    schema.push(buildNode(node));
  }

  return schema.join("\n");
}

export function buildNode(node: DNode) {
  const innerPreds: string[] = [];
  const outerPreds: string[] = [];
  const space = spacing(1);

  const preds = node.extendedPredicates;
  const predToNode = node.getPredToNode();

  for (const predKey in preds) {
    const pred = preds[predKey];
    const actualNode = predToNode[predKey];
    const typeDeclaration = `${actualNode.name}.${predKey}`;

    if (typeof pred === "function") {
      const {
        nextNode,
        opts: { asArray, count },
        relation,
      } = pred() as PredicateNode<DNode>;

      const predType = asArray ? "[uid]" : "uid";
      let outerPred = `${typeDeclaration}: ${predType}`;
      let innerPred = "";

      if ("predName" in relation) {
        const predToNode = nextNode.getPredToNode();
        const actualNode = predToNode[relation.predName];
        const predType = asArray ? `[${actualNode.name}]` : actualNode.name;
        innerPred = `<~${actualNode.name}.${relation.predName}>: ${predType}`;
        outerPred = "";
      } else {
        const predType = asArray ? `[${nextNode.name}]` : nextNode.name;
        innerPred = `${actualNode.name}.${predKey}: ${predType}`;
        outerPred += " @reverse ";
        if (count) outerPred += "@count ";
        outerPred += ".";
      }

      innerPreds.push(space + innerPred);
      if (actualNode.name === node.name) outerPreds.push(outerPred);
      continue;
    }

    const _pred = pred as DEdge<EdgeInit>;
    const { opts } = _pred;
    const { type, asArray, count } = opts;
    const predType = asArray ? `[${type}]` : type;
    let outerPred = `${typeDeclaration}: ${predType}`;

    if ("indexes" in opts) {
      const indexes: string[] = [];
      const { indexes: _indexes } = opts;
      if (typeof _indexes === "boolean") indexes.push(type);
      else
        for (const indexKey of _indexes as Array<string>) {
          indexes.push(indexKey);
        }
      outerPred += ` @index(${indexes.join(", ")})`;
    }

    let innerPred = typeDeclaration;

    if (count) outerPred += ` @count`;
    if (actualNode.name !== node.name) outerPred = "";

    if (outerPred.trim().length) {
      outerPred += " .";
      outerPreds.push(outerPred);
    }

    innerPreds.push(space + innerPred);
  }

  return `${outerPreds.join("\n")}\ntype ${node.name} {\n${innerPreds.join(
    "\n"
  )}\n}\n`;
}
