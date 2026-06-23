/**
 * Local micro-benchmarks for the hot paths targeted by the perf changes.
 * Run with: `bun run bench/bench.ts` (or `npx tsx bench/bench.ts`).
 *
 * Uses `mitata` so the harness is runtime-agnostic (no runtime-specific APIs).
 */

import { run, bench } from 'mitata';
import { Ok, Err } from '../src/result';
import { Some, None } from '../src/option';

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
const errRes = Err<number>(1);
const okRes = Ok<number>(1);

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

// --- Perf 4: terminal async methods ---
const someAsync = Some(1).mapAsync(async (x) => x + 1);
const okAsync = Ok(1).mapAsync((x) => Promise.resolve(x + 1));

bench('AsyncOption.unwrap (terminal)', async () => {
    await someAsync.unwrap();
});
bench('AsyncResult.unwrap (terminal)', async () => {
    await okAsync.unwrap();
});

// --- Perf 5: then() wrapping ---
bench('AsyncOption.then (await)', async () => {
    await someAsync;
});
bench('AsyncResult.then (await)', async () => {
    await okAsync;
});

await run();
