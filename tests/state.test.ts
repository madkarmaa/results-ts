import { describe, expect, test } from 'vitest';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, type Result } from '../src/result';
import { InvalidArgumentError } from '../src/errors';

describe('private state and payload preservation', () => {
    const values: readonly unknown[] = [
        undefined,
        null,
        false,
        0,
        -0,
        NaN,
        '',
        1n,
        Symbol('None'),
        { _tag: 'NoneValue' },
        { _tag: 'Right', right: 3 },
        () => 1,
        new Proxy(
            {},
            {
                get() {
                    throw new Error('payload inspected');
                }
            }
        )
    ];

    test('arbitrary payloads remain present and retain identity', () => {
        for (const value of values) {
            const option = Some(value);
            expect(option.isSome()).toBe(true);
            expect(option.unwrap()).toBe(value);
            expect(option.map((item) => item).unwrap()).toBe(value);
            expect(Ok(value).unwrap()).toBe(value);
            expect(Err(value).unwrapErr()).toBe(value);
            expect(option.replace(undefined).unwrap()).toBe(value);
            expect(option.isSome()).toBe(true);
            expect(option.take().unwrap()).toBeUndefined();
            expect(option.isNone()).toBe(true);
            expect(option.insert(value)).toBe(value);
            expect(option.take().unwrap()).toBe(value);
        }
    });

    test('state remains private and variant getters follow mutation', () => {
        for (const value of [Some(1), None(), Ok(1), Err('error')]) {
            expect(Reflect.ownKeys(value)).toEqual([]);
            expect(JSON.stringify(value)).toBe('{}');
        }
        const option = None<number>();
        expect(Object.prototype.toString.call(option)).toBe(
            '[object Option None]'
        );
        option.insert(1);
        expect(option._isSome).toBe(true);
        expect(Object.prototype.toString.call(option)).toBe(
            '[object Option Some]'
        );
        option.take();
        expect(option._isSome).toBe(false);
    });

    test('Result variants ignore inherited payload-shaped properties', () => {
        const previous = Object.getOwnPropertyDescriptor(
            Object.prototype,
            'right'
        );
        try {
            Object.defineProperty(Object.prototype, 'right', {
                value: 'inherited payload',
                configurable: true
            });
            const ok = Ok(undefined);
            const err = Err(undefined);
            expect(ok.isOk()).toBe(true);
            expect(ok.unwrap()).toBeUndefined();
            expect(err.isErr()).toBe(true);
            expect(err.unwrapErr()).toBeUndefined();
            expect(err.map(() => 'unused')).toBe(err);
            expect(err.flatten().unwrapErr()).toBeUndefined();
        } finally {
            if (previous)
                Object.defineProperty(Object.prototype, 'right', previous);
            else Reflect.deleteProperty(Object.prototype, 'right');
        }
    });

    test('takeIf keeps the original payload across reentrant mutation', () => {
        const original = { id: 1 };
        const replacement = { id: 2 };
        const option = Some(original);
        const taken = option.takeIf((value) => {
            expect(value).toBe(original);
            option.replace(replacement);
            return true;
        });
        expect(taken.unwrap()).toBe(original);
        expect(option.isNone()).toBe(true);
        option.insert(original);
        expect(
            option
                .takeIf(() => {
                    option.insert(replacement);
                    return false;
                })
                .isNone()
        ).toBe(true);
        expect(option.unwrap()).toBe(replacement);
    });

    test('unchanged branches retain the existing identity rules', () => {
        const none = None<number>();
        const some = Some(1);
        const ok = Ok(1);
        const err = Err('error');
        expect(none.map(String)).toBe(none);
        expect(none.andThen(() => Some('unused'))).toBe(none);
        expect(some.filter(() => true)).toBe(some);
        expect(err.map(String)).toBe(err);
        expect(ok.mapErr(String)).toBe(ok);
        expect(err.flatten()).not.toBe(err);
        const nested: Option<Option<number>> = None();
        expect(nested.flatten()).not.toBe(nested);
        const result: Result<Option<number>, string> = Err('error');
        expect(result.transpose().unwrap()).not.toBe(result);
        expect(None()).not.toBe(None());
    });

    test('inactive branches still validate callbacks', () => {
        const invalid = undefined as never;
        const operations = [
            () => None().map(invalid),
            () => None().filter(invalid),
            () => None().andThen(invalid),
            () => Some(1).orElse(invalid),
            () => Err('error').map(invalid),
            () => Ok(1).mapErr(invalid),
            () => Err('error').andThen(invalid),
            () => Ok(1).orElse(invalid)
        ];
        for (const operation of operations)
            expect(operation).toThrow(InvalidArgumentError);
    });

    test('fresh Result wrappers retain shared mutable error payloads', () => {
        const error = { count: 0 };
        const nested: Result<Result<number, never>, typeof error> = Err(error);
        const optional: Result<Option<number>, typeof error> = Err(error);
        const flattened = [nested.flatten(), nested.flatten()] as const;
        const transposed = [
            optional.transpose(),
            optional.transpose()
        ] as const;

        expect(flattened[0]).not.toBe(flattened[1]);
        expect(transposed[0]).not.toBe(transposed[1]);
        expect(transposed[0].unwrap()).not.toBe(transposed[1].unwrap());
        error.count = 1;
        for (const result of flattened) {
            expect(result).not.toBe(nested);
            expect(result.unwrapErr()).toBe(error);
            expect(result.unwrapErr().count).toBe(1);
        }
        for (const option of transposed) {
            expect(option.unwrap()).not.toBe(optional);
            expect(option.unwrap().unwrapErr()).toBe(error);
            expect(option.unwrap().unwrapErr().count).toBe(1);
        }
    });
});
