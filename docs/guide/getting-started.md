# Getting started

Install `results-ts`, then use [`Result`](../api/type-aliases/Result.md) for errors or [`Option`](../api/type-aliases/Option.md) for optional values.

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

Use [`Result`](../api/type-aliases/Result.md) when a failed operation needs an error value. Use [`Option`](../api/type-aliases/Option.md) when a value may be absent and you do not need an error value.

## Result

[`Result<T, E>`](../api/type-aliases/Result.md) is either [`Ok(value)`](../api/functions/Ok.md) with a value of type `T`, or [`Err(error)`](../api/functions/Err.md) with an error of type `E`. Return a [`Result`](../api/type-aliases/Result.md) when callers can recover from a failure.

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
> [`Result.unwrap()`](../api/interfaces/ResultMethods.md#unwrap) and [`Result.expect()`](../api/interfaces/ResultMethods.md#expect) throw on `Err`. [`Result.unwrapErr()`](../api/interfaces/ResultMethods.md#unwraperr) and [`Result.expectErr()`](../api/interfaces/ResultMethods.md#expecterr) throw on `Ok`. Use [`Result.unwrapOr()`](../api/interfaces/ResultMethods.md#unwrapor), [`Result.unwrapOrElse()`](../api/interfaces/ResultMethods.md#unwraporelse), or [`Result.match()`](../api/interfaces/ResultMethods.md#match) for recoverable failures. See [Error handling](./error-handling.md).

## Option

[`Option<T>`](../api/type-aliases/Option.md) is either [`Some(value)`](../api/functions/Some.md) with a value of type `T`, or [`None()`](../api/functions/None.md) with no value. Use its methods to handle a value that may be absent.

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

Call [`None()`](../api/functions/None.md) to create an absent value. Use [`None<number>()`](../api/functions/None.md) to specify its type. Convert an [`Option`](../api/type-aliases/Option.md) to a [`Result`](../api/type-aliases/Result.md) with [`Option.okOr(err)`](../api/interfaces/OptionMethods.md#okor) or [`Option.okOrElse(() => err)`](../api/interfaces/OptionMethods.md#okorelse).

## Next steps

- [Error handling](./error-handling.md) explains panics, invalid arguments, and [`catchUnwind`](../api/functions/catchUnwind.md).
- [Async support](./async.md) covers [`AsyncResult`](../api/interfaces/AsyncResult.md) and [`AsyncOption`](../api/interfaces/AsyncOption.md).
- [API reference](../api/index.md) documents each type and method.
