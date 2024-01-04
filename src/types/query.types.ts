import { RelationsRecord } from "./relation.types";
import { FilterValue, Query } from "../query-schema";
import { TypeRecord } from "./type.types";
import { Fragment } from "../classes";
import { FragmentOpts } from "./fragment.types";
import { RecurseOpts } from "./recurse.types";

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
