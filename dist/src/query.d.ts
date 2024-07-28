import type { FilterEdge, FilterFull } from "./filter";
import type { Fragment, FragmentReturn } from "./fragment";
import type { DNode } from "./node";
export declare function query<DN extends DNode, F extends Fragment<DN>>(_query: Query<DN, F>): {
    build: (key: string, usedVars: Map<string, unknown>, allowedValues: Set<string>) => string;
    allowedValues: Set<string>;
    usedVars: Map<string, unknown>;
    type: import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<{ [key in keyof F]: key extends keyof import("./predicate").ExtendedPredicates<DN> ? import("./predicate").ExtendedPredicates<DN>[key] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key], Opts, key, import("./edge").InferEdge<Opts>> : F[key] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key][number], Opts, key, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<DN>[key] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["opts"], Opts_1, key, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"] extends infer T extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_1 in keyof T]: key_1 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_1] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1], Opts, key_1, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1][number], Opts, key_1, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_1] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["opts"], Opts_1, key_1, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"] extends infer T_1 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_2 in keyof T_1]: key_2 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_2] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2], Opts, key_2, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2][number], Opts, key_2, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_2] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["opts"], Opts_1, key_2, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"] extends infer T_2 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_3 in keyof T_2]: key_3 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_3] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3], Opts, key_3, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3][number], Opts, key_3, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_3] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["opts"], Opts_1, key_3, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"] extends infer T_3 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_4 in keyof T_3]: key_4 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_4] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4], Opts, key_4, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4][number], Opts, key_4, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_4] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["opts"], Opts_1, key_4, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"] extends infer T_4 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_5 in keyof T_4]: key_5 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_5] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5], Opts, key_5, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5][number], Opts, key_5, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_5] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["opts"], Opts_1, key_5, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"] extends infer T_5 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_6 in keyof T_5]: key_6 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_6] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6], Opts, key_6, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6][number], Opts, key_6, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_6] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["opts"], Opts_1, key_6, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"] extends infer T_6 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_7 in keyof T_6]: key_7 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_7] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7], Opts, key_7, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7][number], Opts, key_7, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_7] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["opts"], Opts_1, key_7, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"] extends infer T_7 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_8 in keyof T_7]: key_8 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_8] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8], Opts, key_8, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8][number], Opts, key_8, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_8] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["opts"], Opts_1, key_8, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"] extends infer T_8 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_9 in keyof T_8]: key_9 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_9] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9], Opts, key_9, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9][number], Opts, key_9, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_9] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["opts"], Opts_1, key_9, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"] extends infer T_9 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_10 in keyof T_9]: key_10 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_10] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10], Opts, key_10, import("./edge").InferEdge<Opts>> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10][number], Opts, key_10, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_10] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends import("./fragment").NextFragment<NextDN> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["opts"], Opts_1, key_10, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10], Opts_1, key_10> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_10, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_10> : never : never : never : key_10 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["alias"] extends string ? { [k in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["alias"]]: number; } : { [k_1 in key_10]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10], key_10> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_1 in key_10]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_10> : never : never : key_10 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"][key_10]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9], Opts_1, key_9> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_9, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_10 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_10]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_9> : never : never : never : key_9 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["alias"] extends string ? { [k_5 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["alias"]]: number; } : { [k_6 in key_9]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9], key_9> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_6 in key_9]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_9> : never : never : key_9 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"][key_9]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8], Opts_1, key_8> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_8, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_11 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_11]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_12 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_12]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_8> : never : never : never : key_8 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["alias"] extends string ? { [k_9 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["alias"]]: number; } : { [k_10 in key_8]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8], key_8> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_10 in key_8]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_8> : never : never : key_8 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"][key_8]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7], Opts_1, key_7> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_7, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_13 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_13]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_14 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_14]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_15 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_15]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_7> : never : never : never : key_7 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["alias"] extends string ? { [k_13 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["alias"]]: number; } : { [k_14 in key_7]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7], key_7> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_14 in key_7]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_7> : never : never : key_7 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"][key_7]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6], Opts_1, key_6> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_6, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_16 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_16]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_17 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_17]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_18 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_18]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_19 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_19]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_6> : never : never : never : key_6 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["alias"] extends string ? { [k_17 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["alias"]]: number; } : { [k_18 in key_6]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6], key_6> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_18 in key_6]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_6> : never : never : key_6 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"][key_6]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5], Opts_1, key_5> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_5, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_20 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_20]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_21 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_21]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_22 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_22]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_23 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_23]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_24 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_24]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_5> : never : never : never : key_5 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["alias"] extends string ? { [k_21 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["alias"]]: number; } : { [k_22 in key_5]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5], key_5> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_22 in key_5]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_5> : never : never : key_5 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"][key_5]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4], Opts_1, key_4> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_4, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_25 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_25]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_26 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_26]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_27 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_27]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_28 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_28]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_29 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_29]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends infer T_30 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_16 in keyof T_30]: key_16 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_16] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts, key_16, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16][number], Opts, key_16, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_16] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts_1, key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_16> : never : never : never : key_16 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"] extends string ? { [k_23 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"]]: number; } : { [k_24 in key_16]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_24 in key_16]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_16> : never : never : key_16 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_4> : never : never : never : key_4 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["alias"] extends string ? { [k_25 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["alias"]]: number; } : { [k_26 in key_4]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4], key_4> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_26 in key_4]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_4> : never : never : key_4 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"][key_4]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3], Opts_1, key_3> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_3, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_31 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_31]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_32 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_32]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_33 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_33]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_34 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_34]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_35 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_35]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends infer T_36 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_16 in keyof T_36]: key_16 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_16] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts, key_16, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16][number], Opts, key_16, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_16] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends infer T_37 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_17 in keyof T_37]: key_17 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_17] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts, key_17, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17][number], Opts, key_17, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_17] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts_1, key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_17> : never : never : never : key_17 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"] extends string ? { [k_27 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"]]: number; } : { [k_28 in key_17]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_28 in key_17]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_17> : never : never : key_17 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts_1, key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_16> : never : never : never : key_16 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"] extends string ? { [k_23 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"]]: number; } : { [k_24 in key_16]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_24 in key_16]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_16> : never : never : key_16 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_3> : never : never : never : key_3 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["alias"] extends string ? { [k_29 in F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["alias"]]: number; } : { [k_30 in key_3]: number; } : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3], key_3> : F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_30 in key_3]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_3> : never : never : key_3 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["predicates"][key_3]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"][key_2]["predicates"]]>>> : never : F[key]["predicates"][key_1]["predicates"][key_2] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1]["predicates"][key_2], Opts_1, key_2> : F[key]["predicates"][key_1]["predicates"][key_2] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_2, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_38 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_38]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_39 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_39]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_40 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_40]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_41 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_41]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_42 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_42]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends infer T_43 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_16 in keyof T_43]: key_16 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_16] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts, key_16, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16][number], Opts, key_16, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_16] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends infer T_44 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_17 in keyof T_44]: key_17 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_17] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts, key_17, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17][number], Opts, key_17, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_17] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends infer T_45 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_18 in keyof T_45]: key_18 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_18] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts, key_18, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18][number], Opts, key_18, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_18] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts_1, key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_18> : never : never : never : key_18 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"] extends string ? { [k_31 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"]]: number; } : { [k_32 in key_18]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_32 in key_18]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_18> : never : never : key_18 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts_1, key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_17> : never : never : never : key_17 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"] extends string ? { [k_27 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"]]: number; } : { [k_28 in key_17]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_28 in key_17]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_17> : never : never : key_17 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts_1, key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_16> : never : never : never : key_16 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"] extends string ? { [k_23 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"]]: number; } : { [k_24 in key_16]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_24 in key_16]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_16> : never : never : key_16 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_2> : never : never : never : key_2 extends "uid" | "dtype" ? F[key]["predicates"][key_1]["predicates"][key_2] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["predicates"][key_2]["alias"] extends string ? { [k_33 in F[key]["predicates"][key_1]["predicates"][key_2]["alias"]]: number; } : { [k_34 in key_2]: number; } : F[key]["predicates"][key_1]["predicates"][key_2] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1]["predicates"][key_2], key_2> : F[key]["predicates"][key_1]["predicates"][key_2] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_34 in key_2]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_2> : never : never : key_2 extends "dExtend" ? F[key]["predicates"][key_1]["predicates"][key_2] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["predicates"][key_2]["type"] : never : never; } : never)[keyof F[key]["predicates"][key_1]["predicates"]]>>> : never : F[key]["predicates"][key_1] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key]["predicates"][key_1], Opts_1, key_1> : F[key]["predicates"][key_1] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_1, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_46 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_46]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_47 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_47]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_48 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_48]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_49 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_49]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_50 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_50]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends infer T_51 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_16 in keyof T_51]: key_16 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_16] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts, key_16, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16][number], Opts, key_16, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_16] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends infer T_52 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_17 in keyof T_52]: key_17 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_17] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts, key_17, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17][number], Opts, key_17, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_17] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends infer T_53 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_18 in keyof T_53]: key_18 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_18] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts, key_18, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18][number], Opts, key_18, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_18] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"] extends infer T_54 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_19 in keyof T_54]: key_19 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_19] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], Opts, key_19, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19][number], Opts, key_19, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_19] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["opts"], Opts_1, key_19, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], Opts_1, key_19> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_19, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_19> : never : never : never : key_19 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["alias"] extends string ? { [k_35 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["alias"]]: number; } : { [k_36 in key_19]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], key_19> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_36 in key_19]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_19> : never : never : key_19 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts_1, key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_18> : never : never : never : key_18 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"] extends string ? { [k_31 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"]]: number; } : { [k_32 in key_18]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_32 in key_18]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_18> : never : never : key_18 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts_1, key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_17> : never : never : never : key_17 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"] extends string ? { [k_27 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"]]: number; } : { [k_28 in key_17]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_28 in key_17]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_17> : never : never : key_17 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts_1, key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_16> : never : never : never : key_16 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"] extends string ? { [k_23 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"]]: number; } : { [k_24 in key_16]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_24 in key_16]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_16> : never : never : key_16 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_1> : never : never : never : key_1 extends "uid" | "dtype" ? F[key]["predicates"][key_1] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["predicates"][key_1]["alias"] extends string ? { [k_37 in F[key]["predicates"][key_1]["alias"]]: number; } : { [k_38 in key_1]: number; } : F[key]["predicates"][key_1] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key]["predicates"][key_1], key_1> : F[key]["predicates"][key_1] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_38 in key_1]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_1> : never : never : key_1 extends "dExtend" ? F[key]["predicates"][key_1] extends FragmentReturn<NextDN, any> ? F[key]["predicates"][key_1]["type"] : never : never; } : never)[keyof F[key]["predicates"]]>>> : never : F[key] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<F[key], Opts_1, key> : F[key] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"] extends infer T_55 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_11 in keyof T_55]: key_11 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_11] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11], Opts, key_11, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11][number], Opts, key_11, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_11] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"] extends infer T_56 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_12 in keyof T_56]: key_12 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_12] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12], Opts, key_12, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12][number], Opts, key_12, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_12] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"] extends infer T_57 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_13 in keyof T_57]: key_13 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_13] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts, key_13, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13][number], Opts, key_13, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_13] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"] extends infer T_58 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_14 in keyof T_58]: key_14 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_14] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts, key_14, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14][number], Opts, key_14, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_14] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"] extends infer T_59 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_15 in keyof T_59]: key_15 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_15] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts, key_15, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15][number], Opts, key_15, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_15] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"] extends infer T_60 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_16 in keyof T_60]: key_16 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_16] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts, key_16, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16][number], Opts, key_16, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_16] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"] extends infer T_61 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_17 in keyof T_61]: key_17 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_17] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts, key_17, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17][number], Opts, key_17, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_17] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"] extends infer T_62 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_18 in keyof T_62]: key_18 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_18] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts, key_18, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18][number], Opts, key_18, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_18] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"] extends infer T_63 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_19 in keyof T_63]: key_19 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_19] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], Opts, key_19, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19][number], Opts, key_19, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_19] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["opts"], Opts_1, key_19, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<(QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"] extends infer T_64 extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? { [key_20 in keyof T_64]: key_20 extends keyof import("./predicate").ExtendedPredicates<NextDN> ? import("./predicate").ExtendedPredicates<NextDN>[key_20] extends import("./edge").DEdge<infer Opts extends import("./edge").EdgeInit> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20], Opts, key_20, import("./edge").InferEdge<Opts>> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends {
        alias: string | undefined;
        asVar: string | undefined;
    }[] ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20][number], Opts, key_20, import("./edge").InferEdge<Opts>> : never : import("./predicate").ExtendedPredicates<NextDN>[key_20] extends () => import("./predicate").PredicateNode<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>, infer _ extends {
        readonly forward: true;
    } | {
        predName: keyof import("./predicate").ExtendedPredicates<infer NextDN extends DNode<string, import("./node").NodePredicateRecord>> & string;
    }, infer Opts_1 extends import("./utils/types").InitOpts & {
        count?: true | undefined;
        asType?: boolean | undefined;
    }> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["opts"], Opts_1, key_20, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20], Opts_1, key_20> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_20, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_20> : never : never : never : key_20 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["alias"] extends string ? { [k_39 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["alias"]]: number; } : { [k_40 in key_20]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20], key_20> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_40 in key_20]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_20> : never : never : key_20 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"][key_20]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], Opts_1, key_19> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_19, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_19> : never : never : never : key_19 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["alias"] extends string ? { [k_35 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["alias"]]: number; } : { [k_36 in key_19]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19], key_19> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_36 in key_19]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_19> : never : never : key_19 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"][key_19]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], Opts_1, key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_18, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_18> : never : never : never : key_18 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"] extends string ? { [k_31 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["alias"]]: number; } : { [k_32 in key_18]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18], key_18> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_32 in key_18]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_18> : never : never : key_18 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"][key_18]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], Opts_1, key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_17, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_17> : never : never : never : key_17 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"] extends string ? { [k_27 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["alias"]]: number; } : { [k_28 in key_17]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17], key_17> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_28 in key_17]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_17> : never : never : key_17 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"][key_17]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], Opts_1, key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_16, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_16> : never : never : never : key_16 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"] extends string ? { [k_23 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["alias"]]: number; } : { [k_24 in key_16]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16], key_16> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_24 in key_16]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_16> : never : never : key_16 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"][key_16]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], Opts_1, key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_15, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_15> : never : never : never : key_15 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"] extends string ? { [k_19 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["alias"]]: number; } : { [k_20 in key_15]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15], key_15> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_20 in key_15]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_15> : never : never : key_15 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"][key_15]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], Opts_1, key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_14, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_14> : never : never : never : key_14 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"] extends string ? { [k_15 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["alias"]]: number; } : { [k_16 in key_14]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14], key_14> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_16 in key_14]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_14> : never : never : key_14 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"][key_14]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], Opts_1, key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_13, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_13> : never : never : never : key_13 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"] extends string ? { [k_11 in QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["alias"]]: number; } : { [k_12 in key_13]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13], key_13> : QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_12 in key_13]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_13> : never : never : key_13 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"][key_13]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"][key_12]["predicates"]]>>> : never : QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11]["predicates"][key_12], Opts_1, key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_12, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_12> : never : never : never : key_12 extends "uid" | "dtype" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["predicates"][key_12]["alias"] extends string ? { [k_7 in QFPortion["predicates"][key_11]["predicates"][key_12]["alias"]]: number; } : { [k_8 in key_12]: number; } : QFPortion["predicates"][key_11]["predicates"][key_12] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11]["predicates"][key_12], key_12> : QFPortion["predicates"][key_11]["predicates"][key_12] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_8 in key_12]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_12> : never : never : key_12 extends "dExtend" ? QFPortion["predicates"][key_11]["predicates"][key_12] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["predicates"][key_12]["type"] : never : never; } : never)[keyof QFPortion["predicates"][key_11]["predicates"]]>>> : never : QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion["predicates"][key_11], Opts_1, key_11> : QFPortion["predicates"][key_11] extends (infer QFPortion)[] ? QFPortion extends import("./fragment").NextFragment<NextDN> ? QFPortion["predicates"] extends Fragment<NextDN, import("./predicate").ExtendedPredicates<NextDN>> ? import("./fragment").ExpoundPred<QFPortion["opts"], Opts_1, key_11, import("./utils/types").Flatten<import("./utils/types").UnionToIntersection<any[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key_11> : never : never : never : key_11 extends "uid" | "dtype" ? QFPortion["predicates"][key_11] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? QFPortion["predicates"][key_11]["alias"] extends string ? { [k_3 in QFPortion["predicates"][key_11]["alias"]]: number; } : { [k_4 in key_11]: number; } : QFPortion["predicates"][key_11] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<QFPortion["predicates"][key_11], key_11> : QFPortion["predicates"][key_11] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_4 in key_11]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key_11> : never : never : key_11 extends "dExtend" ? QFPortion["predicates"][key_11] extends FragmentReturn<NextDN, any> ? QFPortion["predicates"][key_11]["type"] : never : never; } : never)[keyof QFPortion["predicates"]]>>> : never : QFPortion extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./utils/types").Countable<QFPortion, Opts_1, key> : never : never : never : key extends "uid" | "dtype" ? F[key] extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? F[key]["alias"] extends string ? { [k_41 in F[key]["alias"]]: number; } : { [k_42 in key]: number; } : F[key] extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<F[key], key> : F[key] extends (infer PO)[] ? PO extends {
        asCount: true;
        alias: string | undefined;
        asVar: string | undefined;
    } ? PO["alias"] extends string ? { [k_2 in PO["alias"]]: number; } : { [k_42 in key]: number; } : PO extends boolean | {
        alias: string | undefined;
        asVar: string | undefined;
    } ? import("./fragment").ExpoundStatic<PO, key> : never : never : key extends "dExtend" ? F[key] extends FragmentReturn<DN, any> ? F[key]["type"] : never : never; }[keyof F]>>[];
};
export type QueryOpts = {
    mainFunc: FilterEdge;
} & FilterFull;
export type Query<DN extends DNode, F extends Fragment<DN>> = {
    fragOpts: FragmentReturn<DN, F>;
    append?: OptsChange;
    override?: OptsChange;
} & QueryOpts;
type OptsChange = {
    allowedValues?: Set<string>;
    usedVars?: Map<string, unknown>;
};
export {};
