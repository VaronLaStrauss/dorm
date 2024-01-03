import { TypeRecord, Schema } from ".";
import { RelationsRecord, FragmentOpts, FragmentPreds } from "..";

export class Fragment<
  TR extends TypeRecord,
  RR extends RelationsRecord<TR>,
  key extends keyof TR,
  FO extends FragmentOpts<TR, key, RR>,
  FP extends FragmentPreds<TR, key, RR, FO> = FragmentPreds<TR, key, RR, FO>
> {
  constructor(
    private schema: Schema<TR, RR>,
    public fragment: string,
    public usedVars: Map<string, unknown>,
    private key: key
  ) {}

  append<F extends FragmentOpts<TR, key, RR>>(opts: F) {
    const relations = this.schema.relations;
    const type = this.schema.types[this.key];
    const fragment = type.buildPreds(
      opts as never,
      relations,
      this.usedVars,
      this.schema.hasOrTypeValues,
      2
    );
    const f = this.fragment + `\n${fragment}`;
    return new Fragment<
      TR,
      RR,
      key,
      FO,
      FP & FragmentPreds<TR, key, RR, typeof opts>
    >(this.schema, f, this.usedVars, this.key);
  }

  execute(): FP {
    throw new Error("Not callable - used only for type");
  }
}
