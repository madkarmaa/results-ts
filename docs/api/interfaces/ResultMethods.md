[**results-ts**](../index.md)

***

[results-ts](../index.md) / ResultMethods

# Interface: ResultMethods\<T, E\>

Defined in: [result.ts:51](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L51)

## Type Parameters

### T

`T`

### E

`E`

## Methods

### and()

#### Call Signature

> **and**\<`U`, `E2`\>(`res`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:194](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L194)

Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.

JavaScript evaluates the operand before the call. Use `andThen` to compute it only on `Ok`.

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

#### Call Signature

> **and**\<`U`, `E2`\>(`res`): [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `E2`\>

Defined in: [result.ts:195](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L195)

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

Defined in: [result.ts:196](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L196)

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

Defined in: [result.ts:203](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L203)

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

[`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

***

### andThenAsync()

> **andThenAsync**\<`U`, `F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:208](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L208)

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

***

### err()

> **err**(): [`Option`](../type-aliases/Option.md)\<`E`\>

Defined in: [result.ts:88](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L88)

Converts from `Result<T, E>` to `Option<E>`.

Returns `Some` for `Err` and `None` for `Ok`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`E`\>

***

### expect()

> **expect**(`msg`): `T`

Defined in: [result.ts:166](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L166)

Returns the contained `Ok` value.

#### Parameters

##### msg

`string`

#### Returns

`T`

#### Throws

`PanicError` with `msg` and the error value on `Err`.

***

### expectErr()

> **expectErr**(`msg`): `E`

Defined in: [result.ts:180](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L180)

Returns the contained `Err` value.

#### Parameters

##### msg

`string`

#### Returns

`E`

#### Throws

`PanicError` with `msg` and the success value on `Ok`.

***

### flatten()

> **flatten**\<`U`, `F`\>(`this`): [`Result`](../type-aliases/Result.md)\<`U`, `E` \| `F`\>

Defined in: [result.ts:257](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L257)

Unwraps one nested `Result`. The return type includes both error types.

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

`FlattenError` if an `Ok` value is not a `Result`.

***

### inspect()

> **inspect**(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:135](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L135)

Calls a function with a reference to the contained value if `Ok`.

Returns the original result.

#### Parameters

##### f

(`val`) => `void`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

***

### inspectAsync()

> **inspectAsync**(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [result.ts:140](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L140)

Async version of `inspect`. Calls an async function with a reference to the contained value if `Ok`, then returns the original result.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

***

### inspectErr()

> **inspectErr**(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [result.ts:147](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L147)

Calls a function with a reference to the contained value if `Err`.

Returns the original result.

#### Parameters

##### f

(`err`) => `void`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

***

### inspectErrAsync()

> **inspectErrAsync**(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [result.ts:152](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L152)

Async version of `inspectErr`. Calls an async function with a reference to the contained value if `Err`, then returns the original result.

#### Parameters

##### f

(`err`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

***

### isErr()

> **isErr**(): `this is ErrResult<never, E>`

Defined in: [result.ts:68](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L68)

Returns `true` if the result is `Err`.

#### Returns

`this is ErrResult<never, E>`

***

### isErrAnd()

#### Call Signature

> **isErrAnd**\<`F`\>(`f`): `this is ErrResult<T, F>`

Defined in: [result.ts:73](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L73)

Returns `true` if the result is `Err` and its value matches the predicate.

##### Type Parameters

###### F

`F`

##### Parameters

###### f

(`err`) => `err is F`

##### Returns

`this is ErrResult<T, F>`

#### Call Signature

> **isErrAnd**(`f`): `this is ErrResult<T, E>`

Defined in: [result.ts:74](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L74)

##### Parameters

###### f

(`err`) => `boolean`

##### Returns

`this is ErrResult<T, E>`

***

### isOk()

> **isOk**(): `this is OkResult<T, never>`

Defined in: [result.ts:57](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L57)

Returns `true` if the result is `Ok`.

#### Returns

`this is OkResult<T, never>`

***

### isOkAnd()

#### Call Signature

> **isOkAnd**\<`U`\>(`f`): `this is OkResult<U, E>`

Defined in: [result.ts:62](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L62)

Returns `true` if the result is `Ok` and its value matches the predicate.

##### Type Parameters

###### U

`U`

##### Parameters

###### f

(`val`) => `val is U`

##### Returns

`this is OkResult<U, E>`

#### Call Signature

> **isOkAnd**(`f`): `this is OkResult<T, E>`

Defined in: [result.ts:63](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L63)

##### Parameters

###### f

(`val`) => `boolean`

##### Returns

`this is OkResult<T, E>`

***

### iter()

> **iter**(): `Iterable`\<`T`\>

Defined in: [result.ts:159](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L159)

Returns an iterator over the contained value, or an empty iterator if absent.

The iterator yields one value if the result is `Ok`, otherwise none.

#### Returns

`Iterable`\<`T`\>

***

### map()

> **map**\<`U`\>(`f`): [`Result`](../type-aliases/Result.md)\<`U`, `E`\>

Defined in: [result.ts:93](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L93)

Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value untouched.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### mapAsync()

> **mapAsync**\<`U`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`U`, `E`\>

Defined in: [result.ts:98](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L98)

Async version of `map`. Maps a `Result<T, E>` to `AsyncResult<U, E>` by applying an async function to a contained `Ok` value, leaving an `Err` value untouched.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`U`, `E`\>

***

### mapErr()

> **mapErr**\<`F`\>(`f`): [`Result`](../type-aliases/Result.md)\<`T`, `F`\>

Defined in: [result.ts:123](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L123)

Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `F`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

***

### mapErrAsync()

> **mapErrAsync**\<`F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`T`, `F`\>

Defined in: [result.ts:128](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L128)

Async version of `mapErr`. Maps a `Result<T, E>` to `AsyncResult<T, F>` by applying an async function to a contained `Err` value, leaving an `Ok` value untouched.

#### Type Parameters

##### F

`F`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`F`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `F`\>

***

### mapOr()

> **mapOr**\<`U`\>(`fallback`, `f`): `U`

Defined in: [result.ts:105](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L105)

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

`U`

***

### mapOrElse()

> **mapOrElse**\<`U`\>(`fallbackFn`, `f`): `U`

Defined in: [result.ts:110](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L110)

Maps a `Result<T, E>` to `U` by applying fallback function `fallbackFn` to a contained `Err` value, or function `f` to a contained `Ok` value.

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

***

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`fallbackFn`, `f`): `Promise`\<`U`\>

Defined in: [result.ts:115](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L115)

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

***

### match()

> **match**\<`U`\>(`handlers`): `U`

Defined in: [result.ts:272](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L272)

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

***

### ok()

> **ok**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [result.ts:81](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L81)

Converts from `Result<T, E>` to `Option<T>`.

Returns `Some` for `Ok` and `None` for `Err`.

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### or()

#### Call Signature

> **or**\<`T2`, `F`\>(`res`): [`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:217](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L217)

Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.

JavaScript evaluates the operand before the call. Use `orElse` to compute it only on `Err`.

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

#### Call Signature

> **or**\<`T2`, `F`\>(`res`): [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:218](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L218)

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

Defined in: [result.ts:219](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L219)

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

Defined in: [result.ts:226](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L226)

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

[`Result`](../type-aliases/Result.md)\<`T` \| `T2`, `F`\>

***

### orElseAsync()

> **orElseAsync**\<`T2`, `F`\>(`f`): [`AsyncResult`](AsyncResult.md)\<`T` \| `T2`, `F`\>

Defined in: [result.ts:231](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L231)

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

***

### toString()

> **toString**(): `string`

Defined in: [result.ts:52](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L52)

#### Returns

`string`

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`Option`](../type-aliases/Option.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

Defined in: [result.ts:267](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L267)

Transposes a `Result` of an `Option` into an `Option` of a `Result`.

Converts `Ok(None)` to `None`, `Ok(Some(value))` to `Some(Ok(value))`,
and `Err(error)` to `Some(Err(error))`.

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

`TransposeError` if an `Ok` value is not an `Option`.

***

### unwrap()

> **unwrap**(): `T`

Defined in: [result.ts:173](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L173)

Returns the contained `Ok` value.

#### Returns

`T`

#### Throws

`PanicError` with the error value on `Err`.

***

### unwrapErr()

> **unwrapErr**(): `E`

Defined in: [result.ts:187](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L187)

Returns the contained `Err` value.

#### Returns

`E`

#### Throws

`PanicError` with the success value on `Ok`.

***

### unwrapOr()

> **unwrapOr**\<`T2`\>(`fallback`): `T` \| `T2`

Defined in: [result.ts:240](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L240)

Returns the contained `Ok` value or a provided default.

JavaScript evaluates the fallback before the call. Use `unwrapOrElse` to compute it only on `Err`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### fallback

`T2`

#### Returns

`T` \| `T2`

***

### unwrapOrElse()

> **unwrapOrElse**\<`T2`\>(`f`): `T` \| `T2`

Defined in: [result.ts:245](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L245)

Returns the contained `Ok` value, or calls `f` with the error.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `T2`

#### Returns

`T` \| `T2`

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**\<`T2`\>(`f`): `Promise`\<`T` \| `T2`\>

Defined in: [result.ts:250](https://github.com/madkarmaa/results-ts/blob/c58f1a23b90448049621e08e35753ac39e638895/src/result.ts#L250)

Returns the `Ok` value, or awaits `f` with the error.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

(`err`) => `PromiseLike`\<`T2`\>

#### Returns

`Promise`\<`T` \| `T2`\>
