import {
    FlattenError,
    InvalidArgumentError,
    PanicError,
    TransposeError
} from './errors';
import {
    type Either,
    Left,
    Right,
    isLeft,
    isRight,
    ASYNC_START,
    EMPTY_ITERATOR,
    OneItemIterator,
    isPromiseLike,
    isResultOperand,
    isAsyncResultOperand
} from './utils';
import { type Option, Some, None } from './option';
import { type AsyncResult, AsyncResultImpl } from './async-result';

/**
 * Represents a successful `Result` containing a value of type `T`.
 */
export type OkResult<T, E> = ResultMethods<T, E> & {
    readonly _isOk: true;
};

/**
 * Represents a failed `Result` containing an error of type `E`.
 */
export type ErrResult<T, E> = ResultMethods<T, E> & {
    readonly _isOk: false;
};

/**
 * `Result<T, E>` is either `Ok(value)` with a value of type `T`, or
 * `Err(error)` with an error of type `E`. Return it for recoverable failures.
 *
 * Invalid callbacks and operands throw errors. Callback exceptions propagate.
 *
 * `and` and `or` return an `AsyncResult` for promise-like operands. They resolve
 * the operand even when its value is unused. Operand rejections propagate.
 *
 * @template T - The success value type.
 * @template E - The error value type.
 */
export type Result<T, E> = OkResult<T, E> | ErrResult<T, E>;

interface ResultMethods<T, E> {
    toString(): string;

    /**
     * Returns `true` if the result is `Ok`.
     */
    isOk(): this is OkResult<T, never>;

    /**
     * Returns `true` if the result is `Ok` and its value matches the predicate.
     */
    isOkAnd<U extends T>(f: (val: T) => val is U): this is OkResult<U, E>;
    isOkAnd(f: (val: T) => boolean): this is OkResult<T, E>;

    /**
     * Returns `true` if the result is `Err`.
     */
    isErr(): this is ErrResult<never, E>;

    /**
     * Returns `true` if the result is `Err` and its value matches the predicate.
     */
    isErrAnd<F extends E>(f: (err: E) => err is F): this is ErrResult<T, F>;
    isErrAnd(f: (err: E) => boolean): this is ErrResult<T, E>;

    /**
     * Converts from `Result<T, E>` to `Option<T>`.
     *
     * Returns `Some` for `Ok` and `None` for `Err`.
     */
    ok(): Option<T>;

    /**
     * Converts from `Result<T, E>` to `Option<E>`.
     *
     * Returns `Some` for `Err` and `None` for `Ok`.
     */
    err(): Option<E>;

    /**
     * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.
     */
    map<U>(f: (val: T) => U): Result<U, E>;

    /**
     * Async version of `map`. Maps a `Result<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.
     */
    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E>;

    /**
     * Returns the fallback on `Err`, or calls `f` with the `Ok` value.
     *
     * JavaScript evaluates the fallback before the call. Use `mapOrElse` to compute it only on `Err`.
     */
    mapOr<U>(fallback: U, f: (val: T) => U): U;

    /**
     * Maps a `Result<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.
     */
    mapOrElse<U>(fallbackFn: (err: E) => U, f: (val: T) => U): U;

    /**
     * Async version of `mapOrElse`. Maps a `Result<T, E>` to `Promise<U>` by applying async fallback function `fallbackFn` to a contained `Err` value, or async function `f` to a contained `Ok` value.
     */
    mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U>;

    /**
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     */
    mapErr<F>(f: (err: E) => F): Result<T, F>;

    /**
     * Async version of `mapErr`. Maps a `Result<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.
     */
    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F>;

    /**
     * Calls a function with a reference to the contained value if `Ok`.
     *
     * Returns the original result.
     */
    inspect(f: (val: T) => void): Result<T, E>;

    /**
     * Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.
     */
    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Calls a function with a reference to the contained value if `Err`.
     *
     * Returns the original result.
     */
    inspectErr(f: (err: E) => void): Result<T, E>;

