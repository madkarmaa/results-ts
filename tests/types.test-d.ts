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
});
