import { PredicateRecord } from "../classes/predicate";
import { PredicateType } from "./pred-type";

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type _PicklePredicates<PR extends PredicateRecord> = {
  [key in keyof PR]: PR[key]["options"]["type"] extends PredicateType.UID
    ? key
    : never;
}[keyof PR];
