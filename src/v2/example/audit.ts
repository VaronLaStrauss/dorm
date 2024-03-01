import { node } from "../node";
import { forward, predicateNode, reverse } from "../predicate";
import { Content } from "./contact";
import { User } from "./user";

export const Audit = node("Audit", {
  users: () =>
    predicateNode(User, reverse("audits"), { count: true, asArray: true }),
  content: () => predicateNode(Content, forward()),
});
