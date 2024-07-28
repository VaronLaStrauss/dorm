import type { DNode, DNodeExtended } from "./node";
import type { InitOpts, UnionToIntersection } from "./utils/types";
export declare function pred<alias extends string | undefined, asVar extends string | undefined>(alias?: alias, asVar?: asVar): {
    alias: alias;
    asVar: asVar;
};
export type PredOpt = ReturnType<typeof pred>;
export declare function pass<alias extends string | undefined, asVar extends string | undefined>(pwdVar: string, alias?: alias, asVar?: asVar): {
    pwdVar: string;
    alias: alias;
    asVar: asVar;
};
export type PassOpt = ReturnType<typeof pass>;
export declare function reverse<DN extends DNode, EP extends ExtendedPredicates<DN> = ExtendedPredicates<DN>, predName extends keyof EP & string = keyof EP & string>(predName: predName): {
    predName: predName;
};
export type Reverse<DN extends DNode> = ReturnType<typeof reverse<DN>>;
export declare function forward(): {
    readonly forward: true;
};
export type Forward = ReturnType<typeof forward>;
export declare function count<alias extends string | undefined, asVar extends string | undefined>(alias?: alias, asVar?: asVar): {
    asCount: true;
    alias: alias;
    asVar: asVar;
};
export type CountOpt = ReturnType<typeof count>;
export type PredNodeOpts = InitOpts & {
    count?: true;
    asType?: boolean;
};
export declare function predicateNode<NextDN extends DNode, Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>, Opts extends PredNodeOpts = PredNodeOpts>(nextNode: NextDN, relation: Rel, opts?: Opts): {
    nextNode: NextDN;
    relation: Rel;
    opts: Opts;
};
export type PredicateNode<NextDN extends DNode, Rel extends Reverse<NextDN> | Forward = Forward | Reverse<NextDN>, Opts extends PredNodeOpts = PredNodeOpts> = ReturnType<typeof predicateNode<NextDN, Rel, Opts>>;
export type ExtendedPredicates<DN extends DNode | DNodeExtended> = DN extends DNodeExtended ? UnionToIntersection<DN["predicates"] & ExtendedPredicates<ReturnType<DN["extendedNodes"]>[number]>> : DN["predicates"];
