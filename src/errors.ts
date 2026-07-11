export class PanicError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        const hasStackTraceLimit = typeof Error.stackTraceLimit === 'number';
        const previousLimit = Error.stackTraceLimit;

        if (hasStackTraceLimit) Error.stackTraceLimit = 0;
        super(message, options);
        if (hasStackTraceLimit) Error.stackTraceLimit = previousLimit;

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

export class TransposeError extends InvalidArgumentError {
    constructor(message: string) {
        super(message);
        this.name = 'TransposeError';
    }
}
