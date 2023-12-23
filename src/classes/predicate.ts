import { DATETIME_INDEXES, STRING_INDEXES } from "../utils/indexes";
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
  indexes?: Partial<{
    [key in (typeof STRING_INDEXES)[number]]: true;
  }>;
  type: PredicateType.STRING;
  fromValues?: readonly string[];
};

export type UidPredicate = {
  type: PredicateType.UID;
};

export type PasswordPredicate = {
  type: PredicateType.PASSWORD;
};

export type IntPredicate = {
  indexes?: Partial<{
    int: true;
  }>;
  type: PredicateType.INT;
};

export type FloatPredicate = {
  indexes?: Partial<{
    float: true;
  }>;
  type: PredicateType.FLOAT;
};

export type BoolPredicate = {
  indexes?: Partial<{
    bool: true;
  }>;
  type: PredicateType.BOOL;
};

export type GeoPredicate = {
  indexes?: Partial<{
    geo: true;
  }>;
  type: PredicateType.GEO;
};

export type DateTimePredicate = {
  indexes?: Partial<{
    [key in (typeof DATETIME_INDEXES)[number]]: true;
  }>;
  type: PredicateType.DATETIME;
};

export class Predicate<PredOpts extends PredicateInitOpts> {
  constructor(public options: PredOpts) {}
}

export type PredicateRecord = Record<string, Predicate<PredicateInitOpts>>;

export function predicate<PredOpts extends PredicateInitOpts>(
  options: PredOpts
) {
  return new Predicate(options);
}

export function predOpts<
  alias extends string | undefined,
  asVar extends string | undefined
>(alias: alias = undefined as alias, asVar: asVar = undefined as asVar) {
  return { alias, asVar };
}

// ! Working:
// type FigureOut<P extends Predicate<PredicateType, PredicateInitOpts>> = P['pt'] extends PredicateType.STRING ? 'waw' : boolean;
// const x = new Predicate(PredicateType.STRING, )
// const y: FigureOut<typeof x> = ''
// type FigureOut2<P extends Predicate< PredicateInitOpts>> = P['opts'] extends PredicateInitOpts ? P['opts']['asArray'] extends true ? 'yeeyyy' : false : never;
// const x = predicate({type: PredicateType.STRING, asArray: true});
// const y: FigureOut2<typeof x> = ''
