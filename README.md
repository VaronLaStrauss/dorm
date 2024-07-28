# DORM (Dgraph Object Relational Mapper)

... sorta

DORM is a functional mapper that takes inspiration from [DrizzleORM](https://orm.drizzle.team/). This library does the following:

1. [Create fragments (and reuse them in fragments)](#creating-fragments)
1. [Resolve types based on fragment](#resolving-fragment-types)
1. [Querying](#query)
1. [Generate schema types](#generating-schema-types)
1. [Generating JSON Mutations](#json-mutations)

A complete example can be found in [the sample folder](./example/sample.ts).

## WARNING BEFORE USE

**THIS LIBRARY IS NOT TESTED**. Use at your own risk.

Some features in Dgraph are not implemented and currently, there are no plans in implementing them, such as:

1.Facets

### Known Bugs

1. For TS versions `>=5.4.0`, types would generate TS(2589) error. This library only works for version `<=5.3.0` and `>=5.0.0`.
1. `reverse` nodes are not automagically typed as `Array<T>`. Please set the `asArray` property to true if you're using `reverse`.

## Example

### Creating Nodes

A node in this context is a type that contains information. It is synonymous to a table in RDBMS.

```typescript
import { node, edge, EdgeType } from "dorm";

export const Human = node("Human", {
  name: edge({
    type: EdgeType.STRING,
    nullable: true,
    asArray: true,
    indexes: ["hash"],
  }),
  friends: () => predicateNode(Human, forward(), { asArray: true }),
});
```

The output of `node` is a type that contains information necessary to generate type inference when creating a `fragment` and `schema` generation. Allowed values are automatically generated for schema types after the node is created to prevent DQL injection. The allowed value in queries are represented as `{nodeName}.{predicates}`. For the above example, the allowed values include `Human.name`.

#### Extending Nodes

Nodes can also easily be extended:

```typescript
const User = node("User", {
  password: edge({ type: EdgeType.PASSWORD }),
  // asArray needs to be manually set to true
  posts: () => predicateNode(Post, reverse("human"), { asArray: true }),
}).extends(() => [Human]);
```

This would extend properties of `Human` into `User`.

### Creating Fragments

To create a fragment, we use the `fragment` function like so:

```typescript
import { fragment } from "dorm";

const humanFrag = fragment(Human, {
  name: true,
});
```

#### Extending Fragments

Fragments can also be extended like so:

```typescript
import { fragment } from "dorm";

const humanFrag2 = fragment(Human, {
  dExtend: humanFrag,
  uid: true,
});
```

Extended nodes can also be extended with parent nodes, such as:

```typescript
import { fragment } from "dorm";

const userFrag = fragment(User, {
  dExtend: humanFrag,
  uid: true,
  password: true,
});
```

#### Resolving Fragment Types

Types could be extracted from the fragment like so:

```typescript
type FragmentResultType = typeof humanFrag.type;
// Resolves to:
// type FragmentResultType = {
//     name?: string[] | null | undefined;
// };

type FragmentResultType2 = typeof humanFrag2.type;
// Resolves to:
// type FragmentResultType = {
//     name?: string[] | null | undefined;
//     uid: string;
// };
```

### Query

To use it in a query, we use the `query` function like so:

```typescript
import { query } from "dorm";

const humanQuery = query({
  mainFunc: {
    field: "Human.name",
    op: "eq",
    value: "Juan dela Cruz",
  },
  fragOpts: humanFrag,
});

// Get actual query string
const queryString = humanQuery.string;

type QueryResultTypes = typeof humanQuery.type;
// Resolves to:
// type QueryResultTypes = {
//     name?: string[] | null | undefined;
// }[];
```

This fragment is automatically converted into a string variable in build time. If you want to offset the conversion to string, offset the `buildNow` argument to `false` like so:

```typescript
import { fragment } from "dorm";

const humanFrag = fragment(
  Human,
  {
    name: true,
  },
  { allowedValues: new Set() },
  false
);
```

If you need to add some fields that are not within the fragment, you could add it the `allowedValues` property of the second argument:

```typescript
{
  allowedValues: new Set(["Human.nonExistingPredicate"]);
}
```

This could then be used in the `mainFunc` of the query without raising an error like so:

```typescript
import { query } from "dorm";

query({
  mainFunc: {
    field: "Human.nonExistingPredicate",
    op: "eq",
    value: "Juan dela Cruz",
  },
  fragOpts: humanFrag,
});
```

#### As Var

Complex queries can also be accomplished with an approach that uses query variables. However, due to the limitations of DQL injection protection used in the query builder, it's nearly impossible to use string values in the `mainFunc`. We can get around this using `pred` which creates For example, we would like to get all friends of "Juan dela Cruz" as a flat list. We could do it the following way:

```typescript
import { pred, fragment, queryBlock, query } from "dorm";

const uidPred = pred(undefined, "juanToFriends");
const onlyJuanFrag = fragment(Human, {
  friends: {
    predicates: {
      uid: uidPred,
    },
  },
});
const friendsOfJuanFrag = fragment(Human, {
  uid: true,
  name: true,
});
const juanQuery = queryBlock({
  filtered: query({
    mainFunc: { field: "Human.name", op: "eq", value: "Juan dela Cruz" },
    fragOpts: onlyJuanFrag,
    append: { allowedValues: uidPred },
  }),
  onlyJuan: query({
    mainFunc: { op: "uid", value: uidPred.asVar },
    fragOpts: friendsOfJuanFrag,
    append: { allowedValues: uidPred }, // Appends uidPred as an allowed field to be used in filtering
  }),
});

const queryStr = juanQuery.query;
```

#### Querying Password

Because of the limitations of the approach to DQL injection protection, we have to use a separate `pass` function to create an input variable manually:

```typescript
import { fragment, pass, query, queryBlock } from "dorm";

const passwordVar = pass("$pass0");
const loginFrag = fragment(User, {
  uid: true,
  password: passwordVar,
});

queryBlock(
  {
    user: query({
      fragOpts: loginFrag,
      mainFunc: { field: "User.email", op: "eq", value: "some@email.com" },
    }),
  },
  { [passwordVar.pwdVar]: "a password here" }
);
```

### Generating Schema Types

Generating schema is a straightforward task:

```typescript
const schemaStr = schema(Human, User); // Order matters!
console.log(schemaStr);
```

When inputting into the `schema` function, make sure that parent nodes come first before their children. In this case, `Human` goes first before `User`.

### JSON Mutations

Mutations can also be created with this library. These are also type-safe based on the nodes we put into the `mutate` function:

```typescript
const mut = mutate(Human, {
  name: "Juan dela Cruz",
  friends: [
    {
      name: "Juana dela Cruz",
    },
  ],
});
```

There are known limitations in Dgraph versions `<=23.0.0` when it comes to mutating on `@reverse` nodes. If need be, create multiple mutations to fix this and use a `uid` variable in the query:

```typescript
const humanUidVar = "_:human1";

const mut1 = mutate(Human, {
  name: "Juan dela Cruz",
  uid: humanUidVar,
  // posts cannot be added here
});

const mut2 = mutate(Post, {
  msg: "Some message here",
  user: humanUidVar,
});
```

**Known bug? feature?**: Nested mutations are expensive to infer, which is why `forward` and `reverse` functions have different implementations for `mutation`. When `forward` is used for a `predicateNode`, the field is type-safe (and can be inferred). If it uses a `reverse`, it would be typed as `never`.
