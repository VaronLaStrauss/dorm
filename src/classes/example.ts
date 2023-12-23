import { PredicateType } from "../utils/pred-type";
import { predicate } from "./predicate";
import { forward, relations, reverse } from "./relations";
import { schema } from "./schema";
import { createType } from "./type";

const Employee = createType("Employee", {
  name: predicate({ type: PredicateType.STRING }),
  branch: predicate({ type: PredicateType.UID }),
});

const User = createType("User", {
  email: predicate({ type: PredicateType.STRING }),
  audits: predicate({ type: PredicateType.UID, asArray: true }),
}).extends(Employee);

const Branch = createType("Branch", {
  name: predicate({ type: PredicateType.STRING }),
});

const Audit = createType("Audit", {
  user: predicate({ type: PredicateType.UID }),
  date: predicate({ type: PredicateType.DATETIME, asArray: true }),
});

const UserRel = relations(User, {
  audits: reverse(Audit, "user"),
  branch: forward(Branch),
});

const AuditRel = relations(Audit, {
  user: forward(User),
});

const _schema = schema(
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

const tryRet = _schema.fragment("Audit", {
  user: {
    with: {
      branch: {
        with: {
          name: true,
        },
      },
    },
  },
});

const x = tryRet.user.branch.name;
