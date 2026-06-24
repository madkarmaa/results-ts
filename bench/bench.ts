import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { run, bench, do_not_optimize, group } from 'mitata';
import { Ok, Err, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';

// shared fixtures
const ok: Result<number, number> = Ok(1);
const err: Result<number, number> = Err(1);
const some: Option<number> = Some(1);
const none: Option<number> = None();
const inc = (x: number): number => x + 1;
const gt0 = (x: number): boolean => x > 0;

// ---------------------------------------------------------------------------
// constructors
// ---------------------------------------------------------------------------
group('constructors', () => {
    bench('Ok(1)', () => {
        do_not_optimize(Ok(1));
    }).gc('once');
    bench('Err(1)', () => {
        do_not_optimize(Err(1));
    }).gc('once');
    bench('Some(1)', () => {
        do_not_optimize(Some(1));
    }).gc('once');
    bench('None()', () => {
        do_not_optimize(None());
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Result - queries
// ---------------------------------------------------------------------------
group('Result - queries', () => {
    bench('Ok.isOk()', () => {
        do_not_optimize(ok.isOk());
    });
    bench('Err.isOk()', () => {
        do_not_optimize(err.isOk());
    });
    bench('Ok.isErr()', () => {
        do_not_optimize(ok.isErr());
    });
    bench('Err.isErr()', () => {
        do_not_optimize(err.isErr());
    });
    bench('Ok.isOkAnd (true)', () => {
        do_not_optimize(ok.isOkAnd(gt0));
    });
    bench('Err.isOkAnd', () => {
        do_not_optimize(err.isOkAnd(gt0));
    });
    bench('Ok.isErrAnd', () => {
        do_not_optimize(ok.isErrAnd(gt0));
    });
    bench('Err.isErrAnd (true)', () => {
        do_not_optimize(err.isErrAnd(gt0));
    });
});

// ---------------------------------------------------------------------------
// Result - conversions
// ---------------------------------------------------------------------------
group('Result - conversions', () => {
    bench('Ok.ok()', () => {
        do_not_optimize(ok.ok());
    }).gc('once');
    bench('Err.ok()', () => {
        do_not_optimize(err.ok());
    }).gc('once');
    bench('Ok.err()', () => {
        do_not_optimize(ok.err());
    }).gc('once');
    bench('Err.err()', () => {
        do_not_optimize(err.err());
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Result - map family (allocation-heavy transforms)
// ---------------------------------------------------------------------------
group('Result - map family', () => {
    bench('Ok.map (alloc)', () => {
        do_not_optimize(ok.map(inc));
    }).gc('once');
    bench('Err.map (reuse)', () => {
        do_not_optimize(err.map(inc));
    }).gc('once');
    bench('Ok.mapOr', () => {
        do_not_optimize(ok.mapOr(0, inc));
    });
    bench('Err.mapOr', () => {
        do_not_optimize(err.mapOr(0, inc));
    });
    bench('Ok.mapOrElse', () => {
        do_not_optimize(ok.mapOrElse(() => 0, inc));
    });
    bench('Err.mapOrElse', () => {
        do_not_optimize(err.mapOrElse(() => 0, inc));
    });
    bench('Ok.mapErr (reuse)', () => {
        do_not_optimize(ok.mapErr(inc));
    }).gc('once');
    bench('Err.mapErr (alloc)', () => {
        do_not_optimize(err.mapErr(inc));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Result - inspect family
// ---------------------------------------------------------------------------
group('Result - inspect family', () => {
    bench('Ok.inspect', () => {
        do_not_optimize(ok.inspect(() => {}));
    });
    bench('Err.inspect', () => {
        do_not_optimize(err.inspect(() => {}));
    });
    bench('Ok.inspectErr', () => {
        do_not_optimize(ok.inspectErr(() => {}));
    });
    bench('Err.inspectErr', () => {
        do_not_optimize(err.inspectErr(() => {}));
    });
});

// ---------------------------------------------------------------------------
// Result - unwrap family
// ---------------------------------------------------------------------------
group('Result - unwrap family', () => {
    bench('Ok.unwrap', () => {
        do_not_optimize(ok.unwrap());
    });
    bench('Err.unwrapErr', () => {
        do_not_optimize(err.unwrapErr());
    });
    bench('Ok.expect', () => {
        do_not_optimize(ok.expect('msg'));
    });
    bench('Err.expectErr', () => {
        do_not_optimize(err.expectErr('msg'));
    });
    bench('Ok.unwrapOr', () => {
        do_not_optimize(ok.unwrapOr(0));
    });
    bench('Err.unwrapOr', () => {
        do_not_optimize(err.unwrapOr(0));
    });
    bench('Ok.unwrapOrElse', () => {
        do_not_optimize(ok.unwrapOrElse(() => 0));
    });
    bench('Err.unwrapOrElse', () => {
        do_not_optimize(err.unwrapOrElse(() => 0));
    });
});

// ---------------------------------------------------------------------------
// Result - combinators (allocation-heavy transforms)
// ---------------------------------------------------------------------------
group('Result - combinators', () => {
    const ok2: Result<number, number> = Ok(2);
    const err2: Result<number, number> = Err(2);

    bench('Ok.and (reuse)', () => {
        do_not_optimize(ok.and(ok2));
    }).gc('once');
    bench('Err.and (reuse)', () => {
        do_not_optimize(err.and(ok2));
    }).gc('once');
    bench('Ok.andThen (alloc)', () => {
        do_not_optimize(ok.andThen((x) => Ok(x + 1)));
    }).gc('once');
    bench('Err.andThen (alloc)', () => {
        do_not_optimize(err.andThen((x) => Ok(x + 1)));
    }).gc('once');
    bench('Ok.or (reuse)', () => {
        do_not_optimize(ok.or(err2));
    }).gc('once');
    bench('Err.or (reuse)', () => {
        do_not_optimize(err.or(err2));
    }).gc('once');
    bench('Ok.orElse (alloc)', () => {
        do_not_optimize(ok.orElse(() => err2));
    }).gc('once');
    bench('Err.orElse (alloc)', () => {
        do_not_optimize(err.orElse(() => err2));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Result - flatten / transpose / match (heavy transforms)
// ---------------------------------------------------------------------------
group('Result - flatten / transpose / match', () => {
    const nestedOk: Result<Result<number, number>, number> = Ok(Ok(1));

    bench('Result.flatten', () => {
        do_not_optimize(nestedOk.flatten());
    }).gc('once');
    bench('Ok(Some).transpose', () => {
        const r: Result<Option<number>, number> = Ok(Some(1));
        do_not_optimize(r.transpose());
    }).gc('once');
    bench('Ok(None).transpose', () => {
        const r: Result<Option<number>, number> = Ok(None());
        do_not_optimize(r.transpose());
    }).gc('once');
    bench('Err.transpose', () => {
        const r: Result<Option<number>, number> = Err(1);
        do_not_optimize(r.transpose());
    }).gc('once');
    bench('Ok.match', () => {
        do_not_optimize(ok.match({ Ok: inc, Err: inc }));
    });
    bench('Err.match', () => {
        do_not_optimize(err.match({ Ok: inc, Err: inc }));
    });
});

// ---------------------------------------------------------------------------
// Result - iter
// ---------------------------------------------------------------------------
group('Result - iter', () => {
    bench('Ok.iter', () => {
        for (const v of ok.iter()) do_not_optimize(v);
    });
    bench('Err.iter', () => {
        for (const v of err.iter()) do_not_optimize(v);
    });
});

// ---------------------------------------------------------------------------
// Option - queries
// ---------------------------------------------------------------------------
group('Option - queries', () => {
    bench('Some.isSome()', () => {
        do_not_optimize(some.isSome());
    });
    bench('None.isSome()', () => {
        do_not_optimize(none.isSome());
    });
    bench('Some.isNone()', () => {
        do_not_optimize(some.isNone());
    });
    bench('None.isNone()', () => {
        do_not_optimize(none.isNone());
    });
    bench('Some.isSomeAnd (true)', () => {
        do_not_optimize(some.isSomeAnd(gt0));
    });
    bench('None.isSomeAnd', () => {
        do_not_optimize(none.isSomeAnd(gt0));
    });
    bench('Some.isNoneOr (true)', () => {
        do_not_optimize(some.isNoneOr(gt0));
    });
    bench('None.isNoneOr', () => {
        do_not_optimize(none.isNoneOr(gt0));
    });
});

// ---------------------------------------------------------------------------
// Option - unwrap family
// ---------------------------------------------------------------------------
group('Option - unwrap family', () => {
    bench('Some.unwrap', () => {
        do_not_optimize(some.unwrap());
    });
    bench('Some.expect', () => {
        do_not_optimize(some.expect('msg'));
    });
    bench('Some.unwrapOr', () => {
        do_not_optimize(some.unwrapOr(0));
    });
    bench('None.unwrapOr', () => {
        do_not_optimize(none.unwrapOr(0));
    });
    bench('Some.unwrapOrElse', () => {
        do_not_optimize(some.unwrapOrElse(() => 0));
    });
    bench('None.unwrapOrElse', () => {
        do_not_optimize(none.unwrapOrElse(() => 0));
    });
});

// ---------------------------------------------------------------------------
// Option - map family (allocation-heavy transforms)
// ---------------------------------------------------------------------------
group('Option - map family', () => {
    bench('Some.map (alloc)', () => {
        do_not_optimize(some.map(inc));
    }).gc('once');
    bench('None.map (alloc)', () => {
        do_not_optimize(none.map(inc));
    }).gc('once');
    bench('Some.mapOr', () => {
        do_not_optimize(some.mapOr(0, inc));
    });
    bench('None.mapOr', () => {
        do_not_optimize(none.mapOr(0, inc));
    });
    bench('Some.mapOrElse', () => {
        do_not_optimize(some.mapOrElse(() => 0, inc));
    });
    bench('None.mapOrElse', () => {
        do_not_optimize(none.mapOrElse(() => 0, inc));
    });
    bench('Some.inspect', () => {
        do_not_optimize(some.inspect(() => {}));
    });
    bench('None.inspect', () => {
        do_not_optimize(none.inspect(() => {}));
    });
});

// ---------------------------------------------------------------------------
// Option - okOr / okOrElse (Result construction)
// ---------------------------------------------------------------------------
group('Option - okOr family', () => {
    bench('Some.okOr', () => {
        do_not_optimize(some.okOr(1));
    }).gc('once');
    bench('None.okOr', () => {
        do_not_optimize(none.okOr(1));
    }).gc('once');
    bench('Some.okOrElse', () => {
        do_not_optimize(some.okOrElse(() => 1));
    }).gc('once');
    bench('None.okOrElse', () => {
        do_not_optimize(none.okOrElse(() => 1));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Option - combinators (allocation-heavy transforms)
// ---------------------------------------------------------------------------
group('Option - combinators', () => {
    const some2: Option<number> = Some(2);
    bench('Some.and (reuse/optb)', () => {
        do_not_optimize(some.and(some2));
    }).gc('once');
    bench('None.and (alloc)', () => {
        do_not_optimize(none.and(some2));
    }).gc('once');
    bench('Some.andThen (alloc)', () => {
        do_not_optimize(some.andThen((x) => Some(x + 1)));
    }).gc('once');
    bench('None.andThen (alloc)', () => {
        do_not_optimize(none.andThen(() => some2));
    }).gc('once');
    bench('Some.filter (true, reuse)', () => {
        do_not_optimize(some.filter(() => true));
    });
    bench('Some.filter (false, alloc)', () => {
        do_not_optimize(some.filter(() => false));
    }).gc('once');
    bench('None.filter (alloc)', () => {
        do_not_optimize(none.filter(() => true));
    }).gc('once');
    bench('Some.or (reuse)', () => {
        do_not_optimize(some.or(some2));
    });
    bench('None.or (reuse/optb)', () => {
        do_not_optimize(none.or(some2));
    });
    bench('Some.orElse (reuse)', () => {
        do_not_optimize(some.orElse(() => some2));
    });
    bench('None.orElse (alloc)', () => {
        do_not_optimize(none.orElse(() => some2));
    }).gc('once');
    bench('Some xor None (reuse)', () => {
        do_not_optimize(some.xor(none));
    });
    bench('None xor Some (reuse/optb)', () => {
        do_not_optimize(none.xor(some));
    });
    bench('Some xor Some (alloc)', () => {
        do_not_optimize(some.xor(some2));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Option - mutation (insert / getOrInsert / take / replace)
// ---------------------------------------------------------------------------
group('Option - mutation', () => {
    bench('Some.insert', () => {
        const o = Some(0);
        do_not_optimize(o.insert(1));
    });
    bench('None.insert', () => {
        const o: Option<number> = None();
        do_not_optimize(o.insert(1));
    });
    bench('Some.getOrInsert (existing)', () => {
        const o = Some(0);
        do_not_optimize(o.getOrInsert(1));
    });
    bench('None.getOrInsert (insert)', () => {
        const o: Option<number> = None();
        do_not_optimize(o.getOrInsert(1));
    });
    bench('Some.getOrInsertWith (existing)', () => {
        const o = Some(0);
        do_not_optimize(o.getOrInsertWith(() => 1));
    });
    bench('None.getOrInsertWith (insert)', () => {
        const o: Option<number> = None();
        do_not_optimize(o.getOrInsertWith(() => 1));
    });
    bench('Some.take', () => {
        const o = Some(1);
        do_not_optimize(o.take());
    }).gc('once');
    bench('None.take', () => {
        const o: Option<number> = None();
        do_not_optimize(o.take());
    }).gc('once');
    bench('Some.takeIf (true)', () => {
        const o = Some(1);
        do_not_optimize(o.takeIf(() => true));
    }).gc('once');
    bench('Some.takeIf (false)', () => {
        const o = Some(1);
        do_not_optimize(o.takeIf(() => false));
    }).gc('once');
    bench('Some.replace', () => {
        const o = Some(1);
        do_not_optimize(o.replace(2));
    }).gc('once');
    bench('None.replace', () => {
        const o: Option<number> = None();
        do_not_optimize(o.replace(2));
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Option - flatten / transpose / unzip / match (heavy transforms)
// ---------------------------------------------------------------------------
group('Option - flatten / transpose / unzip / match', () => {
    const nestedSome: Option<Option<number>> = Some(Some(1));

    bench('Option.flatten', () => {
        do_not_optimize(nestedSome.flatten());
    }).gc('once');
    bench('Some(Ok).transpose', () => {
        do_not_optimize(Some<Result<number, number>>(Ok(1)).transpose());
    }).gc('once');
    bench('Some(Err).transpose', () => {
        do_not_optimize(Some<Result<number, number>>(Err(1)).transpose());
    }).gc('once');
    bench('None.transpose', () => {
        do_not_optimize(None<Result<number, number>>().transpose());
    }).gc('once');
    bench('Some.unzip', () => {
        do_not_optimize(Some<[number, number]>([1, 2]).unzip());
    }).gc('once');
    bench('None.unzip', () => {
        do_not_optimize(None<[number, number]>().unzip());
    }).gc('once');
    bench('Some.match', () => {
        do_not_optimize(some.match({ Some: inc, None: () => 0 }));
    });
    bench('None.match', () => {
        do_not_optimize(none.match({ Some: inc, None: () => 0 }));
    });
});

// ---------------------------------------------------------------------------
// Option - iter
// ---------------------------------------------------------------------------
group('Option - iter', () => {
    bench('Some.iter', () => {
        for (const v of some.iter()) do_not_optimize(v);
    });
    bench('None.iter', () => {
        for (const v of none.iter()) do_not_optimize(v);
    });
});

// ---------------------------------------------------------------------------
// Async - terminal unwrap (AsyncResult / AsyncOption)
// ---------------------------------------------------------------------------
group('Async - terminal unwrap', () => {
    const okT: Result<number, number> = Ok(1);
    const errT: Result<number, number> = Err(1);
    const okAsync = okT.mapAsync((x) => Promise.resolve(x + 1));
    const errAsync = errT.mapAsync((x) => Promise.resolve(x + 1));
    const someAsync = Some(1).mapAsync((x) => Promise.resolve(x + 1));
    const noneAsync = None<number>().mapAsync((x) => Promise.resolve(x + 1));

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
// Async - sync-typed *Async methods (the extra-Promise wrappers)
// ---------------------------------------------------------------------------
group('Async - sync-typed *Async methods', () => {
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
// Async - Result transform methods (each constructs a new AsyncResultImpl)
// ---------------------------------------------------------------------------
group('Async - Result transform methods', () => {
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
// Async - Option transform methods (each constructs a new AsyncOptionImpl /
// AsyncResultImpl)
// ---------------------------------------------------------------------------
group('Async - Option transform methods', () => {
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
// Async - then() wrapping (await cost)
// ---------------------------------------------------------------------------
group('Async - then() wrapping', () => {
    const okAsync = ok.mapAsync((x) => Promise.resolve(x + 1));
    const someAsync = Some(1).mapAsync((x) => Promise.resolve(x + 1));

    bench('AsyncResult.then (await)', async () => {
        do_not_optimize(await okAsync);
    }).gc('once');
    bench('AsyncOption.then (await)', async () => {
        do_not_optimize(await someAsync);
    }).gc('once');
});

// ---------------------------------------------------------------------------
// Runner modes
// ---------------------------------------------------------------------------
const PUBLISH = process.env.BENCH_PUBLISH === '1';

const main = async () => {
    if (!PUBLISH) await run();

    const lines: string[] = [];

    lines.push('# Benchmarks');

    await run({
        format: 'markdown',
        colors: false,
        print: (s: string) => lines.push(s)
    });

    const out = lines.join('\n').trimEnd() + '\n';

    const here = resolve(dirname(fileURLToPath(import.meta.url)));
    writeFileSync(resolve(here, 'BENCHMARKS.md'), out);

    console.log('wrote BENCHMARKS.md');
};

main();
