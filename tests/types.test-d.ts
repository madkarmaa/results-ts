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
    type Result,
    type OkResult,
    type ErrResult
} from '../src/result';
import { type AsyncOption } from '../src/async-option';
import { type AsyncResult } from '../src/async-result';

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
});
