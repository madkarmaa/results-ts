import { FlattenError, InvalidArgumentError, PanicError } from './errors';
import { type Either, Left, Right, isLeft, isRight } from './either';
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
 * `Result<T, E>` is the type used for returning and propagating errors.
 *
 * It is a type with the parameters, `Ok(T)`, representing success and containing a value,
 * and `Err(E)`, representing error and containing an error value.
 *
 * Functions return `Result` whenever errors are expected and recoverable.
 *
 * @template T - Contains the success value.
 * @template E - Contains the error value.
 */
export type Result<T, E> = OkResult<T, E> | ErrResult<T, E>;

interface ResultMethods<T, E> {
    toString(): string;

    /**
     * Returns `true` if the result is `Ok`.
     */
    isOk(): this is OkResult<T, never>;

    /**
     * Returns `true` if the result is `Ok` and the value inside of it matches a predicate.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    isOkAnd<U extends T>(f: (val: T) => val is U): this is OkResult<U, E>;
    isOkAnd(f: (val: T) => boolean): this is OkResult<T, E>;

    /**
     * Returns `true` if the result is `Err`.
     */
    isErr(): this is ErrResult<never, E>;

    /**
     * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
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
     *
     * This function can be used to compose the results of two functions.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    map<U>(f: (val: T) => U): Result<U, E>;

    /**
     * Async version of `map`. Maps a `Result<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E>;

    /**
     * Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).
     *
     * Arguments passed to `mapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `mapOrElse`, which is lazily evaluated.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapOr<U>(fallback: U, f: (val: T) => U): U;

    /**
     * Maps a `Result<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.
     *
     * This function can be used to unpack a successful result while handling an error.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapOrElse<U>(fallbackFn: (err: E) => U, f: (val: T) => U): U;

    /**
     * Async version of `mapOrElse`. Maps a `Result<T, E>` to `Promise<U>` by applying async fallback function `fallbackFn` to a contained `Err` value, or async function `f` to a contained `Ok` value.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapOrElseAsync<U>(
        fallbackFn: (err: E) => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U>;

    /**
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     *
     * This function can be used to pass through a successful result while handling an error.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapErr<F>(f: (err: E) => F): Result<T, F>;

    /**
     * Async version of `mapErr`. Maps a `Result<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F>;

    /**
     * Calls a function with a reference to the contained value if `Ok`.
     *
     * Returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspect(f: (val: T) => void): Result<T, E>;

    /**
     * Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Calls a function with a reference to the contained value if `Err`.
     *
     * Returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspectErr(f: (err: E) => void): Result<T, E>;

    /**
     * Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspectErrAsync(f: (err: E) => PromiseLike<void>): AsyncResult<T, E>;

    /**
     * Returns an iterator over the possibly contained value.
     *
     * The iterator yields one value if the result is `Ok`, otherwise none.
     */
    iter(): Iterable<T>;

    /**
     * Returns the contained `Ok` value, consuming the `self` value.
     *
     * @throws Panics if the value is an `Err`, with a panic message including the passed message, and the content of the `Err`.
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    expect(msg: string): T;

    /**
     * Returns the contained `Ok` value, consuming the `self` value.
     *
     * @throws Panics if the value is an `Err`, with a panic message provided by the `Err`'s value.
     */
    unwrap(): T;

    /**
     * Returns the contained `Err` value, consuming the `self` value.
     *
     * @throws Panics if the value is an `Ok`, with a panic message including the passed message, and the content of the `Ok`.
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    expectErr(msg: string): E;

    /**
     * Returns the contained `Err` value, consuming the `self` value.
     *
     * @throws Panics if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.
     */
    unwrapErr(): E;

