# Benchmarks

clk: ~3.10 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  5.67 ns/iter` | `  3.85 ns` | `  4.82 ns` | ` 32.80 ns` | `159.36 ns` |
| Err(1)         | `  5.95 ns/iter` | `  4.07 ns` | `  5.10 ns` | ` 18.36 ns` | `508.16 ns` |
| Some(1)        | ` 11.28 ns/iter` | `  7.72 ns` | ` 11.47 ns` | ` 77.09 ns` | `211.51 ns` |
| None()         | `  7.32 ns/iter` | `  4.75 ns` | `  7.95 ns` | ` 17.89 ns` | `113.43 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  5.11 ns/iter` | `  1.70 ns` | `  6.99 ns` | `  9.63 ns` | ` 16.58 ns` |
| Err.isOk()          | `  8.48 ns/iter` | `  7.91 ns` | `  9.14 ns` | ` 11.62 ns` | ` 22.15 ns` |
| Ok.isErr()          | `  9.39 ns/iter` | `  8.21 ns` | `  9.46 ns` | ` 12.24 ns` | ` 24.66 ns` |
| Err.isErr()         | `  9.84 ns/iter` | `  9.14 ns` | ` 10.38 ns` | ` 12.89 ns` | ` 28.87 ns` |
| Ok.isOkAnd (true)   | `  5.86 ns/iter` | `  5.17 ns` | `  6.48 ns` | `  9.57 ns` | ` 31.60 ns` |
| Err.isOkAnd         | `  5.36 ns/iter` | `  2.63 ns` | `  6.95 ns` | ` 12.48 ns` | ` 31.53 ns` |
| Ok.isErrAnd         | `  4.57 ns/iter` | `  4.48 ns` | `  4.49 ns` | `  7.50 ns` | ` 14.63 ns` |
| Err.isErrAnd (true) | `  5.32 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  8.51 ns` | ` 15.58 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 14.13 ns/iter` | ` 12.12 ns` | ` 12.91 ns` | ` 72.87 ns` | `117.49 ns` |
| Err.ok()               | ` 12.76 ns/iter` | ` 11.66 ns` | ` 12.14 ns` | ` 37.67 ns` | ` 92.60 ns` |
| Ok.err()               | ` 11.04 ns/iter` | `  9.95 ns` | ` 10.46 ns` | ` 25.39 ns` | ` 95.12 ns` |
| Err.err()              | ` 14.56 ns/iter` | ` 12.90 ns` | ` 13.71 ns` | ` 74.60 ns` | ` 93.89 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 14.25 ns/iter` | ` 12.91 ns` | ` 13.57 ns` | ` 25.19 ns` | ` 95.05 ns` |
| Err.map (reuse)       | `  9.98 ns/iter` | `  9.83 ns` | `  9.84 ns` | ` 12.83 ns` | ` 20.33 ns` |
| Ok.mapOr              | `  6.28 ns/iter` | `  6.06 ns` | `  6.20 ns` | `  8.85 ns` | ` 17.72 ns` |
| Err.mapOr             | `  7.08 ns/iter` | `  6.87 ns` | `  6.99 ns` | `  9.60 ns` | ` 18.47 ns` |
| Ok.mapOrElse          | ` 11.88 ns/iter` | ` 11.05 ns` | ` 11.20 ns` | ` 24.96 ns` | ` 91.64 ns` |
| Err.mapOrElse         | ` 13.39 ns/iter` | ` 12.68 ns` | ` 12.98 ns` | ` 17.59 ns` | ` 94.54 ns` |
| Ok.mapErr (reuse)     | `  9.35 ns/iter` | `  9.11 ns` | `  9.22 ns` | ` 12.03 ns` | ` 18.14 ns` |
| Err.mapErr (alloc)    | ` 14.54 ns/iter` | ` 12.99 ns` | ` 13.62 ns` | ` 45.54 ns` | ` 93.73 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  7.79 ns/iter` | `  7.13 ns` | `  7.43 ns` | ` 11.00 ns` | ` 85.46 ns` |
| Err.inspect               | `  9.25 ns/iter` | `  8.60 ns` | `  8.88 ns` | ` 13.34 ns` | ` 86.26 ns` |
| Ok.inspectErr             | `  6.25 ns/iter` | `  6.02 ns` | `  6.15 ns` | `  8.87 ns` | ` 29.66 ns` |
| Err.inspectErr            | `  8.00 ns/iter` | `  7.13 ns` | `  7.46 ns` | ` 20.64 ns` | ` 97.81 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.21 ns/iter` | `  5.93 ns` | `  6.13 ns` | `  9.04 ns` | ` 22.08 ns` |
| Err.unwrapErr            | `  6.24 ns/iter` | `  5.83 ns` | `  6.08 ns` | ` 11.15 ns` | ` 24.30 ns` |
| Ok.expect                | `  6.20 ns/iter` | `  5.91 ns` | `  6.12 ns` | `  8.93 ns` | ` 23.85 ns` |
| Err.expectErr            | `  9.34 ns/iter` | `  9.11 ns` | `  9.22 ns` | ` 11.91 ns` | ` 18.68 ns` |
| Ok.unwrapOr              | `  6.15 ns/iter` | `  5.95 ns` | `  6.06 ns` | `  8.66 ns` | ` 16.90 ns` |
| Err.unwrapOr             | `  6.46 ns/iter` | `  6.25 ns` | `  6.37 ns` | `  9.08 ns` | ` 14.89 ns` |
| Ok.unwrapOrElse          | `  6.20 ns/iter` | `  5.85 ns` | `  6.13 ns` | `  8.96 ns` | ` 33.03 ns` |
| Err.unwrapOrElse         | `  9.50 ns/iter` | `  8.59 ns` | `  8.95 ns` | ` 21.80 ns` | ` 96.08 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  7.90 ns/iter` | `  7.67 ns` | `  7.78 ns` | ` 10.59 ns` | ` 22.34 ns` |
| Err.and (reuse)        | `  8.19 ns/iter` | `  7.96 ns` | `  8.07 ns` | ` 10.91 ns` | ` 17.48 ns` |
| Ok.andThen (alloc)     | ` 18.85 ns/iter` | ` 16.71 ns` | ` 17.64 ns` | ` 80.34 ns` | `107.41 ns` |
| Err.andThen (alloc)    | `  7.30 ns/iter` | `  7.13 ns` | `  7.14 ns` | ` 11.84 ns` | ` 22.33 ns` |
| Ok.or (reuse)          | `  7.82 ns/iter` | `  7.67 ns` | `  7.68 ns` | ` 10.97 ns` | ` 23.10 ns` |
| Err.or (reuse)         | `  7.80 ns/iter` | `  7.57 ns` | `  7.68 ns` | ` 10.71 ns` | ` 18.22 ns` |
| Ok.orElse (alloc)      | `  6.26 ns/iter` | `  6.03 ns` | `  6.15 ns` | `  9.11 ns` | ` 35.07 ns` |
| Err.orElse (alloc)     | `  8.04 ns/iter` | `  7.13 ns` | `  7.52 ns` | ` 20.37 ns` | ` 97.59 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.42 ns/iter` | ` 10.11 ns` | ` 10.22 ns` | ` 14.94 ns` | ` 25.71 ns` |
| Ok(Some).transpose                     | ` 52.19 ns/iter` | ` 45.90 ns` | ` 49.44 ns` | `128.31 ns` | `260.44 ns` |
| Ok(None).transpose                     | ` 32.42 ns/iter` | ` 28.84 ns` | ` 30.91 ns` | `102.35 ns` | `116.58 ns` |
| Err.transpose                          | ` 31.90 ns/iter` | ` 27.83 ns` | ` 30.19 ns` | `101.16 ns` | `119.44 ns` |
| Ok.match                               | ` 12.79 ns/iter` | ` 12.03 ns` | ` 12.42 ns` | ` 16.77 ns` | ` 98.24 ns` |
| Err.match                              | ` 14.07 ns/iter` | ` 13.32 ns` | ` 13.64 ns` | ` 19.46 ns` | `100.78 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 15.75 ns/iter` | ` 14.03 ns` | ` 14.90 ns` | ` 74.69 ns` | `101.30 ns` |
| Err.iter        | `  7.45 ns/iter` | `  7.28 ns` | `  7.29 ns` | ` 11.50 ns` | ` 24.60 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 19.66 ns/iter` | ` 16.76 ns` | ` 18.00 ns` | ` 86.81 ns` | `141.94 ns` |
| catchUnwind (call only, Ok)    | ` 13.83 ns/iter` | ` 12.55 ns` | ` 13.23 ns` | ` 24.15 ns` | ` 97.45 ns` |
| catchUnwind (wrap + call, Err) | `  1.21 µs/iter` | `  1.10 µs` | `  1.21 µs` | `  1.46 µs` | `  1.49 µs` |
| catchUnwind (call only, catch) | `  1.14 µs/iter` | `905.54 ns` | `  1.17 µs` | `  1.27 µs` | `  1.28 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.24 ns/iter` | `  6.02 ns` | `  6.15 ns` | `  8.71 ns` | ` 15.41 ns` |
| None.isSome()         | `  6.24 ns/iter` | `  6.04 ns` | `  6.15 ns` | `  8.71 ns` | ` 19.08 ns` |
| Some.isNone()         | `  6.23 ns/iter` | `  6.02 ns` | `  6.14 ns` | `  8.68 ns` | ` 16.91 ns` |
| None.isNone()         | `  6.25 ns/iter` | `  6.03 ns` | `  6.15 ns` | `  8.83 ns` | ` 19.54 ns` |
| Some.isSomeAnd (true) | `  6.60 ns/iter` | `  6.36 ns` | `  6.49 ns` | `  9.28 ns` | ` 30.42 ns` |
| None.isSomeAnd        | `  7.18 ns/iter` | `  6.95 ns` | `  7.06 ns` | `  9.90 ns` | ` 31.10 ns` |
| Some.isNoneOr (true)  | `  6.47 ns/iter` | `  6.25 ns` | `  6.38 ns` | `  9.08 ns` | ` 26.38 ns` |
| None.isNoneOr         | `  7.23 ns/iter` | `  6.95 ns` | `  7.06 ns` | ` 12.25 ns` | ` 34.77 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.12 ns/iter` | `  5.83 ns` | `  6.08 ns` | `  8.60 ns` | ` 18.17 ns` |
| Some.expect              | `  6.19 ns/iter` | `  5.75 ns` | `  6.07 ns` | ` 11.40 ns` | ` 22.97 ns` |
| Some.unwrapOr            | `  6.17 ns/iter` | `  5.95 ns` | `  6.06 ns` | `  8.93 ns` | ` 16.09 ns` |
| None.unwrapOr            | `  6.04 ns/iter` | `  5.80 ns` | `  5.93 ns` | `  9.16 ns` | ` 22.09 ns` |
| Some.unwrapOrElse        | `  8.69 ns/iter` | `  7.75 ns` | `  8.12 ns` | ` 23.20 ns` | ` 94.77 ns` |
| None.unwrapOrElse        | `  8.99 ns/iter` | `  8.34 ns` | `  8.62 ns` | ` 14.18 ns` | ` 90.86 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 14.05 ns/iter` | ` 11.55 ns` | ` 13.68 ns` | ` 74.79 ns` | ` 99.41 ns` |
| None.map (alloc)      | ` 13.53 ns/iter` | `  6.88 ns` | ` 13.81 ns` | ` 16.71 ns` | ` 25.02 ns` |
| Some.mapOr            | `  6.56 ns/iter` | `  6.25 ns` | `  6.79 ns` | `  9.52 ns` | ` 32.39 ns` |
| None.mapOr            | `  7.32 ns/iter` | `  7.18 ns` | `  7.18 ns` | ` 10.25 ns` | ` 23.95 ns` |
| Some.mapOrElse        | ` 14.15 ns/iter` | ` 12.95 ns` | ` 13.33 ns` | ` 29.75 ns` | ` 96.93 ns` |
| None.mapOrElse        | ` 15.03 ns/iter` | ` 14.22 ns` | ` 14.72 ns` | ` 20.28 ns` | `103.24 ns` |
| Some.inspect          | ` 10.92 ns/iter` | `  9.44 ns` | ` 10.60 ns` | ` 16.46 ns` | `103.65 ns` |
| None.inspect          | ` 10.16 ns/iter` | `  8.41 ns` | ` 11.07 ns` | ` 25.46 ns` | `128.21 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 11.44 ns/iter` | ` 10.19 ns` | ` 10.92 ns` | ` 18.19 ns` | ` 93.37 ns` |
| None.okOr              | ` 12.47 ns/iter` | ` 11.32 ns` | ` 11.92 ns` | ` 19.67 ns` | ` 95.74 ns` |
| Some.okOrElse          | ` 16.28 ns/iter` | ` 14.69 ns` | ` 15.52 ns` | ` 75.24 ns` | `105.39 ns` |
| None.okOrElse          | ` 17.80 ns/iter` | ` 16.19 ns` | ` 17.01 ns` | ` 75.63 ns` | `101.82 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.22 ns/iter` | `  7.95 ns` | `  8.07 ns` | ` 11.18 ns` | ` 30.27 ns` |
| None.and (alloc)           | `  8.20 ns/iter` | `  7.95 ns` | `  8.07 ns` | ` 10.92 ns` | ` 27.03 ns` |
| Some.andThen (alloc)       | ` 21.32 ns/iter` | ` 18.66 ns` | ` 19.63 ns` | ` 91.65 ns` | `145.36 ns` |
| None.andThen (alloc)       | `  7.31 ns/iter` | `  7.13 ns` | `  7.14 ns` | ` 12.32 ns` | ` 37.70 ns` |
| Some.filter (true, reuse)  | `  8.00 ns/iter` | `  7.06 ns` | `  7.45 ns` | ` 22.56 ns` | ` 96.57 ns` |
| Some.filter (false, alloc) | ` 13.15 ns/iter` | ` 11.58 ns` | ` 12.41 ns` | ` 45.77 ns` | `103.16 ns` |
| None.filter (alloc)        | `  7.19 ns/iter` | `  7.05 ns` | `  7.06 ns` | `  9.90 ns` | ` 37.90 ns` |
| Some.or (reuse)            | `  8.11 ns/iter` | `  7.87 ns` | `  7.99 ns` | ` 10.60 ns` | ` 32.87 ns` |
| None.or (reuse/optb)       | `  8.11 ns/iter` | `  7.98 ns` | `  7.99 ns` | ` 10.92 ns` | ` 18.02 ns` |
| Some.orElse (reuse)        | `  7.18 ns/iter` | `  6.95 ns` | `  7.06 ns` | `  9.74 ns` | ` 37.66 ns` |
| None.orElse (alloc)        | ` 11.33 ns/iter` | ` 10.23 ns` | ` 10.67 ns` | ` 26.73 ns` | ` 95.58 ns` |
| Some xor None (reuse)      | ` 10.00 ns/iter` | `  9.72 ns` | `  9.84 ns` | ` 12.72 ns` | ` 39.42 ns` |
| None xor Some (reuse/optb) | ` 10.63 ns/iter` | ` 10.45 ns` | ` 10.50 ns` | ` 13.45 ns` | ` 21.99 ns` |
| Some xor Some (alloc)      | ` 16.09 ns/iter` | ` 14.41 ns` | ` 15.05 ns` | ` 49.62 ns` | `109.92 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 16.21 ns/iter` | ` 13.65 ns` | ` 15.26 ns` | ` 82.18 ns` | `105.90 ns` |
| None.insert                     | ` 12.99 ns/iter` | ` 11.09 ns` | ` 12.29 ns` | ` 25.22 ns` | ` 99.07 ns` |
| Some.getOrInsert (existing)     | ` 12.75 ns/iter` | ` 11.22 ns` | ` 12.10 ns` | ` 26.84 ns` | `101.31 ns` |
| None.getOrInsert (insert)       | ` 15.95 ns/iter` | ` 14.24 ns` | ` 15.17 ns` | ` 49.52 ns` | `108.59 ns` |
| Some.getOrInsertWith (existing) | ` 20.01 ns/iter` | ` 17.96 ns` | ` 19.03 ns` | ` 89.82 ns` | `106.92 ns` |
| None.getOrInsertWith (insert)   | ` 21.72 ns/iter` | ` 19.61 ns` | ` 20.68 ns` | ` 89.89 ns` | `111.14 ns` |
| Some.take                       | ` 29.04 ns/iter` | ` 25.94 ns` | ` 27.63 ns` | `100.57 ns` | `119.15 ns` |
| None.take                       | ` 21.36 ns/iter` | ` 19.24 ns` | ` 20.32 ns` | ` 89.67 ns` | `117.58 ns` |
| Some.takeIf (true)              | ` 31.44 ns/iter` | ` 27.78 ns` | ` 29.71 ns` | `106.04 ns` | `122.23 ns` |
| Some.takeIf (false)             | ` 27.20 ns/iter` | ` 24.15 ns` | ` 25.70 ns` | `100.17 ns` | `134.01 ns` |
| Some.replace                    | ` 32.49 ns/iter` | ` 29.02 ns` | ` 30.71 ns` | `104.80 ns` | `133.11 ns` |
| None.replace                    | ` 25.57 ns/iter` | ` 23.00 ns` | ` 24.28 ns` | ` 95.66 ns` | `114.95 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  9.44 ns/iter` | `  9.21 ns` | `  9.24 ns` | ` 15.24 ns` | ` 26.27 ns` |
| Some(Ok).transpose                             | ` 50.53 ns/iter` | ` 43.29 ns` | ` 47.69 ns` | `135.16 ns` | `232.93 ns` |
| Some(Err).transpose                            | ` 37.59 ns/iter` | ` 34.17 ns` | ` 35.79 ns` | `111.19 ns` | `127.19 ns` |
| None.transpose                                 | ` 27.33 ns/iter` | ` 24.41 ns` | ` 25.90 ns` | ` 99.88 ns` | `119.56 ns` |
| Some.unzip                                     | ` 44.93 ns/iter` | ` 39.76 ns` | ` 42.57 ns` | `121.18 ns` | `198.93 ns` |
| None.unzip                                     | ` 31.31 ns/iter` | ` 27.44 ns` | ` 29.54 ns` | `107.75 ns` | `128.11 ns` |
| Some.match                                     | ` 15.48 ns/iter` | ` 14.36 ns` | ` 14.96 ns` | ` 21.94 ns` | `105.86 ns` |
| None.match                                     | ` 16.47 ns/iter` | ` 15.33 ns` | ` 15.92 ns` | ` 24.08 ns` | `104.73 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 15.21 ns/iter` | ` 13.12 ns` | ` 14.55 ns` | ` 35.99 ns` | `106.75 ns` |
| None.iter       | `  7.05 ns/iter` | `  6.75 ns` | `  6.99 ns` | `  9.54 ns` | ` 36.35 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `231.22 ns/iter` | `215.74 ns` | `220.43 ns` | `412.64 ns` | `678.56 ns` |
| AsyncResult.unwrap (Err path)    | `224.19 ns/iter` | `214.84 ns` | `219.80 ns` | `311.74 ns` | `423.14 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `165.06 ns/iter` | `157.94 ns` | `162.53 ns` | `247.77 ns` | `323.83 ns` |
| Result.mapOrElseAsync (Err path)    | `167.40 ns/iter` | `160.93 ns` | `165.15 ns` | `245.59 ns` | `262.27 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `174.84 ns/iter` | `168.58 ns` | `173.22 ns` | `257.21 ns` | `291.16 ns` |
| Result.unwrapOrElseAsync (Err path) | `168.53 ns/iter` | `162.51 ns` | `167.38 ns` | `244.87 ns` | `257.52 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `653.27 ns/iter` | `636.54 ns` | `648.28 ns` | `739.71 ns` | `749.46 ns` |
| Err.mapAsync (alloc AsyncResult)        | `418.70 ns/iter` | `404.51 ns` | `415.54 ns` | `511.83 ns` | `563.29 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `420.00 ns/iter` | `407.59 ns` | `417.03 ns` | `508.37 ns` | `521.44 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `648.65 ns/iter` | `632.88 ns` | `642.56 ns` | `738.40 ns` | `743.42 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `654.33 ns/iter` | `634.40 ns` | `647.95 ns` | `761.34 ns` | `819.91 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `406.18 ns/iter` | `393.06 ns` | `402.44 ns` | `505.40 ns` | `571.47 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `409.59 ns/iter` | `395.41 ns` | `406.69 ns` | `499.77 ns` | `512.47 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `646.51 ns/iter` | `626.46 ns` | `643.43 ns` | `746.37 ns` | `839.27 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `579.73 ns/iter` | `563.04 ns` | `575.02 ns` | `669.44 ns` | `697.42 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `424.16 ns/iter` | `410.76 ns` | `419.18 ns` | `526.17 ns` | `588.90 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `430.18 ns/iter` | `416.04 ns` | `426.25 ns` | `528.65 ns` | `543.68 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `580.04 ns/iter` | `561.07 ns` | `575.13 ns` | `678.63 ns` | `712.80 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `383.84 ns/iter` | `374.08 ns` | `380.95 ns` | `474.95 ns` | `500.70 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `718.32 ns/iter` | `696.71 ns` | `711.89 ns` | `822.75 ns` | `856.60 ns` |
| catchUnwindAsync (call only, Ok)       | `720.94 ns/iter` | `700.30 ns` | `715.97 ns` | `830.03 ns` | `900.97 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.26 µs/iter` | `  1.19 µs` | `  1.23 µs` | `  1.94 µs` | `  2.10 µs` |
| catchUnwindAsync (call only, reject)   | `  1.22 µs/iter` | `  1.18 µs` | `  1.22 µs` | `  1.39 µs` | `  1.70 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `232.50 ns/iter` | `222.51 ns` | `231.57 ns` | `317.74 ns` | `448.59 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.60 µs/iter` | `  1.39 µs` | `  1.56 µs` | `  2.17 µs` | `  2.40 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `187.77 ns/iter` | `174.77 ns` | `185.11 ns` | `336.85 ns` | `370.76 ns` |
| Option.mapOrElseAsync (None path)    | `178.84 ns/iter` | `171.81 ns` | `176.70 ns` | `261.35 ns` | `281.66 ns` |
| Option.unwrapOrElseAsync (Some path) | `190.77 ns/iter` | `183.77 ns` | `188.28 ns` | `275.90 ns` | `297.57 ns` |
| Option.unwrapOrElseAsync (None path) | `172.96 ns/iter` | `166.36 ns` | `171.08 ns` | `257.55 ns` | `270.76 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `666.00 ns/iter` | `645.34 ns` | `661.26 ns` | `765.95 ns` | `871.19 ns` |
| None.mapAsync (alloc AsyncOption)         | `426.68 ns/iter` | `412.33 ns` | `423.82 ns` | `520.27 ns` | `525.80 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `653.85 ns/iter` | `637.14 ns` | `648.44 ns` | `746.07 ns` | `754.11 ns` |
| None.inspectAsync (alloc AsyncOption)     | `418.37 ns/iter` | `407.05 ns` | `414.98 ns` | `511.53 ns` | `540.88 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `591.77 ns/iter` | `574.30 ns` | `587.55 ns` | `687.07 ns` | `691.04 ns` |
| None.andThenAsync (alloc AsyncOption)     | `423.03 ns/iter` | `408.52 ns` | `416.66 ns` | `563.95 ns` | `713.21 ns` |
| Some.filterAsync true (alloc AsyncOption) | `639.21 ns/iter` | `620.48 ns` | `633.58 ns` | `749.78 ns` | `832.74 ns` |
| None.filterAsync (alloc AsyncOption)      | `422.99 ns/iter` | `408.56 ns` | `417.52 ns` | `532.36 ns` | `726.63 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `414.32 ns/iter` | `398.96 ns` | `411.39 ns` | `520.51 ns` | `618.18 ns` |
| None.orElseAsync (alloc AsyncOption)      | `574.15 ns/iter` | `556.37 ns` | `568.40 ns` | `670.83 ns` | `861.66 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `418.72 ns/iter` | `406.34 ns` | `414.59 ns` | `521.46 ns` | `545.55 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `639.02 ns/iter` | `622.48 ns` | `634.31 ns` | `734.48 ns` | `745.22 ns` |
| Some.getOrInsertWithAsync (existing)      | `185.76 ns/iter` | `178.54 ns` | `183.17 ns` | `271.93 ns` | `309.90 ns` |
| None.getOrInsertWithAsync (insert)        | `577.89 ns/iter` | `558.82 ns` | `573.07 ns` | `672.05 ns` | `758.85 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `393.70 ns/iter` | `384.82 ns` | `390.95 ns` | `483.49 ns` | `503.03 ns` |
