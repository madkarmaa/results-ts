[**results-ts**](../index.md)

***

[results-ts](../index.md) / AsyncOption

# Interface: AsyncOption\<T\>

Defined in: [async-option.ts:21](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L21)

An async wrapper around `Option<T>` that is `PromiseLike` (so it's awaitable)
but also carries all chainable `Option` methods.

`and`, `or`, `xor`, and `zip` accept sync or promise-like operands. Async
operands resolve concurrently with the receiver; either rejection propagates.

**Intentionally omitted mutation methods:** `insert`, `getOrInsert`, `getOrInsertWith`,
`getOrInsertWithAsync`, `take`, `takeIf`, and `replace` are not available on `AsyncOption`.
These methods mutate the `Option` in-place, which is not meaningful on a pending async value -
the underlying `Option` doesn't exist yet. Use `await` to resolve first, then mutate.

**Error behavior in async context:** Methods that throw synchronously on `Option`
(e.g. `unwrap` on `None`, `flatten` on non-nested) will produce a rejected `Promise`.

## Extends

- `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

## Type Parameters

### T

`T`

## Methods

### and()

> **and**\<`U`\>(`optb`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:129](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L129)

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

Defined in: [async-option.ts:134](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L134)

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

Defined in: [async-option.ts:139](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L139)

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

Defined in: [async-option.ts:47](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L47)

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

Defined in: [async-option.ts:146](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L146)

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

Defined in: [async-option.ts:153](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L153)

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

Defined in: [async-option.ts:181](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L181)

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

Defined in: [async-option.ts:86](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L86)

Calls the provided closure with a reference to the contained value (if `Some`).

Returns the original option.

#### Parameters

##### f

(`val`) => `void`

#### Returns

`AsyncOption`\<`T`\>

***

### inspectAsync()

> **inspectAsync**(`f`): `AsyncOption`\<`T`\>

Defined in: [async-option.ts:91](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L91)

Async version of `inspect`. Calls the provided async closure with a reference to the contained value (if `Some`), then returns the original option.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncOption`\<`T`\>

***

### isNone()

> **isNone**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:35](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L35)

Returns a `Promise` that resolves to `true` if the option is a `None` value.

#### Returns

`Promise`\<`boolean`\>

***

### isNoneOr()

> **isNoneOr**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:40](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L40)

Returns a `Promise` that resolves to `true` if the option is a `None` or the value inside matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### isSome()

> **isSome**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:25](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L25)

Returns a `Promise` that resolves to `true` if the option is a `Some` value.

#### Returns

`Promise`\<`boolean`\>

***

### isSomeAnd()

> **isSomeAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:30](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L30)

Returns a `Promise` that resolves to `true` if the option is a `Some` and the value inside matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### map()

> **map**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:74](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L74)

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

Defined in: [async-option.ts:79](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L79)

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

Defined in: [async-option.ts:96](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L96)

Returns the provided default result (if none), or applies a function to the contained value (if any).

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

Defined in: [async-option.ts:101](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L101)

Computes a default function result (if none), or applies a different function to the contained value (if any).

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

Defined in: [async-option.ts:106](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L106)

Async version of `mapOrElse`. Computes a default async function result (if none), or applies a different async function to the contained value (if any).

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

Defined in: [async-option.ts:209](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L209)

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

Defined in: [async-option.ts:114](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L114)

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

Defined in: [async-option.ts:119](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L119)

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

Defined in: [async-option.ts:124](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L124)

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

Defined in: [async-option.ts:158](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L158)

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

Defined in: [async-option.ts:163](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L163)

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

Defined in: [async-option.ts:168](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L168)

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

Defined in: [async-option.ts:189](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L189)

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

Defined in: [async-option.ts:54](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L54)

Returns the contained `Some` value.

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the self value equals `None`.

***

### unwrapOr()

> **unwrapOr**(`defaultVal`): `Promise`\<`T`\>

Defined in: [async-option.ts:59](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L59)

Returns the contained `Some` value or a provided default.

#### Parameters

##### defaultVal

`T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElse()

> **unwrapOrElse**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:64](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L64)

Returns the contained `Some` value or computes it from a closure.

#### Parameters

##### f

() => `T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:69](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L69)

Async version of `unwrapOrElse`. Returns the contained `Some` value or computes it from an async closure.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

***

### unzip()

> **unzip**\<`T`, `U`\>(`this`): \[`AsyncOption`\<`T`\>, `AsyncOption`\<`U`\>\]

Defined in: [async-option.ts:204](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L204)

Unzips an `AsyncOption` containing a tuple of two values.

If `self` resolves to `Some((a, b))` this method returns `(AsyncOption(a), AsyncOption(b))`.
Otherwise, `(AsyncOption(None), AsyncOption(None))` is returned.

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

Defined in: [async-option.ts:173](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L173)

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

Defined in: [async-option.ts:196](https://github.com/madkarmaa/results-ts/blob/393ae2e7eb528eeed347cd9afb2844d3d0448a13/src/async-option.ts#L196)

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
