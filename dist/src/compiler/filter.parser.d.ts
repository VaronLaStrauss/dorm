import type { FilterEdge } from "../filter";
export declare function parseFilter(filter: FilterEdge, usedVars: Map<string, unknown>, allowedValues: Set<string>): string | undefined;
export declare function parseFilterValue(value: unknown, usedVars: Map<string, unknown>, allowedValues: Set<string>): string;