    /**
     * Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * Arguments passed to `and` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    and<U, E2>(res: Result<U, E2>): Result<U, E | E2>;

    /**
     * Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * This function can be used for control flow based on `Result` values.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    andThen<U, F>(f: (val: T) => Result<U, F>): Result<U, E | F>;

    /**
     * Async version of `andThen`. Calls an async `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    andThenAsync<U, F>(
        f: (val: T) => PromiseLike<Result<U, F>>
    ): AsyncResult<U, E | F>;

    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    or<T2, F>(res: Result<T2, F>): Result<T | T2, F>;

    /**
     * Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * This function can be used for control flow based on result values.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    orElse<T2, F>(f: (err: E) => Result<T2, F>): Result<T | T2, F>;

    /**
     * Async version of `orElse`. Calls an async `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F>;

    /**
     * Returns the contained `Ok` value or a provided default.
     *
     * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    unwrapOr<T2>(fallback: T2): T | T2;

    /**
     * Returns the contained `Ok` value or computes it from a closure.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    unwrapOrElse<T2>(f: (err: E) => T2): T | T2;

    /**
     * Async version of `unwrapOrElse`. Returns the contained `Ok` value or computes it from an async closure.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    unwrapOrElseAsync<T2>(f: (err: E) => PromiseLike<T2>): Promise<T | T2>;

    /**
     * Converts from `Result<Result<T, E>, E>` to `Result<T, E>`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    flatten<U, F>(this: Result<Result<U, F>, E>): Result<U, E | F>;

    /**
     * Matches the `Result` with two functions, one for each variant.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): U;
}

class ResultImpl<T, E> implements ResultMethods<T, E> {
    #state: Either<E, T>;

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

        // Err path: the wrapped value is unchanged, so reuse `this` to avoid an
        // extra allocation. The Ok type is narrowed to `U` via a cast - safe
        // because the value is never read on an `Err`.
        if (isLeft(state)) return this as unknown as ResultImpl<U, E>;

        const mappedValue = f(state.right);
        return new ResultImpl(Right(mappedValue));
    }

    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncResult<U, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(Promise.resolve(Err(state.left)));

        return new AsyncResultImpl(
            Promise.resolve()
                .then(() => f(state.right))
                .then(Ok)
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

        // Ok path: the wrapped value is unchanged, so reuse `this`. The Err
        // type is narrowed to `F` via a cast - safe because the value is never
        // read on an `Ok`.
        return this as unknown as ResultImpl<T, F>;
    }

    mapErrAsync<F>(f: (err: E) => PromiseLike<F>): AsyncResult<T, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(
                Promise.resolve()
                    .then(() => f(state.left))
                    .then((err) => Err(err))
            );

        return new AsyncResultImpl(Promise.resolve(Ok(state.right)));
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
                Promise.resolve()
                    .then(() => f(state.right))
                    .then(() => this)
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
                Promise.resolve()
                    .then(() => f(state.left))
                    .then(() => this)
            );

        return new AsyncResultImpl(Promise.resolve(this));
    }

    *iter(): IterableIterator<T> {
        const state = this.#state;
        if (isRight(state)) yield state.right;
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

    and<U, E2>(res: Result<U, E2>): Result<U, E | E2> {
        if (typeof res._isOk !== 'boolean')
            throw new InvalidArgumentError('Argument must be a Result');

        const state = this.#state;
        if (isRight(state)) return res;
        return this as unknown as ResultImpl<U, E | E2>;
    }

    andThen<U, F>(f: (val: T) => Result<U, F>): Result<U, E | F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state)) return f(state.right);
        return new ResultImpl(Left(state.left));
    }

    andThenAsync<U, F>(
        f: (val: T) => PromiseLike<Result<U, F>>
    ): AsyncResult<U, E | F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state))
            return new AsyncResultImpl(
                Promise.resolve().then(() => f(state.right))
            );

        return new AsyncResultImpl(Promise.resolve(Err(state.left)));
    }

    or<T2, F>(res: Result<T2, F>): Result<T | T2, F> {
        if (typeof res._isOk !== 'boolean')
            throw new InvalidArgumentError('Argument must be a Result');

        const state = this.#state;
        if (isLeft(state)) return res;
        return this as unknown as ResultImpl<T | T2, F>;
    }

    orElse<T2, F>(f: (err: E) => Result<T2, F>): Result<T | T2, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state)) return f(state.left);
        return new ResultImpl(Right(state.right));
    }

    orElseAsync<T2, F>(
        f: (err: E) => PromiseLike<Result<T2, F>>
    ): AsyncResult<T | T2, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state))
            return new AsyncResultImpl(
                Promise.resolve().then(() => f(state.left))
            );

        return new AsyncResultImpl(Promise.resolve(Ok<T | T2>(state.right)));
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

    flatten<U, F>(this: Result<Result<U, F>, E>): Result<U, E | F> {
        const _this = this as ResultImpl<Result<U, F>, E>;
        const state = _this.#state;

        if (isLeft(state)) return new ResultImpl(Left(state.left));

        if (!(state.right instanceof ResultImpl))
            throw new FlattenError(
                'flatten can only be called on Result<Result<T, E>, E>'
            );

        return state.right;
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
