import { bench, do_not_optimize, group, run } from 'mitata';
import { Ok, Err, type Result } from '../src/result';
import type { Option } from '../src/option';

type Value = { readonly id: number } | undefined;
type Failure = { readonly code: string } | symbol | undefined;

const values: readonly Value[] = [{ id: 1 }, undefined, { id: 2 }];
const failures: readonly Failure[] = [
    { code: 'missing' },
    undefined,
    Symbol('failure')
];
const errors: readonly Result<Value, Failure>[] = failures.map(Err);
const successes: readonly Result<Value, Failure>[] = values.map(Ok);
const nestedErrors: readonly Result<Result<Value, Failure>, Failure>[] =
    failures.map(Err);
const optionalErrors: readonly Result<Option<Value>, Failure>[] =
    failures.map(Err);

group('Result - fresh wrapper workloads', () => {
    bench('Err.flatten fresh wrappers with varied payloads', () => {
        for (const result of nestedErrors) do_not_optimize(result.flatten());
    }).gc('once');

    bench('Err.transpose fresh wrappers with varied payloads', () => {
        for (const result of optionalErrors)
            do_not_optimize(result.transpose());
    }).gc('once');
});

const mapValue = async (value: Value): Promise<Value> => value;
const mapFailure = async (error: Failure): Promise<Failure> => error;
const bindValue = async (value: Value): Promise<Result<Value, Failure>> =>
    Ok(value);
const bindFailure = async (error: Failure): Promise<Result<Value, Failure>> =>
    Err(error);

group('Async Result - fresh wrapper workloads', () => {
    bench('Err.mapAsync fresh wrappers with varied payloads', async () => {
        for (const result of errors)
            do_not_optimize(await result.mapAsync(mapValue));
    }).gc('once');

    bench('Ok.mapErrAsync fresh wrappers with varied payloads', async () => {
        for (const result of successes)
            do_not_optimize(await result.mapErrAsync(mapFailure));
    }).gc('once');

    bench('Err.andThenAsync fresh wrappers with varied payloads', async () => {
        for (const result of errors)
            do_not_optimize(await result.andThenAsync(bindValue));
    }).gc('once');

    bench('Ok.orElseAsync fresh wrappers with varied payloads', async () => {
        for (const result of successes)
            do_not_optimize(await result.orElseAsync(bindFailure));
    }).gc('once');
});

if (import.meta.main) await run();
