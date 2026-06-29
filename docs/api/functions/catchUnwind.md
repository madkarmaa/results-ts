[**results-ts**](../index.md)

---

[results-ts](../index.md) / catchUnwind

# Function: catchUnwind()

## Call Signature

> **catchUnwind**\<`T`, `Args`\>(`fn`, `onThrow?`): (...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

Defined in: [result.ts:760](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/result.ts#L760)

Invokes a function, capturing the cause of a thrown error if one occurs.

This function will return `Ok` with the function's result if it does not throw, and will return
`Err(cause)` if the function throws. The cause returned is the value with which the function
originally threw.

It is not recommended to use this function for a general try/catch mechanism. The `Result` type
is more appropriate to use for functions that can fail on a regular basis.

When no `onThrow` handler is provided, the thrown value is wrapped as-is in an `Err`
(typed as `unknown`, since JavaScript allows throwing anything).
When `onThrow` is provided, it is called with the thrown value and its return value is wrapped
in an `Err`, allowing the error type to be narrowed and normalized.

### Type Parameters

#### T

`T`

#### Args

`Args` _extends_ `unknown`[]

### Parameters

#### fn

(...`args`) => `T`

The throwing function to wrap.

#### onThrow?

`undefined`

Optional handler invoked when `fn` throws; its return value becomes the `Err` payload.

### Returns

A function returning `Result<T, E>` that never throws.

(...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

## Call Signature

> **catchUnwind**\<`T`, `Args`, `E`\>(`fn`, `onThrow`): (...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:764](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/result.ts#L764)

Invokes a function, capturing the cause of a thrown error if one occurs.

This function will return `Ok` with the function's result if it does not throw, and will return
`Err(cause)` if the function throws. The cause returned is the value with which the function
originally threw.

It is not recommended to use this function for a general try/catch mechanism. The `Result` type
is more appropriate to use for functions that can fail on a regular basis.

When no `onThrow` handler is provided, the thrown value is wrapped as-is in an `Err`
(typed as `unknown`, since JavaScript allows throwing anything).
When `onThrow` is provided, it is called with the thrown value and its return value is wrapped
in an `Err`, allowing the error type to be narrowed and normalized.

### Type Parameters

#### T

`T`

#### Args

`Args` _extends_ `unknown`[]

#### E

`E`

### Parameters

#### fn

(...`args`) => `T`

The throwing function to wrap.

#### onThrow

(`thrown`, ...`args`) => `E`

Optional handler invoked when `fn` throws; its return value becomes the `Err` payload.

### Returns

A function returning `Result<T, E>` that never throws.

(...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `E`\>
