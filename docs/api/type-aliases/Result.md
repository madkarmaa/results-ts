[**results-ts**](../index.md)

***

[results-ts](../index.md) / Result

# Type Alias: Result\<T, E\>

> **Result**\<`T`, `E`\> = [`OkResult`](OkResult.md)\<`T`, `E`\> \| [`ErrResult`](ErrResult.md)\<`T`, `E`\>

Defined in: [result.ts:50](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L50)

`Result<T, E>` is the type used for returning and propagating errors.

It is a type with the parameters, `Ok(T)`, representing success and containing a value,
and `Err(E)`, representing error and containing an error value.

Functions return `Result` whenever errors are expected and recoverable.

`and` and `or` return an `AsyncResult` for promise-like operands. They resolve
the operand even when its value is unused; operand rejections propagate.

## Type Parameters

### T

`T`

Contains the success value.

### E

`E`

Contains the error value.
