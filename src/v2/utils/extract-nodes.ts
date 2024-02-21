import type { DNode, DNodeExtended } from "../node";

export function extractAllNodes(nodes: (DNode | DNodeExtended)[]) {
  const extracted: DNode[] = [];
  for (const node of nodes) {
    if ("_extendedPredicates" in node) {
      extracted.concat(...extractAllNodes(node.extendedNodes));
      continue;
    }
    extracted.push(node);
  }
  return extracted;
}
