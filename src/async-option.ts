import { type Option, Some, None } from './option';
import { type AsyncResult, AsyncResultImpl } from './async-result';

/**
 * An async wrapper around `Option<T>` that is `PromiseLike` (so it's awaitable)
 * but also carries all chainable `Option` methods.
 *
 * **Intentionally omitted mutation methods:** `insert`, `getOrInsert`, `getOrInsertWith`,
 * `getOrInsertWithAsync`, `take`, `takeIf`, and `replace` are not available on `AsyncOption`.
 * These methods mutate the `Option` in-place, which is not meaningful on a pending async value -
 * the underlying `Option` doesn't exist yet. Use `await` to resolve first, then mutate.
 *
 * **Error behavior in async context:** Methods that throw synchronously on `Option`
 * (e.g. `unwrap` on `None`, `flatten` on non-nested) will produce a rejected `Promise`.
 */
export interface AsyncOption<T> extends PromiseLike<Option<T>> {
    /**
     * Returns a `Promise` that resolves to `true` if the option is a `Some` value.
     */
    isSome(): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the option is a `Some` and the value inside matches a predicate.
     */
    isSomeAnd(f: (val: T) => boolean): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the option is a `None` value.
     */
    isNone(): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the option is a `None` or the value inside matches a predicate.
     */
    isNoneOr(f: (val: T) => boolean): Promise<boolean>;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Rejects with `PanicError` if the value is a `None` with a custom panic message provided by `msg`.
     */
    expect(msg: string): Promise<T>;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Rejects with `PanicError` if the self value equals `None`.
     */
    unwrap(): Promise<T>;

    /**
     * Returns the contained `Some` value or a provided default.
     */
    unwrapOr(defaultVal: T): Promise<T>;

    /**
     * Returns the contained `Some` value or computes it from a closure.
     */
    unwrapOrElse(f: () => T): Promise<T>;

    /**
     * Async version of `unwrapOrElse`. Returns the contained `Some` value or computes it from an async closure.
     */
    unwrapOrElseAsync(f: () => PromiseLike<T>): Promise<T>;

    /**
     * Maps an `AsyncOption<T>` to `AsyncOption<U>` by applying a function to a contained value.
     */
    map<U>(f: (val: T) => U): AsyncOption<U>;

    /**
     * Async version of `map`. Maps an `AsyncOption<T>` to `AsyncOption<U>` by applying an async function to a contained value.
     */
    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncOption<U>;

    /**
     * Calls the provided closure with a reference to the contained value (if `Some`).
     *
     * Returns the original option.
     */
    inspect(f: (val: T) => void): AsyncOption<T>;

    /**
     * Async version of `inspect`. Calls the provided async closure with a reference to the contained value (if `Some`), then returns the original option.
     */
    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncOption<T>;

    /**
     * Returns the provided default result (if none), or applies a function to the contained value (if any).
     */
    mapOr<U>(defaultVal: U, f: (val: T) => U): Promise<U>;

