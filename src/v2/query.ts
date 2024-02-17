import { compileDirectives, compileMainFunc } from "./compiler/filter.compiler";
import type { FilterEdge, FilterFull } from "./filter";
import type { Fragment, FragmentReturn } from "./fragment";
import type { DNode } from "./node";
import { spacing } from "./utils/spacing";

export function query<DN extends DNode, F extends Fragment<DN>>(
  _queries: Query<DN, F>
) {
  const _space = spacing(1);

  const { filter, cascade, fragOpts } = _queries;
  const { allowedValues, usedVars } = fragOpts;

  function build(
    key: string,
    usedVars: Map<string, unknown>,
    allowedValues: Set<string>
  ) {
    const directives = compileDirectives(
      { filter, cascade },
      usedVars,
      allowedValues
    );

    const mainFunc = compileMainFunc(_queries, usedVars, allowedValues);
    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (fragOpts)
      query += `{\n${fragOpts.fragmentStr ?? fragOpts.build()}\n${_space}}`;
    return query;
  }

  return { build, allowedValues, usedVars };
}

export type QueryOpts = { mainFunc: FilterEdge } & FilterFull;

export type Query<DN extends DNode, F extends Fragment<DN>> = {
  fragOpts: FragmentReturn<DN, F>;
} & QueryOpts;
