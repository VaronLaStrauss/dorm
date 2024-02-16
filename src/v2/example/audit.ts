import { node, predicateNode, relation } from "../node";
import { User } from "./user";

export const Audit = node("Audit", {
  user: () => predicateNode(User, relation<typeof User>("audits")),
});
