import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters:
            process.env.GITHUB_ACTIONS === 'true'
                ? ['default', 'github-actions']
                : ['default'],
        typecheck: {
            enabled: true,
            tsconfig: 'tsconfig.json'
        }
    }
});
