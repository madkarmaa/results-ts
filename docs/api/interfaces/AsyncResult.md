[**results-ts**](../index.md)

***

[results-ts](../index.md) / AsyncResult

# Interface: AsyncResult\<T, E\>

Defined in: [async-result.ts:16](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L16)

An awaitable wrapper around `Result<T, E>` with chainable methods.

`and` and `or` accept sync or promise-like operands. Async operands resolve
concurrently with the receiver. Either rejection propagates.

Methods that throw on `Result` reject on `AsyncResult`.
For example, `unwrap` rejects on `Err`, and `flatten` rejects a non-nested value.

## Extends

- `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

## Type Parameters

### T

`T`

### E

`E`

## Methods

### and()

> **and**\<`U`, `E2`\>(`res`): `AsyncResult`\<`U`, `E` \| `E2`\>

Defined in: [async-result.ts:148](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L148)

Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.

JavaScript evaluates the operand before the call. Use `andThen` to compute it only on `Ok`.

#### Type Parameters

##### U

`U`

##### E2

`E2`

#### Parameters

##### res

[`Result`](../type-aliases/Result.md)\<`U`, `E2`\> \| `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`U`, `E2`\>\>

#### Returns

`AsyncResult`\<`U`, `E` \| `E2`\>

***

### andThen()

> **andThen**\<`U`, `F`\>(`f`): `AsyncResult`\<`U`, `E` \| `F`\>

Defined in: [async-result.ts:155](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L155)

Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### f

(`val`) => [`Result`](../type-aliases/Result.md)\<`U`, `F`\>

#### Returns

`AsyncResult`\<`U`, `E` \| `F`\>

***

### andThenAsync()

> **andThenAsync**\<`U`, `F`\>(`f`): `AsyncResult`\<`U`, `E` \| `F`\>

Defined in: [async-result.ts:160](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L160)

Async version of `andThen`. Calls an async `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### f

(`val`) => `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`U`, `F`\>\>

#### Returns

`AsyncResult`\<`U`, `E` \| `F`\>

***

### err()

> **err**(): [`AsyncOption`](AsyncOption.md)\<`E`\>

Defined in: [async-result.ts:49](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L49)

Converts from `AsyncResult<T, E>` to `AsyncOption<E>`.

Returns `Some` for `Err` and `None` for `Ok`.

#### Returns

[`AsyncOption`](AsyncOption.md)\<`E`\>

***

### expect()

> **expect**(`msg`): `Promise`\<`T`\>

Defined in: [async-result.ts:120](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L120)

Returns the contained `Ok` value.

#### Parameters

##### msg

`string`

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the value is an `Err`, with a panic message including the passed message, and the content of the `Err`.

***

### expectErr()

> **expectErr**(`msg`): `Promise`\<`E`\>

Defined in: [async-result.ts:134](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L134)

Returns the contained `Err` value.

#### Parameters

##### msg

`string`

#### Returns

`Promise`\<`E`\>

#### Throws

Rejects with `PanicError` if the value is an `Ok`, with a panic message including the passed message, and the content of the `Ok`.

***

### flatten()

> **flatten**\<`U`, `F`\>(`this`): `AsyncResult`\<`U`, `E` \| `F`\>

Defined in: [async-result.ts:208](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L208)

Converts from `AsyncResult<Result<T, E>, E>` to `AsyncResult<T, E>`.

**Async note:** If the inner value is not a `Result`, this produces a rejected `Promise`
with `FlattenError` rather than a synchronous throw.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### this

`AsyncResult`\<[`Result`](../type-aliases/Result.md)\<`U`, `F`\>, `E`\>

#### Returns

`AsyncResult`\<`U`, `E` \| `F`\>

***

### inspect()

> **inspect**(`f`): `AsyncResult`\<`T`, `E`\>

Defined in: [async-result.ts:96](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L96)

Calls a function with a reference to the contained value if `Ok`.

Returns the original result.

#### Parameters

##### f

(`val`) => `void`

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### inspectAsync()

