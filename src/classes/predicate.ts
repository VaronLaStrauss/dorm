import { PredicateInitOpts, spacing, PredicateType } from "..";

export function fromValues<T extends Readonly<string>>(...vals: T[]) {
  return vals;
}

export class Predicate<PIO extends PredicateInitOpts> {
  typeName = "";

  constructor(public options: PIO) {}

  buildStatic(predName: string, opts: PredOpts | boolean, space: number) {
    const _space = spacing(space);
    if (typeof opts === "boolean") {
      return `${_space}${predName}: ${this.options.type}`;
    }

    const { alias, asVar } = opts;
    const _asVar = asVar ? `${asVar} as` : "";
    return `${_space}${alias ?? predName}: ${_asVar} ${this.options.type}`;
  }

  build(
    predName: string,
    opts: PredOpts | PasswordOpts | boolean,
    usedVars: Map<string, unknown>,
    space: number
  ) {
    const _space = spacing(space);
    if (
      this.options.type === PredicateType.PASSWORD &&
      typeof opts === "object" &&
      "pwdVar" in opts
    ) {
      const { alias, asVar, pwdVar } = opts;
      if (!pwdVar.toLowerCase().startsWith("$pass"))
        throw new Error("Password vars must start with $pass");
      const checkPwd = `checkpwd(${this.typeName}.${predName}, ${pwdVar})`;
      usedVars.set(pwdVar, undefined);
      const _asVar = asVar ? `${asVar} as` : "";
      return `${_space}${alias ?? predName}: ${_asVar} ${checkPwd}`;
    }

    if (typeof opts === "boolean")
      return `${_space}${predName}: ${this.typeName}.${predName}`;

    const { alias, asVar } = opts;
    const _asVar = asVar ? `${asVar} as` : "";
    return `${_space}${alias ?? predName}: ${asVar} ${
      this.typeName
    }.${predName}`;
  }
}

export type PredicateRecord = Record<string, Predicate<PredicateInitOpts>>;

export function predicate<PredInitOpts extends PredicateInitOpts>(
  options: PredInitOpts
) {
  return new Predicate(options);
}

export function predOpts<
  alias extends string | undefined,
  asVar extends string | undefined
>(alias: alias = undefined as alias, asVar: asVar = undefined as asVar) {
  return { alias, asVar };
}

export type PredOpts = ReturnType<typeof predOpts>;

export function passwordOpts<
  pwdVar extends `$pass${string}`,
  alias extends string | undefined,
  asVar extends string | undefined
>(
  pwdVar: pwdVar,
  alias: alias = undefined as alias,
  asVar: asVar = undefined as asVar
) {
  return { pwdVar, alias, asVar };
}

export type PasswordOpts = ReturnType<typeof passwordOpts>;

// ! Working:
// type FigureOut<P extends Predicate<PredicateType, PredicateInitOpts>> = P['pt'] extends PredicateType.STRING ? 'waw' : boolean;
// const x = new Predicate(PredicateType.STRING, )
// const y: FigureOut<typeof x> = ''
// type FigureOut2<P extends Predicate< PredicateInitOpts>> = P['opts'] extends PredicateInitOpts ? P['opts']['asArray'] extends true ? 'yeeyyy' : false : never;
// const x = predicate({type: PredicateType.STRING, asArray: true});
// const y: FigureOut2<typeof x> = ''
