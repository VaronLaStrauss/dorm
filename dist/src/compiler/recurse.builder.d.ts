import type { RecurseOpts } from "../filter";
import type { DNode } from "../node";
import type { PredicateNode } from "../predicate";
import type { RecurseFragment, SingleNextRecurseFragment } from "../recurse";
export declare function buildRecurse<MainDN extends DNode, DNs extends DNode[]>(mainNode: MainDN, nodes: DNs, fragment: RecurseFragment<DNs[number] | MainDN>, usedVars: Map<string, unknown>, allowedValues: Set<string>, level?: number): string;
export declare function buildRecurseNode(currentNode: DNode, nextPredNode: PredicateNode<DNode>, predName: string, nextFragment: SingleNextRecurseFragment, usedVars: Map<string, unknown>, allowedValues: Set<string>, level?: number): string;
export declare function compileRecurse(opts: RecurseOpts): string;
