import { type ResultError } from './result';

export class PanicError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PanicError';
    }
}

export class InvalidArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidArgumentError';
    }
}

export class FlattenError extends InvalidArgumentError {
    constructor(message: string) {
        super(message);
        this.name = 'FlattenError';
    }
}

export function assertValueIsNotMissing<T>(
    value: T | null | undefined,
    message?: string
): asserts value is T {
    if (value === null || value === undefined)
        throw new InvalidArgumentError(
            message || 'Expected a non-null, non-undefined value'
        );
}

export function assertIsResultError(
    error: unknown
): asserts error is ResultError {
    assertValueIsNotMissing(error, 'Expected an error object');

    if (
        typeof error !== 'object' ||
        error === null ||
        typeof (error as any).code !== 'string'
    )
        throw new InvalidArgumentError(
            "Expected an object with a string 'code' property"
        );
}
