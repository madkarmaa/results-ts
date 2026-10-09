import {
    FlattenError,
    InvalidArgumentError,
    PanicError,
    TransposeError
} from './errors';
import {
    ASYNC_START,
    EMPTY_ITERATOR,
    OneItemIterator,
    isPromiseLike,
    isOptionOperand,
    isAsyncOptionOperand
} from './utils';
import { type Result, Ok, Err } from './result';
import { type AsyncOption, AsyncOptionImpl } from './async-option';
import { type AsyncResult, AsyncResultImpl } from './async-result';

/**
 * Represents some value of type `T`.
 */
export type SomeOption<T> = OptionMethods<T> & { readonly _isSome: true };

/**
 * Represents the absence of a value of type `T`.
 */
export type NoneOption<T> = OptionMethods<T> & { readonly _isSome: false };

/**
 * `Option<T>` is either `Some(value)` with a value of type `T`, or `None`.
 * Use `match` to handle both variants.
 *
 * Invalid callbacks and operands throw errors. Callback exceptions propagate.
 *
 * `and`, `or`, `xor`, and `zip` return an `AsyncOption` for promise-like operands.
 * They capture the receiver's state at invocation and resolve the operand even
 * when its value is unused. Operand rejections propagate.
 *
 * @template T The contained value type.
 */
export type Option<T> = SomeOption<T> | NoneOption<T>;

interface OptionMethods<T> {
    toString(): string;

    /**
     * Returns `true` if the option is a `Some` value.
     */
    isSome(): this is SomeOption<T>;

    /**
     * Returns `true` if the option is a `Some` and its value matches the predicate.
     */
    isSomeAnd<U extends T>(f: (val: T) => val is U): this is SomeOption<U>;
    isSomeAnd(f: (val: T) => boolean): this is SomeOption<T>;

    /**
     * Returns `true` if the option is a `None` value.
     */
    isNone(): this is NoneOption<T>;

    /**
     * Returns `true` if the option is a `None` or its value matches the predicate.
     */
    isNoneOr(f: (val: T) => boolean): boolean;

    /**
     * Returns the contained `Some` value.
     *
     * @throws `PanicError` with `msg` on `None`.
     */
    expect(msg: string): T;

    /**
     * Returns the contained `Some` value.
     *
     * @throws `PanicError` on `None`.
     */
    unwrap(): T;

    /**
     * Returns the contained `Some` value or a provided default.
     */
    unwrapOr(defaultVal: T): T;

    /**
     * Returns the contained `Some` value, or calls `f` on `None`.
     */
    unwrapOrElse(f: () => T): T;

    /**
     * Returns the `Some` value, or awaits `f` on `None`.
     */
    unwrapOrElseAsync(f: () => PromiseLike<T>): Promise<T>;

    /**
     * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.
     */
    map<U>(f: (val: T) => U): Option<U>;

    /**
     * Async version of `map`. Maps an `Option<T>` to `AsyncOption<U>` by applying an async function to a contained value.
     */
    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncOption<U>;

    /**
     * Calls `f` with the `Some` value and returns the original option.
     */
    inspect(f: (val: T) => void): Option<T>;

    /**
     * Awaits `f` with the `Some` value and returns the original option.
     */
    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncOption<T>;

    /**
     * Returns the fallback on `None`, or calls `f` with the `Some` value.
     */
    mapOr<U>(defaultVal: U, f: (val: T) => U): U;

    /**
     * Calls `defaultF` on `None`, or calls `f` with the `Some` value.
     */
    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U;

