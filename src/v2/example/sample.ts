import { fragment } from "../fragment";
import { pred } from "../predicate";
import type { InferReturn } from "../types";
import { User } from "./user";

const userFrag = fragment(
  User,
  {
    uid: pred("id"),
    employeeCode: true,
    name: true,
    audits: {
      opts: pred("userAudits"),
      predicates: {
        user: {
          // name: true,
          predicates: {
            name: pred("userName"),
          },
        },
      },
    },
  },
  true
);

type SampleReturnType = InferReturn<typeof User, (typeof userFrag)["fragment"]>;
