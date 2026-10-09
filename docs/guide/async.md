# Async results and options

[`AsyncResult`](../api/interfaces/AsyncResult.md) and [`AsyncOption`](../api/interfaces/AsyncOption.md) let you chain operations before awaiting a result or option:

- Await an [`AsyncResult<T, E>`](../api/interfaces/AsyncResult.md) to get a [`Result<T, E>`](../api/type-aliases/Result.md).
- Await an [`AsyncOption<T>`](../api/interfaces/AsyncOption.md) to get an [`Option<T>`](../api/type-aliases/Option.md).

## Getting an async value

```typescript
import { Ok } from 'results-ts';

const asyncResult = Ok(1).mapAsync(async (n) => n + 1);
//    ^? AsyncResult<number, never>

const result = await asyncResult; // Ok(2)
```

`mapAsync` returns an async wrapper. Its chainable methods also return async wrappers.

## Chaining

Chain methods on [`AsyncResult`](../api/interfaces/AsyncResult.md) and [`AsyncOption`](../api/interfaces/AsyncOption.md) as you would on their synchronous types:

```typescript
import { Ok, Err } from 'results-ts';

const loadUser = async (id: number) => {
    if (id === 13) return Err({ code: 'NOT_FOUND', id } as const);

    return Ok({ id, name: 'Ada' });
};

const name = await Ok(1)
    .andThenAsync(loadUser)
    .map((user) => user.name)
    .unwrapOr('anonymous');
```

Methods such as [`AsyncResult.unwrapOr()`](../api/interfaces/AsyncResult.md#unwrapor) return a `Promise` of the contained value or fallback. The example awaits that promise to get a string. Use [`AsyncResult.match()`](../api/interfaces/AsyncResult.md#match) to handle each variant with a function.

## Panics become rejections

[`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap) and [`Result.expect()`](../api/interfaces/ResultMethods.md#expect) throw on `Err`. [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr) and [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr) throw on `Ok`.

The same methods on [`AsyncResult`](../api/interfaces/AsyncResult.md) reject with `PanicError`. For recoverable failures, use [`AsyncResult.unwrapOr()`](../api/interfaces/AsyncResult.md#unwrapor), [`AsyncResult.unwrapOrElse()`](../api/interfaces/AsyncResult.md#unwraporelse), or [`AsyncResult.match()`](../api/interfaces/AsyncResult.md#match).

```typescript
import { Ok, Err } from 'results-ts';

// Resolves to 42.
const value = await Ok(21)
    .mapAsync(async (n) => n * 2)
    .unwrap(); // 42

// Rejects with PanicError.
await Err('boom')
    .mapAsync(async (n) => n)
    .unwrap();
// PanicError: called `Result.unwrap()` on an `Err` value
```

The same applies to [`AsyncOption`](../api/interfaces/AsyncOption.md)'s panic methods.

## Next steps

- [`AsyncResult` API](../api/interfaces/AsyncResult.md) lists the async result methods.
- [`AsyncOption` API](../api/interfaces/AsyncOption.md) lists the async option methods.
- [Error handling](./error-handling.md) covers panics and functions that throw.
