import { OneValIndex, TwoValIndex, ZeroValIndex } from "../utils";

export * from "./filter-op";

export type FilterValue =
  | { op: keyof typeof ZeroValIndex; value: string }
  | { op: keyof typeof OneValIndex; field: string; value: unknown }
  | { op: keyof typeof TwoValIndex; field: string; values: [unknown, unknown] };

export type Filter =
  | { connector: "and" | "or"; values: Filter[] }
  | { not: Filter }
  | FilterValue;

export type Page = { limit?: number; offset?: number };

export type Order = { field: string; format?: "asc" | "desc" };

export type Cascade = string | boolean;

export type QueryVariables = Record<string, any>;

export type QueryFilterOpts = {
  page?: Page;
  cascade?: Cascade;
  order?: [Order | undefined | null, Order | undefined | null];
};

export type Query = {
  filter?: Filter;
} & QueryFilterOpts;
