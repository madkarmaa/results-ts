import { bench, do_not_optimize, group } from 'mitata';
import { Ok, Err, type Result } from '../src/result';
import { catchUnwindAsync } from '../src/async-result';
import { tryBlockAsync } from '../src/try-block';
import {
    ok,
    err,
    asyncInc,
    safeAsyncInc,
    asyncReject,
    safeAsyncReject
} from './fixtures';

// ---------------------------------------------------------------------------
// Async Result - terminal unwrap (AsyncResult)
// ---------------------------------------------------------------------------
group('Async Result - terminal unwrap', () => {
    const okAsync = ok.mapAsync((x) => Promise.resolve(x + 1));
    const errAsync = err.mapAsync((x) => Promise.resolve(x + 1));

    bench('AsyncResult.unwrap (Ok path)', async () => {
        do_not_optimize(await okAsync.unwrap());
    }).gc('once');
    bench('AsyncResult.unwrap (Err path)', async () => {
        try {
            await errAsync.unwrapErr();
        } catch (e) {
            do_not_optimize(e);
        }
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Result - sync-typed *Async methods (the extra-Promise wrappers)
// ---------------------------------------------------------------------------
group('Async Result - sync-typed methods', () => {
    const okT: Result<number, number> = Ok(1);
    const errT: Result<number, number> = Err(1);

    bench('Result.mapOrElseAsync (Ok path)', async () => {
        do_not_optimize(
            await okT.mapOrElseAsync(
                async () => 0,
                async (x) => x + 1
            )
        );
    }).gc('once');
    bench('Result.mapOrElseAsync (Err path)', async () => {
        do_not_optimize(
            await errT.mapOrElseAsync(
                async () => 0,
                async (x) => x + 1
            )
        );
    }).gc('once');
    bench('Result.unwrapOrElseAsync (Ok path)', async () => {
        do_not_optimize(await okT.unwrapOrElseAsync(async () => 2));
    }).gc('once');
    bench('Result.unwrapOrElseAsync (Err path)', async () => {
        do_not_optimize(await errT.unwrapOrElseAsync(async () => 2));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Result - transform methods (each constructs a new AsyncResultImpl)
// ---------------------------------------------------------------------------
group('Async Result - transform methods', () => {
    bench('Ok.mapAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await ok.mapAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('Err.mapAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await err.mapAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('Ok.mapErrAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await ok.mapErrAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('Err.mapErrAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await err.mapErrAsync((x) => Promise.resolve(x + 1)));
    }).gc('once');
    bench('Ok.inspectAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await ok.inspectAsync(() => Promise.resolve()));
    }).gc('once');
    bench('Err.inspectAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await err.inspectAsync(() => Promise.resolve()));
    }).gc('once');
    bench('Ok.inspectErrAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await ok.inspectErrAsync(() => Promise.resolve()));
    }).gc('once');
    bench('Err.inspectErrAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await err.inspectErrAsync(() => Promise.resolve()));
    }).gc('once');
    bench('Ok.andThenAsync (alloc AsyncResult)', async () => {
        do_not_optimize(
            await ok.andThenAsync((x) => Promise.resolve(Ok(x + 1)))
        );
    }).gc('once');
    bench('Err.andThenAsync (alloc AsyncResult)', async () => {
        do_not_optimize(
            await err.andThenAsync((x) => Promise.resolve(Ok(x + 1)))
        );
    }).gc('once');
    bench('Ok.orElseAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await ok.orElseAsync(() => Promise.resolve(Err(2))));
    }).gc('once');
    bench('Err.orElseAsync (alloc AsyncResult)', async () => {
        do_not_optimize(await err.orElseAsync(() => Promise.resolve(Ok(2))));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Result - then() wrapping (await cost)
// ---------------------------------------------------------------------------
group('Async Result - then() wrapping', () => {
    const okAsync = ok.mapAsync((x) => Promise.resolve(x + 1));

    bench('AsyncResult.then (await)', async () => {
        do_not_optimize(await okAsync);
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Result - tryBlockAsync
// ---------------------------------------------------------------------------
group('Async Result - tryBlockAsync', () => {
    bench('tryBlockAsync (Ok path)', async () => {
        do_not_optimize(
            await tryBlockAsync(async function* ($) {
                const a = yield* $(ok);
                const b = yield* $(Promise.resolve(Ok(a + 1)));

                return b + 1;
            })
        );
    }).gc('once');
    bench('tryBlockAsync (first Err)', async () => {
        do_not_optimize(
            await tryBlockAsync(async function* ($) {
                const a = yield* $(err);
                const b = yield* $(Promise.resolve(Ok(a + 1)));

                return b + 1;
            })
        );
    }).gc('once');
    bench('tryBlockAsync (second Err)', async () => {
        do_not_optimize(
            await tryBlockAsync(async function* ($) {
                const a = yield* $(ok);
                const b = yield* $(Promise.resolve(Err(a + 1)));

                return b + 1;
            })
        );
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Async Result - catchUnwindAsync
// ---------------------------------------------------------------------------
group('Async Result - catchUnwindAsync', () => {
    bench('catchUnwindAsync (wrap + call, Ok)', async () => {
        const fn = catchUnwindAsync(asyncInc);
        do_not_optimize(await fn(1));
    }).gc('once');
    bench('catchUnwindAsync (call only, Ok)', async () => {
        do_not_optimize(await safeAsyncInc(1));
    }).gc('once');
    bench('catchUnwindAsync (wrap + call, reject)', async () => {
        const fn = catchUnwindAsync(asyncReject);
        do_not_optimize(await fn());
    }).gc('once');
    bench('catchUnwindAsync (call only, reject)', async () => {
        do_not_optimize(await safeAsyncReject());
    }).gc('once');
});
