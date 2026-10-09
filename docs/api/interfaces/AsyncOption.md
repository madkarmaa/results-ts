[**results-ts**](../index.md)

***

[results-ts](../index.md) / AsyncOption

# Interface: AsyncOption\<T\>

Defined in: [async-option.ts:19](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L19)

An awaitable wrapper around `Option<T>` with chainable methods.

`and`, `or`, `xor`, and `zip` accept sync or promise-like operands. Async
operands resolve concurrently with the receiver. Either rejection propagates.

`AsyncOption` omits `insert`, `getOrInsert`, `getOrInsertWith`,
`getOrInsertWithAsync`, `take`, `takeIf`, and `replace`.
Await the wrapper to get an `Option`, then call its mutation methods.

Methods that throw on `Option` reject on `AsyncOption`.
For example, `unwrap` rejects on `None`, and `flatten` rejects a non-nested value.

## Extends

- `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

## Type Parameters

### T

`T`

## Methods

### and()

> **and**\<`U`\>(`optb`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:127](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L127)

Returns `None` if the option is `None`, otherwise returns `optb`.

#### Type Parameters

##### U

`U`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`U`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

`AsyncOption`\<`U`\>

***

### andThen()

> **andThen**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:132](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L132)

Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => [`Option`](../type-aliases/Option.md)\<`U`\>

#### Returns

`AsyncOption`\<`U`\>

***

### andThenAsync()

> **andThenAsync**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:137](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L137)

Async version of `andThen`. Returns `None` if the option is `None`, otherwise calls async `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

`AsyncOption`\<`U`\>

***

### expect()

> **expect**(`msg`): `Promise`\<`T`\>

Defined in: [async-option.ts:45](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L45)

Returns the contained `Some` value.

#### Parameters

##### msg

`string`

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the value is a `None` with a custom panic message provided by `msg`.

***

### filter()

> **filter**(`predicate`): `AsyncOption`\<`T`\>

Defined in: [async-option.ts:144](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L144)

Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
- `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
- `None` if `predicate` returns `false`.

#### Parameters

##### predicate

(`val`) => `boolean`

#### Returns

`AsyncOption`\<`T`\>

***

### filterAsync()

> **filterAsync**(`predicate`): `AsyncOption`\<`T`\>

Defined in: [async-option.ts:151](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L151)

Async version of `filter`. Returns `None` if the option is `None`, otherwise calls async `predicate` with the wrapped value and returns:
- `Some(t)` if `predicate` resolves to `true` (where `t` is the wrapped value), and
- `None` if `predicate` resolves to `false`.

#### Parameters

##### predicate

(`val`) => `PromiseLike`\<`boolean`\>

#### Returns

`AsyncOption`\<`T`\>

***

### flatten()

> **flatten**\<`U`\>(`this`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:179](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L179)

Converts from `AsyncOption<Option<T>>` to `AsyncOption<T>`.

**Async note:** If the inner value is not an `Option`, this produces a rejected `Promise`
with `FlattenError` rather than a synchronous throw.

#### Type Parameters

##### U

`U`

#### Parameters

##### this

`AsyncOption`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

`AsyncOption`\<`U`\>

***

### inspect()

> **inspect**(`f`): `AsyncOption`\<`T`\>

Defined in: [async-option.ts:84](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L84)

Calls `f` with the `Some` value and returns the original option.

Returns the original option.

#### Parameters

##### f

(`val`) => `void`

#### Returns

`AsyncOption`\<`T`\>

***

### inspectAsync()

> **inspectAsync**(`f`): `AsyncOption`\<`T`\>

Defined in: [async-option.ts:89](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L89)

Awaits `f` with the `Some` value and returns the original option.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncOption`\<`T`\>

***

### isNone()

> **isNone**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:33](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L33)

Returns a `Promise` that resolves to `true` if the option is a `None` value.

#### Returns

`Promise`\<`boolean`\>

***

### isNoneOr()

> **isNoneOr**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:38](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L38)

Returns a `Promise` that resolves to `true` if the option is a `None` or its value matches the predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### isSome()

> **isSome**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:23](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L23)

Returns a `Promise` that resolves to `true` if the option is a `Some` value.

#### Returns

`Promise`\<`boolean`\>

***

### isSomeAnd()

> **isSomeAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:28](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L28)

Returns a `Promise` that resolves to `true` if the option is a `Some` and its value matches the predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### map()

> **map**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:72](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L72)

Maps an `AsyncOption<T>` to `AsyncOption<U>` by applying a function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

`AsyncOption`\<`U`\>

***

### mapAsync()

> **mapAsync**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:77](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L77)

Async version of `map`. Maps an `AsyncOption<T>` to `AsyncOption<U>` by applying an async function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

`AsyncOption`\<`U`\>

***

### mapOr()

> **mapOr**\<`U`\>(`defaultVal`, `f`): `Promise`\<`U`\>

Defined in: [async-option.ts:94](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L94)

Returns the fallback on `None`, or calls `f` with the `Some` value.