> **inspectAsync**(`f`): `AsyncResult`\<`T`, `E`\>

Defined in: [async-result.ts:101](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L101)

Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### inspectErr()

> **inspectErr**(`f`): `AsyncResult`\<`T`, `E`\>

Defined in: [async-result.ts:108](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L108)

Calls a function with a reference to the contained value if `Err`.

Returns the original result.

#### Parameters

##### f

(`err`) => `void`

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### inspectErrAsync()

> **inspectErrAsync**(`f`): `AsyncResult`\<`T`, `E`\>

Defined in: [async-result.ts:113](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L113)

Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.

#### Parameters

##### f

(`err`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### isErr()

> **isErr**(): `Promise`\<`boolean`\>

Defined in: [async-result.ts:30](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L30)

Returns a `Promise` that resolves to `true` if the result is `Err`.

#### Returns

`Promise`\<`boolean`\>

***

### isErrAnd()

> **isErrAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-result.ts:35](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L35)

Returns a `Promise` that resolves to `true` if the result is `Err` and the error inside matches a predicate.

#### Parameters

##### f

(`err`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### isOk()

> **isOk**(): `Promise`\<`boolean`\>

Defined in: [async-result.ts:20](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L20)

Returns a `Promise` that resolves to `true` if the result is `Ok`.

#### Returns

`Promise`\<`boolean`\>

***

### isOkAnd()

> **isOkAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-result.ts:25](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L25)

Returns a `Promise` that resolves to `true` if the result is `Ok` and its value matches the predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### map()

> **map**\<`U`\>(`f`): `AsyncResult`\<`U`, `E`\>

Defined in: [async-result.ts:54](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L54)

Maps an `AsyncResult<T, E>` to `AsyncResult<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

`AsyncResult`\<`U`, `E`\>

***

### mapAsync()

> **mapAsync**\<`U`\>(`f`): `AsyncResult`\<`U`, `E`\>

Defined in: [async-result.ts:59](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L59)

Async version of `map`. Maps an `AsyncResult<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

`AsyncResult`\<`U`, `E`\>

***

### mapErr()

> **mapErr**\<`F`\>(`f`): `AsyncResult`\<`T`, `F`\>

Defined in: [async-result.ts:84](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L84)

Maps an `AsyncResult<T, E>` to `AsyncResult<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `F`

#### Returns

`AsyncResult`\<`T`, `F`\>

***

### mapErrAsync()

> **mapErrAsync**\<`F`\>(`f`): `AsyncResult`\<`T`, `F`\>

Defined in: [async-result.ts:89](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L89)

Async version of `mapErr`. Maps an `AsyncResult<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`F`\>

#### Returns

`AsyncResult`\<`T`, `F`\>

***

### mapOr()

> **mapOr**\<`U`\>(`fallback`, `f`): `Promise`\<`U`\>

Defined in: [async-result.ts:66](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L66)

Returns the fallback on `Err`, or calls `f` with the `Ok` value.

JavaScript evaluates the fallback before the call. Use `mapOrElse` to compute it only on `Err`.

#### Type Parameters

##### U

`U`

#### Parameters

##### fallback

`U`

##### f

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### mapOrElse()

> **mapOrElse**\<`U`\>(`fallbackFn`, `f`): `Promise`\<`U`\>

Defined in: [async-result.ts:71](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L71)

