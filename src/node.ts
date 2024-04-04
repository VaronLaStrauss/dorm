import { predToNode, type PredToNode } from "./compiler/pred-to-node";
import type { DEdge } from "./edge";
import type { PredicateNode } from "./predicate";
import { extractAllNodes } from "./utils/extract-nodes";

export type NodePredicate =
  // @ts-expect-error: DEdge is kept like this because error expected to allow for recursive types on typescript@5.3.3
  DEdge | (<T extends DNode>() => PredicateNode<T>);

export interface NodePredicateRecord {
  [key: string]: NodePredicate;
}

export class DNode<
  name extends string = string,
  NPR extends NodePredicateRecord = NodePredicateRecord
> {
  protected _predToNode?: PredToNode;
  protected readonly allowedValues = new Set<string>();

  constructor(public readonly name: name, public predicates: NPR) {}

  extends<EN extends Array<DNode>>(...extendedNodes: EN) {
    return new DNodeExtended(this.name, this.predicates, () => extendedNodes);
  }

  get typeNames(): string[] {
    return [...new Set([this.name])];
  }

  setPredToNode(nodes: DNode[]) {
    const _predToNode = predToNode(nodes);
    this._predToNode = _predToNode;
    return _predToNode;
  }

  getPredToNode() {
    let predToType = this._predToNode;
    if (!predToType) predToType = this.setPredToNode([this]);
    return predToType;
  }

  getAllowedValues() {
    if (this.allowedValues.size) return this.allowedValues!;
    const _predToNode = this.getPredToNode();
    for (const key in _predToNode) {
      const node = _predToNode[key];
      this.allowedValues.add(`${node.name}.${key}`);
    }
    return this.allowedValues!;
  }

  get extendedPredicates(): NodePredicateRecord {
    return this.predicates;
  }
}

export class DNodeExtended<
  EN extends Array<DNode> = Array<DNode>,
  name extends string = string,
  NPR extends NodePredicateRecord = NodePredicateRecord
> extends DNode<name, NPR> {
  _extendedPredicates?: NodePredicateRecord;
  _extractedNodes?: DNode[];

  constructor(name: name, predicates: NPR, public extendedNodes: () => EN) {
    super(name, predicates);
  }

  override getPredToNode(): Record<
    string | number,
    DNode<string, NodePredicateRecord>
  > {
    let predToType = this._predToNode;
    if (!predToType) {
      const extractedNodes = this.extractedNodes;
      predToType = this.setPredToNode(extractedNodes);
    }
    return predToType;
  }

  override get typeNames() {
    const nodes = this.extractedNodes;
    return [...new Set([this.name, ...nodes.map((node) => node.name)])];
  }

  private get extractedNodes() {
    if (!this._extractedNodes) this._extractedNodes = extractAllNodes([this]);
    return this._extractedNodes;
  }

  override get extendedPredicates(): NodePredicateRecord {
    if (this._extendedPredicates) return this._extendedPredicates;
    const extendedNodes = this.extendedNodes();
    const extended = extendedNodes.reduce((acc, curr) => {
      return { ...curr.extendedPredicates, ...acc };
    }, {} as Record<keyof (typeof extendedNodes)[number], (typeof extendedNodes)[number]["extendedPredicates"]>);

    this._extendedPredicates = { ...this.predicates, ...extended };
    return this._extendedPredicates;
  }
}

export function node<name extends string, NPR extends NodePredicateRecord>(
  name: name,
  predicates: NPR
) {
  return new DNode(name, predicates);
}
