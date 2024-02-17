import type { DEdge, EdgeType, InferEdge } from "./edge";
import type { DNode } from "./node";
import type { DPredicateNode, ExtendedPredicates, Forward } from "./predicate";
import type { Flatten, NullableType, UnionToIntersection } from "./utils/types";

export function mutate<DN extends DNode>(
  node: DN,
  fields: MutationFields<DN>
): Record<string, unknown> {
  const predToNode = node.getPredToNode();
  const vars: Record<string, unknown> = {};
  for (const fieldName in fields) {
    const value: unknown = fields[fieldName];
    const actualNode = predToNode[fieldName];

    if (fieldName === "dtype") {
      vars["dgraph.type"] = value;
      continue;
    }
    if (fieldName === "uid") {
      vars["uid"] = value;
      continue;
    }
    if (value === undefined) {
      continue;
    }

    const predName = `${actualNode.name}.${fieldName}`;
    const pred = actualNode.predicates[fieldName];

    if (typeof pred === "function") {
      const nextPredNode = pred() as DPredicateNode<DNode>;
      let values: unknown;

      if (value instanceof Array) {
        values = value.map((val) =>
          mutate(nextPredNode.nextNode, val as never)
        );
      } else {
        values = mutate(nextPredNode.nextNode, value as never);
      }
      vars[predName] = values;
      continue;
    }

    vars[predName] = value;
  }

  if (!("dtype" in fields)) vars["dgraph.type"] = node.typeNames;
  return vars;
}

export type MutationFields<
  DN extends DNode,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>
> = Flatten<
  UnionToIntersection<
    {
      [key in keyof EP]?: EP[key] extends DEdge<infer Opts>
        ? Opts["type"] extends EdgeType.PASSWORD
          ? string | null | undefined
          : NullableType<Opts, InferEdge<Opts>> | null
        : EP[key] extends () => DPredicateNode<
            infer NextDN,
            infer Rel,
            infer Opts
          >
        ? Rel extends Forward
          ? NullableType<Opts, MutationFields<NextDN>> | null
          : never
        : never;
    } & { uid?: string; dtype?: string[] }
  >
>;
