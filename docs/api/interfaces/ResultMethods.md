[**results-ts**](../index.md)

***

[results-ts](../index.md) / ResultMethods

# Interface: ResultMethods\<T, E\>

Defined in: [result.ts:46](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L46)

## Type Parameters

### T

`T`

### E

`E`

## Methods

### and()

> **and**\<`U`, `E2`\>(`res`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:225](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L225)

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

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### andThen()

> **andThen**\<`U`, `F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:234](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L234)

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

Defined in: [result.ts:241](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L241)

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

Defined in: [result.ts:87](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L87)

Converts from `Result<T, E>` to `Option<E>`.

Returns `Some` for `Err` and `None` for `Ok`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`E`\>

***

### expect()

> **expect**(`msg`): `T`

Defined in: [result.ts:194](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L194)

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

Defined in: [result.ts:209](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L209)

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

Defined in: [result.ts:300](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L300)

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

Defined in: [result.ts:156](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L156)

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

Defined in: [result.ts:163](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L163)

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

Defined in: [result.ts:172](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L172)

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

Defined in: [result.ts:179](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L179)

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

Defined in: [result.ts:65](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L65)

Returns `true` if the result is `Err`.

#### Returns

`this is ErrResult<never, E>`

***

### isErrAnd()

#### Call Signature

> **isErrAnd**\<`F`\>(`f`): `this is ErrResult<T, F>`

Defined in: [result.ts:72](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L72)

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

Defined in: [result.ts:73](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L73)

##### Parameters

###### f

(`err`) => `boolean`

##### Returns

`this is ErrResult<T, E>`

***

### isOk()

> **isOk**(): `this is OkResult<T, never>`

Defined in: [result.ts:52](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L52)

Returns `true` if the result is `Ok`.

#### Returns

`this is OkResult<T, never>`

***

### isOkAnd()

#### Call Signature

> **isOkAnd**\<`U`\>(`f`): `this is OkResult<U, E>`

Defined in: [result.ts:59](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L59)

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

Defined in: [result.ts:60](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L60)

##### Parameters

###### f

(`val`) => `boolean`

##### Returns

`this is OkResult<T, E>`

***

### iter()

> **iter**(): `Iterable`\<`T`\>

Defined in: [result.ts:186](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L186)

Returns an iterator over the possibly contained value.

The iterator yields one value if the result is `Ok`, otherwise none.

#### Returns

`Iterable`\<`T`\>

***

### map()

> **map**\<`U`\>(`f`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [result.ts:96](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L96)

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

Defined in: [result.ts:103](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L103)

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

Defined in: [result.ts:140](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L140)

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

Defined in: [result.ts:147](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L147)

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

Defined in: [result.ts:112](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L112)

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

Defined in: [result.ts:121](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L121)

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

Defined in: [result.ts:128](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L128)

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

Defined in: [result.ts:317](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L317)

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

Defined in: [result.ts:80](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L80)

Converts from `Result<T, E>` to `Option<T>`.

Returns `Some` for `Ok` and `None` for `Err`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### or()

> **or**\<`T2`, `F`\>(`res`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:252](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L252)

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

[`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

***

### orElse()

> **orElse**\<`T2`, `F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:261](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L261)

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

Defined in: [result.ts:268](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L268)

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

Defined in: [result.ts:47](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L47)

#### Returns

`string`

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`Option`](../type-aliases/Option.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [result.ts:310](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L310)

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

Defined in: [result.ts:201](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L201)

Returns the contained `Ok` value, consuming the `self` value.

#### Returns

`T`

#### Throws

Panics if the value is an `Err`, with a panic message provided by the `Err`'s value.

***

### unwrapErr()

> **unwrapErr**(): `E`

Defined in: [result.ts:216](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L216)

Returns the contained `Err` value, consuming the `self` value.

#### Returns

`E`

#### Throws

Panics if the value is an `Ok`, with a custom panic message provided by the `Ok`'s value.

***

### unwrapOr()

> **unwrapOr**\<`T2`\>(`fallback`): `T` \| `T2`

Defined in: [result.ts:279](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L279)

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

Defined in: [result.ts:286](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L286)

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

Defined in: [result.ts:293](https://github.com/madkarmaa/results-ts/blob/9bc2a1fbb0ca214c2fd725d9617029e74bc7fed1/src/result.ts#L293)

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
