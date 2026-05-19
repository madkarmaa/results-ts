import {
    assertIsResultError,
    assertValueIsNotMissing,
    FlattenError,
    InvalidArgumentError,
    PanicError
} from './errors';
import { type Result, type ResultError, Ok, Err } from './result';

/**
 * Represents some value of type `T`.
 */
export type SomeOption<T> = OptionMethods<T> & { readonly _isSome: true };

/**
 * Represents the absence of a value of type `T`.
 */
export type NoneOption<T> = OptionMethods<T> & { readonly _isSome: false };

/**
 * Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.
 *
 * `Option`s are commonly paired with pattern matching to query the presence of a value and take action, always accounting for the `None` case.
 *
 * @example
 * ```typescript
 * const x: Option<number> = Some(5);
 * const y: Option<number> = None();
 *
 * if (x.isSome() && y.isSome()) console.log(x.value + y.value);
 * else console.log('One of the options is None');
 * ```
 *
 * @template T Contains the type of the value that may be present in the `Option`.
 */
export type Option<T> = SomeOption<T> | NoneOption<T>;

interface OptionMethods<T> {
    /**
     * Returns `true` if the option is a `Some` value.
     */
    isSome(): this is SomeOption<T>;

    /**
     * Returns `true` if the option is a `Some` and the value inside of it matches a predicate.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    isSomeAnd(f: (val: T) => boolean): boolean;

    /**
     * Returns `true` if the option is a `None` value.
     */
    isNone(): this is NoneOption<T>;

    /**
     * Returns `true` if the option is a `None` or the value inside of it matches a predicate.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    isNoneOr(f: (val: T) => boolean): boolean;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Panics if the value is a `None` with a custom panic message provided by `msg`.
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    expect(msg: string): T;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Panics if the self value equals `None`.
     */
    unwrap(): T;

    /**
     * Returns the contained `Some` value or a provided default.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    unwrapOr(defaultVal: T): T;

    /**
     * Returns the contained `Some` value or computes it from a closure.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    unwrapOrElse(f: () => T): T;

    /**
     * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    map<U>(f: (val: T) => U): Option<U>;

    /**
     * Calls the provided closure with a reference to the contained value (if `Some`).
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    inspect(f: (val: T) => void): Option<T>;

    /**
     * Returns the provided default result (if none), or applies a function to the contained value (if any).
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapOr<U>(defaultVal: U, f: (val: T) => U): U;

    /**
     * Computes a default function result (if none), or applies a different function to the contained value (if any).
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    okOr<E extends ResultError>(err: E): Result<T, E>;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    okOrElse<E extends ResultError>(errF: () => E): Result<T, E>;

    /**
     * Returns an iterator over the possibly contained value.
     */
    iter(): IterableIterator<T>;

    /**
     * Returns `None` if the option is `None`, otherwise returns `optb`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    and<U>(optb: Option<U>): Option<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    andThen<U>(f: (val: T) => Option<U>): Option<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` returns `false`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    filter(predicate: (val: T) => boolean): Option<T>;

    /**
     * Returns the option if it contains a value, otherwise returns `optb`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    or<T2>(optb: Option<T2>): Option<T | T2>;

    /**
     * Returns the option if it contains a value, otherwise calls `f` and returns the result.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    orElse<T2>(f: () => Option<T2>): Option<T | T2>;

    /**
     * Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    xor<T2>(optb: Option<T2>): Option<T | T2>;

    /**
     * Inserts `value` into the option, then returns a reference to it.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    insert(value: T): T;

    /**
     * Inserts `value` into the option if it is `None`, then returns a reference to the contained value.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    getOrInsert(value: T): T;

    /**
     * Inserts a value computed from `f` into the option if it is `None`, then returns a reference to the contained value.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    getOrInsertWith(f: () => T): T;

    /**
     * Takes the value out of the option, leaving a `None` in its place.
     */
    take(): Option<T>;

    /**
     * Takes the value out of the option, but only if the predicate evaluates to `true` on the value.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    takeIf(predicate: (val: T) => boolean): Option<T>;

    /**
     * Replaces the actual value in the option by the value given in parameter, returning the old value if present,
     * leaving a `Some` in its place.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    replace(value: T): Option<T>;

    /**
     * Converts from `Option<Option<T>>` to `Option<T>`.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    flatten<U>(this: Option<Option<U>>): Option<U>;

    /**
     * Matches the `Option` with two functions, one for each variant.
     *
     * @throws If this method throws an error other than a panic, it indicates misuse of the library (garbage data, bypass of the type system, or invalid runtime input). Check your code.
     */
    match<U>(handlers: { Some: (val: T) => U; None: () => U }): U;
}

class OptionImpl<T> implements OptionMethods<T> {
    #value: T | null;
    readonly _isSome: boolean;

    constructor(value: T | null) {
        this.#value = value;
        this._isSome = value !== null;
    }

    isSome(): this is SomeOption<T> {
        return this.#value !== null;
    }

