import { bench, do_not_optimize, group } from 'mitata';
import type { AsyncOption } from '../src/async-option';
import type { AsyncResult } from '../src/async-result';
import { Some } from '../src/option';
import { Ok, Err } from '../src/result';
import { some, none, ok, err, inc, asyncInc, gt0 } from './fixtures';

// Keep these maps exhaustive as the public wrapper interfaces grow.
for (const [variant, input] of [
    ['Some', some],
    ['None', none]
] as const) {
    const option = input.mapAsync(async (value) => value);
    const nested = input.mapAsync(async (value) => Some(value));
    const transposed = input.mapAsync(async (value) => Ok(value));
    const pair = input.mapAsync(async (value): Promise<[number, number]> => [
        value,
        2
    ]);
    const operations = {
        then: () => option.then((value) => value),
        isSome: () => option.isSome(),
        isSomeAnd: () => option.isSomeAnd(gt0),
        isNone: () => option.isNone(),
        isNoneOr: () => option.isNoneOr(gt0),
        expect: () => option.expect('benchmark'),
        unwrap: () => option.unwrap(),
        unwrapOr: () => option.unwrapOr(0),
        unwrapOrElse: () => option.unwrapOrElse(() => 0),
        unwrapOrElseAsync: () => option.unwrapOrElseAsync(async () => 0),
        map: () => option.map(inc),
        mapAsync: () => option.mapAsync(asyncInc),
        inspect: () => option.inspect(do_not_optimize),
        inspectAsync: () =>
            option.inspectAsync(async (value) => {
                do_not_optimize(value);
            }),
        mapOr: () => option.mapOr(0, inc),
        mapOrElse: () => option.mapOrElse(() => 0, inc),
        mapOrElseAsync: () => option.mapOrElseAsync(async () => 0, asyncInc),
        okOr: () => option.okOr(0),
        okOrElse: () => option.okOrElse(() => 0),
        okOrElseAsync: () => option.okOrElseAsync(async () => 0),
        and: () => option.and(some),
        andThen: () => option.andThen((value) => Some(value + 1)),
        andThenAsync: () =>
            option.andThenAsync(async (value) => Some(value + 1)),
        filter: () => option.filter(gt0),
        filterAsync: () => option.filterAsync(async (value) => gt0(value)),
        or: () => option.or(some),
        orElse: () => option.orElse(() => some),
        orElseAsync: () => option.orElseAsync(async () => some),
        xor: () => option.xor(some),
        flatten: () => nested.flatten(),
        transpose: () => transposed.transpose(),
        zip: () => option.zip(some),
        unzip: () => Promise.all(pair.unzip()),
        match: () => option.match({ Some: inc, None: () => 0 })
    } satisfies Record<keyof AsyncOption<number>, () => unknown>;

    group(`AsyncOption - ${variant} wrapper methods`, () => {
        for (const [method, operation] of Object.entries(operations)) {
            bench(`AsyncOption.${method} (${variant})`, async () => {
                if (
                    variant === 'None' &&
                    (method === 'expect' || method === 'unwrap')
                ) {
                    try {
                        await operation();
                    } catch (error) {
                        do_not_optimize(error);
                    }
                } else {
                    do_not_optimize(await operation());
                }
            }).gc('once');
        }
    });
}

for (const [variant, input] of [
    ['Ok', ok],
    ['Err', err]
] as const) {
    const result = input.mapAsync(async (value) => value);
    const nested = input.mapAsync(async (value) => Ok(value));
    const transposed = input.mapAsync(async (value) => Some(value));
    const operations = {
        then: () => result.then((value) => value),
        isOk: () => result.isOk(),
        isOkAnd: () => result.isOkAnd(gt0),
        isErr: () => result.isErr(),
        isErrAnd: () => result.isErrAnd(gt0),
        ok: () => result.ok(),
        err: () => result.err(),
        map: () => result.map(inc),
        mapAsync: () => result.mapAsync(asyncInc),
        mapOr: () => result.mapOr(0, inc),
        mapOrElse: () => result.mapOrElse(inc, inc),
        mapOrElseAsync: () => result.mapOrElseAsync(asyncInc, asyncInc),
        mapErr: () => result.mapErr(inc),
        mapErrAsync: () => result.mapErrAsync(asyncInc),
        inspect: () => result.inspect(do_not_optimize),
        inspectAsync: () =>
            result.inspectAsync(async (value) => {
                do_not_optimize(value);
            }),
        inspectErr: () => result.inspectErr(do_not_optimize),
        inspectErrAsync: () =>
            result.inspectErrAsync(async (value) => {
                do_not_optimize(value);
            }),
        expect: () => result.expect('benchmark'),
        unwrap: () => result.unwrap(),
        expectErr: () => result.expectErr('benchmark'),
        unwrapErr: () => result.unwrapErr(),
        and: () => result.and(ok),
        andThen: () => result.andThen((value) => Ok(value + 1)),
        andThenAsync: () => result.andThenAsync(async (value) => Ok(value + 1)),
        or: () => result.or(err),
        orElse: () => result.orElse((error) => Err(error + 1)),
        orElseAsync: () => result.orElseAsync(async (error) => Err(error + 1)),
        unwrapOr: () => result.unwrapOr(0),
        unwrapOrElse: () => result.unwrapOrElse(inc),
        unwrapOrElseAsync: () => result.unwrapOrElseAsync(asyncInc),
        flatten: () => nested.flatten(),
        transpose: () => transposed.transpose(),
        match: () => result.match({ Ok: inc, Err: inc })
    } satisfies Record<keyof AsyncResult<number, number>, () => unknown>;

    group(`AsyncResult - ${variant} wrapper methods`, () => {
        for (const [method, operation] of Object.entries(operations)) {
            const panics =
                variant === 'Err'
                    ? method === 'expect' || method === 'unwrap'
                    : method === 'expectErr' || method === 'unwrapErr';
            bench(`AsyncResult.${method} (${variant})`, async () => {
                if (panics) {
                    try {
                        await operation();
                    } catch (error) {
                        do_not_optimize(error);
                    }
                } else {
                    do_not_optimize(await operation());
                }
            }).gc('once');
        }
    });
}
