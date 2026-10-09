[**results-ts**](../index.md)

***

[results-ts](../index.md) / Option

# Type Alias: Option\<T\>

> **Option**\<`T`\> = [`SomeOption`](SomeOption.md)\<`T`\> \| [`NoneOption`](NoneOption.md)\<`T`\>

Defined in: [option.ts:41](https://github.com/madkarmaa/results-ts/blob/493f3f8eafc3c624562921c2d6fcb76392af4130/src/option.ts#L41)

`Option<T>` is either `Some(value)` with a value of type `T`, or `None`.
Use `match` to handle both variants.

Invalid callbacks and operands throw errors. Callback exceptions propagate.

`and`, `or`, `xor`, and `zip` return an `AsyncOption` for promise-like operands.
They capture the receiver's state at invocation and resolve the operand even
when its value is unused. Operand rejections propagate.

## Type Parameters

### T

`T`

The contained value type.
