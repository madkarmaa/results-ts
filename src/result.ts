import {
    assertIsResultError,
    FlattenError,
    InvalidArgumentError,
    PanicError
} from './errors';
import { type Either, Left, Right, isLeft, isRight } from './either';
import { type Option, Some, None } from './option';

/**
 * The base interface for all errors returned by a `Result`.
 * It requires a `code` property which can be used to identify the error type.
 */
export interface ResultError {
    code: string;
}

/**
 * Represents a successful `Result` containing a value of type `T`.
 */
export type OkResult<T, E extends ResultError> = ResultMethods<T, E> & {
    readonly _isOk: true;
};

/**
 * Represents a failed `Result` containing an error of type `E`.
 */
export type ErrResult<T, E extends ResultError> = ResultMethods<T, E> & {
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
 * The error type `E` must extend `ResultError` which contains a `code` property of type `string`.
 *
 * @template T - Contains the success value.
 * @template E - Contains the error value. Must have a `code` property of type `string`.
 */
export type Result<T, E extends ResultError> = OkResult<T, E> | ErrResult<T, E>;

interface ResultMethods<T, E extends ResultError> {
    /**
     * Returns `true` if the result is `Ok`.
     */
    isOk(): this is OkResult<T, E>;

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
    isErr(): this is ErrResult<T, E>;

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
     * Converts self into an `Option<T>`, consuming self, and converting the error to `None`, if any.
     */
    ok(): Option<T>;

    /**
     * Converts from `Result<T, E>` to `Option<E>`.
     *
     * Converts self into an `Option<E>`, consuming self, and discarding the success value, if any.
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
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     *
     * This function can be used to pass through a successful result while handling an error.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapErr<F extends ResultError>(f: (err: E) => F): Result<T, F>;

    /**
     * Calls a function with a reference to the contained value if `Ok`.
     *
     * Returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspect(f: (val: T) => void): Result<T, E>;

    /**
     * Calls a function with a reference to the contained value if `Err`.
     *
     * Returns the original result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspectErr(f: (err: E) => void): Result<T, E>;

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
    and<U, E2 extends ResultError>(res: Result<U, E2>): Result<U, E | E2>;

    /**
     * Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * This function can be used for control flow based on `Result` values.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    andThen<U, F extends ResultError>(
        f: (val: T) => Result<U, F>
    ): Result<U, E | F>;

    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    or<T2, F extends ResultError>(res: Result<T2, F>): Result<T | T2, F>;

    /**
     * Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * This function can be used for control flow based on result values.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    orElse<T2, F extends ResultError>(
        f: (err: E) => Result<T2, F>
    ): Result<T | T2, F>;

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
     * Converts from `Result<Result<T, E>, E>` to `Result<T, E>`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    flatten<U, F extends ResultError>(
        this: Result<Result<U, F>, E>
    ): Result<U, E | F>;

    /**
     * Matches the `Result` with two functions, one for each variant.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    match<U>(handlers: { Ok: (val: T) => U; Err: (err: E) => U }): U;
}

class ResultImpl<T, E extends ResultError> implements ResultMethods<T, E> {
    // will error at runtime if trying to access # fields
    #state: Either<E, T>;

    get _isOk(): boolean {
        return isRight(this.#state);
    }

    constructor(state: Either<E, T>) {
        this.#state = state;
    }

    isOk(): this is OkResult<T, E> {
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

    isErr(): this is ErrResult<T, E> {
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

        if (isLeft(state)) return new ResultImpl(state);

        const mappedValue = f(state.right);
        return new ResultImpl(Right(mappedValue));
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

    mapErr<F extends ResultError>(f: (err: E) => F): Result<T, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;

        if (isLeft(state)) return new ResultImpl(Left(f(state.left)));
        return new ResultImpl(Right(state.right));
    }

    inspect(f: (val: T) => void): Result<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state)) f(state.right);
        return this;
    }

    inspectErr(f: (err: E) => void): Result<T, E> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state)) f(state.left);
        return this;
    }

    *iter(): IterableIterator<T> {
        const state = this.#state;
        if (isRight(state)) yield state.right;
    }

    expect(msg: string): T {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        const state = this.#state;
        if (isLeft(state))
            throw new PanicError(`${msg}: code "${state.left.code}"`);
        return state.right;
    }

    unwrap(): T {
        const state = this.#state;
        if (isLeft(state))
            throw new PanicError(
                `called \`Result.unwrap()\` on an \`Err\` value: code "${state.left.code}"`
            );
        return state.right;
    }

    expectErr(msg: string): E {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        const state = this.#state;
        if (isRight(state))
            throw new PanicError(`${msg}: "${String(state.right)}"`);
        return state.left;
    }

    unwrapErr(): E {
        const state = this.#state;
        if (isRight(state))
            throw new PanicError(
                `called \`Result.unwrapErr()\` on an \`Ok\` value: "${String(state.right)}"`
            );
        return state.left;
    }

    and<U, E2 extends ResultError>(res: Result<U, E2>): Result<U, E | E2> {
        if (!(res instanceof ResultImpl))
            throw new InvalidArgumentError('Argument must be a Result');

        const state = this.#state;
        if (isRight(state)) return res;
        return new ResultImpl(Left(state.left));
    }

    andThen<U, F extends ResultError>(
        f: (val: T) => Result<U, F>
    ): Result<U, E | F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isRight(state)) return f(state.right);
        return new ResultImpl(Left(state.left));
    }

    or<T2, F extends ResultError>(res: Result<T2, F>): Result<T | T2, F> {
        if (!(res instanceof ResultImpl))
            throw new InvalidArgumentError('Argument must be a Result');

        const state = this.#state;
        if (isLeft(state)) return res;
        return new ResultImpl(Right(state.right));
    }

    orElse<T2, F extends ResultError>(
        f: (err: E) => Result<T2, F>
    ): Result<T | T2, F> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isLeft(state)) return f(state.left);
        return new ResultImpl(Right(state.right));
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

    flatten<U, F extends ResultError>(
        this: Result<Result<U, F>, E>
    ): Result<U, E | F> {
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
export function Ok<T, E extends ResultError = never>(value: T): Result<T, E> {
    return new ResultImpl(Right(value));
}

/**
 * Contains the error value.
 *
 * @param error - The error to wrap in a failed result. Must have a `code` property of type `string`.
 * @returns A `Result` representing a failed outcome.
 */
export function Err<
    const C extends string,
    E extends ResultError & { code: C }
>(error: E): Result<never, E> {
    assertIsResultError(error);
    return new ResultImpl(Left(error));
}
