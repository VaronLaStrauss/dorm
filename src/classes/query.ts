import { FilterValue, Query } from "../query-schema";
import { FragmentOpts } from "./fragment";
import { RelationsRecord } from "./relations";
import { TypeRecord } from "./type";

export type QueryOpts<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  TypeName extends keyof TR
> = {
  fragment?: FragmentOpts<TR, TypeName, RR>;
  mainFunc: FilterValue;
} & Query;
