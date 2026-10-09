[**results-ts**](../index.md)

***

[results-ts](../index.md) / Result

# Type Alias: Result\<T, E\>

> **Result**\<`T`, `E`\> = [`OkResult`](OkResult.md)\<`T`, `E`\> \| [`ErrResult`](ErrResult.md)\<`T`, `E`\>

Defined in: [result.ts:49](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/result.ts#L49)

`Result<T, E>` is either `Ok(value)` with a value of type `T`, or
`Err(error)` with an error of type `E`. Return it for recoverable failures.

Invalid callbacks and operands throw errors. Callback exceptions propagate.

`and` and `or` return an `AsyncResult` for promise-like operands. They resolve
the operand even when its value is unused. Operand rejections propagate.

## Type Parameters

### T

`T`

The success value type.

### E

`E`

The error value type.
