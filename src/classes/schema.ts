import { FragmentOpts } from "./fragment";
import { QueryOpts } from "./query";
import { RelationsRecord } from "./relations";
import { FragmentPreds } from "./return-type";
import { TypeRecord } from "./type";

export class Schema<
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>
> {
  constructor(public types: TR, public relations: RR) {}

  fragment<key extends keyof TR, FO extends FragmentOpts<TR, key, RR>>(
    typeName: key,
    fragmentOpts: FO,
    usedVars = new Map<string, unknown>()
  ) {
    // return;

    const type = this.types[typeName];
    const fragment = type.buildPreds<TR>(
      fragmentOpts as never,
      this.relations,
      usedVars
    );

    return {
      fragment,
      returnType: undefined as FragmentPreds<TR, key, RR, FO>,
      usedVars,
    };
  }

  // TODO:
  query<TypeName extends keyof TR, QR extends QueryOpts<TR, RR, TypeName>>(
    typeName: TypeName,
    query: QR
  ) {}
}

export function schema<TR extends TypeRecord, RR extends RelationsRecord<TR>>(
  types: TR,
  relations: RR
) {
  return new Schema(types, relations);
}
