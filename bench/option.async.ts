import { bench, do_not_optimize, group } from 'mitata';
import { Some, None, type Option } from '../src/option';
import { some, none } from './fixtures';

// ---------------------------------------------------------------------------
// Async Option - terminal unwrap (AsyncOption)
// ---------------------------------------------------------------------------
group('Async Option - terminal unwrap', () => {
    const someAsync = some.mapAsync((x) => Promise.resolve(x + 1));
    const noneAsync = none.mapAsync((x) => Promise.resolve(x + 1));

    bench('AsyncOption.unwrap (Some path)', async () => {
        do_not_optimize(await someAsync.unwrap());
    }).gc('once');
    bench('AsyncOption.unwrap (None path -> Err)', async () => {
        try {
            await noneAsync.unwrap();
        } catch (e) {
            do_not_optimize(e);
        }
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Option - sync-typed *Async methods (the extra-Promise wrappers)
// ---------------------------------------------------------------------------
group('Async Option - sync-typed methods', () => {
    bench('Option.mapOrElseAsync (Some path)', async () => {
        do_not_optimize(
            await Some(1).mapOrElseAsync(
                async () => 0,
                async (x) => x + 1
            )
        );
    }).gc('once');
    bench('Option.mapOrElseAsync (None path)', async () => {
        do_not_optimize(
            await None<number>().mapOrElseAsync(
                async () => 0,
                async (x) => x + 1
            )
        );
    }).gc('once');
    bench('Option.unwrapOrElseAsync (Some path)', async () => {
        do_not_optimize(await Some(1).unwrapOrElseAsync(async () => 2));
    }).gc('once');
    bench('Option.unwrapOrElseAsync (None path)', async () => {
        do_not_optimize(await None<number>().unwrapOrElseAsync(async () => 2));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Option - transform methods (each constructs a new AsyncOptionImpl /
// AsyncResultImpl)
// ---------------------------------------------------------------------------
group('Async Option - transform methods', () => {
    bench('Some.mapAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await some.mapAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('None.mapAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await none.mapAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('Some.inspectAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await some.inspectAsync(() => Promise.resolve()));
    }).gc('once');
    bench('None.inspectAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await none.inspectAsync(() => Promise.resolve()));
    }).gc('once');
    bench('Some.andThenAsync (alloc AsyncOption)', async () => {
        do_not_optimize(
            await some.andThenAsync((x) => Promise.resolve(Some(x + 1)))
        );
    }).gc('once');
    bench('None.andThenAsync (alloc AsyncOption)', async () => {
        do_not_optimize(
            await none.andThenAsync(() => Promise.resolve(Some(2)))
        );
    }).gc('once');
    bench('Some.filterAsync true (alloc AsyncOption)', async () => {
        do_not_optimize(await some.filterAsync((x) => Promise.resolve(x > 0)));
    }).gc('once');
    bench('None.filterAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await none.filterAsync(() => Promise.resolve(true)));
    }).gc('once');
    bench('Some.orElseAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await some.orElseAsync(() => Promise.resolve(Some(2))));
    }).gc('once');
    bench('None.orElseAsync (alloc AsyncOption)', async () => {
        do_not_optimize(await none.orElseAsync(() => Promise.resolve(Some(2))));
    }).gc('once');
    bench('Some.okOrElseAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await some.okOrElseAsync(() => Promise.resolve(1)));
    }).gc('once');
    bench('None.okOrElseAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await none.okOrElseAsync(() => Promise.resolve(1)));
    }).gc('once');
    bench('Some.getOrInsertWithAsync (existing)', async () => {
        const o: Option<number> = Some(0);
        do_not_optimize(await o.getOrInsertWithAsync(() => Promise.resolve(1)));
    }).gc('once');
    bench('None.getOrInsertWithAsync (insert)', async () => {
        const o: Option<number> = None();
        do_not_optimize(await o.getOrInsertWithAsync(() => Promise.resolve(1)));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Option - then() wrapping (await cost)
// ---------------------------------------------------------------------------
group('Async Option - then() wrapping', () => {
    const someAsync = Some(1).mapAsync((x) => Promise.resolve(x + 1));

    bench('AsyncOption.then (await)', async () => {
        do_not_optimize(await someAsync);
    }).gc('once');
});
