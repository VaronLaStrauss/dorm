import { Static } from "elysia";
import { filterValueReqSchema } from "../query-schema";
import { allowedFilter } from "../query-schema/filter-op";
import { PredicateType } from "../utils/pred-type";
import { predicate } from "./predicate";
import { forward, relations, reverse } from "./relations";
import { schema } from "./schema";
import { createType } from "./type";

const Human = createType("Human", {
  name: predicate({
    type: PredicateType.STRING,
    indexes: ["hash"],
  }),
});

const Employee = createType("Employee", {
  branch: predicate({ type: PredicateType.UID }),
}).extends(Human);

const User = createType("User", {
  email: predicate({ type: PredicateType.STRING }),
  audits: predicate({ type: PredicateType.UID, asArray: true }),
}).extends(Employee);

const Branch = createType("Branch", {
  name: predicate({ type: PredicateType.STRING }),
});

const Audit = createType("Audit", {
  user: predicate({ type: PredicateType.UID }),
  date: predicate({ type: PredicateType.DATETIME, indexes: ["hour"] }),
});

const UserRel = relations(User, {
  audits: reverse(Audit, "user"),
  branch: forward(Branch),
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
  }
);

const tryRet = db.fragment("Audit", {
  user: {
    with: {
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
              values: ["ABC"],
            },
            {
              op: "eq",
              field: "Branch.name",
              values: ["ABC"],
            },
          ],
          connector: "and",
        },
      },
      // audits: true,
      name: true,
      audits: {
        with: {
          date: true,
        },
      },
    },
  },
  date: true,
});

console.log(tryRet.fragment);
console.log(tryRet.usedVars);

// const userFilter = allowedFilter(User, "name", 'waw');
// const employeeFilter = allowedFilter(Employee, "name", 'waw');
// const dateFilter = allowedFilter(Audit, "date", "waw");

// const y = filterValueReqSchema([dateFilter]);
// type Y = Static<typeof y>;
