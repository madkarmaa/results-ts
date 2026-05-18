# Contributing

Thanks for your interest in improving `results-ts`.

## Prerequisites

- [Bun](https://bun.com/docs/installation) — **required**
- Node.js [`>=22.18.0`](./.node-version)

## Setup

```bash
git clone <your-fork>
cd <your-fork>
bun install
```

## Commands

| Command             | Description             |
| ------------------- | ----------------------- |
| `bun run build`     | Build once              |
| `bun run dev`       | Build in watch mode     |
| `bun run test`      | Run tests once          |
| `bun run test:dev`  | Run tests in watch mode |
| `bun run typecheck` | Type-check              |

## Guidelines

- Keep changes type-safe.
- Align API behavior with Rust `Result`/`Option` semantics where applicable.
- Add or update tests for any behavioral change, PRs without tests won't be merged.
- Formatting is handled automatically by git hooks on commit.

## Before opening a PR

```bash
bun run typecheck && bun run test
```

- Keep PRs focused and small.
- Use [conventional commit](https://www.conventionalcommits.org/) messages.
- Include a short description: what changed, why, and any tradeoffs.

## Reporting issues

Open an issue with expected behavior, actual behavior, reproduction steps, and your Bun/Node versions.
