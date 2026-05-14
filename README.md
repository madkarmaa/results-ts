# @madkarma/result

Rust's `Result` and `Option` types, for TypeScript.

This library mimics the Rust `Result` and `Option` enums and includes some of their chainable methods adapted for TypeScript, with full type safety. For full documentation on the usage of the available methods, please refer to the official Rust docs (or read the JSDocs directly in your editor).

> Inspired by [this video](https://www.youtube.com/watch?v=ovnyeq-Xxrc) by **Web Dev Simplified** and [vultix/ts-results](https://github.com/vultix/ts-results).

## Installation

```bash
npm install @madkarma/result
# or
bun add @madkarma/result
# or
pnpm add @madkarma/result
# or
yarn add @madkarma/result
```

## Usage

### Result

[Official Rust Result documentation](https://doc.rust-lang.org/std/result/enum.Result.html)

```typescript
import { Ok, Err } from '@madkarma/result';

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

const { value: user, error } = parseUserId('10')
    .map((id) => id + 3)
    .andThen(fetchUser);

if (error) {
    switch (error.code) {
        case 'INVALID_INPUT':
        case 'INVALID_ID':
            console.error(`Validation Error: ${error.message}`);
            break;
        case 'NOT_FOUND':
            console.error(`Database Error: ${error.message}`);
            break;
    }
} else {
    console.log(`Welcome, ${user.role} ${user.name}!`);
}
```

### Option

[Official Rust Option documentation](https://doc.rust-lang.org/std/option/enum.Option.html)

```typescript
import { Some, None } from '@madkarma/result';

const parseNickname = (nickname?: string) => {
    if (!nickname) return None();

    const trimmed = nickname.trim();
    return trimmed.length > 0 ? Some(trimmed) : None();
};

const displayName = parseNickname('  Ada  ')
    .map((name) => name.toUpperCase())
    .unwrapOr('ANONYMOUS');

console.log(displayName);
```

## How this differs from Rust

Instead of Rust's `match` expressions, check `Result` values as `{ value, error }` directly and use a `switch` on `error.code` to emulate pattern matching. `Option` values are handled directly with `isSome()` / `isNone()` checks.

## Contributing

Contributions are welcome! Feel free to [open an issue](https://github.com/madkarmaa/result-ts/issues/new) or submit a pull request if you'd like to improve the library or fix any bugs.

## License

This project is licensed under the [MIT License](./LICENSE).
