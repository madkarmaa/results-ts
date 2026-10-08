import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { bench, do_not_optimize, run } from 'mitata';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, type Result } from '../src/result';
import { AsyncOptionImpl, type AsyncOption } from '../src/async-option';
import { AsyncResultImpl, type AsyncResult } from '../src/async-result';

// Archive the baseline's src/ here. Both revisions use the same combinator API.
const baselineRoot = resolve('.cache/combinator-baseline/src');
const baselineOption: typeof import('../src/option') = await import(
    resolve(baselineRoot, 'option.ts')
);
const baselineResult: typeof import('../src/result') = await import(
    resolve(baselineRoot, 'result.ts')
);
const reverse = process.env.BENCH_REVERSE === '1';

function pair(
    name: string,
    baseline: () => unknown,
    current: () => unknown
): void {
    const cases = [
        { name: `${name} baseline`, callback: baseline },
        { name: `${name} current`, callback: current }
    ];
    if (reverse) cases.reverse();
    for (const entry of cases) bench(entry.name, entry.callback).gc('once');
}

type OptionCase = {
    name: string;
    sync: (left: Option<number>, right: Option<number>) => Option<unknown>;
    mixed: (
        left: Option<number>,
        right: AsyncOption<number>
    ) => AsyncOption<unknown>;
    async: (
        left: AsyncOption<number>,
        right: Option<number> | AsyncOption<number>
    ) => AsyncOption<unknown>;
};
const optionMethods: readonly OptionCase[] = [
    {
        name: 'and',
        sync: (left, right) => left.and(right),
        mixed: (left, right) => left.and(right),
        async: (left, right) => left.and(right)
    },
    {
        name: 'or',
        sync: (left, right) => left.or(right),
        mixed: (left, right) => left.or(right),
        async: (left, right) => left.or(right)
    },
    {
        name: 'xor',
        sync: (left, right) => left.xor(right),
        mixed: (left, right) => left.xor(right),
        async: (left, right) => left.xor(right)
    },
    {
        name: 'zip',
        sync: (left, right) => left.zip(right),
        mixed: (left, right) => left.zip(right),
        async: (left, right) => left.zip(right)
    }
];
const baselineOtherOption = baselineOption.Some(2);
const currentOtherOption = Some(2);
const baselineAsyncOtherOption = baselineOtherOption.mapAsync(
    async (value) => value
);
const currentAsyncOtherOption = currentOtherOption.mapAsync(
    async (value) => value
);
for (const state of ['Some', 'None'] as const) {
    const baseline =
        state === 'Some'
            ? baselineOption.Some(1)
            : baselineOption.None<number>();
    const current = state === 'Some' ? Some(1) : None<number>();
    const baselineAsync = baseline.mapAsync(async (value) => value);
    const currentAsync = current.mapAsync(async (value) => value);
    for (const method of optionMethods) {
        const name = `Option.${method.name} ${state}`;
        pair(
            `${name} sync+sync`,
            () => do_not_optimize(method.sync(baseline, baselineOtherOption)),
            () => do_not_optimize(method.sync(current, currentOtherOption))
        );
        pair(
            `${name} async+sync`,
            async () =>
                do_not_optimize(
                    await method.async(baselineAsync, baselineOtherOption)
                ),
            async () =>
                do_not_optimize(
                    await method.async(currentAsync, currentOtherOption)
                )
        );
        pair(
            `${name} sync+async`,
            async () =>
                do_not_optimize(
                    await method.mixed(baseline, baselineAsyncOtherOption)
                ),
            async () =>
                do_not_optimize(
                    await method.mixed(current, currentAsyncOtherOption)
                )
        );
        pair(
            `${name} async+async`,
            async () =>
                do_not_optimize(
                    await method.async(baselineAsync, baselineAsyncOtherOption)
                ),
            async () =>
                do_not_optimize(
                    await method.async(currentAsync, currentAsyncOtherOption)
                )
        );
        strategies(
            name,
            current,
            currentOtherOption,
            method.sync,
            (promise) => new AsyncOptionImpl(promise)
        );
    }
}

