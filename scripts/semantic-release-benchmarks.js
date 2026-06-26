import { execSync } from 'node:child_process';

// https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js
const DEFAULT_BUMP_TYPES = new Set(['feat', 'fix', 'perf']);

const hasCodeBump = (commits) =>
    commits.some(
        (c) =>
            DEFAULT_BUMP_TYPES.has(c.type) ||
            (c.notes && c.notes.some((n) => n.title === 'BREAKING CHANGE'))
    );

export const prepare = (_pluginConfig, { commits, logger }) => {
    if (!hasCodeBump(commits)) {
        logger.log('no code-affecting commits, skipping benchmarks');
        return;
    }

    logger.log('code-affecting commits found, running benchmarks...');
    execSync('bun run bench:publish', { stdio: 'inherit' });
    execSync('bun run format', { stdio: 'inherit' });
};
