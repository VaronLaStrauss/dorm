import type { Fragment } from "../fragment";
import type { DNode } from "../node";
export declare function buildFragment<DN extends DNode, F extends Fragment<DN>>(node: DN, fragment: F, usedVars: Map<string, unknown>, allowedValues: Set<string>, level?: number): string;