    /**
     * Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.
     */
    inspectErrAsync(f: (err: E) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Returns an iterator over the contained value, or an empty iterator if absent.
     *
     * The iterator yields one value if the result is `Ok`, otherwise none.
     */
    iter(): Iterable<T>;

    /**
     * Returns the contained `Ok` value.
     *
     * @throws `PanicError` with `msg` and the error value on `Err`.
     */
    expect(msg: string): T;

    /**
     * Returns the contained `Ok` value.
     *
     * @throws `PanicError` with the error value on `Err`.
     */
    unwrap(): T;

    /**
     * Returns the contained `Err` value.
     *
     * @throws `PanicError` with `msg` and the success value on `Ok`.
     */
    expectErr(msg: string): E;

    /**
     * Returns the contained `Err` value.
     *
     * @throws `PanicError` with the success value on `Ok`.
     */
    unwrapErr(): E;

    /**
     * Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * JavaScript evaluates the operand before the call. Use `andThen` to compute it only on `Ok`.
     */
    and<U, E2>(res: Result<U, E2>): Result<U, E | E2>;
    and<U, E2>(res: PromiseLike<Result<U, E2>>): AsyncResult<U, E | E2>;
    and<U, E2>(
        res: Result<U, E2> | PromiseLike<Result<U, E2>>
    ): Result<U, E | E2> | AsyncResult<U, E | E2>;

    /**
     * Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     */
    andThen<U, F>(f: (val: T) => Result<U, F>): Result<U, E | F>;

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
    or<T2, F>(res: Result<T2, F>): Result<T | T2, F>;
    or<T2, F>(res: PromiseLike<Result<T2, F>>): AsyncResult<T | T2, F>;
    or<T2, F>(
        res: Result<T2, F> | PromiseLike<Result<T2, F>>
    ): Result<T | T2, F> | AsyncResult<T | T2, F>;

    /**
     * Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     */
    orElse<T2, F>(f: (err: E) => Result<T2, F>): Result<T | T2, F>;

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
    unwrapOr<T2>(fallback: T2): T | T2;

    /**
     * Returns the contained `Ok` value, or calls `f` with the error.
     */
    unwrapOrElse<T2>(f: (err: E) => T2): T | T2;

    /**
     * Returns the `Ok` value, or awaits `f` with the error.
     */
    unwrapOrElseAsync<T2>(f: (err: E) => PromiseLike<T2>): Promise<T | T2>;

    /**
     * Unwraps one nested `Result`. The return type includes both error types.
     *
     * @throws `FlattenError` if an `Ok` value is not a `Result`.
     */
    flatten<U, F>(this: Result<Result<U, F>, E>): Result<U, E | F>;

    /**
     * Transposes a `Result` of an `Option` into an `Option` of a `Result`.
     *
     * Converts `Ok(None)` to `None`, `Ok(Some(value))` to `Some(Ok(value))`,
     * and `Err(error)` to `Some(Err(error))`.
     *
     * @throws `TransposeError` if an `Ok` value is not an `Option`.
     */
    transpose<T, E>(this: Result<Option<T>, E>): Option<Result<T, E>>;

    /**
     * Matches the `Result` with two functions, one for each variant.
     */
    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): U;
}

class ResultImpl<T, E> implements ResultMethods<T, E> {
    // Private states are immutable, so fresh wrappers can safely share them.
    readonly #state: Either<E, T>;

    static name = 'Result';
    constructor(state: Either<E, T>) {
        this.#state = state;
    }

