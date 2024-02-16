import { build } from "./compiler/node.builder";
import type { DEdge } from "./edge";
import type { Fragment } from "./fragment";
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
  protected _predToType?: Record<keyof ExtendedPredicates<DNode>, DNode>;

  constructor(public readonly name: name, public predicates: NPR) {
    // this.init();
  }

  // init() {
  //   for (const predName in this.predicates) {
  //     const pred = this.predicates[predName];
  //     if ("opts" in pred) {
  //     }
  //     (pred as DEdge<EdgeInit>).nodeName = this.name;
  //   }
  // }

  extends<EN extends Array<DNode>>(...extendedTypes: EN) {
    return new DNodeExtended(this.name, this.predicates, extendedTypes);
  }

  get typeNames(): string[] {
    return [this.name];
  }

  build(
    fragment: Fragment<this>,
    usedVars = new Map<string, unknown>(),
    allowedValues = new Set<string>()
  ): string {
    return build(this, fragment, usedVars, allowedValues);
  }

  setPredToType(nodes: DNode[]) {
    const predToType: typeof this._predToType = {};
    for (const node of nodes) {
      const preds = node.predicates;
      for (const key in preds) {
        predToType[key] = node;
      }
    }
    this._predToType = predToType;
    return predToType;
  }

  getPredToNode() {
    let predToType = this._predToType;
    if (!predToType) predToType = this.setPredToType([this]);
    return predToType;
  }
}

export class DNodeExtended<
  EN extends Array<DNode> = Array<DNode>,
  name extends string = string,
  NPR extends NodePredicateRecord = NodePredicateRecord
> extends DNode<name, NPR> {
  constructor(name: name, predicates: NPR, public extendedNodes: EN) {
    super(name, predicates);
  }

  override getPredToNode(): Record<
    string | number,
    DNode<string, NodePredicateRecord>
  > {
    let predToType = this._predToType;
    if (!predToType)
      predToType = this.setPredToType([
        ...(this.extendedNodes as DNode[]),
        this as DNode,
      ]);
    return predToType;
  }

  override get typeNames() {
    return [this.name, ...this.extendedNodes.map((node) => node.name)];
  }
}

export function node<name extends string, NPR extends NodePredicateRecord>(
  name: name,
  predicates: NPR
) {
  return new DNode(name, predicates);
}

export function relation<DN extends DNode>(
  rel: true | (keyof ExtendedPredicates<DN> & string)
) {
  return rel;
}

export type Relation = ReturnType<typeof relation>;

export class DPredicateNode<
  NextDN extends DNode,
  Opts extends InitOpts = InitOpts
> {
  constructor(
    public readonly nextNode: NextDN,
    public readonly relation: Relation,
    public readonly opts: Opts = {} as Opts
  ) {}
}

export function predicateNode<
  NextDN extends DNode,
  Opts extends InitOpts = InitOpts
>(node: NextDN, relation: Relation, opts: Opts = {} as Opts) {
  return new DPredicateNode<NextDN, Opts>(node, relation, opts);
}
