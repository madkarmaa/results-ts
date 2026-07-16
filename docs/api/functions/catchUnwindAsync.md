[**results-ts**](../index.md)

***

[results-ts](../index.md) / catchUnwindAsync

# Function: catchUnwindAsync()

## Call Signature

> **catchUnwindAsync**\<`T`, `Args`\>(`fn`, `onThrow?`): (...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `unknown`\>

Defined in: [async-result.ts:407](https://github.com/madkarmaa/results-ts/blob/990a1004b07298f39a3f92f94e12914041d212d2/src/async-result.ts#L407)

Async counterpart of `catchUnwind`. Invokes a function, capturing the cause of a thrown
error or rejected `Promise` if one occurs.

This function will return `Ok` with the function's result if it does not throw or reject, and
will return `Err(cause)` if the function throws or the returned `Promise` rejects. The cause
returned is the value with which the function originally threw or rejected.

It is not recommended to use this function for a general try/catch mechanism. The `AsyncResult`
type is more appropriate to use for functions that can fail on a regular basis.

When no `onThrow` handler is provided, the thrown/rejected value is wrapped as-is in an `Err`
(typed as `unknown`, since JavaScript allows throwing anything).
When `onThrow` is provided, it is called with the thrown value and its return value is wrapped
in an `Err`, allowing the error type to be narrowed and normalized.

### Type Parameters

#### T

`T`

#### Args

`Args` *extends* `unknown`[]

### Parameters

#### fn

(...`args`) => `T` \| `PromiseLike`\<`T`\>

The throwing/async function to wrap.

#### onThrow?

`undefined`

Optional handler invoked when `fn` throws or rejects; its return value becomes the `Err` payload.

### Returns

A function returning `AsyncResult<T, E>` that never throws.

(...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `unknown`\>

## Call Signature

> **catchUnwindAsync**\<`T`, `Args`, `E`\>(`fn`, `onThrow`): (...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `E`\>

Defined in: [async-result.ts:411](https://github.com/madkarmaa/results-ts/blob/990a1004b07298f39a3f92f94e12914041d212d2/src/async-result.ts#L411)

Async counterpart of `catchUnwind`. Invokes a function, capturing the cause of a thrown
error or rejected `Promise` if one occurs.

This function will return `Ok` with the function's result if it does not throw or reject, and
will return `Err(cause)` if the function throws or the returned `Promise` rejects. The cause
returned is the value with which the function originally threw or rejected.

It is not recommended to use this function for a general try/catch mechanism. The `AsyncResult`
type is more appropriate to use for functions that can fail on a regular basis.

When no `onThrow` handler is provided, the thrown/rejected value is wrapped as-is in an `Err`
(typed as `unknown`, since JavaScript allows throwing anything).
When `onThrow` is provided, it is called with the thrown value and its return value is wrapped
in an `Err`, allowing the error type to be narrowed and normalized.

### Type Parameters

#### T

`T`

#### Args

`Args` *extends* `unknown`[]

#### E

`E`

### Parameters

#### fn

(...`args`) => `T` \| `PromiseLike`\<`T`\>

The throwing/async function to wrap.

#### onThrow

(`thrown`, ...`args`) => `E`

Optional handler invoked when `fn` throws or rejects; its return value becomes the `Err` payload.

### Returns

A function returning `AsyncResult<T, E>` that never throws.

(...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `E`\>
