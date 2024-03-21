import { fragment, multi } from "../fragment";
import { mutate } from "../mutation";
import { count, pass, pred } from "../predicate";
import { query } from "../query";
import { queryBlock } from "../query-block";
import { recurse, recurseFragment } from "../recurse";
import { schema } from "../schema";
import { filterablePreds } from "../utils/filter";
import { Audit } from "./audit";
import { Content } from "./contact";
import { Employee, Human, User } from "./user";

console.log("\n---- FRAGMENT -----\n");

const auditFrag = fragment(Audit, {
  content: {
    predicates: {
      uid: true,
      detail: true,
    },
  },
});

const userCommonFrag = fragment(User, {
  name: true,
  active: true,
  audits3: {
    page: {
      after: "0x12",
      limit: 10,
    },
    predicates: {
      uid: true,
    },
  },
});

const userFrag = fragment(
  User,
  {
    dExtend: userCommonFrag,
    uid: [pred("id"), count("uidCount")],
    employeeCode: [pred("employeeCodeAlias1"), pred("employeeCodeAlias2")],
    password: [pass("$pass1", "passCheck"), pass("$pass2", "passwordRecheck")],
    audits: multi(
      Audit,
      {
        opts: pred("otherAudits"),
        predicates: {
          dExtend: auditFrag,
          uid: true,
        },
      },
      {
        opts: pred("x"),
        predicates: { auditDate: true, dExtend: auditFrag },
      }
    ),
  },
  {
    allowedValues: new Set(["varFromOtherQuery", "$customVar", "$off", "$lim"]),
  }
);

console.log(userFrag.fragmentStr);

type InferUser = typeof userFrag.type;

console.log("\n---- RECURSE -----\n");

const userRecurseFrag = recurseFragment(User, [Audit, Content], {
  audits: [
    { opts: pred("history") },
    { opts: pred("historicalData") },
    count("auditCount"),
  ],
  employeeCode: [pred("code1"), pred("code2")],
  name: [pred(undefined, "existingAsVar"), pred("uid2", "varFromOtherQuery")],
  user: [count(), count("userAuditCount"), { opts: pred("userAudits") }],
  content: true,
  detail: true,
  uid: true,
});

console.log(userRecurseFrag.fragmentStr);

type InferUserRecurse = typeof userRecurseFrag.type;

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
    fragOpts: userRecurseFrag,
  }),
  user2: query({
    mainFunc: {
      op: "eq",
      field: "Employee.audits",
      value: 5,
      wrap: "count",
    },
    fragOpts: userFrag,
  }),
});

type UserQueries = typeof queries.type;

console.log(queries.query);

console.log("\n----- MUTATION -----\n");

const mut = mutate(User, {
  password: "waw",
  audits: [{ content: { detail: "waw" } }],
  active: 1,
});

console.log(JSON.stringify(mut, undefined, 2));

console.log("\n----- FILTERABLES -----\n");

const filterables = filterablePreds(User, {
  name: { label: "waw" },
  audits: { label: "x" },
});
console.log(JSON.stringify(filterables, undefined, 2));

console.log("\n----- SCHEMA -----\n");

const schemaStr = schema(Human, Employee, User, Audit, Content);
console.log(schemaStr);

console.log("\n----- OPTS CHANGE -----\n");
const commonFrag = fragment(Human, {
  uid: true,
  dtype: true,
});

const commonQ = query({
  mainFunc: { op: "type", value: "SomeNonExistentType" },
  fragOpts: commonFrag,
  append: { allowedValues: new Set(["SomeNonExistentType"]) },
});

const commonQBlock = queryBlock({ commonQ });
