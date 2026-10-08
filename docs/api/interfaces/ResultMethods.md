[**results-ts**](../index.md)

***

[results-ts](../index.md) / ResultMethods

# Interface: ResultMethods\<T, E\>

Defined in: [result.ts:52](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L52)

## Type Parameters

### T

`T`

### E

`E`

## Methods

### and()

#### Call Signature

> **and**\<`U`, `E2`\>(`res`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:231](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L231)

Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.

Arguments passed to `and` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.

##### Type Parameters

###### U

`U`

###### E2

`E2`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`U`, `E2`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\>

##### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

#### Call Signature

> **and**\<`U`, `E2`\>(`res`): [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:232](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L232)

##### Type Parameters

###### U

`U`

###### E2

`E2`

##### Parameters

###### res

`PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`U`, `E2`\>\>

##### Returns

[`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `E2`\>

#### Call Signature

> **and**\<`U`, `E2`\>(`res`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\> \| [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:233](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L233)

##### Type Parameters

###### U

`U`

###### E2

`E2`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`U`, `E2`\> \| `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`U`, `E2`\>\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\> \| [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `E2`\>

***

### andThen()

> **andThen**\<`U`, `F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:244](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L244)

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

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### andThenAsync()

> **andThenAsync**\<`U`, `F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:251](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L251)

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

[`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### err()

> **err**(): [`Option`](../type-aliases/Option.md)\<`E`\>

Defined in: [result.ts:93](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L93)

Converts from `Result<T, E>` to `Option<E>`.

Returns `Some` for `Err` and `None` for `Ok`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`E`\>

***

### expect()

> **expect**(`msg`): `T`

Defined in: [result.ts:200](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L200)

Returns the contained `Ok` value, consuming the `self` value.

#### Parameters

##### msg

`string`

#### Returns

`T`

#### Throws

Panics if the value is an `Err`, with a panic message including the passed message, and the content of the `Err`.

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### expectErr()

> **expectErr**(`msg`): `E`

Defined in: [result.ts:215](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L215)

Returns the contained `Err` value, consuming the `self` value.

#### Parameters

##### msg

`string`

#### Returns

`E`

#### Throws

Panics if the value is an `Ok`, with a panic message including the passed message, and the content of the `Ok`.

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### flatten()

> **flatten**\<`U`, `F`\>(`this`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:314](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L314)

Converts from `Result<Result<T, E>, E>` to `Result<T, E>`.

#### Type Parameters

##### U

`U`

##### F

`F`

#### Parameters

##### this

[`Result`](../type-aliases/Result.md)\<[`Result`](../type-aliases/Result.md)\<`U`, `F`\>, `E`\>

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### inspect()

> **inspect**(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:162](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L162)

Calls a function with a reference to the contained value if `Ok`.

Returns the original result.

#### Parameters

##### f

(`val`) => `void`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### inspectAsync()