    /**
     * Awaits `defaultF` on `None`, or awaits `f` with the `Some` value.
     */
    mapOrElseAsync<U>(
        defaultF: () => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U>;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.
     */
    okOr<E>(err: E): Result<T, E>;

    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.
     */
    okOrElse<E>(errF: () => E): Result<T, E>;

    /**
     * Async version of `okOrElse`. Converts the `Option<T>` to an `AsyncResult<T, E>`, mapping `Some(v)` to `Ok(v)` and `None` to `Err(await errF())`.
     */
    okOrElseAsync<E>(errF: () => PromiseLike<E>): AsyncResult<T, E>;

    /**
     * Returns an iterator over the contained value, or an empty iterator if absent.
     */
    iter(): IterableIterator<T>;

    /**
     * Returns `None` if the option is `None`, otherwise returns `optb`.
     */
    and<U>(optb: Option<U>): Option<U>;
    and<U>(optb: PromiseLike<Option<U>>): AsyncOption<U>;
    and<U>(
        optb: Option<U> | PromiseLike<Option<U>>
    ): Option<U> | AsyncOption<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     */
    andThen<U>(f: (val: T) => Option<U>): Option<U>;

    /**
     * Async version of `andThen`. Returns `None` if the option is `None`, otherwise calls async `f` with the wrapped value and returns the result.
     */
    andThenAsync<U>(f: (val: T) => PromiseLike<Option<U>>): AsyncOption<U>;

    /**
     * Returns `None` if the option is `None`, otherwise calls `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` returns `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` returns `false`.
     */
    filter(predicate: (val: T) => boolean): Option<T>;

    /**
     * Async version of `filter`. Returns `None` if the option is `None`, otherwise calls async `predicate` with the wrapped value and returns:
     * - `Some(t)` if `predicate` resolves to `true` (where `t` is the wrapped value), and
     * - `None` if `predicate` resolves to `false`.
     */
    filterAsync(predicate: (val: T) => PromiseLike<boolean>): AsyncOption<T>;

    /**
     * Returns the option if it contains a value, otherwise returns `optb`.
     */
    or<T2>(optb: Option<T2>): Option<T | T2>;
    or<T2>(optb: PromiseLike<Option<T2>>): AsyncOption<T | T2>;
    or<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2>;

    /**
     * Returns the option if it contains a value, otherwise calls `f` and returns the result.
     */
    orElse<T2>(f: () => Option<T2>): Option<T | T2>;

    /**
     * Async version of `orElse`. Returns the option if it contains a value, otherwise calls async `f` and returns the result.
     */
    orElseAsync<T2>(f: () => PromiseLike<Option<T2>>): AsyncOption<T | T2>;

    /**
     * Returns `Some` if exactly one of `this`, `optb` is `Some`, otherwise returns `None`.
     */
    xor<T2>(optb: Option<T2>): Option<T | T2>;
    xor<T2>(optb: PromiseLike<Option<T2>>): AsyncOption<T | T2>;
    xor<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2>;

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
     * Async version of `getOrInsertWith`. Inserts a value computed from async `f` into the option if it is `None`, then returns a reference to the contained value.
     */
    getOrInsertWithAsync(f: () => PromiseLike<T>): Promise<T>;

    /**
     * Takes the value out of the option, leaving a `None` in its place.
     */
    take(): Option<T>;

    /**
     * Takes the value out of the option, but only if the predicate evaluates to `true` on the value.
     */
    takeIf(predicate: (val: T) => boolean): Option<T>;

    /**
     * Sets the option to `Some(value)` and returns its previous state as an `Option`.
     */
    replace(value: T): Option<T>;

    /**
     * Converts from `Option<Option<T>>` to `Option<T>`.
     *
     * @throws `FlattenError` if a `Some` value is not an `Option`.
     */
    flatten<U>(this: Option<Option<U>>): Option<U>;

    /**
     * Transposes an `Option` of a `Result` into a `Result` of an `Option`.
     *
     * Converts `Some(Ok(value))` to `Ok(Some(value))`, `Some(Err(error))` to
     * `Err(error)`, and `None` to `Ok(None)`.
     *
     * @throws `TransposeError` if a `Some` value is not a `Result`.
     */
    transpose<T, E>(this: Option<Result<T, E>>): Result<Option<T>, E>;

    /**
     * Combines two options into an option containing a tuple of their values.
     *
     * Returns `Some([a, b])` if both options are `Some`, otherwise returns `None`.
     */
    zip<U>(other: Option<U>): Option<[T, U]>;
    zip<U>(other: PromiseLike<Option<U>>): AsyncOption<[T, U]>;
    zip<U>(
        other: Option<U> | PromiseLike<Option<U>>
    ): Option<[T, U]> | AsyncOption<[T, U]>;

    /**
     * Unzips an `Option` containing a tuple of two values.
     *
     * Returns `[Some(a), Some(b)]` for `Some([a, b])`, or `[None, None]` for `None`.
     */
    unzip<T, U>(this: Option<[T, U]>): [Option<T>, Option<U>];

    /**
     * Matches the `Option` with two functions, one for each variant.
     */
    match<U>(handlers: { Some: (val: T) => U; None: () => U }): U;
}

// Private identity keeps every user value, including undefined and symbols,
// distinct from absence without allocating a separate state object.
const noneValue = Symbol('None');
type NoneValue = typeof noneValue;

function isSomeValue<T>(value: T | NoneValue): value is T {
    return value !== noneValue;
}

type AsyncInsertionState<T> = {
    promise: Promise<T> | undefined;
    pendingToken: number;
    mutationVersion: number;
};

class OptionImpl<T> implements OptionMethods<T> {
    #state: T | NoneValue;
    // Retain this record once allocated so in-flight insertions observe every
    // later invalidation, even after the pending promise has been cleared.
    #insertion?: AsyncInsertionState<T>;

