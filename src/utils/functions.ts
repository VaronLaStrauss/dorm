import { AllIndexes } from ".";
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
  hasOrTypeValues: Set<string>
) {
  if (!(filter.op in AllIndexes))
    throw new Error("Cannot do filter if operator is not a func");

  if (filter.op === "uid") {
    const varKey = `$f${usedVars.size}`;
    usedVars.set(varKey, filter.value);
    return `${filter.op}(${varKey})`;
  }

  if (filter.op === "has" || filter.op === "type") {
    if (!hasOrTypeValues.has(filter.value))
      throw Error(`Cannot parse the filter value because it may not be safe.`);
    return `${filter.op}(${filter.value})`;
  }

  if (!("field" in filter) || !hasOrTypeValues.has(filter.field))
    throw new Error("Cannot parse because it's either missing or is unsafe");

  if ("values" in filter) {
    const var1 = `$f${usedVars.size}`;
    usedVars.set(var1, filter.values[0]);
    const var2 = `$f${usedVars.size}`;
    usedVars.set(var2, filter.values[1]);
    return `${filter.op}(${filter.field}, ${var1}, ${var2})`;
  }

  const var1 = `$f${usedVars.size}`;
  usedVars.set(var1, filter.value);
  return `${filter.op}(${filter.field}, ${var1})`;
}

export function spacing(level: number) {
  return Array.from({ length: level })
    .map(() => "  ")
    .join("");
}
