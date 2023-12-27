import { t, Static } from "elysia";
import { OneValIndex, TwoValIndex, ZeroValIndex } from "../utils";

export const limits = [5, 10, 15, 20, 25] as const;
export const defaultListLimit = limits[1];

export const filterValueReqSchema = t.Union([
  ...(Object.keys(ZeroValIndex) as (keyof typeof ZeroValIndex)[]).map((_op) =>
    t.Object({ op: t.Literal(_op), value: t.String() })
  ),
  ...(Object.keys(OneValIndex) as (keyof typeof OneValIndex)[]).map((_op) =>
    t.Object({ op: t.Literal(_op), field: t.String(), value: t.Unknown() })
  ),
  ...(Object.keys(TwoValIndex) as (keyof typeof TwoValIndex)[]).map((_op) =>
    t.Object({
      op: t.Literal(_op),
      field: t.String(),
      values: t.Tuple([t.Unknown(), t.Unknown()]),
    })
  ),
]);

export const filterReqSchema = t.Recursive((This) => {
  return t.Union([
    t.Object({
      connector: t.Union([t.Literal("and"), t.Literal("or")]),
      values: t.Array(t.Union([filterValueReqSchema, This])),
    }),
    t.Object({
      not: t.Union([filterValueReqSchema, This]),
    }),
    filterValueReqSchema,
  ]);
});

export const queryListLimitSchema = t.Object({
  limit: t.Optional(
    t.Union(
      limits.map((lim) => t.Literal(lim)),
      { default: defaultListLimit }
    )
  ),
  offset: t.Optional(t.Number({ default: 0 })),
});

export const orderSchema = t.Object({
  field: t.String(),
  format: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});

export const cascadeSchema = t.Union([t.String(), t.Boolean()]);

export const variablesSchema = t.Record(t.String(), t.Any());

export const queryReqSchema = t.Object({
  order: t.Optional(
    t.Tuple([
      t.Union([orderSchema, t.Undefined()]),
      t.Union([orderSchema, t.Undefined()]),
    ])
  ),
  filter: t.Optional(filterReqSchema),
  page: t.Optional(queryListLimitSchema),
  cascade: t.Optional(cascadeSchema),
});

export type FilterValue = Static<typeof filterValueReqSchema>;
export type Filter = Static<typeof filterReqSchema>;
export type Page = Static<typeof queryListLimitSchema>;
export type Order = Static<typeof orderSchema>;
export type Cascade = Static<typeof cascadeSchema>;
export type Query = Static<typeof queryReqSchema>;
export type QueryVariables = Static<typeof variablesSchema>;
