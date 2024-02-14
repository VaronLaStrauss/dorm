import type { RelationsRecord } from "./relation.types";
import type { FilterValue, Query } from "../query-schema";
import type { TypeRecord } from "./type.types";
import type { Fragment } from "../classes";
import type { FragmentOpts } from "./fragment.types";
import type { RecurseOpts } from "./recurse.types";

export type QueryOpts<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>
> = Record<
  string,
  {
    fragment?: Fragment<TR, RR, keyof TR, FragmentOpts<TR, keyof TR, RR>>;
    mainFunc: FilterValue;
    recurse?: RecurseOpts;
  } & Query
>;

export type QueryReturn<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  QO extends QueryOpts<TR, RR>
> = {
  [key in keyof QO]: QO[key]["fragment"] extends Fragment<
    TR,
    RR,
    keyof TR,
    FragmentOpts<TR, keyof TR, RR>
  >
    ? ReturnType<QO[key]["fragment"]["execute"]>[]
    : never;
};
