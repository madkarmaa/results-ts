import { bench, do_not_optimize, group } from 'mitata';
import { Ok, Err } from '../src/result';
import { Some, None } from '../src/option';

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
