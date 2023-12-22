export const TWO_VAL_FUNCS = ["match", "between", "near"] as const;

export const UID_IN = ["uid_in"] as const;

export const SINGLE_VAL_FUNCS = [
  "eq",
  "le",
  "ge",
  "lt",
  "gt",
  "allofterms",
  "anyofterms",
  "alloftext",
  "anyoftext",
  "regexp",
  "within",
  "contains",
  "intersects",
  ...UID_IN,
] as const;

export const PREDICATE_FUNCS = ["has", "type"] as const;

export const UID_FUNC = ["uid"] as const;

export const FUNCS = [
  ...TWO_VAL_FUNCS,
  ...SINGLE_VAL_FUNCS,
  ...PREDICATE_FUNCS,
  ...UID_FUNC,
] as const;
