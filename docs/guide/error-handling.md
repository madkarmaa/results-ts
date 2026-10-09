# Error handling

Use `Result` for expected failures. Panic errors and argument validation errors indicate bugs in the calling code.

## Panics

The following methods throw an internal `PanicError`. On async wrappers, they return a promise that rejects with that error:

| Method                                                                                                                                                                                                                                                                     | Panics when                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap)<br>[`Option.unwrap()`](../api/interfaces/OptionMethods.md#unwrap)<br>[`AsyncResult.unwrap()`](../api/interfaces/AsyncResult.md#unwrap)<br>[`AsyncOption.unwrap()`](../api/interfaces/AsyncOption.md#unwrap) | the outcome is [`Err`](../api/functions/Err.md) or [`None`](../api/functions/None.md) |
| [`Result.expect()`](../api/interfaces/ResultMethods.md#expect)<br>[`Option.expect()`](../api/interfaces/OptionMethods.md#expect)<br>[`AsyncResult.expect()`](../api/interfaces/AsyncResult.md#expect)<br>[`AsyncOption.expect()`](../api/interfaces/AsyncOption.md#expect) | the outcome is [`Err`](../api/functions/Err.md) or [`None`](../api/functions/None.md) |
| [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr)<br>[`AsyncResult.unwrapErr()`](../api/interfaces/AsyncResult.md#unwraperr)                                                                                                                            | the value is [`Ok`](../api/functions/Ok.md)                                           |
| [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr)<br>[`AsyncResult.expectErr()`](../api/interfaces/AsyncResult.md#expecterr)                                                                                                                            | the value is [`Ok`](../api/functions/Ok.md)                                           |

Use these methods only when an [`Err`](../api/functions/Err.md) or [`None`](../api/functions/None.md) would indicate a bug. For expected failures or absent values, use a fallback or handle each variant:

- [`Result.unwrapOr(fallback)`](../api/interfaces/ResultMethods.md#unwrapor) and [`Option.unwrapOr(fallback)`](../api/interfaces/OptionMethods.md#unwrapor) return a default value.
- [`Result.unwrapOrElse((err) => fallback)`](../api/interfaces/ResultMethods.md#unwraporelse) and [`Option.unwrapOrElse(() => fallback)`](../api/interfaces/OptionMethods.md#unwraporelse) compute a default only when needed.
- [`Result.match({ Ok, Err })`](../api/interfaces/ResultMethods.md#match) and [`Option.match({ Some, None })`](../api/interfaces/OptionMethods.md#match) call a handler for the current variant.

```typescript
import { Ok, Err } from 'results-ts';

// Return a fallback on Err.
const n = Ok(1).unwrapOr(0); // 1
const m = Err('oops').unwrapOr(0); // 0

// Throw on Err.
const k = Ok(1).unwrap(); // 1
const bad = Err('oops').unwrap(); // throws PanicError
```

## Misuse errors

Methods that accept callbacks or operands validate their types at runtime. Invalid arguments throw errors, including when untyped JavaScript or a type assertion bypasses TypeScript's checks. Fix the calling code when validation fails.

## Error classes are not exported

The library does not export `PanicError`, `InvalidArgumentError`, or its other internal error classes. Use [`Result`](../api/type-aliases/Result.md) for expected failures and [`Option`](../api/type-aliases/Option.md) for absent values.

## catchUnwind

Use [`catchUnwind`](../api/functions/catchUnwind.md) or [`catchUnwindAsync`](../api/functions/catchUnwindAsync.md) to convert exceptions from existing code into [`Result`](../api/type-aliases/Result.md) values. New functions with expected failures should return `Result` directly.

[`catchUnwind`](../api/functions/catchUnwind.md) wraps a synchronous function and turns a throw into an [`Err`](../api/functions/Err.md). Its optional [`onThrow`](../api/functions/catchUnwind.md#onthrow) handler can normalize JavaScript's `unknown` thrown value into a typed error.

```typescript
import { catchUnwind } from 'results-ts';

const parseJson = (text: string): unknown => JSON.parse(text);

const safeParse = catchUnwind(parseJson, (thrown) =>
    thrown instanceof Error ? thrown.message : 'parse error'
);

safeParse('{"a":1}'); // Ok({ a: 1 })
safeParse('{bad'); // Err('Unexpected token ...')
```

Without an [`onThrow`](../api/functions/catchUnwind.md#onthrow) handler, the caught error type remains `unknown`, because JavaScript allows throwing any value:

```typescript
import { catchUnwind } from 'results-ts';

const unsafe = catchUnwind(() => {
    throw 'literal string';
});

const result = unsafe();
//    ^? Result<never, unknown>
```

[`catchUnwindAsync`](../api/functions/catchUnwindAsync.md) captures both synchronous throws and rejected promises and returns an [`AsyncResult`](../api/interfaces/AsyncResult.md):

```typescript
import { catchUnwindAsync } from 'results-ts';

const readJson = async (response: Response): Promise<unknown> =>
    response.json();

const safeFetch = catchUnwindAsync(
    async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return readJson(response);
    },
    (thrown) => (thrown instanceof Error ? thrown.message : 'request failed')
);

const result = await safeFetch('https://api.example.com');
//    ^? Result<unknown, string>
```

> [!NOTE]
> The [`onThrow`](../api/functions/catchUnwind.md#onthrow) handler receives the thrown value and the original call arguments. Its signature is [`(thrown, ...args) => E`](../api/functions/catchUnwind.md#onthrow).

## How this differs from Rust

Rust uses a `match` expression. In TypeScript, call [`Result.match()`](../api/interfaces/ResultMethods.md#match) or [`Option.match()`](../api/interfaces/OptionMethods.md#match) with a handler for each variant. The constructors and panic methods use Rust's names. See the [API reference](../api/index.md) for this library's behavior and the [Rust documentation](https://doc.rust-lang.org/std/) for Rust's types.

## Next steps

- [Async support](./async.md) explains how to chain and await async operations.
- [API reference](../api/index.md) lists method signatures and behavior.
