# Error handling

This library distinguishes two kinds of failure. Understanding both keeps your code predictable and type-safe.

## Panics

Some methods intentionally panic, mirroring Rust. They throw an internal `PanicError` synchronously - or, on the async wrappers, reject the returned `Promise` with one:

| Method                                                                                                                                                                                                                                                                     | Panics when                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap)<br>[`Option.unwrap()`](../api/interfaces/OptionMethods.md#unwrap)<br>[`AsyncResult.unwrap()`](../api/interfaces/AsyncResult.md#unwrap)<br>[`AsyncOption.unwrap()`](../api/interfaces/AsyncOption.md#unwrap) | the value is absent ([`Err`](../api/functions/Err.md) / [`None`](../api/functions/None.md)) |
| [`Result.expect()`](../api/interfaces/ResultMethods.md#expect)<br>[`Option.expect()`](../api/interfaces/OptionMethods.md#expect)<br>[`AsyncResult.expect()`](../api/interfaces/AsyncResult.md#expect)<br>[`AsyncOption.expect()`](../api/interfaces/AsyncOption.md#expect) | the value is absent                                                                         |
| [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr)<br>[`AsyncResult.unwrapErr()`](../api/interfaces/AsyncResult.md#unwraperr)                                                                                                                            | the value is [`Ok`](../api/functions/Ok.md)                                                 |
| [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr)<br>[`AsyncResult.expectErr()`](../api/interfaces/AsyncResult.md#expecterr)                                                                                                                            | the value is [`Ok`](../api/functions/Ok.md)                                                 |

Use a panic only when your program's logic has established that a value must be present. If that assumption is wrong, the panic exposes a programming error. When absence is expected or recoverable, prefer non-panicking combinators:

- [`Result.unwrapOr(fallback)`](../api/interfaces/ResultMethods.md#unwrapor) / [`Option.unwrapOr(fallback)`](../api/interfaces/OptionMethods.md#unwrapor) - a default value;
- [`Result.unwrapOrElse((err) => fallback)`](../api/interfaces/ResultMethods.md#unwraporelse) / [`Option.unwrapOrElse(() => fallback)`](../api/interfaces/OptionMethods.md#unwraporelse) - a lazily-computed default;
- [`Result.match({ Ok, Err })`](../api/interfaces/ResultMethods.md#match) / [`Option.match({ Some, None })`](../api/interfaces/OptionMethods.md#match) - explicit branching.

```typescript
import { Ok, Err } from 'results-ts';

// recoverable - no panic:
const n = Ok(1).unwrapOr(0); // 1
const m = Err('oops').unwrapOr(0); // 0

// assertion - panics if you are wrong:
const k = Ok(1).unwrap(); // 1
const bad = Err('oops').unwrap(); // throws PanicError
```

## Misuse errors

Almost every method validates its arguments at runtime. If untyped JavaScript or an unsafe type assertion passes a value that violates a method's contract, the method throws a JavaScript error. These errors signal a bug at the call site, **not** a normal control-flow path.

## Error classes are not exported

Internal error classes like `PanicError` and `InvalidArgumentError` are intentionally **not** exported. Thrown errors report broken assumptions or invalid calls; [`Result`](../api/type-aliases/Result.md) and [`Option`](../api/type-aliases/Option.md) are the public APIs for expected failures and absent values.

## catchUnwind

Existing or third-party code often throws exceptions or rejects promises. [`catchUnwind`](../api/functions/catchUnwind.md) and [`catchUnwindAsync`](../api/functions/catchUnwindAsync.md) provide a gentle boundary between that code and a [`Result`](../api/type-aliases/Result.md) pipeline. New code whose failures are expected should usually return [`Result`](../api/type-aliases/Result.md) directly.

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
> The [`onThrow`](../api/functions/catchUnwind.md#onthrow) handler receives the thrown value **and** the original call arguments: [`(thrown, ...args) => E`](../api/functions/catchUnwind.md#onthrow).

## How this differs from Rust

Rust uses the <code>match</code> keyword syntax; this library provides [`Result.match()`](../api/interfaces/ResultMethods.md#match) and [`Option.match()`](../api/interfaces/OptionMethods.md#match) methods to achieve the same branching style in TypeScript. The panic and unwrap semantics, plus the [`Ok`](../api/functions/Ok.md) / [`Err`](../api/functions/Err.md) / [`Some`](../api/functions/Some.md) / [`None`](../api/functions/None.md) naming, follow the Rust originals closely. See the [results-ts API reference](../api/index.md) for this library's behavior and the [official Rust docs](https://doc.rust-lang.org/std/) for Rust's standard library.

## Next steps

- [Async guide](./async.md) - use the same pipeline style with asynchronous work.
- [API reference](../api/index.md) - complete signatures and method documentation.
