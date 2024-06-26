import { compileDirectives, compileMainFunc } from "./compiler/filter.compiler";
import type { FilterEdge, FilterFull } from "./filter";
import type { Fragment, FragmentReturn } from "./fragment";
import type { DNode } from "./node";
import { spacing } from "./utils/spacing";

export function query<DN extends DNode, F extends Fragment<DN>>(
  _query: Query<DN, F>
) {
  const _space = spacing(1);

  const { filter, cascade, fragOpts, override, append } = _query;

  let { allowedValues, usedVars } = fragOpts;
  if (append) {
    if (append.allowedValues) {
      allowedValues = new Set([...allowedValues, ...append.allowedValues]);
    }
    if (append.usedVars) {
      usedVars = new Map([...usedVars, ...append.usedVars.entries()]);
    }
  }
  if (override) {
    if (override.allowedValues) allowedValues = override.allowedValues;
  }

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

    const mainFunc = compileMainFunc(_query, usedVars, allowedValues);
    let query = `${_space}${key}(${mainFunc}) ${directives}`;
    if (fragOpts)
      query += `{\n${fragOpts.fragmentStr ?? fragOpts.build()}\n${_space}}`;
    return query;
  }

  return {
    build,
    allowedValues,
    usedVars,
    type: undefined as never as Array<(typeof _query)["fragOpts"]["type"]>,
  };
}

export type QueryOpts = { mainFunc: FilterEdge } & FilterFull;

export type Query<DN extends DNode, F extends Fragment<DN>> = {
  fragOpts: FragmentReturn<DN, F>;
  append?: OptsChange;
  override?: OptsChange;
} & QueryOpts;

type OptsChange = {
  allowedValues?: Set<string>;
  usedVars?: Map<string, unknown>;
};
