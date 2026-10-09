import { Ok, Err, type Result } from './result';
import { type Option } from './option';
import { type AsyncOption, AsyncOptionImpl } from './async-option';
import { InvalidArgumentError } from './errors';
import { ASYNC_START, isResultOperand, isAsyncResultOperand } from './utils';

/**
 * An awaitable wrapper around `Result<T, E>` with chainable methods.
 *
 * `and` and `or` accept sync or promise-like operands. Async operands resolve
 * concurrently with the receiver. Either rejection propagates.
 *
 * Methods that throw on `Result` reject on `AsyncResult`.
 * For example, `unwrap` rejects on `Err`, and `flatten` rejects a non-nested value.
 */
export interface AsyncResult<T, E> extends PromiseLike<Result<T, E>> {
    /**
     * Returns a `Promise` that resolves to `true` if the result is `Ok`.
     */
    isOk(): Promise<boolean>;

    /**
     * Returns a `Promise` that resolves to `true` if the result is `Ok` and its value matches the predicate.
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
     * Returns the fallback on `Err`, or calls `f` with the `Ok` value.
     *
     * JavaScript evaluates the fallback before the call. Use `mapOrElse` to compute it only on `Err`.
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
     *
     * JavaScript evaluates the operand before the call. Use `andThen` to compute it only on `Ok`.
     */
    and<U, E2>(
        res: Result<U, E2> | PromiseLike<Result<U, E2>>
    ): AsyncResult<U, E | E2>;

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
     *
     * JavaScript evaluates the operand before the call. Use `orElse` to compute it only on `Err`.
     */
    or<T2, F>(
        res: Result<T2, F> | PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F>;

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
     *
     * JavaScript evaluates the fallback before the call. Use `unwrapOrElse` to compute it only on `Err`.
     */
    unwrapOr<T2>(fallback: T2): Promise<T | T2>;

    /**
     * Returns the contained `Ok` value, or calls `f` with the error.
     */
    unwrapOrElse<T2>(f: (err: E) => T2): Promise<T | T2>;

    /**
     * Returns the `Ok` value, or awaits `f` with the error.
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
     * Transposes an `AsyncResult` of an `Option` into an `AsyncOption` of a `Result`.
     *
     * **Async note:** If the inner value is not an `Option`, this produces a rejected `Promise`
     * with `TransposeError` rather than a synchronous throw.
     */
    transpose<T, E>(this: AsyncResult<Option<T>, E>): AsyncOption<Result<T, E>>;

    /**
     * Matches the `Result` with two functions, one for each variant.
     */
    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): Promise<U>;
}

export class AsyncResultImpl<T, E> implements AsyncResult<T, E> {
    constructor(private readonly promise: PromiseLike<Result<T, E>>) {}

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

    isOk(): Promise<boolean> {
        return this.then((res) => res.isOk());
    }

    isOkAnd(f: (val: T) => boolean): Promise<boolean> {
        return this.then((res) => res.isOkAnd(f));
    }

    isErr(): Promise<boolean> {
        return this.then((res) => res.isErr());
    }

