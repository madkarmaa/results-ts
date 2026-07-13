# Async results and options

This library ships two awaitable wrappers around [`Result`](../api/type-aliases/Result.md) and [`Option`](../api/type-aliases/Option.md), so asynchronous code can use the same chainable API:

- [`AsyncResult<T, E>`](../api/interfaces/AsyncResult.md) resolves to a [`Result<T, E>`](../api/type-aliases/Result.md)
- [`AsyncOption<T>`](../api/interfaces/AsyncOption.md) resolves to an [`Option<T>`](../api/type-aliases/Option.md)

Both are awaitable, so you can use them like promises:

- `await`ing an [`AsyncResult<T, E>`](../api/interfaces/AsyncResult.md) gives a [`Result<T, E>`](../api/type-aliases/Result.md) back;
- `await`ing an [`AsyncOption<T>`](../api/interfaces/AsyncOption.md) gives an [`Option<T>`](../api/type-aliases/Option.md) back.

## Getting an async value

```typescript
import { Ok } from 'results-ts';

const asyncResult = Ok(1).mapAsync(async (n) => n + 1);
//    ^? AsyncResult<number, never>

const result = await asyncResult; // Ok(2)
```

A single `*Async` call is enough to lift a synchronous value into the async world - from there every subsequent chainable method stays async.

## Chaining

Most methods on [`AsyncResult`](../api/interfaces/AsyncResult.md) and [`AsyncOption`](../api/interfaces/AsyncOption.md) return another async wrapper, so pipelines chain naturally:

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

Terminal methods that collapse the wrapper to a plain value return a `Promise`. In the example above, [`AsyncResult.unwrapOr()`](../api/interfaces/AsyncResult.md#unwrapor) returns `Promise<string>`, so the pipeline is awaited once at the end. [`AsyncResult.match()`](../api/interfaces/AsyncResult.md#match) works the same way when you need explicit branching.

## Panics become rejections

On a [`Result`](../api/type-aliases/Result.md), the panic methods [`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap), [`Result.expect()`](../api/interfaces/ResultMethods.md#expect), [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr), and [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr) throw synchronously. On an [`AsyncResult`](../api/interfaces/AsyncResult.md), their async counterparts return a `Promise` that **rejects** with the same internal `PanicError` instead - prefer [`AsyncResult.unwrapOr()`](../api/interfaces/AsyncResult.md#unwrapor), [`AsyncResult.unwrapOrElse()`](../api/interfaces/AsyncResult.md#unwraporelse), or [`AsyncResult.match()`](../api/interfaces/AsyncResult.md#match) over handling the rejections.

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

The same applies to [`AsyncOption`](../api/interfaces/AsyncOption.md)'s panic methods.

## Next steps

- [`AsyncResult` API](../api/interfaces/AsyncResult.md) - every result method available on the async wrapper.
- [`AsyncOption` API](../api/interfaces/AsyncOption.md) - every option method available on the async wrapper.
- [Error handling guide](./error-handling.md) - panic behavior and adapting exception-throwing code.
