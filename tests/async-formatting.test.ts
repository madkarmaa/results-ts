import { describe, expect, expectTypeOf, test, vi } from 'vitest';
import { Some, None } from '../src/option';
import { Ok, Err } from '../src/result';

describe('async toString', () => {
    test.each([
        { input: Some(5), expected: 'Some(5)' },
        { input: None<number>(), expected: 'None' },
        { input: Ok(5), expected: 'Ok(5)' },
        { input: Err('failure'), expected: 'Err(failure)' },
        { input: Some(null), expected: 'Some(null)' },
        { input: Some(undefined), expected: 'Some(undefined)' },
        { input: Ok(null), expected: 'Ok(null)' },
        { input: Ok(undefined), expected: 'Ok(undefined)' },
        { input: Err(null), expected: 'Err(null)' },
        { input: Err(undefined), expected: 'Err(undefined)' }
    ])('formats $expected', async ({ input, expected }) => {
        const text = input.inspectAsync(() => Promise.resolve()).toString();
        expectTypeOf(text).toEqualTypeOf<Promise<string>>();
        expect(await text).toBe(expected);
    });

    test.each([Some(5), Ok(5)])('waits for the source: %s', async (input) => {
        const gate = Promise.withResolvers<void>();
        const inspect = vi.fn(() => gate.promise);
        const wrapper = input.inspectAsync(inspect);
        let settled = false;
        const text = wrapper.toString().then((value) => {
            settled = true;
            return value;
        });
        await vi.waitFor(() => expect(inspect).toHaveBeenCalledOnce());
        expect(settled).toBe(false);
        gate.resolve();
        expect(await text).toBe(input.toString());
    });

    test.each([Some(5), Ok(5)])(
        'propagates source rejection: %s',
        async (input) => {
            const failure = new Error('source failed');
            const wrapper = input.mapAsync(() => Promise.reject(failure));
            await expect(wrapper.toString()).rejects.toBe(failure);
        }
    );

    test.each(['Some', 'Ok', 'Err'])(
        '%s formatting rejects if payload formatting throws',
        async (variant) => {
            const failure = new Error('formatting failed');
            const payload = {
                toString(): string {
                    throw failure;
                }
            };
            const input =
                variant === 'Some'
                    ? Some(payload)
                    : variant === 'Ok'
                      ? Ok(payload)
                      : Err(payload);
            const wrapper = input.inspectAsync(() => Promise.resolve());
            await expect(wrapper.toString()).rejects.toBe(failure);
        }
    );

    test('each call observes the current resolved Option state', async () => {
        const input = Some(5);
        const wrapper = input.inspectAsync(() => Promise.resolve());
        expect(await wrapper.toString()).toBe('Some(5)');
        input.take();
        expect(await wrapper.toString()).toBe('None');
        input.insert(10);
        expect(await wrapper.toString()).toBe('Some(10)');
    });
});
