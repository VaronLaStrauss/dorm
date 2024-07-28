import type { query } from "./query";
import type { recurse } from "./recurse";
export type QueryItems = Record<string, ReturnType<typeof query | typeof recurse>>;
export declare function queryBlock<QI extends QueryItems>(queries: QI, outsourcedVars?: Record<string, unknown>): {
    query: string;
    varDec: string[];
    vars: Record<string, unknown>;
    type: { [key in keyof QI]: QI[key]["type"]; };
};
