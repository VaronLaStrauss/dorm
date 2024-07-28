import type { DEdge, EdgeType, InferEdge } from "./edge";
import type { DNode } from "./node";
import type { PredicateNode, ExtendedPredicates, Forward } from "./predicate";
import type { Flatten, NullableType, UnionToIntersection } from "./utils/types";
export declare function mutate<DN extends DNode>(node: DN, fields: MutationFields<DN>, noSetDType?: boolean): Record<string, unknown>;
export type MutationFields<DN extends DNode, EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>> = Flatten<UnionToIntersection<{
    [key in keyof EP]?: EP[key] extends DEdge<infer Opts> ? Opts["type"] extends EdgeType.PASSWORD ? string | null | undefined : NullableType<Opts, InferEdge<Opts>> | null : EP[key] extends () => PredicateNode<infer NextDN, infer Rel, infer Opts> ? Rel extends Forward ? NullableType<Opts, MutationFields<NextDN>> | null : never : never;
} & {
    uid?: string;
    dtype?: string[];
}>>;
