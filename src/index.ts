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
export type Result<T, E extends { code: string }> = [T, null] | [null, E];

/**
 * Contains the success value.
 *
 * @example
 * ```typescript
 * const result = Ok(42);
 * ```
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export const Ok = <T>(value: T): Result<T, never> => [value, null];

/**
 * Contains the error value.
 *
 * @example
 * ```typescript
 * const result = Err({ code: 'NOT_FOUND' });
 * ```
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param error - The error to wrap in a failed result. Must have a `code` property of type `string`.
 * @returns A `Result` representing a failed outcome.
 */
export const Err = <const C extends string, E extends { code: C }>(
    error: E
): Result<never, E> => {
    if (typeof error.code !== 'string')
        throw new TypeError(
            'Error object must have a code property of type string'
        );

    return [null, error];
};
