import type { NextFragment } from "../fragment";
import type { DNode } from "../node";
import type { CountOpt, PredicateNode } from "../predicate";
export declare function buildNode(currentNode: DNode, nextPredNode: PredicateNode<DNode>, predName: string, nextFragment: NextFragment<DNode>, usedVars: Map<string, unknown>, allowedValues: Set<string>, level?: number): string;
export declare function relationNode(currentNode: DNode, nextPredNode: PredicateNode<DNode>, predName: string): string;
export declare function forwardReverseNode(currentNode: DNode, nextPredNode: PredicateNode<DNode>, predName: string, allowedValues: Set<string>, alias?: string, asVar?: string): string;
export declare function buildCountable(currentNode: DNode, nextPredNode: PredicateNode<DNode>, predName: string, opts: CountOpt, allowedValues: Set<string>, level?: number): string;
