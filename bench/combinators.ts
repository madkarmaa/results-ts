import { bench, do_not_optimize, group, run } from 'mitata';
import { some, none, ok, err } from './fixtures';

group('Option - combinator operand matrix', () => {
    const other = some;
    const otherAsync = other.mapAsync(async (value) => value);
    const someAsync = some.mapAsync(async (value) => value);
    bench('Option.and some sync + sync', () => {
        do_not_optimize(some.and(other));
    }).gc('once');
    bench('Option.and some sync + async', async () => {
        do_not_optimize(await some.and(otherAsync));
    }).gc('once');
    bench('Option.and some async + sync', async () => {
        do_not_optimize(await someAsync.and(other));
    }).gc('once');
    bench('Option.and some async + async', async () => {
        do_not_optimize(await someAsync.and(otherAsync));
    }).gc('once');
    bench('Option.or some sync + sync', () => {
        do_not_optimize(some.or(other));
    }).gc('once');
    bench('Option.or some sync + async', async () => {
        do_not_optimize(await some.or(otherAsync));
    }).gc('once');
    bench('Option.or some async + sync', async () => {
        do_not_optimize(await someAsync.or(other));
    }).gc('once');
    bench('Option.or some async + async', async () => {
        do_not_optimize(await someAsync.or(otherAsync));
    }).gc('once');
    bench('Option.xor some sync + sync', () => {
        do_not_optimize(some.xor(other));
    }).gc('once');
    bench('Option.xor some sync + async', async () => {
        do_not_optimize(await some.xor(otherAsync));
    }).gc('once');
    bench('Option.xor some async + sync', async () => {
        do_not_optimize(await someAsync.xor(other));
    }).gc('once');
    bench('Option.xor some async + async', async () => {
        do_not_optimize(await someAsync.xor(otherAsync));
    }).gc('once');
    bench('Option.zip some sync + sync', () => {
        do_not_optimize(some.zip(other));
    }).gc('once');
    bench('Option.zip some sync + async', async () => {
        do_not_optimize(await some.zip(otherAsync));
    }).gc('once');
    bench('Option.zip some async + sync', async () => {
        do_not_optimize(await someAsync.zip(other));
    }).gc('once');
    bench('Option.zip some async + async', async () => {
        do_not_optimize(await someAsync.zip(otherAsync));
    }).gc('once');
    const noneAsync = none.mapAsync(async (value) => value);
    bench('Option.and none sync + sync', () => {
        do_not_optimize(none.and(other));
    }).gc('once');
    bench('Option.and none sync + async', async () => {
        do_not_optimize(await none.and(otherAsync));
    }).gc('once');
    bench('Option.and none async + sync', async () => {
        do_not_optimize(await noneAsync.and(other));
    }).gc('once');
    bench('Option.and none async + async', async () => {
        do_not_optimize(await noneAsync.and(otherAsync));
    }).gc('once');
    bench('Option.or none sync + sync', () => {
        do_not_optimize(none.or(other));
    }).gc('once');
    bench('Option.or none sync + async', async () => {
        do_not_optimize(await none.or(otherAsync));
    }).gc('once');
    bench('Option.or none async + sync', async () => {
        do_not_optimize(await noneAsync.or(other));
    }).gc('once');
    bench('Option.or none async + async', async () => {
        do_not_optimize(await noneAsync.or(otherAsync));
    }).gc('once');
    bench('Option.xor none sync + sync', () => {
        do_not_optimize(none.xor(other));
    }).gc('once');
    bench('Option.xor none sync + async', async () => {
        do_not_optimize(await none.xor(otherAsync));
    }).gc('once');
    bench('Option.xor none async + sync', async () => {
        do_not_optimize(await noneAsync.xor(other));
    }).gc('once');
    bench('Option.xor none async + async', async () => {
        do_not_optimize(await noneAsync.xor(otherAsync));
    }).gc('once');
    bench('Option.zip none sync + sync', () => {
        do_not_optimize(none.zip(other));
    }).gc('once');
    bench('Option.zip none sync + async', async () => {
        do_not_optimize(await none.zip(otherAsync));
    }).gc('once');
    bench('Option.zip none async + sync', async () => {
        do_not_optimize(await noneAsync.zip(other));
    }).gc('once');
    bench('Option.zip none async + async', async () => {
        do_not_optimize(await noneAsync.zip(otherAsync));
    }).gc('once');
});

group('Result - combinator operand matrix', () => {
    const other = ok;
    const otherAsync = other.mapAsync(async (value) => value);
    const okAsync = ok.mapAsync(async (value) => value);
    bench('Result.and ok sync + sync', () => {
        do_not_optimize(ok.and(other));
    }).gc('once');
    bench('Result.and ok sync + async', async () => {
        do_not_optimize(await ok.and(otherAsync));
    }).gc('once');
    bench('Result.and ok async + sync', async () => {
        do_not_optimize(await okAsync.and(other));
    }).gc('once');
    bench('Result.and ok async + async', async () => {
        do_not_optimize(await okAsync.and(otherAsync));
    }).gc('once');
    bench('Result.or ok sync + sync', () => {
        do_not_optimize(ok.or(other));
    }).gc('once');
    bench('Result.or ok sync + async', async () => {
        do_not_optimize(await ok.or(otherAsync));
    }).gc('once');
    bench('Result.or ok async + sync', async () => {
        do_not_optimize(await okAsync.or(other));
    }).gc('once');
    bench('Result.or ok async + async', async () => {
        do_not_optimize(await okAsync.or(otherAsync));
    }).gc('once');
    const errAsync = err.mapAsync(async (value) => value);
    bench('Result.and err sync + sync', () => {
        do_not_optimize(err.and(other));
    }).gc('once');
    bench('Result.and err sync + async', async () => {
        do_not_optimize(await err.and(otherAsync));
    }).gc('once');
    bench('Result.and err async + sync', async () => {
        do_not_optimize(await errAsync.and(other));
    }).gc('once');
    bench('Result.and err async + async', async () => {
        do_not_optimize(await errAsync.and(otherAsync));
    }).gc('once');
    bench('Result.or err sync + sync', () => {
        do_not_optimize(err.or(other));
    }).gc('once');
    bench('Result.or err sync + async', async () => {
        do_not_optimize(await err.or(otherAsync));
    }).gc('once');
    bench('Result.or err async + sync', async () => {
        do_not_optimize(await errAsync.or(other));
    }).gc('once');
    bench('Result.or err async + async', async () => {
        do_not_optimize(await errAsync.or(otherAsync));
    }).gc('once');
});

if (import.meta.main) await run();
