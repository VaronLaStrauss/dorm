import type { Static } from "@sinclair/typebox";
import { t } from "elysia";
import { Type } from "../classes";
import { AllIndexes } from "../utils";
import { AllowedFilter } from "./filter-op";

export const limits = [5, 10, 15, 20, 25] as const;
export const defaultListLimit = limits[1];

// FIXME: Slow inference
export function filterValueReqSchema<AF extends AllowedFilter<Type>[]>(
  filters: AF
) {
  return t.Union(
    filters.flatMap(({ field: _field, ops, typeName }) => {
      const field = t.Literal(_field);

      return (Object.keys(ops) as Array<keyof typeof AllIndexes>).map(
        (opName) => {
          const { fields } = ops[opName as never];
          const op = t.Literal(opName);

          return t.Object({
            op,
            field,
            values:
              fields === 1
                ? t.Tuple([t.Unknown()])
                : fields === 2
                ? t.Tuple([t.Unknown(), t.Unknown()])
                : opName === "type"
                ? t.Tuple([t.Literal(typeName)])
                : opName === "uid"
                ? t.Tuple([t.RegExp(/^0x[0-9A-F]+$/i)])
                : opName === "has"
                ? t.Tuple([t.Literal(`${typeName}.${_field}`)])
                : t.Never(),
          });
        }
      );
    })
  );
}

export function filterReqSchema<AF extends AllowedFilter<Type>[]>(allowed: AF) {
  return t.Recursive((This) => {
    return t.Union([
      t.Object({
        connector: t.Union([t.Literal("and"), t.Literal("or")]),
        values: t.Array(t.Union([filterValueReqSchema(allowed), This])),
      }),
      t.Object({
        not: t.Union([filterValueReqSchema(allowed), This]),
      }),
      filterValueReqSchema(allowed),
    ]);
  });
}

export const queryListLimitSchema = t.Object({
  limit: t.Optional(
    t.Union(
      limits.map((lim) => t.Literal(lim)),
      { default: defaultListLimit }
    )
  ),
  offset: t.Optional(t.Number({ default: 0 })),
});

export function orderSchema<AF extends AllowedFilter<Type>[]>(filterOpts: AF) {
  return t.Object({
    field: t.Union(filterOpts.map((f) => t.Literal(f.field))),
    format: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  });
}

export function cascadeSchema<AF extends AllowedFilter<Type>[]>(
  filterOpts: AF
) {
  return t.Union([
    t.Union(filterOpts.map((f) => t.Literal(f.field))),
    t.Boolean(),
  ]);
}

export const variablesSchema = t.Record(t.String(), t.Any());

export function queryReqSchema<AF extends AllowedFilter<Type>[]>(
  ...filterOpts: AF
) {
  return t.Object({
    order: t.Optional(
      t.Tuple([
        t.Union([orderSchema(filterOpts), t.Undefined()]),
        t.Union([orderSchema(filterOpts), t.Undefined()]),
      ])
    ),
    filter: t.Optional(filterReqSchema(filterOpts)),
    page: t.Optional(queryListLimitSchema),
    cascade: t.Optional(cascadeSchema(filterOpts)),
  });
}

export type FilterValue = Static<ReturnType<typeof filterValueReqSchema>>;
export type Filter = Static<ReturnType<typeof filterReqSchema>>;
export type Page = Static<typeof queryListLimitSchema>;
export type Order = Static<ReturnType<typeof orderSchema>>;
export type Cascade = Static<ReturnType<typeof cascadeSchema>>;
export type Query = Static<ReturnType<typeof queryReqSchema>>;
export type QueryVariables = Static<typeof variablesSchema>;
