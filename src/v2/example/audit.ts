import { node } from "../node";
import { forward, predicateNode, reverse } from "../predicate";
import { Content } from "./contact";
import { Human, User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(Human, reverse<typeof User>("audits")),
  content: () => predicateNode(Content, forward()),
});
