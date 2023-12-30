import { none } from "..";
import { PredicateType } from "../utils/pred-type";
import { fromValues, passwordOpts, predicate } from "../classes/predicate";
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

const db = schema(
  {
    User,
    Audit,
    Employee,
    Branch,
  },
  {
    User: UserRel,
    Audit: AuditRel,
    Employee: EmployeRel,
  }
);

const frag = db.fragment("Audit", {
  user: {
    with: {
      password: passwordOpts("$pass1"),
      activeType: true,
      uid: true,
      type: true,
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
// console.log(frag.fragment);

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

const q = db.query({
  x: {
    fragment: frag.append({ date: true }),
    mainFunc: { op: "type", value: "Audit" },
  },
});
// console.log(await q.execute(undefined as never, { $pass1: "waw" }));

// console.log(db.build());

// const userFilter = allowedFilter(User, "name", 'waw');
// const employeeFilter = allowedFilter(Employee, "name", 'waw');
// const dateFilter = allowedFilter(Audit, "date", "waw");

// const y = filterValueReqSchema([dateFilter]);
// type Y = Static<typeof y>;