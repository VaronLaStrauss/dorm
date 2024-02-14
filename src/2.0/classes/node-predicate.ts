type DormNodePredicate =
  | DormEdge
  | (<T extends DormNode>() => DormNodeAsPredicate<T>);
interface DormNodePredicateRecord {
  [key: string]: DormNodePredicate;
}

export class DormNode<
  DNPR extends DormNodePredicateRecord = DormNodePredicateRecord
> {
  constructor(public preds: DNPR) {}
}

enum PredicateType {
  STRING = "string",
}

export class DormEdge<AsArray extends boolean, Nullable extends boolean> {
  constructor(
    private predType: PredicateType,
    opts?: { asArray?: AsArray; nullable?: Nullable }
  ) {}
}

export class DormNodeAsPredicate<
  DN extends DormNode,
  AsArray extends boolean = false,
  Nullable extends boolean = false
> {
  constructor(
    public dormNode: DN,
    private opts?: { asArray?: AsArray; nullable?: Nullable }
  ) {}
}

const Audit = new DormNode({
  user: () => new DormNodeAsPredicate<typeof User>(User),
});

const User = new DormNode({
  name: new DormEdge(PredicateType.STRING),
  audits: () => new DormNodeAsPredicate<typeof Audit>(Audit),
});

type QueryFragment<D extends DormNode> = {
  [predName in keyof D["preds"]]?: D["preds"][predName] extends () => infer U
    ? U extends DormNodeAsPredicate<infer DN>
      ? QueryFragment<DN>
      : never
    : boolean;
};

const z = {
  name: true,
  audits: { user: { name: true } },
} satisfies QueryFragment<typeof User>;

export function query<DN extends DormNode, QF extends QueryFragment<DN>>(
  dormNode: DN,
  fragment: QF
) {}

export type InferReturn<DN extends DormNode, QF extends QueryFragment<DN>> = {
  [key in keyof QF]: key extends keyof DN["preds"]
    ? DN["preds"][key] extends DormEdge<boolean, boolean>
      ? string // FIXME
      : QF[key] extends QueryFragment<ReturnType<DN["preds"][key]>["dormNode"]>
      ? InferReturn<ReturnType<DN["preds"][key]>["dormNode"], QF[key]>
      : unknown
    : unknown;
};

console.log(z);

type ZXC = InferReturn<typeof User, typeof z>;

const zxc: ZXC = { audits: { user: { name: "" } }, name: "" };
