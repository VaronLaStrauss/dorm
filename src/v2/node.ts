import { predToNode, type PredToNode } from "./compiler/pred-to-node";
import type { DEdge } from "./edge";
import type { ExtendedPredicates } from "./predicate";
import type { InitOpts } from "./types";

export type NodePredicate =
  // @ts-expect-error: DEdge is kept like this because error expected to allow for recursive types on typescript@5.3.3
  DEdge | (<T extends DNode>() => DPredicateNode<T>);

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

  extends<EN extends Array<DNode>>(...extendedTypes: EN) {
    return new DNodeExtended(this.name, this.predicates, extendedTypes);
  }

  get typeNames(): string[] {
    return [this.name];
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
  constructor(name: name, predicates: NPR, public extendedNodes: EN) {
    super(name, predicates);
  }

  override getPredToNode(): Record<
    string | number,
    DNode<string, NodePredicateRecord>
  > {
    let predToType = this._predToNode;
    if (!predToType)
      predToType = this.setPredToNode([
        ...(this.extendedNodes as DNode[]),
        this as never,
      ]);
    return predToType;
  }

  override get typeNames() {
    return [this.name, ...this.extendedNodes.map((node) => node.name)];
  }

  get extendedPredicates(): NodePredicateRecord {
    if (this._extendedPredicates) return this._extendedPredicates;
    const extended = this.extendedNodes.reduce((acc, curr) => {
      return { ...curr.extendedPredicates, ...acc };
    }, {} as Record<keyof (typeof this.extendedNodes)[number], (typeof this.extendedNodes)[number]["extendedPredicates"]>);

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

export function reverse<
  DN extends DNode,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>,
  predName extends keyof EP & string = keyof EP & string
>(predName: predName) {
  return { predName };
}

export type Reverse = ReturnType<typeof reverse>;

export function forward() {
  return { forward: true } as const;
}

export type Forward = ReturnType<typeof forward>;

export class DPredicateNode<
  NextDN extends DNode,
  Rel extends Reverse | Forward = Forward | Reverse,
  Opts extends InitOpts = InitOpts
> {
  constructor(
    public readonly nextNode: NextDN,
    public readonly relation: Rel,
    public readonly opts: Opts = {} as Opts
  ) {}
}

export function predicateNode<
  NextDN extends DNode,
  Rel extends Reverse | Forward = Forward | Reverse,
  Opts extends InitOpts = InitOpts
>(node: NextDN, relation: Rel, opts: Opts = {} as Opts) {
  return new DPredicateNode<NextDN, Rel, Opts>(node, relation, opts);
}