    isSomeAnd(f: (val: T) => boolean): boolean {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');
        return this.isSome() && f(this.#value as T);
    }

    isNone(): this is NoneOption<T> {
        return this.#value === null;
    }

    isNoneOr(f: (val: T) => boolean): boolean {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');
        return this.#value === null || f(this.#value);
    }

    expect(msg: string): T {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        if (this.isNone()) throw new PanicError(msg);
        return this.#value as T;
    }

    unwrap(): T {
        if (this.isNone())
            throw new PanicError('called `Option.unwrap()` on a `None` value');
        return this.#value as T;
    }

    unwrapOr(defaultVal: T): T {
        assertValueIsNotMissing(defaultVal);
        return this.isSome() ? (this.#value as T) : defaultVal;
    }

    unwrapOrElse(f: () => T): T {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');
        return this.isSome() ? (this.#value as T) : f();
    }

    map<U>(f: (val: T) => U): Option<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome()) return Some(f(this.#value as T));
        return None<U>();
    }

    inspect(f: (val: T) => void): Option<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome()) f(this.#value as T);
        return this as Option<T>;
    }

    mapOr<U>(defaultVal: U, f: (val: T) => U): U {
        assertValueIsNotMissing(defaultVal);

        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        return this.isSome() ? f(this.#value as T) : defaultVal;
    }

    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U {
        if (typeof defaultF !== 'function')
            throw new InvalidArgumentError(
                "Argument 'defaultF' must be a function"
            );

        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        return this.isSome() ? f(this.#value as T) : defaultF();
    }

    okOr<E extends ResultError>(err: E): Result<T, E> {
        assertIsResultError(err);

        if (this.isSome()) return Ok(this.#value as T);
        return Err(err);
    }

    okOrElse<E extends ResultError>(errF: () => E): Result<T, E> {
        if (typeof errF !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome()) return Ok(this.#value as T);
        return Err(errF());
    }

    *iter(): IterableIterator<T> {
        if (this.isSome()) yield this.#value as T;
    }

    and<U>(optb: Option<U>): Option<U> {
        if (!(optb instanceof OptionImpl))
            throw new InvalidArgumentError('Argument must be an Option');

        if (this.isSome()) return optb;
        return None();
    }

    andThen<U>(f: (val: T) => Option<U>): Option<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome()) return f(this.#value as T);
        return None();
    }

    filter(predicate: (val: T) => boolean): Option<T> {
        if (typeof predicate !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome() && predicate(this.#value as T))
            return this as Option<T>;
        return None();
    }

    or<T2>(optb: Option<T2>): Option<T | T2> {
        if (!(optb instanceof OptionImpl))
            throw new InvalidArgumentError('Argument must be an Option');

        if (this.isSome()) return this as Option<T>;
        return optb;
    }

    orElse<T2>(f: () => Option<T2>): Option<T | T2> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome()) return this as Option<T>;
        return f();
    }

    xor<T2>(optb: Option<T2>): Option<T | T2> {
        if (!(optb instanceof OptionImpl))
            throw new InvalidArgumentError('Argument must be an Option');

        const thisIsSome = this.isSome();
        const optbIsSome = optb.isSome();

        if (thisIsSome && !optbIsSome) return this as Option<T>;
        if (!thisIsSome && optbIsSome) return optb;

        return None<T | T2>();
    }

    insert(value: T): T {
        assertValueIsNotMissing(value);

        this.#value = value;
        return this.#value;
    }

    getOrInsert(value: T): T {
        assertValueIsNotMissing(value);

        if (this.isNone()) this.#value = value;
        return this.#value as T;
    }

    getOrInsertWith(f: () => T): T {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isNone()) this.#value = f();
        return this.#value as T;
    }

    take(): Option<T> {
        if (this.isSome()) {
            const val = this.#value;
            this.#value = null;
            return Some(val!);
        }

        return None();
    }

    takeIf(predicate: (val: T) => boolean): Option<T> {
        if (typeof predicate !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        if (this.isSome() && predicate(this.#value as T)) {
            const val = this.#value;
            this.#value = null;
            return Some(val!);
        }

        return None();
    }

    replace(value: T): Option<T> {
        assertValueIsNotMissing(value);

        const old = this.#value;
        this.#value = value;

        if (old !== null) return Some(old);
        return None();
    }

    flatten<U>(this: Option<Option<U>>): Option<U> {
        if (this.isNone()) return None();

        const _this = this as OptionImpl<OptionImpl<U>>;

        if (!(_this.#value instanceof OptionImpl))
            throw new FlattenError(
                'flatten can only be called on Option<Option<T>>'
            );

        return _this.#value as Option<U>;
    }

    match<U>(handlers: { Some: (val: T) => U; None: () => U }): U {
        if (typeof handlers !== 'object' || handlers === null)
            throw new InvalidArgumentError('Argument must be an object');

        const { Some: someHandler, None: noneHandler } = handlers;

        if (typeof someHandler !== 'function')
            throw new InvalidArgumentError(
                'Handler for Some must be a function'
            );
        if (typeof noneHandler !== 'function')
            throw new InvalidArgumentError(
                'Handler for None must be a function'
            );

        return this.isSome() ? someHandler(this.#value!) : noneHandler();
    }
}

/**
 * Some value of type `T`.
 * @param value The value to be wrapped in a `Some`.
 * @returns An `Option` representing the presence of a value.
 */
export function Some<T>(value: T): Option<T> {
    assertValueIsNotMissing(value);
    return new OptionImpl<T>(value) as Option<T>;
}

/**
 * No value.
 * @returns An `Option` representing the absence of a value.
 */
export function None<T = never>(): Option<T> {
    return new OptionImpl<T>(null) as Option<T>;
}
