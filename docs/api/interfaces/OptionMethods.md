[**results-ts**](../index.md)

---

[results-ts](../index.md) / OptionMethods

# Interface: OptionMethods\<T\>

Defined in: [option.ts:39](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L39)

## Type Parameters

### T

`T`

## Methods

### and()

> **and**\<`U`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:186](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L186)

Returns `None` if the option is `None`, otherwise returns `optb`.

#### Type Parameters

##### U

`U`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### andThen()

> **andThen**\<`U`\>(`f`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:193](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L193)

Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => [`Option`](../type-aliases/Option.md)\<`U`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### andThenAsync()

> **andThenAsync**\<`U`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:200](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L200)

Async version of `andThen`. Returns `None` if the option is `None`, otherwise calls async `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### expect()

> **expect**(`msg`): `T`

Defined in: [option.ts:73](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L73)

Returns the contained `Some` value.

#### Parameters

##### msg

`string`

#### Returns

`T`

#### Throws

Panics if the value is a `None` with a custom panic message provided by `msg`.

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### filter()

> **filter**(`predicate`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:209](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L209)

Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:

- `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
- `None` if `predicate` returns `false`.

#### Parameters

##### predicate

(`val`) => `boolean`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### filterAsync()

> **filterAsync**(`predicate`): [`AsyncOption`](AsyncOption.md)\<`T`\>

Defined in: [option.ts:218](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L218)

Async version of `filter`. Returns `None` if the option is `None`, otherwise calls async `predicate` with the wrapped value and returns:

- `Some(t)` if `predicate` resolves to `true` (where `t` is the wrapped value), and
- `None` if `predicate` resolves to `false`.

#### Parameters

##### predicate

(`val`) => `PromiseLike`\<`boolean`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### flatten()

> **flatten**\<`U`\>(`this`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:301](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L301)

Converts from `Option<Option<T>>` to `Option<T>`.

#### Type Parameters

##### U

`U`

#### Parameters

##### this

[`Option`](../type-aliases/Option.md)\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### getOrInsert()

> **getOrInsert**(`value`): `T`

Defined in: [option.ts:260](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L260)

Inserts `value` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### value

`T`

#### Returns

`T`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### getOrInsertWith()

> **getOrInsertWith**(`f`): `T`

Defined in: [option.ts:267](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L267)

Inserts a value computed from `f` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### f

() => `T`

#### Returns

`T`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### getOrInsertWithAsync()

> **getOrInsertWithAsync**(`f`): `Promise`\<`T`\>

Defined in: [option.ts:274](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L274)

Async version of `getOrInsertWith`. Inserts a value computed from async `f` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### insert()

> **insert**(`value`): `T`

Defined in: [option.ts:253](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L253)

Inserts `value` into the option, then returns a reference to it.

#### Parameters

##### value

`T`

#### Returns

`T`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### inspect()

> **inspect**(`f`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:122](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L122)

Calls the provided closure with a reference to the contained value (if `Some`).

#### Parameters

##### f

(`val`) => `void`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### inspectAsync()

> **inspectAsync**(`f`): [`AsyncOption`](AsyncOption.md)\<`T`\>

Defined in: [option.ts:129](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L129)

Async version of `inspect`. Calls the provided async closure with a reference to the contained value (if `Some`), then returns the original option.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### isNone()

> **isNone**(): `this is NoneOption<T>`

Defined in: [option.ts:58](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L58)

Returns `true` if the option is a `None` value.

#### Returns

`this is NoneOption<T>`

---

### isNoneOr()

> **isNoneOr**(`f`): `boolean`

Defined in: [option.ts:65](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L65)

Returns `true` if the option is a `None` or the value inside of it matches a predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`boolean`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### isSome()

> **isSome**(): `this is SomeOption<T>`

Defined in: [option.ts:45](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L45)

Returns `true` if the option is a `Some` value.

#### Returns

`this is SomeOption<T>`

---

### isSomeAnd()

#### Call Signature

> **isSomeAnd**\<`U`\>(`f`): `this is SomeOption<U>`

Defined in: [option.ts:52](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L52)

Returns `true` if the option is a `Some` and the value inside of it matches a predicate.

##### Type Parameters

###### U

`U`

##### Parameters

###### f

(`val`) => `val is U`

##### Returns

`this is SomeOption<U>`

##### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

#### Call Signature

> **isSomeAnd**(`f`): `this is SomeOption<T>`

Defined in: [option.ts:53](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L53)

##### Parameters

###### f

(`val`) => `boolean`

##### Returns

`this is SomeOption<T>`

---

### iter()

> **iter**(): `IterableIterator`\<`T`\>

Defined in: [option.ts:179](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L179)

Returns an iterator over the possibly contained value.

#### Returns

`IterableIterator`\<`T`\>

---

### map()

> **map**\<`U`\>(`f`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:108](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L108)

Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### mapAsync()

> **mapAsync**\<`U`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:115](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L115)

