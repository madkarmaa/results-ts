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

## Capture exceptions at the dependency boundary

`catchUnwind(fn, onThrow?)` returns a callable function. Calling it returns Result. `catchUnwindAsync(fn, onThrow?)` also returns a callable function; calling it returns AsyncResult and captures both synchronous throws and rejections.

Without `onThrow`, the error type is `unknown`. With it, the returned value becomes the error payload. The handler receives `(thrown, ...originalArgs)`. Normalize errors synchronously; exceptions from the handler itself still throw or reject.

Keep `JSON.parse` and `response.json()` results typed as `unknown` until runtime validation succeeds. Their permissive built-in declarations do not validate a domain type. Give parsing adapters an explicit `unknown` or `Promise<unknown>` return type.

```typescript
import { catchUnwind, type Result } from 'results-ts';

type ParseError = { readonly code: 'INVALID_JSON'; readonly message: string };
const parseJson = (text: string): unknown => JSON.parse(text);
const safeParse = catchUnwind(parseJson, (thrown): ParseError => ({
    code: 'INVALID_JSON',
    message: thrown instanceof Error ? thrown.message : String(thrown)
}));

const result: Result<unknown, ParseError> = safeParse('{"id":1}');
// Parsing succeeds; validate the unknown payload before using it as a domain type.
```

```typescript
import { catchUnwindAsync, type AsyncResult } from 'results-ts';

type RequestError = {
    readonly code: 'REQUEST_FAILED';
    readonly url: string;
    readonly message: string;
};

const readJson = catchUnwindAsync(
    async (url: string): Promise<unknown> => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },
    (thrown, url): RequestError => ({
        code: 'REQUEST_FAILED',
        url,
        message: thrown instanceof Error ? thrown.message : String(thrown)
    })
);

const loadJson = (url: string): AsyncResult<unknown, RequestError> =>
    readJson(url);
// Call loadJson with the application's URL, then validate its unknown payload.
```

Do not wrap a function that already returns Result without accounting for nesting. `catchUnwind` wraps its return value in Ok. If adapting such a function is necessary, `flatten()` removes one Result layer and preserves both error types. The same applies to `catchUnwindAsync` and its async wrapper.

## Rejections and operand evaluation

An Err is a resolved failure value. A thrown callback, rejected operand, or failed `unwrap` is still an exception or rejection. `mapErr`, `orElse`, and an Err `match` handler only handle contained errors. They do not catch rejections introduced elsewhere in a chain.

`Result.and` and `Result.or` accept promise-like operands and return AsyncResult for them. Option's `and`, `or`, `xor`, and `zip` similarly return AsyncOption for promise-like operands. These operands are resolved even when their values are unused, and their rejections propagate. On async wrappers the receiver and async operand resolve concurrently. Use `andThenAsync` or `orElseAsync` when starting the operation must depend on the receiver's variant.

See the official [async guide](https://results-ts.madkarma.top/guide/async) and [error-handling guide](https://results-ts.madkarma.top/guide/error-handling) for additional context. Check installed declarations for available overloads.
