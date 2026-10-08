[**results-ts**](../index.md)

***

[results-ts](../index.md) / Option

# Type Alias: Option\<T\>

> **Option**\<`T`\> = [`SomeOption`](SomeOption.md)\<`T`\> \| [`NoneOption`](NoneOption.md)\<`T`\>

Defined in: [option.ts:44](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/option.ts#L44)

Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.

`Option`s are commonly paired with pattern matching to query the presence of a value and take action, always accounting for the `None` case.

`and`, `or`, `xor`, and `zip` return an `AsyncOption` for promise-like operands.
They capture the receiver's state at invocation and resolve the operand even
when its value is unused; operand rejections propagate.

## Type Parameters

### T

`T`

Contains the type of the value that may be present in the `Option`.
