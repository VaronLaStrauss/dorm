import { PredicateType } from "../utils/pred-type";
import { fromValues, passwordOpts, predicate } from "./predicate";
import { forward, relations, reverse } from "./relations";
import { schema } from "./schema";
import { createType } from "./type";

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
  branch: predicate({ type: PredicateType.UID }),
}).extends(Human);

const User = createType("User", {
  email: predicate({ type: PredicateType.STRING }),
  password: predicate({ type: PredicateType.PASSWORD }),
  audits: predicate({ type: PredicateType.UID, asArray: true }),
}).extends(Employee);

const Branch = createType("Branch", {
  name: predicate({ type: PredicateType.STRING }),
});

const Audit = createType("Audit", {
  user: predicate({ type: PredicateType.UID }),
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

// console.log(frag.execute().user.audits);

const mut = db.prepareMutation("User", {
  activeType: "active",
  audits: [
    {
      date: "",
      types: "",
      user: undefined as never,
    },
  ],
  branch: {
    uid: "0x121",
  },
  email: "waw",
  password: "aw",
  types: [],
});

console.log(JSON.stringify(mut));

const q = db.query({
  x: {
    fragment: frag.append({ date: true }),
    mainFunc: { op: "type", value: "Audit" },
  },
});
console.log(await q.execute(undefined as never, { $pass1: "waw" }));

console.log(db.build());

// const userFilter = allowedFilter(User, "name", 'waw');
// const employeeFilter = allowedFilter(Employee, "name", 'waw');
// const dateFilter = allowedFilter(Audit, "date", "waw");

// const y = filterValueReqSchema([dateFilter]);
// type Y = Static<typeof y>;
