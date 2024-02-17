import { node } from "../node";
import { forward, predicateNode, reverse } from "../predicate";
import { Content } from "./contact";
import { User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(User, reverse("audits")),
  content: () => predicateNode(Content, forward()),
});