    isErrAnd(f: (err: E) => boolean): Promise<boolean> {
        return this.then((res) => res.isErrAnd(f));
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

    mapOr<U>(fallback: U, f: (val: T) => U): Promise<U> {
        return this.then((res) => res.mapOr(fallback, f));
    }

    mapOrElse<U>(fallbackFn: (err: E) => U, f: (val: T) => U): Promise<U> {
        return this.then((res) => res.mapOrElse(fallbackFn, f));
    }

    mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U> {
        return this.then((res) => res.mapOrElseAsync(fallbackFn, f));
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

    expect(msg: string): Promise<T> {
        return this.then((res) => res.expect(msg));
    }

    unwrap(): Promise<T> {
        return this.then((res) => res.unwrap());
    }

    expectErr(msg: string): Promise<E> {
        return this.then((res) => res.expectErr(msg));
    }

    unwrapErr(): Promise<E> {
        return this.then((res) => res.unwrapErr());
    }

    and<U, E2>(
        res: Result<U, E2> | PromiseLike<Result<U, E2>>
    ): AsyncResult<U, E | E2> {
        if (!isResultOperand(res))
            return this.#combineAsync(res, (left, right) => left.and(right));
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

    or<T2, F>(
        res: Result<T2, F> | PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F> {
        if (!isResultOperand(res))
            return this.#combineAsync(res, (left, right) => left.or(right));
        return new AsyncResultImpl(this.then((r) => r.or(res)));
    }

    #combineAsync<U, F, R, G>(
        other: PromiseLike<Result<U, F>>,
        combine: (left: Result<T, E>, right: Result<U, F>) => Result<R, G>
    ): AsyncResult<R, G> {
        return new AsyncResultImpl(
            Promise.all([
                this.promise,
                isAsyncResultOperand(other) ? other.promise : other
            ]).then(([left, right]) => combine(left, right))
        );
    }

    orElse<T2, F>(f: (err: E) => Result<T2, F>): AsyncResult<T | T2, F> {
        return new AsyncResultImpl(this.then((res) => res.orElse(f)));
    }

    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F> {
        return new AsyncResultImpl(this.then((res) => res.orElseAsync(f)));
    }

    unwrapOr<T2>(fallback: T2): Promise<T | T2> {
        return this.then((res) => res.unwrapOr(fallback));
    }

    unwrapOrElse<T2>(f: (err: E) => T2): Promise<T | T2> {
        return this.then((res) => res.unwrapOrElse(f));
    }

    unwrapOrElseAsync<T2>(f: (err: E) => PromiseLike<T2>): Promise<T | T2> {
        return this.then((res) => res.unwrapOrElseAsync(f));
    }

    flatten<U, F>(
        this: AsyncResultImpl<Result<U, F>, E>
    ): AsyncResult<U, E | F> {
        return new AsyncResultImpl(this.then((res) => res.flatten()));
    }

    transpose<T, E>(
        this: AsyncResultImpl<Option<T>, E>
    ): AsyncOption<Result<T, E>> {
        return new AsyncOptionImpl(this.then((res) => res.transpose()));
    }

    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): Promise<U> {
        return this.then((res) => res.match(handlers));
    }
}

/**
 * Wraps `fn` so a resolved value becomes `Ok(value)` and a throw or rejection becomes `Err(cause)`.
 * Use this to adapt functions that throw or reject. Functions with expected failures should return `AsyncResult`.
 *
 * Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
 * becomes the error. The handler receives the cause and the original arguments.
 * Exceptions from `onThrow` reject the returned wrapper.
 *
 * @param fn - The throwing/async function to wrap.
 * @param onThrow - Optional handler invoked when `fn` throws or rejects; its return value becomes the `Err` payload.
 * @returns A function that captures throws and rejections from `fn` in an `AsyncResult`.
 */
export function catchUnwindAsync<T, Args extends unknown[]>(
    fn: (...args: Args) => PromiseLike<T> | T,
    onThrow?: undefined
): (...args: Args) => AsyncResult<T, unknown>;
export function catchUnwindAsync<T, Args extends unknown[], E>(
    fn: (...args: Args) => PromiseLike<T> | T,
    onThrow: (thrown: unknown, ...args: Args) => E
): (...args: Args) => AsyncResult<T, E>;
export function catchUnwindAsync<T, Args extends unknown[], E>(
    fn: (...args: Args) => PromiseLike<T> | T,
    onThrow?: (thrown: unknown, ...args: Args) => E
): (...args: Args) => AsyncResult<T, unknown> {
    if (typeof fn !== 'function')
        throw new InvalidArgumentError("'fn' must be a function");

    if (onThrow !== undefined && typeof onThrow !== 'function')
        throw new InvalidArgumentError("'onThrow' must be a function");

    return function (this: unknown, ...args: Args): AsyncResult<T, unknown> {
        const handleThrown =
            onThrow === undefined
                ? Err
                : (thrown: unknown) => Err(onThrow.call(this, thrown, ...args));

        const result = ASYNC_START.then(() => fn.apply(this, args)).then(
            Ok,
            handleThrown
        );

        return new AsyncResultImpl(result);
    };
}
