[**results-ts**](../index.md)

***

[results-ts](../index.md) / Option

# Type Alias: Option\<T\>

> **Option**\<`T`\> = [`SomeOption`](SomeOption.md)\<`T`\> \| [`NoneOption`](NoneOption.md)\<`T`\>

Defined in: [option.ts:37](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/option.ts#L37)

Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.

`Option`s are commonly paired with pattern matching to query the presence of a value and take action, always accounting for the `None` case.

## Type Parameters

### T

`T`

Contains the type of the value that may be present in the `Option`.
