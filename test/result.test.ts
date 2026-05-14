import { describe, test, expect } from 'vitest';
import { Ok, Err } from '../src/result';

describe('Result', () => {
    test('isOk', () => {
        expect(Ok(5).isOk()).toBe(true);
        expect(Err({ code: 'ERR' }).isOk()).toBe(false);
    });

    test('isOkAnd', () => {
        expect(Ok(5).isOkAnd((val) => val === 5)).toBe(true);
        expect(Ok(5).isOkAnd((val) => val === 10)).toBe(false);
        expect(Err({ code: 'ERR' }).isOkAnd((_) => true)).toBe(false);
    });

    test('isErr', () => {
        expect(Err({ code: 'ERR' }).isErr()).toBe(true);
        expect(Ok(5).isErr()).toBe(false);
    });

    test('isErrAnd', () => {
        expect(Err({ code: 'ERR' }).isErrAnd((err) => err.code === 'ERR')).toBe(
            true
        );
        expect(
            // @ts-expect-error - Testing invalid error code
            Err({ code: 'ERR' }).isErrAnd((err) => err.code === 'OTHER')
        ).toBe(false);
        expect(Ok(5).isErrAnd((_) => true)).toBe(false);
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
    });

    test('mapOr', () => {
        expect(Ok(5).mapOr(10, (x) => x * 2)).toBe(10);
        expect(Err({ code: 'ERR' }).mapOr(10, (x) => x * 2)).toBe(10);
    });

    test('mapOrElse', () => {
        expect(
            Ok(5).mapOrElse(
                () => 10,
                (x) => x * 2
            )
        ).toBe(10);
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
        expect(() => Err({ code: 'ERR' }).expect('Failed')).toThrow('Failed');
    });

    test('unwrap', () => {
        expect(Ok(5).unwrap()).toBe(5);
        expect(() => Err({ code: 'ERR' }).unwrap()).toThrow({ code: 'ERR' });
    });

    test('expectErr', () => {
        expect(Err({ code: 'ERR' }).expectErr('Should not fail').code).toBe(
            'ERR'
        );
        expect(() => Ok(5).expectErr('Failed')).toThrow('Failed');
    });

    test('unwrapErr', () => {
        expect(Err({ code: 'ERR' }).unwrapErr().code).toBe('ERR');
        expect(() => Ok(5).unwrapErr()).toThrow('5');
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

    describe('Complex Usage tests', () => {
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

        test('Parsing and Validation flow', () => {
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
