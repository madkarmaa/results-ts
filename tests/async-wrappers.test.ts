import { describe, expect, test, vi } from 'vitest';
import { catchUnwindAsync, type AsyncResult } from '../src/async-result';
import type { AsyncOption } from '../src/async-option';
import { Some, None } from '../src/option';
import { Ok, Err, type Result } from '../src/result';

const options = [Some(5), None<number>()];
const results: readonly Result<number, string>[] = [Ok(5), Err('failure')];

describe('async methods on AsyncOption receivers', () => {
    test.each(options)(
        'fallbacks and error conversion choose the correct branch: %s',
        async (input) => {
            const option = input.mapAsync(async (value) => value);
            const fallback = vi.fn(async () => 10);
            const transform = vi.fn(async (value: number) => value * 2);
            expect(await option.mapOrElseAsync(fallback, transform)).toBe(10);
            expect(fallback).toHaveBeenCalledTimes(input.isNone() ? 1 : 0);
            expect(transform).toHaveBeenCalledTimes(input.isSome() ? 1 : 0);
            if (input.isSome()) expect(transform).toHaveBeenCalledWith(5);

            fallback.mockClear();
            expect(await option.unwrapOrElseAsync(fallback)).toBe(
                input.isSome() ? 5 : 10
            );
            expect(fallback).toHaveBeenCalledTimes(input.isNone() ? 1 : 0);

            const error = vi.fn(async () => 'missing');
            const converted = await option.okOrElseAsync(error);
            expect(converted.toString()).toBe(
                input.isSome() ? 'Ok(5)' : 'Err(missing)'
            );
            expect(error).toHaveBeenCalledTimes(input.isNone() ? 1 : 0);
        }
    );

    test.each(options)(
        'inspection awaits its callback and preserves identity: %s',
        async (input) => {
            const option = input.inspectAsync(async () => {});
            const gate = Promise.withResolvers<void>();
            const inspect = vi.fn(() => gate.promise);
            let settled = false;
            const inspected = option.inspectAsync(inspect).then((value) => {
                settled = true;
                return value;
            });
            if (input.isSome()) {
                await vi.waitFor(() => expect(inspect).toHaveBeenCalledWith(5));
                expect(settled).toBe(false);
            }
            gate.resolve();
            expect(await inspected).toBe(input);
            expect(inspect).toHaveBeenCalledTimes(input.isSome() ? 1 : 0);
        }
    );

    test.each([true, false])(
        'filterAsync applies a %s predicate and skips None',
        async (keep) => {
            for (const input of options) {
                const predicate = vi.fn(async () => keep);
                const filtered = await input
                    .inspectAsync(async () => {})
                    .filterAsync(predicate);
                expect(filtered.isSome()).toBe(input.isSome() && keep);
                if (input.isSome() && keep) expect(filtered).toBe(input);
                expect(predicate).toHaveBeenCalledTimes(input.isSome() ? 1 : 0);
            }
        }
    );
});

