import { edge } from "../edge";
import { node } from "../node";
import { PredicateType } from "../predicate";

export const Content = node("Content", {
  detail: edge({ type: PredicateType.STRING }),
});
