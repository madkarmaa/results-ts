import { bench, do_not_optimize, group, run } from 'mitata';
import { Ok, Err, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';

type RecordValue = { readonly id: number; readonly score: number };
type Failure = { readonly code: string; readonly id: number };

const records: readonly RecordValue[] = [
    { id: 1, score: 12 },
    { id: 2, score: 0 },
    { id: 3, score: 24 },
    { id: 4, score: 36 }
];
const missing: Failure = { code: 'missing', id: 0 };
const fallback: RecordValue = { id: 0, score: 0 };
const increase = (record: RecordValue): RecordValue => ({
    id: record.id,
    score: record.score + 1
});
const validate = (record: RecordValue): Result<RecordValue, Failure> =>
    record.score > 0 ? Ok(record) : Err({ code: 'score', id: record.id });
const hasScore = (record: RecordValue) => record.score > 0;

// Supplemental workloads are reported separately from the original microbenchmarks.
group('Workloads - synchronous pipelines', () => {
    for (const failureHeavy of [false, true]) {
        bench(
            `Result object pipeline (${failureHeavy ? 'failure' : 'success'} heavy)`,
            () => {
                for (const record of records) {
                    const input: Result<RecordValue, Failure> =
                        (record.id === 1) === failureHeavy
                            ? Ok(record)
                            : Err({ code: 'missing', id: record.id });
                    do_not_optimize(
                        input
                            .andThen(validate)
                            .map(increase)
                            .mapErr((error) => ({
                                ...error,
                                code: `record:${error.code}`
                            }))
                            .orElse((error) => Ok({ id: error.id, score: 0 }))
                    );
                }
            }
        ).gc('once');

        bench(
            `Option object pipeline (${failureHeavy ? 'failure' : 'success'} heavy)`,
            () => {
                for (const record of records) {
                    const input: Option<RecordValue> =
                        (record.id === 1) === failureHeavy
                            ? Some(record)
                            : None();
                    do_not_optimize(
                        input
                            .filter(hasScore)
                            .map(increase)
                            .andThen((value) =>
                                Some({ id: value.id, score: value.score * 2 })
                            )
                            .okOr(missing)
                            .mapErr((error) => ({
                                ...error,
                                code: 'record:missing'
                            }))
                    );
                }
            }
        ).gc('once');
    }

    const results = records.map(validate);
    const options = records.map((record) =>
        hasScore(record) ? Some(record) : None<RecordValue>()
    );

    bench('Result mixed object chain (eight maps)', () => {
        for (const input of results) {
            do_not_optimize(
                input
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
            );
        }
    }).gc('once');

    bench('Option mixed object chain (eight maps)', () => {
        for (const input of options) {
            do_not_optimize(
                input
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
                    .map(increase)
            );
        }
    }).gc('once');

    bench('Option escaping mutation cycle', () => {
        for (const record of records) {
            const option = Some(record);
            do_not_optimize(option);
            do_not_optimize(option.take());
            do_not_optimize(option.getOrInsertWith(() => increase(record)));
            do_not_optimize(option.replace(record));
            do_not_optimize(option);
        }
    }).gc('once');

    bench('Nested object transpose round trip', () => {
        for (const input of results) {
            const nested = Some(input);
            do_not_optimize(nested.transpose().transpose());
        }
        do_not_optimize(
            None<Result<RecordValue, Failure>>().transpose().transpose()
        );
    }).gc('once');
});

group('Workloads - structural operands', () => {
    // These operands test validation by discriminator, as in the structural tests.
    const result = { _isOk: true } as unknown as Result<RecordValue, Failure>;
    const option = { _isSome: true } as unknown as Option<RecordValue>;

    bench('Result structural object operands', () => {
        do_not_optimize(Ok(fallback).and(result));
        do_not_optimize(Err(missing).or(result));
    }).gc('once');

    bench('Option structural object operands', () => {
        do_not_optimize(Some(fallback).and(option));
        do_not_optimize(None<RecordValue>().or(option));
        do_not_optimize(None<RecordValue>().xor(option));
    }).gc('once');
});

group('Workloads - async pipelines', () => {
    const resultPromise: Promise<Result<RecordValue, Failure>> =
        Promise.resolve(Ok(fallback));
    const optionPromise = Promise.resolve(Some(fallback));
    const resultThenable: PromiseLike<Result<RecordValue, Failure>> = {
        then: resultPromise.then.bind(resultPromise)
    };
    const optionThenable: PromiseLike<Option<RecordValue>> = {
        then: optionPromise.then.bind(optionPromise)
    };

    bench('Result PromiseLike object operand', async () => {
        do_not_optimize(await Err(missing).or(resultThenable).map(increase));
    }).gc('once');

    bench('Option PromiseLike object operand', async () => {
        do_not_optimize(
            await Some(fallback)
                .zip(optionThenable)
                .map(([left, right]) => ({
                    id: left.id,
                    score: left.score + right.score
                }))
        );
    }).gc('once');

    bench('AsyncResult mixed object chain', async () => {
        for (const record of records) {
            do_not_optimize(
                await validate(record)
                    .mapAsync(async (value) => increase(value))
                    .map(increase)
                    .andThen(validate)
                    .map(increase)
                    .orElse(() => Ok(fallback))
            );
        }
    }).gc('once');

    bench('AsyncOption mixed object chain', async () => {
        for (const record of records) {
            do_not_optimize(
                await Some(record)
                    .filter(hasScore)
                    .mapAsync(async (value) => increase(value))
                    .map(increase)
                    .andThen((value) => Some(value))
                    .map(increase)
                    .orElse(() => Some(fallback))
            );
        }
    }).gc('once');
});

if (import.meta.main) await run();
