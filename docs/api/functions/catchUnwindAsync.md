[**results-ts**](../index.md)

***

[results-ts](../index.md) / catchUnwindAsync

# Function: catchUnwindAsync()

## Call Signature

> **catchUnwindAsync**\<`T`, `Args`\>(`fn`, `onThrow?`): (...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `unknown`\>

Defined in: [async-result.ts:437](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/async-result.ts#L437)

Wraps `fn` so a resolved value becomes `Ok(value)` and a throw or rejection becomes `Err(cause)`.
Use this to adapt functions that throw or reject. Functions with expected failures should return `AsyncResult`.

Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
becomes the error. The handler receives the cause and the original arguments.
Exceptions from `onThrow` reject the returned wrapper.

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

A function that captures throws and rejections from `fn` in an `AsyncResult`.

(...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `unknown`\>

## Call Signature

> **catchUnwindAsync**\<`T`, `Args`, `E`\>(`fn`, `onThrow`): (...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `E`\>

Defined in: [async-result.ts:441](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/async-result.ts#L441)

Wraps `fn` so a resolved value becomes `Ok(value)` and a throw or rejection becomes `Err(cause)`.
Use this to adapt functions that throw or reject. Functions with expected failures should return `AsyncResult`.

Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
becomes the error. The handler receives the cause and the original arguments.
Exceptions from `onThrow` reject the returned wrapper.

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

A function that captures throws and rejections from `fn` in an `AsyncResult`.

(...`args`) => [`AsyncResult`](../interfaces/AsyncResult.md)\<`T`, `E`\>
