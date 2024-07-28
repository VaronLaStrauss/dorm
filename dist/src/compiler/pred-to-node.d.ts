import { type DNode } from "../node";
import type { ExtendedPredicates } from "../predicate";
export type PredToNode = Record<keyof ExtendedPredicates<DNode>, DNode>;
export declare function predToNode(nodes: DNode[]): PredToNode;
