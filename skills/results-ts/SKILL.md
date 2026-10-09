---
name: results-ts
description: Write and review TypeScript code using the results-ts package. Use when working with results-ts imports, Result and Option pipelines, or AsyncResult and AsyncOption chains. Covers typed errors, lazy recovery, and library-specific pitfalls.
license: MIT
---

# Use results-ts

Use this skill for the `results-ts` package. Check the consuming project's installed version and declarations before using a method. The examples follow this repository's v4 APIs; installed declarations take precedence if the project uses another version. Preserve the project's existing error model and limit adoption to the requested code.

Install with `bun add results-ts` if needed, or use the project's established package manager. Import values and types from `results-ts`; implementation classes and error classes are private.

Return `AsyncResult<T, E>` or `AsyncOption<T>` from async APIs that produce containers. Keep functions returning these chainable wrappers free of the `async` keyword; return a wrapper created by an async method. Use native promises of containers only when interoperating with an existing dependency.

## Choose the operation

| Intent                                         | Use                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| Return a value or a recoverable error          | `Ok(value)` / `Err(error)`, typed as `Result<T, E>`                  |
| Represent presence or absence without an error | `Some(value)` / `None<T>()`, typed as `Option<T>`                    |
| Transform a success or present value           | `map`                                                                |
| Chain a function returning a Result or Option  | `andThen`                                                            |
| Transform a Result error                       | `mapErr`                                                             |
| Recover with another Result or Option          | `orElse`                                                             |
| Handle both variants at a boundary             | `match({ Ok, Err })` / `match({ Some, None })`                       |
| Compute a fallback only when needed            | `unwrapOrElse` / `mapOrElse`                                         |
| Observe without replacing the value            | `inspect` / `inspectErr` for Result errors                           |
| Convert absence to an error                    | `okOr(error)` / `okOrElse(() => error)`                              |
| Convert a Result to an Option                  | `ok()` for success / `err()` for error, discarding the other variant |

`map` wraps its callback's return value. Use `andThen` when the callback already returns a container, or the result will be nested. Result chaining preserves the union of error types. `orElse` replaces the error type with the recovery function's error type.

## Keep failures typed

Return Result or AsyncResult directly for expected failures. Code you control must return Err for recoverable failures. Do not throw an error just to capture it in a container. Prefer discriminated error unions at application boundaries; narrow unknown input rather than asserting a domain type. Avoid `any` and casts that conceal mismatched success or error types.

Avoid `catchUnwind` and `catchUnwindAsync` unless a dependency throws or rejects and its failure behavior cannot be changed, such as a fixed Node API. They are a last resort for that external boundary. Do not use them for routine failures, general try/catch, or constructing an AsyncResult. Prefer an existing nonthrowing or Result-returning API when available.

```typescript
import { Err, Ok, type Result } from 'results-ts';

type IdError = { readonly code: 'INVALID_ID'; readonly input: string };

const parseId = (input: string): Result<number, IdError> => {
    const id = Number(input);
    return Number.isSafeInteger(id) && id > 0
        ? Ok(id)
        : Err({ code: 'INVALID_ID', input });
};

const message = parseId('42')
    .map((id) => id + 1)
    .match({
        Ok: (id) => `ID: ${id}`,
        Err: (error) => `Invalid ID: ${error.input}`
    });
// message is 'ID: 43'.
```

Use `match` or fallbacks for recoverable outcomes. `unwrap` and `expect` throw on Err or None; `unwrapErr` and `expectErr` throw on Ok. Reserve them for proven invariants. There are no public `.value` or `.error` payload properties; use methods to access payloads.

## Avoid eager work and uncaught failures

- `and`, `or`, `unwrapOr`, `mapOr`, and `okOr` receive values that JavaScript evaluates before the call. Use callback-based alternatives when work should run only for the selected variant.
- Callback exceptions propagate. Ordinary chains do not convert throws or promise rejections to Err. Handle expected failures with explicit Err returns. Only introduce an exception adapter for an unavoidable external failure as described above.
- `AsyncResult` and `AsyncOption` are exported types, not constructors. Create wrappers through async methods.
- Option has mutating methods. Do not assume every container operation is immutable.

## Read details for the task

- For async chains, Promise interop, or unavoidable external exceptions, read [async and exceptions](references/async-and-exceptions.md).
- For nullish input, Option mutation, nested containers, or tuples, read [Option and composition](references/option-and-composition.md).

For online documentation, read the [official LLM documentation bundle](https://results-ts.madkarma.top/llms.txt) instead of the website's HTML. Use it for guides and API details beyond these examples, while checking signatures against the consuming project's installed declarations. If working in the library repository, verify against `src/index.ts`, `src/result.ts`, `src/option.ts`, `src/async-result.ts`, and `src/async-option.ts`. These source paths are not expected in consuming projects.

Validate changed code with the consuming project's typecheck and focused tests. Cover both variants and, for async code, the difference between an Err value and a rejected operation.
