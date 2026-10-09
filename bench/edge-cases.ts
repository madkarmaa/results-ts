import { bench, do_not_optimize, group } from 'mitata';
import { catchUnwindAsync } from '../src/async-result';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, catchUnwind, type Result } from '../src/result';
import { some, none, ok, err, thrower } from './fixtures';

group('Formatting', () => {
    for (const [name, value] of [
        ['Some', some],
        ['None', none],
        ['Ok', ok],
        ['Err', err]
    ] as const) {
        bench(`${name}.toString`, () => do_not_optimize(value.toString()));
        bench(`${name} Symbol.toStringTag`, () =>
            do_not_optimize(Object.prototype.toString.call(value))
        );
    }
});

group('Synchronous panic paths', () => {
    const operations = {
        'None.expect': () => none.expect('benchmark'),
        'None.unwrap': () => none.unwrap(),
        'Err.expect': () => err.expect('benchmark'),
        'Err.unwrap': () => err.unwrap(),
        'Ok.expectErr': () => ok.expectErr('benchmark'),
        'Ok.unwrapErr': () => ok.unwrapErr()
    };
    for (const [name, operation] of Object.entries(operations)) {
        bench(name, () => {
            try {
                operation();
            } catch (error) {
                do_not_optimize(error);
            }
        }).gc('once');
    }
});

group('Nested and inactive branches', () => {
    const nestedError: Result<Result<number, number>, number> = Err(1);
    const nestedNone: Option<Option<number>> = None();
    bench('Ok(Err).flatten', () => do_not_optimize(Ok(Err(1)).flatten())).gc(
        'once'
    );
    bench('Err.flatten', () => do_not_optimize(nestedError.flatten())).gc(
        'once'
    );
    bench('Some(None).flatten', () =>
        do_not_optimize(Some(None()).flatten())
    ).gc('once');
    bench('None.flatten', () => do_not_optimize(nestedNone.flatten())).gc(
        'once'
    );
    bench('None.xor(None)', () => do_not_optimize(none.xor(none))).gc('once');
    bench('None.takeIf', () =>
        do_not_optimize(None<number>().takeIf(() => true))
    ).gc('once');
    bench('Some.filterAsync false', async () =>
        do_not_optimize(await some.filterAsync(async () => false))
    ).gc('once');
});

group('Unwind error mapping', () => {
    const mapped = catchUnwind(thrower, () => 'failure');
    const mappedAsync = catchUnwindAsync(thrower, () => 'failure');
    const syncReturn = catchUnwindAsync((value: number) => value + 1);
    bench('catchUnwind mapped error', () => do_not_optimize(mapped())).gc(
        'once'
    );
    bench('catchUnwindAsync mapped synchronous throw', async () =>
        do_not_optimize(await mappedAsync())
    ).gc('once');
    bench('catchUnwindAsync synchronous return', async () =>
        do_not_optimize(await syncReturn(1))
    ).gc('once');
});

group('Async nested branches', () => {
    const nestedOptions: readonly Option<Option<number>>[] = [
        Some(Some(1)),
        Some(None()),
        None()
    ];
    for (const [index, input] of nestedOptions.entries()) {
        const option = input.inspectAsync(async () => {});
        bench(`AsyncOption.flatten nested branch ${index}`, async () =>
            do_not_optimize(await option.flatten())
        ).gc('once');
    }
    const nestedResults: readonly Result<Result<number, number>, number>[] = [
        Ok(Ok(1)),
        Ok(Err(2)),
        Err(3)
    ];
    for (const [index, input] of nestedResults.entries()) {
        const result = input.inspectAsync(async () => {});
        bench(`AsyncResult.flatten nested branch ${index}`, async () =>
            do_not_optimize(await result.flatten())
        ).gc('once');
    }
    const optionalResults: readonly Option<Result<number, number>>[] = [
        Some(Ok(1)),
        Some(Err(2)),
        None()
    ];
    for (const [index, input] of optionalResults.entries()) {
        const option = input.inspectAsync(async () => {});
        bench(`AsyncOption.transpose nested branch ${index}`, async () =>
            do_not_optimize(await option.transpose())
        ).gc('once');
    }
    const resultOptions: readonly Result<Option<number>, number>[] = [
        Ok(Some(1)),
        Ok(None()),
        Err(2)
    ];
    for (const [index, input] of resultOptions.entries()) {
        const result = input.inspectAsync(async () => {});
        bench(`AsyncResult.transpose nested branch ${index}`, async () =>
            do_not_optimize(await result.transpose())
        ).gc('once');
    }
});

group('Async Option initialization contention', () => {
    bench('None.getOrInsertWithAsync concurrent callers', async () => {
        const option = None<number>();
        do_not_optimize(
            await Promise.all([
                option.getOrInsertWithAsync(async () => 1),
                option.getOrInsertWithAsync(async () => 2)
            ])
        );
    }).gc('once');
    bench('None.getOrInsertWithAsync intervening mutation', async () => {
        const option = None<number>();
        const gate = Promise.withResolvers<number>();
        const pending = option.getOrInsertWithAsync(() => gate.promise);
        option.insert(2);
        gate.resolve(1);
        do_not_optimize(await pending);
    }).gc('once');
});
