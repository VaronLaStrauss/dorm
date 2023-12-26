import {
  GeoTwoValOps,
  IndexlessOps,
  InequalityTwoValOps,
  TrigramTwoValOps,
} from ".";
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
  usedVars: Map<string, unknown>
) {
  if (filter.op === "uid") {
    const varKey = `$f${usedVars.size}`;
    usedVars.set(varKey, filter.values[0]);
    return `${filter.op}(${varKey})`;
  }

  if (filter.op === "has" || filter.op === "type") {
    return `${filter.op}(${filter.values[0]})`;
  }

  if (
    filter.op in GeoTwoValOps ||
    filter.op in TrigramTwoValOps ||
    filter.op in IndexlessOps ||
    filter.op in InequalityTwoValOps
  ) {
    const var1 = `$f${usedVars.size}`;
    usedVars.set(var1, filter.values[0]);
    const var2 = `$f${usedVars.size}`;
    usedVars.set(var2, filter.values[1]);
    return `${filter.op}(${filter.field}, ${var1}, ${var2})`;
  }

  const var1 = `$f${usedVars.size}`;
  usedVars.set(var1, filter.values[0]);
  return `${filter.op}(${filter.field}, ${var1})`;
}

export function spacing(level: number) {
  return Array.from({ length: level })
    .map(() => "  ")
    .join("");
}
