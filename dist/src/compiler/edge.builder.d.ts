import { type CountOpt, type PredOpt } from "../predicate";
import { type DEdge, type EdgeInit } from "../edge";
import type { DNode } from "../node";
export declare function buildEdge(predName: string, edge: DEdge<EdgeInit>, node: DNode, opts: boolean | PredOpt, usedVars: Map<string, unknown>, allowedValues: Set<string>, level?: number): string;
export declare function buildStatic(predName: "uid" | "dtype", opts: boolean | PredOpt, allowedValues: Set<string>, level?: number): string;
export declare function buildStaticCount(predName: "uid", opts: CountOpt, allowedValues: Set<string>, level?: number): string;
export declare function parseStaticPred(predName: "uid" | "dtype"): "uid" | "dgraph.type";