    static name = 'Option';
    constructor(state: T | NoneValue) {
        this.#state = state;
    }

    #invalidatePendingInsert(): void {
        const insertion = this.#insertion;
        if (!insertion) return;
        insertion.mutationVersion += 1;
        insertion.pendingToken += 1;
        insertion.promise = undefined;
    }

    get _isSome(): boolean {
        return isSomeValue(this.#state);
    }

    get [Symbol.toStringTag]() {
        return isSomeValue(this.#state) ? `Option Some` : `Option None`;
    }

    toString(): string {
        const state = this.#state;
        if (isSomeValue(state)) return `Some(${state})`;
        return `None`;
    }

    isSome(): this is SomeOption<T> {
        return isSomeValue(this.#state);
    }

    isSomeAnd<U extends T>(f: (val: T) => val is U): this is SomeOption<U>;
    isSomeAnd(f: (val: T) => boolean): this is SomeOption<T>;
    isSomeAnd(f: (val: T) => boolean): this is SomeOption<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isSomeValue(state) && f(state);
    }

    isNone(): this is NoneOption<T> {
        return !isSomeValue(this.#state);
    }

    isNoneOr(f: (val: T) => boolean): boolean {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (!isSomeValue(state)) return true;
        return f(state);
    }

    expect(msg: string): T {
        if (typeof msg !== 'string')
            throw new InvalidArgumentError('Argument must be a string');

        const state = this.#state;
        if (!isSomeValue(state)) throw new PanicError(msg);
        return state;
    }

    unwrap(): T {
        const state = this.#state;
        if (!isSomeValue(state))
            throw new PanicError('called `Option.unwrap()` on a `None` value');
        return state;
    }

    unwrapOr(defaultVal: T): T {
        const state = this.#state;
        return isSomeValue(state) ? state : defaultVal;
    }

    unwrapOrElse(f: () => T): T {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isSomeValue(state) ? state : f();
    }

    unwrapOrElseAsync(f: () => PromiseLike<T>): Promise<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isSomeValue(state)
            ? Promise.resolve(state)
            : Promise.resolve(f());
    }

    map<U>(f: (val: T) => U): Option<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) return Some(f(state));

        // Reuse None. It contains no value of the old type.
        return this as unknown as OptionImpl<U>;
    }

    mapAsync<U>(f: (val: T) => PromiseLike<U>): AsyncOption<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncOptionImpl(
                ASYNC_START.then(() => f(state)).then(Some)
            );

