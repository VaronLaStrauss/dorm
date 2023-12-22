import { PredicateType } from "../utils/pred-type";

export type PredicateInitOpts = {
  count?: true;
  nullable?: true;
  asArray?: true;
  type: PredicateType;
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

// ! Working:
// type FigureOut<P extends Predicate<PredicateType, PredicateInitOpts>> = P['pt'] extends PredicateType.STRING ? 'waw' : boolean;
// const x = new Predicate(PredicateType.STRING, )
// const y: FigureOut<typeof x> = ''
// type FigureOut2<P extends Predicate< PredicateInitOpts>> = P['opts'] extends PredicateInitOpts ? P['opts']['asArray'] extends true ? 'yeeyyy' : false : never;
// const x = predicate({type: PredicateType.STRING, asArray: true});
// const y: FigureOut2<typeof x> = ''
