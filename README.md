<p align="center">
    <img src="./assets/logo.png" alt="result-ts logo" width="400" height="auto" />
    <p align="center">Rust's <code>Result</code> and <code>Option</code> types, for TypeScript.</p>
</p>

---

This library mimics the Rust `Result` and `Option` enums and includes some of their chainable methods adapted for TypeScript, with full type safety. For full documentation on the usage of the available methods, please refer to the official Rust docs (or read the JSDocs directly in your editor).

> Inspired by [this video](https://www.youtube.com/watch?v=ovnyeq-Xxrc) by **Web Dev Simplified** and [vultix/ts-results](https://github.com/vultix/ts-results).

## Installation

```bash
npm install results-ts
# or
bun add results-ts
# or
pnpm add results-ts
# or
deno add results-ts
# or
yarn add results-ts
```

## Usage

### Result

[Official Rust Result documentation](https://doc.rust-lang.org/std/result/enum.Result.html)

```typescript
import { Ok, Err } from 'results-ts';

const parseUserId = (id: string) => {
    const parsed = parseInt(id, 10);
    if (isNaN(parsed))
        return Err({
            code: 'INVALID_INPUT',
            message: 'ID must be a valid number'
        });

    if (parsed <= 0)
        return Err({ code: 'INVALID_ID', message: 'ID must be positive' });

    return Ok(parsed);
};

const fetchUser = (id: number) => {
    if (id === 13) return Err({ code: 'NOT_FOUND', message: 'User not found' });
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

console.log(message);
```

### Option

[Official Rust Option documentation](https://doc.rust-lang.org/std/option/enum.Option.html)

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

console.log(displayName);
```

## How this differs from Rust

Rust uses the `match` keyword syntax; this library provides a `.match()` method on both `Result` and `Option` to achieve the same branching style in TypeScript.

## Error philosophy

Some methods (for example `expect`, `unwrap`, `expectErr`, and `unwrapErr`) intentionally panic to mirror Rust behavior.

If you ever get a non-panic JavaScript error from this library, that usually means invalid runtime data was passed in (library misuse, type-system bypass, or garbage input), and the call site should be fixed.

Error classes are intentionally not exported, this encourages treating thrown JavaScript errors as unexpected behavior rather than a normal control-flow path handled with `try/catch`.

## Contributing

Interested in contributing? See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, development guidelines, and pull request expectations.

## License

This project is licensed under the [MIT License](./LICENSE).
