import type { FilterEdge, FilterFull, RecurseOpts } from "./filter";
import type { Fragment, FragmentReturn } from "./fragment";
import type { DNode } from "./node";

export function query<DN extends DNode, F extends Fragment<DN>>(
  query: Query<DN, F>
) {
  return "";
}

export type Query<DN extends DNode, F extends Fragment<DN>> = {
  fragOpts: FragmentReturn<DN, F>;
  mainFunc: FilterEdge;
  recurse?: RecurseOpts;
} & FilterFull;
