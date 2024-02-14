export const EqualityOps = { eq: { alias: "Equal", fields: 1 } } as const;
export const InequalityOps = {
  le: { alias: "Less than or equal to", fields: 1 },
  ge: { alias: "Greater than or equal to", fields: 1 },
  lt: { alias: "Less than", fields: 1 },
  gt: { alias: "Greater than", fields: 1 },
} as const;
export const InequalityTwoValOps = {
  between: { alias: "Between the values", fields: 2 },
} as const;
export const TermOps = {
  allofterms: { alias: "All of the terms in", fields: 1 },
  anyofterms: { alias: "Any of the terms in", fields: 1 },
} as const;
export const FullTextOps = {
  alloftext: { alias: "Any of the text in", fields: 1 },
  anyoftext: { alias: "Any of the text in", fields: 1 },
} as const;
export const TrigramOps = { regexp: { alias: "Like", fields: 1 } } as const;
export const TrigramTwoValOps = {
  match: { alias: "Similar to", alias2: "with similarity of", fields: 2 },
} as const;
export const GeoOps = {
  within: { alias: "Within", fields: 1 },
  contains: { alias: "Contained within", fields: 1 },
  intersects: { alias: "Intersecting among", fields: 1 },
} as const;
export const GeoTwoValOps = {
  near: { alias: "Near the values", fields: 2 },
} as const;
export const ZeroIndexlessOps = {
  has: { alias: "Has the property", fields: 0 },
  uid: { alias: "Has the ID", fields: 0 },
  type: { alias: "Is the type", fields: 0 },
} as const;
export const IndexlessOps = {
  uid_in: { alias: "Has UID in", fields: 1 },
} as const;

export const Indexless = {
  ...ZeroIndexlessOps,
  ...IndexlessOps,
};

export const StringIndex = {
  hash: EqualityOps,
  exact: { ...EqualityOps, ...InequalityOps, ...InequalityTwoValOps },
  term: { ...EqualityOps, ...InequalityOps, ...TermOps },
  fulltext: { ...FullTextOps },
  trigram: { ...EqualityOps, ...TrigramOps, ...TrigramTwoValOps },
};

export const DateTimeIndex = {
  year: StringIndex.exact,
  month: StringIndex.exact,
  day: StringIndex.exact,
  hour: StringIndex.exact,
};

export const GeoIndex = {
  ...StringIndex.exact,
  ...GeoOps,
  ...GeoTwoValOps,
};

export const DefaultIndex = {
  ...StringIndex.exact,
};

export const TwoValIndex = {
  ...GeoTwoValOps,
  ...InequalityTwoValOps,
  ...TrigramTwoValOps,
};

export const OneValIndex = {
  ...EqualityOps,
  ...InequalityOps,
  ...TermOps,
  ...FullTextOps,
  ...TrigramOps,
  ...GeoOps,
  ...IndexlessOps,
};

export const ZeroValIndex = {
  ...ZeroIndexlessOps,
};

export const AllIndexes = {
  ...OneValIndex,
  ...TwoValIndex,
  ...ZeroValIndex,
};
