import { describe, expect, test } from 'vitest';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, type Result } from '../src/result';
import { type AsyncOption, AsyncOptionImpl } from '../src/async-option';
import { type AsyncResult, AsyncResultImpl } from '../src/async-result';
import { InvalidArgumentError } from '../src/errors';

const combinations = [
    { name: 'sync + sync', leftAsync: false, rightAsync: false },
    { name: 'sync + async', leftAsync: false, rightAsync: true },
    { name: 'async + sync', leftAsync: true, rightAsync: false },
    { name: 'async + async', leftAsync: true, rightAsync: true }
] as const;

const optionCases = [
    {
        name: 'Some + Some',
        left: Some(1),
        right: Some(2),
        and: 2,
        or: 1,
        xor: undefined,
        zip: [1, 2]
    },
    {
        name: 'Some + None',
        left: Some(1),
        right: None<number>(),
        and: undefined,
        or: 1,
        xor: 1,
        zip: undefined
    },
    {
        name: 'None + Some',
        left: None<number>(),
        right: Some(2),
        and: undefined,
        or: 2,
        xor: 2,
        zip: undefined
    },
    {
        name: 'None + None',
        left: None<number>(),
        right: None<number>(),
        and: undefined,
        or: undefined,
        xor: undefined,
        zip: undefined
    }
] as const;

type ResultOutcome =
    | { readonly ok: true; readonly value: number }
    | { readonly ok: false; readonly error: string };
type ResultCase = {
    readonly name: string;
    readonly left: Result<number, string>;
    readonly right: Result<number, string>;
    readonly and: ResultOutcome;
    readonly or: ResultOutcome;
};

const resultCases: readonly ResultCase[] = [
    {
        name: 'Ok + Ok',
        left: Ok(1),
        right: Ok(2),
        and: { ok: true, value: 2 },
        or: { ok: true, value: 1 }
    },
    {
        name: 'Ok + Err',
        left: Ok(1),
        right: Err('right'),
        and: { ok: false, error: 'right' },
        or: { ok: true, value: 1 }
    },
    {
        name: 'Err + Ok',
        left: Err('left'),
        right: Ok(2),
        and: { ok: false, error: 'left' },
        or: { ok: true, value: 2 }
    },
    {
        name: 'Err + Err',
        left: Err('left'),
        right: Err('right'),
        and: { ok: false, error: 'left' },
        or: { ok: false, error: 'right' }
    }
];

function liftOption<T>(
    value: Option<T>,
    async: boolean
): Option<T> | AsyncOption<T> {
    return async ? value.mapAsync((item) => Promise.resolve(item)) : value;
}

function liftResult<T, E>(
    value: Result<T, E>,
    async: boolean
): Result<T, E> | AsyncResult<T, E> {
    return async ? value.mapAsync((item) => Promise.resolve(item)) : value;
}

