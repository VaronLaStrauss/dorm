import {
  Forward,
  FragmentOpts,
  RelationsRecord,
  Reverse,
  WithFragment,
} from ".";
import { PredicateType, spacing } from "../utils";
import { UnionToIntersection } from "../utils/types";
import { compileDirectives, forwardReverseType } from "./compiler";
import { PredOpts, PredicateRecord } from "./predicate";

export type ExtendedTypes = Array<Type>;

export type ExtPredicateUnion<ET extends ExtendedType> = ET["predicateRecord"] &
  UnionToIntersection<ReturnType<ET["extendedTypes"][number]["extendedPreds"]>>;

export type ExtendedPredicates<T extends Type | ExtendedType> =
  T extends ExtendedType
    ? {
        [key in keyof ExtPredicateUnion<T>]: ExtPredicateUnion<T>[key] & {
          typeName: string;
        };
      }
    : {
        [key in keyof T["predicateRecord"]]: T["predicateRecord"][key] & {
          typeName: string;
        };
      };

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

  buildPreds<TR extends TypeRecord>(
    opts: FragmentOpts<TR, typeof this.name, RelationsRecord<TR>>,
    relations: RelationsRecord<TR>,
    usedVars: Map<string, unknown>,
    space = 1
  ) {
    const preds = this.extendedPreds();
    const inners: string[] = [];
    const relation = relations[this.name]!;

    for (const predKey in opts) {
      const predOpt = opts[predKey];
      const pred = preds[predKey];
      if (pred.options.type === PredicateType.UID) {
        const { type } = relation.relations[predKey as never] as {
          type: Type;
        };

        const inner = type.build(
          this.name,
          predKey,
          predOpt as WithFragment<never, never, never>,
          relations,
          usedVars,
          space
        );
        inners.push(inner);
        continue;
      }
      const inner = pred.build(predKey, predOpt as PredOpts, space);
      inners.push(inner);
    }
    return inners.join("\n");
  }

  buildAllLeafPreds(space = 1) {
    const preds = this.extendedPreds();
    const inners: string[] = [];
    for (const predKey in preds) {
      const pred = preds[predKey];
      if (pred.options.type === PredicateType.UID) continue;
      inners.push(pred.build(predKey, true, space));
    }

    return inners.join("\n");
  }

  build<TR extends TypeRecord>(
    typeName: string,
    predName: string,
    withFrag: WithFragment<TR, typeof this.name, RelationsRecord<TR>> | boolean,
    relations: RelationsRecord<TR>,
    usedVars: Map<string, unknown>,
    space = 1
  ): string {
    const _space = spacing(space);
    const relation = relations[typeName]!.relations[predName as never] as
      | Forward
      | Reverse;

    if (typeof withFrag === "boolean") {
      const builtPreds = this.buildAllLeafPreds(space + 1);
      const relationStr = forwardReverseType(typeName, predName, relation);
      return `${_space}${relationStr} {\n${builtPreds}\n${_space}}`;
    }

    const { with: w, opts, cascade, page, filter, order } = withFrag;
    const builtPreds = this.buildPreds(w, relations, usedVars, space + 1);

    const relationStr = forwardReverseType(
      typeName,
      predName,
      relation,
      opts?.alias,
      opts?.asVar
    );
    const directives = compileDirectives(
      { cascade, page, filter, order },
      usedVars
    );

    return `${_space}${relationStr} ${directives} {\n${builtPreds}\n${_space}}`;
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
  return new Type(typeName, preds);
}

export type TypeRecord = Record<string, Type | ExtendedType>;

// ! Working
// type FigureOut<t extends Type<string, PredicateRecord>> = t['name'] extends string ? 'yes' : false;
// const t = new Type('waw', {});
// const _t: FigureOut<typeof t> = ''
// type FigureOut<t extends Type<string, PredicateRecord>> = {
//   [key in keyof t['pr']]: t['pr'][key]['opts']
// };
// const t = createType('waw', {
//   x: predicate({type: PredicateType.STRING, asArray: true})
// });
// const _t: FigureOut<typeof t> = {x: {}}

// ! Working for getting preds from extended types
// type FigureOut2<t extends ExtendedType> = t['extendedTypes'][number]['predicateRecord'] & t['predicateRecord'];
// const x = createType("waw", {
//   x: predicate({ type: PredicateType.STRING, asArray: true }),
// });
// const x2 = createType("waw", {
//   x2: predicate({ type: PredicateType.STRING, asArray: true }),
// });
// const y = createType("another", {
//   y: predicate({ type: PredicateType.STRING, asArray: true, nullable: true }),
// }).extends(x,x2);
// const z: FigureOut2<typeof y> = {};
