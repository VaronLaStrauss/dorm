import type { ZeroValIndex, OneValIndex, TwoValIndex } from "./utils/indexes";
export type FilterEdge = ({
    op: keyof typeof ZeroValIndex;
    value: string;
} | {
    op: keyof typeof OneValIndex;
    field: string;
    value: unknown;
    wrap?: "uid" | "count";
} | {
    op: keyof typeof TwoValIndex;
    field: string;
    values: [unknown, unknown];
}) & {
    not?: boolean;
};
export type Filter = {
    connector: "and" | "or";
    values: Filter[];
    not?: boolean;
} | FilterEdge;
export type Page = {
    limit?: number | string;
} & ({
    after?: string;
} | {
    offset?: number | string;
});
export type Order = {
    field: string;
    format?: "asc" | "desc";
};
export type Cascade = string | boolean;
export type FilterOpts = {
    page?: Page;
    cascade?: Cascade;
    order?: [Order] | [Order, Order];
};
export type FilterFull = {
    filter?: Filter;
} & FilterOpts;
export type RecurseOpts = true | {
    loop: boolean;
    depth: number;
};
