[**results-ts**](../index.md)

***

[results-ts](../index.md) / Option

# Type Alias: Option\<T\>

> **Option**\<`T`\> = [`SomeOption`](SomeOption.md)\<`T`\> \| [`NoneOption`](NoneOption.md)\<`T`\>

Defined in: [option.ts:37](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/option.ts#L37)

Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.

`Option`s are commonly paired with pattern matching to query the presence of a value and take action, always accounting for the `None` case.

## Type Parameters

### T

`T`

Contains the type of the value that may be present in the `Option`.
