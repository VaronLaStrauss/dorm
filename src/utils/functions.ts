import { AllIndexes } from "./indexes";
import { FilterValue } from "../query-schema";

export function parseDqlType(value: unknown) {
  const type = typeof value;
  let retType = "";
  switch (type) {
    case "number":
      switch (Number(value) % 1) {
        case 0:
          retType = "int";
          break;
        default:
          retType = "float";
      }
      break;
    case "boolean":
      retType = "bool";
      break;
    default:
      retType = "string";
      break;
  }

  return retType;
}

export function parseFilter(
  filter: FilterValue,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>
) {
  if (!(filter.op in AllIndexes))
    throw new Error("Cannot do filter if operator is not a func");

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
      : `$f${usedVars.size}`;
  if (varKey !== value) usedVars.set(varKey, value);
  return varKey;
}

export function spacing(level: number) {
  return Array.from({ length: level })
    .map(() => "  ")
    .join("");
}

export function none() {
  return undefined as never;
}
