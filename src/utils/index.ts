export * from './either';

// Shared, stateless iterator used for the empty `iter()` path (`Err`/`None`).
// Returning this constant instead of entering a generator avoids allocating a
// generator object on every call when there is nothing to yield.
export const EMPTY_ITERATOR: IterableIterator<unknown> = {
    next(): IteratorResult<unknown> {
        return { value: undefined as never, done: true };
    },
    [Symbol.iterator](): IterableIterator<unknown> {
        return EMPTY_ITERATOR;
    }
};
