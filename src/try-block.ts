import { Err, Ok, type Result } from './result';
import { isResult } from './utils';

type ErrOf<R> = R extends Result<unknown, infer E> ? E : never;

type Question = <T, E>(
    result: Result<T, E>
) => Generator<Result<never, E>, T, unknown>;

type AsyncQuestion = {
    <T, E>(result: Result<T, E>): Generator<Result<never, E>, T, unknown>;
    <T, E>(
        result: PromiseLike<Result<T, E>>
    ): AsyncGenerator<Result<never, E>, T, unknown>;
};

function* resultQuestion<T, E>(
    result: Result<T, E>
): Generator<Result<never, E>, T, unknown> {
    if (result.isOk()) return result.unwrap();
    yield Err(result.unwrapErr());
    throw new Error('unreachable');
}

async function* asyncResultQuestion<T, E>(
    result: PromiseLike<Result<T, E>>
): AsyncGenerator<Result<never, E>, T, unknown> {
    const awaited = await result;
    if (awaited.isOk()) return awaited.unwrap();
    yield Err(awaited.unwrapErr());
    throw new Error('unreachable');
}

function $<T, E>(result: Result<T, E>): Generator<Result<never, E>, T, unknown>;
function $<T, E>(
    result: PromiseLike<Result<T, E>>
): AsyncGenerator<Result<never, E>, T, unknown>;
function $<T, E>(
    result: Result<T, E> | PromiseLike<Result<T, E>>
):
    | Generator<Result<never, E>, T, unknown>
    | AsyncGenerator<Result<never, E>, T, unknown> {
    if (isResult<T, E>(result)) return resultQuestion(result);
    return asyncResultQuestion(result);
}

export function tryBlock<T, Y extends Result<unknown, unknown>>(
    fn: ($: Question) => Generator<Y, T, unknown>
): Result<T, ErrOf<Y>> {
    const iterator = fn($);
    let state = iterator.next();

    while (!state.done) {
        const result = state.value;
        if (!isResult(result))
            throw new TypeError('tryBlock yielded a non-Result value');
        if (result.isErr()) return Err(result.unwrapErr() as ErrOf<Y>);
        state = iterator.next(result.unwrap());
    }

    return Ok(state.value);
}

export async function tryBlockAsync<T, Y extends Result<unknown, unknown>>(
    fn: ($: AsyncQuestion) => AsyncGenerator<Y, T, unknown>
): Promise<Result<T, ErrOf<Y>>> {
    const iterator = fn($);
    let state = await iterator.next();

    while (!state.done) {
        const result = state.value;
        if (!isResult(result))
            throw new TypeError('tryBlockAsync yielded a non-Result value');
        if (result.isErr()) return Err(result.unwrapErr() as ErrOf<Y>);
        state = await iterator.next(result.unwrap());
    }

    return Ok(state.value);
}
