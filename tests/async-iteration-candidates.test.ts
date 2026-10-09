import { describe, expect, expectTypeOf, test } from 'vitest';
import { iteratorCandidates } from '../bench/async-iteration';
import { Some, None, type Option } from '../src/option';
import { Ok, Err } from '../src/result';

for (const [name, create] of Object.entries(iteratorCandidates)) {
    describe(`async iteration candidate: ${name}`, () => {
        test.each([Some(5), None<number>(), Ok(5), Err('failure')])(
            'yields the same values as the synchronous iterator: %s',
            async (input) => {
                const iterator = create(Promise.resolve(input));
                expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
                const values: number[] = [];
                for await (const value of iterator) values.push(value);
                expect(values).toEqual([...input.iter()]);
                expect(await iterator.next()).toEqual({
                    done: true,
                    value: undefined
                });
            }
        );

        test.each([Some(null), Some(undefined), Ok(null), Ok(undefined)])(
            'preserves a nullish payload: %s',
            async (input) => {
                const iterator = create(Promise.resolve(input));
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

        test('awaits payloads and reports their resolved type', async () => {
            const payload = Promise.withResolvers<number>();
            const iterator = create(Promise.resolve(Some(payload.promise)));
            expectTypeOf(iterator).toEqualTypeOf<
                AsyncIterableIterator<number, undefined, unknown>
            >();
            const first = iterator.next();
            const second = iterator.next();
            const order: string[] = [];
            void first.then(() => order.push('first'));
            void second.then(() => order.push('second'));
            payload.resolve(5);
            expect(await first).toEqual({ done: false, value: 5 });
            expect(await second).toEqual({ done: true, value: undefined });
            expect(order).toEqual(['first', 'second']);
        });

        test('rejects only the first next when the source rejects', async () => {
            const source = Promise.withResolvers<Option<number>>();
            const failure = new Error('source failed');
            const iterator = create(source.promise);
            const first = expect(iterator.next()).rejects.toBe(failure);
            const second = iterator.next();
            source.reject(failure);
            await first;
            expect(await second).toEqual({ done: true, value: undefined });
        });

        test('propagates a rejected payload and then stays exhausted', async () => {
            const payload = Promise.withResolvers<number>();
            const iterator = create(Promise.resolve(Ok(payload.promise)));
            const failure = new Error('payload failed');
            const first = expect(iterator.next()).rejects.toBe(failure);
            payload.reject(failure);
            await first;
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        });

        test('return before next closes without reading the source', async () => {
            const input = Some(5);
            let reads = 0;
            const source = Promise.resolve(input);
            const iterator = create({
                then(onfulfilled, onrejected) {
                    reads++;
                    return source.then(onfulfilled, onrejected);
                }
            });
            expect(await iterator.return?.()).toEqual({
                done: true,
                value: undefined
            });
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
            expect(reads).toBe(0);
        });

        test('early loop exit closes the iterator', async () => {
            const iterator = create(Promise.resolve(Some(5)));
            for await (const value of iterator) {
                expect(value).toBe(5);
                break;
            }
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        });

        test('adopts structural thenables for the source and payload', async () => {
            const payload = Promise.resolve(5);
            const thenable: PromiseLike<number> = {
                then: payload.then.bind(payload)
            };
            const source = Promise.resolve(Some(thenable));
            const iterator = create({ then: source.then.bind(source) });
            expect(await iterator.next()).toEqual({ done: false, value: 5 });
        });

        test('queues return after a pending next', async () => {
            const source = Promise.withResolvers<Option<number>>();
            const iterator = create(source.promise);
            const order: string[] = [];
            const first = iterator.next().then((step) => {
                order.push('next');
                return step;
            });
            const closing = iterator.return?.().then((step) => {
                order.push('return');
                return step;
            });
            source.resolve(Some(5));
            expect(await first).toEqual({ done: false, value: 5 });
            expect(await closing).toEqual({ done: true, value: undefined });
            expect(order).toEqual(['next', 'return']);
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        });

        test('queues throw after a pending next and then closes', async () => {
            const source = Promise.withResolvers<Option<number>>();
            const iterator = create(source.promise);
            const failure = new Error('iterator failed');
            const first = iterator.next();
            // yield* forwards throw to the synchronous iterator, which has no
            // throw method. This difference rules delegation out as a replacement.
            const thrown =
                name === 'delegate'
                    ? expect(iterator.throw?.(failure)).rejects.toThrow(
                          TypeError
                      )
                    : expect(iterator.throw?.(failure)).rejects.toBe(failure);
            source.resolve(Some(5));
            expect(await first).toEqual({ done: false, value: 5 });
            await thrown;
            expect(await iterator.next()).toEqual({
                done: true,
                value: undefined
            });
        });
    });
}
