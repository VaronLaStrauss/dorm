import { EdgeType, edge } from "../src";
import { node } from "../src/node";
import { forward, predicateNode, reverse } from "../src/predicate";
import { Content } from "./content";
import { User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(User, reverse("audits"), { count: true }),
  content: () => predicateNode(Content, forward()),
  auditDate: edge({ type: EdgeType.DATETIME }),
});
