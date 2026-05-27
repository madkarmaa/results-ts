import { type Result } from './result';
import { type AsyncOption, AsyncOptionImpl } from './async-option';

/**
 * An async wrapper around `Result<T, E>` that is `PromiseLike` (so it's awaitable)
 * but also carries all chainable `Result` methods.
 *
 * **Error behavior in async context:** Methods that throw synchronously on `Result`
 * (e.g. `unwrap` on `Err`, `flatten` on non-nested) will produce a rejected `Promise`.
 */
export interface AsyncResult<T, E> extends PromiseLike<Result<T, E>> {
    /**
     * Returns a `Promise` that resolves to `true` if the result is `Ok`.
     */
    isOk(): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the result is `Ok` and the value inside matches a predicate.
     */
    isOkAnd(f: (val: T) => boolean): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the result is `Err`.
     */
    isErr(): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the result is `Err` and the error inside matches a predicate.
     */
    isErrAnd(f: (err: E) => boolean): Promise<boolean>;

    /**
     * Converts from `AsyncResult<T, E>` to `AsyncOption<T>`.
     *
     * Returns `Some` for `Ok` and `None` for `Err`.
     */
    ok(): AsyncOption<T>;

    /**
     * Converts from `AsyncResult<T, E>` to `AsyncOption<E>`.
     *
     * Returns `Some` for `Err` and `None` for `Ok`.
     */
    err(): AsyncOption<E>;

    /**
     * Maps an `AsyncResult<T, E>` to `AsyncResult<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.
     */
    map<U>(f: (val: T) => U): AsyncResult<U, E>;

    /**
     * Async version of `map`. Maps an `AsyncResult<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.
     */
    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E>;

    /**
     * Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).
     */
    mapOr<U>(fallback: U, f: (val: T) => U): Promise<U>;

    /**
     * Maps an `AsyncResult<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.
     */
    mapOrElse<U>(fallbackFn: (err: E) => U, f: (val: T) => U): Promise<U>;

    /**
     * Async version of `mapOrElse`. Maps an `AsyncResult<T, E>` to `Promise<U>` by applying async fallback function `fallbackFn` to a contained `Err` value, or async function `f` to a contained `Ok` value.
     */
    mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U>;

    /**
     * Maps an `AsyncResult<T, E>` to `AsyncResult<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     */
    mapErr<F>(f: (err: E) => F): AsyncResult<T, F>;

    /**
     * Async version of `mapErr`. Maps an `AsyncResult<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.
     */
    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F>;

    /**
     * Calls a function with a reference to the contained value if `Ok`.
     *
     * Returns the original result.
     */
    inspect(f: (val: T) => void): AsyncResult<T, E>;

    /**
     * Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.
     */
    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Calls a function with a reference to the contained value if `Err`.
     *
     * Returns the original result.
     */
    inspectErr(f: (err: E) => void): AsyncResult<T, E>;

    /**
     * Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.
     */
    inspectErrAsync(f: (err: E) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Returns the contained `Ok` value.
     *
     * @throws Rejects with `PanicError` if the value is an `Err`, with a panic message including the passed message, and the content of the `Err`.
     */
    expect(msg: string): Promise<T>;

    /**
     * Returns the contained `Ok` value.
     *
     * @throws Rejects with `PanicError` if the value is an `Err`, with a panic message provided by the `Err`'s value.
     */
    unwrap(): Promise<T>;

    /**
     * Returns the contained `Err` value.
     *
     * @throws Rejects with `PanicError` if the value is an `Ok`, with a panic message including the passed message, and the content of the `Ok`.
     */
    expectErr(msg: string): Promise<E>;

    /**
     * Returns the contained `Err` value.
     *
     * @throws Rejects with `PanicError` if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.
     */
    unwrapErr(): Promise<E>;

    /**
     * Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     */
    and<U, E2>(res: Result<U, E2>): AsyncResult<U, E | E2>;

    /**
     * Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     */
    andThen<U, F>(f: (val: T) => Result<U, F>): AsyncResult<U, E | F>;

    /**
     * Async version of `andThen`. Calls an async `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     */
    andThenAsync<U, F>(
        f: (val: T) => PromiseLike<Result<U, F>>
    ): AsyncResult<U, E | F>;

    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     */
    or<T2, F>(res: Result<T2, F>): AsyncResult<T | T2, F>;

    /**
     * Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     */
    orElse<T2, F>(f: (err: E) => Result<T2, F>): AsyncResult<T | T2, F>;

    /**
     * Async version of `orElse`. Calls an async `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     */
    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F>;

    /**
     * Returns the contained `Ok` value or a provided default.
     */
    unwrapOr<T2>(fallback: T2): Promise<T | T2>;

    /**
     * Returns the contained `Ok` value or computes it from a closure.
     */
    unwrapOrElse<T2>(f: (err: E) => T2): Promise<T | T2>;

    /**
     * Async version of `unwrapOrElse`. Returns the contained `Ok` value or computes it from an async closure.
     */
    unwrapOrElseAsync<T2>(f: (err: E) => PromiseLike<T2>): Promise<T | T2>;

    /**
     * Converts from `AsyncResult<Result<T, E>, E>` to `AsyncResult<T, E>`.
     *
     * **Async note:** If the inner value is not a `Result`, this produces a rejected `Promise`
     * with `FlattenError` rather than a synchronous throw.
     */
    flatten<U, F>(this: AsyncResult<Result<U, F>, E>): AsyncResult<U, E | F>;

    /**
     * Matches the `Result` with two functions, one for each variant.
     */
    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): Promise<U>;
}

