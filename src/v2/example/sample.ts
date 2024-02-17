import { fragment, type InferFragment } from "../fragment";
import { mutate } from "../mutation";
import { pass, pred } from "../predicate";
import { queryBlock, query } from "../query";
import {
  recurseFragment,
  type InferRecurseFragment,
  recurse,
} from "../recurse";
import { Audit } from "./audit";
import { Content } from "./contact";
import { User } from "./user";

console.log("\n---- FRAGMENT -----\n");

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
            name: pred("userName", "varFromOtherQuery"),
          },
        },
      },
    },
  },
  true
);

console.log(userFrag.fragmentStr);

type InferUser = InferFragment<typeof User, (typeof userFrag)["fragment"]>;

console.log("\n---- RECURSE -----\n");

const userRecurseFrag = recurseFragment(
  User,
  [Audit, Content],
  {
    audits: { opts: pred("history") },
    employeeCode: true,
    name: pred(undefined, "existingAsVar"),
    user: true,
    content: true,
    detail: true,
  },
  true
);

console.log(userRecurseFrag.fragmentStr);

type InferUserRecurse = InferRecurseFragment<
  typeof User,
  [typeof Audit, typeof User],
  (typeof userRecurseFrag)["fragment"]
>;

console.log("\n---- QUERY -----\n");

const queries = queryBlock({
  user: query({
    mainFunc: {
      field: "Human.name",
      op: "eq",
      value: "Some variable that doesn't exist",
    },
    fragOpts: userFrag,
  }),
  userRecurse: recurse({
    mainFunc: { field: "Human.name", op: "eq", value: "existingAsVar" },
    filter: { field: "Human.name", op: "eq", value: "varFromOtherQuery" },
    fragOpts: userRecurseFrag,
  }),
});

console.log(queries.query);

console.log("\n----- MUTATION -----");

const mut = mutate(User, {
  password: "waw",
  audits: [{ content: { detail: "waw" } }],
});

console.log(JSON.stringify(mut, undefined, 4));
