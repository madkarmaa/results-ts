# Option and container composition

## Absence is explicit

Call `None()` to construct absence. Use `None<T>()` when an empty Option needs a type for later operations. `Some(null)` and `Some(undefined)` are present values. Constructors do not convert nullish input to None.

```typescript
import { None, Some, type Option } from 'results-ts';

const fromNullable = <T>(value: T | null | undefined): Option<T> =>
    value === null || value === undefined ? None<T>() : Some(value);

const label = fromNullable('  Ada  ')
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .unwrapOr('anonymous');
// label is 'Ada'. Falsy values such as 0 and false are still present.
```

`fromNullable` above is a local adapter, not a results-ts export. Use an existing project adapter if available.

Turn absence into a domain error with `okOr` or `okOrElse`. The latter computes its error only for None. `okOrElseAsync` returns AsyncResult when error construction needs async work.

For an async Option-producing API, return `AsyncOption<T>` directly so callers can chain before awaiting:

```typescript
import { None, Some, type AsyncOption } from 'results-ts';

const normalizeName = (input: string): AsyncOption<string> =>
    Some(input)
        .mapAsync(async (value) => value.trim())
        .andThen((value) => (value.length > 0 ? Some(value) : None<string>()));

const displayName = await normalizeName('  Ada  ')
    .map((value) => value.toUpperCase())
    .unwrapOr('anonymous');
// displayName is 'ADA'.
```

## Mutation and aliases

These synchronous Option methods mutate the receiver:

| Method                          | Effect                                   | Return                                  |
| ------------------------------- | ---------------------------------------- | --------------------------------------- |
| `insert(value)`                 | Replace with Some                        | New payload                             |
| `getOrInsert(value)`            | Insert only on None                      | Current payload                         |
| `getOrInsertWith(factory)`      | Compute and insert only on None          | Current payload                         |
| `getOrInsertWithAsync(factory)` | Await and insert on None                 | Promise of payload                      |
| `take()`                        | Remove the value                         | Previous Option                         |
| `takeIf(predicate)`             | Remove if present and predicate succeeds | Removed value as Option, otherwise None |
| `replace(value)`                | Replace with Some                        | Previous Option                         |

Aliases to the same Option observe these mutations. `const` prevents reassignment of a variable; it does not prevent Option mutation. Result transformations may return the original container, and payload objects are not deep-cloned. Do not infer copying from a transformation call.

```typescript
import { None } from 'results-ts';

const cached = None<number>();
const initial = cached.getOrInsertWith(() => 42); // 42, cached is Some(42).
const removed = cached.take(); // Some(42), cached is now None.
const fallback = cached.unwrapOr(0); // 0.
```

AsyncOption omits the mutation methods listed above. Await it to obtain an Option if mutation is required. A synchronous Option's `getOrInsertWithAsync` shares a pending factory among concurrent calls. Avoid overlapping mutation unless the project's tests cover the intended ordering.

## Nesting and tuples

Use `andThen` to avoid introducing nesting. Use `flatten()` to remove one existing layer, only on `Result<Result<T, F>, E>` or `Option<Option<T>>`. Result flattening preserves `E | F`. `transpose()` swaps Result and Option nesting:

| Input                  | Output                 |
| ---------------------- | ---------------------- |
| `Option<Result<T, E>>` | `Result<Option<T>, E>` |
| `Some(Ok(value))`      | `Ok(Some(value))`      |
| `Some(Err(error))`     | `Err(error)`           |
| `None`                 | `Ok(None)`             |
| `Result<Option<T>, E>` | `Option<Result<T, E>>` |
| `Ok(Some(value))`      | `Some(Ok(value))`      |
| `Ok(None)`             | `None`                 |
| `Err(error)`           | `Some(Err(error))`     |

Do not cast a non-nested container to call these methods. Invalid inner values can throw at runtime.

`Option.zip(other)` produces Some of a tuple only when both values are present. `unzip()` requires an Option of a two-element tuple and returns two Options. Use explicit tuple typing when array inference would lose the tuple shape.

```typescript
import { None, Some, type Option, type Result } from 'results-ts';

const combined = Some(1).zip(Some('Ada')); // Option<[number, string]>.
const parts = combined.unzip(); // [Option<number>, Option<string>].
const absent: Option<Result<number, string>> = None();
const transposed: Result<Option<number>, string> = absent.transpose();
// transposed is Ok(None), so an optional missing value is not an error.
```

Read the Option API section in the [official LLM documentation bundle](https://results-ts.madkarma.top/llms.txt) for signatures and behavior, especially fallback types and mutation. Verify signatures against the installed declarations.
