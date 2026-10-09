[**results-ts**](../index.md)

***

[results-ts](../index.md) / catchUnwind

# Function: catchUnwind()

## Call Signature

> **catchUnwind**\<`T`, `Args`\>(`fn`, `onThrow?`): (...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

Defined in: [result.ts:731](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L731)

Wraps `fn` so a return value becomes `Ok(value)` and a thrown value becomes `Err(thrown)`.
Use this to adapt functions that throw. Functions with expected failures should return `Result`.

Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
becomes the error. The handler receives the thrown value and the original arguments.
Exceptions from `onThrow` propagate to the caller.

### Type Parameters

#### T

`T`

#### Args

`Args` *extends* `unknown`[]

### Parameters

#### fn

(...`args`) => `T`

The throwing function to wrap.

#### onThrow?

`undefined`

Optional handler invoked when `fn` throws; its return value becomes the `Err` payload.

### Returns

A function that captures exceptions from `fn` in a `Result`.

(...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `unknown`\>

## Call Signature

> **catchUnwind**\<`T`, `Args`, `E`\>(`fn`, `onThrow`): (...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:735](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L735)

Wraps `fn` so a return value becomes `Ok(value)` and a thrown value becomes `Err(thrown)`.
Use this to adapt functions that throw. Functions with expected failures should return `Result`.

Without `onThrow`, the error type is `unknown`. With `onThrow`, its return value
becomes the error. The handler receives the thrown value and the original arguments.
Exceptions from `onThrow` propagate to the caller.

### Type Parameters

#### T

`T`

#### Args

`Args` *extends* `unknown`[]

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

A function that captures exceptions from `fn` in a `Result`.

(...`args`) => [`Result`](../type-aliases/Result.md)\<`T`, `E`\>
