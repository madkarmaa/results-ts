import { run, bench } from 'mitata';
import { Ok, Err } from '../src/result';
import { Some, None } from '../src/option';

// --- Perf 1: allocation cost of None() / Err ---
bench('None()', () => {
    None();
}).gc('once');
bench('Err(1)', () => {
    Err(1);
}).gc('once');
bench('Some(1)', () => {
    Some(1);
}).gc('once');
bench('Ok(1)', () => {
    Ok(1);
}).gc('once');

// --- Perf 3: no-op path allocations ---
const errRes = Err<number>(1);
const okRes = Ok<number>(1);

bench('map on Err (no-op path)', () => {
    errRes.map((x) => x + 1);
}).gc('once');
bench('mapErr on Ok (no-op path)', () => {
    okRes.mapErr((x) => x + 1);
}).gc('once');
bench('and on Err (no-op path)', () => {
    errRes.and(Ok(2));
}).gc('once');
bench('or on Ok (no-op path)', () => {
    okRes.or(Err(2));
}).gc('once');

// control: the mapped path (should be unchanged)
bench('map on Ok (real path)', () => {
    okRes.map((x) => x + 1);
}).gc('once');

// --- Perf 4: terminal async methods ---
const someAsync = Some(1).mapAsync(async (x) => x + 1);
const okAsync = Ok(1).mapAsync((x) => Promise.resolve(x + 1));

bench('AsyncOption.unwrap (terminal)', async () => {
    await someAsync.unwrap();
}).gc('once');
bench('AsyncResult.unwrap (terminal)', async () => {
    await okAsync.unwrap();
}).gc('once');

// --- Perf 5: then() wrapping ---
bench('AsyncOption.then (await)', async () => {
    await someAsync;
}).gc('once');
bench('AsyncResult.then (await)', async () => {
    await okAsync;
}).gc('once');

// --- Perf 6: sync-type *Async methods (still `async` in source) ---
// These wrap both branches in an extra Promise. Measure the fast path
// (Some/Ok returns value) and the slow path (None/Err calls f).
const noneOpt = None<number>();
const errResult = Err<number>(1);

bench('Option.unwrapOrElseAsync (Some fast path)', async () => {
    await Some(1).unwrapOrElseAsync(async () => 2);
}).gc('once');
bench('Option.unwrapOrElseAsync (None slow path)', async () => {
    await noneOpt.unwrapOrElseAsync(async () => 2);
}).gc('once');
bench('Option.mapOrElseAsync (None slow path)', async () => {
    await noneOpt.mapOrElseAsync(
        async () => 0,
        async (x) => x + 1
    );
}).gc('once');
bench('Result.unwrapOrElseAsync (Ok fast path)', async () => {
    await Ok(1).unwrapOrElseAsync(async () => 2);
}).gc('once');
bench('Result.unwrapOrElseAsync (Err slow path)', async () => {
    await errResult.unwrapOrElseAsync(async () => 2);
}).gc('once');
bench('Result.mapOrElseAsync (Err slow path)', async () => {
    await errResult.mapOrElseAsync(
        async () => 0,
        async (x) => x + 1
    );
}).gc('once');

await run();
