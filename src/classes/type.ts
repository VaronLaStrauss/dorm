import { PredicateRecord, PredOpts, Forward, Reverse, predicate } from ".";
import {
  PredicateType,
  spacing,
  forwardReverseType,
  compileDirectives,
} from "..";
import {
  ExtendedTypes,
  FragmentOpts,
  RelationsRecord,
  WithFragment,
  ExtendedPredicates,
} from "../types";

export class Type<
  Name extends string = string,
  PR extends PredicateRecord = PredicateRecord
> {
  constructor(public name: Name, public predicateRecord: PR) {
    for (const predKey in predicateRecord) {
      predicateRecord[predKey].typeName = name;
    }
  }

  extends<ET extends ExtendedTypes>(...extendedTypes: ET) {
    return new ExtendedType(this.name, this.predicateRecord, extendedTypes);
  }

  extendedPreds() {
    return this.predicateRecord;
  }

  buildPreds<TR extends TypeRecord, key extends keyof TR>(
    opts: FragmentOpts<TR, key, RelationsRecord<TR>>,
    relations: RelationsRecord<TR>,
    usedVars: Map<string, unknown>,
    hasOrTypeValues: Set<string>,
    space = 1,
    asRecurse?: boolean
  ) {
    const preds = this.extendedPreds();
    const inners: string[] = [];
    const relation = relations[this.name]!;

    for (const predKey in opts) {
      const predOpt = opts[predKey];
      const pred = preds[predKey];

      if (
        pred.options.type === PredicateType.UID ||
        pred.options.type === PredicateType.TYPE
      ) {
        const inner = pred.buildStatic(
          predKey,
          predOpt as PredOpts | boolean,
          space
        );
        inners.push(inner);
        continue;
      }

      if (pred.options.type !== PredicateType.NODE) {
        const inner = pred.build(predKey, predOpt as PredOpts, usedVars, space);
        inners.push(inner);
        continue;
      }

      const { type } = relation.relations[predKey as never] as {
        type: Type;
      };

      const inner = type.build(
        this.name,
        predKey,
        predOpt as WithFragment<never, never, never>,
        relations,
        usedVars,
        hasOrTypeValues,
        space,
        asRecurse
      );
      inners.push(inner);
    }
    return inners.join("\n");
  }

  buildAllLeafPreds(usedVars: Map<string, unknown>, space = 1) {
    const preds = this.extendedPreds();
    const inners: string[] = [];
    for (const predKey in preds) {
      const pred = preds[predKey];
      const {
        options: { type },
      } = pred;
      if (type === PredicateType.NODE) continue;
      const inner =
        type === PredicateType.UID || type === PredicateType.TYPE
          ? pred.buildStatic(predKey, true, space)
          : pred.build(predKey, true, usedVars, space);
      inners.push(inner);
    }

    return inners.join("\n");
  }

  build<TR extends TypeRecord>(
    typeName: string,
    predName: string,
    withFrag: WithFragment<TR, typeof this.name, RelationsRecord<TR>> | boolean,
    relations: RelationsRecord<TR>,
    usedVars: Map<string, unknown>,
    hasOrTypeValues: Set<string>,
    space = 1,
    asRecurse?: boolean
  ): string {
    const _space = spacing(space);
    const relation = relations[typeName]!.relations[predName as never] as
      | Forward
      | Reverse;

    if (typeof withFrag === "boolean") {
      const builtPreds = this.buildAllLeafPreds(usedVars, space + 1);
      const relationStr = forwardReverseType(typeName, predName, relation);
      if (asRecurse) return `${_space}${relationStr}\n${builtPreds}`;

      return `${_space}${relationStr} {\n${builtPreds}\n${_space}}`;
    }

    const { with: w, opts, cascade, page, filter, order } = withFrag;

    const relationStr = forwardReverseType(
      typeName,
      predName,
      relation,
      opts?.alias,
      opts?.asVar
    );
    const directives = compileDirectives(
      { cascade, page, filter, order },
      usedVars,
      hasOrTypeValues
    );

    if (!w) return `${_space}${relationStr} ${directives} `;

    const builtPreds = this.buildPreds(
      w,
      relations,
      usedVars,
      hasOrTypeValues,
      space + 1,
      asRecurse
    );

    if (asRecurse)
      return `${_space}${relationStr} ${directives}\n${builtPreds}`;

    return `${_space}${relationStr} ${directives} {\n${builtPreds}\n${_space}}`;
  }

  buildSchema(relations: RelationsRecord<TypeRecord>) {
    const innerPreds: string[] = [];
    const outerPreds: string[] = [];
    const space = spacing(1);

    const preds = this.extendedPreds();

    for (const predKey in preds) {
      const pred = preds[predKey];
      const {
        options: { type, asArray, count },
        typeName,
      } = pred;

      if (type === PredicateType.UID || type === PredicateType.TYPE) continue;

      const typeDeclaration = `${typeName}.${predKey}`;

      const predType = asArray ? `[${type}]` : type;
      let outerPred = `${typeDeclaration}: ${predType}`;
      if ("indexes" in pred.options) {
        const indexes: string[] = [];
        const { indexes: _indexes } = pred.options;
        if (typeof _indexes === "boolean") indexes.push(type);
        else
          for (const indexKey of _indexes as Array<string>) {
            indexes.push(indexKey);
          }
        outerPred += ` @index(${indexes.join(", ")})`;
      }

      let innerPred = typeDeclaration;
      if (type === PredicateType.NODE) {
        const predType = asArray ? "[uid]" : "uid";
        outerPred = `${typeDeclaration}: ${predType}`;

        const rels = relations[pred.typeName];
        const rel = rels?.relations[predKey as never]! as Forward | Reverse;

        if (rel instanceof Forward) {
          const predType = asArray ? `[${rel.type.name}]` : rel.type.name;
          innerPred += `: ${predType}`;
          outerPred += " @reverse";
        } else if (rel instanceof Reverse) {
          const predType = asArray ? `[${rel.type.name}]` : rel.type.name;
          innerPred = `<~${rel.type.name}.${rel.field}>: ${predType}`;
          outerPred = "";
        } else {
          outerPred = `# Incorrect implementation of ${innerPred}`;
          innerPred = `# Incorrect implementation of ${innerPred}`;
        }
      }

      if (count) outerPred += ` @count`;
      if (this.name !== pred.typeName) outerPred = "";

      if (outerPred.trim().length) {
        outerPred += " .";
        outerPreds.push(outerPred);
      }

      innerPreds.push(space + innerPred);
    }

    return `${outerPreds.join("\n")}\ntype ${this.name} {\n${innerPreds.join(
      "\n"
    )}\n}\n`;
  }
}

export class ExtendedType<
  Name extends string = string,
  PR extends PredicateRecord = PredicateRecord,
  ET extends ExtendedTypes = ExtendedTypes
> extends Type<Name, PR> {
  constructor(
    public name: Name,
    public predicateRecord: PR,
    public extendedTypes: ET
  ) {
    super(name, predicateRecord);
  }

  override extendedPreds(): ExtendedPredicates<typeof this> {
    const extended = this.extendedTypes.reduce((acc, curr) => {
      return { ...curr.extendedPreds(), ...acc };
    }, {} as Record<keyof (typeof this.extendedTypes)[number], (typeof this.extendedTypes)[number]["extendedPreds"]>);
    return { ...this.predicateRecord, ...extended } as ExtendedPredicates<
      typeof this
    >;
  }
}

export function createType<TypeName extends string, PR extends PredicateRecord>(
  typeName: TypeName,
  preds: PR
) {
  return new Type(typeName, {
    ...preds,
    uid: predicate({ type: PredicateType.UID }),
    dtype: predicate({ type: PredicateType.TYPE }),
  });
}

export type TypeRecord = Record<string, Type | ExtendedType>;
