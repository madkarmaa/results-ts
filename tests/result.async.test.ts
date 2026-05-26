import { describe, test, expect } from 'vitest';
import { Ok, Err } from '../src/result';

describe('Result async methods', () => {
    test('mapAsync', async () => {
        const res1 = await Ok(5).mapAsync(async (x) => x * 2);
        expect(res1.unwrap()).toBe(10);

        const res2 = await Err({ code: 'ERR' }).mapAsync(
            async (x: number) => x * 2
        );
        expect(res2.isErr()).toBe(true);

        const res3 = await Ok(5).mapAsync(async () => null);
        expect(res3.unwrap()).toBeNull();

        const res4 = await Ok(5).mapAsync(async () => undefined);
        expect(res4.unwrap()).toBeUndefined();
    });

    test('mapErrAsync', async () => {
        const res1 = await Err({ code: 'ERR' }).mapErrAsync(async (err) => ({
            code: `${err.code}_NEW` as const
        }));
        expect(res1.unwrapErr().code).toBe('ERR_NEW');

        const res2 = await Ok(5).mapErrAsync(async () => ({
            code: 'ERR' as const
        }));
        expect(res2.unwrap()).toBe(5);
    });

    test('mapOrElseAsync', async () => {
        expect(
            await Ok(7).mapOrElseAsync(
                async () => 10,
                async (x) => x * 2
            )
        ).toBe(14);

        expect(
            await Err({ code: 'ERR' }).mapOrElseAsync(
                async (err) => err.code.length,
                async (x: number) => x * 2
            )
        ).toBe(3);
    });

    test('andThenAsync', async () => {
        const res1 = await Ok(5).andThenAsync(async (x) => Ok(x * 2));
        expect(res1.unwrap()).toBe(10);

        const res2 = await Ok(5).andThenAsync(async () => Err({ code: 'ERR' }));
        expect(res2.unwrapErr()).toEqual({ code: 'ERR' });

        const res3 = await Err({ code: 'E1' }).andThenAsync(async (x: number) =>
            Ok(x * 2)
        );
        expect(res3.unwrapErr().code).toBe('E1');
    });

    test('orElseAsync', async () => {
        const res1 = await Ok(5).orElseAsync(async () => Ok(10));
        expect(res1.unwrap()).toBe(5);

        const res2 = await Err({ code: 'E1' }).orElseAsync(async () => Ok(10));
        expect(res2.unwrap()).toBe(10);

        const res3 = await Err({ code: 'E1' }).orElseAsync(async (err) =>
            Err({ code: `${err.code}_2` as const })
        );
        expect(res3.unwrapErr().code).toBe('E1_2');
    });

    test('inspectAsync', async () => {
        let val = 0;
        const res1 = await Ok(5).inspectAsync(async (x) => {
            val = x;
        });
        expect(val).toBe(5);
        expect(res1.unwrap()).toBe(5);

        let called = false;
        await Err({ code: 'ERR' }).inspectAsync(async () => {
            called = true;
        });
        expect(called).toBe(false);
    });

    test('inspectErrAsync', async () => {
        let errCode = '';
        const res1 = await Err({ code: 'ERR' }).inspectErrAsync(async (err) => {
            errCode = err.code;
        });
        expect(errCode).toBe('ERR');
        expect(res1.unwrapErr()).toEqual({ code: 'ERR' });

        let called = false;
        await Ok(5).inspectErrAsync(async () => {
            called = true;
        });
        expect(called).toBe(false);
    });

    test('unwrapOrElseAsync', async () => {
        expect(await Ok(5).unwrapOrElseAsync(async () => 10)).toBe(5);

        expect(
            await Err({ code: 'ERR' }).unwrapOrElseAsync(
                async (err) => err.code.length
            )
        ).toBe(3);
    });

    describe('Complex async usage tests', () => {
        test('Async pipeline with andThenAsync and mapAsync', async () => {
            const fetchMultiplier = async (id: number) => id * 10;

            const step1 = await Ok(3).andThenAsync(async (x) =>
                x > 0 ? Ok(x) : Err({ code: 'NON_POSITIVE' })
            );
            const step2 = await step1.mapAsync(fetchMultiplier);
            expect(step2.map((x) => x + 1).unwrap()).toBe(31);
        });

        test('Async error recovery with orElseAsync', async () => {
            const recover = async (code: string) =>
                code === 'RECOVERABLE' ? 42 : 0;

            const result = await Err({
                code: 'RECOVERABLE' as const
            }).orElseAsync(async (err) =>
                err.code === 'RECOVERABLE'
                    ? Ok(await recover(err.code))
                    : Err(err)
            );

            expect(result.unwrap()).toBe(42);
        });

        test('Inspect side effects do not alter result in pipeline', async () => {
            const log: number[] = [];

            const inspected = await Ok(10).inspectAsync(async (x) => {
                log.push(x);
            });
            const mapped = await inspected.mapAsync(async (x) => x * 2);
            expect(mapped.unwrap()).toBe(20);
            expect(log).toEqual([10]);
        });

        test('mapErrAsync composes with andThenAsync in error path', async () => {
            const result = await Ok(5)
                .andThenAsync(async (x) =>
                    x > 10 ? Ok(x) : Err({ code: 'TOO_SMALL' as const })
                )
                .then((r) =>
                    r.mapErrAsync(async (err) => ({
                        ...err,
                        retryable: true as const
                    }))
                );

            expect(result.unwrapErr()).toEqual({
                code: 'TOO_SMALL',
                retryable: true
            });
        });
    });
});
