[**results-ts**](../index.md)

***

[results-ts](../index.md) / OptionMethods

# Interface: OptionMethods\<T\>

Defined in: [option.ts:43](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L43)

## Type Parameters

### T

`T`

## Methods

### and()

#### Call Signature

> **and**\<`U`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:157](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L157)

Returns `None` if the option is `None`, otherwise returns `optb`.

##### Type Parameters

###### U

`U`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`U`\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

#### Call Signature

> **and**\<`U`\>(`optb`): [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:158](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L158)

##### Type Parameters

###### U

`U`

##### Parameters

###### optb

`PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

##### Returns

[`AsyncOption`](AsyncOption.md)\<`U`\>

#### Call Signature

> **and**\<`U`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`U`\> \| [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:159](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L159)

##### Type Parameters

###### U

`U`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`U`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`U`\> \| [`AsyncOption`](AsyncOption.md)\<`U`\>

***

### andThen()

> **andThen**\<`U`\>(`f`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:166](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L166)

Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => [`Option`](../type-aliases/Option.md)\<`U`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

***

### andThenAsync()

> **andThenAsync**\<`U`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:171](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L171)

Async version of `andThen`. Returns `None` if the option is `None`, otherwise calls async `f` with the wrapped value and returns the result.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`U`\>

***

### expect()

> **expect**(`msg`): `T`

Defined in: [option.ts:72](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L72)

Returns the contained `Some` value.

#### Parameters

##### msg

`string`

#### Returns

`T`

#### Throws

`PanicError` with `msg` on `None`.

***

### filter()

> **filter**(`predicate`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:178](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L178)

Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
- `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
- `None` if `predicate` returns `false`.

#### Parameters

##### predicate

(`val`) => `boolean`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### filterAsync()

> **filterAsync**(`predicate`): [`AsyncOption`](AsyncOption.md)\<`T`\>

Defined in: [option.ts:185](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L185)

Async version of `filter`. Returns `None` if the option is `None`, otherwise calls async `predicate` with the wrapped value and returns:
- `Some(t)` if `predicate` resolves to `true` (where `t` is the wrapped value), and
- `None` if `predicate` resolves to `false`.

#### Parameters

##### predicate

(`val`) => `PromiseLike`\<`boolean`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

***

### flatten()

> **flatten**\<`U`\>(`this`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:255](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L255)

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

`FlattenError` if a `Some` value is not an `Option`.

***

### getOrInsert()

> **getOrInsert**(`value`): `T`

Defined in: [option.ts:223](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L223)

Inserts `value` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### value

`T`

#### Returns

`T`

***

### getOrInsertWith()

> **getOrInsertWith**(`f`): `T`

Defined in: [option.ts:228](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L228)

Inserts a value computed from `f` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### f

() => `T`

#### Returns

`T`

***

### getOrInsertWithAsync()

> **getOrInsertWithAsync**(`f`): `Promise`\<`T`\>

Defined in: [option.ts:233](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L233)

Async version of `getOrInsertWith`. Inserts a value computed from async `f` into the option if it is `None`, then returns a reference to the contained value.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

***

### insert()

> **insert**(`value`): `T`

Defined in: [option.ts:218](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L218)

Inserts `value` into the option, then returns a reference to it.

#### Parameters

##### value

`T`

#### Returns

`T`

***

### inspect()

> **inspect**(`f`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:109](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L109)

Calls `f` with the `Some` value and returns the original option.

#### Parameters

##### f

(`val`) => `void`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### inspectAsync()

> **inspectAsync**(`f`): [`AsyncOption`](AsyncOption.md)\<`T`\>

Defined in: [option.ts:114](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L114)

Awaits `f` with the `Some` value and returns the original option.

#### Parameters

##### f