    /**
     * Computes a default function result (if none), or applies a different function to the contained value (if any).
     */
    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): Promise<U>;

    /**
     * Async version of `mapOrElse`. Computes a default async function result (if none), or applies a different async function to the contained value (if any).
     */
    mapOrElseAsync<U>(
        defaultF: () => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U>;

    /**
     * Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.
     */
    okOr<E>(err: E): AsyncResult<T, E>;

    /**
     * Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.
     */
    okOrElse<E>(errF: () => E): AsyncResult<T, E>;

    /**
     * Async version of `okOrElse`. Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(await errF())`.
     */
    okOrElseAsync<E>(errF: () => PromiseLike<E>): AsyncResult<T, E>;

    /**
     * Returns `None` if the option is `None`, otherwise returns `optb`.
     */
    and<U>(optb: Option<U>): AsyncOption<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     */
    andThen<U>(f: (val: T) => Option<U>): AsyncOption<U>;

    /**
     * Async version of `andThen`. Returns `None` if the option is `None`, otherwise calls async `f` with the wrapped value and returns the result.
     */
    andThenAsync<U>(f: (val: T) => PromiseLike<Option<U>>): AsyncOption<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` returns `false`.
     */
    filter(predicate: (val: T) => boolean): AsyncOption<T>;

    /**
     * Async version of `filter`. Returns `None` if the option is `None`, otherwise calls async `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` resolves to `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` resolves to `false`.
     */
    filterAsync(predicate: (val: T) => PromiseLike<boolean>): AsyncOption<T>;

    /**
     * Returns the option if it contains a value, otherwise returns `optb`.
     */
    or<T2>(optb: Option<T2>): AsyncOption<T | T2>;

    /**
     * Returns the option if it contains a value, otherwise calls `f` and returns the result.
     */
    orElse<T2>(f: () => Option<T2>): AsyncOption<T | T2>;

    /**
     * Async version of `orElse`. Returns the option if it contains a value, otherwise calls async `f` and returns the result.
     */
    orElseAsync<T2>(f: () => PromiseLike<Option<T2>>): AsyncOption<T | T2>;

    /**
     * Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.
     */
    xor<T2>(optb: Option<T2>): AsyncOption<T | T2>;

    /**
     * Converts from `AsyncOption<Option<T>>` to `AsyncOption<T>`.
     *
     * **Async note:** If the inner value is not an `Option`, this produces a rejected `Promise`
     * with `FlattenError` rather than a synchronous throw.
     */
    flatten<U>(this: AsyncOption<Option<U>>): AsyncOption<U>;

    /**
     * Matches the `Option` with two functions, one for each variant.
     */
    match<U>(handlers: { Some: (val: T) => U; None: () => U }): Promise<U>;
}

export class AsyncOptionImpl<T> implements AsyncOption<T> {
    constructor(private promise: PromiseLike<Option<T>>) {}

    then<TResult1 = Option<T>, TResult2 = never>(
        onfulfilled?:
            | ((value: Option<T>) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
        onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null
    ): Promise<TResult1 | TResult2> {
        return Promise.resolve(this.promise).then(onfulfilled, onrejected);
    }

    async isSome(): Promise<boolean> {
        const opt = await this;
        return opt.isSome();
    }

    async isSomeAnd(f: (val: T) => boolean): Promise<boolean> {
        const opt = await this;
        return opt.isSomeAnd(f);
    }

    async isNone(): Promise<boolean> {
        const opt = await this;
        return opt.isNone();
    }

    async isNoneOr(f: (val: T) => boolean): Promise<boolean> {
        const opt = await this;
        return opt.isNoneOr(f);
    }

    async expect(msg: string): Promise<T> {
        const opt = await this;
        return opt.expect(msg);
    }

    async unwrap(): Promise<T> {
        const opt = await this;
        return opt.unwrap();
    }

    async unwrapOr(defaultVal: T): Promise<T> {
        const opt = await this;
        return opt.unwrapOr(defaultVal);
    }

    async unwrapOrElse(f: () => T): Promise<T> {
        const opt = await this;
        return opt.unwrapOrElse(f);
    }

    async unwrapOrElseAsync(f: () => PromiseLike<T>): Promise<T> {
        const opt = await this;
        return await opt.unwrapOrElseAsync(f);
    }

    map<U>(f: (val: T) => U): AsyncOption<U> {
        return new AsyncOptionImpl(this.then((opt) => opt.map(f)));
    }

    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncOption<U> {
        return new AsyncOptionImpl(
            this.then((opt) =>
                opt.isSome() ? f(opt.unwrap()).then(Some) : None<U>()
            )
        );
    }

    inspect(f: (val: T) => void): AsyncOption<T> {
        return new AsyncOptionImpl(this.then((opt) => opt.inspect(f)));
    }

    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncOption<T> {
        return new AsyncOptionImpl(
            this.then((opt) =>
                opt.isSome() ? f(opt.unwrap()).then(() => opt) : opt
            )
        );
    }

    async mapOr<U>(defaultVal: U, f: (val: T) => U): Promise<U> {
        const opt = await this;
        return opt.mapOr(defaultVal, f);
    }

    async mapOrElse<U>(defaultF: () => U, f: (val: T) => U): Promise<U> {
        const opt = await this;
        return opt.mapOrElse(defaultF, f);
    }

    async mapOrElseAsync<U>(
        defaultF: () => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U> {
        const opt = await this;
        return await opt.mapOrElseAsync(defaultF, f);
    }

    okOr<E>(err: E): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((opt) => opt.okOr(err)));
    }

    okOrElse<E>(errF: () => E): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((opt) => opt.okOrElse(errF)));
    }

    okOrElseAsync<E>(errF: () => PromiseLike<E>): AsyncResult<T, E> {
        return new AsyncResultImpl(
            this.then((opt) =>
                opt.isSome()
                    ? opt.okOr(null as never)
                    : errF().then((e) => opt.okOr(e))
            )
        );
    }

    and<U>(optb: Option<U>): AsyncOption<U> {
        return new AsyncOptionImpl(this.then((opt) => opt.and(optb)));
    }

    andThen<U>(f: (val: T) => Option<U>): AsyncOption<U> {
        return new AsyncOptionImpl(this.then((opt) => opt.andThen(f)));
    }

    andThenAsync<U>(f: (val: T) => PromiseLike<Option<U>>): AsyncOption<U> {
        return new AsyncOptionImpl(
            this.then((opt) => (opt.isSome() ? f(opt.unwrap()) : None<U>()))
        );
    }

    filter(predicate: (val: T) => boolean): AsyncOption<T> {
        return new AsyncOptionImpl(this.then((opt) => opt.filter(predicate)));
    }

    filterAsync(predicate: (val: T) => PromiseLike<boolean>): AsyncOption<T> {
        return new AsyncOptionImpl(
            this.then((opt) =>
                opt.isSome()
                    ? predicate(opt.unwrap()).then((pass) =>
                          pass ? opt : None<T>()
                      )
                    : None<T>()
            )
        );
    }

    or<T2>(optb: Option<T2>): AsyncOption<T | T2> {
        return new AsyncOptionImpl(this.then((opt) => opt.or(optb)));
    }

    orElse<T2>(f: () => Option<T2>): AsyncOption<T | T2> {
        return new AsyncOptionImpl(this.then((opt) => opt.orElse(f)));
    }

    orElseAsync<T2>(f: () => PromiseLike<Option<T2>>): AsyncOption<T | T2> {
        return new AsyncOptionImpl(
            this.then((opt) => (opt.isSome() ? (opt as Option<T | T2>) : f()))
        );
    }

    xor<T2>(optb: Option<T2>): AsyncOption<T | T2> {
        return new AsyncOptionImpl(this.then((opt) => opt.xor(optb)));
    }

    flatten<U>(this: AsyncOptionImpl<Option<U>>): AsyncOption<U> {
        return new AsyncOptionImpl(this.then((opt) => opt.flatten()));
    }

    async match<U>(handlers: {
        Some: (val: T) => U;
        None: () => U;
    }): Promise<U> {
        const opt = await this;
        return opt.match(handlers);
    }
}
