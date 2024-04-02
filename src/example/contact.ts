import { EdgeType, edge } from "../edge";
import { node } from "../node";

export const Content = node("Content", {
  detail: edge({ type: EdgeType.STRING }),
});