(`val`) => `PromiseLike`\<`void`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T`\>

***

### isNone()

> **isNone**(): `this is NoneOption<T>`

Defined in: [option.ts:60](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L60)

Returns `true` if the option is a `None` value.

#### Returns

`this is NoneOption<T>`

***

### isNoneOr()

> **isNoneOr**(`f`): `boolean`

Defined in: [option.ts:65](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L65)

Returns `true` if the option is a `None` or its value matches the predicate.

#### Parameters

##### f

(`val`) => `boolean`

#### Returns

`boolean`

***

### isSome()

> **isSome**(): `this is SomeOption<T>`

Defined in: [option.ts:49](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L49)

Returns `true` if the option is a `Some` value.

#### Returns

`this is SomeOption<T>`

***

### isSomeAnd()

#### Call Signature

> **isSomeAnd**\<`U`\>(`f`): `this is SomeOption<U>`

Defined in: [option.ts:54](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L54)

Returns `true` if the option is a `Some` and its value matches the predicate.

##### Type Parameters

###### U

`U`

##### Parameters

###### f

(`val`) => `val is U`

##### Returns

`this is SomeOption<U>`

#### Call Signature

> **isSomeAnd**(`f`): `this is SomeOption<T>`

Defined in: [option.ts:55](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L55)

##### Parameters

###### f

(`val`) => `boolean`

##### Returns

`this is SomeOption<T>`

***

### iter()

> **iter**(): `IterableIterator`\<`T`\>

Defined in: [option.ts:152](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L152)

Returns an iterator over the contained value, or an empty iterator if absent.

#### Returns

`IterableIterator`\<`T`\>

***

### map()

> **map**\<`U`\>(`f`): [`Option`](../type-aliases/Option.md)\<`U`\>

Defined in: [option.ts:99](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L99)

Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `U`

#### Returns

[`Option`](../type-aliases/Option.md)\<`U`\>

***

### mapAsync()

> **mapAsync**\<`U`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`U`\>

Defined in: [option.ts:104](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L104)

Async version of `map`. Maps an `Option<T>` to `AsyncOption<U>` by applying an async function to a contained value.

#### Type Parameters

##### U

`U`

#### Parameters

##### f

(`val`) => `PromiseLike`\<`U`\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`U`\>

***

### mapOr()

> **mapOr**\<`U`\>(`defaultVal`, `f`): `U`

Defined in: [option.ts:119](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L119)

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

`U`

***

### mapOrElse()

> **mapOrElse**\<`U`\>(`defaultF`, `f`): `U`

Defined in: [option.ts:124](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L124)

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

`U`

***

### mapOrElseAsync()

> **mapOrElseAsync**\<`U`\>(`defaultF`, `f`): `Promise`\<`U`\>

Defined in: [option.ts:129](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L129)

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

> **match**\<`U`\>(`handlers`): `U`

Defined in: [option.ts:288](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L288)

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

***

### okOr()

> **okOr**\<`E`\>(`err`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [option.ts:137](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L137)

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.

#### Type Parameters

##### E

`E`

#### Parameters

##### err

`E`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

***

### okOrElse()

> **okOrElse**\<`E`\>(`errF`): [`Result`](../type-aliases/Result.md)\<`T`, `E`\>

Defined in: [option.ts:142](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L142)

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.

#### Type Parameters

##### E

`E`

#### Parameters

##### errF

() => `E`

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>

***

### okOrElseAsync()

> **okOrElseAsync**\<`E`\>(`errF`): [`AsyncResult`](AsyncResult.md)\<`T`, `E`\>

Defined in: [option.ts:147](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L147)

Async version of `okOrElse`. Converts the `Option<T>` to an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(await errF())`.

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

#### Call Signature

> **or**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:190](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L190)

Returns the option if it contains a value, otherwise returns `optb`.

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

#### Call Signature

> **or**\<`T2`\>(`optb`): [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:191](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L191)

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

`PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

##### Returns

[`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

#### Call Signature

