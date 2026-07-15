[**results-ts**](../index.md)

***

[results-ts](../index.md) / Result

# Type Alias: Result\<T, E\>

> **Result**\<`T`, `E`\> = [`OkResult`](OkResult.md)\<`T`, `E`\> \| [`ErrResult`](ErrResult.md)\<`T`, `E`\>

Defined in: [result.ts:44](https://github.com/madkarmaa/results-ts/blob/02f33abda914ca13428fe3b923550f23f8d71980/src/result.ts#L44)

`Result<T, E>` is the type used for returning and propagating errors.

It is a type with the parameters, `Ok(T)`, representing success and containing a value,
and `Err(E)`, representing error and containing an error value.

Functions return `Result` whenever errors are expected and recoverable.

## Type Parameters

### T

`T`

Contains the success value.

### E

`E`

Contains the error value.
