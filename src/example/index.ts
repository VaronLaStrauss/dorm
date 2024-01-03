import { none } from "..";
import { PredicateType } from "../utils/pred-type";
import {
  fromValues,
  passwordOpts,
  predOpts,
  predicate,
} from "../classes/predicate";
import { forward, relations, reverse } from "../classes/relations";
import { schema } from "../classes/schema";
import { createType } from "../classes/type";

const Human = createType("Human", {
  name: predicate({
    type: PredicateType.STRING,
    indexes: ["hash"],
    nullable: true,
  }),
  activeType: predicate({
    type: PredicateType.STRING,
    fromValues: fromValues("active", "inactive"),
  }),
});

const Employee = createType("Employee", {
  branch: predicate({ type: PredicateType.NODE }),
}).extends(Human);

const User = createType("User", {
  email: predicate({ type: PredicateType.STRING }),
  password: predicate({ type: PredicateType.PASSWORD }),
  audits: predicate({ type: PredicateType.NODE, asArray: true }),
}).extends(Employee);

const Branch = createType("Branch", {
  name: predicate({ type: PredicateType.STRING }),
});

const Audit = createType("Audit", {
  user: predicate({ type: PredicateType.NODE }),
  date: predicate({ type: PredicateType.DATETIME, indexes: ["hour"] }),
});

const EmployeRel = relations(Employee, {
  branch: forward(Branch),
});

const UserRel = relations(User, {
  audits: reverse(Audit, "user"),
  ...EmployeRel.relations,
});

const AuditRel = relations(Audit, {
  user: forward(User),
});

const PsgcType = fromValues(
  "region",
  "province",
  "district",
  "municipality",
  "sub-municipality",
  "city",
  "city-municipality",
  "barangay"
);

const Psgc = createType("Psgc", {
  code: predicate({ type: PredicateType.STRING }),
  parent: predicate({ type: PredicateType.NODE }),
  children: predicate({ type: PredicateType.NODE, asArray: true }),
  name: predicate({ type: PredicateType.STRING }),
  placeType: predicate({
    type: PredicateType.STRING,
    fromValues: PsgcType,
  }),
});

export const PsgcRel = relations(Psgc, {
  children: reverse(Psgc, "parent"),
  parent: forward(Psgc),
});

const db = schema(
  {
    User,
    Audit,
    Employee,
    Branch,
    Psgc,
  },
  {
    User: UserRel,
    Audit: AuditRel,
    Employee: EmployeRel,
    Psgc: PsgcRel,
  }
);

const frag = db.fragment("Audit", {
  user: {
    with: {
      password: passwordOpts("$pass1"),
      activeType: predOpts(undefined, "waw"),
      uid: true,
      dtype: true,
      branch: {
        with: {
          name: true,
        },
        cascade: true,
        filter: {
          values: [
            {
              op: "eq",
              field: "Branch.name",
              value: "waw",
            },
            {
              op: "eq",
              field: "Branch.name",
              value: "ABC",
            },
          ],
          connector: "and",
        },
      },
      name: true,
      // audits: true,
      // name: true,
      audits: true,
    },
  },
});

// console.log(frag.execute().user.branch.);
console.log(frag.fragment);

const mut = db.mutate("User", {
  activeType: "active",
  audits: [
    {
      date: "",
      user: none(),
      type: ["waw"],
      // uid: ''
    },
  ],
  // audits: none(),
  branch: {
    uid: "0x121",
  },
  email: "waw",
  password: "aw",
  type: [],
  // uid: "",
  // name: "wa",
  // uid: 'waw'
});

console.log(JSON.stringify(mut));

console.log(170, frag.append({ date: true }).allowedValues);
const q = db.query({
  x: {
    fragment: frag.append({ date: true }),
    mainFunc: { op: "uid", value: "waw" },
  },
});
console.log(q.build({}).query);

// console.log(await q.execute(undefined as never, { $pass1: "waw" }));

// console.log(db.build());

// const userFilter = allowedFilter(User, "name", 'waw');
// const employeeFilter = allowedFilter(Employee, "name", 'waw');
// const dateFilter = allowedFilter(Audit, "date", "waw");

// const y = filterValueReqSchema([dateFilter]);
// type Y = Static<typeof y>;

// const PsgcRootFrag = db.fragment(
//   "Psgc",
//   {
//     code: true,
//     name: true,
//     placeType: true,
//     uid: true,
//     parent: {},
//   },
//   true
// );

// console.log(
//   db
//     .query({
//       x: {
//         fragment: PsgcRootFrag,
//         recurse: true,
//         mainFunc: { op: "type", value: "Psgc" },
//       },
//     })
//     .build("x").query
// );
