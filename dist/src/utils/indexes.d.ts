export declare const EqualityOps: {
    readonly eq: {
        readonly alias: "Equal";
        readonly fields: 1;
    };
};
export declare const InequalityOps: {
    readonly le: {
        readonly alias: "Less than or equal to";
        readonly fields: 1;
    };
    readonly ge: {
        readonly alias: "Greater than or equal to";
        readonly fields: 1;
    };
    readonly lt: {
        readonly alias: "Less than";
        readonly fields: 1;
    };
    readonly gt: {
        readonly alias: "Greater than";
        readonly fields: 1;
    };
};
export declare const InequalityTwoValOps: {
    readonly between: {
        readonly alias: "Between the values";
        readonly fields: 2;
    };
};
export declare const TermOps: {
    readonly allofterms: {
        readonly alias: "All of the terms in";
        readonly fields: 1;
    };
    readonly anyofterms: {
        readonly alias: "Any of the terms in";
        readonly fields: 1;
    };
};
export declare const FullTextOps: {
    readonly alloftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
    readonly anyoftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
};
export declare const TrigramOps: {
    readonly regexp: {
        readonly alias: "Like";
        readonly fields: 1;
    };
};
export declare const TrigramTwoValOps: {
    readonly match: {
        readonly alias: "Similar to";
        readonly alias2: "with similarity of";
        readonly fields: 2;
    };
};
export declare const GeoOps: {
    readonly within: {
        readonly alias: "Within";
        readonly fields: 1;
    };
    readonly contains: {
        readonly alias: "Contained within";
        readonly fields: 1;
    };
    readonly intersects: {
        readonly alias: "Intersecting among";
        readonly fields: 1;
    };
};
export declare const GeoTwoValOps: {
    readonly near: {
        readonly alias: "Near the values";
        readonly fields: 2;
    };
};
export declare const ZeroIndexlessOps: {
    readonly has: {
        readonly alias: "Has the property";
        readonly fields: 0;
    };
    readonly uid: {
        readonly alias: "Has the ID";
        readonly fields: 0;
    };
    readonly type: {
        readonly alias: "Is the type";
        readonly fields: 0;
    };
};
export declare const IndexlessOps: {
    readonly uid_in: {
        readonly alias: "Has UID in";
        readonly fields: 1;
    };
};
export declare const Indexless: {
    uid_in: {
        readonly alias: "Has UID in";
        readonly fields: 1;
    };
    has: {
        readonly alias: "Has the property";
        readonly fields: 0;
    };
    uid: {
        readonly alias: "Has the ID";
        readonly fields: 0;
    };
    type: {
        readonly alias: "Is the type";
        readonly fields: 0;
    };
};
export declare const StringIndex: {
    hash: {
        readonly eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    exact: {
        between: {
            readonly alias: "Between the values";
            readonly fields: 2;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    term: {
        allofterms: {
            readonly alias: "All of the terms in";
            readonly fields: 1;
        };
        anyofterms: {
            readonly alias: "Any of the terms in";
            readonly fields: 1;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    fulltext: {
        alloftext: {
            readonly alias: "Any of the text in";
            readonly fields: 1;
        };
        anyoftext: {
            readonly alias: "Any of the text in";
            readonly fields: 1;
        };
    };
    trigram: {
        match: {
            readonly alias: "Similar to";
            readonly alias2: "with similarity of";
            readonly fields: 2;
        };
        regexp: {
            readonly alias: "Like";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
};
export declare const DateTimeIndex: {
    year: {
        between: {
            readonly alias: "Between the values";
            readonly fields: 2;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    month: {
        between: {
            readonly alias: "Between the values";
            readonly fields: 2;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    day: {
        between: {
            readonly alias: "Between the values";
            readonly fields: 2;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
    hour: {
        between: {
            readonly alias: "Between the values";
            readonly fields: 2;
        };
        le: {
            readonly alias: "Less than or equal to";
            readonly fields: 1;
        };
        ge: {
            readonly alias: "Greater than or equal to";
            readonly fields: 1;
        };
        lt: {
            readonly alias: "Less than";
            readonly fields: 1;
        };
        gt: {
            readonly alias: "Greater than";
            readonly fields: 1;
        };
        eq: {
            readonly alias: "Equal";
            readonly fields: 1;
        };
    };
};
export declare const GeoIndex: {
    near: {
        readonly alias: "Near the values";
        readonly fields: 2;
    };
    within: {
        readonly alias: "Within";
        readonly fields: 1;
    };
    contains: {
        readonly alias: "Contained within";
        readonly fields: 1;
    };
    intersects: {
        readonly alias: "Intersecting among";
        readonly fields: 1;
    };
    between: {
        readonly alias: "Between the values";
        readonly fields: 2;
    };
    le: {
        readonly alias: "Less than or equal to";
        readonly fields: 1;
    };
    ge: {
        readonly alias: "Greater than or equal to";
        readonly fields: 1;
    };
    lt: {
        readonly alias: "Less than";
        readonly fields: 1;
    };
    gt: {
        readonly alias: "Greater than";
        readonly fields: 1;
    };
    eq: {
        readonly alias: "Equal";
        readonly fields: 1;
    };
};
export declare const DefaultIndex: {
    between: {
        readonly alias: "Between the values";
        readonly fields: 2;
    };
    le: {
        readonly alias: "Less than or equal to";
        readonly fields: 1;
    };
    ge: {
        readonly alias: "Greater than or equal to";
        readonly fields: 1;
    };
    lt: {
        readonly alias: "Less than";
        readonly fields: 1;
    };
    gt: {
        readonly alias: "Greater than";
        readonly fields: 1;
    };
    eq: {
        readonly alias: "Equal";
        readonly fields: 1;
    };
};
export declare const TwoValIndex: {
    match: {
        readonly alias: "Similar to";
        readonly alias2: "with similarity of";
        readonly fields: 2;
    };
    between: {
        readonly alias: "Between the values";
        readonly fields: 2;
    };
    near: {
        readonly alias: "Near the values";
        readonly fields: 2;
    };
};
export declare const OneValIndex: {
    uid_in: {
        readonly alias: "Has UID in";
        readonly fields: 1;
    };
    within: {
        readonly alias: "Within";
        readonly fields: 1;
    };
    contains: {
        readonly alias: "Contained within";
        readonly fields: 1;
    };
    intersects: {
        readonly alias: "Intersecting among";
        readonly fields: 1;
    };
    regexp: {
        readonly alias: "Like";
        readonly fields: 1;
    };
    alloftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
    anyoftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
    allofterms: {
        readonly alias: "All of the terms in";
        readonly fields: 1;
    };
    anyofterms: {
        readonly alias: "Any of the terms in";
        readonly fields: 1;
    };
    le: {
        readonly alias: "Less than or equal to";
        readonly fields: 1;
    };
    ge: {
        readonly alias: "Greater than or equal to";
        readonly fields: 1;
    };
    lt: {
        readonly alias: "Less than";
        readonly fields: 1;
    };
    gt: {
        readonly alias: "Greater than";
        readonly fields: 1;
    };
    eq: {
        readonly alias: "Equal";
        readonly fields: 1;
    };
};
export declare const ZeroValIndex: {
    has: {
        readonly alias: "Has the property";
        readonly fields: 0;
    };
    uid: {
        readonly alias: "Has the ID";
        readonly fields: 0;
    };
    type: {
        readonly alias: "Is the type";
        readonly fields: 0;
    };
};
export declare const AllIndexes: {
    has: {
        readonly alias: "Has the property";
        readonly fields: 0;
    };
    uid: {
        readonly alias: "Has the ID";
        readonly fields: 0;
    };
    type: {
        readonly alias: "Is the type";
        readonly fields: 0;
    };
    match: {
        readonly alias: "Similar to";
        readonly alias2: "with similarity of";
        readonly fields: 2;
    };
    between: {
        readonly alias: "Between the values";
        readonly fields: 2;
    };
    near: {
        readonly alias: "Near the values";
        readonly fields: 2;
    };
    uid_in: {
        readonly alias: "Has UID in";
        readonly fields: 1;
    };
    within: {
        readonly alias: "Within";
        readonly fields: 1;
    };
    contains: {
        readonly alias: "Contained within";
        readonly fields: 1;
    };
    intersects: {
        readonly alias: "Intersecting among";
        readonly fields: 1;
    };
    regexp: {
        readonly alias: "Like";
        readonly fields: 1;
    };
    alloftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
    anyoftext: {
        readonly alias: "Any of the text in";
        readonly fields: 1;
    };
    allofterms: {
        readonly alias: "All of the terms in";
        readonly fields: 1;
    };
    anyofterms: {
        readonly alias: "Any of the terms in";
        readonly fields: 1;
    };
    le: {
        readonly alias: "Less than or equal to";
        readonly fields: 1;
    };
    ge: {
        readonly alias: "Greater than or equal to";
        readonly fields: 1;
    };
    lt: {
        readonly alias: "Less than";
        readonly fields: 1;
    };
    gt: {
        readonly alias: "Greater than";
        readonly fields: 1;
    };
    eq: {
        readonly alias: "Equal";
        readonly fields: 1;
    };
};
