---
name: results-ts
description: Write and review TypeScript code using the results-ts package. Use when working with results-ts imports, Result and Option pipelines, AsyncResult and AsyncOption chains, or adapting exceptions with catchUnwind. Covers typed errors, lazy recovery, and library-specific pitfalls.
license: MIT
---

# Use results-ts

Use this skill for the `results-ts` package. Check the consuming project's installed version and declarations before using a method. The examples follow this repository's v4 APIs; installed declarations take precedence if the project uses another version. Preserve the project's existing error model and limit adoption to the requested code.

Install with `bun add results-ts` if needed, or use the project's established package manager. Import values and types from `results-ts`; implementation classes and error classes are private.

Return `AsyncResult<T, E>` or `AsyncOption<T>` from async APIs that produce containers. Keep functions returning these chainable wrappers free of the `async` keyword; return a wrapper created by an async method or exception adapter. Use native promises of containers only when interoperating with an existing dependency.

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

Return Result directly for expected failures. Prefer discriminated error unions at application boundaries; narrow unknown input rather than asserting a domain type. Avoid `any` and casts that conceal mismatched success or error types.

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
- Callback exceptions propagate. Ordinary chains do not convert throws or promise rejections to Err. Adapt throwing dependencies with `catchUnwind` or `catchUnwindAsync` at their boundary.
- `AsyncResult` and `AsyncOption` are exported types, not constructors. Create wrappers through async methods or `catchUnwindAsync`.
- Option has mutating methods. Do not assume every container operation is immutable.

## Read details for the task

- For async chains, Promise interop, or exception adapters, read [async and exceptions](references/async-and-exceptions.md).
- For nullish input, Option mutation, nested containers, or tuples, read [Option and composition](references/option-and-composition.md).

Consult the [official guides and API reference](https://results-ts.madkarma.top/) for methods outside these examples. If working in the library repository, verify against `src/index.ts`, `src/result.ts`, `src/option.ts`, `src/async-result.ts`, and `src/async-option.ts`. These source paths are not expected in consuming projects.

Validate changed code with the consuming project's typecheck and focused tests. Cover both variants and, for async code, the difference between an Err value and a rejected operation.
