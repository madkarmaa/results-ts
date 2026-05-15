import { type Result, type ResultError, Ok, Err } from './result';

/**
 * Represents some value of type `T`.
 */
export type SomeOption<T> = {
    readonly value: T;
} & OptionMethods<T>;

/**
 * Represents the absence of a value of type `T`.
 */
export type NoneOption<T> = {
    readonly value: null;
} & OptionMethods<T>;

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
     */
    isSomeAnd(f: (val: T) => boolean): boolean;

    /**
     * Returns `true` if the option is a `None` value.
     */
    isNone(): this is NoneOption<T>;

    /**
     * Returns `true` if the option is a `None` or the value inside of it matches a predicate.
     */
    isNoneOr(f: (val: T) => boolean): boolean;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Error if the value is a `None` with a custom error message provided by `msg`.
     */
    expect(msg: string): T;

    /**
     * Returns the contained `Some` value.
     *
     * @throws Error if the value is a `None`.
     */
    unwrap(): T;

    /**
     * Returns the contained `Some` value or a provided default.
     */
    unwrapOr(defaultVal: T): T;

    /**
     * Returns the contained `Some` value or computes it from a closure.
     */
    unwrapOrElse(f: () => T): T;

    /**
     * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.
     */
    map<U>(f: (val: T) => U): Option<U>;

    /**
     * Calls the provided closure with a reference to the contained value (if `Some`).
     */
    inspect(f: (val: T) => void): Option<T>;

    /**
     * Returns the provided default result (if none), or applies a function to the contained value (if any).
     */
    mapOr<U>(defaultVal: U, f: (val: T) => U): U;

    /**
     * Computes a default function result (if none), or applies a different function to the contained value (if any).
     */
    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.
     */
    okOr<E extends ResultError>(err: E): Result<T, E>;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.
     */
    okOrElse<E extends ResultError>(errF: () => E): Result<T, E>;

    /**
     * Returns an iterator over the possibly contained value.
     */
    iter(): IterableIterator<T>;

    /**
     * Returns `None` if the option is `None`, otherwise returns `optb`.
     */
    and<U>(optb: Option<U>): Option<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     */
    andThen<U>(f: (val: T) => Option<U>): Option<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` returns `false`.
     */
    filter(predicate: (val: T) => boolean): Option<T>;

    /**
     * Returns the option if it contains a value, otherwise returns `optb`.
     */
    or<T2>(optb: Option<T2>): Option<T | T2>;

    /**
     * Returns the option if it contains a value, otherwise calls `f` and returns the result.
     */
    orElse<T2>(f: () => Option<T2>): Option<T | T2>;

    /**
     * Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.
     */
    xor<T2>(optb: Option<T2>): Option<T | T2>;

    /**
     * Inserts `value` into the option, then returns a reference to it.
     */
    insert(value: T): T;

    /**
     * Inserts `value` into the option if it is `None`, then returns a reference to the contained value.
     */
    getOrInsert(value: T): T;

    /**
     * Inserts a value computed from `f` into the option if it is `None`, then returns a reference to the contained value.
     */
    getOrInsertWith(f: () => T): T;

    /**
     * Takes the value out of the option, leaving a `None` in its place.
     */
    take(): Option<T>;

    /**
     * Takes the value out of the option, but only if the predicate evaluates to `true` on the value.
     */
    takeIf(predicate: (val: T) => boolean): Option<T>;

    /**
     * Replaces the actual value in the option by the value given in parameter, returning the old value if present,
     * leaving a `Some` in its place.
     */
    replace(value: T): Option<T>;

    /**
     * Converts from `Option<Option<T>>` to `Option<T>`.
     */
    flatten<U>(this: Option<Option<U>>): Option<U>;
}

class OptionImpl<T> implements OptionMethods<T> {
    #value: T | null;

    constructor(value: T | null) {
        this.#value = value;
    }

    get value(): T | null {
        return this.#value;
    }

    isSome(): this is SomeOption<T> {
        return this.value !== null;
    }

    isSomeAnd(f: (val: T) => boolean): boolean {
        return this.isSome() && f(this.value);
    }

    isNone(): this is NoneOption<T> {
        return this.value === null;
    }

    isNoneOr(f: (val: T) => boolean): boolean {
        return this.value === null || f(this.value);
    }

    expect(msg: string): T {
        if (this.isNone()) throw new Error(msg);
        return this.value as T;
    }

    unwrap(): T {
        if (this.isNone())
            throw new Error('called `Option.unwrap()` on a `None` value');
        return this.value as T;
    }

    unwrapOr(defaultVal: T): T {
        return this.isSome() ? this.value : defaultVal;
    }

    unwrapOrElse(f: () => T): T {
        return this.isSome() ? this.value : f();
    }

    map<U>(f: (val: T) => U): Option<U> {
        if (this.isSome()) return Some(f(this.value));
        return None<U>();
    }

    inspect(f: (val: T) => void): Option<T> {
        if (this.isSome()) f(this.value);
        return this as Option<T>;
    }

    mapOr<U>(defaultVal: U, f: (val: T) => U): U {
        return this.isSome() ? f(this.value) : defaultVal;
    }

    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U {
        return this.isSome() ? f(this.value) : defaultF();
    }

    okOr<E extends ResultError>(err: E): Result<T, E> {
        if (this.isSome()) return Ok(this.value);
        return Err(err);
    }

    okOrElse<E extends ResultError>(errF: () => E): Result<T, E> {
        if (this.isSome()) return Ok(this.value);
        return Err(errF());
    }

    *iter(): IterableIterator<T> {
        if (this.isSome()) yield this.value;
    }

    and<U>(optb: Option<U>): Option<U> {
        if (this.isSome()) return optb;
        return None<U>();
    }

    andThen<U>(f: (val: T) => Option<U>): Option<U> {
        if (this.isSome()) return f(this.value);
        return None<U>();
    }

    filter(predicate: (val: T) => boolean): Option<T> {
        if (this.isSome() && predicate(this.value)) return this as Option<T>;
        return None<T>();
    }

    or<T2>(optb: Option<T2>): Option<T | T2> {
        if (this.isSome()) return this as Option<T>;
        return optb;
    }

    orElse<T2>(f: () => Option<T2>): Option<T | T2> {
        if (this.isSome()) return this as Option<T>;
        return f();
    }

    xor<T2>(optb: Option<T2>): Option<T | T2> {
        const thisIsSome = this.isSome();
        const optbIsSome = optb.isSome();

        if (thisIsSome && !optbIsSome) return this as Option<T>;
        if (!thisIsSome && optbIsSome) return optb;

        return None<T | T2>();
    }

    insert(value: T): T {
        this.#value = value;
        return this.#value;
    }

    getOrInsert(value: T): T {
        if (this.isNone()) this.#value = value;
        return this.#value as T;
    }

    getOrInsertWith(f: () => T): T {
        if (this.isNone()) this.#value = f();
        return this.#value as T;
    }

    take(): Option<T> {
        if (this.isSome()) {
            const val = this.value;
            this.#value = null;
            return Some(val);
        }
        return None<T>();
    }

    takeIf(predicate: (val: T) => boolean): Option<T> {
        if (this.isSome() && predicate(this.value)) {
            const val = this.value;
            this.#value = null;
            return Some(val);
        }
        return None<T>();
    }

    replace(value: T): Option<T> {
        const old = this.#value;
        this.#value = value;
        if (old !== null) return Some(old);
        return None<T>();
    }

    flatten<U>(this: Option<Option<U>>): Option<U> {
        if (this.isSome()) return this.value as Option<U>;
        return None<U>();
    }
}

/**
 * Some value of type `T`.
 * @param value The value to be wrapped in a `Some`.
 * @returns An `Option` representing the presence of a value.
 */
export const Some = <T>(value: T): Option<T> => {
    return new OptionImpl<T>(value) as Option<T>;
};

/**
 * No value.
 * @returns An `Option` representing the absence of a value.
 */
export const None = <T = never>(): Option<T> => {
    return new OptionImpl<T>(null) as Option<T>;
};
