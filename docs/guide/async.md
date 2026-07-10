# Async results and options

This library ships two awaitable wrappers around `Result` and `Option` so you can use the same chainable API with `Promise`s:

- `AsyncResult<T, E>` - wraps `PromiseLike<Result<T, E>>`
- `AsyncOption<T>` - wraps `PromiseLike<Option<T>>`

Both implement `PromiseLike`, so you can `await` them directly:

- `await`ing an `AsyncResult<T, E>` gives a `Result<T, E>` back;
- `await`ing an `AsyncOption<T>` gives an `Option<T>` back.

## Getting an async value

```typescript
import { Ok } from 'results-ts';

const asyncResult = Ok(1).mapAsync(async (n) => n + 1);
//    ^? AsyncResult<number, never>

const result = await asyncResult; // Ok(2)
```

A single `*Async` call is enough to lift a synchronous value into the async world - from there every subsequent chainable method stays async.

## Chaining

Most methods on `AsyncResult` / `AsyncOption` return another async wrapper, so pipelines chain naturally:

```typescript
import { Ok, Err } from 'results-ts';

const name = await Ok(1)
    .andThenAsync(async (id) => {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok)
            return Err({ code: 'HTTP_ERROR', status: res.status } as const);
        return Ok(await res.json());
    })
    .map((u) => u.name)
    .unwrapOr('anonymous');
```

A few methods return a `Promise` instead of an async wrapper, because they collapse to a plain value:

- predicates: `isOk`, `isOkAnd`, `isErr`, `isErrAnd`, `isSome`, `isSomeAnd`, `isNone`, `isNoneOr`;
- combinators that produce a value: `mapOr`, `mapOrElse`, `mapOrElseAsync`, `unwrapOr`, `unwrapOrElse`, `unwrapOrElseAsync`;
- branching: `match`.

`await` these to read the underlying value.

## Panics become rejections

On a `Result`, the panic methods (`unwrap`, `expect`, `unwrapErr`, `expectErr`) throw synchronously. On an `AsyncResult` they return a `Promise` that **rejects** with the same `PanicError` instead - prefer the non-panicking combinators (`unwrapOr`, `unwrapOrElse`, `match`) over handling the rejections.

```typescript
import { Ok, Err } from 'results-ts';

// resolves with the value:
const value = await Ok(21)
    .mapAsync(async (n) => n * 2)
    .unwrap(); // 42

// rejects with PanicError:
await Err('boom')
    .mapAsync(async (n) => n)
    .unwrap();
// => PanicError: called `Result.unwrap()` on an `Err` value
```

The same applies to `AsyncOption`'s panic methods.

## API reference

See the full [API reference](../api/index.md) for every method on `AsyncResult` and `AsyncOption`.
