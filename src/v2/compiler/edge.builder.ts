import { compileAsVar } from "./filter.compiler";
import { PredicateType, type PassOpt, type PredOpt } from "../predicate";
import { spacing } from "../utils/spacing";
import type { DEdge, EdgeInit } from "../edge";
import type { DNode } from "../node";

export function buildEdge(
  predName: string,
  edge: DEdge<EdgeInit>,
  node: DNode,
  opts: boolean | PredOpt,
  usedVars: Map<string, unknown>,
  allowedValues: Set<string>,
  level = 1
) {
  const _space = spacing(level);

  if (typeof opts === "boolean")
    return `${_space}${predName}: ${node.name}.${predName}`;

  if (
    edge.opts.type === PredicateType.PASSWORD &&
    typeof opts === "object" &&
    "pwdVar" in opts
  ) {
    const { alias, asVar, pwdVar } = opts as PassOpt;
    const checkPwd = `checkpwd(${node.name}.${predName}, ${pwdVar})`;
    usedVars.set(pwdVar, undefined);
    const _asVar = compileAsVar(asVar, allowedValues);
    return `${_space}${alias ?? predName}:${_asVar}${checkPwd}`;
  }

  if (typeof opts === "boolean")
    return `${_space}${predName}: ${node.name}.${predName}`;

  const { alias, asVar } = opts;
  const _asVar = compileAsVar(asVar, allowedValues);
  return `${_space}${alias ?? predName}: ${_asVar}${node.name}.${predName}`;
}

export function buildStatic(
  predName: "uid" | "dtype",
  opts: boolean | PredOpt,
  allowedValues: Set<string>,
  level = 1
) {
  const edgeName = parseStaticPred(predName);
  const _space = spacing(level);
  if (typeof opts === "boolean") {
    return `${_space}${predName}: ${edgeName}`;
  }

  const { alias, asVar } = opts;
  const _asVar = compileAsVar(asVar, allowedValues);
  return `${_space}${alias ?? predName}:${_asVar}${edgeName}`;
}

export function parseStaticPred(predName: "uid" | "dtype") {
  if (predName === "uid") return "uid";
  else return "dgraph.type";
}
