import { fragment, type InferReturn } from "../fragment";
import { pass, pred, type ExtendedPredicates } from "../predicate";
import { query } from "../query";
import { User } from "./user";

const userFrag = fragment(
  User,
  {
    uid: pred("id"),
    employeeCode: true,
    name: true,
    password: pass("$pass1"),
    audits: {
      opts: pred("userAudits"),
      predicates: {
        user: {
          predicates: {
            name: pred("userName"),
          },
        },
      },
    },
  },
  true
);

console.log(userFrag.fragmentStr);

type UserFrag = ExtendedPredicates<typeof User>;
type SampleReturnType = InferReturn<typeof User, (typeof userFrag)["fragment"]>;

const userQuery = {
  user: query({
    mainFunc: { field: "", op: "eq", value: "" },
    fragOpts: userFrag,
  }),
};
