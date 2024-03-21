import { EdgeType, edge } from "..";
import { node } from "../node";
import { forward, predicateNode, reverse } from "../predicate";
import { Content } from "./contact";
import { User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(User, reverse("audits"), { count: true }),
  content: () => predicateNode(Content, forward()),
  auditDate: edge({ type: EdgeType.DATETIME }),
});