type ResultCase = {
    name: string;
    sync: (
        left: Result<number, string>,
        right: Result<number, never>
    ) => Result<unknown, unknown>;
    mixed: (
        left: Result<number, string>,
        right: AsyncResult<number, never>
    ) => AsyncResult<unknown, unknown>;
    async: (
        left: AsyncResult<number, string>,
        right: Result<number, never> | AsyncResult<number, never>
    ) => AsyncResult<unknown, unknown>;
};
const resultMethods: readonly ResultCase[] = [
    {
        name: 'and',
        sync: (left, right) => left.and(right),
        mixed: (left, right) => left.and(right),
        async: (left, right) => left.and(right)
    },
    {
        name: 'or',
        sync: (left, right) => left.or(right),
        mixed: (left, right) => left.or(right),
        async: (left, right) => left.or(right)
    }
];
const baselineOtherResult = baselineResult.Ok(2);
const currentOtherResult = Ok(2);
const baselineAsyncOtherResult = baselineOtherResult.mapAsync(
    async (value) => value
);
const currentAsyncOtherResult = currentOtherResult.mapAsync(
    async (value) => value
);
for (const state of ['Ok', 'Err'] as const) {
    const baseline: Result<number, string> =
        state === 'Ok' ? baselineResult.Ok(1) : baselineResult.Err('left');
    const current: Result<number, string> =
        state === 'Ok' ? Ok(1) : Err('left');
    const baselineAsync = baseline.mapAsync(async (value) => value);
    const currentAsync = current.mapAsync(async (value) => value);
    for (const method of resultMethods) {
        const name = `Result.${method.name} ${state}`;
        pair(
            `${name} sync+sync`,
            () => do_not_optimize(method.sync(baseline, baselineOtherResult)),
            () => do_not_optimize(method.sync(current, currentOtherResult))
        );
        pair(
            `${name} async+sync`,
            async () =>
                do_not_optimize(
                    await method.async(baselineAsync, baselineOtherResult)
                ),
            async () =>
                do_not_optimize(
                    await method.async(currentAsync, currentOtherResult)
                )
        );
        pair(
            `${name} sync+async`,
            async () =>
                do_not_optimize(
                    await method.mixed(baseline, baselineAsyncOtherResult)
                ),
            async () =>
                do_not_optimize(
                    await method.mixed(current, currentAsyncOtherResult)
                )
        );
        pair(
            `${name} async+async`,
            async () =>
                do_not_optimize(
                    await method.async(baselineAsync, baselineAsyncOtherResult)
                ),
            async () =>
                do_not_optimize(
                    await method.async(currentAsync, currentAsyncOtherResult)
                )
        );
        strategies(
            name,
            current,
            currentOtherResult,
            method.sync,
            (promise) => new AsyncResultImpl(promise)
        );
    }
}

function strategies<L, R, O>(
    name: string,
    left: L,
    right: R,
    combine: (left: L, right: R) => O,
    wrap: (promise: Promise<O>) => PromiseLike<O>
): void {
    // Reuse identical fulfilled native operands to isolate scheduling and wrapper
    // costs. Factory-only cases measure allocation; the rest await completion.
    const leftAsync = Promise.resolve(left);
    const rightAsync = Promise.resolve(right);
    const cases = [
        {
            name: 'sync direct',
            callback: () => do_not_optimize(combine(left, right))
        },
        {
            name: 'sync wrap factory only',
            callback: () =>
                do_not_optimize(wrap(Promise.resolve(combine(left, right))))
        },
        {
            name: 'sync wrap complete',
            callback: async () =>
                do_not_optimize(
                    await wrap(Promise.resolve(combine(left, right)))
                )
        },
        {
            name: 'sync await+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap((async () => combine(await left, await right))())
                )
        },
        {
            name: 'async+sync then+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap(leftAsync.then((value) => combine(value, right)))
                )
        },
        {
            name: 'async+sync await+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap((async () => combine(await leftAsync, right))())
                )
        },
        {
            name: 'async+async then+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap(
                        Promise.all([leftAsync, rightAsync]).then(([a, b]) =>
                            combine(a, b)
                        )
                    )
                )
        },
        {
            name: 'async+async parallel-await+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap(
                        (async () => {
                            const [a, b] = await Promise.all([
                                leftAsync,
                                rightAsync
                            ]);
                            return combine(a, b);
                        })()
                    )
                )
        },
        {
            name: 'async+async sequential-await+wrap',
            callback: async () =>
                do_not_optimize(
                    await wrap(
                        (async () =>
                            combine(await leftAsync, await rightAsync))()
                    )
                )
        }
    ];
    if (reverse) cases.reverse();
    for (const entry of cases)
        bench(`${name} strategy ${entry.name}`, entry.callback).gc('once');
}

const result = await run({ format: 'quiet', colors: false, throw: true });
const cases = result.benchmarks.flatMap((benchmark) =>
    benchmark.runs.map((entry) => ({
        name: entry.name,
        avg: entry.stats?.avg,
        p50: entry.stats?.p50,
        p75: entry.stats?.p75
    }))
);
console.log(
    JSON.stringify({
        context: {
            runtime: result.context.runtime,
            arch: result.context.arch,
            cpu: result.context.cpu.name,
            reverse
        },
        cases
    })
);

const summary = process.env.GITHUB_STEP_SUMMARY;
if (summary) {
    const lines = [
        `### Combinators (${reverse ? 'current first' : 'baseline first'})`,
        'Times are medians in ns/op. Both revisions use identical combinator calls.',
        '| Case | Baseline | Current | Change |',
        '| --- | ---: | ---: | ---: |'
    ];
    for (const baseline of cases.filter((entry) =>
        entry.name.endsWith(' baseline')
    )) {
        const name = baseline.name.slice(0, -' baseline'.length);
        const current = cases.find((entry) => entry.name === `${name} current`);
        if (baseline.p50 === undefined || current?.p50 === undefined)
            throw new Error(`Missing benchmark: ${name}`);
        lines.push(
            `| ${name} | ${baseline.p50.toFixed(2)} | ${current.p50.toFixed(2)} | ${((current.p50 / baseline.p50 - 1) * 100).toFixed(1)}% |`
        );
    }
    lines.push(
        '',
        'Awaiting and wrapping controls (ns/op):',
        '| Case | Median |',
        '| --- | ---: |'
    );
    for (const entry of cases.filter((entry) =>
        entry.name.includes(' strategy ')
    )) {
        if (entry.p50 === undefined)
            throw new Error(`Missing benchmark: ${entry.name}`);
        lines.push(`| ${entry.name} | ${entry.p50.toFixed(2)} |`);
    }
    appendFileSync(summary, `${lines.join('\n')}\n\n`);
}