describe('async methods on AsyncResult receivers', () => {
    test.each(results)(
        'fallbacks and chaining choose the correct branch: %s',
        async (input) => {
            const result = input.mapAsync(async (value) => value);
            const fallback = vi.fn(async (error: string) => error.length);
            const transform = vi.fn(async (value: number) => value * 2);
            expect(await result.mapOrElseAsync(fallback, transform)).toBe(
                input.isOk() ? 10 : 7
            );
            expect(fallback).toHaveBeenCalledTimes(input.isErr() ? 1 : 0);
            expect(transform).toHaveBeenCalledTimes(input.isOk() ? 1 : 0);
            if (input.isErr()) expect(fallback).toHaveBeenCalledWith('failure');

            fallback.mockClear();
            expect(await result.unwrapOrElseAsync(fallback)).toBe(
                input.isOk() ? 5 : 7
            );
            expect(fallback).toHaveBeenCalledTimes(input.isErr() ? 1 : 0);

            const bind = vi.fn(async (value: number) => Err(value * 2));
            const chained = await result.andThenAsync(bind);
            expect(chained.unwrapErr()).toBe(input.isOk() ? 10 : 'failure');
            expect(bind).toHaveBeenCalledTimes(input.isOk() ? 1 : 0);
            if (input.isOk()) expect(bind).toHaveBeenCalledWith(5);
        }
    );

    test.each(results)(
        'async inspections await callbacks and preserve identity: %s',
        async (input) => {
            const result = input.inspectAsync(async () => {});
            const values: number[] = [];
            const errors: string[] = [];
            expect(
                await result.inspectAsync(async (value) => {
                    await Promise.resolve();
                    values.push(value);
                })
            ).toBe(input);
            expect(
                await result.inspectErrAsync(async (error) => {
                    await Promise.resolve();
                    errors.push(error);
                })
            ).toBe(input);
            expect(values).toEqual(input.isOk() ? [5] : []);
            expect(errors).toEqual(input.isErr() ? ['failure'] : []);
        }
    );
});

type FailingCallback = () => Promise<never>;
const failingCallbacks: readonly {
    name: string;
    invoke: (callback: FailingCallback) => PromiseLike<unknown>;
}[] = [
    {
        name: 'AsyncOption.mapAsync',
        invoke: (f) =>
            Some(1)
                .mapAsync(async (v) => v)
                .mapAsync(f)
    },
    {
        name: 'AsyncOption.inspectAsync',
        invoke: (f) =>
            Some(1)
                .mapAsync(async (v) => v)
                .inspectAsync(f)
    },
    {
        name: 'AsyncOption.andThenAsync',
        invoke: (f) =>
            Some(1)
                .mapAsync(async (v) => v)
                .andThenAsync(f)
    },
    {
        name: 'AsyncOption.orElseAsync',
        invoke: (f) =>
            None()
                .mapAsync(async (v) => v)
                .orElseAsync(f)
    },
    {
        name: 'AsyncOption.filterAsync',
        invoke: (f) =>
            Some(1)
                .mapAsync(async (v) => v)
                .filterAsync(f)
    },
    {
        name: 'AsyncOption.okOrElseAsync',
        invoke: (f) =>
            None()
                .mapAsync(async (v) => v)
                .okOrElseAsync(f)
    },
    {
        name: 'AsyncOption.unwrapOrElseAsync',
        invoke: (f) =>
            None<number>()
                .mapAsync(async (v) => v)
                .unwrapOrElseAsync(f)
    },
    {
        name: 'AsyncOption.mapOrElseAsync Some',
        invoke: (f) =>
            Some(1)
                .mapAsync(async (v) => v)
                .mapOrElseAsync(f, f)
    },
    {
        name: 'AsyncOption.mapOrElseAsync None',
        invoke: (f) =>
            None()
                .mapAsync(async (v) => v)
                .mapOrElseAsync(f, f)
    },
    {
        name: 'AsyncResult.mapAsync',
        invoke: (f) =>
            Ok(1)
                .mapAsync(async (v) => v)
                .mapAsync(f)
    },
    {
        name: 'AsyncResult.mapErrAsync',
        invoke: (f) =>
            Err(1)
                .mapAsync(async (v) => v)
                .mapErrAsync(f)
    },
    {
        name: 'AsyncResult.inspectAsync',
        invoke: (f) =>
            Ok(1)
                .mapAsync(async (v) => v)
                .inspectAsync(f)
    },
    {
        name: 'AsyncResult.inspectErrAsync',
        invoke: (f) =>
            Err(1)
                .mapAsync(async (v) => v)
                .inspectErrAsync(f)
    },
    {
        name: 'AsyncResult.andThenAsync',
        invoke: (f) =>
            Ok(1)
                .mapAsync(async (v) => v)
                .andThenAsync(f)
    },
    {
        name: 'AsyncResult.orElseAsync',
        invoke: (f) =>
            Err(1)
                .mapAsync(async (v) => v)
                .orElseAsync(f)
    },
    {
        name: 'AsyncResult.unwrapOrElseAsync',
        invoke: (f) =>
            Err(1)
                .mapAsync(async (v) => v)
                .unwrapOrElseAsync(f)
    },
    {
        name: 'AsyncResult.mapOrElseAsync Ok',
        invoke: (f) =>
            Ok(1)
                .mapAsync(async (v) => v)
                .mapOrElseAsync(f, f)
    },
    {
        name: 'AsyncResult.mapOrElseAsync Err',
        invoke: (f) =>
            Err(1)
                .mapAsync(async (v) => v)
                .mapOrElseAsync(f, f)
    }
];

