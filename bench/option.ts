import { bench, do_not_optimize, group } from 'mitata';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, type Result } from '../src/result';
import { some, none, inc, gt0 } from './fixtures';

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
