interface ResultMethods<T, E extends { code: string }> {
    /**
     * Returns `true` if the result is `Ok`.
     */
    isOk(): this is Result<T, never>;
    /**
     * Returns `true` if the result is `Ok` and the value inside of it matches a predicate.
     */
    isOkAnd(fn: (val: T) => boolean): this is Result<T, never>;
    /**
     * Returns `true` if the result is `Err`.
     */
    isErr(): this is Result<never, E>;
    /**
     * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
     */
    isErrAnd(fn: (err: E) => boolean): this is Result<never, E>;
    // TODO: ok(): missing Option type
    // TODO: err(): missing Option type
    /**
     * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.
     *
     * This function can be used to compose the results of two functions.
     */
    mapc<U>(fn: (val: T) => U): Result<U, E>;
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
    mapErr<F extends { code: string }>(fn: (err: E) => F): Result<T, F>;
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
    // TODO: unwrapOrDefault(): missing Default interface
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
    and<U>(res: Result<U, E>): Result<U, E>;
    /**
     * Calls `fn` if the result is `Ok`, otherwise returns the `Err` value of `self`.
     *
     * This function can be used for control flow based on `Result` values.
     */
    andThen<U, F extends { code: string }>(
        fn: (val: T) => Result<U, F>
    ): Result<U, E | F>;
    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     */
    or<F extends { code: string }>(res: Result<T, F>): Result<T, F>;
    /**
     * Calls `fn` if the result is `Err`, otherwise returns the `Ok` value of `self`.
     *
     * This function can be used for control flow based on result values.
     */
    orElse<F extends { code: string }>(
        fn: (err: E) => Result<T, F>
    ): Result<T, F>;
    /**
     * Returns the contained `Ok` value or a provided default.
     *
     * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.
     */
    unwrapOr(fallback: T): T;
    /**
     * Returns the contained `Ok` value or computes it from a closure.
     */
    unwrapOrElse(fn: (err: E) => T): T;
}

type ResultTuple<T, E> = [T, null] | [null, E];

type OkResult<T> = [T, null] & ResultMethods<T, never>;

type ErrResult<E extends { code: string }> = [null, E] &
    ResultMethods<never, E>;

/**
 * `Result<T, E>` is the type used for returning and propagating errors.
 *
 * It is a type with the parameters, `Ok(T)`, representing success and containing a value,
 * and `Err(E)`, representing error and containing an error value.
 *
 * Functions return `Result` whenever errors are expected and recoverable.
 *
 * The error type `E` must be an object that contains a `code` property of type `string`.
 *
 * @example
 * ```typescript
 * const divide = (a: number, b: number) => {
 *   if (b === 0) return Err({ code: 'DIVIDE_BY_ZERO' });
 *   return Ok(a / b);
 * }
 *
 * const [value, error] = divide(10, 2);
 * if (error) console.error(error.code);
 * else console.log(value);
 * ```
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @template T - Contains the success value.
 * @template E - Contains the error value. Must have a `code` property of type `string`.
 */
export type Result<T, E extends { code: string }> = OkResult<T> | ErrResult<E>;

