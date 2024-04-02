import { EdgeType, edge, from } from "../edge";
import { node } from "../node";
import { forward, predicateNode } from "../predicate";
import { Audit } from "./audit";

export const Human = node("Human", {
  name: edge({
    type: EdgeType.STRING,
    nullable: true,
    asArray: true,
    indexes: ["hash"],
  }),
});

const UserActive = from([1, 2, 3]);

export const Employee = node("Employee", {
  audits: () => predicateNode(Audit, forward(), { asArray: true, count: true }),
  employeeCode: edge({ type: EdgeType.STRING }),
  active: edge({
    type: EdgeType.FLOAT,
    allowedValues: UserActive,
  }),
}).extends(Human);

export const User = node("User", {
  password: edge({ type: EdgeType.PASSWORD }),
}).extends(Employee);
