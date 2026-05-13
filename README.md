# @madkarma/result

Rust's Result type, for TypeScript.

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

```typescript
import { Ok, Err } from '@madkarma/result';

const getUser = (id: number) => {
    if (typeof id !== 'number')
        return Err({ code: 'NOT_A_NUMBER', message: 'ID must be a number' });

    if (id < 0)
        return Err({ code: 'INVALID_ID', message: 'ID must be positive' });

    if (id === 0) return Err({ code: 'NOT_FOUND', message: 'User not found' });

    return Ok({ id, name: 'Alice' });
};

const [user, error] = getUser(10);

if (error)
    switch (error.code) {
        case 'NOT_A_NUMBER':
            console.error(error.message);
            break;
        case 'INVALID_ID':
            console.error(error.message);
            break;
        case 'NOT_FOUND':
            console.error(error.message);
            break;
    }
else console.log(`Hello, ${user.name}!`);
```

### How this differs from Rust

Instead of Rust's `match` expressions, check `[value, error]` directly and use a JavaScript `switch` on `error.code` to emulate pattern matching.

## Contributing

Contributions are welcome! Feel free to [open an issue](https://github.com/madkarmaa/result-ts/issues/new) or submit a pull request if you'd like to improve the library or fix any bugs.

## License

This project is licensed under the [MIT License](./LICENSE).
