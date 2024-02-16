import { edge } from "../edge";
import { node, predicateNode, relation } from "../node";
import { PredicateType } from "../predicate";
import { Audit } from "./audit";

export const Human = node("Human", {
  name: edge({ type: PredicateType.STRING, nullable: true, asArray: true }),
});

export const Employee = node("Employee", {
  audits: () => predicateNode(Audit, relation(true), { asArray: true }),
  employeeCode: edge({ type: PredicateType.STRING }),
});

export const User = node("User", {
  password: edge({ type: PredicateType.PASSWORD }),
}).extends(Human, Employee);
