import { describe, expect, test, vi } from 'vitest';

const benchmarks = vi.hoisted(
    () => [] as { name: string; run: () => unknown }[]
);

// Execute the actual runner's registered workloads once without timing them.
// This catches missing imports and broken callbacks during ordinary test runs.
vi.mock('mitata', () => ({
    bench: (name: string, run: () => unknown) => {
        benchmarks.push({ name, run });
        return { gc: () => {} };
    },
    group: (_name: string, register: () => void) => register(),
    do_not_optimize: (_value: unknown) => {},
    run: async () => {}
}));

await import('../bench/index');

describe('benchmark runner', () => {
    test('includes supplemental workloads and fresh wrapper measurements', () => {
        expect(
            benchmarks.some(({ name }) => name.includes('fresh wrappers'))
        ).toBe(true);
        expect(
            benchmarks.some(({ name }) => name.includes('object pipeline'))
        ).toBe(true);
    });

    test.each(benchmarks)('$name executes successfully', async ({ run }) => {
        await run();
    });
});