> **or**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\> \| [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:192](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L192)

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`T2`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\> \| [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

***

### orElse()

> **orElse**\<`T2`\>(`f`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:199](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L199)

Returns the option if it contains a value, otherwise calls `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => [`Option`](../type-aliases/Option.md)\<`T2`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

***

### orElseAsync()

> **orElseAsync**\<`T2`\>(`f`): [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:204](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L204)

Async version of `orElse`. Returns the option if it contains a value, otherwise calls async `f` and returns the result.

#### Type Parameters

##### T2

`T2`

#### Parameters

##### f

() => `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

#### Returns

[`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

***

### replace()

> **replace**(`value`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:248](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L248)

Sets the option to `Some(value)` and returns its previous state as an `Option`.

#### Parameters

##### value

`T`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### take()

> **take**(): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:238](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L238)

Takes the value out of the option, leaving a `None` in its place.

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### takeIf()

> **takeIf**(`predicate`): [`Option`](../type-aliases/Option.md)\<`T`\>

Defined in: [option.ts:243](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L243)

Takes the value out of the option, but only if the predicate evaluates to `true` on the value.

#### Parameters

##### predicate

(`val`) => `boolean`

#### Returns

[`Option`](../type-aliases/Option.md)\<`T`\>

***

### toString()

> **toString**(): `string`

Defined in: [option.ts:44](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L44)

#### Returns

`string`

***

### transpose()

> **transpose**\<`T`, `E`\>(`this`): [`Result`](../type-aliases/Result.md)\<[`Option`](../type-aliases/Option.md)\<`T`\>, `E`\>

Defined in: [option.ts:265](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L265)

Transposes an `Option` of a `Result` into a `Result` of an `Option`.

Converts `Some(Ok(value))` to `Ok(Some(value))`, `Some(Err(error))` to
`Err(error)`, and `None` to `Ok(None)`.

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

`TransposeError` if a `Some` value is not a `Result`.

***

### unwrap()

> **unwrap**(): `T`

Defined in: [option.ts:79](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L79)

Returns the contained `Some` value.

#### Returns

`T`

#### Throws

`PanicError` on `None`.

***

### unwrapOr()

> **unwrapOr**(`defaultVal`): `T`

Defined in: [option.ts:84](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L84)

Returns the contained `Some` value or a provided default.

#### Parameters

##### defaultVal

`T`

#### Returns

`T`

***

### unwrapOrElse()

> **unwrapOrElse**(`f`): `T`

Defined in: [option.ts:89](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L89)

Returns the contained `Some` value, or calls `f` on `None`.

#### Parameters

##### f

() => `T`

#### Returns

`T`

***

### unwrapOrElseAsync()

> **unwrapOrElseAsync**(`f`): `Promise`\<`T`\>

Defined in: [option.ts:94](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L94)

Returns the `Some` value, or awaits `f` on `None`.

#### Parameters

##### f

() => `PromiseLike`\<`T`\>

#### Returns

`Promise`\<`T`\>

***

### unzip()

> **unzip**\<`T`, `U`\>(`this`): \[[`Option`](../type-aliases/Option.md)\<`T`\>, [`Option`](../type-aliases/Option.md)\<`U`\>\]

Defined in: [option.ts:283](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L283)

Unzips an `Option` containing a tuple of two values.

Returns `[Some(a), Some(b)]` for `Some([a, b])`, or `[None, None]` for `None`.

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

***

### xor()

#### Call Signature

> **xor**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

Defined in: [option.ts:209](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L209)

Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`T2`\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\>

#### Call Signature

> **xor**\<`T2`\>(`optb`): [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:210](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L210)

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

`PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

##### Returns

[`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

#### Call Signature

> **xor**\<`T2`\>(`optb`): [`Option`](../type-aliases/Option.md)\<`T` \| `T2`\> \| [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

Defined in: [option.ts:211](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L211)

##### Type Parameters

###### T2

`T2`

##### Parameters

###### optb

[`Option`](../type-aliases/Option.md)\<`T2`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`T2`\>\>

##### Returns

[`Option`](../type-aliases/Option.md)\<`T` \| `T2`\> \| [`AsyncOption`](AsyncOption.md)\<`T` \| `T2`\>

***

### zip()

#### Call Signature

> **zip**\<`U`\>(`other`): [`Option`](../type-aliases/Option.md)\<\[`T`, `U`\]\>

Defined in: [option.ts:272](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L272)

Combines two options into an option containing a tuple of their values.

Returns `Some([a, b])` if both options are `Some`, otherwise returns `None`.

##### Type Parameters

###### U

`U`

##### Parameters

###### other

[`Option`](../type-aliases/Option.md)\<`U`\>

##### Returns

[`Option`](../type-aliases/Option.md)\<\[`T`, `U`\]\>

#### Call Signature

> **zip**\<`U`\>(`other`): [`AsyncOption`](AsyncOption.md)\<\[`T`, `U`\]\>

Defined in: [option.ts:273](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L273)

##### Type Parameters

###### U

`U`

##### Parameters

###### other

`PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

##### Returns

[`AsyncOption`](AsyncOption.md)\<\[`T`, `U`\]\>

#### Call Signature

> **zip**\<`U`\>(`other`): [`Option`](../type-aliases/Option.md)\<\[`T`, `U`\]\> \| [`AsyncOption`](AsyncOption.md)\<\[`T`, `U`\]\>

Defined in: [option.ts:274](https://github.com/madkarmaa/results-ts/blob/59837911cd809c86b2752dfc2815fe7973609f5d/src/option.ts#L274)

##### Type Parameters

###### U

`U`

##### Parameters

###### other

[`Option`](../type-aliases/Option.md)\<`U`\> \| `PromiseLike`\<[`Option`](../type-aliases/Option.md)\<`U`\>\>

##### Returns

[`Option`](../type-aliases/Option.md)\<\[`T`, `U`\]\> \| [`AsyncOption`](AsyncOption.md)\<\[`T`, `U`\]\>
