export function parseDqlType(value: unknown) {
  const type = typeof value;
  let retType = "";
  switch (type) {
    case "number":
      switch (Number(value) % 1) {
        case 0:
          retType = "int";
          break;
        default:
          retType = "float";
      }
      break;
    case "boolean":
      retType = "bool";
      break;
    default:
      retType = "string";
      break;
  }

  return retType;
}