describe('async wrapper callback failures', () => {
    test.each(failingCallbacks)(
        '$name propagates throws and rejections',
        async ({ invoke }) => {
            const failure = { code: 'callback' };
            await expect(
                Promise.resolve(
                    invoke(() => {
                        throw failure;
                    })
                )
            ).rejects.toBe(failure);
            await expect(
                Promise.resolve(invoke(() => Promise.reject(failure)))
            ).rejects.toBe(failure);
        }
    );
});

async function checkThen<T>(wrapper: PromiseLike<T>, value: T): Promise<void> {
    expect(await wrapper.then()).toBe(value);
    expect(await wrapper.then(null, null)).toBe(value);
    expect(await wrapper.then(() => Promise.resolve('mapped'))).toBe('mapped');
    const failure = { code: 'then' };
    await expect(
        wrapper.then(() => {
            throw failure;
        })
    ).rejects.toBe(failure);
}

test('public wrappers implement fulfillment, passthrough, and rejection handling in then', async () => {
    const inputOption = Some(5);
    const option: AsyncOption<number> = inputOption.inspectAsync(
        async () => {}
    );
    await checkThen(option, inputOption);
    expect(await option.then((value) => value.unwrap())).toBe(5);
    const inputResult = Ok(5);
    const result: AsyncResult<number, never> = inputResult.inspectAsync(
        async () => {}
    );
    await checkThen(result, inputResult);
    expect(await result.then((value) => value.unwrap())).toBe(5);

    const failure = { code: 'source' };
    const rejectedOption = Some(5).mapAsync(() => Promise.reject(failure));
    const rejectedResult = Ok(5).mapAsync(() => Promise.reject(failure));
    for (const wrapper of [rejectedOption, rejectedResult]) {
        expect(await wrapper.then(undefined, (reason: unknown) => reason)).toBe(
            failure
        );
        await expect(wrapper.then()).rejects.toBe(failure);
    }
});

test('catchUnwindAsync captures synchronous throws and adopts structural thenables', async () => {
    const failure = { code: 'sync' };
    expect(
        (
            await catchUnwindAsync(() => {
                throw failure;
            })()
        ).unwrapErr()
    ).toBe(failure);
    const promise = Promise.resolve(5);
    const thenable: PromiseLike<number> = { then: promise.then.bind(promise) };
    expect(await catchUnwindAsync(() => thenable)().unwrap()).toBe(5);
});

test('formatting reflects payloads and Option mutations', () => {
    expect(Ok(undefined).toString()).toBe('Ok(undefined)');
    expect(Err(null).toString()).toBe('Err(null)');
    expect(Object.prototype.toString.call(Ok(1))).toBe('[object Result Ok]');
    expect(Object.prototype.toString.call(Err(1))).toBe('[object Result Err]');
    const option = Some<number | undefined>(undefined);
    expect(option.toString()).toBe('Some(undefined)');
    expect(Object.prototype.toString.call(option)).toBe('[object Option Some]');
    option.take();
    expect(option.toString()).toBe('None');
    expect(Object.prototype.toString.call(option)).toBe('[object Option None]');
    option.insert(5);
    expect(option.toString()).toBe('Some(5)');
});