Async version of `map`. Maps an `Option<T>` to `AsyncOption<U>` by applying an async function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`U`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### mapOr()

> **mapOr**\<`U`\>(`defaultVal`, `f`): `U`

Defined in: [option.ts:136](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L136)

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### mapOrElse()

> **mapOrElse**\<`U`\>(`defaultF`, `f`): `U`

Defined in: [option.ts:143](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L143)

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`defaultF`, `f`): `Promise`\<`U`\>

Defined in: [option.ts:150](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L150)

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

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### match()

> **match**\<`U`\>(`handlers`): `U`

Defined in: [option.ts:328](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L328)

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

`U`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### okOr()

> **okOr**\<`E`\>(`err`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [option.ts:160](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L160)

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.

#### Type Parameters

##### E

`E`

#### Parameters

##### err

`E`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### okOrElse()

> **okOrElse**\<`E`\>(`errF`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [option.ts:167](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L167)

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.

#### Type Parameters

##### E

`E`

#### Parameters

##### errF

() => `E`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### okOrElseAsync()

> **okOrElseAsync**\<`E`\>(`errF`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [option.ts:174](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L174)

Async version of `okOrElse`. Transforms the `Option<T>` into a `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(await errF())`.

#### Type Parameters

##### E

`E`

#### Parameters

##### errF

() => `PromiseLike`\<`E`\>

#### Returns

[`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### or()

> **or**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:225](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L225)

Returns the option if it contains a value, otherwise returns `optb`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### orElse()

> **orElse**\<`T2`\>(`f`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:232](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L232)

Returns the option if it contains a value, otherwise calls `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => [`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### orElseAsync()

> **orElseAsync**\<`T2`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:239](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L239)

Async version of `orElse`. Returns the option if it contains a value, otherwise calls async `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### replace()

> **replace**(`value`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:294](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L294)

Replaces the actual value in the option by the value given in parameter, returning the old value if present,
leaving a `Some` in its place.

#### Parameters

##### value

`T`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### take()

> **take**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:279](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L279)

Takes the value out of the option, leaving a `None` in its place.

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

---

### takeIf()

> **takeIf**(`predicate`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:286](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L286)

Takes the value out of the option, but only if the predicate evaluates to `true` on the value.

#### Parameters

##### predicate

(`val`) => `boolean`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### toString()

> **toString**(): `string`

Defined in: [option.ts:40](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L40)

#### Returns

`string`

---

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`Result`](../type-aliases/Result.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

Defined in: [option.ts:311](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L311)

Transposes an `Option` of a `Result` into a `Result` of an `Option`.

`Some(Ok(_))` is mapped to `Ok(Some(_))`, `Some(Err(_))` is mapped to `Err(_)`, and `None`
will be mapped to `Ok(None)`.

#### Type Parameters

##### T

`T`

##### E

`E`

#### Parameters

##### this

[`Option`](../type-aliases/Option.md)\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>

#### Returns

[`Result`](../type-aliases/Result.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### unwrap()

> **unwrap**(): `T`

Defined in: [option.ts:80](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L80)

Returns the contained `Some` value.

#### Returns

`T`

#### Throws

Panics if the self value equals `None`.

---

### unwrapOr()

> **unwrapOr**(`defaultVal`): `T`

Defined in: [option.ts:87](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L87)

Returns the contained `Some` value or a provided default.

#### Parameters

##### defaultVal

`T`

#### Returns

`T`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### unwrapOrElse()

> **unwrapOrElse**(`f`): `T`

Defined in: [option.ts:94](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L94)

Returns the contained `Some` value or computes it from a closure.

#### Parameters

##### f

() => `T`

#### Returns

`T`

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### unwrapOrElseAsync()

> **unwrapOrElseAsync**(`f`): `Promise`\<`T`\>

Defined in: [option.ts:101](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L101)

Async version of `unwrapOrElse`. Returns the contained `Some` value or computes it from an async closure.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### unzip()

> **unzip**\<`T`, `U`\>(`this`): \[[`Option`](../type-aliases/Option.md)\<`T`\>, [`Option`](../type-aliases/Option.md)\<`U`\>\]

Defined in: [option.ts:321](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L321)

Unzips an `Option` containing a tuple of two values.

If `self` is `Some((a, b))` this method returns `(Some(a), Some(b))`. Otherwise, `(None, None)`
is returned.

#### Type Parameters

##### T

`T`

##### U

`U`

#### Parameters

##### this

[`Option`](../type-aliases/Option.md)\<\[`T`, `U`\]\>

#### Returns

\[[`Option`](../type-aliases/Option.md)\<`T`\>, [`Option`](../type-aliases/Option.md)\<`U`\>\]

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.

---

### xor()

> **xor**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:246](https://github.com/madkarmaa/results-ts/blob/63e6998172f2ca5bcca54ec05a8622d9cbc18a33/src/option.ts#L246)

Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

#### Throws

If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