> **inspectAsync**(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [result.ts:169](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L169)

Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### inspectErr()

> **inspectErr**(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:178](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L178)

Calls a function with a reference to the contained value if `Err`.

Returns the original result.

#### Parameters

##### f

(`err`) => `void`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### inspectErrAsync()

> **inspectErrAsync**(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [result.ts:185](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L185)

Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.

#### Parameters

##### f

(`err`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### isErr()

> **isErr**(): `this is ErrResult<never, E>`

Defined in: [result.ts:71](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L71)

Returns `true` if the result is `Err`.

#### Returns

`this is ErrResult<never, E>`

***

### isErrAnd()

#### Call Signature

> **isErrAnd**\<`F`\>(`f`): `this is ErrResult<T, F>`

Defined in: [result.ts:78](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L78)

Returns `true` if the result is `Err` and the value inside of it matches a predicate.

##### Type Parameters

###### F

`F`

##### Parameters

###### f

(`err`) => `err is F`

##### Returns

`this is ErrResult<T, F>`

##### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

#### Call Signature

> **isErrAnd**(`f`): `this is ErrResult<T, E>`

Defined in: [result.ts:79](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L79)

##### Parameters

###### f

(`err`) => `boolean`

##### Returns

`this is ErrResult<T, E>`

***

### isOk()

> **isOk**(): `this is OkResult<T, never>`

Defined in: [result.ts:58](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L58)

Returns `true` if the result is `Ok`.

#### Returns

`this is OkResult<T, never>`

***

### isOkAnd()

#### Call Signature

> **isOkAnd**\<`U`\>(`f`): `this is OkResult<U, E>`

Defined in: [result.ts:65](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L65)

Returns `true` if the result is `Ok` and the value inside of it matches a predicate.

##### Type Parameters

###### U

`U`

##### Parameters

###### f

(`val`) => `val is U`

##### Returns

`this is OkResult<U, E>`

##### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

#### Call Signature

> **isOkAnd**(`f`): `this is OkResult<T, E>`

Defined in: [result.ts:66](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L66)

##### Parameters

###### f

(`val`) => `boolean`

##### Returns

`this is OkResult<T, E>`

***

### iter()

> **iter**(): `Iterable`\<`T`\>

Defined in: [result.ts:192](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L192)

Returns an iterator over the possibly contained value.

The iterator yields one value if the result is `Ok`, otherwise none.

#### Returns

`Iterable`\<`T`\>

***

### map()

> **map**\<`U`\>(`f`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [result.ts:102](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L102)

Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.

This function can be used to compose the results of two functions.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapAsync()

> **mapAsync**\<`U`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`U`, `E`\>

Defined in: [result.ts:109](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L109)

Async version of `map`. Maps a `Result<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`U`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapErr()

> **mapErr**\<`F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [result.ts:146](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L146)

Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.

This function can be used to pass through a successful result while handling an error.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapErrAsync()

> **mapErrAsync**\<`F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `F`\>

Defined in: [result.ts:153](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L153)

Async version of `mapErr`. Maps a `Result<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`F`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapOr()

> **mapOr**\<`U`\>(`fallback`, `f`): `U`

Defined in: [result.ts:118](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L118)

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapOrElse()

> **mapOrElse**\<`U`\>(`fallbackFn`, `f`): `U`

Defined in: [result.ts:127](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L127)

Maps a `Result<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`fallbackFn`, `f`): `Promise`\<`U`\>

Defined in: [result.ts:134](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L134)

Async version of `mapOrElse`. Maps a `Result<T, E>` to `Promise<U>` by applying async fallback function `fallbackFn` to a contained `Err` value, or async function `f` to a contained `Ok` value.

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

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### match()

> **match**\<`U`\>(`handlers`): `U`

Defined in: [result.ts:331](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L331)

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### ok()

> **ok**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [result.ts:86](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L86)

Converts from `Result<T, E>` to `Option<T>`.

Returns `Some` for `Ok` and `None` for `Err`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### or()

#### Call Signature

> **or**\<`T2`, `F`\>(`res`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:262](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L262)

Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.

Arguments passed to `or` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.

##### Type Parameters

###### T2

`T2`

###### F

`F`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

##### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

#### Call Signature

> **or**\<`T2`, `F`\>(`res`): [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:263](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L263)

##### Type Parameters

###### T2

`T2`

###### F

`F`

##### Parameters

###### res

`PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>\>

##### Returns

[`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

#### Call Signature

> **or**\<`T2`, `F`\>(`res`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\> \| [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:264](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L264)

##### Type Parameters

###### T2

`T2`

###### F

`F`

##### Parameters

###### res

[`Result`](../type-aliases/Result.md)\<`T2`, `F`\> \| `PromiseLike`\<[`Result`](../type-aliases/Result.md)\<`T2`, `F`\>\>

##### Returns

[`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\> \| [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

***

### orElse()

> **orElse**\<`T2`, `F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:275](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L275)

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

[`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### orElseAsync()

> **orElseAsync**\<`T2`, `F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:282](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L282)

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

[`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### toString()

> **toString**(): `string`

Defined in: [result.ts:53](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L53)

#### Returns

`string`

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`Option`](../type-aliases/Option.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [result.ts:324](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L324)

Transposes a `Result` of an `Option` into an `Option` of a `Result`.

`Ok(None)` will be mapped to `None`. `Ok(Some(_))` and `Err(_)` will be mapped to
`Some(Ok(_))` and `Some(Err(_))`.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### this

[`Result`](../type-aliases/Result.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### unwrap()

> **unwrap**(): `T`

Defined in: [result.ts:207](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L207)

Returns the contained `Ok` value, consuming the `self` value.

#### Returns

`T`

#### Throws

Panics if the value is an `Err`, with a panic message provided by the `Err`'s value.

***

### unwrapErr()

> **unwrapErr**(): `E`

Defined in: [result.ts:222](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L222)

Returns the contained `Err` value, consuming the `self` value.

#### Returns

`E`

#### Throws

Panics if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.

***

### unwrapOr()

> **unwrapOr**\<`T2`\>(`fallback`): `T` \| `T2`

Defined in: [result.ts:293](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L293)

Returns the contained `Ok` value or a provided default.

Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### fallback

`T2`

#### Returns

`T` \| `T2`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### unwrapOrElse()

> **unwrapOrElse**\<`T2`\>(`f`): `T` \| `T2`

Defined in: [result.ts:300](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L300)

Returns the contained `Ok` value or computes it from a closure.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `T2`

#### Returns

`T` \| `T2`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T2`\>(`f`): `Promise`\<`T` \| `T2`\>

Defined in: [result.ts:307](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/result.ts#L307)

Async version of `unwrapOrElse`. Returns the contained `Ok` value or computes it from an async closure.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`T2`\>

#### Returns

`Promise`\<`T` \| `T2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
