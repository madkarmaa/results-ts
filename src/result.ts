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
export type OkResult<T, E extends ResultError> = {
    readonly value: T;
    readonly error: null;
} & ResultMethods<T, E>;

/**
 * Represents a failed `Result` containing an error of type `E`.
 */
export type ErrResult<T, E extends ResultError> = {
    readonly value: null;
    readonly error: E;
} & ResultMethods<T, E>;

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
 * @example
 * ```typescript
 * const divide = (a: number, b: number) => {
 *   if (b === 0) return Err({ code: 'DIVIDE_BY_ZERO' });
 *   return Ok(a / b);
 * }
 *
 * const { value, error } = divide(10, 2);
 * if (error) console.error(error.code);
 * else console.log(value);
 * ```
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
     */
    isOkAnd(fn: (val: T) => boolean): this is OkResult<T, E>;
    /**
     * Returns `true` if the result is `Err`.
     */
    isErr(): this is ErrResult<T, E>;
    /**
     * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
     */
    isErrAnd(fn: (err: E) => boolean): this is ErrResult<T, E>;
    // TODO: ok(): missing Option type
    // TODO: err(): missing Option type
    /**
     * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.
     *
     * This function can be used to compose the results of two functions.
     */
    map<U>(fn: (val: T) => U): Result<U, E>;
    /**
     * Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).
     *
     * Arguments passed to `mapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `mapOrElse`, which is lazily evaluated.
     */
    mapOr<U>(fallback: U, fn: (val: T) => U): U;
    /**
     * Maps a `Result<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `fn` to a contained `Ok` value.
     *
     * This function can be used to unpack a successful result while handling an error.
     */
    mapOrElse<U>(fallbackFn: (err: E) => U, fn: (val: T) => U): U;
    /**
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     *
     * This function can be used to pass through a successful result while handling an error.
     */
    mapErr<F extends ResultError>(fn: (err: E) => F): Result<T, F>;
    /**
     * Calls a function with a reference to the contained value if `Ok`.
     *
     * Returns the original result.
     */
    inspect(fn: (val: T) => void): Result<T, E>;
    /**
     * Calls a function with a reference to the contained value if `Err`.
     *
     * Returns the original result.
     */
    inspectErr(fn: (err: E) => void): Result<T, E>;
    /**
     * Returns an iterator over the possibly contained value.
     *
     * The iterator yields one value if the result is `Result::Ok`, otherwise none.
     */
    iter(): Iterable<T>;
    /**
     * Returns the contained `Ok` value, consuming the `self` value.
     *
     * @throws Throws if the value is an `Err`, with an error message including the passed message, and the content of the `Err`.
     */
    expect(msg: string): T;
    /**
     * Returns the contained `Ok` value, consuming the `self` value.
     *
     * @throws Throws if the value is an `Err`, with an error message provided by the `Err`'s value.
     */
    unwrap(): T;
    /**
     * Returns the contained `Err` value, consuming the `self` value.
     *
     * @throws Throws if the value is an `Ok`, with an error message including the passed message, and the content of the `Ok`.
     */
    expectErr(msg: string): E;
    /**
     * Returns the contained `Err` value, consuming the `self` value.
     *
     * @throws Throws if the value is an `Ok`, with a custom error message provided by the `Ok`'s value.
     */
    unwrapErr(): E;
    /**
     * Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * Arguments passed to `and` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.
     */
    and<U, E2 extends ResultError>(res: Result<U, E2>): Result<U, E | E2>;
    /**
     * Calls `fn` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * This function can be used for control flow based on `Result` values.
     */
    andThen<U, F extends ResultError>(
        fn: (val: T) => Result<U, F>
    ): Result<U, E | F>;
    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     */
    or<T2, F extends ResultError>(res: Result<T2, F>): Result<T | T2, F>;
    /**
     * Calls `fn` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * This function can be used for control flow based on result values.
     */
    orElse<T2, F extends ResultError>(
        fn: (err: E) => Result<T2, F>
    ): Result<T | T2, F>;
    /**
     * Returns the contained `Ok` value or a provided default.
     *
     * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.
     */
    unwrapOr<T2>(fallback: T2): T | T2;
    /**
     * Returns the contained `Ok` value or computes it from a closure.
     */
    unwrapOrElse<T2>(fn: (err: E) => T2): T | T2;
}

class ResultImpl<T, E extends ResultError> implements ResultMethods<T, E> {
    // will error at runtime if trying to access # fields
    #value: T | null;
    #error: E | null;

    constructor(value: T | null, error: E | null) {
        this.#value = value;
        this.#error = error;
    }