export class AsyncResultImpl<T, E> implements AsyncResult<T, E> {
    constructor(private promise: PromiseLike<Result<T, E>>) {}

    then<TResult1 = Result<T, E>, TResult2 = never>(
        onfulfilled?:
            | ((value: Result<T, E>) => TResult1 | PromiseLike<TResult1>)
            | undefined
            | null,
        onrejected?:
            | ((reason: any) => TResult2 | PromiseLike<TResult2>)
            | undefined
            | null
    ): Promise<TResult1 | TResult2> {
        return Promise.resolve(this.promise).then(onfulfilled, onrejected);
    }

    async isOk(): Promise<boolean> {
        const res = await this;
        return res.isOk();
    }

    async isOkAnd(f: (val: T) => boolean): Promise<boolean> {
        const res = await this;
        return res.isOkAnd(f);
    }

    async isErr(): Promise<boolean> {
        const res = await this;
        return res.isErr();
    }

    async isErrAnd(f: (err: E) => boolean): Promise<boolean> {
        const res = await this;
        return res.isErrAnd(f);
    }

    ok(): AsyncOption<T> {
        return new AsyncOptionImpl(this.then((res) => res.ok()));
    }

    err(): AsyncOption<E> {
        return new AsyncOptionImpl(this.then((res) => res.err()));
    }

    map<U>(f: (val: T) => U): AsyncResult<U, E> {
        return new AsyncResultImpl(this.then((res) => res.map(f)));
    }

    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E> {
        return new AsyncResultImpl(this.then((res) => res.mapAsync(f)));
    }

    async mapOr<U>(fallback: U, f: (val: T) => U): Promise<U> {
        const res = await this;
        return res.mapOr(fallback, f);
    }

    async mapOrElse<U>(
        fallbackFn: (err: E) => U,
        f: (val: T) => U
    ): Promise<U> {
        const res = await this;
        return res.mapOrElse(fallbackFn, f);
    }

    async mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U> {
        const res = await this;
        return await res.mapOrElseAsync(fallbackFn, f);
    }

    mapErr<F>(f: (err: E) => F): AsyncResult<T, F> {
        return new AsyncResultImpl(this.then((res) => res.mapErr(f)));
    }

    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F> {
        return new AsyncResultImpl(this.then((res) => res.mapErrAsync(f)));
    }

    inspect(f: (val: T) => void): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((res) => res.inspect(f)));
    }

    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((res) => res.inspectAsync(f)));
    }

    inspectErr(f: (err: E) => void): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((res) => res.inspectErr(f)));
    }

    inspectErrAsync(f: (err: E) => PromiseLike<void>): AsyncResult<T, E> {
        return new AsyncResultImpl(this.then((res) => res.inspectErrAsync(f)));
    }

    async expect(msg: string): Promise<T> {
        const res = await this;
        return res.expect(msg);
    }

    async unwrap(): Promise<T> {
        const res = await this;
        return res.unwrap();
    }

    async expectErr(msg: string): Promise<E> {
        const res = await this;
        return res.expectErr(msg);
    }

    async unwrapErr(): Promise<E> {
        const res = await this;
        return res.unwrapErr();
    }

    and<U, E2>(res: Result<U, E2>): AsyncResult<U, E | E2> {
        return new AsyncResultImpl(this.then((r) => r.and(res)));
    }

    andThen<U, F>(f: (val: T) => Result<U, F>): AsyncResult<U, E | F> {
        return new AsyncResultImpl(this.then((res) => res.andThen(f)));
    }

    andThenAsync<U, F>(
        f: (val: T) => PromiseLike<Result<U, F>>
    ): AsyncResult<U, E | F> {
        return new AsyncResultImpl(this.then((res) => res.andThenAsync(f)));
    }

    or<T2, F>(res: Result<T2, F>): AsyncResult<T | T2, F> {
        return new AsyncResultImpl(this.then((r) => r.or(res)));
    }

    orElse<T2, F>(f: (err: E) => Result<T2, F>): AsyncResult<T | T2, F> {
        return new AsyncResultImpl(this.then((res) => res.orElse(f)));
    }

    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F> {
        return new AsyncResultImpl(this.then((res) => res.orElseAsync(f)));
    }

    async unwrapOr<T2>(fallback: T2): Promise<T | T2> {
        const res = await this;
        return res.unwrapOr(fallback);
    }

    async unwrapOrElse<T2>(f: (err: E) => T2): Promise<T | T2> {
        const res = await this;
        return res.unwrapOrElse(f);
    }

    async unwrapOrElseAsync<T2>(
        f: (err: E) => PromiseLike<T2>
    ): Promise<T | T2> {
        const res = await this;
        return await res.unwrapOrElseAsync(f);
    }

    flatten<U, F>(
        this: AsyncResultImpl<Result<U, F>, E>
    ): AsyncResult<U, E | F> {
        return new AsyncResultImpl(this.then((res) => res.flatten()));
    }

    async match<U>(handlers: {
        Ok: (val: T) => U;
        Err: (err: E) => U;
    }): Promise<U> {
        const res = await this;
        return res.match(handlers);
    }
}
