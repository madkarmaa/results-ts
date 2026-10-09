# Async chains and exception boundaries

## Choose the callback and return type

| Callback returns                                        | Use            | Result                          |
| ------------------------------------------------------- | -------------- | ------------------------------- |
| `U`                                                     | `map`          | Result or Option of U           |
| `Result<U, F>` or `Option<U>`                           | `andThen`      | A flat container                |
| `PromiseLike<U>`                                        | `mapAsync`     | AsyncResult or AsyncOption of U |
| `PromiseLike<Result<U, F>>` or `PromiseLike<Option<U>>` | `andThenAsync` | A flat async wrapper            |

Use the async variants even on an existing async wrapper when the callback is asynchronous. Do not rely on `map(async ...)` to await a callback payload. Async predicates use `filterAsync` on Option; async effects use `inspectAsync` and, for Result errors, `inspectErrAsync`.

Expose `AsyncResult<T, E>` and `AsyncOption<T>` as return types for container-producing async functions so callers can chain before awaiting. Return a wrapper directly from an ordinary function. An `async` function returns a native Promise and loses the wrapper's chainable methods. The promise-like callback contracts above accept AsyncResult and AsyncOption too.

Awaiting `AsyncResult<T, E>` yields `Result<T, E>`. Awaiting `AsyncOption<T>` yields `Option<T>`. Transforming methods keep the chainable wrapper. Extraction and branching methods such as `match`, `unwrapOr`, and `isOk` return native promises and must be awaited. An async predicate result does not narrow a container; await the container first when synchronous narrowing is needed.

```typescript
import { Err, Ok, type AsyncResult, type Result } from 'results-ts';

type User = { readonly id: number; readonly name: string };
type LoadError = { readonly code: 'NOT_FOUND'; readonly id: number };

const loadUser = (id: number): AsyncResult<User, LoadError> =>
    Ok(id).andThenAsync(async (value) => {
        const result: Result<User, LoadError> =
            value === 1
                ? Ok({ id: value, name: 'Ada' })
                : Err({ code: 'NOT_FOUND', id: value });
        return result;
    });

const name = await Ok(1)
    .andThenAsync(loadUser)
    .map((user) => user.name)
    .match({
        Ok: (value) => value,
        Err: (error) => `Missing user ${error.id}`
    });
// name is 'Ada'.
```

When interoperating with an existing `Promise<Result<T, E>>` or `Promise<Option<T>>`, await it before chaining or call its producer through `andThenAsync`. Prefer wrapper return types for new application APIs. AsyncResult and AsyncOption implement `PromiseLike`; do not assume native `.catch` or `.finally` methods exist. Use `await` with `try`/`catch`, or `Promise.resolve(wrapper)` when a native Promise is needed.

When a chaining callback returns multiple Result error variants and inference selects only one, annotate its Result return type or provide the method's success and error generics. For example, use `andThenAsync<User, LoadError>` when those are the callback's output types. Preserve the full error union rather than casting branches.

## Reserve exception adapters for unavoidable external failures

Avoid `catchUnwind` and `catchUnwindAsync`. Use one only when an external operation actually throws or rejects, its failure behavior is outside the project's control, and no suitable nonthrowing or Result-returning API is available. Fixed Node APIs are an example of this exception.

For code the project controls, return Result or AsyncResult with explicit Ok and Err variants. Handle HTTP status failures and invalid input with Err directly. Never throw to feed an exception adapter, wrap ordinary application pipelines in one, or use one merely to obtain an AsyncResult.

This follows [Rust's recommendation](https://doc.rust-lang.org/std/panic/fn.catch_unwind.html) to use Result for regular failures rather than catch_unwind as a general try/catch mechanism.

When an external operation meets these conditions, wrap only the unavoidable throwing operation. Perform application validation and other expected-failure handling outside that adapter.

`catchUnwind(fn, onThrow?)` returns a callable function. Calling it returns Result. `catchUnwindAsync(fn, onThrow?)` also returns a callable function; calling it returns AsyncResult and captures both synchronous throws and rejections.

Without `onThrow`, the error type is `unknown`. With it, the returned value becomes the error payload. The handler receives `(thrown, ...originalArgs)`. Normalize errors synchronously; exceptions from the handler itself still throw or reject.

Keep `JSON.parse` and `response.json()` results typed as `unknown` until runtime validation succeeds. Their permissive built-in declarations do not validate a domain type. Give parsing adapters an explicit `unknown` or `Promise<unknown>` return type.

## Rejections and operand evaluation

An Err is a resolved failure value. A thrown callback, rejected operand, or failed `unwrap` is still an exception or rejection. `mapErr`, `orElse`, and an Err `match` handler only handle contained errors. They do not catch rejections introduced elsewhere in a chain.

`Result.and` and `Result.or` accept promise-like operands and return AsyncResult for them. Option's `and`, `or`, `xor`, and `zip` similarly return AsyncOption for promise-like operands. These operands are resolved even when their values are unused, and their rejections propagate. On async wrappers the receiver and async operand resolve concurrently. Use `andThenAsync` or `orElseAsync` when starting the operation must depend on the receiver's variant.

Read the async and error-handling sections in the [official LLM documentation bundle](https://results-ts.madkarma.top/llms.txt) for additional context. Check installed declarations for available overloads.