    get _isOk(): boolean {
        return isRight(this.#state);
    }

    get [Symbol.toStringTag]() {
        const state = this.#state;
        if (isRight(state)) return `Result Ok`;
        return `Result Err`;
    }

    toString(): string {
        const state = this.#state;
        if (isRight(state)) return `Ok(${state.right})`;
        return `Err(${state.left})`;
    }

    isOk(): this is OkResult<T, never> {
        return isRight(this.#state);
    }

    isOkAnd<U extends T>(f: (val: T) => val is U): this is OkResult<U, E>;
    isOkAnd(f: (val: T) => boolean): this is OkResult<T, E>;
    isOkAnd(f: (val: T) => boolean): this is OkResult<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isRight(state) && f(state.right);
    }

    isErr(): this is ErrResult<never, E> {
        return isLeft(this.#state);
    }

    isErrAnd<F extends E>(f: (err: E) => err is F): this is ErrResult<T, F>;
    isErrAnd(f: (err: E) => boolean): this is ErrResult<T, E>;
    isErrAnd(f: (err: E) => boolean): this is ErrResult<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isLeft(state) && f(state.left);
    }

    ok(): Option<T> {
        const state = this.#state;
        if (isRight(state)) return Some(state.right);
        return None();
    }

    err(): Option<E> {
        const state = this.#state;
        if (isLeft(state)) return Some(state.left);
        return None();
    }

    map<U>(f: (val: T) => U): Result<U, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;

        // Reuse Err. It contains no success value of the old type.
        if (isLeft(state)) return this as unknown as ResultImpl<U, E>;

        const mappedValue = f(state.right);
        return new ResultImpl(Right(mappedValue));
    }

    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(
                Promise.resolve(new ResultImpl<U, E>(state))
            );

