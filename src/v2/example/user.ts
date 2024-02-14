import { Audit, type AuditType } from "./audit";
import { edge } from "../edge";
import { DNodeExtended, DPredicateNode, node, predicateNode } from "../node";
import { PredicateType } from "../predicate";

export const Human = node("Human", {
  name: edge({ type: PredicateType.STRING, nullable: true, asArray: true }),
});

export const Employee = node("Employee", {
  employeeCode: edge({ type: PredicateType.STRING }),
});

export type UserType = DNodeExtended<
  [typeof Human, typeof Employee],
  "User",
  {
    audits: () => DPredicateNode<AuditType, { asArray: true }>;
  }
>;
export const User: UserType = node("User", {
  audits: () => predicateNode(Audit, { asArray: true }),
}).extends(Human, Employee);