describe('combinator operand combinations', () => {
    for (const combination of combinations) {
        describe(combination.name, () => {
            for (const scenario of optionCases) {
                test(`Option: ${scenario.name}`, async () => {
                    const left = liftOption(
                        scenario.left,
                        combination.leftAsync
                    );
                    const right = liftOption(
                        scenario.right,
                        combination.rightAsync
                    );
                    const outcomes = [
                        { value: left.and(right), expected: scenario.and },
                        { value: left.or(right), expected: scenario.or },
                        { value: left.xor(right), expected: scenario.xor },
                        { value: left.zip(right), expected: scenario.zip }
                    ];

                    for (const { value, expected } of outcomes) {
                        expect('then' in value).toBe(
                            combination.leftAsync || combination.rightAsync
                        );
                        const resolved = await value;
                        expect(resolved.isSome()).toBe(expected !== undefined);
                        if (expected !== undefined)
                            expect(resolved.unwrap()).toEqual(expected);
                    }
                });
            }

            for (const scenario of resultCases) {
                test(`Result: ${scenario.name}`, async () => {
                    const left = liftResult(
                        scenario.left,
                        combination.leftAsync
                    );
                    const right = liftResult(
                        scenario.right,
                        combination.rightAsync
                    );
                    const outcomes = [
                        { value: left.and(right), expected: scenario.and },
                        { value: left.or(right), expected: scenario.or }
                    ];

                    for (const { value, expected } of outcomes) {
                        expect('then' in value).toBe(
                            combination.leftAsync || combination.rightAsync
                        );
                        const resolved = await value;
                        expect(resolved.isOk()).toBe(expected.ok);
                        if (expected.ok)
                            expect(resolved.unwrap()).toBe(expected.value);
                        else expect(resolved.unwrapErr()).toBe(expected.error);
                    }
                });
            }
        });
    }

    test('native promises and structural thenables are supported', async () => {
        const optionPromise = Promise.resolve(Some(2));
        const resultPromise = Promise.resolve(Ok(2));
        const optionThenable = { then: optionPromise.then.bind(optionPromise) };
        const resultThenable = Object.assign(() => undefined, {
            then: resultPromise.then.bind(resultPromise)
        });

        for (const other of [optionPromise, optionThenable]) {
            expect(await Some(1).and(other).unwrap()).toBe(2);
            expect(await None<number>().or(other).unwrap()).toBe(2);
            expect(await None<number>().xor(other).unwrap()).toBe(2);
            expect(await Some(1).zip(other).unwrap()).toEqual([1, 2]);
        }
        for (const other of [resultPromise, resultThenable]) {
            expect(await Ok(1).and(other).unwrap()).toBe(2);
            expect(await Err('left').or(other).unwrap()).toBe(2);
        }
    });

    test('async combinators observe both pending operands concurrently', async () => {
        const left = Promise.withResolvers<Option<number>>();
        let observed = false;
        const rightPromise = Promise.resolve(Some('hello'));
        const right: PromiseLike<Option<string>> = {
            then(onfulfilled, onrejected) {
                observed = true;
                return rightPromise.then(onfulfilled, onrejected);
            }
        };
        const zipped = new AsyncOptionImpl(left.promise).zip(right);

        await Promise.resolve();
        expect(observed).toBe(true);
        left.resolve(Some(42));
        expect(
            await zipped
                .map(([number, string]) => `${number}: ${string}`)
                .unwrap()
        ).toBe('42: hello');
    });

    test('sync options retain their state at invocation while the operand is pending', async () => {
        for (const scenario of optionCases) {
            const left = scenario.left.isSome()
                ? Some(scenario.left.unwrap())
                : None<number>();
            const right = Promise.withResolvers<Option<number>>();
            const outcomes = [
                { value: left.and(right.promise), expected: scenario.and },
                { value: left.or(right.promise), expected: scenario.or },
                { value: left.xor(right.promise), expected: scenario.xor },
                { value: left.zip(right.promise), expected: scenario.zip }
            ];
            left.replace(99);
            right.resolve(scenario.right);

            for (const { value, expected } of outcomes) {
                const resolved = await value;
                expect(resolved.isSome()).toBe(expected !== undefined);
                if (expected !== undefined)
                    expect(resolved.unwrap()).toEqual(expected);
            }
        }
    });

    test('rejections propagate even on branches that discard the async operand', async () => {
        const error = new Error('operand failed');
        const optionPromise = Promise.reject<Option<number>>(error);
        const resultPromise = Promise.reject<Result<number, string>>(error);
        const outputs = [
            Some(1).and(optionPromise),
            None<number>().and(optionPromise),
            Some(1).or(optionPromise),
            None<number>().or(optionPromise),
            Some(1).xor(optionPromise),
            None<number>().xor(optionPromise),
            Some(1).zip(optionPromise),
            None<number>().zip(optionPromise),
            Ok(1).and(resultPromise),
            Err('left').and(resultPromise),
            Ok(1).or(resultPromise),
            Err('left').or(resultPromise),
            new AsyncOptionImpl(optionPromise).zip(Some(1)),
            new AsyncResultImpl(resultPromise).and(Ok(1))
        ];
        await Promise.all(
            outputs.map((output) => expect(output).rejects.toBe(error))
        );
    });

    test('async receivers handle an operand rejection while still pending', async () => {
        const leftOption = Promise.withResolvers<Option<number>>();
        const leftResult = Promise.withResolvers<Result<number, string>>();
        const error = new Error('operand failed');
        const rightOption = Promise.reject<Option<number>>(error);
        const rightResult = Promise.reject<Result<number, string>>(error);
        const option = new AsyncOptionImpl(leftOption.promise);
        const result = new AsyncResultImpl(leftResult.promise);

        await Promise.all(
            [
                option.and(rightOption),
                option.or(rightOption),
                option.xor(rightOption),
                option.zip(rightOption),
                result.and(rightResult),
                result.or(rightResult)
            ].map((output) => expect(output).rejects.toBe(error))
        );
        leftOption.resolve(Some(1));
        leftResult.resolve(Ok(1));
    });

    test('invalid resolved operands reject with the existing validation error', async () => {
        // @ts-expect-error - an Option combinator requires an Option operand
        await expect(Some(1).zip(Promise.resolve(Ok(2)))).rejects.toThrow(
            InvalidArgumentError
        );
        // @ts-expect-error - a Result combinator requires a Result operand
        await expect(Ok(1).and(Promise.resolve(Some(2)))).rejects.toThrow(
            InvalidArgumentError
        );
    });
});
