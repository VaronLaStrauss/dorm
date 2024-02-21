import type { DNode, DNodeExtended } from "../node";

export function extractAllNodes(nodes: (DNode | DNodeExtended)[]) {
  let extracted: DNode[] = [];
  for (const node of nodes) {
    if ("_extendedPredicates" in node) {
      extracted = extracted.concat(...extractAllNodes(node.extendedNodes));
      continue;
    }
    extracted.push(node);
  }
  return extracted;
}
