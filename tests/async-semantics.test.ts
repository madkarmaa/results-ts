import { describe, expect, test } from 'vitest';
import { AsyncOptionImpl } from '../src/async-option';
import { AsyncResultImpl, catchUnwindAsync } from '../src/async-result';
import { None, Some } from '../src/option';
import { Err, Ok } from '../src/result';

const deferredTransforms: ReadonlyArray<{
    name: string;
    start: (callback: () => Promise<number>) => PromiseLike<unknown>;
}> = [
    { name: 'Result.mapAsync', start: (callback) => Ok(1).mapAsync(callback) },
    {
        name: 'Result.mapErrAsync',
        start: (callback) => Err('error').mapErrAsync(callback)
    },
    {
        name: 'Option.mapAsync',
        start: (callback) => Some(1).mapAsync(callback)
    },
    {
        name: 'Option.okOrElseAsync',
        start: (callback) => None().okOrElseAsync(callback)
    },
    {
        name: 'Option.getOrInsertWithAsync',
        start: (callback) => None<number>().getOrInsertWithAsync(callback)
    },
    {
        name: 'catchUnwindAsync',
        start: (callback) => catchUnwindAsync(callback)()
    }
];

async function expectLazySubscriptions<T>(
    value: T,
    wrap: (source: PromiseLike<T>) => PromiseLike<T>
): Promise<void> {
    let subscriptions = 0;
    const source: PromiseLike<T> = {
        then(onfulfilled, onrejected) {
            subscriptions += 1;
            return Promise.resolve(value).then(onfulfilled, onrejected);
        }
    };
    const wrapped = wrap(source);
    expect(subscriptions).toBe(0);

    const first = wrapped.then();
    const second = wrapped.then();
    expect(subscriptions).toBe(0);
    const values = await Promise.all([first, second]);
    expect(subscriptions).toBe(2);
    expect(values[0]).toBe(value);
    expect(values[1]).toBe(value);

    expect(await wrapped).toBe(value);
    expect(subscriptions).toBe(3);
}

describe('async scheduling and identity', () => {
    test.each(deferredTransforms)(
        '$name schedules concurrent callbacks in microtask order',
        async ({ start }) => {
            const events: string[] = [];
            const firstGate = Promise.withResolvers<number>();
            const secondGate = Promise.withResolvers<number>();
            queueMicrotask(() => events.push('before'));
            const first = start(() => {
                events.push('first');
                return firstGate.promise;
            });
            queueMicrotask(() => events.push('between'));
            const second = start(() => {
                events.push('second');
                return secondGate.promise;
            });
            queueMicrotask(() => events.push('after'));

            expect(events).toEqual([]);
            await Promise.resolve();
            expect(events).toEqual([
                'before',
                'first',
                'between',
                'second',
                'after'
            ]);

            secondGate.resolve(2);
            await second;
            firstGate.resolve(1);
            await first;
        }
    );

    test('AsyncOption subscribes lazily to foreign thenables on every observation', async () => {
        await expectLazySubscriptions(
            Some({ id: 1 }),
            (source) => new AsyncOptionImpl(source)
        );
    });

    test('AsyncResult subscribes lazily to foreign thenables on every observation', async () => {
        await expectLazySubscriptions(
            Ok({ id: 1 }),
            (source) => new AsyncResultImpl(source)
        );
    });

    test('deferred Option callbacks receive the payload from invocation time', async () => {
        const original = { id: 1 };
        const replacement = { id: 2 };
        const option = Some(original);
        const seen: (typeof original)[] = [];
        const mapped = option.mapAsync((value) => {
            seen.push(value);
            return Promise.resolve(value);
        });
        const inspected = option.inspectAsync((value) => {
            seen.push(value);
            return Promise.resolve();
        });
        const chained = option.andThenAsync((value) => {
            seen.push(value);
            return Promise.resolve(Some(value));
        });
        option.replace(replacement);

        const [mapResult, inspectResult, chainResult] = await Promise.all([
            mapped,
            inspected,
            chained
        ]);
        expect(seen).toHaveLength(3);
        for (const value of seen) expect(value).toBe(original);
        expect(mapResult.unwrap()).toBe(original);
        expect(chainResult.unwrap()).toBe(original);
        expect(inspectResult).toBe(option);
        expect(inspectResult.unwrap()).toBe(replacement);
    });

    test('filterAsync tests the original payload and returns the mutated receiver', async () => {
        const original = { id: 1 };
        const option = Some(original);
        const gate = Promise.withResolvers<boolean>();
        let seen: typeof original | undefined;
        const filtered = option.filterAsync((value) => {
            seen = value;
            return gate.promise;
        });
        option.replace({ id: 2 });
        await Promise.resolve();
        expect(seen).toBe(original);
        option.take();
        gate.resolve(true);

        const result = await filtered;
        expect(result).toBe(option);
        expect(result.isNone()).toBe(true);
    });

    test('inactive async Result transforms return fresh results and inspections reuse the receiver', async () => {
        const ok = Ok({ id: 1 });
        const err = Err({ code: 'failure' });
        let calls = 0;
        const unused = () => {
            calls += 1;
            return Promise.resolve(0);
        };
        const mappedError = await err.mapAsync(unused);
        const mappedOk = await ok.mapErrAsync(unused);
        const chainedError = await err.andThenAsync(() => {
            calls += 1;
            return Promise.resolve(Ok(0));
        });
        const recoveredOk = await ok.orElseAsync(() => {
            calls += 1;
            return Promise.resolve(Ok(0));
        });

        expect(calls).toBe(0);
        expect(mappedError).not.toBe(err);
        expect(mappedError.unwrapErr()).toBe(err.unwrapErr());
        expect(mappedOk).not.toBe(ok);
        expect(mappedOk.unwrap()).toBe(ok.unwrap());
        expect(chainedError).not.toBe(err);
        expect(chainedError.unwrapErr()).toBe(err.unwrapErr());
        expect(recoveredOk).not.toBe(ok);
        expect(recoveredOk.unwrap()).toBe(ok.unwrap());
        expect(await ok.inspectAsync(() => Promise.resolve())).toBe(ok);
        expect(await err.inspectAsync(() => Promise.resolve())).toBe(err);
        expect(await ok.inspectErrAsync(() => Promise.resolve())).toBe(ok);
        expect(await err.inspectErrAsync(() => Promise.resolve())).toBe(err);
    });

    test('inactive async Option transforms preserve fresh and reused result identities', async () => {
        const none = None<number>();
        const some = Some(1);
        let calls = 0;
        const mapped = await none.mapAsync(() => {
            calls += 1;
            return Promise.resolve(1);
        });
        const chained = await none.andThenAsync(() => {
            calls += 1;
            return Promise.resolve(Some(1));
        });
        const filtered = await none.filterAsync(() => {
            calls += 1;
            return Promise.resolve(true);
        });

        expect(calls).toBe(0);
        for (const result of [mapped, chained, filtered]) {
            expect(result).not.toBe(none);
            expect(result.isNone()).toBe(true);
            result.insert(42);
        }
        expect(none.isNone()).toBe(true);
        expect(await none.inspectAsync(() => Promise.resolve())).toBe(none);
        expect(await some.inspectAsync(() => Promise.resolve())).toBe(some);
        expect(await some.orElseAsync(() => Promise.resolve(None()))).toBe(
            some
        );
    });
});