        return new AsyncResultImpl(
            ASYNC_START.then(() => f(state.right)).then(Ok)
        );
    }

    mapOr<U>(fallback: U, f: (val: T) => U): U {
        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        const state = this.#state;
        return isLeft(state) ? fallback : f(state.right);
    }

    mapOrElse<U>(fallbackFn: (err: E) => U, f: (val: T) => U): U {
        if (typeof fallbackFn !== 'function')
            throw new InvalidArgumentError(
                "Argument 'fallbackFn' must be a function"
            );

        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        const state = this.#state;
        return isLeft(state) ? fallbackFn(state.left) : f(state.right);
    }

    mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U> {
        if (typeof fallbackFn !== 'function')
            throw new InvalidArgumentError(
                "Argument 'fallbackFn' must be a function"
            );

        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        const state = this.#state;
        return isLeft(state)
            ? Promise.resolve(fallbackFn(state.left))
            : Promise.resolve(f(state.right));
    }

    mapErr<F>(f: (err: E) => F): Result<T, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;

        if (isLeft(state)) return new ResultImpl(Left(f(state.left)));

        // Reuse Ok. It contains no error value of the old type.
        return this as unknown as ResultImpl<T, F>;
    }

    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(
                ASYNC_START.then(() => f(state.left)).then(Err)
            );

        return new AsyncResultImpl(
            Promise.resolve(new ResultImpl<T, F>(state))
        );
    }

    inspect(f: (val: T) => void): Result<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state)) f(state.right);
        return this;
    }

    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncResult<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state))
            return new AsyncResultImpl(
                ASYNC_START.then(() => f(state.right)).then(() => this)
            );

        return new AsyncResultImpl(Promise.resolve(this));
    }

    inspectErr(f: (err: E) => void): Result<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state)) f(state.left);
        return this;
    }

    inspectErrAsync(f: (err: E) => PromiseLike<void>): AsyncResult<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(
                ASYNC_START.then(() => f(state.left)).then(() => this)
            );

        return new AsyncResultImpl(Promise.resolve(this));
    }

    iter(): IterableIterator<T> {
        const state = this.#state;
        if (isLeft(state)) return EMPTY_ITERATOR;
        return new OneItemIterator(state.right);
    }

    expect(msg: string): T {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        const state = this.#state;
        if (isLeft(state)) throw new PanicError(msg, { cause: state.left });
        return state.right;
    }

    unwrap(): T {
        const state = this.#state;
        if (isLeft(state))
            throw new PanicError(
                `called \`Result.unwrap()\` on an \`Err\` value`,
                { cause: state.left }
            );
        return state.right;
    }

    expectErr(msg: string): E {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        const state = this.#state;
        if (isRight(state))
            throw new PanicError(`${msg}: "${String(state.right)}"`, {
                cause: state.right
            });
        return state.left;
    }

    unwrapErr(): E {
        const state = this.#state;
        if (isRight(state))
            throw new PanicError(
                `called \`Result.unwrapErr()\` on an \`Ok\` value: "${String(state.right)}"`,
                { cause: state.right }
            );
        return state.left;
    }

    and<U, E2>(res: Result<U, E2>): Result<U, E | E2>;
    and<U, E2>(res: PromiseLike<Result<U, E2>>): AsyncResult<U, E | E2>;
    and<U, E2>(
        res: Result<U, E2> | PromiseLike<Result<U, E2>>
    ): Result<U, E | E2> | AsyncResult<U, E | E2>;
    and<U, E2>(
        res: Result<U, E2> | PromiseLike<Result<U, E2>>
    ): Result<U, E | E2> | AsyncResult<U, E | E2> {
        if (!isResultOperand(res)) {
            if (isPromiseLike(res))
                return this.#combineAsync(res, (current, other) =>
                    current.and(other)
                );
            throw new InvalidArgumentError('Argument must be a Result');
        }

        const state = this.#state;
        if (isRight(state)) return res;
        return this as unknown as ResultImpl<U, E | E2>;
    }

    andThen<U, F>(f: (val: T) => Result<U, F>): Result<U, E | F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state)) return f(state.right);

        // Reuse Err. It contains no success value of the old type.
        return this as unknown as ResultImpl<U, E | F>;
    }

    andThenAsync<U, F>(
        f: (val: T) => PromiseLike<Result<U, F>>
    ): AsyncResult<U, E | F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state))
            return new AsyncResultImpl(ASYNC_START.then(() => f(state.right)));

        return new AsyncResultImpl(
            Promise.resolve(new ResultImpl<U, E | F>(state))
        );
    }

    or<T2, F>(res: Result<T2, F>): Result<T | T2, F>;
    or<T2, F>(res: PromiseLike<Result<T2, F>>): AsyncResult<T | T2, F>;
    or<T2, F>(
        res: Result<T2, F> | PromiseLike<Result<T2, F>>
    ): Result<T | T2, F> | AsyncResult<T | T2, F>;
    or<T2, F>(
        res: Result<T2, F> | PromiseLike<Result<T2, F>>
    ): Result<T | T2, F> | AsyncResult<T | T2, F> {
        if (!isResultOperand(res)) {
            if (isPromiseLike(res))
                return this.#combineAsync(res, (current, other) =>
                    current.or(other)
                );
            throw new InvalidArgumentError('Argument must be a Result');
        }

        const state = this.#state;
        if (isLeft(state)) return res;
        return this as unknown as ResultImpl<T | T2, F>;
    }

    orElse<T2, F>(f: (err: E) => Result<T2, F>): Result<T | T2, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state)) return f(state.left);

        // Reuse Ok. It contains no error value of the old type.
        return this as unknown as ResultImpl<T | T2, F>;
    }

    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(ASYNC_START.then(() => f(state.left)));

        return new AsyncResultImpl(
            Promise.resolve(new ResultImpl<T | T2, F>(state))
        );
    }

    unwrapOr<T2>(fallback: T2): T | T2 {
        const state = this.#state;
        return isLeft(state) ? fallback : state.right;
    }

    unwrapOrElse<T2>(f: (err: E) => T2): T | T2 {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isLeft(state) ? f(state.left) : state.right;
    }

    unwrapOrElseAsync<T2>(f: (err: E) => PromiseLike<T2>): Promise<T | T2> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isLeft(state)
            ? Promise.resolve(f(state.left))
            : Promise.resolve(state.right);
    }

    flatten<U, F>(this: ResultImpl<Result<U, F>, E>): Result<U, E | F> {
        const state = this.#state;

        if (isLeft(state)) return new ResultImpl<U, E | F>(state);

        if (typeof state.right._isOk !== 'boolean')
            throw new FlattenError(
                'flatten can only be called on Result<Result<T, E>, E>'
            );

        return state.right;
    }

    transpose<T, E>(this: ResultImpl<Option<T>, E>): Option<Result<T, E>> {
        const state = this.#state;

        if (isLeft(state)) return Some(new ResultImpl<T, E>(state));

        if (typeof state.right._isSome !== 'boolean')
            throw new TransposeError(
                'transpose can only be called on Result<Option<T>, E>'
            );

        const inner = state.right;
        return inner.isSome() ? Some(Ok(inner.unwrap())) : None();
    }

    #combineAsync<U, F, R, G>(
        other: PromiseLike<Result<U, F>>,
        combine: (current: Result<T, E>, other: Result<U, F>) => Result<R, G>
    ): AsyncResult<R, G> {
        const resolved = isAsyncResultOperand(other)
            ? other
            : Promise.resolve(other);
        return new AsyncResultImpl(
            resolved.then((other) => combine(this, other))
        );
    }

    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): U {
        if (typeof handlers !== 'object' || handlers === null)
            throw new InvalidArgumentError('Argument must be an object');

        const { Ok: okHandler, Err: errHandler } = handlers;

        if (typeof okHandler !== 'function')
            throw new InvalidArgumentError('Handler for Ok must be a function');
        if (typeof errHandler !== 'function')
            throw new InvalidArgumentError(
                'Handler for Err must be a function'
            );

        const state = this.#state;
        return isRight(state) ? okHandler(state.right) : errHandler(state.left);
    }
}

