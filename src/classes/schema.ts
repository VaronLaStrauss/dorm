import { FragmentOpts } from "./fragment";
import { QueryOpts } from "./query";
import { RelationsRecord } from "./relations";
import { FragmentPreds } from "./return-type";
import { TypeRecord } from "./type";

export class Schema<TR extends TypeRecord, RR extends RelationsRecord<TR>> {
  constructor(public types: TR, public relations: RR) {}

  fragment<key extends keyof TR, FO extends FragmentOpts<TR, key, RR>>(
    type: key,
    fragmentOpts: FO
  ): FragmentPreds<TR, key, RR, FO> {
    // return;
    throw Error("Unimplemented");
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
