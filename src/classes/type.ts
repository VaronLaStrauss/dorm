import { PredicateRecord } from "./predicate";

export type ExtendedTypes = Array<Type>;

export class Type<
  Name extends string = string,
  PR extends PredicateRecord = PredicateRecord
> {
  constructor(public name: Name, public predicateRecord: PR) {}

  extends<ET extends ExtendedTypes>(...extendedTypes: ET) {
    return new ExtendedType(this.name, this.predicateRecord, extendedTypes);
  }
}

export class ExtendedType<
  Name extends string = string,
  PR extends PredicateRecord = PredicateRecord,
  ET extends ExtendedTypes = ExtendedTypes
> extends Type<Name, PR> {
  constructor(
    public name: Name,
    public predicateRecord: PR,
    public extendedTypes: ET
  ) {
    super(name, predicateRecord);
    // TODO: extend here using extendedType.name: type
  }
}

export function createType<TypeName extends string, PR extends PredicateRecord>(
  typeName: TypeName,
  preds: PR
) {
  return new Type(typeName, preds);
}

// ! Working
// type FigureOut<t extends Type<string, PredicateRecord>> = t['name'] extends string ? 'yes' : false;
// const t = new Type('waw', {});
// const _t: FigureOut<typeof t> = ''
// type FigureOut<t extends Type<string, PredicateRecord>> = {
//   [key in keyof t['pr']]: t['pr'][key]['opts']
// };
// const t = createType('waw', {
//   x: predicate({type: PredicateType.STRING, asArray: true})
// });
// const _t: FigureOut<typeof t> = {x: {}}

// ! Working for getting preds from extended types
// type FigureOut2<t extends ExtendedType> = t['extendedTypes'][number]['predicateRecord'] & t['predicateRecord'];
// const x = createType("waw", {
//   x: predicate({ type: PredicateType.STRING, asArray: true }),
// });
// const x2 = createType("waw", {
//   x2: predicate({ type: PredicateType.STRING, asArray: true }),
// });
// const y = createType("another", {
//   y: predicate({ type: PredicateType.STRING, asArray: true, nullable: true }),
// }).extends(x,x2);
// const z: FigureOut2<typeof y> = {};
