import { type DEdge, type EdgeInit, type IndexableEdge } from "../edge";
import type { DNode } from "../node";
import type { ExtendedPredicates, PredicateNode } from "../predicate";
import { AllIndexes, DateTimeIndex, StringIndex } from "./indexes";
export declare function filterablePreds<DN extends DNode, F extends Filterables<DN>>(node: DN, filterables: F): AllowedFilters<F>;
declare function parseJsType(ops: EdgeInit): "number" | "boolean" | "string" | "date";
export type AllowedFilter = {
    jsType: ReturnType<typeof parseJsType>;
    indexes: {
        [key in keyof typeof AllIndexes]?: (typeof AllIndexes)[key];
    };
    label: string;
    field: string;
    allowedValues?: Record<string | number, string | number>;
    nodeName: string;
    countable: boolean;
};
export type AllowedFilters<FilterRecord extends Record<string, unknown> = Record<string, unknown>> = {
    [key in keyof FilterRecord | "uid" | "dtype"]: AllowedFilter;
};
type FilterOpts = {
    label: string;
};
type FilterableKeys<DN extends DNode, EP = ExtendedPredicates<DN>> = {
    [key in keyof EP]: EP[key] extends () => PredicateNode<DNode> ? key : EP[key] extends DEdge<infer Opts> ? Opts extends IndexableEdge ? Opts["indexes"] extends Array<keyof typeof StringIndex> | Array<keyof typeof DateTimeIndex> | boolean ? key : never : never : never;
}[keyof EP];
type Filterables<DN extends DNode, EP = ExtendedPredicates<DN>, FK = FilterableKeys<DN, EP>> = FK extends keyof EP ? {
    [key in keyof Pick<EP, FK>]: FilterOpts;
} : never;
export {};
