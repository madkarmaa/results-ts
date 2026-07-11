[**results-ts**](../index.md)

***

[results-ts](../index.md) / AsyncResult

# Interface: AsyncResult\<T, E\>

Defined in: [async-result.ts:13](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L13)

An async wrapper around `Result<T, E>` that is `PromiseLike` (so it's awaitable)
but also carries all chainable `Result` methods.

**Error behavior in async context:** Methods that throw synchronously on `Result`
(e.g. `unwrap` on `Err`, `flatten` on non-nested) will produce a rejected `Promise`.

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

Defined in: [async-result.ts:151](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L151)

Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.

Arguments passed to `and` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.

#### Type Parameters

##### U

`U`

##### E2

`E2`

#### Parameters

##### res

[`Result`](../type-aliases/Result.md)\<`U`, `E2`\>

#### Returns

`AsyncResult`\<`U`, `E` \| `E2`\>

***

### andThen()

> **andThen**\<`U`, `F`\>(`f`): `AsyncResult`\<`U`, `E` \| `F`\>

Defined in: [async-result.ts:158](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L158)

Calls `f` if the result is `Ok`, otherwise returns the `Err` value of `self`.

This function can be used for control flow based on `Result` values.

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

Defined in: [async-result.ts:163](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L163)

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

Defined in: [async-result.ts:46](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L46)

Converts from `AsyncResult<T, E>` to `AsyncOption<E>`.

Returns `Some` for `Err` and `None` for `Ok`.

#### Returns

[`AsyncOption`](AsyncOption.md)\<`E`\>

***

### expect()

> **expect**(`msg`): `Promise`\<`T`\>

Defined in: [async-result.ts:123](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L123)

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

Defined in: [async-result.ts:137](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L137)

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

Defined in: [async-result.ts:211](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L211)

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

Defined in: [async-result.ts:99](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L99)

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

Defined in: [async-result.ts:104](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L104)

Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### inspectErr()

> **inspectErr**(`f`): `AsyncResult`\<`T`, `E`\>

Defined in: [async-result.ts:111](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L111)

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

Defined in: [async-result.ts:116](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L116)

Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.

#### Parameters

##### f

(`err`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncResult`\<`T`, `E`\>

***

### isErr()

> **isErr**(): `Promise`\<`boolean`\>

Defined in: [async-result.ts:27](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L27)

Returns a `Promise` that resolves to `true` if the result is `Err`.

#### Returns

`Promise`\<`boolean`\>

***

### isErrAnd()

> **isErrAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-result.ts:32](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L32)

Returns a `Promise` that resolves to `true` if the result is `Err` and the error inside matches a predicate.

#### Parameters

##### f

(`err`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### isOk()

> **isOk**(): `Promise`\<`boolean`\>

Defined in: [async-result.ts:17](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L17)

Returns a `Promise` that resolves to `true` if the result is `Ok`.

#### Returns

`Promise`\<`boolean`\>

***

### isOkAnd()

> **isOkAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-result.ts:22](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L22)

Returns a `Promise` that resolves to `true` if the result is `Ok` and the value inside matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### map()

> **map**\<`U`\>(`f`): `AsyncResult`\<`U`, `E`\>

Defined in: [async-result.ts:53](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L53)

Maps an `AsyncResult<T, E>` to `AsyncResult<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.

This function can be used to compose the results of two functions.

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

Defined in: [async-result.ts:58](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L58)

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

Defined in: [async-result.ts:87](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L87)

Maps an `AsyncResult<T, E>` to `AsyncResult<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.

This function can be used to pass through a successful result while handling an error.

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

Defined in: [async-result.ts:92](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L92)

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

Defined in: [async-result.ts:65](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L65)

Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).

Arguments passed to `mapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `mapOrElse`, which is lazily evaluated.

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

Defined in: [async-result.ts:72](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L72)

Maps an `AsyncResult<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.

This function can be used to unpack a successful result while handling an error.

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

Defined in: [async-result.ts:77](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L77)

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

Defined in: [async-result.ts:224](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L224)

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

Defined in: [async-result.ts:39](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L39)

Converts from `AsyncResult<T, E>` to `AsyncOption<T>`.

Returns `Some` for `Ok` and `None` for `Err`.

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

***

### or()

> **or**\<`T2`, `F`\>(`res`): `AsyncResult`\<`T` \| `T2`, `F`\>

Defined in: [async-result.ts:172](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L172)

Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.

Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.

#### Type Parameters

##### T2

`T2`

##### F

`F`

#### Parameters

##### res

[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>

#### Returns

`AsyncResult`\<`T` \| `T2`, `F`\>

***

### orElse()

> **orElse**\<`T2`, `F`\>(`f`): `AsyncResult`\<`T` \| `T2`, `F`\>

Defined in: [async-result.ts:179](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L179)

Calls `f` if the result is `Err`, otherwise returns the `Ok` value of `self`.

This function can be used for control flow based on result values.

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

Defined in: [async-result.ts:184](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L184)

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

Defined in: [async-result.ts:219](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L219)

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

Defined in: [async-result.ts:130](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L130)

Returns the contained `Ok` value.

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the value is an `Err`, with a panic message provided by the `Err`'s value.

***

### unwrapErr()

> **unwrapErr**(): `Promise`\<`E`\>

Defined in: [async-result.ts:144](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L144)

Returns the contained `Err` value.

#### Returns

`Promise`\<`E`\>

#### Throws

Rejects with `PanicError` if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.

***

### unwrapOr()

> **unwrapOr**\<`T2`\>(`fallback`): `Promise`\<`T` \| `T2`\>

Defined in: [async-result.ts:193](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L193)

Returns the contained `Ok` value or a provided default.

Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.

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

Defined in: [async-result.ts:198](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L198)

Returns the contained `Ok` value or computes it from a closure.

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

Defined in: [async-result.ts:203](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-result.ts#L203)

Async version of `unwrapOrElse`. Returns the contained `Ok` value or computes it from an async closure.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`T2`\>

#### Returns

`Promise`\<`T` \| `T2`\>