Maps an `AsyncResult<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.

#### Type Parameters

##### U

`U`

#### Parameters

##### fallbackFn

(`err`) => `U`

##### f

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`fallbackFn`, `f`): `Promise`\<`U`\>

Defined in: [async-result.ts:76](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L76)

Async version of `mapOrElse`. Maps an `AsyncResult<T, E>` to `Promise<U>` by applying async fallback function `fallbackFn` to a contained `Err` value, or async function `f` to a contained `Ok` value.

#### Type Parameters

##### U

`U`

#### Parameters

##### fallbackFn

(`err`) => `PromiseLike`\<`U`\>

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

`Promise`\<`U`\>

***

### match()

> **match**\<`U`\>(`handlers`): `Promise`\<`U`\>

Defined in: [async-result.ts:221](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L221)

Matches the `Result` with two functions, one for each variant.

#### Type Parameters

##### U

`U`

#### Parameters

##### handlers

###### Err

(`err`) => `U`

###### Ok

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### ok()

> **ok**(): [`AsyncOption`](AsyncOption.md)\<`T`\>

Defined in: [async-result.ts:42](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L42)

Converts from `AsyncResult<T, E>` to `AsyncOption<T>`.

Returns `Some` for `Ok` and `None` for `Err`.

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

***

### or()

> **or**\<`T2`, `F`\>(`res`): `AsyncResult`\<`T` \| `T2`, `F`\>

Defined in: [async-result.ts:169](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L169)

Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.

JavaScript evaluates the operand before the call. Use `orElse` to compute it only on `Err`.

#### Type Parameters

##### T2

`T2`

##### F

`F`

#### Parameters

##### res

[`Result`](../type-aliases/Result.md)\<`T2`, `F`\> \| `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>\>

#### Returns

`AsyncResult`\<`T` \| `T2`, `F`\>

***

### orElse()

> **orElse**\<`T2`, `F`\>(`f`): `AsyncResult`\<`T` \| `T2`, `F`\>

Defined in: [async-result.ts:176](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L176)

Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.

#### Type Parameters

##### T2

`T2`

##### F

`F`

#### Parameters

##### f

(`err`) => [`Result`](../type-aliases/Result.md)\<`T2`, `F`\>

#### Returns

`AsyncResult`\<`T` \| `T2`, `F`\>

***

### orElseAsync()

> **orElseAsync**\<`T2`, `F`\>(`f`): `AsyncResult`\<`T` \| `T2`, `F`\>

Defined in: [async-result.ts:181](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L181)

Async version of `orElse`. Calls an async `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.

#### Type Parameters

##### T2

`T2`

##### F

`F`

#### Parameters

##### f

(`err`) => `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>\>

#### Returns

`AsyncResult`\<`T` \| `T2`, `F`\>

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`AsyncOption`](AsyncOption.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [async-result.ts:216](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L216)

Transposes an `AsyncResult` of an `Option` into an `AsyncOption` of a `Result`.

**Async note:** If the inner value is not an `Option`, this produces a rejected `Promise`
with `TransposeError` rather than a synchronous throw.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### this

`AsyncResult`\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

***

### unwrap()

> **unwrap**(): `Promise`\<`T`\>

Defined in: [async-result.ts:127](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L127)

Returns the contained `Ok` value.

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the value is an `Err`, with a panic message provided by the `Err`'s value.

***

### unwrapErr()

> **unwrapErr**(): `Promise`\<`E`\>

Defined in: [async-result.ts:141](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L141)

Returns the contained `Err` value.

#### Returns

`Promise`\<`E`\>

#### Throws

Rejects with `PanicError` if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.

***

### unwrapOr()

> **unwrapOr**\<`T2`\>(`fallback`): `Promise`\<`T` \| `T2`\>

Defined in: [async-result.ts:190](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L190)

Returns the contained `Ok` value or a provided default.

JavaScript evaluates the fallback before the call. Use `unwrapOrElse` to compute it only on `Err`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### fallback

`T2`

#### Returns

`Promise`\<`T` \| `T2`\>

***

### unwrapOrElse()

> **unwrapOrElse**\<`T2`\>(`f`): `Promise`\<`T` \| `T2`\>

Defined in: [async-result.ts:195](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L195)

Returns the contained `Ok` value, or calls `f` with the error.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `T2`

#### Returns

`Promise`\<`T` \| `T2`\>

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T2`\>(`f`): `Promise`\<`T` \| `T2`\>

Defined in: [async-result.ts:200](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-result.ts#L200)

Returns the `Ok` value, or awaits `f` with the error.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`T2`\>

#### Returns

`Promise`\<`T` \| `T2`\>
