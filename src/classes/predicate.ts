import { spacing } from "../utils";
import { DateTimeIndex, StringIndex } from "../utils/indexes";
import { PredicateType } from "../utils/pred-type";

export type Pred =
  | PasswordPredicate
  | IntPredicate
  | FloatPredicate
  | BoolPredicate
  | GeoPredicate
  | DateTimePredicate
  | StringPredicate
  | UidPredicate;

export type PredicateInitOpts = {
  count?: true;
  nullable?: true;
  asArray?: true;
} & Pred;

export type StringPredicate = {
  indexes?: (keyof typeof StringIndex)[];
  type: PredicateType.STRING;
  fromValues?: ReadonlyArray<string>;
};

export type DateTimePredicate = {
  indexes?: (keyof typeof DateTimeIndex)[];
  type: PredicateType.DATETIME;
};

export type UidPredicate = {
  type: PredicateType.UID;
};

export type PasswordPredicate = {
  type: PredicateType.PASSWORD;
};

export type IntPredicate = {
  indexes?: true;
  type: PredicateType.INT;
};

export type FloatPredicate = {
  indexes?: true;
  type: PredicateType.FLOAT;
};

export type BoolPredicate = {
  indexes?: true;
  type: PredicateType.BOOL;
};

export const GoGeomTypes = [
  "Point",
  "LineString",
  "Polygon",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon",
  "GeometryCollection",
] as const;

export type GeoPredicate = {
  indexes?: true;
  type: PredicateType.GEO;
  geoType: (typeof GoGeomTypes)[number];
};

export function fromValues<T extends Readonly<string>>(...vals: T[]) {
  return vals;
}

export class Predicate<PIO extends PredicateInitOpts> {
  typeName = "";

  constructor(public options: PIO) {}

  build(
    predName: string,
    opts: PredOpts | boolean,
    usedVars: Map<string, unknown>,
    space: number
  ) {
    const _space = spacing(space);
    if (this.options.type === PredicateType.PASSWORD) {
      const var1 = `$pass${usedVars.size}`;
      usedVars.set(var1, undefined);
      const checkPwd = `checkpwd(${this.typeName}.${predName}, ${var1})`;
      if (typeof opts === "boolean") return `${_space}${predName}: ${checkPwd}`;
      const { alias, asVar } = opts;
      const _asVar = asVar ? ` as ${asVar}` : "";
      return `${_space}${alias ?? predName}: ${checkPwd}${_asVar}`;
    }

    if (typeof opts === "boolean")
      return `${_space}${predName}: ${this.typeName}.${predName}`;

    const { alias, asVar } = opts;
    const _asVar = asVar ? ` as ${asVar}` : "";
    return `${_space}${alias ?? predName}: ${
      this.typeName
    }.${predName}${_asVar}`;
  }
}

export type PredicateRecord = Record<string, Predicate<PredicateInitOpts>>;

export function predicate<PredInitOpts extends PredicateInitOpts>(
  options: PredInitOpts
) {
  return new Predicate(options);
}

export function predOpts<
  alias extends string | undefined,
  asVar extends string | undefined
>(alias: alias = undefined as alias, asVar: asVar = undefined as asVar) {
  return { alias, asVar };
}

export type PredOpts = ReturnType<typeof predOpts>;

// ! Working:
// type FigureOut<P extends Predicate<PredicateType, PredicateInitOpts>> = P['pt'] extends PredicateType.STRING ? 'waw' : boolean;
// const x = new Predicate(PredicateType.STRING, )
// const y: FigureOut<typeof x> = ''
// type FigureOut2<P extends Predicate< PredicateInitOpts>> = P['opts'] extends PredicateInitOpts ? P['opts']['asArray'] extends true ? 'yeeyyy' : false : never;
// const x = predicate({type: PredicateType.STRING, asArray: true});
// const y: FigureOut2<typeof x> = ''
