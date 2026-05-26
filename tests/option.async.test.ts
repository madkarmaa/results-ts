import { describe, test, expect } from 'vitest';
import { Some, None } from '../src/option';

describe('Option async methods', () => {
    test('mapAsync', async () => {
        const opt1 = await Some(5).mapAsync(async (x) => x * 2);
        expect(opt1.unwrap()).toBe(10);

        const opt2 = await None<number>().mapAsync(async (x) => x * 2);
        expect(opt2.isNone()).toBe(true);

        const opt3 = await Some(5).mapAsync(async () => null);
        expect(opt3.unwrap()).toBeNull();

        const opt4 = await Some(5).mapAsync(async () => undefined);
        expect(opt4.unwrap()).toBeUndefined();
    });

    test('mapOrElseAsync', async () => {
        expect(
            await Some(5).mapOrElseAsync(
                async () => 0,
                async (x) => x * 2
            )
        ).toBe(10);

        expect(
            await None<number>().mapOrElseAsync(
                async () => 0,
                async (x) => x * 2
            )
        ).toBe(0);
    });

    test('andThenAsync', async () => {
        const opt1 = await Some(5).andThenAsync(async (x) => Some(x * 2));
        expect(opt1.unwrap()).toBe(10);

        const opt2 = await Some(5).andThenAsync(async () => None());
        expect(opt2.isNone()).toBe(true);

        const opt3 = await None<number>().andThenAsync(async (x) =>
            Some(x * 2)
        );
        expect(opt3.isNone()).toBe(true);
    });

    test('orElseAsync', async () => {
        const opt1 = await Some(5).orElseAsync(async () => Some(10));
        expect(opt1.unwrap()).toBe(5);

        const opt2 = await None<number>().orElseAsync(async () => Some(10));
        expect(opt2.unwrap()).toBe(10);

        const opt3 = await None<number>().orElseAsync(async () => None());
        expect(opt3.isNone()).toBe(true);
    });

    test('inspectAsync', async () => {
        let val = 0;
        const opt1 = await Some(5).inspectAsync(async (x) => {
            val = x;
        });
        expect(val).toBe(5);
        expect(opt1.unwrap()).toBe(5);

        let called = false;
        await None<number>().inspectAsync(async () => {
            called = true;
        });
        expect(called).toBe(false);
    });

    test('filterAsync', async () => {
        const opt1 = await Some(5).filterAsync(async (x) => x > 3);
        expect(opt1.unwrap()).toBe(5);

        const opt2 = await Some(2).filterAsync(async (x) => x > 3);
        expect(opt2.isNone()).toBe(true);

        const opt3 = await None<number>().filterAsync(async (x) => x > 3);
        expect(opt3.isNone()).toBe(true);
    });

    test('okOrElseAsync', async () => {
        const errObj = { code: 'NOT_FOUND' as const };

        const opt1 = await Some(5).okOrElseAsync(async () => errObj);
        expect(opt1.unwrap()).toBe(5);

        const opt2 = await None().okOrElseAsync(async () => errObj);
        expect(opt2.unwrapErr()).toEqual(errObj);
    });

    test('unwrapOrElseAsync', async () => {
        const opt1 = await Some(5).unwrapOrElseAsync(async () => 10);
        expect(opt1).toBe(5);

        const opt2 = await None<number>().unwrapOrElseAsync(async () => 10);
        expect(opt2).toBe(10);
    });

    test('getOrInsertWithAsync', async () => {
        const opt = None<number>();
        expect(await opt.getOrInsertWithAsync(async () => 5)).toBe(5);
        expect(opt.unwrap()).toBe(5);

        const optSome = Some(10);
        expect(await optSome.getOrInsertWithAsync(async () => 5)).toBe(10);
        expect(optSome.unwrap()).toBe(10);

        const optNull = None<number | null>();
        expect(await optNull.getOrInsertWithAsync(async () => null)).toBeNull();
        expect(optNull.isSome()).toBe(true);
        expect(optNull.unwrap()).toBeNull();
    });

    describe('Complex async usage tests', () => {
        test('Async config lookup with fallback chain', async () => {
            const remoteConfig = async (
                key: string
            ): Promise<string | undefined> => {
                const store: Record<string, string> = { theme: 'ocean' };
                return store[key];
            };

            const getSetting = async (key: string): Promise<string> => {
                const remote = await remoteConfig(key);
                return Some(remote)
                    .andThen((v) => (v !== undefined ? Some(v) : None()))
                    .unwrapOr('default');
            };

            expect(await getSetting('theme')).toBe('ocean');
            expect(await getSetting('missing')).toBe('default');
        });

        test('Async filter then transform pipeline', async () => {
            const isEvenAsync = async (x: number) => x % 2 === 0;
            const doubleAsync = async (x: number) => x * 2;

            const filtered = await Some(4).filterAsync(isEvenAsync);
            const doubled = await filtered.mapAsync(doubleAsync);
            expect(doubled.unwrapOr(0)).toBe(8);

            const filteredOdd = await Some(3).filterAsync(isEvenAsync);
            const doubledOdd = await filteredOdd.mapAsync(doubleAsync);
            expect(doubledOdd.unwrapOr(0)).toBe(0);
        });

        test('getOrInsertWithAsync only calls factory once on None', async () => {
            let calls = 0;
            const opt = None<number>();

            const first = await opt.getOrInsertWithAsync(async () => {
                calls++;
                return 42;
            });
            const second = await opt.getOrInsertWithAsync(async () => {
                calls++;
                return 99;
            });

            expect(first).toBe(42);
            expect(second).toBe(42);
            expect(calls).toBe(1);
        });

        test('orElseAsync chains with mapAsync on recovered value', async () => {
            const recovered = await None<number>().orElseAsync(async () =>
                Some(5)
            );
            const mapped = await recovered.mapAsync(async (x) => x * 3);
            expect(mapped.unwrap()).toBe(15);
        });
    });
});
