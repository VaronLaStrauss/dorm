import type { FilterFull } from "../filter";
import type { QueryOpts } from "../query";
export type FilterReturn = {
    node: string;
    usedVars: Set<string>;
};
export declare function compileDirectives({ cascade, filter, order, page }: FilterFull, usedVars: Map<string, unknown>, allowedValues: Set<string>): string;
export declare function compileMainFunc({ mainFunc, order, page }: QueryOpts, usedVars: Map<string, unknown>, allowedValues: Set<string>): string;
export declare function compileCascade(cascade: FilterFull["cascade"], allowedValues: Set<string>): string | undefined;
export declare function compileFilter(filter: FilterFull["filter"], usedVars: Map<string, unknown>, allowedValues: Set<string>): string | undefined;
export declare function compilePage(page: FilterFull["page"], usedVars: Map<string, unknown>, allowedValues: Set<string>): string | undefined;
export declare function compileOrder(orders: FilterFull["order"], allowedValues: Set<string>): string | undefined;
export declare function compileAsVar(asVar?: string, allowedValues?: Set<string>): string;
