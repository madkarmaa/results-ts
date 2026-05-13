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
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @template T - Contains the success value.
 * @template E - Contains the error value. Must have a `code` property of type `string`.
 */
export type Result<T, E extends { code: string }> = [T, null] | [null, E];

/**
 * Contains the success value.
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param value - The value to wrap in a successful result.
 * @returns A `Result` representing a successful outcome.
 */
export const Ok = <T>(value: T): Result<T, never> => [value, null];

/**
 * Contains the error value.
 *
 * @see https://www.youtube.com/watch?v=ovnyeq-Xxrc
 * @param error - The error to wrap in a failed result. Must have a `code` property of type `string`.
 * @returns A `Result` representing a failed outcome.
 */
export const Err = <const C extends string, E extends { code: C }>(
    error: E
): Result<never, E> => [null, error];
