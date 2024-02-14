import type { DEdge } from "./edge";
import type { InitOpts } from "./types";

export type NodePredicate =
  // @ts-expect-error: DEdge is kept like this because error expected to allow for recursive types on typescript@5.3.3
  DEdge | (<T extends DNode>() => DPredicateNode<T>);

export type NodePredicateRecord = {
  [key: string]: NodePredicate;
};

export class DNode<
  name extends string = string,
  NPR extends NodePredicateRecord = NodePredicateRecord
> {
  constructor(public readonly name: name, public predicates: NPR) {}

  extends<EN extends Array<DNode>>(...extendedTypes: EN) {
    return new DNodeExtended(this.name, this.predicates, extendedTypes);
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
}

export function node<name extends string, NPR extends NodePredicateRecord>(
  name: name,
  predicates: NPR
) {
  return new DNode(name, predicates);
}

export class DPredicateNode<
  DN extends DNode,
  Opts extends InitOpts = InitOpts
> {
  constructor(
    public readonly dormNode: DN,
    public readonly opts: Opts = {} as Opts
  ) {}
}

export function predicateNode<DN extends DNode, Opts extends InitOpts>(
  dormNode: DN,
  opts?: Opts
) {
  type T = Opts;
  return new DPredicateNode(dormNode, opts);
}
