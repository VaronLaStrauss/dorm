import { FragmentOpts } from "./fragment";
import { QueryOpts } from "./query";
import { RelationsRecord } from "./relations";
import { FragmentPreds } from "./return-type";
import { TypeRecord } from "./type";

export class Schema<
  TR extends TypeRecord = TypeRecord,
  RR extends RelationsRecord<TR> = RelationsRecord<TR>
> {
  hasOrTypeValues = new Set<string>();

  constructor(public types: TR, public relations: RR) {
    this.init();
  }

  init() {
    for (const typeName in this.types) {
      const type = this.types[typeName];
      this.hasOrTypeValues.add(typeName);
      const preds = type.extendedPreds();
      for (const predName in preds) {
        const pred = preds[predName];
        this.hasOrTypeValues.add(`${pred.typeName}.${predName}`);
      }
    }
  }

  compileFragment<key extends keyof TR, FO extends FragmentOpts<TR, key, RR>>(
    typeName: key,
    fragmentOpts: FO,
    usedVars = new Map<string, unknown>()
  ) {
    // return;

    const type = this.types[typeName];
    const fragment = type.buildPreds<TR>(
      fragmentOpts as never,
      this.relations,
      usedVars,
      this.hasOrTypeValues,
      2
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
