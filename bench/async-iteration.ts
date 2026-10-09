import { bench, do_not_optimize, group, run } from 'mitata';
import { Some, None, type Option } from '../src/option';
import { Ok, Err, type Result } from '../src/result';
import { ASYNC_START } from '../src/utils';

type Container<T> = Option<T> | Result<T, unknown>;
type Iteration<T> = AsyncIterableIterator<Awaited<T>, undefined, unknown>;
type Step<T> = IteratorResult<Awaited<T>, undefined>;

function done(): IteratorReturnResult<undefined> {
    return { value: undefined, done: true };
}

class ThenIterator<T> implements Iteration<T> {
    #closed = false;
    #tail: Promise<void> = ASYNC_START;

    constructor(private readonly source: PromiseLike<Container<T>>) {}

    #enqueue<R>(read: () => R | PromiseLike<R>): Promise<R> {
        const result = this.#tail.then(read);
        this.#tail = result.then(
            () => {},
            () => {
                this.#closed = true;
            }
        );
        return result;
    }

    next(): Promise<Step<T>> {
        return this.#enqueue(() => {
            if (this.#closed) return done();
            this.#closed = true;
            return Promise.resolve(this.source).then<Step<T>>((container) => {
                for (const value of container.iter()) {
                    return Promise.resolve(value).then((value) => ({
                        value,
                        done: false
                    }));
                }
                return done();
            });
        });
    }

    return(value?: undefined | PromiseLike<undefined>): Promise<Step<T>> {
        return this.#enqueue(() => {
            this.#closed = true;
            return Promise.resolve(value).then(done);
        });
    }

    throw(error: unknown): Promise<Step<T>> {
        return this.#enqueue(() => {
            this.#closed = true;
            throw error;
        });
    }

    [Symbol.asyncIterator](): Iteration<T> {
        return this;
    }
}

class FastThenIterator<T> implements Iteration<T> {
    #started = false;
    #tail: Promise<void> = ASYNC_START;

    constructor(private readonly source: PromiseLike<Container<T>>) {}

    #finish(result: Promise<Step<T>>): Promise<Step<T>> {
        this.#tail = result.then(
            () => {},
            () => {}
        );
        return result;
    }

    next(): Promise<Step<T>> {
        if (this.#started) return this.#finish(this.#tail.then(done));
        this.#started = true;
        return this.#finish(
            Promise.resolve(this.source).then<Step<T>>((container) => {
                for (const value of container.iter()) {
                    return Promise.resolve(value).then((value) => ({
                        value,
                        done: false
                    }));
                }
                return done();
            })
        );
    }

    return(value?: undefined | PromiseLike<undefined>): Promise<Step<T>> {
        this.#started = true;
        return this.#finish(
            this.#tail.then(() => Promise.resolve(value).then(done))
        );
    }

    throw(error: unknown): Promise<Step<T>> {
        this.#started = true;
        return this.#finish(
            this.#tail.then(() => {
                throw error;
            })
        );
    }

    [Symbol.asyncIterator](): Iteration<T> {
        return this;
    }
}

class SingleReadThenIterator<T> implements Iteration<T> {
    #started = false;
    #pending: Promise<Step<T>> | undefined;

    constructor(private readonly source: PromiseLike<Container<T>>) {}

    next(): Promise<Step<T>> {
        if (this.#started) {
            return this.#pending
                ? this.#pending.then(done, done)
                : ASYNC_START.then(done);
        }
        this.#started = true;
        this.#pending = Promise.resolve(this.source).then<Step<T>>(
            (container) => {
                for (const value of container.iter()) {
                    return Promise.resolve(value).then((value) => ({
                        value,
                        done: false
                    }));
                }
                return done();
            }
        );
        return this.#pending;
    }

    return(value?: undefined | PromiseLike<undefined>): Promise<Step<T>> {
        this.#started = true;
        const close = () => Promise.resolve(value).then(done);
        this.#pending = this.#pending
            ? this.#pending.then(close, close)
            : close();
        return this.#pending;
    }

    throw(error: unknown): Promise<Step<T>> {
        this.#started = true;
        const fail = (): never => {
            throw error;
        };
        this.#pending = this.#pending
            ? this.#pending.then(fail, fail)
            : ASYNC_START.then(fail);
        return this.#pending;
    }

    [Symbol.asyncIterator](): Iteration<T> {
        return this;
    }
}

// Retain the original and alternatives so the comparison stays reproducible.
export const iteratorCandidates = {
    original: async function* <T>(
        source: PromiseLike<Container<T>>
    ): Iteration<T> {
        for (const value of (await source).iter()) yield await value;
    },
    implicitAwait: async function* <T>(
        source: PromiseLike<Container<T>>
    ): Iteration<T> {
        for (const value of (await source).iter()) yield value;
    },
    delegate: async function* <T>(
        source: PromiseLike<Container<T>>
    ): Iteration<T> {
        yield* (await source).iter();
    },
    direct: async function* <T>(
        source: PromiseLike<Container<T>>
    ): Iteration<T> {
        const container = await source;
        if ('_isSome' in container ? container.isSome() : container.isOk()) {
            yield container.unwrap();
        }
    },
    thenIterator: <T>(source: PromiseLike<Container<T>>): Iteration<T> =>
        new ThenIterator(source),
    fastThenIterator: <T>(source: PromiseLike<Container<T>>): Iteration<T> =>
        new FastThenIterator(source),
    singleReadThenIterator: <T>(
        source: PromiseLike<Container<T>>
    ): Iteration<T> => new SingleReadThenIterator(source)
};

for (const [variant, input] of [
    ['Some', Some(5)],
    ['None', None<number>()],
    ['Ok', Ok(5)],
    ['Err', Err('failure')]
] as const) {
    const resolved = Promise.resolve(input);
    const wrapper = input.inspectAsync(() => Promise.resolve());
    for (const mode of ['resolved wrapper', 'fresh wrapper']) {
        group(`Public async iteration - ${variant}, ${mode}`, () => {
            for (const implementation of ['original', 'production']) {
                bench(
                    `public iter ${implementation} (${variant}, ${mode})`,
                    async () => {
                        const source =
                            mode === 'resolved wrapper'
                                ? wrapper
                                : input.inspectAsync(() => Promise.resolve());
                        const iterator =
                            implementation === 'original'
                                ? iteratorCandidates.original(source)
                                : source.iter();
                        for await (const value of iterator)
                            do_not_optimize(value);
                    }
                ).gc('once');
            }
        });
    }
    for (const mode of [
        'resolved promise',
        'resolved wrapper',
        'fresh wrapper'
    ]) {
        group(`Async iteration comparison - ${variant}, ${mode}`, () => {
            for (const [name, create] of Object.entries(iteratorCandidates)) {
                bench(`iter ${name} (${variant}, ${mode})`, async () => {
                    const source =
                        mode === 'resolved promise'
                            ? resolved
                            : mode === 'resolved wrapper'
                              ? wrapper
                              : input.inspectAsync(() => Promise.resolve());
                    for await (const value of create(source)) {
                        do_not_optimize(value);
                    }
                }).gc('once');
            }
        });
    }
}

if (import.meta.main) await run({ throw: true });
