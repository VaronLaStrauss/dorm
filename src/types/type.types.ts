import type { ExtendedType, Type } from "../classes/type";

export type ExtendedTypes = Array<Type>;
export type TypeRecord = Record<string, Type | ExtendedType>;
