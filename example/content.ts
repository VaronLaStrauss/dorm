import { EdgeType, edge } from "../src/edge";
import { node } from "../src/node";

export const Content = node("Content", {
  detail: edge({ type: EdgeType.STRING }),
});
