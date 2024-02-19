import {
  EdgeType,
  type DEdge,
  type EdgeInit,
  type IndexableEdge,
} from "../edge";
import type { DNode } from "../node";
import type { PredicateNode, ExtendedPredicates } from "../predicate";
import {
  AllIndexes,
  DateTimeIndex,
  DefaultIndex,
  GeoIndex,
  Indexless,
  StringIndex,
} from "./indexes";

export function filterablePreds<DN extends DNode, F extends Filterables<DN>>(
  node: DN,
  filterables: F
) {
  const predToNode = node.getPredToNode();
  const predicates = node.extendedPredicates;
  const allowedFilters: AllowedFilters = {} as never;

  for (const predName in filterables) {
    const pred = predicates[predName];
    const { label } = filterables[predName];
    const actualNode = predToNode[predName];
    const field = `${actualNode.name}.${predName}`;

    if (typeof pred === "function") {
      allowedFilters[predName] = {
        indexes: { uid_in: Indexless["uid_in"] },
        label,
        field,
        jsType: "string" as const,
      };
      continue;
    }

    const options = (pred as DEdge<EdgeInit>).opts;
    let indexes: Record<string, unknown> = {
      has: Indexless["has"],
      ...extractIndexes(options, predName, actualNode.name),
    };
    const jsType = parseJsType(options);
    if ("allowedValues" in options) {
    }

    allowedFilters[predName] = {
      indexes,
      label,
      field,
      jsType,
      allowedValues:
        "allowedValues" in options ? options.allowedValues : undefined,
    };
  }

  allowedFilters["dtype"] = {
    indexes: { type: Indexless.type },
    label: "Type",
    field: "dgraph.type",
    jsType: "string",
  };

  allowedFilters["uid"] = {
    indexes: { uid: Indexless.uid },
    label: "ID",
    field: "uid",
    jsType: "string",
  };

  return allowedFilters;
}

function extractIndexes(options: EdgeInit, predName: string, nodeName: string) {
  if (!("indexes" in options)) {
    throw new Error(
      `Predicate ${String(nodeName)}.${String(predName)} must have an index`
    );
  }
  let indexes: Record<string, unknown> = {};
  if (typeof options.indexes === "boolean") {
    if (options.type === EdgeType.GEO) indexes = { ...indexes, ...GeoIndex };
    else indexes = { ...indexes, ...DefaultIndex };
  } else if (options.indexes instanceof Array) {
    if (options.type === EdgeType.STRING) {
      const stringIdx = options.indexes.reduce(
        (acc, key) => ({ ...acc, ...StringIndex[key] }),
        {} as Record<string, unknown>
      );

      indexes = { ...indexes, ...stringIdx };
    } else {
      const dateIdx = (
        Object.keys(options.indexes) as (keyof typeof DateTimeIndex)[]
      ).reduce(
        (acc, key) => ({ ...acc, ...DateTimeIndex[key] }),
        {} as Record<string, unknown>
      );
      indexes = { ...indexes, ...dateIdx };
    }
  }

  return indexes;
}

function parseJsType(ops: EdgeInit) {
  if (ops.type === EdgeType.BOOL) return "boolean";
  if (ops.type === EdgeType.DATETIME) return "date";
  if (
    ops.type === EdgeType.FLOAT ||
    ops.type === EdgeType.INT ||
    ops.type === EdgeType.GEO
  )
    return "number";
  return "string";
}

type AllowedFilters = Record<
  string,
  {
    jsType: ReturnType<typeof parseJsType>;
    indexes: { [key in keyof typeof AllIndexes]?: (typeof AllIndexes)[key] };
    label: string;
    field: string;
    allowedValues?: Record<string | number, string | number>;
  }
>;

type FilterOpts = {
  label: string;
};

type FilterableKeys<DN extends DNode, EP = ExtendedPredicates<DN>> = {
  [key in keyof EP]: EP[key] extends () => PredicateNode<DNode>
    ? key
    : EP[key] extends DEdge<infer Opts>
    ? Opts extends IndexableEdge
      ? Opts["indexes"] extends
          | Array<keyof typeof StringIndex>
          | Array<keyof typeof DateTimeIndex>
        ? key
        : never
      : never
    : never;
}[keyof EP];

type Filterables<
  DN extends DNode,
  EP = ExtendedPredicates<DN>,
  FK = FilterableKeys<DN, EP>
> = FK extends keyof EP
  ? {
      [key in keyof Pick<EP, FK>]: FilterOpts;
    }
  : never;