function createResult<T, E extends { code: string }>(
    tuple: ResultTuple<T, E>
): Result<T, E> {
    const methods = {
        isOk: function (this: Result<T, E>): this is Result<T, never> {
            return tuple[0] !== null;
        },

        isOkAnd: function (
            this: Result<T, E>,
            fn: (val: T) => boolean
        ): this is Result<T, never> {
            if (typeof fn !== 'function')
                throw new TypeError('isOkAnd requires a function');

            return this.isOk() && fn(tuple[0] as T);
        },

        isErr: function (this: Result<T, E>): this is Result<never, E> {
            return tuple[1] !== null;
        },

        isErrAnd: function (
            this: Result<T, E>,
            fn: (err: E) => boolean
        ): this is Result<never, E> {
            if (typeof fn !== 'function')
                throw new TypeError('isErrAnd requires a function');

            return this.isErr() && fn(tuple[1] as E);
        },

        mapc: function <U>(fn: (val: T) => U) {
            if (typeof fn !== 'function')
                throw new TypeError('map requires a function');

            if (this.isErr()) return Err(tuple[1] as E);
            return Ok(fn(tuple[0] as T));
        },

        mapOr: function <U>(fallback: U, fn: (val: T) => U) {
            if (typeof fn !== 'function')
                throw new TypeError('mapOr requires a function');

            if (this.isErr()) return fallback;
            return fn(tuple[0] as T);
        },

        mapOrElse: function <U>(fallbackFn: (err: E) => U, fn: (val: T) => U) {
            if (typeof fallbackFn !== 'function')
                throw new TypeError(
                    'mapOrElse requires fallbackFn to be a function'
                );
            if (typeof fn !== 'function')
                throw new TypeError('mapOrElse requires fn to be a function');

            if (this.isErr()) return fallbackFn(tuple[1] as E);
            return fn(tuple[0] as T);
        },

        mapErr: function <F extends { code: string }>(fn: (err: E) => F) {
            if (typeof fn !== 'function')
                throw new TypeError('mapErr requires a function');

            if (this.isErr()) return Err(fn(tuple[1] as E));
            return Ok(tuple[0] as T);
        },

        inspect: function (this: Result<T, E>, fn: (val: T) => void) {
            if (typeof fn !== 'function')
                throw new TypeError('inspect requires a function');

            if (this.isOk()) fn(tuple[0] as T);
            return this;
        },

        inspectErr: function (this: Result<T, E>, fn: (err: E) => void) {
            if (typeof fn !== 'function')
                throw new TypeError('inspectErr requires a function');

            if (this.isErr()) fn(tuple[1] as E);
            return this;
        },

        iter: function* (this: Result<T, E>) {
            if (this.isOk()) yield tuple[0] as T;
        },

        expect: function (this: Result<T, E>, msg: string) {
            if (typeof msg !== 'string')
                throw new TypeError('expect requires a string message');

            if (this.isErr()) throw new Error(msg);
            return tuple[0] as T;
        },

        unwrap: function () {
            if (this.isErr()) throw tuple[1];
            return tuple[0] as T;
        },

        expectErr: function (this: Result<T, E>, msg: string) {
            if (typeof msg !== 'string')
                throw new TypeError('expectErr requires a string message');

            if (this.isOk()) throw new Error(msg);
            return tuple[1] as E;
        },

        unwrapErr: function () {
            if (this.isOk()) throw new Error(`${tuple[0]}`);
            return tuple[1] as E;
        },

        and: function (res: Result<any, E>) {
            if (this.isOk()) return res;
            return Err(tuple[1] as E);
        },

        andThen: function <U, F extends { code: string }>(
            fn: (val: T) => Result<U, F>
        ) {
            if (typeof fn !== 'function')
                throw new TypeError('andThen requires a function');

            if (this.isOk()) return fn(tuple[0] as T);
            return Err(tuple[1] as E) as Result<never, E | F>;
        },

        or: function (res: Result<T, any>) {
            if (this.isErr()) return res;
            return Ok(tuple[0] as T);
        },

        orElse: function (fn: (err: E) => Result<T, any>) {
            if (typeof fn !== 'function')
                throw new TypeError('orElse requires a function');

            if (this.isErr()) return fn(tuple[1] as E);
            return Ok(tuple[0] as T);
        },

        unwrapOr: function (fallback: T) {
            if (this.isErr()) return fallback;
            return tuple[0] as T;
        },

        unwrapOrElse: function (fn: (err: E) => T) {
            if (typeof fn !== 'function')
                throw new TypeError('unwrapOrElse requires a function');

            if (this.isErr()) return fn(tuple[1] as E);
            return tuple[0] as T;
        }
    } satisfies ResultMethods<T, E>;

    return Object.assign(tuple, methods) as unknown as Result<T, E>;
}

/**
 * Contains the success value.
 *
 * @example
 * ```typescript
 * const [value, _] = Ok(42);
 * ```
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export function Ok<T>(value: T): Result<T, never> {
    return createResult<T, any>([value, null]) as Result<T, never>;
}

/**
 * Contains the error value.
 *
 * @example
 * ```typescript
 * const [_, error] = Err({ code: 'NOT_FOUND' });
 * ```
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param error - The error to wrap in a failed result. Must have a `code` property of type `string`.
 * @returns A `Result` representing a failed outcome.
 */
export function Err<const C extends string, E extends { code: C }>(
    error: E
): Result<never, E> {
    if (typeof error.code !== 'string')
        throw new TypeError(
            'Error object must have a code property of type string'
        );

    return createResult<any, E>([null, error]) as Result<never, E>;
}
