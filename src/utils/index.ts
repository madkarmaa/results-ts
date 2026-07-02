export * from './either';

import { type Option } from '../option';
import { type Result } from '../result';

export function isOption<T = unknown>(value: unknown): value is Option<T> {
    return (
        typeof value === 'object' &&
        value !== null &&
        '_isSome' in value &&
        typeof value._isSome === 'boolean'
    );
}

export function isResult<T = unknown, E = unknown>(
    value: unknown
): value is Result<T, E> {
    return (
        typeof value === 'object' &&
        value !== null &&
        '_isOk' in value &&
        typeof value._isOk === 'boolean'
    );
}

// Shared, stateless iterator used for the empty `iter()` path (`Err`/`None`).
// Returning this constant instead of entering a generator avoids allocating a
// generator object on every call when there is nothing to yield. Typed as
// `IterableIterator<never>` so it is assignable to `IterableIterator<T>` for any
// `T` without a cast at the call site.
export const EMPTY_ITERATOR: IterableIterator<never> = {
    next(): IteratorResult<never, undefined> {
        return { value: undefined as never, done: true };
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
