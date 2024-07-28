import type { PredNodeOpts, PredOpt } from "../predicate";
export type Composite<V> = {
    [key in keyof V]: V[key];
};
export type Flatten<T> = T extends infer U ? {
    [K in keyof U]: U[K];
} : never;
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type InitOpts = {
    nullable?: true;
    asArray?: true;
};
export type AsArray<Opts extends InitOpts, V> = Opts["asArray"] extends true ? Array<V> : V;
export type Nullable<Opts extends InitOpts, V> = Opts["nullable"] extends true ? V | null | undefined : V;
export type NullableType<Opts extends InitOpts, V> = Nullable<Opts, AsArray<Opts, V>>;
export type FragmentCommonReturn = {
    fragmentStr?: string;
    usedVars: Map<string, unknown>;
    allowedValues: Set<string>;
    build: () => string;
};
export type Countable<PO extends PredOpt, Opts extends PredNodeOpts | "uid", key extends string | number | symbol> = Opts extends {
    count: true;
} | "uid" ? PO["alias"] extends string ? {
    [k in PO["alias"]]: number;
} : {
    [k in key]: number;
} : never;
