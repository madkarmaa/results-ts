export class PanicError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
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