/**
 * Contains the success value.
 *
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export function Ok<T>(value: T): Result<T, never> {
    return new ResultImpl(Right(value));
}

/**
 * Contains the error value.
 *
 * @param error - The error to wrap in a failed result.
 * @returns A `Result` representing a failed outcome.
 */
export function Err<E>(error: E): Result<never, E> {
    return new ResultImpl(Left(error));
}

/**
 * Wraps `fn` so a return value becomes `Ok(value)` and a thrown value becomes `Err(thrown)`.
 * Use this to adapt functions that throw. Functions with expected failures should return `Result`.
 *
 * Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
 * becomes the error. The handler receives the thrown value and the original arguments.
 * Exceptions from `onThrow` propagate to the caller.
 *
 * @param fn - The throwing function to wrap.
 * @param onThrow - Optional handler invoked when `fn` throws; its return value becomes the `Err` payload.
 * @returns A function that captures exceptions from `fn` in a `Result`.
 */
export function catchUnwind<T, Args extends unknown[]>(
    fn: (...args: Args) => T,
    onThrow?: undefined
): (...args: Args) => Result<T, unknown>;
export function catchUnwind<T, Args extends unknown[], E>(
    fn: (...args: Args) => T,
    onThrow: (thrown: unknown, ...args: Args) => E
): (...args: Args) => Result<T, E>;
export function catchUnwind<T, Args extends unknown[], E>(
    fn: (...args: Args) => T,
    onThrow?: (thrown: unknown, ...args: Args) => E
): (...args: Args) => Result<T, unknown> {
    if (typeof fn !== 'function')
        throw new InvalidArgumentError("'fn' must be a function");

    if (onThrow !== undefined && typeof onThrow !== 'function')
        throw new InvalidArgumentError("'onThrow' must be a function");

    return function (this: unknown, ...args: Args): Result<T, unknown> {
        try {
            return Ok(fn.apply(this, args));
        } catch (thrown) {
            const error =
                onThrow === undefined
                    ? thrown
                    : onThrow.call(this, thrown, ...args);
            return Err(error);
        }
    };
}
