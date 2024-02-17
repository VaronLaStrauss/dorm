import { EdgeType, edge } from "../edge";
import { node } from "../node";
import { forward, predicateNode } from "../predicate";
import { Audit } from "./audit";

export const Human = node("Human", {
  name: edge({ type: EdgeType.STRING, nullable: true, asArray: true }),
});

export const Employee = node("Employee", {
  audits: () => predicateNode(Audit, forward(), { asArray: true }),
  employeeCode: edge({ type: EdgeType.STRING }),
});

export const User = node("User", {
  password: edge({ type: EdgeType.PASSWORD }),
}).extends(Human, Employee);
