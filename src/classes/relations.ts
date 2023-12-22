import { PredicateType } from "../utils/pred-type";
import { PredicateRecord, predicate } from "./predicate";
import { ExtendedType, Type, createType } from "./type";

 type _Pickle<PR extends PredicateRecord> = {
  [key in keyof PR]: PR[key]["options"]["type"] extends PredicateType.UID
    ? key
    : never;
}[keyof PR];

type _PickleExtended<T extends ExtendedType> = {
  [key in keyof T['extendedTypes'][number]['predicateRecord']]: T['extendedTypes'][number]['predicateRecord'][key]['options']['type'] extends PredicateType.UID ? key : never
}[keyof T['extendedTypes'][number]['predicateRecord']]



type ExtendedRelationPickle<ExT extends ExtendedType> = Pick<ExT['extendedTypes'][number]['predicateRecord'],  _Pickle<ExT['extendedTypes'][number]['predicateRecord']>>

export class Relations<T extends Type | ExtendedType, R extends Relation<T>> {
  constructor(type: T, relations: R) {}
}

const x = createType("waw", {
  x: predicate({ type: PredicateType.UID, asArray: true }),
});
const x2 = createType("waw", {
  x2: predicate({ type: PredicateType.UID, asArray: true }),
});
const y = createType("another", {
  y: predicate({ type: PredicateType.STRING, asArray: true, nullable: true }),
}).extends(x, x2);

new Relations(x, {});

new Relations(x2, {});

const _x = y.extendedTypes[0].predicateRecord

const _y: _PickleExtended<typeof y> = ;
new Relations(y, {});
