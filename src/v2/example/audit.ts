import { forward, node, predicateNode, reverse } from "../node";
import { Content } from "./contact";
import { Human, User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(Human, reverse<typeof User>("audits")),
  content: () => predicateNode(Content, forward()),
});