        return new AsyncOptionImpl(Promise.resolve(None()));
    }

    inspect(f: (val: T) => void): Option<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) f(state);
        return this;
    }

    inspectAsync(f: (val: T) => PromiseLike<void>): AsyncOption<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncOptionImpl(
                ASYNC_START.then(() => f(state)).then(() => this)
            );

        return new AsyncOptionImpl(Promise.resolve(this));
    }

    mapOr<U>(defaultVal: U, f: (val: T) => U): U {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        return isSomeValue(state) ? f(state) : defaultVal;
    }

    mapOrElse<U>(defaultF: () => U, f: (val: T) => U): U {
        if (typeof defaultF !== 'function')
            throw new InvalidArgumentError(
                "Argument 'defaultF' must be a function"
            );

        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        const state = this.#state;
        return isSomeValue(state) ? f(state) : defaultF();
    }

    mapOrElseAsync<U>(
        defaultF: () => PromiseLike<U>,
        f: (val: T) => PromiseLike<U>
    ): Promise<U> {
        if (typeof defaultF !== 'function')
            throw new InvalidArgumentError(
                "Argument 'defaultF' must be a function"
            );

        if (typeof f !== 'function')
            throw new InvalidArgumentError("Argument 'f' must be a function");

        const state = this.#state;
        return isSomeValue(state)
            ? Promise.resolve(f(state))
            : Promise.resolve(defaultF());
    }

    okOr<E>(err: E): Result<T, E> {
        const state = this.#state;
        if (isSomeValue(state)) return Ok(state);
        return Err(err);
    }

    okOrElse<E>(errF: () => E): Result<T, E> {
        if (typeof errF !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) return Ok(state);
        return Err(errF());
    }

    okOrElseAsync<E>(errF: () => PromiseLike<E>): AsyncResult<T, E> {
        if (typeof errF !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncResultImpl(Promise.resolve(Ok(state)));

        return new AsyncResultImpl(ASYNC_START.then(errF).then(Err));
    }

    iter(): IterableIterator<T> {
        const state = this.#state;
        if (!isSomeValue(state)) return EMPTY_ITERATOR;
        return new OneItemIterator(state);
    }

    and<U>(optb: Option<U>): Option<U>;
    and<U>(optb: PromiseLike<Option<U>>): AsyncOption<U>;
    and<U>(
        optb: Option<U> | PromiseLike<Option<U>>
    ): Option<U> | AsyncOption<U>;
    and<U>(
        optb: Option<U> | PromiseLike<Option<U>>
    ): Option<U> | AsyncOption<U> {
        if (!isOptionOperand(optb)) {
            if (isPromiseLike(optb))
                return this.#combineAsync(optb, (current, other) =>
                    current.and(other)
                );
            throw new InvalidArgumentError('Argument must be an Option');
        }

        const state = this.#state;
        if (isSomeValue(state)) return optb;

        // Reuse None. It contains no value of the old type.
        return this as unknown as OptionImpl<U>;
    }

    andThen<U>(f: (val: T) => Option<U>): Option<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) return f(state);

        // Reuse None. It contains no value of the old type.
        return this as unknown as OptionImpl<U>;
    }

    andThenAsync<U>(f: (val: T) => PromiseLike<Option<U>>): AsyncOption<U> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncOptionImpl(ASYNC_START.then(() => f(state)));

        return new AsyncOptionImpl(Promise.resolve(None()));
    }

    filter(predicate: (val: T) => boolean): Option<T> {
        if (typeof predicate !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;

        if (!isSomeValue(state)) return this; // already `None`, reuse
        if (predicate(state)) return this; // `Some` passes the filter, reuse
        return None(); // `Some` fails the filter - must allocate
    }

    filterAsync(predicate: (val: T) => PromiseLike<boolean>): AsyncOption<T> {
        if (typeof predicate !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncOptionImpl(
                ASYNC_START.then(() => predicate(state)).then((pass) =>
                    pass ? this : None()
                )
            );

        return new AsyncOptionImpl(Promise.resolve(None()));
    }

    or<T2>(optb: Option<T2>): Option<T | T2>;
    or<T2>(optb: PromiseLike<Option<T2>>): AsyncOption<T | T2>;
    or<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2>;
    or<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2> {
        if (!isOptionOperand(optb)) {
            if (isPromiseLike(optb))
                return this.#combineAsync(optb, (current, other) =>
                    current.or(other)
                );
            throw new InvalidArgumentError('Argument must be an Option');
        }

        const state = this.#state;
        if (isSomeValue(state)) return this;
        return optb;
    }

    orElse<T2>(f: () => Option<T2>): Option<T | T2> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) return this;
        return f();
    }

    orElseAsync<T2>(f: () => PromiseLike<Option<T2>>): AsyncOption<T | T2> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state))
            return new AsyncOptionImpl(Promise.resolve(this));

        return new AsyncOptionImpl(ASYNC_START.then(f));
    }

    xor<T2>(optb: Option<T2>): Option<T | T2>;
    xor<T2>(optb: PromiseLike<Option<T2>>): AsyncOption<T | T2>;
    xor<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2>;
    xor<T2>(
        optb: Option<T2> | PromiseLike<Option<T2>>
    ): Option<T | T2> | AsyncOption<T | T2> {
        if (!isOptionOperand(optb)) {
            if (isPromiseLike(optb))
                return this.#combineAsync(optb, (current, other) =>
                    current.xor(other)
                );
            throw new InvalidArgumentError('Argument must be an Option');
        }

        const thisIsSome = isSomeValue(this.#state);
        const optbIsSome = optb._isSome;

        if (thisIsSome && !optbIsSome) return this;
        if (!thisIsSome && optbIsSome) return optb;

        // Matching variants yield None: reuse `this` when both are None,
        // or allocate a fresh None when both are Some.
        return thisIsSome ? None() : this;
    }

    insert(value: T): T {
        this.#invalidatePendingInsert();
        this.#state = value;
        return value;
    }

    getOrInsert(value: T): T {
        this.#invalidatePendingInsert();

        const state = this.#state;
        if (isSomeValue(state)) return state;

        this.#state = value;
        return value;
    }

    getOrInsertWith(f: () => T): T {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        this.#invalidatePendingInsert();

        const state = this.#state;
        if (isSomeValue(state)) return state;

        const value = f();
        this.#state = value;
        return value;
    }

    async getOrInsertWithAsync(f: () => PromiseLike<T>): Promise<T> {
        if (typeof f !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        const state = this.#state;
        if (isSomeValue(state)) return state;

        // Ordinary synchronous options need no insertion coordination state.
        const insertion = (this.#insertion ??= {
            promise: undefined,
            pendingToken: 0,
            mutationVersion: 0
        });

        if (insertion.promise) return insertion.promise;

        const startMutationVersion = insertion.mutationVersion;

        const pendingToken = insertion.pendingToken + 1;
        insertion.pendingToken = pendingToken;

        const insertPromise = ASYNC_START.then(() => f()).then((value) => {
            if (
                insertion.mutationVersion === startMutationVersion &&
                insertion.pendingToken === pendingToken
            ) {
                insertion.mutationVersion += 1;
                this.#state = value;
                return value;
            }

            const current = this.#state;
            if (isSomeValue(current)) return current;

            const pending = insertion.promise;
            if (pending && insertion.pendingToken !== pendingToken) {
                return pending.then(() => {
                    const latest = this.#state;
                    if (isSomeValue(latest)) return latest;

                    insertion.mutationVersion += 1;
                    this.#state = value;
                    return value;
                });
            }

            insertion.mutationVersion += 1;
            this.#state = value;
            return value;
        });

        insertion.promise = insertPromise;

        const clearPendingInsert = () => {
            if (
                insertion.pendingToken === pendingToken &&
                insertion.promise === insertPromise
            )
                insertion.promise = undefined;
        };
        void insertPromise.then(clearPendingInsert, clearPendingInsert);

        return insertPromise;
    }

    take(): Option<T> {
        this.#invalidatePendingInsert();
        const state = this.#state;
        if (isSomeValue(state)) {
            this.#state = noneValue;
            return Some(state);
        }

        return None();
    }

    takeIf(predicate: (val: T) => boolean): Option<T> {
        if (typeof predicate !== 'function')
            throw new InvalidArgumentError('Argument must be a function');

        this.#invalidatePendingInsert();
        const state = this.#state;
        if (isSomeValue(state) && predicate(state)) {
            this.#state = noneValue;
            return Some(state);
        }

        return None();
    }

    replace(value: T): Option<T> {
        this.#invalidatePendingInsert();
        const state = this.#state;
        this.#state = value;

        if (isSomeValue(state)) return Some(state);
        return None();
    }

    flatten<U>(this: OptionImpl<Option<U>>): Option<U> {
        if (this.isNone()) return None();

        const state = this.#state;

        if (!isSomeValue(state) || typeof state._isSome !== 'boolean')
            throw new FlattenError(
                'flatten can only be called on Option<Option<T>>'
            );

        return state;
    }

    transpose<T, E>(this: OptionImpl<Result<T, E>>): Result<Option<T>, E> {
        if (this.isNone()) return Ok(None());

        const state = this.#state;

        if (!isSomeValue(state) || typeof state._isOk !== 'boolean')
            throw new TransposeError(
                'transpose can only be called on Option<Result<T, E>>'
            );

        const inner = state;
        return inner.isOk() ? Ok(Some(inner.unwrap())) : Err(inner.unwrapErr());
    }

    zip<U>(other: Option<U>): Option<[T, U]>;
    zip<U>(other: PromiseLike<Option<U>>): AsyncOption<[T, U]>;
    zip<U>(
        other: Option<U> | PromiseLike<Option<U>>
    ): Option<[T, U]> | AsyncOption<[T, U]>;
    zip<U>(
        other: Option<U> | PromiseLike<Option<U>>
    ): Option<[T, U]> | AsyncOption<[T, U]> {
        if (!isOptionOperand(other)) {
            if (isPromiseLike(other))
                return this.#combineAsync(other, (current, other) =>
                    current.zip(other)
                );
            throw new InvalidArgumentError('Argument must be an Option');
        }

        const state = this.#state;
        if (!isSomeValue(state) || !other._isSome) return None();

        return Some<[T, U]>([state, other.unwrap()]);
    }

    unzip<T, U>(this: OptionImpl<[T, U]>): [Option<T>, Option<U>] {
        const state = this.#state;

        if (!isSomeValue(state)) return [None(), None()];

        const [a, b] = state;
        return [Some(a), Some(b)];
    }

    #combineAsync<U, R>(
        other: PromiseLike<Option<U>>,
        combine: (current: Option<T>, other: Option<U>) => Option<R>
    ): AsyncOption<R> {
        const state = this.#state;
        const current = isSomeValue(state) ? Some(state) : None<T>();
        const resolved = isAsyncOptionOperand(other)
            ? other
            : Promise.resolve(other);
        return new AsyncOptionImpl(
            resolved.then((other) => combine(current, other))
        );
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

        const state = this.#state;
        return isSomeValue(state) ? someHandler(state) : noneHandler();
    }
}

/**
 * Some value of type `T`.
 * @param value The value to be wrapped in a `Some`.
 * @returns An `Option` representing the presence of a value.
 */
export function Some<T>(value: T): Option<T> {
    return new OptionImpl<T>(value);
}

/**
 * No value.
 * @returns An `Option` representing the absence of a value.
 */
export function None<T = never>(): Option<T> {
    return new OptionImpl<T>(noneValue);
}
