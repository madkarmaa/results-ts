# Error handling

This library distinguishes two kinds of failure. Understanding both keeps your code predictable and type-safe.

## Panics

Some methods intentionally panic, mirroring Rust. They throw a `PanicError` synchronously - or, on the async wrappers, reject the returned `Promise` with one:

| Method           | Available on                                     | Panics when                          |
| ---------------- | ------------------------------------------------ | ------------------------------------ |
| `unwrap`         | `Result`, `Option`, `AsyncResult`, `AsyncOption` | the value is absent (`Err` / `None`) |
| `expect(msg)`    | `Result`, `Option`, `AsyncResult`, `AsyncOption` | the value is absent                  |
| `unwrapErr`      | `Result`, `AsyncResult`                          | the value is `Ok`                    |
| `expectErr(msg)` | `Result`, `AsyncResult`                          | the value is `Ok`                    |

Panics are meant for situations where the absence of a value is a programmer error - you have already established (or are willing to assert) that the value is present. Prefer the non-panicking combinators whenever the failure case is recoverable:

- `unwrapOr(fallback)` - a default value;
- `unwrapOrElse((err) => fallback)` - a lazily-computed default;
- `match({ Ok, Err })` / `match({ Some, None })` - explicit branching.

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

Almost every method validates its arguments at runtime. Calling methods with invalid arguments, or with invalid internal state, throws actual JavaScript errors.

These errors signal a bug at the call site (garbage data, type-system bypass, or invalid runtime input), **not** a normal control-flow path. Fix the call site rather than catching them.

## Error classes are not exported

Error classes are intentionally **not** exported from the package. This encourages treating thrown JavaScript errors as unexpected behavior rather than a control-flow mechanism you wrap in `try/catch`. The `Result` / `Option` types are the intended error-handling API.

If you ever get a non-panic JavaScript error from this library, that usually means invalid runtime data was passed in (library misuse, type-system bypass, or garbage input), and the call site should be fixed.

## catchUnwind

When you genuinely need to interop with code that throws (e.g. parsing, third-party functions, JSON), use `catchUnwind` (sync) or `catchUnwindAsync` (async). They turn a throw into an `Err`, with an optional `onThrow` handler to normalize the thrown value into a typed error.

```typescript
import { catchUnwind } from 'results-ts';

const safeParse = catchUnwind(JSON.parse, (thrown) =>
    thrown instanceof Error ? thrown.message : 'parse error'
);

safeParse('{"a":1}'); // Ok({ a: 1 })
safeParse('{bad'); // Err('Unexpected token ...')
```

`catchUnwind` is not a general-purpose replacement for `try/catch`. The `Result` type is more appropriate for functions that fail regularly - reach for `catchUnwind` only if you genuinely can't avoid the throw.

> [!NOTE]
> The `onThrow` handler receives the thrown value **and** the original call arguments: `(thrown, ...args) => E`.

See the [getting started guide](./getting-started.md#catchunwind) for the basics and the [API reference](../api/index.md) for the full signatures.

## How this differs from Rust

Rust uses the `match` keyword syntax; this library provides a `.match()` method on both `Result` and `Option` to achieve the same branching style in TypeScript. Everything else - panics, `unwrap` semantics, and the `Ok` / `Err` / `Some` / `None` naming - follows the Rust originals closely. For the canonical method behavior, refer to the [official Rust docs](https://doc.rust-lang.org/std/result/enum.Result.html) or the JSDocs in your editor.
