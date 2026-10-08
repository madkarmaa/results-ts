import type { Option } from '../option';
import type { Result } from '../result';

export * from './either';

export function isOptionOperand<T>(
    value: Option<T> | PromiseLike<Option<T>>
): value is Option<T> {
    return (
        ((typeof value === 'object' && value !== null) ||
            typeof value === 'function') &&
        '_isSome' in value &&
        typeof value._isSome === 'boolean'
    );
}

export function isResultOperand<T, E>(
    value: Result<T, E> | PromiseLike<Result<T, E>>
): value is Result<T, E> {
    return (
        ((typeof value === 'object' && value !== null) ||
            typeof value === 'function') &&
        '_isOk' in value &&
        typeof value._isOk === 'boolean'
    );
}

// Recognize native promises and structural thenables, including async wrappers.
export function isPromiseLike<T>(
    value: T | PromiseLike<T>
): value is PromiseLike<T> {
    return (
        ((typeof value === 'object' && value !== null) ||
            typeof value === 'function') &&
        'then' in value &&
        typeof value.then === 'function'
    );
}

type BackedAsyncOperand<T> = PromiseLike<T> & {
    readonly promise: PromiseLike<T>;
};

// Recognize the async wrapper layout across realms and duplicate installs.
export function isAsyncOptionOperand<T>(
    value: PromiseLike<Option<T>>
): value is BackedAsyncOperand<Option<T>> {
    return (
        isPromiseLike(value) &&
        'isSome' in value &&
        typeof value.isSome === 'function' &&
        'isNone' in value &&
        typeof value.isNone === 'function' &&
        'promise' in value &&
        isPromiseLike(value.promise)
    );
}

export function isAsyncResultOperand<T, E>(
    value: PromiseLike<Result<T, E>>
): value is BackedAsyncOperand<Result<T, E>> {
    return (
        isPromiseLike(value) &&
        'isOk' in value &&
        typeof value.isOk === 'function' &&
        'isErr' in value &&
        typeof value.isErr === 'function' &&
        'promise' in value &&
        isPromiseLike(value.promise)
    );
}

// Shared, stateless iterator used for the empty `iter()` path (`Err`/`None`).
// Returning this constant instead of entering a generator avoids allocating a
// generator object on every call when there is nothing to yield. Typed as
// `IterableIterator<never>` so it is assignable to `IterableIterator<T>` for any
// `T` without a cast at the call site.
export const EMPTY_ITERATOR: IterableIterator<never> = {
    next(): IteratorResult<never, undefined> {
        return { value: undefined, done: true };
    },

    [Symbol.iterator](): IterableIterator<never> {
        return EMPTY_ITERATOR;
    }
};

// Dedicated iterator for the single-value `iter()` path (`Ok`/`Some`).
// Built as a class so there is no anonymous generator function
// and no generator-protocol overhead: just a flagged one-shot `next()`.
export class OneItemIterator<T> implements IterableIterator<T> {
    #done = false;

    constructor(private readonly value: T) {}

    next(): IteratorResult<T, undefined> {
        if (this.#done) return { value: undefined, done: true };
        this.#done = true;
        return { value: this.value, done: false };
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }
}
