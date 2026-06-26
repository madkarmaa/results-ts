import { describe, test, expect } from 'vitest';
import { Ok, Err, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';
import { catchUnwindAsync } from '../src/async-result';
import {
    InvalidArgumentError,
    FlattenError,
    PanicError,
    TransposeError
} from '../src/errors';

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

    test('isOk', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.isOk()).toBe(true);
        expect(await err.isOk()).toBe(false);
    });

    test('isOkAnd', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.isOkAnd((val) => val === 5)).toBe(true);
        expect(await ok.isOkAnd((val) => val === 10)).toBe(false);
        expect(await err.isOkAnd((val) => val === 5)).toBe(false);
    });

    test('isErr', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await err.isErr()).toBe(true);
        expect(await ok.isErr()).toBe(false);
    });

    test('isErrAnd', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await err.isErrAnd((e) => e.code === 'ERR')).toBe(true);
        // @ts-expect-error - 'ERR' is the only valid code, so this condition is always false
        expect(await err.isErrAnd((e) => e.code === 'OTHER')).toBe(false);
        expect(await ok.isErrAnd(() => true)).toBe(false);
    });

    test('ok', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.ok().unwrap()).toBe(5);
        expect(await err.ok().isNone()).toBe(true);
    });

    test('err', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await err.err().unwrap()).toEqual({ code: 'ERR' });
        expect(await ok.err().isNone()).toBe(true);
    });

    test('map', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' }).mapAsync(async (x: number) => x);

        expect(await ok.map((x) => x * 2).unwrap()).toBe(10);
        expect(await err.map((x: number) => x * 2).isErr()).toBe(true);
        expect(await ok.map(() => null).unwrap()).toBeNull();
        expect(await ok.map(() => undefined).unwrap()).toBeUndefined();
    });

    test('mapOr', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' }).mapAsync(async (x: number) => x);

        expect(await ok.mapOr(0, (x) => x * 2)).toBe(10);
        expect(await err.mapOr(10, (x: number) => x * 2)).toBe(10);
    });

    test('mapOrElse', async () => {
        const ok = Ok(7).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' }).mapAsync(async (x: number) => x);

        expect(
            await ok.mapOrElse(
                () => 10,
                (x) => x * 2
            )
        ).toBe(14);
        expect(
            await err.mapOrElse(
                (e) => e.code.length,
                (x: number) => x * 2
            )
        ).toBe(3);
    });

    test('mapErr', async () => {
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );
        const ok = Ok(5).mapAsync(async (x) => x);

        expect(
            (
                await err
                    .mapErr((e) => ({ code: `${e.code}_NEW` as const }))
                    .unwrapErr()
            ).code
        ).toBe('ERR_NEW');
        expect(await ok.mapErr(() => ({ code: 'ERR' as const })).unwrap()).toBe(
            5
        );
    });

    test('inspect', async () => {
        let val = 0;
        const ok = Ok(5).mapAsync(async (x) => x);
        const inspected = ok.inspect((x) => {
            val = x;
        });
        expect(await inspected.unwrap()).toBe(5);
        expect(val).toBe(5);

        let called = false;
        const err = Err({ code: 'ERR' }).mapAsync(async (x: number) => x);
        await err
            .inspect(() => {
                called = true;
            })
            .isErr();
        expect(called).toBe(false);
    });

    test('inspectErr', async () => {
        let errCode = '';
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );
        const inspected = err.inspectErr((e) => {
            errCode = e.code;
        });
        expect(await inspected.unwrapErr()).toEqual({ code: 'ERR' });
        expect(errCode).toBe('ERR');

        let called = false;
        const ok = Ok(5).mapAsync(async (x) => x);
        await ok
            .inspectErr(() => {
                called = true;
            })
            .isOk();
        expect(called).toBe(false);
    });

    test('expect', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.expect('Should not fail')).toBe(5);
        await expect(err.expect('Failed')).rejects.toThrow(
            new PanicError('Failed', { cause: { code: 'ERR' } })
        );
    });

    test('unwrap', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.unwrap()).toBe(5);
        await expect(err.unwrap()).rejects.toThrow(
            new PanicError('called `Result.unwrap()` on an `Err` value', {
                cause: { code: 'ERR' }
            })
        );
    });

    test('expectErr', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect((await err.expectErr('Should not fail')).code).toBe('ERR');
        await expect(ok.expectErr('Failed')).rejects.toThrow(
            new PanicError('Failed: "5"')
        );
    });

    test('unwrapErr', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect((await err.unwrapErr()).code).toBe('ERR');
        await expect(ok.unwrapErr()).rejects.toThrow(
            new PanicError('called `Result.unwrapErr()` on an `Ok` value: "5"')
        );
    });

    test('and', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'E1' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.and(Ok(10)).unwrap()).toBe(10);
        expect(await err.and(Ok(10)).unwrapErr()).toEqual({ code: 'E1' });
        expect(await ok.and(Err({ code: 'E2' as const })).unwrapErr()).toEqual({
            code: 'E2'
        });
    });

    test('andThen', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'E1' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.andThen((x) => Ok(x * 2)).unwrap()).toBe(10);
        expect(await err.andThen((x: number) => Ok(x * 2)).unwrapErr()).toEqual(
            { code: 'E1' }
        );
    });

    test('or', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'E1' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.or(Ok(10)).unwrap()).toBe(5);
        expect(await err.or(Ok(10)).unwrap()).toBe(10);
    });

    test('orElse', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'E1' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.orElse(() => Ok(10)).unwrap()).toBe(5);
        expect(await err.orElse(() => Ok(10)).unwrap()).toBe(10);
    });

    test('unwrapOr', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.unwrapOr(10)).toBe(5);
        expect(await err.unwrapOr(10)).toBe(10);
    });

    test('unwrapOrElse', async () => {
        const ok = Ok(5).mapAsync(async (x) => x);
        const err = Err({ code: 'ERR' as const }).mapAsync(
            async (x: number) => x
        );

        expect(await ok.unwrapOrElse(() => 10)).toBe(5);
        expect(await err.unwrapOrElse((e) => e.code.length)).toBe(3);
    });

    test('flatten', async () => {
        const okNested = Ok(Ok(42)).mapAsync(async (x) => x);
        expect(await okNested.flatten().unwrap()).toBe(42);

        const errNested = Ok(Err({ code: 'ERR' as const })).mapAsync(
            async (x) => x
        );
        expect(await errNested.flatten().unwrapErr()).toEqual({ code: 'ERR' });

        const invalid = Ok(42).mapAsync(async (x) => x);
        // @ts-expect-error - flatten should only be called on AsyncResult<Result<T, E>, E>
        await expect(invalid.flatten().unwrap()).rejects.toThrow(FlattenError);
    });

    test('transpose', async () => {
        const someNested = Ok(Some(42)).mapAsync(async (x) => x);
        const someTransposed = await someNested.transpose();
        expect(await someTransposed.unwrap().unwrap()).toBe(42);

        const noneNested = Ok(None<number>()).mapAsync(async (x) => x);
        expect(await noneNested.transpose().isNone()).toBe(true);

        const errNested = (
            Err('oops') as Result<Option<number>, string>
        ).mapAsync(async (x) => x);
        const errTransposed = await errNested.transpose();
        expect(await errTransposed.unwrap().unwrapErr()).toBe('oops');

        const invalid = Ok(42).mapAsync(async (x) => x);
        // @ts-expect-error - transpose should only be called on AsyncResult<Option<T>, E>
        await expect(invalid.transpose().unwrap()).rejects.toThrow(
            TransposeError
        );
    });

    test('match', async () => {
        expect(
            await Ok(5)
                .mapAsync(async (x) => x)
                .match({
                    Ok: (val) => `Value is ${val}`,
                    // @ts-expect-error - Result is Ok, err type is never
                    Err: (err) => `Error code is ${err.code}`
                })
        ).toBe('Value is 5');

        expect(
            await Err({ code: 'ERR' })
                .mapAsync(async (x: number) => x)
                .match({
                    Ok: (val) => `Value is ${val}`,
                    Err: (err) => `Error code is ${err.code}`
                })
        ).toBe('Error code is ERR');
    });

    describe('Complex async usage tests', () => {
        test('Async pipeline with andThenAsync and mapAsync', async () => {
            const fetchMultiplier = async (id: number) => id * 10;

            const result = await Ok(3)
                .andThenAsync(async (x) =>
                    x > 0 ? Ok(x) : Err({ code: 'NON_POSITIVE' })
                )
                .mapAsync(fetchMultiplier)
                .map((x) => x + 1)
                .unwrap();

            expect(result).toBe(31);
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

            const result = await Ok(10)
                .inspectAsync(async (x) => {
                    log.push(x);
                })
                .mapAsync(async (x) => x * 2)
                .unwrap();

            expect(result).toBe(20);
            expect(log).toEqual([10]);
        });

        test('mapErrAsync composes with andThenAsync in error path', async () => {
            const result = await Ok(5)
                .andThenAsync(async (x) =>
                    x > 10 ? Ok(x) : Err({ code: 'TOO_SMALL' as const })
                )
                .mapErrAsync(async (err) => ({
                    ...err,
                    retryable: true as const
                }))
                .unwrapErr();

            expect(result).toEqual({
                code: 'TOO_SMALL',
                retryable: true
            });
        });

        test('Round-trip chaining', async () => {
            const okResult = await Ok(5)
                .andThenAsync(async (x) => Ok(x * 2))
                .orElseAsync(async () => Ok(0))
                .mapAsync(async (x) => x + 1)
                .unwrap();
            expect(okResult).toBe(11);

            const errResult = await Err({ code: 'ERR' })
                .andThenAsync(async (x: number) => Ok(x * 2))
                .orElseAsync(async () => Ok(0))
                .mapAsync(async (x) => x + 1)
                .unwrap();
            expect(errResult).toBe(1);
        });
    });

    describe('catchUnwindAsync', () => {
        test('wraps a resolved promise into Ok', async () => {
            const add = catchUnwindAsync(async (a: number, b: number) => a + b);
            const res = await add(2, 3);
            expect(res.unwrap()).toBe(5);
            expect(res.isOk()).toBe(true);
        });

        test('wraps a sync return value from fn into Ok', async () => {
            const fn = catchUnwindAsync((n: number) => n * 2);
            const res = await fn(21);
            expect(res.unwrap()).toBe(42);
        });

        test('catches promise rejection into Err when no handler given', async () => {
            const fn = catchUnwindAsync(async () => {
                throw new Error('rej');
            });
            const res = await fn();
            expect(res.isErr()).toBe(true);
            expect((res.unwrapErr() as Error).message).toBe('rej');
        });

        test('catches non-Error rejections as unknown', async () => {
            const throwString = catchUnwindAsync(async () => {
                throw 'literal';
            });
            expect((await throwString()).unwrapErr()).toBe('literal');

            const throwNumber = catchUnwindAsync(async () => {
                throw 7;
            });
            expect((await throwNumber()).unwrapErr()).toBe(7);
        });

        test('uses onThrow to normalize the error type', async () => {
            const fn = catchUnwindAsync(
                async () => {
                    throw new Error('nope');
                },
                (thrown) =>
                    thrown instanceof Error ? thrown.message : 'unknown'
            );
            const res = await fn();
            expect(res.unwrapErr()).toBe('nope');
        });

        test('passes arguments through to fn and onThrow', async () => {
            const recorded: number[] = [];
            const fn = catchUnwindAsync(
                async (a: number, b: number) => {
                    if (b === 0) throw new Error(`div by zero: ${a}`);
                    return a / b;
                },
                (_thrown, a, b) => {
                    recorded.push(a, b);
                    return { code: 'DIV_ZERO' as const, a, b };
                }
            );

            expect((await fn(10, 2)).unwrap()).toBe(5);
            const err = await fn(10, 0);
            expect(err.unwrapErr()).toEqual({ code: 'DIV_ZERO', a: 10, b: 0 });
            expect(recorded).toEqual([10, 0]);
        });

        test('preserves `this` binding of the returned function', async () => {
            const obj = { x: 10 };
            const fn = catchUnwindAsync(
                function (this: { x: number }, n: number) {
                    return Promise.resolve(this.x + n);
                },
                (thrown) => (thrown instanceof Error ? thrown.message : 'err')
            );
            expect((await fn.call(obj, 5)).unwrap()).toBe(15);
        });

        test('rejects non-function fn and onThrow', () => {
            expect(() => catchUnwindAsync('nope' as never)).toThrow(
                InvalidArgumentError
            );
            expect(() =>
                catchUnwindAsync(async () => 1, 'nope' as never)
            ).toThrow(InvalidArgumentError);
        });

        test('wraps fetch-like promise realistically', async () => {
            const fakeFetch = catchUnwindAsync(
                async (url: string) => {
                    if (url === 'bad') throw new Error('network');
                    return { status: 200, url };
                },
                (thrown) =>
                    thrown instanceof Error ? thrown.message : 'fetch error'
            );
            expect((await fakeFetch('good')).unwrap()).toEqual({
                status: 200,
                url: 'good'
            });
            expect((await fakeFetch('bad')).unwrapErr()).toBe('network');
        });

        test('returns an AsyncResult that is awaitable and chainable', async () => {
            const fn = catchUnwindAsync(async (n: number) => n + 1);
            const chained = await fn(1)
                .map((x) => x * 10)
                .unwrap();
            expect(chained).toBe(20);
        });
    });
});
