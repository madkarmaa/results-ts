import { bench, do_not_optimize, group } from 'mitata';
import { Ok, Err, catchUnwind, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';
import { ok, err, inc, gt0, safeInc, thrower, safeThower } from './fixtures';

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
// Result - catchUnwind
// ---------------------------------------------------------------------------
group('Result - catchUnwind', () => {
    bench('catchUnwind (wrap + call, Ok)', () => {
        const fn = catchUnwind(inc);
        do_not_optimize(fn(1));
    }).gc('once');
    bench('catchUnwind (call only, Ok)', () => {
        do_not_optimize(safeInc(1));
    }).gc('once');
    bench('catchUnwind (wrap + call, Err)', () => {
        const fn = catchUnwind(thrower);
        do_not_optimize(fn());
    }).gc('once');
    bench('catchUnwind (call only, catch)', () => {
        do_not_optimize(safeThower());
    }).gc('once');
});
