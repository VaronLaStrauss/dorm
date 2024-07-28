import { type PredToNode } from "./compiler/pred-to-node";
import type { DEdge } from "./edge";
import type { PredicateNode } from "./predicate";
export type NodePredicate = DEdge | (<T extends DNode>() => PredicateNode<T>);
export interface NodePredicateRecord {
    [key: string]: NodePredicate;
}
export declare class DNode<name extends string = string, NPR extends NodePredicateRecord = NodePredicateRecord> {
    readonly name: name;
    predicates: NPR;
    protected _predToNode?: PredToNode;
    protected readonly allowedValues: Set<string>;
    constructor(name: name, predicates: NPR);
    extends<EN extends Array<DNode>>(extendedNodes: () => EN): DNodeExtended<EN, name, NPR>;
    get typeNames(): string[];
    setPredToNode(nodes: DNode[]): PredToNode;
    getPredToNode(): PredToNode;
    getAllowedValues(): Set<string>;
    get extendedPredicates(): NodePredicateRecord;
}
export declare class DNodeExtended<EN extends Array<DNode> = Array<DNode>, name extends string = string, NPR extends NodePredicateRecord = NodePredicateRecord> extends DNode<name, NPR> {
    extendedNodes: () => EN;
    _extendedPredicates?: NodePredicateRecord;
    _extractedNodes?: DNode[];
    constructor(name: name, predicates: NPR, extendedNodes: () => EN);
    getPredToNode(): Record<string | number, DNode<string, NodePredicateRecord>>;
    get typeNames(): string[];
    private get extractedNodes();
    get extendedPredicates(): NodePredicateRecord;
}
export declare function node<name extends string, NPR extends NodePredicateRecord>(name: name, predicates: NPR): DNode<name, NPR>;
