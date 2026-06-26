import { describe, test, expect } from 'vitest';
import { Ok, Err, catchUnwind, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';
import {
    FlattenError,
    InvalidArgumentError,
    PanicError,
    TransposeError
} from '../src/errors';

describe('Result', () => {
    test('construction', () => {
        expect(Ok(5)).toBeInstanceOf(Object);
        expect(Err({ code: 'ERR' })).toBeInstanceOf(Object);
        const okNull = Ok(null);
        expect(okNull.unwrap()).toBeNull();

        const okUndefined = Ok(undefined);
        expect(okUndefined.unwrap()).toBeUndefined();
    });
    test('isOk', () => {
        expect(Ok(5).isOk()).toBe(true);
        expect(Err({ code: 'ERR' }).isOk()).toBe(false);
    });

    test('isOkAnd', () => {
        expect(Ok(5).isOkAnd((val) => val === 5)).toBe(true);
        expect(Ok(5).isOkAnd((val) => val === 10)).toBe(false);
        expect(Err({ code: 'ERR' }).isOkAnd((_) => true)).toBe(false);
        const result = Ok(Math.random());
        if (result.isOkAnd((val) => val === 0.5)) {
            result.unwrap() satisfies 0.5;
        }
    });

    test('isErr', () => {
        expect(Err({ code: 'ERR' }).isErr()).toBe(true);
        expect(Ok(5).isErr()).toBe(false);
    });

    test('isErrAnd', () => {
        expect(
            Err<{ code: 'ERR' }>({ code: 'ERR' }).isErrAnd(
                (err) => err.code === 'ERR'
            )
        ).toBe(true);
        expect(
            Err<{ code: 'ERR' }>({ code: 'ERR' }).isErrAnd(
                // @ts-expect-error - err.code is typed as literal "ERR"
                (err) => err.code === 'OTHER'
            )
        ).toBe(false);
        expect(Ok(5).isErrAnd((_) => true)).toBe(false);
        const result = Err<{ code: 'ERR' } | { code: 'OTHER' }>(
            Math.random() > 0.5 ? { code: 'ERR' } : { code: 'OTHER' }
        );
        if (result.isErrAnd((err) => err.code === 'ERR')) {
            result.unwrapErr() satisfies { code: 'ERR' };
        }
    });

    test('ok', () => {
        expect(Ok(5).ok().unwrap()).toBe(5);
        expect(Err({ code: 'ERR' }).ok().isNone()).toBe(true);
    });

    test('err', () => {
        expect(Err({ code: 'ERR' }).err().unwrap()).toEqual({ code: 'ERR' });
        expect(Ok(5).err().isNone()).toBe(true);
    });

    test('map', () => {
        expect(
            Ok(5)
                .map((x) => x * 2)
                .unwrap()
        ).toBe(10);
        expect(
            Err({ code: 'ERR' })
                .map((x) => x * 2)
                .isErr()
        ).toBe(true);
        expect(
            Ok(5)
                .map(() => null)
                .unwrap()
        ).toBeNull();
        expect(
            Ok(5)
                .map(() => undefined)
                .unwrap()
        ).toBeUndefined();
    });

    test('mapOr', () => {
        expect(Ok(5).mapOr(10, (x) => x * 2)).toBe(10);
        expect(Err({ code: 'ERR' }).mapOr(10, (x) => x * 2)).toBe(10);
    });

    test('mapOrElse', () => {
        expect(
            Ok(7).mapOrElse(
                () => 10,
                (x) => x * 2
            )
        ).toBe(14);
        expect(
            Err({ code: 'ERR' }).mapOrElse(
                (err) => err.code.length,
                (x) => x * 2
            )
        ).toBe(3);
    });

    test('mapErr', () => {
        expect(
            Err({ code: 'ERR' })
                .mapErr((err) => ({ code: `${err.code}_NEW` as const }))
                .unwrapErr().code
        ).toBe('ERR_NEW');
        expect(
            Ok(5)
                .mapErr(() => ({ code: 'ERR' }))
                .unwrap()
        ).toBe(5);
    });

    test('inspect', () => {
        let val = 0;
        Ok(5).inspect((x) => (val = x));
        expect(val).toBe(5);
    });

    test('inspectErr', () => {
        let errCode = '';
        Err({ code: 'ERR' }).inspectErr((err) => (errCode = err.code));
        expect(errCode).toBe('ERR');
    });

    test('iter', () => {
        expect([...Ok(5).iter()]).toEqual([5]);
        expect([...Err({ code: 'ERR' }).iter()]).toEqual([]);
    });

    test('expect', () => {
        expect(Ok(5).expect('Should not fail')).toBe(5);
        expect(() => Err({ code: 'ERR' }).expect('Failed')).toThrow(
            new PanicError('Failed', { cause: { code: 'ERR' } })
        );
    });

    test('unwrap', () => {
        expect(Ok(5).unwrap()).toBe(5);
        expect(() => Err({ code: 'ERR' }).unwrap()).toThrow(
            new PanicError('called `Result.unwrap()` on an `Err` value', {
                cause: { code: 'ERR' }
            })
        );
    });

    test('expectErr', () => {
        expect(Err({ code: 'ERR' }).expectErr('Should not fail').code).toBe(
            'ERR'
        );
        expect(() => Ok(5).expectErr('Failed')).toThrow(
            new PanicError('Failed: "5"')
        );
    });

    test('unwrapErr', () => {
        expect(Err({ code: 'ERR' }).unwrapErr().code).toBe('ERR');
        expect(() => Ok(5).unwrapErr()).toThrow(
            new PanicError('called `Result.unwrapErr()` on an `Ok` value: "5"')
        );
    });

    test('and', () => {
        expect(Ok(5).and(Ok(10)).unwrap()).toBe(10);
        expect(Err({ code: 'E1' }).and(Ok(10)).unwrapErr().code).toBe('E1');
        expect(
            Ok(5)
                .and(Err({ code: 'E2' }))
                .unwrapErr().code
        ).toBe('E2');
    });

    test('andThen', () => {
        expect(
            Ok(5)
                .andThen((x) => Ok(x * 2))
                .unwrap()
        ).toBe(10);
        expect(
            Err({ code: 'E1' })
                .andThen((x) => Ok(x * 2))
                .unwrapErr().code
        ).toBe('E1');
    });

    test('or', () => {
        expect(Ok(5).or(Ok(10)).unwrap()).toBe(5);
        expect(Err({ code: 'E1' }).or(Ok(10)).unwrap()).toBe(10);
    });

    test('orElse', () => {
        expect(
            Ok(5)
                .orElse(() => Ok(10))
                .unwrap()
        ).toBe(5);
        expect(
            Err({ code: 'E1' })
                .orElse(() => Ok(10))
                .unwrap()
        ).toBe(10);
    });

    test('unwrapOr', () => {
        expect(Ok(5).unwrapOr(10)).toBe(5);
        expect(Err({ code: 'ERR' }).unwrapOr(10)).toBe(10);
    });

    test('unwrapOrElse', () => {
        expect(Ok(5).unwrapOrElse(() => 10)).toBe(5);
        expect(
            Err({ code: 'ERR' }).unwrapOrElse((err) => err.code.length)
        ).toBe(3);
    });

    test('flatten', () => {
        expect(Ok(Ok(42)).flatten().unwrap()).toBe(42);
        expect(
            Ok(Err({ code: 'ERR' }))
                .flatten()
                .unwrapErr()
        ).toEqual({ code: 'ERR' });
        expect(
            Ok(Ok(Ok(42)))
                .flatten()
                .flatten()
                .unwrap()
        ).toBe(42);
        expect(Err({ code: 'ERR' }).flatten().unwrapErr()).toEqual({
            code: 'ERR'
        });
        // @ts-expect-error - flatten should only be called on Result<Result<T, E>, E>
        expect(() => Ok(42).flatten()).toThrow(FlattenError);
    });

    test('flatten accepts a duck-typed (cross-realm) Result', () => {
        // Mimics an inner Result created in a different realm / from a
        // duplicate install where `instanceof` would fail. Only the
        // `_isOk` discriminator is carried.
        const duckTypedOk = { _isOk: true } as unknown as Result<
            number,
            string
        >;
        expect((Ok(duckTypedOk).flatten() as { _isOk: boolean })._isOk).toBe(
            true
        );

        const duckTypedErr = { _isOk: false } as unknown as Result<
            number,
            string
        >;
        expect((Ok(duckTypedErr).flatten() as { _isOk: boolean })._isOk).toBe(
            false
        );
    });

    test('transpose', () => {
        expect(Ok(Some(42)).transpose().unwrap().unwrap()).toBe(42);
        expect(Ok(None<number>()).transpose().isNone()).toBe(true);
        expect(
            (Err('oops') as Result<Option<number>, string>)
                .transpose()
                .unwrap()
                .unwrapErr()
        ).toBe('oops');
        // @ts-expect-error - transpose should only be called on Result<Option<T>, E>
        expect(() => Ok(42).transpose()).toThrow(TransposeError);
    });

    test('match', () => {
        expect(
            Ok(5).match({
                Ok: (val) => `Value is ${val}`,
                // @ts-expect-error - Result is Ok, err type is never
                Err: (err) => `Error code is ${err.code}`
            })
        ).toBe('Value is 5');

        expect(
            Err({ code: 'ERR' }).match({
                Ok: (val) => `Value is ${val}`,
                Err: (err) => `Error code is ${err.code}`
            })
        ).toBe('Error code is ERR');
    });

    describe('and/or structural validation', () => {
        // A duck-typed Result: carries the `_isOk` discriminator the structural
        // check looks for. Mimics a Result created in a different realm / from
        // a duplicate install where `instanceof` would fail.
        const duckTypedOk = { _isOk: true } as unknown as ReturnType<
            typeof Ok<number>
        >;
        const duckTypedErr = { _isOk: false } as unknown as ReturnType<
            typeof Err<{ code: string }>
        >;

        test('and accepts a duck-typed Result', () => {
            expect((Ok(5).and(duckTypedOk) as { _isOk: boolean })._isOk).toBe(
                true
            );
            expect((Ok(5).and(duckTypedErr) as { _isOk: boolean })._isOk).toBe(
                false
            );
            // Err self short-circuits, ignoring the foreign value
            expect(Err({ code: 'E' }).and(duckTypedOk).isErr()).toBe(true);
        });

        test('or accepts a duck-typed Result', () => {
            expect(
                (Err({ code: 'E' }).or(duckTypedOk) as { _isOk: boolean })._isOk
            ).toBe(true);
            expect(
                (Err({ code: 'E' }).or(duckTypedErr) as { _isOk: boolean })
                    ._isOk
            ).toBe(false);
            expect(Ok(5).or(duckTypedErr).isOk()).toBe(true);
        });

        test('non-Result values are rejected', () => {
            expect(() => Ok(5).and({} as never)).toThrow(InvalidArgumentError);
            expect(() => Ok(5).and({ _isOk: 'yes' } as never)).toThrow(
                InvalidArgumentError
            );
            expect(() => Ok(5).or(42 as never)).toThrow(InvalidArgumentError);
        });
    });

    describe('catchUnwind', () => {
        test('wraps a successful return value in Ok', () => {
            const add = catchUnwind((a: number, b: number) => a + b);
            expect(add(2, 3).unwrap()).toBe(5);
            expect(add(2, 3).isOk()).toBe(true);
        });

        test('catches throws into Err when no handler is given', () => {
            const boom = catchUnwind(() => {
                throw new Error('boom');
            });
            const res = boom();
            expect(res.isErr()).toBe(true);
            expect((res.unwrapErr() as Error).message).toBe('boom');
        });

        test('catches non-Error throws as unknown', () => {
            const throwString = catchUnwind(() => {
                throw 'literal string';
            });
            expect(throwString().unwrapErr()).toBe('literal string');

            const throwNumber = catchUnwind(() => {
                throw 42;
            });
            expect(throwNumber().unwrapErr()).toBe(42);
        });

        test('uses onThrow to normalize the error type', () => {
            const safe = catchUnwind(
                () => {
                    throw new Error('nope');
                },
                (thrown) =>
                    thrown instanceof Error ? thrown.message : 'unknown'
            );
            const res = safe();
            expect(res.isErr()).toBe(true);
            expect(res.unwrapErr()).toBe('nope');
        });

        test('passes arguments through to fn and onThrow', () => {
            const recorded: { args: number[]; thrown: unknown }[] = [];
            const fn = catchUnwind(
                (a: number, b: number) => {
                    if (b === 0) throw new Error(`div by zero: ${a}`);
                    return a / b;
                },
                (thrown, a, b) => {
                    recorded.push({ args: [a, b], thrown });
                    return { code: 'DIV_ZERO' as const, a, b };
                }
            );

            expect(fn(10, 2).unwrap()).toBe(5);
            expect(fn(10, 0).unwrapErr()).toEqual({
                code: 'DIV_ZERO',
                a: 10,
                b: 0
            });
            expect(recorded).toEqual([
                { args: [10, 0], thrown: expect.any(Error) }
            ]);
        });

        test('preserves `this` binding of the returned function', () => {
            const obj = {
                x: 10,
                method(this: { x: number }, n: number) {
                    if (n < 0) throw new Error('negative');
                    return this.x + n;
                }
            };
            const safe = catchUnwind(obj.method, (thrown) =>
                thrown instanceof Error ? thrown.message : 'err'
            );
            expect(safe.call(obj, 5).unwrap()).toBe(15);
            expect(safe.call(obj, -1).unwrapErr()).toBe('negative');
        });

        test('rejects non-function fn and onThrow', () => {
            expect(() => catchUnwind('not a fn' as never)).toThrow(
                InvalidArgumentError
            );
            expect(() => catchUnwind(() => 1, 'not a fn' as never)).toThrow(
                InvalidArgumentError
            );
        });

        test('wraps JSON.parse realistically', () => {
            const safeParse = catchUnwind(JSON.parse, (thrown) =>
                thrown instanceof Error ? thrown.message : 'parse error'
            );
            expect(safeParse('{"a":1}').unwrap()).toEqual({ a: 1 });
            expect(safeParse('{bad').unwrapErr()).toMatch(/JSON|Unexpected/);
        });
    });

    describe('Complex usage tests', () => {
        test('Chaining multiple transformations', () => {
            const result = Ok(5)
                .map((x) => x * 2)
                .andThen((x) =>
                    x > 5 ? Ok(x.toString()) : Err({ code: 'TOO_SMALL' })
                )
                .map((str) => str.length);

            expect(result.unwrap()).toBe(2);
        });

        test('Recovery from errors in a pipeline', () => {
            const process = (val: number) =>
                Ok(val)
                    .andThen((x) => (x < 0 ? Err({ code: 'NEGATIVE' }) : Ok(x)))
                    .orElse((err) =>
                        err.code === 'NEGATIVE' ? Ok(0) : Err(err)
                    )
                    .map((x) => x + 1);

            expect(process(5).unwrap()).toBe(6);
            expect(process(-5).unwrap()).toBe(1);
        });

        test('Parsing and validation flow', () => {
            const parseJson = (str: string) => {
                try {
                    return Ok(JSON.parse(str));
                } catch {
                    return Err({ code: 'PARSE_ERROR' });
                }
            };

            const validateUser = (data: any) => {
                if (data && typeof data.name === 'string')
                    return Ok({ name: data.name });

                return Err({ code: 'INVALID_USER' });
            };

            const flow = (input: string) =>
                parseJson(input).andThen(validateUser);

            expect(flow('{"name": "Alice"}').unwrap().name).toBe('Alice');
            expect(flow('{"age": 30}').unwrapErr().code).toBe('INVALID_USER');
            expect(flow('invalid json').unwrapErr().code).toBe('PARSE_ERROR');
        });
    });
});
