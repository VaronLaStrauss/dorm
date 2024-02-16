export type Composite<V> = {
  [key in keyof V]: V[key];
};

export type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type InitOpts = {
  nullable?: true;
  asArray?: true;
};

export type AsArray<Opts extends InitOpts, V> = Opts["asArray"] extends true
  ? Array<V>
  : V;

export type Nullable<Opts extends InitOpts, V> = Opts["nullable"] extends true
  ? V | null | undefined
  : V;

export type NullableType<Opts extends InitOpts, V> = Nullable<
  Opts,
  AsArray<Opts, V>
>;
