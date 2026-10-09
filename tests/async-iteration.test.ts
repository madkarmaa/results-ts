import { describe, expect, expectTypeOf, test, vi } from 'vitest';
import { Some, None } from '../src/option';
import { Ok, Err } from '../src/result';

describe('async iter', () => {
    test.each([Some(5), None<number>(), Ok(5), Err('failure')])(
        'yields the contained value once, or nothing: %s',
        async (input) => {
            const wrapper = input.inspectAsync(() => Promise.resolve());
            const values: number[] = [];
            for await (const value of wrapper.iter()) values.push(value);
            expect(values).toEqual([...input.iter()]);

            const iterator = wrapper.iter();
            expectTypeOf(iterator).toEqualTypeOf<
                AsyncIterableIterator<number, undefined, unknown>
            >();
            expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
            const first = iterator.next();
            const second = iterator.next();
            expect(await first).toEqual(
                [...input.iter()].length
                    ? { done: false, value: 5 }
                    : { done: true, value: undefined }
            );
            expect(await second).toEqual({ done: true, value: undefined });
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        }
    );

    test.each([Some(null), Some(undefined), Ok(null), Ok(undefined)])(
        'preserves nullish payloads: %s',
        async (input) => {
            const iterator = input.inspectAsync(() => Promise.resolve()).iter();
            expect(await iterator.next()).toEqual({
                done: false,
                value: input.unwrap()
            });
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        }
    );

    test.each([Some(5), Ok(5)])('waits for the source: %s', async (input) => {
        const gate = Promise.withResolvers<void>();
        const inspect = vi.fn(() => gate.promise);
        const wrapper = input.inspectAsync(inspect);
        let settled = false;
        const next = wrapper
            .iter()
            .next()
            .then((value) => {
                settled = true;
                return value;
            });
        await vi.waitFor(() => expect(inspect).toHaveBeenCalledOnce());
        expect(settled).toBe(false);
        gate.resolve();
        expect(await next).toEqual({ done: false, value: 5 });
    });

    test.each([Some(5), Ok(5)])(
        'propagates source rejection: %s',
        async (input) => {
            const failure = new Error('source failed');
            const iterator = input
                .mapAsync(() => Promise.reject(failure))
                .iter();
            const first = expect(iterator.next()).rejects.toBe(failure);
            const second = iterator.next();
            await first;
            expect(await second).toEqual({ done: true, value: undefined });
        }
    );

    test.each(['Option', 'Result'])(
        '%s awaits promise-like payloads',
        async (kind) => {
            const payload = Promise.withResolvers<number>();
            const thenable: PromiseLike<number> = {
                then: payload.promise.then.bind(payload.promise)
            };
            const input = kind === 'Option' ? Some(thenable) : Ok(thenable);
            const iterator = input.inspectAsync(() => Promise.resolve()).iter();
            expectTypeOf(iterator).toEqualTypeOf<
                AsyncIterableIterator<number, undefined, unknown>
            >();
            const order: string[] = [];
            const first = iterator.next().then((value) => {
                order.push('first');
                return value;
            });
            const second = iterator.next().then((value) => {
                order.push('second');
                return value;
            });
            payload.resolve(5);
            expect(await first).toEqual({ done: false, value: 5 });
            expect(await second).toEqual({ done: true, value: undefined });
            expect(order).toEqual(['first', 'second']);
        }
    );

    test.each(['Option', 'Result'])(
        '%s propagates payload rejection',
        async (kind) => {
            const payload = Promise.withResolvers<number>();
            const input =
                kind === 'Option' ? Some(payload.promise) : Ok(payload.promise);
            const iterator = input.inspectAsync(() => Promise.resolve()).iter();
            const failure = new Error('payload failed');
            const rejected = expect(iterator.next()).rejects.toBe(failure);
            payload.reject(failure);
            await rejected;
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        }
    );

    test.each([Some(5), Ok(5)])(
        'closes on early loop exit: %s',
        async (input) => {
            const iterator = input.inspectAsync(() => Promise.resolve()).iter();
            for await (const value of iterator) {
                expect(value).toBe(5);
                break;
            }
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        }
    );

    test('each call observes the current resolved Option state', async () => {
        const input = Some(5);
        const wrapper = input.inspectAsync(() => Promise.resolve());
        expect(await wrapper.iter().next()).toEqual({ done: false, value: 5 });
        input.take();
        expect(await wrapper.iter().next()).toEqual({
            done: true,
            value: undefined
        });
        input.insert(10);
        expect(await wrapper.iter().next()).toEqual({ done: false, value: 10 });
    });
});
