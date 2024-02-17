import { v4 } from "uuid";
import { AllIndexes } from "../indexes";
import type { FilterEdge } from "../filter";

export function parseFilter(
  filter: FilterEdge,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  if (!(filter.op in AllIndexes))
    throw new Error("Cannot do filter if operator is not a func");
  if ("value" in filter) if (!filter.value) return undefined;
  if ("values" in filter)
    if (!filter.values || !filter.values[0] || !filter.values[1])
      return undefined;

  if (filter.op === "uid") {
    const varKey = parseFilterValue(filter.value, usedVars, allowedValues);
    return `${filter.op}(${varKey})`;
  }

  if (filter.op === "has" || filter.op === "type") {
    if (!allowedValues.has(filter.value))
      throw Error(`Cannot parse the filter value because it may not be safe.`);
    return `${filter.op}(${filter.value})`;
  }

  if (!("field" in filter) || !allowedValues.has(filter.field))
    throw new Error(
      "Cannot parse because the value is either missing or is unsafe"
    );

  if ("values" in filter) {
    const var1 = parseFilterValue(filter.values[0], usedVars, allowedValues);
    const var2 = parseFilterValue(filter.values[1], usedVars, allowedValues);
    return `${filter.op}(${filter.field}, ${var1}, ${var2})`;
  }

  const var1 = parseFilterValue(filter.value, usedVars, allowedValues);
  return `${filter.op}(${filter.field}, ${var1})`;
}

function parseFilterValue(
  value: unknown,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  const varKey =
    typeof value === "string" && allowedValues.has(value)
      ? value
      : getFilterKey(usedVars);
  if (varKey !== value) usedVars.set(varKey, value);
  return varKey;
}

function getFilterKey(usedVars: Map<string, unknown>) {
  let varName = `$f${v4().split("-")[0]}`;
  while (usedVars.has(varName)) {
    varName = `$f${v4().split("-")[0]}`;
  }
  return varName;
}