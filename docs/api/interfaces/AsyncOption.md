[**results-ts**](../index.md)

***

[results-ts](../index.md) / AsyncOption

# Interface: AsyncOption\<T\>

Defined in: [async-option.ts:17](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L17)

An async wrapper around `Option<T>` that is `PromiseLike` (so it's awaitable)
but also carries all chainable `Option` methods.

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

Defined in: [async-option.ts:125](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L125)

Returns `None` if the option is `None`, otherwise returns `optb`.

#### Type Parameters

##### U

`U`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Returns

`AsyncOption`\<`U`\>

***

### andThen()

> **andThen**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:130](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L130)

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

Defined in: [async-option.ts:135](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L135)

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

Defined in: [async-option.ts:43](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L43)

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

Defined in: [async-option.ts:142](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L142)

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

Defined in: [async-option.ts:149](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L149)

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

Defined in: [async-option.ts:177](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L177)

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

Defined in: [async-option.ts:82](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L82)

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

Defined in: [async-option.ts:87](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L87)

Async version of `inspect`. Calls the provided async closure with a reference to the contained value (if `Some`), then returns the original option.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

`AsyncOption`\<`T`\>

***

### isNone()

> **isNone**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:31](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L31)

Returns a `Promise` that resolves to `true` if the option is a `None` value.

#### Returns

`Promise`\<`boolean`\>

***

### isNoneOr()

> **isNoneOr**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:36](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L36)

Returns a `Promise` that resolves to `true` if the option is a `None` or the value inside matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### isSome()

> **isSome**(): `Promise`\<`boolean`\>

Defined in: [async-option.ts:21](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L21)

Returns a `Promise` that resolves to `true` if the option is a `Some` value.

#### Returns

`Promise`\<`boolean`\>

***

### isSomeAnd()

> **isSomeAnd**(`f`): `Promise`\<`boolean`\>

Defined in: [async-option.ts:26](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L26)

Returns a `Promise` that resolves to `true` if the option is a `Some` and the value inside matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`Promise`\<`boolean`\>

***

### map()

> **map**\<`U`\>(`f`): `AsyncOption`\<`U`\>

Defined in: [async-option.ts:70](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L70)

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

Defined in: [async-option.ts:75](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L75)

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

Defined in: [async-option.ts:92](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L92)

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

Defined in: [async-option.ts:97](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L97)

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

Defined in: [async-option.ts:102](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L102)

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

Defined in: [async-option.ts:198](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L198)

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

Defined in: [async-option.ts:110](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L110)

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

Defined in: [async-option.ts:115](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L115)

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

Defined in: [async-option.ts:120](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L120)

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

Defined in: [async-option.ts:154](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L154)

Returns the option if it contains a value, otherwise returns `optb`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>

***

### orElse()

> **orElse**\<`T2`\>(`f`): `AsyncOption`\<`T` \| `T2`\>

Defined in: [async-option.ts:159](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L159)

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

Defined in: [async-option.ts:164](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L164)

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

Defined in: [async-option.ts:185](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L185)

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

Defined in: [async-option.ts:50](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L50)

Returns the contained `Some` value.

#### Returns

`Promise`\<`T`\>

#### Throws

Rejects with `PanicError` if the self value equals `None`.

***

### unwrapOr()

> **unwrapOr**(`defaultVal`): `Promise`\<`T`\>

Defined in: [async-option.ts:55](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L55)

Returns the contained `Some` value or a provided default.

#### Parameters

##### defaultVal

`T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElse()

> **unwrapOrElse**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:60](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L60)

Returns the contained `Some` value or computes it from a closure.

#### Parameters

##### f

() => `T`

#### Returns

`Promise`\<`T`\>

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**(`f`): `Promise`\<`T`\>

Defined in: [async-option.ts:65](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L65)

Async version of `unwrapOrElse`. Returns the contained `Some` value or computes it from an async closure.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

***

### unzip()

> **unzip**\<`T`, `U`\>(`this`): \[`AsyncOption`\<`T`\>, `AsyncOption`\<`U`\>\]

Defined in: [async-option.ts:193](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L193)

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

Defined in: [async-option.ts:169](https://github.com/madkarmaa/results-ts/blob/69dbeda020c136d7f8bf05062654be6a9c550f2b/src/async-option.ts#L169)

Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

`AsyncOption`\<`T` \| `T2`\>
