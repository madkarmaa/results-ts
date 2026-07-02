import { describe, expect, test } from 'vitest';
import { Err, Ok, type Result } from '../src/result';
import { tryBlock, tryBlockAsync } from '../src/try-block';

type ParseError = { readonly code: 'PARSE'; readonly input: string };
type LookupError = { readonly code: 'LOOKUP'; readonly id: number };

const parseId = (input: string): Result<number, ParseError> => {
    const value = Number.parseInt(input, 10);
    return Number.isNaN(value) ? Err({ code: 'PARSE', input }) : Ok(value);
};

const lookupName = (id: number): Result<string, LookupError> =>
    id > 0 ? Ok(`user:${id}`) : Err({ code: 'LOOKUP', id });

describe('tryBlock', () => {
    test('returns Ok with the generator return value', () => {
        const result = tryBlock(function* ($) {
            const id = yield* $(parseId('7'));
            const name = yield* $(lookupName(id));

            return { id, name } as const;
        });

        expect(result.unwrap()).toEqual({ id: 7, name: 'user:7' });
    });

    test('returns the first yielded Err', () => {
        const result = tryBlock(function* ($) {
            const id = yield* $(parseId('bad'));
            const name = yield* $(lookupName(id));

            return { id, name } as const;
        });

        expect(result.unwrapErr()).toEqual({ code: 'PARSE', input: 'bad' });
    });

    test('validates yielded values at runtime', () => {
        expect(() =>
            tryBlock(function* (): Generator<
                Result<unknown, unknown>,
                number,
                unknown
            > {
                yield 42 as unknown as Result<unknown, unknown>;
                return 1;
            })
        ).toThrow(TypeError);
    });
});

describe('tryBlockAsync', () => {
    test('returns Ok with the async generator return value', async () => {
        const result = await tryBlockAsync(async function* ($) {
            const id = yield* $(parseId('7'));
            const name = yield* $(Promise.resolve(lookupName(id)));

            return { id, name } as const;
        });

        expect(result.unwrap()).toEqual({ id: 7, name: 'user:7' });
    });

    test('returns the first yielded async Err', async () => {
        const result = await tryBlockAsync(async function* ($) {
            const id = yield* $(parseId('-1'));
            const name = yield* $(Promise.resolve(lookupName(id)));

            return { id, name } as const;
        });

        expect(result.unwrapErr()).toEqual({ code: 'LOOKUP', id: -1 });
    });
});