#### Type Parameters

##### U

`U`

#### Parameters

##### defaultVal

`U`

##### f

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### mapOrElse()

> **mapOrElse**\<`U`\>(`defaultF`, `f`): `Promise`\<`U`\>

Defined in: [async-option.ts:99](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L99)

Calls `defaultF` on `None`, or calls `f` with the `Some` value.

#### Type Parameters

##### U

`U`

#### Parameters

##### defaultF

() => `U`

##### f

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`defaultF`, `f`): `Promise`\<`U`\>

Defined in: [async-option.ts:104](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L104)

Awaits `defaultF` on `None`, or awaits `f` with the `Some` value.

#### Type Parameters

##### U

`U`

#### Parameters

##### defaultF

() => `PromiseLike`\<`U`\>

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

`Promise`\<`U`\>

***

### match()

> **match**\<`U`\>(`handlers`): `Promise`\<`U`\>

Defined in: [async-option.ts:207](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L207)

Matches the `Option` with two functions, one for each variant.

#### Type Parameters

##### U

`U`

#### Parameters

##### handlers

###### None

() => `U`

###### Some

(`val`) => `U`

#### Returns

`Promise`\<`U`\>

***

### okOr()

> **okOr**\<`E`\>(`err`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [async-option.ts:112](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L112)

Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.

#### Type Parameters

##### E

`E`

#### Parameters

##### err

`E`

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

***

### okOrElse()

> **okOrElse**\<`E`\>(`errF`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [async-option.ts:117](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L117)

Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.

#### Type Parameters

##### E

`E`

#### Parameters

##### errF

() => `E`

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

***

### okOrElseAsync()

> **okOrElseAsync**\<`E`\>(`errF`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [async-option.ts:122](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L122)

Async version of `okOrElse`. Transforms the `AsyncOption<T>` into an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(await errF())`.

#### Type Parameters

##### E

`E`

#### Parameters

##### errF

() => `PromiseLike`\<`E`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

***

### or()

> **or**\<`T2`\>(`optb`): `AsyncOption`\<`T` \| `T2`\>

Defined in: [async-option.ts:156](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L156)

Returns the option if it contains a value, otherwise returns `optb`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>

***

### orElse()

> **orElse**\<`T2`\>(`f`): `AsyncOption`\<`T` \| `T2`\>

Defined in: [async-option.ts:161](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L161)

Returns the option if it contains a value, otherwise calls `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => [`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>

***

### orElseAsync()

> **orElseAsync**\<`T2`\>(`f`): `AsyncOption`\<`T` \| `T2`\>

Defined in: [async-option.ts:166](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L166)

Async version of `orElse`. Returns the option if it contains a value, otherwise calls async `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`AsyncResult`](AsyncResult.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

Defined in: [async-option.ts:187](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L187)

Transposes an `AsyncOption` of a `Result` into an `AsyncResult` of an `Option`.

**Async note:** If the inner value is not a `Result`, this produces a rejected `Promise`
with `TransposeError` rather than a synchronous throw.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### this

`AsyncOption`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

***

### unwrap()

> **unwrap**(): `Promise`\<`T`\>

Defined in: [async-option.ts:52](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L52)

Returns the contained `Some` value.

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the self value equals `None`.

***

### unwrapOr()

> **unwrapOr**(`defaultVal`): `Promise`\<`T`\>

Defined in: [async-option.ts:57](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L57)

Returns the contained `Some` value or a provided default.

#### Parameters

##### defaultVal

`T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElse()

> **unwrapOrElse**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:62](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L62)

Returns the contained `Some` value, or calls `f` on `None`.

#### Parameters

##### f

() => `T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:67](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L67)

Returns the `Some` value, or awaits `f` on `None`.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

***

### unzip()

> **unzip**\<`T`, `U`\>(`this`): \[`AsyncOption`\<`T`\>, `AsyncOption`\<`U`\>\]

Defined in: [async-option.ts:202](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L202)

Unzips an `AsyncOption` containing a tuple of two values.

Returns two async options. They resolve to `Some(a)` and `Some(b)` for
`Some([a, b])`, or both resolve to `None` for `None`.

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### this

`AsyncOption`\<\[`T`, `U`\]\>

#### Returns

\[`AsyncOption`\<`T`\>, `AsyncOption`\<`U`\>\]

***

### xor()

> **xor**\<`T2`\>(`optb`): `AsyncOption`\<`T` \| `T2`\>

Defined in: [async-option.ts:171](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L171)

Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>

***

### zip()

> **zip**\<`U`\>(`other`): `AsyncOption`\<\[`T`, `U`\]\>

Defined in: [async-option.ts:194](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/async-option.ts#L194)

Combines the resolved option with another option into a tuple of their values.

Resolves to `Some([a, b])` if both options are `Some`, otherwise resolves to `None`.

#### Type Parameters

##### U

`U`

#### Parameters

##### other

[`Option`](../type-aliases/Option.md)\<`U`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

`AsyncOption`\<\[`T`, `U`\]\>
