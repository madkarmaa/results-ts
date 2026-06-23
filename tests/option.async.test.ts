import { describe, test, expect } from 'vitest';
import { Some, None, type Option } from '../src/option';
import { FlattenError, PanicError } from '../src/errors';

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

    describe('getOrInsertWithAsync resolution cases', () => {
        test('fast path returns existing value', async () => {
            let calls = 0;
            const optSome = Some(10);

            const value = await optSome.getOrInsertWithAsync(async () => {
                calls += 1;
                return 5;
            });

            expect(value).toBe(10);
            expect(optSome.unwrap()).toBe(10);
            expect(calls).toBe(0);
        });

        test('inserts when none and unchanged', async () => {
            const opt = None<number>();
            expect(await opt.getOrInsertWithAsync(async () => 5)).toBe(5);
            expect(opt.unwrap()).toBe(5);

            const optNull = None<number | null>();
            expect(
                await optNull.getOrInsertWithAsync(async () => null)
            ).toBeNull();
            expect(optNull.isSome()).toBe(true);
            expect(optNull.unwrap()).toBeNull();
        });

        test('dedupes concurrent calls on none', async () => {
            let calls = 0;
            const opt = None<number>();
            let resolve!: (value: number) => void;
            const gate = new Promise<number>((res) => {
                resolve = res;
            });

            const first = opt.getOrInsertWithAsync(async () => {
                calls++;
                return gate;
            });
            const second = opt.getOrInsertWithAsync(async () => {
                calls++;
                return gate;
            });

            resolve(42);

            const [firstValue, secondValue] = await Promise.all([
                first,
                second
            ]);

            expect(firstValue).toBe(42);
            expect(secondValue).toBe(42);
            expect(calls).toBe(1);
            expect(opt.unwrap()).toBe(42);
        });

        test('returns latest value after mutation', async () => {
            const opt = None<number>();
            let resolve!: (value: number) => void;
            const gate = new Promise<number>((res) => {
                resolve = res;
            });

            const pending = opt.getOrInsertWithAsync(async () => gate);

            opt.insert(7);
            resolve(42);

            const resolved = await pending;

            expect(resolved).toBe(7);
            expect(opt.unwrap()).toBe(7);
        });

        test('awaits newer pending insert and returns its value', async () => {
            let calls = 0;
            const opt = None<number>();
            let resolveFirst!: (value: number) => void;
            let resolveSecond!: (value: number) => void;
            const gateFirst = new Promise<number>((res) => {
                resolveFirst = res;
            });
            const gateSecond = new Promise<number>((res) => {
                resolveSecond = res;
            });

            const first = opt.getOrInsertWithAsync(async () => {
                calls++;
                return gateFirst;
            });

            opt.take();
            const second = opt.getOrInsertWithAsync(async () => {
                calls++;
                return gateSecond;
            });

            resolveFirst(1);
            resolveSecond(2);

            const [firstValue, secondValue] = await Promise.all([
                first,
                second
            ]);

            expect(secondValue).toBe(2);
            expect(firstValue).toBe(2);
            expect(calls).toBe(2);
            expect(opt.unwrap()).toBe(2);
        });

        test('late resolve inserts when mutation left none', async () => {
            const opt = None<number>();
            let resolve!: (value: number) => void;
            const gate = new Promise<number>((res) => {
                resolve = res;
            });

            const pending = opt.getOrInsertWithAsync(async () => gate);

            opt.take();
            resolve(3);

            const resolved = await pending;

            expect(resolved).toBe(3);
            expect(opt.unwrap()).toBe(3);
        });

        test('inserts again after none reset', async () => {
            let calls = 0;
            const opt = None<number>();

            const first = await opt.getOrInsertWithAsync(async () => {
                calls++;
                return 1;
            });

            expect(first).toBe(1);
            expect(opt.unwrap()).toBe(1);

            const taken = opt.take();
            expect(taken.unwrap()).toBe(1);
            expect(opt.isNone()).toBe(true);

            const second = await opt.getOrInsertWithAsync(async () => {
                calls++;
                return 2;
            });

            expect(second).toBe(2);
            expect(opt.unwrap()).toBe(2);
            expect(calls).toBe(2);
        });
    });

    test('isSome', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.isSome()).toBe(true);
        expect(await none.isSome()).toBe(false);
    });

    test('isSomeAnd', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.isSomeAnd((val) => val === 5)).toBe(true);
        expect(await some.isSomeAnd((val) => val === 10)).toBe(false);
        expect(await none.isSomeAnd((val) => val === 5)).toBe(false);
    });

    test('isNone', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await none.isNone()).toBe(true);
        expect(await some.isNone()).toBe(false);
    });

    test('isNoneOr', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await none.isNoneOr((val) => val === 5)).toBe(true);
        expect(await some.isNoneOr((val) => val === 5)).toBe(true);
        expect(await some.isNoneOr((val) => val === 10)).toBe(false);
    });

    test('expect', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.expect('Should not fail')).toBe(5);
        await expect(none.expect('Value is missing')).rejects.toThrow(
            new PanicError('Value is missing')
        );
    });

    test('unwrap', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.unwrap()).toBe(5);
        await expect(none.unwrap()).rejects.toThrow(
            new PanicError('called `Option.unwrap()` on a `None` value')
        );
    });

    test('unwrapOr', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.unwrapOr(10)).toBe(5);
        expect(await none.unwrapOr(10)).toBe(10);
    });

    test('unwrapOrElse', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.unwrapOrElse(() => 10)).toBe(5);
        expect(await none.unwrapOrElse(() => 10)).toBe(10);
    });

    test('map', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.map((x) => x * 2).unwrap()).toBe(10);
        expect(await none.map((x) => x * 2).isNone()).toBe(true);
    });

    test('inspect', async () => {
        let val = 0;
        const some = Some(5).mapAsync(async (x) => x);
        const inspected = some.inspect((x) => {
            val = x;
        });
        expect(await inspected.unwrap()).toBe(5);
        expect(val).toBe(5);

        let called = false;
        const none = None<number>().mapAsync(async (x) => x);
        await none
            .inspect(() => {
                called = true;
            })
            .isNone();
        expect(called).toBe(false);
    });

    test('mapOr', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.mapOr(0, (x) => x * 2)).toBe(10);
        expect(await none.mapOr(0, (x) => x * 2)).toBe(0);
    });

    test('mapOrElse', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(
            await some.mapOrElse(
                () => 0,
                (x) => x * 2
            )
        ).toBe(10);
        expect(
            await none.mapOrElse(
                () => 0,
                (x) => x * 2
            )
        ).toBe(0);
    });

    test('okOr', async () => {
        const errObj = { code: 'NOT_FOUND' as const };
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.okOr(errObj).unwrap()).toBe(5);
        expect(await none.okOr(errObj).unwrapErr()).toEqual(errObj);
    });

    test('okOrElse', async () => {
        const errObj = { code: 'NOT_FOUND' as const };
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.okOrElse(() => errObj).unwrap()).toBe(5);
        expect(await none.okOrElse(() => errObj).unwrapErr()).toEqual(errObj);
    });

    test('and', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.and(Some(10)).unwrap()).toBe(10);
        expect(await some.and(None()).isNone()).toBe(true);
        expect(await none.and(Some(10)).isNone()).toBe(true);
    });

    test('andThen', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.andThen((x) => Some(x * 2)).unwrap()).toBe(10);
        expect(await some.andThen(() => None()).isNone()).toBe(true);
        expect(await none.andThen((x) => Some(x * 2)).isNone()).toBe(true);
    });

    test('filter', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.filter((x) => x > 3).unwrap()).toBe(5);
        expect(await some.filter((x) => x > 10).isNone()).toBe(true);
        expect(await none.filter((x) => x > 3).isNone()).toBe(true);
    });

    test('or', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.or(Some(10)).unwrap()).toBe(5);
        expect(await none.or(Some(10)).unwrap()).toBe(10);
    });

    test('orElse', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.orElse(() => Some(10)).unwrap()).toBe(5);
        expect(await none.orElse(() => Some(10)).unwrap()).toBe(10);
    });

    test('xor', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(await some.xor(None()).unwrap()).toBe(5);
        expect(await none.xor(Some(10)).unwrap()).toBe(10);
        expect(await some.xor(Some(10)).isNone()).toBe(true);
        expect(await none.xor(None()).isNone()).toBe(true);
    });

    test('flatten', async () => {
        const nested = Some(Some(42)).mapAsync(async (x) => x);
        expect(await nested.flatten().unwrap()).toBe(42);

        const nestedNone = Some(None<number>()).mapAsync(async (x) => x);
        expect(await nestedNone.flatten().isNone()).toBe(true);

        const noneNested = None<Option<number>>().mapAsync(async (x) => x);
        expect(await noneNested.flatten().isNone()).toBe(true);

        const invalid = Some(42).mapAsync(async (x) => x);
        // @ts-expect-error - flatten should only be called on AsyncOption<Option<T>>
        await expect(invalid.flatten().unwrap()).rejects.toThrow(FlattenError);
    });

    test('unzip', async () => {
        const nested = Some<[number, string]>([42, 'hello']).mapAsync(
            async (x) => x
        );
        const [a, b] = nested.unzip();
        expect(await a.unwrap()).toBe(42);
        expect(await b.unwrap()).toBe('hello');

        const noneNested = None<[number, string]>().mapAsync(async (x) => x);
        const [na, nb] = noneNested.unzip();
        expect(await na.isNone()).toBe(true);
        expect(await nb.isNone()).toBe(true);

        const invalid = Some(42).mapAsync(async (x) => x);
        // @ts-expect-error - unzip should only be called on AsyncOption<[T, U]>
        const [rejA, rejB] = invalid.unzip();
        await expect(rejA).rejects.toThrow(TypeError);
        await expect(rejB).rejects.toThrow(TypeError);
    });

    test('match', async () => {
        const some = Some(5).mapAsync(async (x) => x);
        const none = None<number>().mapAsync(async (x) => x);

        expect(
            await some.match({
                Some: (val) => `Value is ${val}`,
                None: () => 'No value'
            })
        ).toBe('Value is 5');

        expect(
            await none.match({
                Some: (val) => `Value is ${val}`,
                None: () => 'No value'
            })
        ).toBe('No value');
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

            const doubled = await Some(4)
                .filterAsync(isEvenAsync)
                .mapAsync(doubleAsync)
                .unwrapOr(0);
            expect(doubled).toBe(8);

            const doubledOdd = await Some(3)
                .filterAsync(isEvenAsync)
                .mapAsync(doubleAsync)
                .unwrapOr(0);
            expect(doubledOdd).toBe(0);
        });

        test('orElseAsync chains with mapAsync on recovered value', async () => {
            const result = await None<number>()
                .orElseAsync(async () => Some(5))
                .mapAsync(async (x) => x * 3)
                .unwrap();
            expect(result).toBe(15);
        });

        test('Round-trip chaining', async () => {
            const someOption = await Some(5)
                .mapAsync(async (x) => x * 2)
                .andThenAsync(async (x) => (x > 10 ? Some(x) : None()))
                .orElseAsync(async () => Some(100))
                .unwrap();
            expect(someOption).toBe(100);

            const noneOption = await Some(5)
                .mapAsync(async (x) => x * 2)
                .andThenAsync(async (x) => (x > 10 ? Some(x) : None()))
                .orElseAsync(async () => None())
                .unwrapOr(50);
            expect(noneOption).toBe(50);
        });
    });
});
