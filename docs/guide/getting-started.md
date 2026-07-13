# Getting Started

This library brings Rust's [`Result`](../api/type-aliases/Result.md) and [`Option`](../api/type-aliases/Option.md) types to TypeScript with full type safety. This page first covers setup, then introduces both types through small examples.

## Installation

```bash
bun add results-ts
# or
npm install results-ts
# or
pnpm add results-ts
# or
deno add results-ts
# or
yarn add results-ts
```

### Browser without a bundler

This library is an ES module. To use it directly in a browser, import it from a CDN inside a `<script type="module">`:

> [!IMPORTANT]
> The `type="module"` attribute is required.

```html
<script type="module">
    import { Ok } from 'https://unpkg.com/results-ts/dist/index.js';
    console.log(
        Ok(1)
            .map((x) => x + 1)
            .unwrap()
    ); // 2
</script>
```

## Core concepts

Use [`Result`](../api/type-aliases/Result.md) when an operation can fail with a useful error. Use [`Option`](../api/type-aliases/Option.md) when a value may be absent and no error details are needed. Both types make each possible outcome explicit, without exceptions or repeated `null` checks.

## Result

[`Result<T, E>`](../api/type-aliases/Result.md) represents either a success ([`Ok`](../api/functions/Ok.md)) carrying a value of type `T`, or a failure ([`Err`](../api/functions/Err.md)) carrying an error of type `E`. Use it instead of throwing when failures are expected and recoverable.

```typescript
import { Ok, Err } from 'results-ts';

const parseUserId = (id: string) => {
    const parsed = parseInt(id, 10);
    if (isNaN(parsed))
        return Err({
            code: 'INVALID_INPUT',
            message: 'ID must be a valid number'
        } as const);
    if (parsed <= 0)
        return Err({
            code: 'INVALID_ID',
            message: 'ID must be positive'
        } as const);
    return Ok(parsed);
};

const fetchUser = (id: number) => {
    if (id === 13)
        return Err({ code: 'NOT_FOUND', message: 'User not found' } as const);
    return Ok({ id, name: 'Alice', role: 'admin' });
};

const message = parseUserId('10')
    .map((id) => id + 3)
    .andThen(fetchUser)
    .match({
        Ok: (user) => `Welcome, ${user.role} ${user.name}!`,
        Err: (error) => {
            if (error.code === 'NOT_FOUND')
                return `Database Error: ${error.message}`;
            return `Validation Error: ${error.message}`;
        }
    });
```

> [!NOTE]
> Methods like [`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap), [`Result.expect()`](../api/interfaces/ResultMethods.md#expect), [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr), and [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr) intentionally **panic** to mirror Rust. See the [Error handling guide](./error-handling.md) for the full story - and prefer [`Result.unwrapOr()`](../api/interfaces/ResultMethods.md#unwrapor), [`Result.unwrapOrElse()`](../api/interfaces/ResultMethods.md#unwraporelse), or [`Result.match()`](../api/interfaces/ResultMethods.md#match) when the failure case is recoverable.

## Option

[`Option<T>`](../api/type-aliases/Option.md) represents either the presence of a value ([`Some`](../api/functions/Some.md)) or its absence ([`None`](../api/functions/None.md)). Use it instead of `null` / `undefined` checks.

```typescript
import { Some, None } from 'results-ts';

const parseNickname = (nickname?: string) => {
    if (!nickname) return None();
    const trimmed = nickname.trim();
    return trimmed.length > 0 ? Some(trimmed) : None();
};

const displayName = parseNickname('  Ada  ')
    .map((name) => name.toUpperCase())
    .match({
        Some: (name) => name,
        None: () => 'ANONYMOUS'
    });
```

Note that [`None`](../api/functions/None.md) is a **function** - always call it as [`None()`](../api/functions/None.md) (optionally typed, e.g. [`None<number>()`](../api/functions/None.md)). Convert an [`Option`](../api/type-aliases/Option.md) back to a [`Result`](../api/type-aliases/Result.md) with [`Option.okOr(err)`](../api/interfaces/OptionMethods.md#okor) or [`Option.okOrElse(() => err)`](../api/interfaces/OptionMethods.md#okorelse).

## Next steps

- [Error handling guide](./error-handling.md) - panics, misuse errors, and [`catchUnwind`](../api/functions/catchUnwind.md).
- [Async guide](./async.md) - working with [`AsyncResult`](../api/interfaces/AsyncResult.md) and [`AsyncOption`](../api/interfaces/AsyncOption.md).
- [API reference](../api/index.md) - every type and method, generated from the source.
