import { DNode, DPredicateNode, node, predicateNode } from "../node";
import { User, type UserType } from "./user";

export type AuditType = DNode<
  "Audit",
  {
    user: () => DPredicateNode<UserType>;
  }
>;
export const Audit: AuditType = node("Audit", {
  user: () => predicateNode(User),
});
