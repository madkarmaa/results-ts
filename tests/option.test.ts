import { describe, test, expect } from 'vitest';
import { Some, None, type Option } from '../src/option';
import { FlattenError, InvalidArgumentError, PanicError } from '../src/errors';

describe('Option', () => {
    test('construction', () => {
        expect(Some(5)).toBeInstanceOf(Object);
        expect(None()).toBeInstanceOf(Object);
        // @ts-expect-error - Some should not accept null or undefined
        expect(() => Some(null)).toThrow(
            new InvalidArgumentError('Value cannot be null or undefined')
        );
        // @ts-expect-error - Some should not accept null or undefined
        expect(() => Some(undefined)).toThrow(
            new InvalidArgumentError('Value cannot be null or undefined')
        );
    });

    test('isSome', () => {
        expect(Some(5).isSome()).toBe(true);
        expect(None().isSome()).toBe(false);
    });

    test('isSomeAnd', () => {
        expect(Some(5).isSomeAnd((val) => val === 5)).toBe(true);
        expect(Some(5).isSomeAnd((val) => val === 10)).toBe(false);
        expect(None<number>().isSomeAnd((val) => val === 5)).toBe(false);
        const option = Some(Math.random());
        if (option.isSomeAnd((val) => val === 0.5)) {
            option.unwrap() satisfies 0.5;
        }
    });

    test('isNone', () => {
        expect(None().isNone()).toBe(true);
        expect(Some(5).isNone()).toBe(false);
    });

    test('isNoneOr', () => {
        expect(None<number>().isNoneOr((val) => val === 5)).toBe(true);
        expect(Some(5).isNoneOr((val) => val === 5)).toBe(true);
        expect(Some(5).isNoneOr((val) => val === 10)).toBe(false);
    });

    test('expect', () => {
        expect(Some(5).expect('Should not fail')).toBe(5);
        expect(() => None().expect('Value is missing')).toThrow(
            new PanicError('Value is missing')
        );
    });

    test('unwrap', () => {
        expect(Some(5).unwrap()).toBe(5);
        expect(() => None().unwrap()).toThrow(
            new PanicError('called `Option.unwrap()` on a `None` value')
        );
    });

    test('unwrapOr', () => {
        expect(Some(5).unwrapOr(10)).toBe(5);
        expect(None<number>().unwrapOr(10)).toBe(10);
    });

    test('unwrapOrElse', () => {
        expect(Some(5).unwrapOrElse(() => 10)).toBe(5);
        expect(None<number>().unwrapOrElse(() => 10)).toBe(10);
    });

    test('map', () => {
        expect(
            Some(5)
                .map((x) => x * 2)
                .unwrap()
        ).toBe(10);
        expect(
            None<number>()
                .map((x) => x * 2)
                .isNone()
        ).toBe(true);
    });

    test('inspect', () => {
        let val = 0;
        Some(5).inspect((x) => (val = x));
        expect(val).toBe(5);

        let noneVal = 0;
        None<number>().inspect((x) => (noneVal = x));
        expect(noneVal).toBe(0);
    });

    test('mapOr', () => {
        expect(Some(5).mapOr(0, (x) => x * 2)).toBe(10);
        expect(None<number>().mapOr(0, (x) => x * 2)).toBe(0);
    });

    test('mapOrElse', () => {
        expect(
            Some(5).mapOrElse(
                () => 10,
                (x) => x * 2
            )
        ).toBe(10);
        expect(
            None<number>().mapOrElse(
                () => 10,
                (x) => x * 2
            )
        ).toBe(10);
    });

    test('okOr', () => {
        const errObj = { code: 'NOT_FOUND' as const };
        expect(Some(5).okOr(errObj).unwrap()).toBe(5);
        expect(None().okOr(errObj).unwrapErr()).toEqual(errObj);
    });

    test('okOrElse', () => {
        const errObj = { code: 'NOT_FOUND' as const };
        expect(
            Some(5)
                .okOrElse(() => errObj)
                .unwrap()
        ).toBe(5);
        expect(
            None()
                .okOrElse(() => errObj)
                .unwrapErr()
        ).toEqual(errObj);
    });

    test('iter', () => {
        expect([...Some(5).iter()]).toEqual([5]);
        expect([...None().iter()]).toEqual([]);
    });

    test('and', () => {
        expect(Some(5).and(Some(10)).unwrap()).toBe(10);
        expect(Some(5).and(None()).isNone()).toBe(true);
        expect(None().and(Some(10)).isNone()).toBe(true);
    });

    test('andThen', () => {
        expect(
            Some(5)
                .andThen((x) => Some(x * 2))
                .unwrap()
        ).toBe(10);
        expect(
            Some(5)
                .andThen(() => None())
                .isNone()
        ).toBe(true);
        expect(
            None<number>()
                .andThen((x) => Some(x * 2))
                .isNone()
        ).toBe(true);
    });

    test('filter', () => {
        expect(
            Some(5)
                .filter((x) => x > 3)
                .unwrap()
        ).toBe(5);
        expect(
            Some(2)
                .filter((x) => x > 3)
                .isNone()
        ).toBe(true);
        expect(
            None<number>()
                .filter((x) => x > 3)
                .isNone()
        ).toBe(true);
    });

    test('or', () => {
        expect(Some(5).or(Some(10)).unwrap()).toBe(5);
        expect(None().or(Some(10)).unwrap()).toBe(10);
    });

    test('orElse', () => {
        expect(
            Some(5)
                .orElse(() => Some(10))
                .unwrap()
        ).toBe(5);
        expect(
            None()
                .orElse(() => Some(10))
                .unwrap()
        ).toBe(10);
    });

    test('xor', () => {
        expect(Some(5).xor(None()).unwrap()).toBe(5);
        expect(None().xor(Some(10)).unwrap()).toBe(10);
        expect(Some(5).xor(Some(10)).isNone()).toBe(true);
        expect(None().xor(None()).isNone()).toBe(true);
    });

    test('insert', () => {
        const opt = Some(5);
        expect(opt.insert(10)).toBe(10);
        expect(opt.unwrap()).toBe(10);

        const optNone = None<number>();
        expect(optNone.insert(20)).toBe(20);
        expect(optNone.unwrap()).toBe(20);
    });

    test('getOrInsert', () => {
        const opt = None<number>();
        expect(opt.getOrInsert(5)).toBe(5);
        expect(opt.unwrap()).toBe(5);

        const optSome = Some(10);
        expect(optSome.getOrInsert(5)).toBe(10);
        expect(optSome.unwrap()).toBe(10);
    });

    test('getOrInsertWith', () => {
        const opt = None<number>();
        expect(opt.getOrInsertWith(() => 5)).toBe(5);
        expect(opt.unwrap()).toBe(5);

        const optSome = Some(10);
        expect(optSome.getOrInsertWith(() => 5)).toBe(10);
        expect(optSome.unwrap()).toBe(10);
    });

    test('take', () => {
        const opt = Some(5);
        const taken = opt.take();
        expect(taken.unwrap()).toBe(5);
        expect(opt.isNone()).toBe(true);

        const optNone = None<number>();
        expect(optNone.take().isNone()).toBe(true);
    });

    test('takeIf', () => {
        const opt1 = Some(5);
        expect(opt1.takeIf((x) => x > 10).isNone()).toBe(true);
        expect(opt1.unwrap()).toBe(5); // Remained inside

        const opt2 = Some(15);
        expect(opt2.takeIf((x) => x > 10).unwrap()).toBe(15);
        expect(opt2.isNone()).toBe(true); // Extracted
    });

    test('replace', () => {
        const opt = Some(5);
        const old = opt.replace(10);
        expect(old.unwrap()).toBe(5);
        expect(opt.unwrap()).toBe(10);

        const optNone = None<number>();
        const oldNone = optNone.replace(20);
        expect(oldNone.isNone()).toBe(true);
        expect(optNone.unwrap()).toBe(20);
    });

    test('flatten', () => {
        expect(Some(Some(42)).flatten().unwrap()).toBe(42);
        expect(Some(None<number>()).flatten().isNone()).toBe(true);
        expect(
            Some(Some(Some(42)))
                .flatten()
                .flatten()
                .unwrap()
        ).toBe(42);
        expect(None<Option<string>>().flatten().isNone()).toBe(true);
        // @ts-expect-error - flatten should only be called on Option<Option<T>>
        expect(() => Some(42).flatten()).toThrow(FlattenError);
    });

    test('match', () => {
        expect(
            Some(5).match({
                Some: (val) => `Value is ${val}`,
                None: () => 'No value'
            })
        ).toBe('Value is 5');

        expect(
            None<number>().match({
                Some: (val) => `Value is ${val}`,
                None: () => 'No value'
            })
        ).toBe('No value');
    });

    describe('Complex usage tests', () => {
        test('Parsing HTTP query configurations with safe fallbacks', () => {
            interface AppConfig {
                port: number;
                debug: boolean;
            }

            const rawQueryParams: Record<string, string> = { port: '8080' };

            const parseParam = (key: string) =>
                rawQueryParams[key] ? Some(rawQueryParams[key]) : None();

            const portConfig = parseParam('port')
                .map((p) => parseInt(p, 10))
                .filter((p) => !isNaN(p) && p > 0)
                .unwrapOr(3000);

            const debugConfig = parseParam('debug')
                .map((d) => d === 'true')
                .unwrapOrElse(() => false);

            const config: AppConfig = { port: portConfig, debug: debugConfig };

            expect(config.port).toBe(8080);
            expect(config.debug).toBe(false);
        });

        test('Hierarchical configuration lookups with fallbacks', () => {
            const envOverride: Record<string, string> = {};
            const userConfig: Record<string, string> = { theme: 'dark' };
            const defaultConfig: Record<string, string> = {
                theme: 'light',
                language: 'en'
            };

            const lookup = (key: string, dict: Record<string, string>) =>
                dict[key] ? Some(dict[key]) : None();

            const getSetting = (key: string): string =>
                lookup(key, envOverride)
                    .or(lookup(key, userConfig))
                    .or(lookup(key, defaultConfig))
                    .expect(
                        `Mandatory setting ${key} missing from configuration all config sources`
                    );

            expect(getSetting('theme')).toBe('dark');
            expect(getSetting('language')).toBe('en');
            expect(() => getSetting('invalid_key')).toThrow(
                'Mandatory setting invalid_key missing from configuration all config sources'
            );
        });

        test('Tracking state mutations', () => {
            class CacheBuffer<T> {
                #slot: Option<T> = None();

                update(newValue: T): Option<T> {
                    return this.#slot.replace(newValue);
                }

                flushIf(predicate: (val: T) => boolean): Option<T> {
                    return this.#slot.takeIf(predicate);
                }

                get current(): Option<T> {
                    return this.#slot;
                }
            }

            const stringCache = new CacheBuffer<string>();
            expect(stringCache.update('first_event').isNone()).toBe(true);

            const oldVal = stringCache.update('second_event');
            expect(oldVal.unwrap()).toBe('first_event');
            expect(stringCache.current.unwrap()).toBe('second_event');

            expect(
                stringCache.flushIf((val) => val === 'mismatch').isNone()
            ).toBe(true);
            expect(stringCache.current.isSome()).toBe(true);

            const flushed = stringCache.flushIf(
                (val) => val === 'second_event'
            );
            expect(flushed.unwrap()).toBe('second_event');
            expect(stringCache.current.isNone()).toBe(true);
        });
    });
});
