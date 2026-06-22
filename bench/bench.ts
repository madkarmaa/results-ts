/**
 * Local micro-benchmarks for the hot paths targeted by the perf changes.
 * Run with: `bun run bench/bench.ts`
 *
 * Dependency-free: uses Bun's built-in `performance.now()` + `Bun.gc()`.
 * Each case is timed over a fixed iteration count; we report ops/sec and
 * relative deltas so before/after runs can be compared.
 */

import { Ok, Err } from '../src/result';
import { Some, None } from '../src/option';

const ITERS = 1_000_000;

function bench(name: string, fn: () => void) {
    // warmup
    for (let i = 0; i < 10_000; i++) fn();
    Bun.gc(true);

    const start = performance.now();
    for (let i = 0; i < ITERS; i++) fn();
    const end = performance.now();

    const ms = end - start;
    const opsPerSec = (ITERS / ms) * 1000;
    console.log(
        `${name.padEnd(48)} ${ms.toFixed(2).padStart(8)} ms   ${(
            opsPerSec / 1e6
        ).toFixed(2)} M ops/s`
    );
}

async function benchAsync(name: string, fn: () => Promise<unknown>) {
    const N = 50_000;
    // warmup
    for (let i = 0; i < 100; i++) await fn();
    Bun.gc(true);

    const start = performance.now();
    for (let i = 0; i < N; i++) await fn();
    const end = performance.now();

    const ms = end - start;
    const opsPerSec = (N / ms) * 1000;
    console.log(
        `${name.padEnd(48)} ${ms.toFixed(2).padStart(8)} ms   ${(
            opsPerSec / 1e3
        ).toFixed(2)} k ops/s`
    );
}

console.log('\n=== sync (1M iters) ===\n');

// --- Perf 1: allocation cost of None() / Err ---
bench('None()', () => {
    None();
});
bench('Err(1)', () => {
    Err(1);
});
bench('Some(1)', () => {
    Some(1);
});
bench('Ok(1)', () => {
    Ok(1);
});

// --- Perf 3: no-op path allocations ---
const errRes = Err<number, number>(1);
const okRes = Ok<number, number>(1);

bench('map on Err (no-op path)', () => {
    errRes.map((x) => x + 1);
});
bench('mapErr on Ok (no-op path)', () => {
    okRes.mapErr((x) => x + 1);
});
bench('and on Err (no-op path)', () => {
    errRes.and(Ok(2));
});
bench('or on Ok (no-op path)', () => {
    okRes.or(Err(2));
});

// control: the mapped path (should be unchanged)
bench('map on Ok (real path)', () => {
    okRes.map((x) => x + 1);
});

console.log('\n=== async (50k iters) ===\n');

// --- Perf 4: terminal async methods ---
const someAsync = Some(1).mapAsync(async (x) => x + 1);
const okAsync = Ok(1).mapAsync((x) => Promise.resolve(x + 1));

await benchAsync('AsyncOption.unwrap (terminal)', async () => {
    await someAsync.unwrap();
});
await benchAsync('AsyncResult.unwrap (terminal)', async () => {
    await okAsync.unwrap();
});

// --- Perf 5: then() wrapping ---
await benchAsync('AsyncOption.then (await)', async () => {
    await someAsync;
});
await benchAsync('AsyncResult.then (await)', async () => {
    await okAsync;
});

console.log('\nDone.');
