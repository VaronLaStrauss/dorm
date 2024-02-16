import type { DEdge, InferEdge } from "./edge";
import { User } from "./example/user";
import type { DNode, DPredicateNode } from "./node";
import type { ExtendedPredicates } from "./predicate";
import type { Flatten, NullableType } from "./types";

export function mutate<DN extends DNode>(node: DN, fields: MutationFields<DN>) {
  return {};
}

export type MutationFields<
  DN extends DNode,
  EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>
> = Flatten<
  {
    [key in keyof EP]?: EP[key] extends DEdge<infer Opts>
      ? NullableType<Opts, InferEdge<Opts>> | null
      : EP[key] extends () => DPredicateNode<infer NextDN>
      ? MutationFields<NextDN>
      : never;
  } & { uid?: string; dtype?: string[] }
>;

mutate(User, {});
