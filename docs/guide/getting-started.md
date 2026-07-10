# Getting Started

This library brings Rust's `Result` and `Option` types to TypeScript with full type safety. Methods are chainable, the API closely mirrors the Rust originals, and there is (_almost_) no runtime overhead - see the [benchmarks](https://github.com/madkarmaa/results-ts/blob/main/BENCHMARKS.md).

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

## Result

`Result<T, E>` represents either a success (`Ok`) carrying a value of type `T`, or a failure (`Err`) carrying an error of type `E`. Use it instead of throwing when failures are expected and recoverable.

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
> Methods like `unwrap`, `expect`, `unwrapErr`, and `expectErr` intentionally **panic** to mirror Rust. See the [Error handling guide](./error-handling.md) for the full story - and prefer `unwrapOr` / `unwrapOrElse` / `match` when the failure case is recoverable.

### catchUnwind

`catchUnwind` wraps a function that might throw and turns the throw into an `Err`. Pass an optional `onThrow` handler to normalize the thrown value into a typed error.

```typescript
import { catchUnwind } from 'results-ts';

const safeParse = catchUnwind(JSON.parse, (thrown) =>
    thrown instanceof Error ? thrown.message : 'parse error'
);

const result = safeParse('{"a":1}'); // Ok({ a: 1 })
const error = safeParse('{bad'); //     Err('Unexpected token ...')
```

Without an `onThrow` handler, the thrown value is caught as-is and the error type defaults to `unknown` (since JavaScript allows throwing anything):

```typescript
const unsafe = catchUnwind(() => {
    throw 'literal string';
});

const result = unsafe();
//    ^? Result<never, unknown>
```

### catchUnwindAsync

`catchUnwindAsync` is the async counterpart: it captures both synchronous throws and rejected promises, and returns an `AsyncResult`.

```typescript
import { catchUnwindAsync } from 'results-ts';

const safeFetch = catchUnwindAsync(
    async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },
    (thrown) => (thrown instanceof Error ? thrown.message : 'request failed')
);

const result = await safeFetch('https://api.example.com');
//    ^? AsyncResult<unknown, string>
```

`AsyncResult` is awaitable - `await`ing it gives you back a `Result`. See the [Async guide](./async.md) for the full async API.

## Option

`Option<T>` represents either the presence of a value (`Some`) or its absence (`None`). Use it instead of `null` / `undefined` checks.

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

Note that `None` is a **function** - always call it as `None()` (optionally typed, e.g. `None<number>()`). Convert an `Option` back to a `Result` with `okOr(err)` or `okOrElse(() => err)`.

## Browser (no bundler)

This library is an ES module, so in the browser import it from a CDN inside a `<script type="module">`:

> [!IMPORTANT]
> The `type="module"` attribute is required, since this is an ES module.

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

## Next steps

- [Async guide](./async.md) - working with `AsyncResult` and `AsyncOption`.
- [Error handling guide](./error-handling.md) - panics, misuse errors, and `catchUnwind`.
- [API reference](../api/index.md) - every type and method, generated from the source.