    // will prevent mutation at runtime
    get value(): T | null {
        return this.#value;
    }

    // will prevent mutation at runtime
    get error(): E | null {
        return this.#error;
    }

    isOk(): this is OkResult<T, E> {
        return this.error === null;
    }

    isOkAnd(fn: (val: T) => boolean): this is OkResult<T, E> {
        return this.isOk() && fn(this.value);
    }

    isErr(): this is ErrResult<T, E> {
        return this.value === null;
    }

    isErrAnd(fn: (err: E) => boolean): this is ErrResult<T, E> {
        return this.isErr() && fn(this.error);
    }

    map<U>(fn: (val: T) => U): Result<U, E> {
        if (this.isErr())
            return new ResultImpl<U, E>(null, this.error) as Result<U, E>;
        return new ResultImpl<U, E>(fn(this.value as T), null) as Result<U, E>;
    }

    mapOr<U>(fallback: U, fn: (val: T) => U): U {
        if (this.isErr()) return fallback;
        return fn(this.value as T);
    }

    mapOrElse<U>(fallbackFn: (err: E) => U, fn: (val: T) => U): U {
        if (this.isErr()) return fallbackFn(this.error);
        return fn(this.value as T);
    }

    mapErr<F extends ResultError>(fn: (err: E) => F): Result<T, F> {
        if (this.isErr())
            return new ResultImpl<T, F>(null, fn(this.error)) as Result<T, F>;
        return new ResultImpl<T, F>(this.value, null) as Result<T, F>;
    }

    inspect(fn: (val: T) => void): Result<T, E> {
        if (this.isOk()) fn(this.value);
        return this as Result<T, E>;
    }

    inspectErr(fn: (err: E) => void): Result<T, E> {
        if (this.isErr()) fn(this.error);
        return this as Result<T, E>;
    }

    // FIXME: it should return an Option type, but that is not implemented yet
    *iter(): Iterable<T> {
        if (this.isOk()) yield this.value;
    }

    expect(msg: string): T {
        if (this.isErr()) throw new Error(msg);
        return this.value as T;
    }

    unwrap(): T {
        if (this.error !== null) throw this.error;
        return this.value as T;
    }

    expectErr(msg: string): E {
        if (this.isOk()) throw new Error(msg);
        return this.error as E;
    }

    unwrapErr(): E {
        if (this.isOk()) throw new Error(String(this.value));
        return this.error as E;
    }

    and<U, E2 extends ResultError>(res: Result<U, E2>): Result<U, E | E2> {
        if (this.isOk()) return res;
        return new ResultImpl<U, E | E2>(null, this.error) as Result<U, E | E2>;
    }

    andThen<U, F extends ResultError>(
        fn: (val: T) => Result<U, F>
    ): Result<U, E | F> {
        if (this.isOk()) return fn(this.value);
        return new ResultImpl<U, E | F>(null, this.error) as Result<U, E | F>;
    }

    or<T2, F extends ResultError>(res: Result<T2, F>): Result<T | T2, F> {
        if (this.isErr()) return res;
        return new ResultImpl<T | T2, F>(this.value, null) as Result<T | T2, F>;
    }

    orElse<T2, F extends ResultError>(
        fn: (err: E) => Result<T2, F>
    ): Result<T | T2, F> {
        if (this.isErr()) return fn(this.error);
        return new ResultImpl<T | T2, F>(this.value, null) as Result<T | T2, F>;
    }

    unwrapOr<T2>(fallback: T2): T | T2 {
        if (this.isErr()) return fallback;
        return this.value as T;
    }

    unwrapOrElse<T2>(fn: (err: E) => T2): T | T2 {
        if (this.isErr()) return fn(this.error);
        return this.value as T;
    }
}

/**
 * Contains the success value.
 *
 * @example
 * ```typescript
 * const { value } = Ok(42);
 * ```
 *
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export const Ok = <T, E extends ResultError = never>(
    value: T
): Result<T, E> => {
    return new ResultImpl<T, E>(value, null) as Result<T, E>;
};

/**
 * Contains the error value.
 *
 * @example
 * ```typescript
 * const { error } = Err({ code: 'NOT_FOUND' });
 * ```
 *
 * @param error - The error to wrap in a failed result. Must have a `code` property of type `string`.
 * @returns A `Result` representing a failed outcome.
 */
export const Err = <
    const C extends string,
    E extends ResultError & { code: C }
>(
    error: E
): Result<never, E> => {
    return new ResultImpl<never, E>(null, error) as Result<never, E>;
};
