import { describe, test, expectTypeOf, assertType } from 'vitest';
import {
    Some,
    None,
    type Option,
    type SomeOption,
    type NoneOption
} from '../src/option';
import {
    Ok,
    Err,
    catchUnwind,
    type Result,
    type OkResult,
    type ErrResult
} from '../src/result';
import { type AsyncOption } from '../src/async-option';
import { type AsyncResult, catchUnwindAsync } from '../src/async-result';

describe('Mixed combinator operand types', () => {
    const syncOption = Some(42);
    const syncOther = Some('hello');
    const asyncOption = syncOption.mapAsync(async (value) => value);
    const asyncOther = syncOther.mapAsync(async (value) => value);

    test('Option sync + sync', () => {
        expectTypeOf(syncOption.and(syncOther)).toEqualTypeOf<Option<string>>();
        expectTypeOf(syncOption.or(syncOther)).toEqualTypeOf<
            Option<number | string>
        >();
        expectTypeOf(syncOption.xor(syncOther)).toEqualTypeOf<
            Option<number | string>
        >();
        expectTypeOf(syncOption.zip(syncOther)).toEqualTypeOf<
            Option<[number, string]>
        >();
    });

    test('Option sync + async', () => {
        expectTypeOf(syncOption.and(asyncOther)).toEqualTypeOf<
            AsyncOption<string>
        >();
        expectTypeOf(syncOption.or(asyncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(syncOption.xor(asyncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(syncOption.zip(asyncOther)).toEqualTypeOf<
            AsyncOption<[number, string]>
        >();
    });

    test('Option async + sync', () => {
        expectTypeOf(asyncOption.and(syncOther)).toEqualTypeOf<
            AsyncOption<string>
        >();
        expectTypeOf(asyncOption.or(syncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(asyncOption.xor(syncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(asyncOption.zip(syncOther)).toEqualTypeOf<
            AsyncOption<[number, string]>
        >();
    });

    test('Option async + async', () => {
        expectTypeOf(asyncOption.and(asyncOther)).toEqualTypeOf<
            AsyncOption<string>
        >();
        expectTypeOf(asyncOption.or(asyncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(asyncOption.xor(asyncOther)).toEqualTypeOf<
            AsyncOption<number | string>
        >();
        expectTypeOf(asyncOption.zip(asyncOther)).toEqualTypeOf<
            AsyncOption<[number, string]>
        >();
    });

    const syncResult: Result<number, Error> = Ok(42);
    const syncOtherResult: Result<string, boolean> = Ok('hello');
    const asyncResult = syncResult.mapAsync(async (value) => value);
    const asyncOtherResult = syncOtherResult.mapAsync(async (value) => value);

    test('Result sync + sync', () => {
        expectTypeOf(syncResult.and(syncOtherResult)).toEqualTypeOf<
            Result<string, Error | boolean>
        >();
        expectTypeOf(syncResult.or(syncOtherResult)).toEqualTypeOf<
            Result<number | string, boolean>
        >();
    });

    test('Result sync + async', () => {
        expectTypeOf(syncResult.and(asyncOtherResult)).toEqualTypeOf<
            AsyncResult<string, Error | boolean>
        >();
        expectTypeOf(syncResult.or(asyncOtherResult)).toEqualTypeOf<
            AsyncResult<number | string, boolean>
        >();
    });

    test('Result async + sync', () => {
        expectTypeOf(asyncResult.and(syncOtherResult)).toEqualTypeOf<
            AsyncResult<string, Error | boolean>
        >();
        expectTypeOf(asyncResult.or(syncOtherResult)).toEqualTypeOf<
            AsyncResult<number | string, boolean>
        >();
    });

    test('Result async + async', () => {
        expectTypeOf(asyncResult.and(asyncOtherResult)).toEqualTypeOf<
            AsyncResult<string, Error | boolean>
        >();
        expectTypeOf(asyncResult.or(asyncOtherResult)).toEqualTypeOf<
            AsyncResult<number | string, boolean>
        >();
    });

    test('native promises preserve the contained value and error types', () => {
        expectTypeOf(syncOption.zip(Promise.resolve(syncOther))).toEqualTypeOf<
            AsyncOption<[number, string]>
        >();
        expectTypeOf(
            syncResult.and(Promise.resolve(syncOtherResult))
        ).toEqualTypeOf<AsyncResult<string, Error | boolean>>();
        expectTypeOf(
            asyncResult.or(Promise.resolve(syncOtherResult))
        ).toEqualTypeOf<AsyncResult<number | string, boolean>>();
    });

    test('union operands retain both possible return types on sync receivers', () => {
        const optionOperand = (
            async: boolean
        ): Option<string> | AsyncOption<string> =>
            async ? asyncOther : syncOther;
        const resultOperand = (
            async: boolean
        ): Result<string, boolean> | AsyncResult<string, boolean> =>
            async ? asyncOtherResult : syncOtherResult;
        const other = optionOperand(true);
        const otherResult = resultOperand(true);

        expectTypeOf(syncOption.and(other)).toEqualTypeOf<
            Option<string> | AsyncOption<string>
        >();
        expectTypeOf(syncOption.or(other)).toEqualTypeOf<
            Option<number | string> | AsyncOption<number | string>
        >();
        expectTypeOf(syncOption.xor(other)).toEqualTypeOf<
            Option<number | string> | AsyncOption<number | string>
        >();
        expectTypeOf(syncOption.zip(other)).toEqualTypeOf<
            Option<[number, string]> | AsyncOption<[number, string]>
        >();
        expectTypeOf(syncResult.and(otherResult)).toEqualTypeOf<
            | Result<string, Error | boolean>
            | AsyncResult<string, Error | boolean>
        >();
        expectTypeOf(syncResult.or(otherResult)).toEqualTypeOf<
            | Result<number | string, boolean>
            | AsyncResult<number | string, boolean>
        >();
        expectTypeOf(asyncOption.zip(other)).toEqualTypeOf<
            AsyncOption<[number, string]>
        >();
        expectTypeOf(asyncResult.and(otherResult)).toEqualTypeOf<
            AsyncResult<string, Error | boolean>
        >();
    });

    test('wrong operand kinds and payloads are rejected', () => {
        // @ts-expect-error - Option combinators require Option operands
        syncOption.and(asyncResult);
        // @ts-expect-error - Result combinators require Result operands
        syncResult.or(asyncOption);
        // @ts-expect-error - async operands must resolve to an Option
        syncOption.zip(Promise.resolve('hello'));
        // @ts-expect-error - async operands must resolve to a Result
        asyncResult.and(Promise.resolve(42));
    });
});

describe('Option types', () => {
    test('Some and None constructors map correctly to Option<T>', () => {
        const someValue = Some(42);
        const noneValue = None<number>();

        expectTypeOf(someValue).toEqualTypeOf<Option<number>>();
        expectTypeOf(noneValue).toEqualTypeOf<Option<number>>();

        // @ts-expect-error - NoneOption cannot be assigned to SomeOption
        const strictSome: SomeOption<number> = None<number>();
    });

    test('isSome and isNone type guard refinements', () => {
        const opt = Some(42) as Option<number>;

        if (opt.isSome()) expectTypeOf(opt).toEqualTypeOf<SomeOption<number>>();
        else if (opt.isNone())
            expectTypeOf(opt).toEqualTypeOf<NoneOption<number>>();
        else expectTypeOf(opt).toEqualTypeOf<never>();
    });

    test('isSomeAnd performs user-defined type-guard narrowing', () => {
        const opt = Some<string | number>(42);
        const isString = (val: string | number): val is string =>
            typeof val === 'string';

        if (opt.isSomeAnd(isString))
            expectTypeOf(opt).toEqualTypeOf<SomeOption<string>>();
    });

    test('Chaining methods (map, mapAsync, andThen, okOr)', () => {
        const opt = Some(42);

        expectTypeOf(opt.map((v) => v.toString())).toEqualTypeOf<
            Option<string>
        >();

        expectTypeOf(opt.mapAsync(async (v) => v.toString())).toEqualTypeOf<
            AsyncOption<string>
        >();

        expectTypeOf(opt.andThen((v) => Some(v > 0))).toEqualTypeOf<
            Option<boolean>
        >();

        expectTypeOf(opt.okOr('error_msg')).toEqualTypeOf<
            Result<number, string>
        >();
    });

    test('flatten unwraps nested Option<Option<T>> to Option<T>', () => {
        const nestedSome = Some(Some(42));
        const nestedNone = Some(None<number>());
        const outerNone = None<Option<number>>();

        expectTypeOf(nestedSome.flatten()).toEqualTypeOf<Option<number>>();
        expectTypeOf(nestedNone.flatten()).toEqualTypeOf<Option<number>>();
        expectTypeOf(outerNone.flatten()).toEqualTypeOf<Option<number>>();

        // flatten requires an outer Option whose value is itself an Option
        // @ts-expect-error - flatten can only be called on Option<Option<T>>
        Some(42).flatten();
    });

    test('transpose flips Option<Result<T, E>> to Result<Option<T>, E>', () => {
        const someOk = Some(Ok(42)) as Option<Result<number, string>>;
        const someErr = Some(Err('oops')) as Option<Result<number, string>>;
        const outerNone = None<Result<number, string>>();

        expectTypeOf(someOk.transpose()).toEqualTypeOf<
            Result<Option<number>, string>
        >();
        expectTypeOf(someErr.transpose()).toEqualTypeOf<
            Result<Option<number>, string>
        >();
        expectTypeOf(outerNone.transpose()).toEqualTypeOf<
            Result<Option<number>, string>
        >();

        // transpose requires the inner value to be a Result
        // @ts-expect-error - transpose can only be called on Option<Result<T, E>>
        Some(42).transpose();
    });

    test('zip preserves the types and order of both values', () => {
        const zipped = Some(42).zip(Some('hello'));

        expectTypeOf(zipped).toEqualTypeOf<Option<[number, string]>>();
        expectTypeOf(None<number>().zip(None<string>())).toEqualTypeOf<
            Option<[number, string]>
        >();
        expectTypeOf(Some(null).zip(Some(undefined))).toEqualTypeOf<
            Option<[null, undefined]>
        >();
        expectTypeOf(
            Some<'left'>('left').zip(Some<'right'>('right'))
        ).toEqualTypeOf<Option<['left', 'right']>>();
        expectTypeOf(zipped.unzip()).toEqualTypeOf<
            [Option<number>, Option<string>]
        >();

        // @ts-expect-error - zip requires another Option
        Some(42).zip('hello');
    });

    test('unzip splits Option<[T, U]> into a tuple of two Options', () => {
        const someTuple = Some([42, 'hello']) as Option<[number, string]>;
        const noneTuple = None<[number, string]>();

        expectTypeOf(someTuple.unzip()).toEqualTypeOf<
            [Option<number>, Option<string>]
        >();
        expectTypeOf(noneTuple.unzip()).toEqualTypeOf<
            [Option<number>, Option<string>]
        >();

        // unzip requires the inner value to be a 2-tuple
        // @ts-expect-error - unzip can only be called on Option<[T, U]>
        Some(42).unzip();
    });
});

describe('Result types', () => {
    test('Ok and Err map into variants of Result<T, E>', () => {
        const okVal = Ok(100);
        const errVal = Err('failed');

        expectTypeOf(okVal).toEqualTypeOf<Result<number, never>>();
        expectTypeOf(errVal).toEqualTypeOf<Result<never, string>>();

        assertType<Result<number, string>>(okVal);
        assertType<Result<number, string>>(errVal);
    });

    test('isOk and isErr type guards split types correctly', () => {
        const res = Ok(42) as Result<number, string>;

        if (res.isOk())
            expectTypeOf(res).toEqualTypeOf<OkResult<number, never>>();
        else if (res.isErr())
            expectTypeOf(res).toEqualTypeOf<ErrResult<never, string>>();
    });

    test('isOkAnd user-defined type guard narrowing', () => {
        const res = Ok<string | number>(42) as Result<string | number, string>;
        const isNumber = (val: string | number): val is number =>
            typeof val === 'number';

        if (res.isOkAnd(isNumber))
            expectTypeOf(res).toEqualTypeOf<OkResult<number, string>>();
    });

    test('Chaining operations (map, mapErr, mapAsync, ok, err)', () => {
        const res = Ok(42) as Result<number, string>;

        expectTypeOf(res.map((v) => v * 2)).toEqualTypeOf<
            Result<number, string>
        >();

        expectTypeOf(res.mapErr((e) => new Error(e))).toEqualTypeOf<
            Result<number, Error>
        >();

        expectTypeOf(res.mapAsync(async (v) => v.toString())).toEqualTypeOf<
            AsyncResult<string, string>
        >();

        expectTypeOf(res.ok()).toEqualTypeOf<Option<number>>();
        expectTypeOf(res.err()).toEqualTypeOf<Option<string>>();
    });

    test('flatten unwraps nested Result<Result<T, F>, E> to Result<T, E | F>', () => {
        const okNested = Ok(Ok(42)) as Result<Result<number, string>, Error>;
        const errNested = Err(new Error('e')) as Result<
            Result<number, string>,
            Error
        >;

        expectTypeOf(okNested.flatten()).toEqualTypeOf<
            Result<number, string | Error>
        >();
        expectTypeOf(errNested.flatten()).toEqualTypeOf<
            Result<number, string | Error>
        >();

        // flatten requires an outer Result whose Ok value is itself a Result
        // @ts-expect-error - flatten can only be called on Result<Result<T, F>, E>
        Ok(42).flatten();
    });

    test('transpose flips Result<Option<T>, E> to Option<Result<T, E>>', () => {
        const okSome = Ok(Some(42)) as Result<Option<number>, string>;
        const okNone = Ok(None<number>()) as Result<Option<number>, string>;
        const errVal = Err('oops') as Result<Option<number>, string>;

        expectTypeOf(okSome.transpose()).toEqualTypeOf<
            Option<Result<number, string>>
        >();
        expectTypeOf(okNone.transpose()).toEqualTypeOf<
            Option<Result<number, string>>
        >();
        expectTypeOf(errVal.transpose()).toEqualTypeOf<
            Option<Result<number, string>>
        >();

        // transpose requires the inner Ok value to be an Option
        // @ts-expect-error - transpose can only be called on Result<Option<T>, E>
        Ok(42).transpose();
    });

    test('catchUnwind without onThrow returns Result<T, unknown>', () => {
        const unsafe = (a: number, b: string) => a + b.length;
        const safe = catchUnwind(unsafe);

        expectTypeOf(safe).toEqualTypeOf<
            (a: number, b: string) => Result<number, unknown>
        >();
    });

    test('catchUnwind with onThrow narrows the error type', () => {
        const safe = catchUnwind(
            (n: number) => n,
            (thrown: unknown): string =>
                thrown instanceof Error ? thrown.message : 'err'
        );

        expectTypeOf(safe).toEqualTypeOf<
            (n: number) => Result<number, string>
        >();
    });
});

describe('Async Wrappers (AsyncOption & AsyncResult)', () => {
    test('AsyncOption promise-like structural behavior', () => {
        const asyncOpt = {} as AsyncOption<number>;

        expectTypeOf(asyncOpt).toExtend<PromiseLike<Option<number>>>();

        expectTypeOf(asyncOpt.isSome()).toEqualTypeOf<Promise<boolean>>();
        expectTypeOf(asyncOpt.unwrap()).toEqualTypeOf<Promise<number>>();
        expectTypeOf(asyncOpt.map((v) => v.toString())).toEqualTypeOf<
            AsyncOption<string>
        >();
        expectTypeOf(asyncOpt.okOr('err')).toEqualTypeOf<
            AsyncResult<number, string>
        >();
    });

    test('AsyncResult promise-like structural behavior', () => {
        const asyncRes = {} as AsyncResult<number, string>;

        expectTypeOf(asyncRes).toExtend<PromiseLike<Result<number, string>>>();

        expectTypeOf(asyncRes.isOk()).toEqualTypeOf<Promise<boolean>>();
        expectTypeOf(asyncRes.map((v) => v * 2)).toEqualTypeOf<
            AsyncResult<number, string>
        >();
        expectTypeOf(asyncRes.ok()).toEqualTypeOf<AsyncOption<number>>();
        expectTypeOf(asyncRes.err()).toEqualTypeOf<AsyncOption<string>>();
    });

    test('AsyncOption.flatten unwraps AsyncOption<Option<T>> to AsyncOption<T>', () => {
        const nestedOpt = {} as AsyncOption<Option<number>>;

        expectTypeOf(nestedOpt.flatten()).toEqualTypeOf<AsyncOption<number>>();

        // flatten requires the inner value to be an Option
        // @ts-expect-error - flatten can only be called on AsyncOption<Option<T>>
        (({}) as AsyncOption<number>).flatten();
    });

    test('AsyncOption.zip preserves tuple types and chainability', () => {
        const asyncOpt = Some(42).mapAsync(async (value) => value);
        const zipped = asyncOpt.zip(Some('hello'));

        expectTypeOf(zipped).toEqualTypeOf<AsyncOption<[number, string]>>();
        expectTypeOf(zipped.unwrap()).toEqualTypeOf<
            Promise<[number, string]>
        >();
        expectTypeOf(zipped.unzip()).toEqualTypeOf<
            [AsyncOption<number>, AsyncOption<string>]
        >();
        expectTypeOf(
            zipped.map(([number, string]) => string + number)
        ).toEqualTypeOf<AsyncOption<string>>();
        expectTypeOf(
            None<number>()
                .mapAsync(async (value) => value)
                .zip(None<string>())
        ).toEqualTypeOf<AsyncOption<[number, string]>>();

        // @ts-expect-error - zip requires another Option
        asyncOpt.zip('hello');
    });

    test('AsyncOption.unzip splits AsyncOption<[T, U]> into a tuple of two AsyncOptions', () => {
        const nestedOpt = {} as AsyncOption<[number, string]>;

        expectTypeOf(nestedOpt.unzip()).toEqualTypeOf<
            [AsyncOption<number>, AsyncOption<string>]
        >();

        // unzip requires the inner value to be a 2-tuple
        // @ts-expect-error - unzip can only be called on AsyncOption<[T, U]>
        (({}) as AsyncOption<number>).unzip();
    });

    test('AsyncResult.flatten unwraps AsyncResult<Result<T, F>, E> to AsyncResult<T, E | F>', () => {
        const nestedRes = {} as AsyncResult<Result<number, string>, Error>;

        expectTypeOf(nestedRes.flatten()).toEqualTypeOf<
            AsyncResult<number, string | Error>
        >();

        // flatten requires the inner Ok value to be a Result
        // @ts-expect-error - flatten can only be called on AsyncResult<Result<T, F>, E>
        (({}) as AsyncResult<number, string>).flatten();
    });

    test('AsyncOption.transpose flips AsyncOption<Result<T, E>> to AsyncResult<Option<T>, E>', () => {
        const nestedOpt = {} as AsyncOption<Result<number, string>>;

        expectTypeOf(nestedOpt.transpose()).toEqualTypeOf<
            AsyncResult<Option<number>, string>
        >();

        // transpose requires the inner value to be a Result
        // @ts-expect-error - transpose can only be called on AsyncOption<Result<T, E>>
        (({}) as AsyncOption<number>).transpose();
    });

    test('AsyncResult.transpose flips AsyncResult<Option<T>, E> to AsyncOption<Result<T, E>>', () => {
        const nestedRes = {} as AsyncResult<Option<number>, string>;

        expectTypeOf(nestedRes.transpose()).toEqualTypeOf<
            AsyncOption<Result<number, string>>
        >();

        // transpose requires the inner Ok value to be an Option
        // @ts-expect-error - transpose can only be called on AsyncResult<Option<T>, E>
        (({}) as AsyncResult<number, string>).transpose();
    });

    test('catchUnwindAsync without onThrow returns AsyncResult<T, unknown>', () => {
        const unsafe = async (a: number, b: string) => a + b.length;
        const safe = catchUnwindAsync(unsafe);

        expectTypeOf(safe).toEqualTypeOf<
            (a: number, b: string) => AsyncResult<number, unknown>
        >();
    });

    test('catchUnwindAsync with onThrow narrows the error type', () => {
        const safe = catchUnwindAsync(
            (n: number) => Promise.resolve(n),
            (thrown: unknown): string =>
                thrown instanceof Error ? thrown.message : 'err'
        );

        expectTypeOf(safe).toEqualTypeOf<
            (n: number) => AsyncResult<number, string>
        >();
    });
});
