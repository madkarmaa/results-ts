import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { execSync } from 'node:child_process';

export async function prepare(_pluginConfig, context) {
    const releaseType = await analyzeCommits({ preset: 'angular' }, context);

    if (!releaseType) {
        context.logger.log('No code-affecting commits, skipping benchmarks');
        return;
    }

    context.logger.log('Code-affecting commits found, running benchmarks...');
    execSync('bun run bench:publish', { stdio: 'inherit' });
    execSync('bun run format', { stdio: 'inherit' });
}
