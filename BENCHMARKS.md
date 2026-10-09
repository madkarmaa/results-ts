# Benchmarks

clk: ~2.74 GHz
cpu: AMD EPYC 9V74 80-Core Processor
runtime: bun 1.4.2 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  7.74 ns/iter` | `  5.69 ns` | `  7.26 ns` | ` 54.39 ns` | ` 88.77 ns` |
| Err(1)         | `  8.33 ns/iter` | `  5.50 ns` | `  8.03 ns` | ` 57.01 ns` | `101.69 ns` |
| Some(1)        | `  5.56 ns/iter` | `  3.09 ns` | `  5.82 ns` | ` 13.86 ns` | ` 86.36 ns` |
| None()         | `  6.49 ns/iter` | `  3.12 ns` | `  8.39 ns` | ` 18.19 ns` | `101.71 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  8.48 ns/iter` | `  7.73 ns` | `  8.46 ns` | ` 12.94 ns` | ` 21.87 ns` |
| Err.isOk()          | `  3.77 ns/iter` | `  2.82 ns` | `  4.03 ns` | `  9.80 ns` | ` 24.56 ns` |
| Ok.isErr()          | ` 10.27 ns/iter` | `  9.10 ns` | ` 10.93 ns` | ` 13.48 ns` | ` 22.70 ns` |
| Err.isErr()         | `  4.25 ns/iter` | `  4.02 ns` | `  4.03 ns` | ` 11.65 ns` | ` 28.14 ns` |
| Ok.isOkAnd (true)   | `  7.23 ns/iter` | `  6.48 ns` | `  7.35 ns` | `  9.53 ns` | ` 28.70 ns` |
| Err.isOkAnd         | `  7.81 ns/iter` | `  7.28 ns` | `  7.76 ns` | `  9.92 ns` | ` 31.95 ns` |
| Ok.isErrAnd         | `  7.45 ns/iter` | `  6.95 ns` | `  7.39 ns` | `  9.58 ns` | ` 25.24 ns` |
| Err.isErrAnd (true) | `  7.60 ns/iter` | `  6.57 ns` | `  7.67 ns` | `  9.87 ns` | ` 26.82 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 10.55 ns/iter` | `  9.03 ns` | ` 10.20 ns` | ` 16.63 ns` | `116.93 ns` |
| Err.ok()               | ` 11.22 ns/iter` | `  9.59 ns` | ` 10.82 ns` | ` 17.69 ns` | ` 93.99 ns` |
| Ok.err()               | ` 10.35 ns/iter` | `  8.83 ns` | ` 10.02 ns` | ` 15.51 ns` | ` 91.80 ns` |
| Err.err()              | ` 10.40 ns/iter` | `  8.88 ns` | ` 10.03 ns` | ` 15.30 ns` | `101.34 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 16.77 ns/iter` | ` 14.44 ns` | ` 16.10 ns` | ` 76.21 ns` | `103.78 ns` |
| Err.map (reuse)       | ` 13.74 ns/iter` | ` 10.36 ns` | ` 15.65 ns` | ` 18.05 ns` | ` 27.46 ns` |
| Ok.mapOr              | `  7.57 ns/iter` | `  6.02 ns` | `  7.51 ns` | ` 10.11 ns` | ` 25.33 ns` |
| Err.mapOr             | `  7.77 ns/iter` | `  7.30 ns` | `  7.68 ns` | ` 11.30 ns` | ` 30.29 ns` |
| Ok.mapOrElse          | ` 13.77 ns/iter` | ` 12.04 ns` | ` 13.29 ns` | ` 22.15 ns` | `142.62 ns` |
| Err.mapOrElse         | ` 14.73 ns/iter` | ` 13.27 ns` | ` 14.37 ns` | ` 19.26 ns` | `113.59 ns` |
| Ok.mapErr (reuse)     | ` 10.15 ns/iter` | `  9.57 ns` | ` 10.11 ns` | ` 12.44 ns` | ` 24.02 ns` |
| Err.mapErr (alloc)    | ` 19.14 ns/iter` | ` 14.74 ns` | ` 18.04 ns` | ` 77.62 ns` | `396.17 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.84 ns/iter` | `  7.54 ns` | `  8.58 ns` | ` 12.24 ns` | ` 88.57 ns` |
| Err.inspect               | `  9.99 ns/iter` | `  8.65 ns` | `  9.61 ns` | ` 15.63 ns` | `117.05 ns` |
| Ok.inspectErr             | `  5.16 ns/iter` | `  4.80 ns` | `  4.83 ns` | `  7.45 ns` | ` 21.12 ns` |
| Err.inspectErr            | `  8.34 ns/iter` | `  7.22 ns` | `  7.96 ns` | ` 14.20 ns` | `182.01 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.58 ns/iter` | `  5.94 ns` | `  6.72 ns` | ` 10.19 ns` | ` 30.70 ns` |
| Err.unwrapErr            | `  4.51 ns/iter` | `  4.37 ns` | `  4.38 ns` | `  7.97 ns` | ` 73.09 ns` |
| Ok.expect                | `  6.15 ns/iter` | `  5.41 ns` | `  6.64 ns` | `  8.73 ns` | ` 15.07 ns` |
| Err.expectErr            | `  9.35 ns/iter` | `  9.07 ns` | `  9.34 ns` | ` 11.55 ns` | ` 24.17 ns` |
| Ok.unwrapOr              | `  7.19 ns/iter` | `  6.63 ns` | `  7.34 ns` | ` 10.42 ns` | ` 35.64 ns` |
| Err.unwrapOr             | `  9.18 ns/iter` | `  8.39 ns` | `  9.08 ns` | ` 11.38 ns` | ` 18.48 ns` |
| Ok.unwrapOrElse          | `  5.51 ns/iter` | `  5.41 ns` | `  5.43 ns` | `  7.68 ns` | ` 21.27 ns` |
| Err.unwrapOrElse         | `  9.09 ns/iter` | `  8.23 ns` | `  8.85 ns` | ` 14.11 ns` | ` 93.05 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | ` 11.54 ns/iter` | ` 11.34 ns` | ` 11.40 ns` | ` 13.88 ns` | ` 42.08 ns` |
| Err.and (reuse)        | `  7.61 ns/iter` | `  7.50 ns` | `  7.52 ns` | `  9.76 ns` | ` 19.69 ns` |
| Ok.andThen (alloc)     | ` 20.00 ns/iter` | ` 17.48 ns` | ` 19.14 ns` | ` 81.29 ns` | ` 96.18 ns` |
| Err.andThen (alloc)    | `  6.93 ns/iter` | `  6.81 ns` | `  6.82 ns` | `  9.24 ns` | ` 32.96 ns` |
| Ok.or (reuse)          | ` 11.22 ns/iter` | ` 10.99 ns` | ` 11.09 ns` | ` 13.47 ns` | ` 35.25 ns` |
| Err.or (reuse)         | `  7.61 ns/iter` | `  7.51 ns` | `  7.53 ns` | `  9.78 ns` | ` 17.66 ns` |
| Ok.orElse (alloc)      | `  5.93 ns/iter` | `  5.85 ns` | `  5.86 ns` | `  8.00 ns` | ` 20.56 ns` |
| Err.orElse (alloc)     | `  7.85 ns/iter` | `  6.94 ns` | `  7.68 ns` | ` 12.56 ns` | ` 96.06 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  7.41 ns/iter` | `  7.17 ns` | `  7.36 ns` | `  9.59 ns` | ` 21.21 ns` |
| Ok(Some).transpose                     | ` 33.39 ns/iter` | ` 26.71 ns` | ` 32.54 ns` | `101.17 ns` | `117.32 ns` |
| Ok(None).transpose                     | ` 24.80 ns/iter` | ` 20.07 ns` | ` 24.80 ns` | ` 90.48 ns` | `107.39 ns` |
| Err.transpose                          | ` 24.92 ns/iter` | ` 20.49 ns` | ` 24.59 ns` | ` 90.27 ns` | `106.77 ns` |
| Ok.match                               | ` 13.01 ns/iter` | ` 11.77 ns` | ` 12.63 ns` | ` 18.15 ns` | `107.30 ns` |
| Err.match                              | ` 13.79 ns/iter` | ` 12.69 ns` | ` 13.49 ns` | ` 19.07 ns` | `117.64 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 16.84 ns/iter` | ` 13.49 ns` | ` 17.29 ns` | ` 77.90 ns` | `114.87 ns` |
| Err.iter        | `  6.56 ns/iter` | `  6.46 ns` | `  6.47 ns` | `  8.73 ns` | ` 20.69 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 27.67 ns/iter` | ` 19.17 ns` | ` 24.63 ns` | ` 95.93 ns` | `517.85 ns` |
| catchUnwind (call only, Ok)    | ` 15.78 ns/iter` | ` 13.54 ns` | ` 15.09 ns` | ` 70.40 ns` | `171.12 ns` |
| catchUnwind (wrap + call, Err) | `  1.02 µs/iter` | `963.76 ns` | `  1.00 µs` | `  1.46 µs` | `  1.50 µs` |
| catchUnwind (call only, catch) | `960.09 ns/iter` | `857.34 ns` | `960.95 ns` | `  1.07 µs` | `  1.11 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  4.82 ns/iter` | `  4.72 ns` | `  4.73 ns` | `  6.93 ns` | ` 12.73 ns` |
| None.isSome()         | `  4.97 ns/iter` | `  4.72 ns` | `  5.13 ns` | `  7.11 ns` | ` 13.23 ns` |
| Some.isNone()         | `  4.80 ns/iter` | `  4.71 ns` | `  4.73 ns` | `  6.89 ns` | ` 12.80 ns` |
| None.isNone()         | `  4.78 ns/iter` | `  4.71 ns` | `  4.72 ns` | `  6.83 ns` | ` 14.32 ns` |
| Some.isSomeAnd (true) | `  4.94 ns/iter` | `  4.80 ns` | `  4.81 ns` | `  7.04 ns` | ` 21.24 ns` |
| None.isSomeAnd        | `  6.21 ns/iter` | `  6.11 ns` | `  6.12 ns` | `  8.42 ns` | ` 28.59 ns` |
| Some.isNoneOr (true)  | `  4.95 ns/iter` | `  4.80 ns` | `  4.82 ns` | `  7.15 ns` | ` 20.50 ns` |
| None.isNoneOr         | `  6.19 ns/iter` | `  6.11 ns` | `  6.12 ns` | `  8.26 ns` | ` 18.21 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  5.15 ns/iter` | `  4.37 ns` | `  5.12 ns` | `  7.23 ns` | ` 14.04 ns` |
| Some.expect              | `  5.14 ns/iter` | `  4.37 ns` | `  5.11 ns` | `  7.33 ns` | ` 20.38 ns` |
| Some.unwrapOr            | `  5.13 ns/iter` | `  4.37 ns` | `  5.11 ns` | `  7.22 ns` | ` 11.97 ns` |
| None.unwrapOr            | `  5.94 ns/iter` | `  5.85 ns` | `  5.86 ns` | `  8.11 ns` | ` 23.94 ns` |
| Some.unwrapOrElse        | `  5.16 ns/iter` | `  4.37 ns` | `  5.12 ns` | `  7.24 ns` | ` 24.74 ns` |
| None.unwrapOrElse        | ` 10.97 ns/iter` | ` 10.06 ns` | ` 10.70 ns` | ` 16.08 ns` | ` 93.75 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | `  8.71 ns/iter` | `  7.10 ns` | `  8.63 ns` | ` 13.56 ns` | ` 91.41 ns` |
| None.map (alloc)      | `  6.21 ns/iter` | `  6.11 ns` | `  6.12 ns` | `  8.44 ns` | ` 26.67 ns` |
| Some.mapOr            | `  4.79 ns/iter` | `  4.71 ns` | `  4.73 ns` | `  6.90 ns` | ` 20.55 ns` |
| None.mapOr            | `  5.86 ns/iter` | `  5.76 ns` | `  5.77 ns` | `  7.93 ns` | ` 19.00 ns` |
| Some.mapOrElse        | `  4.79 ns/iter` | `  4.71 ns` | `  4.73 ns` | `  6.79 ns` | ` 26.32 ns` |
| None.mapOrElse        | `  8.23 ns/iter` | `  7.19 ns` | `  7.98 ns` | ` 14.24 ns` | ` 95.28 ns` |
| Some.inspect          | `  7.70 ns/iter` | `  6.28 ns` | `  7.58 ns` | ` 11.51 ns` | ` 94.42 ns` |
| None.inspect          | `  6.83 ns/iter` | `  5.96 ns` | `  6.74 ns` | ` 10.04 ns` | ` 87.86 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 11.71 ns/iter` | `  9.07 ns` | ` 11.24 ns` | ` 28.88 ns` | ` 93.16 ns` |
| None.okOr              | ` 13.20 ns/iter` | ` 10.74 ns` | ` 12.63 ns` | ` 33.85 ns` | `101.23 ns` |
| Some.okOrElse          | ` 11.75 ns/iter` | `  9.85 ns` | ` 11.23 ns` | ` 33.37 ns` | ` 93.16 ns` |
| None.okOrElse          | ` 16.88 ns/iter` | ` 13.98 ns` | ` 16.09 ns` | ` 86.47 ns` | `105.88 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  9.04 ns/iter` | `  8.90 ns` | `  8.91 ns` | ` 11.35 ns` | ` 28.34 ns` |
| None.and (alloc)           | `  5.15 ns/iter` | `  5.06 ns` | `  5.08 ns` | `  7.36 ns` | ` 14.36 ns` |
| Some.andThen (alloc)       | ` 16.76 ns/iter` | ` 14.28 ns` | ` 16.21 ns` | ` 31.78 ns` | `100.77 ns` |
| None.andThen (alloc)       | `  5.86 ns/iter` | `  5.76 ns` | `  5.77 ns` | `  7.93 ns` | ` 33.28 ns` |
| Some.filter (true, reuse)  | `  7.82 ns/iter` | `  6.44 ns` | `  7.75 ns` | ` 10.80 ns` | `107.61 ns` |
| Some.filter (false, alloc) | ` 12.27 ns/iter` | `  9.65 ns` | ` 11.76 ns` | ` 30.30 ns` | ` 96.69 ns` |
| None.filter (alloc)        | `  4.80 ns/iter` | `  4.72 ns` | `  4.73 ns` | `  6.87 ns` | ` 20.69 ns` |
| Some.or (reuse)            | `  9.04 ns/iter` | `  8.90 ns` | `  8.91 ns` | ` 11.67 ns` | ` 25.08 ns` |
| None.or (reuse/optb)       | `  5.14 ns/iter` | `  5.06 ns` | `  5.08 ns` | `  7.23 ns` | ` 14.77 ns` |
| Some.orElse (reuse)        | `  5.16 ns/iter` | `  5.06 ns` | `  5.08 ns` | `  7.29 ns` | ` 18.84 ns` |
| None.orElse (alloc)        | `  9.70 ns/iter` | `  8.78 ns` | `  9.51 ns` | ` 13.12 ns` | ` 93.60 ns` |
| Some xor None (reuse)      | `  9.38 ns/iter` | `  9.25 ns` | `  9.26 ns` | ` 11.69 ns` | ` 21.40 ns` |
| None xor Some (reuse/optb) | `  5.50 ns/iter` | `  5.41 ns` | `  5.42 ns` | `  7.56 ns` | ` 22.24 ns` |
| Some xor Some (alloc)      | ` 13.40 ns/iter` | ` 11.93 ns` | ` 13.10 ns` | ` 20.49 ns` | `104.27 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | `  5.13 ns/iter` | `  4.37 ns` | `  5.14 ns` | `  8.73 ns` | ` 33.85 ns` |
| None.insert                     | `  5.16 ns/iter` | `  4.37 ns` | `  5.13 ns` | `  7.28 ns` | ` 24.77 ns` |
| Some.getOrInsert (existing)     | `  4.85 ns/iter` | `  4.72 ns` | `  4.73 ns` | `  6.90 ns` | ` 35.20 ns` |
| None.getOrInsert (insert)       | ` 14.83 ns/iter` | ` 12.75 ns` | ` 13.97 ns` | ` 67.61 ns` | `120.07 ns` |
| Some.getOrInsertWith (existing) | ` 15.55 ns/iter` | ` 13.44 ns` | ` 15.01 ns` | ` 33.98 ns` | `104.85 ns` |
| None.getOrInsertWith (insert)   | ` 15.43 ns/iter` | ` 13.56 ns` | ` 14.88 ns` | ` 28.61 ns` | ` 98.58 ns` |
| Some.take                       | ` 15.97 ns/iter` | ` 13.22 ns` | ` 15.91 ns` | ` 79.49 ns` | `104.40 ns` |
| None.take                       | ` 17.33 ns/iter` | ` 13.82 ns` | ` 16.98 ns` | ` 78.04 ns` | `220.91 ns` |
| Some.takeIf (true)              | ` 20.69 ns/iter` | ` 16.95 ns` | ` 20.23 ns` | ` 90.14 ns` | `109.73 ns` |
| Some.takeIf (false)             | ` 20.31 ns/iter` | ` 16.49 ns` | ` 19.81 ns` | ` 88.23 ns` | `103.35 ns` |
| Some.replace                    | `  8.55 ns/iter` | `  7.02 ns` | `  8.48 ns` | ` 13.28 ns` | `102.10 ns` |
| None.replace                    | ` 14.09 ns/iter` | ` 10.86 ns` | ` 14.38 ns` | ` 78.97 ns` | `102.16 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  5.16 ns/iter` | `  5.06 ns` | `  5.08 ns` | `  7.58 ns` | ` 14.93 ns` |
| Some(Ok).transpose                             | ` 38.09 ns/iter` | ` 30.70 ns` | ` 36.86 ns` | `112.77 ns` | `125.42 ns` |
| Some(Err).transpose                            | ` 33.74 ns/iter` | ` 28.94 ns` | ` 32.65 ns` | `106.45 ns` | `141.29 ns` |
| None.transpose                                 | ` 24.42 ns/iter` | ` 19.70 ns` | ` 24.02 ns` | ` 93.18 ns` | `111.91 ns` |
| Some.unzip                                     | ` 28.16 ns/iter` | ` 23.31 ns` | ` 27.29 ns` | ` 99.09 ns` | `114.07 ns` |
| None.unzip                                     | ` 26.13 ns/iter` | ` 21.59 ns` | ` 25.41 ns` | ` 95.88 ns` | `120.99 ns` |
| Some.match                                     | ` 14.59 ns/iter` | ` 12.98 ns` | ` 14.16 ns` | ` 20.63 ns` | `101.97 ns` |
| None.match                                     | ` 15.72 ns/iter` | ` 14.05 ns` | ` 15.23 ns` | ` 26.24 ns` | `103.76 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 12.39 ns/iter` | `  9.71 ns` | ` 12.37 ns` | ` 18.61 ns` | `102.96 ns` |
| None.iter       | `  5.86 ns/iter` | `  5.76 ns` | `  5.77 ns` | `  8.00 ns` | ` 23.71 ns` |

| • Async Result - terminal unwrap       | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)           | `160.70 ns/iter` | `152.40 ns` | `158.43 ns` | `243.10 ns` | `272.82 ns` |
| AsyncResult.unwrapErr (Err path)       | `162.10 ns/iter` | `152.97 ns` | `159.42 ns` | `245.39 ns` | `347.16 ns` |
| AsyncResult.unwrap (Err path -> panic) | `  1.28 µs/iter` | `  1.15 µs` | `  1.19 µs` | `  2.03 µs` | `  2.06 µs` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `132.65 ns/iter` | `123.71 ns` | `130.11 ns` | `218.50 ns` | `339.89 ns` |
| Result.mapOrElseAsync (Err path)    | `133.79 ns/iter` | `126.08 ns` | `132.41 ns` | `217.35 ns` | `249.24 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `139.14 ns/iter` | `131.93 ns` | `138.04 ns` | `220.52 ns` | `233.62 ns` |
| Result.unwrapOrElseAsync (Err path) | `140.34 ns/iter` | `134.19 ns` | `139.43 ns` | `218.33 ns` | `235.11 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `459.15 ns/iter` | `444.54 ns` | `454.11 ns` | `546.40 ns` | `549.79 ns` |
| Err.mapAsync (alloc AsyncResult)        | `273.24 ns/iter` | `262.80 ns` | `270.83 ns` | `363.49 ns` | `371.13 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `273.02 ns/iter` | `262.00 ns` | `270.53 ns` | `362.03 ns` | `373.58 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `453.88 ns/iter` | `437.71 ns` | `449.60 ns` | `544.26 ns` | `552.47 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `468.70 ns/iter` | `453.25 ns` | `464.66 ns` | `568.16 ns` | `590.21 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `267.31 ns/iter` | `256.18 ns` | `264.50 ns` | `357.09 ns` | `374.77 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `265.55 ns/iter` | `256.40 ns` | `264.07 ns` | `360.78 ns` | `397.04 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `468.43 ns/iter` | `451.75 ns` | `465.15 ns` | `559.25 ns` | `582.98 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `413.60 ns/iter` | `395.72 ns` | `408.96 ns` | `505.82 ns` | `606.40 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `271.96 ns/iter` | `261.64 ns` | `269.53 ns` | `364.75 ns` | `410.47 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `267.84 ns/iter` | `256.75 ns` | `265.40 ns` | `355.10 ns` | `365.74 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `412.13 ns/iter` | `393.11 ns` | `407.70 ns` | `507.61 ns` | `593.78 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `253.17 ns/iter` | `245.70 ns` | `251.13 ns` | `343.86 ns` | `359.94 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `506.14 ns/iter` | `487.86 ns` | `499.33 ns` | `601.72 ns` | `736.36 ns` |
| catchUnwindAsync (call only, Ok)       | `494.91 ns/iter` | `478.52 ns` | `490.29 ns` | `584.85 ns` | `593.20 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.05 µs/iter` | `964.87 ns` | `  1.03 µs` | `  1.74 µs` | `  1.82 µs` |
| catchUnwindAsync (call only, reject)   | `  1.01 µs/iter` | `955.52 ns` | `  1.02 µs` | `  1.13 µs` | `  1.17 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `165.56 ns/iter` | `158.66 ns` | `164.49 ns` | `249.09 ns` | `294.51 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.26 µs/iter` | `  1.08 µs` | `  1.14 µs` | `  1.95 µs` | `  1.99 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `139.35 ns/iter` | `131.62 ns` | `137.60 ns` | `221.20 ns` | `230.44 ns` |
| Option.mapOrElseAsync (None path)    | `140.39 ns/iter` | `133.07 ns` | `138.81 ns` | `222.90 ns` | `235.38 ns` |
| Option.unwrapOrElseAsync (Some path) | `142.16 ns/iter` | `134.84 ns` | `141.34 ns` | `227.95 ns` | `248.73 ns` |
| Option.unwrapOrElseAsync (None path) | `134.55 ns/iter` | `127.62 ns` | `133.25 ns` | `219.46 ns` | `228.92 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `448.27 ns/iter` | `431.65 ns` | `443.46 ns` | `543.73 ns` | `638.36 ns` |
| None.mapAsync (alloc AsyncOption)         | `287.70 ns/iter` | `277.28 ns` | `285.34 ns` | `384.97 ns` | `425.08 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `464.34 ns/iter` | `449.05 ns` | `461.03 ns` | `552.24 ns` | `566.11 ns` |
| None.inspectAsync (alloc AsyncOption)     | `265.32 ns/iter` | `255.58 ns` | `262.49 ns` | `355.98 ns` | `363.33 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `402.15 ns/iter` | `386.77 ns` | `398.18 ns` | `498.44 ns` | `606.37 ns` |
| None.andThenAsync (alloc AsyncOption)     | `270.28 ns/iter` | `259.33 ns` | `267.23 ns` | `363.40 ns` | `426.33 ns` |
| Some.filterAsync true (alloc AsyncOption) | `449.58 ns/iter` | `433.26 ns` | `445.77 ns` | `539.56 ns` | `581.73 ns` |
| None.filterAsync (alloc AsyncOption)      | `271.08 ns/iter` | `261.72 ns` | `269.19 ns` | `361.30 ns` | `369.57 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `263.76 ns/iter` | `254.47 ns` | `261.48 ns` | `349.80 ns` | `363.11 ns` |
| None.orElseAsync (alloc AsyncOption)      | `388.72 ns/iter` | `374.69 ns` | `385.77 ns` | `482.60 ns` | `504.86 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `272.47 ns/iter` | `259.31 ns` | `270.36 ns` | `366.19 ns` | `426.51 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `443.51 ns/iter` | `429.22 ns` | `439.25 ns` | `544.14 ns` | `640.31 ns` |
| Some.getOrInsertWithAsync (existing)      | `141.35 ns/iter` | `133.72 ns` | `139.92 ns` | `226.99 ns` | `255.78 ns` |
| None.getOrInsertWithAsync (insert)        | `410.00 ns/iter` | `394.85 ns` | `406.01 ns` | `502.44 ns` | `553.13 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `251.15 ns/iter` | `243.72 ns` | `249.83 ns` | `341.84 ns` | `354.63 ns` |

| • Option - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.and some sync + sync          | `  5.29 ns/iter` | `  4.56 ns` | `  5.16 ns` | ` 10.42 ns` | ` 18.84 ns` |
| Option.and some sync + async         | `341.39 ns/iter` | `325.04 ns` | `334.39 ns` | `536.56 ns` | `637.08 ns` |
| Option.and some async + sync         | `313.52 ns/iter` | `299.57 ns` | `307.07 ns` | `513.84 ns` | `553.23 ns` |
| Option.and some async + async        | `509.65 ns/iter` | `486.42 ns` | `505.23 ns` | `683.72 ns` | `922.52 ns` |
| Option.or some sync + sync           | `  6.03 ns/iter` | `  5.68 ns` | `  5.95 ns` | `  8.20 ns` | ` 15.40 ns` |
| Option.or some sync + async          | `345.75 ns/iter` | `324.85 ns` | `335.91 ns` | `618.43 ns` | `655.59 ns` |
| Option.or some async + sync          | `319.46 ns/iter` | `307.41 ns` | `315.47 ns` | `412.93 ns` | `580.85 ns` |
| Option.or some async + async         | `515.60 ns/iter` | `485.55 ns` | `510.44 ns` | `790.91 ns` | `990.03 ns` |
| Option.xor some sync + sync          | ` 15.39 ns/iter` | `  9.80 ns` | ` 15.24 ns` | ` 20.29 ns` | `117.52 ns` |
| Option.xor some sync + async         | `356.14 ns/iter` | `336.87 ns` | `344.73 ns` | `630.24 ns` | `676.88 ns` |
| Option.xor some async + sync         | `329.00 ns/iter` | `315.09 ns` | `323.43 ns` | `432.04 ns` | `611.95 ns` |
| Option.xor some async + async        | `533.24 ns/iter` | `507.69 ns` | `535.83 ns` | `643.68 ns` | `726.58 ns` |
| Option.zip some sync + sync          | ` 17.85 ns/iter` | ` 12.72 ns` | ` 17.06 ns` | ` 50.66 ns` | `202.04 ns` |
| Option.zip some sync + async         | `363.58 ns/iter` | `342.47 ns` | `353.79 ns` | `633.31 ns` | `764.85 ns` |
| Option.zip some async + sync         | `337.05 ns/iter` | `317.49 ns` | `331.96 ns` | `517.77 ns` | `641.40 ns` |
| Option.zip some async + async        | `525.96 ns/iter` | `503.89 ns` | `525.17 ns` | `631.85 ns` | `663.19 ns` |
| Option.and none sync + sync          | `  5.93 ns/iter` | `  5.33 ns` | `  5.94 ns` | `  9.40 ns` | ` 16.44 ns` |
| Option.and none sync + async         | `351.25 ns/iter` | `336.59 ns` | `346.29 ns` | `448.58 ns` | `556.62 ns` |
| Option.and none async + sync         | `316.15 ns/iter` | `304.22 ns` | `312.52 ns` | `405.58 ns` | `427.68 ns` |
| Option.and none async + async        | `525.58 ns/iter` | `495.46 ns` | `521.94 ns` | `770.31 ns` | `975.89 ns` |
| Option.or none sync + sync           | `  5.99 ns/iter` | `  5.33 ns` | `  5.94 ns` | ` 12.26 ns` | ` 21.37 ns` |
| Option.or none sync + async          | `351.82 ns/iter` | `335.36 ns` | `348.62 ns` | `456.09 ns` | `649.18 ns` |
| Option.or none async + sync          | `317.51 ns/iter` | `303.74 ns` | `313.35 ns` | `429.59 ns` | `635.31 ns` |
| Option.or none async + async         | `536.14 ns/iter` | `504.20 ns` | `529.41 ns` | `919.24 ns` | `  1.00 µs` |
| Option.xor none sync + sync          | `  6.06 ns/iter` | `  5.77 ns` | `  5.78 ns` | ` 13.85 ns` | ` 26.09 ns` |
| Option.xor none sync + async         | `351.82 ns/iter` | `331.51 ns` | `351.14 ns` | `478.05 ns` | `589.73 ns` |
| Option.xor none async + sync         | `319.24 ns/iter` | `302.41 ns` | `313.63 ns` | `549.03 ns` | `642.55 ns` |
| Option.xor none async + async        | `630.09 ns/iter` | `502.81 ns` | `678.19 ns` | `  1.01 µs` | `  1.24 µs` |
| Option.zip none sync + sync          | ` 10.53 ns/iter` | `  8.14 ns` | `  9.94 ns` | ` 22.62 ns` | `214.87 ns` |
| Option.zip none sync + async         | `360.08 ns/iter` | `341.22 ns` | `356.59 ns` | `457.30 ns` | `499.46 ns` |
| Option.zip none async + sync         | `346.38 ns/iter` | `323.02 ns` | `341.91 ns` | `448.04 ns` | `587.78 ns` |
| Option.zip none async + async        | `540.04 ns/iter` | `510.98 ns` | `542.96 ns` | `663.29 ns` | `743.20 ns` |

| • Result - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.and ok sync + sync            | `  7.65 ns/iter` | `  7.42 ns` | `  7.43 ns` | ` 14.31 ns` | ` 21.13 ns` |
| Result.and ok sync + async           | `335.20 ns/iter` | `321.77 ns` | `331.31 ns` | `432.28 ns` | `673.57 ns` |
| Result.and ok async + sync           | `326.08 ns/iter` | `313.39 ns` | `322.05 ns` | `424.37 ns` | `567.58 ns` |
| Result.and ok async + async          | `520.94 ns/iter` | `488.58 ns` | `516.48 ns` | `751.28 ns` | `927.71 ns` |
| Result.or ok sync + sync             | `  8.62 ns/iter` | `  7.11 ns` | `  8.39 ns` | ` 17.81 ns` | ` 26.40 ns` |
| Result.or ok sync + async            | `334.79 ns/iter` | `321.05 ns` | `329.68 ns` | `431.91 ns` | `699.34 ns` |
| Result.or ok async + sync            | `331.76 ns/iter` | `317.44 ns` | `326.81 ns` | `436.59 ns` | `668.32 ns` |
| Result.or ok async + async           | `507.00 ns/iter` | `488.29 ns` | `510.31 ns` | `605.18 ns` | `624.62 ns` |
| Result.and err sync + sync           | `  8.57 ns/iter` | `  8.38 ns` | `  8.39 ns` | ` 12.71 ns` | ` 23.83 ns` |
| Result.and err sync + async          | `331.87 ns/iter` | `320.91 ns` | `328.80 ns` | `424.95 ns` | `439.45 ns` |
| Result.and err async + sync          | `329.12 ns/iter` | `315.89 ns` | `324.91 ns` | `420.79 ns` | `654.77 ns` |
| Result.and err async + async         | `519.66 ns/iter` | `490.60 ns` | `521.67 ns` | `700.11 ns` | `937.78 ns` |
| Result.or err sync + sync            | `  8.65 ns/iter` | `  8.46 ns` | `  8.48 ns` | ` 11.64 ns` | ` 23.09 ns` |
| Result.or err sync + async           | `333.17 ns/iter` | `320.51 ns` | `329.34 ns` | `429.71 ns` | `565.72 ns` |
| Result.or err async + sync           | `325.89 ns/iter` | `313.29 ns` | `321.19 ns` | `421.20 ns` | `659.05 ns` |
| Result.or err async + async          | `511.27 ns/iter` | `489.46 ns` | `513.20 ns` | `623.79 ns` | `666.54 ns` |

| • AsyncOption - Some wrapper methods | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (Some)              | `172.84 ns/iter` | `165.17 ns` | `171.51 ns` | `258.26 ns` | `315.73 ns` |
| AsyncOption.isSome (Some)            | `168.70 ns/iter` | `161.77 ns` | `167.56 ns` | `255.58 ns` | `268.10 ns` |
| AsyncOption.isSomeAnd (Some)         | `172.95 ns/iter` | `164.14 ns` | `170.14 ns` | `265.13 ns` | `292.18 ns` |
| AsyncOption.isNone (Some)            | `169.41 ns/iter` | `162.41 ns` | `167.94 ns` | `257.43 ns` | `279.01 ns` |
| AsyncOption.isNoneOr (Some)          | `172.06 ns/iter` | `164.01 ns` | `170.27 ns` | `260.68 ns` | `270.82 ns` |
| AsyncOption.expect (Some)            | `173.52 ns/iter` | `165.68 ns` | `171.92 ns` | `259.88 ns` | `275.13 ns` |
| AsyncOption.unwrap (Some)            | `171.01 ns/iter` | `163.29 ns` | `169.28 ns` | `258.03 ns` | `278.73 ns` |
| AsyncOption.unwrapOr (Some)          | `172.85 ns/iter` | `164.54 ns` | `171.67 ns` | `263.21 ns` | `281.74 ns` |
| AsyncOption.unwrapOrElse (Some)      | `177.93 ns/iter` | `167.30 ns` | `177.54 ns` | `268.10 ns` | `313.84 ns` |
| AsyncOption.unwrapOrElseAsync (Some) | `254.83 ns/iter` | `246.34 ns` | `252.73 ns` | `348.10 ns` | `387.82 ns` |
| AsyncOption.map (Some)               | `329.32 ns/iter` | `315.33 ns` | `326.48 ns` | `429.99 ns` | `483.39 ns` |
| AsyncOption.mapAsync (Some)          | `693.80 ns/iter` | `670.29 ns` | `687.87 ns` | `795.19 ns` | `  1.03 µs` |
| AsyncOption.inspect (Some)           | `322.77 ns/iter` | `310.78 ns` | `319.42 ns` | `418.28 ns` | `482.74 ns` |
| AsyncOption.inspectAsync (Some)      | `704.77 ns/iter` | `676.56 ns` | `700.55 ns` | `821.58 ns` | `978.08 ns` |
| AsyncOption.mapOr (Some)             | `174.99 ns/iter` | `166.12 ns` | `173.83 ns` | `270.18 ns` | `289.79 ns` |
| AsyncOption.mapOrElse (Some)         | `177.19 ns/iter` | `168.61 ns` | `175.13 ns` | `265.89 ns` | `338.75 ns` |
| AsyncOption.mapOrElseAsync (Some)    | `248.91 ns/iter` | `241.67 ns` | `246.64 ns` | `341.41 ns` | `356.77 ns` |
| AsyncOption.okOr (Some)              | `334.07 ns/iter` | `318.60 ns` | `330.16 ns` | `429.11 ns` | `453.71 ns` |
| AsyncOption.okOrElse (Some)          | `352.93 ns/iter` | `325.54 ns` | `344.92 ns` | `566.35 ns` | `615.28 ns` |
| AsyncOption.okOrElseAsync (Some)     | `513.64 ns/iter` | `498.82 ns` | `508.44 ns` | `610.16 ns` | `690.42 ns` |
| AsyncOption.and (Some)               | `324.47 ns/iter` | `311.08 ns` | `321.77 ns` | `423.04 ns` | `438.02 ns` |
| AsyncOption.andThen (Some)           | `346.00 ns/iter` | `330.76 ns` | `341.89 ns` | `444.93 ns` | `461.53 ns` |
| AsyncOption.andThenAsync (Some)      | `647.84 ns/iter` | `626.46 ns` | `642.04 ns` | `756.86 ns` | `959.12 ns` |
| AsyncOption.filter (Some)            | `323.09 ns/iter` | `311.02 ns` | `319.58 ns` | `420.77 ns` | `477.39 ns` |
| AsyncOption.filterAsync (Some)       | `779.04 ns/iter` | `680.74 ns` | `798.87 ns` | `  1.24 µs` | `  1.29 µs` |
| AsyncOption.or (Some)                | `354.01 ns/iter` | `315.97 ns` | `328.60 ns` | `730.60 ns` | `  1.16 µs` |
| AsyncOption.orElse (Some)            | `328.13 ns/iter` | `316.07 ns` | `323.95 ns` | `433.96 ns` | `476.11 ns` |
| AsyncOption.orElseAsync (Some)       | `557.53 ns/iter` | `488.78 ns` | `503.73 ns` | `  1.22 µs` | `  1.36 µs` |
| AsyncOption.xor (Some)               | `344.17 ns/iter` | `317.49 ns` | `329.42 ns` | `758.90 ns` | `901.53 ns` |
| AsyncOption.flatten (Some)           | `317.61 ns/iter` | `304.86 ns` | `314.15 ns` | `417.29 ns` | `484.57 ns` |
| AsyncOption.transpose (Some)         | `353.41 ns/iter` | `329.05 ns` | `346.86 ns` | `478.86 ns` | `513.25 ns` |
| AsyncOption.zip (Some)               | `349.96 ns/iter` | `331.79 ns` | `346.52 ns` | `472.40 ns` | `505.78 ns` |
| AsyncOption.unzip (Some)             | `929.47 ns/iter` | `850.02 ns` | `905.87 ns` | `  1.71 µs` | `  2.11 µs` |
| AsyncOption.match (Some)             | `182.32 ns/iter` | `172.98 ns` | `180.03 ns` | `272.53 ns` | `299.18 ns` |

| • AsyncOption - None wrapper methods | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (None)              | `185.22 ns/iter` | `177.90 ns` | `183.72 ns` | `278.47 ns` | `284.11 ns` |
| AsyncOption.isSome (None)            | `179.93 ns/iter` | `164.29 ns` | `181.37 ns` | `287.40 ns` | `410.93 ns` |
| AsyncOption.isSomeAnd (None)         | `190.56 ns/iter` | `169.44 ns` | `178.00 ns` | `383.21 ns` | `817.58 ns` |
| AsyncOption.isNone (None)            | `173.79 ns/iter` | `165.63 ns` | `172.80 ns` | `266.43 ns` | `282.23 ns` |
| AsyncOption.isNoneOr (None)          | `176.76 ns/iter` | `168.16 ns` | `175.23 ns` | `264.13 ns` | `273.18 ns` |
| AsyncOption.expect (None)            | `  1.23 µs/iter` | `  1.08 µs` | `  1.15 µs` | `  1.99 µs` | `  2.06 µs` |
| AsyncOption.unwrap (None)            | `  1.25 µs/iter` | `  1.12 µs` | `  1.24 µs` | `  1.95 µs` | `  1.96 µs` |
| AsyncOption.unwrapOr (None)          | `185.75 ns/iter` | `175.11 ns` | `182.94 ns` | `283.66 ns` | `361.96 ns` |
| AsyncOption.unwrapOrElse (None)      | `201.95 ns/iter` | `182.72 ns` | `212.41 ns` | `338.45 ns` | `434.06 ns` |
| AsyncOption.unwrapOrElseAsync (None) | `256.25 ns/iter` | `248.23 ns` | `253.96 ns` | `355.04 ns` | `362.99 ns` |
| AsyncOption.map (None)               | `327.97 ns/iter` | `316.34 ns` | `324.54 ns` | `427.15 ns` | `431.90 ns` |
| AsyncOption.mapAsync (None)          | `514.80 ns/iter` | `496.86 ns` | `507.72 ns` | `624.61 ns` | `700.18 ns` |
| AsyncOption.inspect (None)           | `332.27 ns/iter` | `320.09 ns` | `329.94 ns` | `432.76 ns` | `439.64 ns` |
| AsyncOption.inspectAsync (None)      | `508.45 ns/iter` | `493.96 ns` | `502.13 ns` | `604.52 ns` | `612.37 ns` |
| AsyncOption.mapOr (None)             | `180.14 ns/iter` | `171.46 ns` | `178.33 ns` | `269.98 ns` | `275.13 ns` |
| AsyncOption.mapOrElse (None)         | `182.90 ns/iter` | `175.10 ns` | `181.38 ns` | `275.03 ns` | `292.43 ns` |
| AsyncOption.mapOrElseAsync (None)    | `255.59 ns/iter` | `247.10 ns` | `253.52 ns` | `352.04 ns` | `372.46 ns` |
| AsyncOption.okOr (None)              | `343.28 ns/iter` | `325.55 ns` | `339.64 ns` | `458.57 ns` | `464.13 ns` |
| AsyncOption.okOrElse (None)          | `349.59 ns/iter` | `337.34 ns` | `346.21 ns` | `448.41 ns` | `465.84 ns` |
| AsyncOption.okOrElseAsync (None)     | `700.64 ns/iter` | `681.19 ns` | `694.53 ns` | `797.86 ns` | `799.62 ns` |
| AsyncOption.and (None)               | `325.73 ns/iter` | `315.23 ns` | `322.53 ns` | `419.53 ns` | `424.65 ns` |
| AsyncOption.andThen (None)           | `367.82 ns/iter` | `321.08 ns` | `382.77 ns` | `671.00 ns` | `750.47 ns` |
| AsyncOption.andThenAsync (None)      | `522.22 ns/iter` | `504.61 ns` | `517.02 ns` | `624.86 ns` | `671.59 ns` |
| AsyncOption.filter (None)            | `328.74 ns/iter` | `316.55 ns` | `324.92 ns` | `423.50 ns` | `431.19 ns` |
| AsyncOption.filterAsync (None)       | `530.81 ns/iter` | `512.15 ns` | `525.96 ns` | `642.25 ns` | `650.33 ns` |
| AsyncOption.or (None)                | `327.79 ns/iter` | `315.66 ns` | `323.79 ns` | `429.35 ns` | `528.36 ns` |
| AsyncOption.orElse (None)            | `343.95 ns/iter` | `321.34 ns` | `335.62 ns` | `440.47 ns` | `523.10 ns` |
| AsyncOption.orElseAsync (None)       | `636.04 ns/iter` | `618.09 ns` | `629.65 ns` | `737.48 ns` | `740.92 ns` |
| AsyncOption.xor (None)               | `325.19 ns/iter` | `313.62 ns` | `322.25 ns` | `421.72 ns` | `428.39 ns` |
| AsyncOption.flatten (None)           | `334.55 ns/iter` | `322.47 ns` | `330.72 ns` | `431.74 ns` | `439.14 ns` |
| AsyncOption.transpose (None)         | `344.93 ns/iter` | `333.47 ns` | `342.08 ns` | `444.40 ns` | `449.52 ns` |
| AsyncOption.zip (None)               | `348.59 ns/iter` | `334.50 ns` | `344.77 ns` | `449.84 ns` | `458.96 ns` |
| AsyncOption.unzip (None)             | `878.15 ns/iter` | `849.04 ns` | `873.97 ns` | `978.09 ns` | `992.59 ns` |
| AsyncOption.match (None)             | `195.50 ns/iter` | `185.40 ns` | `193.47 ns` | `293.58 ns` | `311.44 ns` |

| • AsyncResult - Ok wrapper methods | avg              | min         | p75         | p99         | max         |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (Ok)              | `173.67 ns/iter` | `166.37 ns` | `172.16 ns` | `267.56 ns` | `316.73 ns` |
| AsyncResult.isOk (Ok)              | `168.83 ns/iter` | `161.83 ns` | `167.41 ns` | `257.88 ns` | `268.25 ns` |
| AsyncResult.isOkAnd (Ok)           | `173.36 ns/iter` | `164.76 ns` | `171.77 ns` | `265.63 ns` | `314.81 ns` |
| AsyncResult.isErr (Ok)             | `168.04 ns/iter` | `160.57 ns` | `166.70 ns` | `259.75 ns` | `274.01 ns` |
| AsyncResult.isErrAnd (Ok)          | `172.49 ns/iter` | `163.55 ns` | `170.80 ns` | `260.14 ns` | `270.98 ns` |
| AsyncResult.ok (Ok)                | `323.76 ns/iter` | `312.63 ns` | `320.87 ns` | `423.91 ns` | `434.96 ns` |
| AsyncResult.err (Ok)               | `324.66 ns/iter` | `312.64 ns` | `321.46 ns` | `422.23 ns` | `432.91 ns` |
| AsyncResult.map (Ok)               | `334.19 ns/iter` | `319.85 ns` | `329.73 ns` | `434.56 ns` | `565.42 ns` |
| AsyncResult.mapAsync (Ok)          | `714.54 ns/iter` | `687.86 ns` | `707.59 ns` | `844.13 ns` | `898.21 ns` |
| AsyncResult.mapOr (Ok)             | `177.14 ns/iter` | `168.97 ns` | `175.49 ns` | `267.04 ns` | `275.93 ns` |
| AsyncResult.mapOrElse (Ok)         | `177.29 ns/iter` | `169.37 ns` | `175.38 ns` | `266.45 ns` | `274.22 ns` |
| AsyncResult.mapOrElseAsync (Ok)    | `256.85 ns/iter` | `241.68 ns` | `251.15 ns` | `355.39 ns` | `515.36 ns` |
| AsyncResult.mapErr (Ok)            | `333.69 ns/iter` | `322.36 ns` | `329.97 ns` | `421.91 ns` | `429.79 ns` |
| AsyncResult.mapErrAsync (Ok)       | `511.25 ns/iter` | `495.49 ns` | `506.63 ns` | `611.31 ns` | `652.29 ns` |
| AsyncResult.inspect (Ok)           | `330.10 ns/iter` | `316.50 ns` | `324.70 ns` | `437.96 ns` | `651.32 ns` |
| AsyncResult.inspectAsync (Ok)      | `705.18 ns/iter` | `682.90 ns` | `697.71 ns` | `801.61 ns` | `809.95 ns` |
| AsyncResult.inspectErr (Ok)        | `326.15 ns/iter` | `312.91 ns` | `322.77 ns` | `425.72 ns` | `483.02 ns` |
| AsyncResult.inspectErrAsync (Ok)   | `506.24 ns/iter` | `490.67 ns` | `499.35 ns` | `606.07 ns` | `640.10 ns` |
| AsyncResult.expect (Ok)            | `176.59 ns/iter` | `168.22 ns` | `174.37 ns` | `268.67 ns` | `299.57 ns` |
| AsyncResult.unwrap (Ok)            | `173.15 ns/iter` | `165.21 ns` | `171.74 ns` | `264.15 ns` | `279.32 ns` |
| AsyncResult.expectErr (Ok)         | `  1.30 µs/iter` | `  1.24 µs` | `  1.29 µs` | `  1.43 µs` | `  1.44 µs` |
| AsyncResult.unwrapErr (Ok)         | `  1.31 µs/iter` | `  1.27 µs` | `  1.31 µs` | `  1.47 µs` | `  1.50 µs` |
| AsyncResult.and (Ok)               | `336.64 ns/iter` | `324.88 ns` | `333.28 ns` | `433.44 ns` | `440.74 ns` |
| AsyncResult.andThen (Ok)           | `351.39 ns/iter` | `336.40 ns` | `345.99 ns` | `461.70 ns` | `607.54 ns` |
| AsyncResult.andThenAsync (Ok)      | `657.60 ns/iter` | `635.58 ns` | `649.68 ns` | `757.58 ns` | `  1.01 µs` |
| AsyncResult.or (Ok)                | `337.81 ns/iter` | `324.50 ns` | `333.66 ns` | `438.89 ns` | `455.00 ns` |
| AsyncResult.orElse (Ok)            | `351.10 ns/iter` | `324.37 ns` | `334.58 ns` | `926.55 ns` | `  1.07 µs` |
| AsyncResult.orElseAsync (Ok)       | `514.28 ns/iter` | `497.49 ns` | `508.74 ns` | `613.81 ns` | `666.45 ns` |
| AsyncResult.unwrapOr (Ok)          | `178.86 ns/iter` | `170.39 ns` | `177.23 ns` | `268.40 ns` | `289.97 ns` |
| AsyncResult.unwrapOrElse (Ok)      | `180.80 ns/iter` | `172.60 ns` | `179.08 ns` | `278.97 ns` | `285.70 ns` |
| AsyncResult.unwrapOrElseAsync (Ok) | `259.93 ns/iter` | `247.13 ns` | `254.56 ns` | `366.29 ns` | `382.87 ns` |
| AsyncResult.flatten (Ok)           | `325.42 ns/iter` | `312.71 ns` | `320.86 ns` | `429.60 ns` | `539.29 ns` |
| AsyncResult.transpose (Ok)         | `349.57 ns/iter` | `336.08 ns` | `345.42 ns` | `458.43 ns` | `559.02 ns` |
| AsyncResult.match (Ok)             | `190.09 ns/iter` | `181.35 ns` | `187.77 ns` | `281.22 ns` | `295.65 ns` |

| • AsyncResult - Err wrapper methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (Err)              | `181.15 ns/iter` | `173.78 ns` | `180.09 ns` | `270.22 ns` | `283.90 ns` |
| AsyncResult.isOk (Err)              | `175.89 ns/iter` | `167.39 ns` | `174.61 ns` | `274.96 ns` | `287.09 ns` |
| AsyncResult.isOkAnd (Err)           | `176.48 ns/iter` | `168.45 ns` | `174.57 ns` | `268.30 ns` | `285.80 ns` |
| AsyncResult.isErr (Err)             | `173.76 ns/iter` | `166.49 ns` | `172.06 ns` | `269.56 ns` | `275.07 ns` |
| AsyncResult.isErrAnd (Err)          | `181.19 ns/iter` | `172.79 ns` | `179.63 ns` | `277.27 ns` | `298.52 ns` |
| AsyncResult.ok (Err)                | `328.97 ns/iter` | `317.94 ns` | `325.62 ns` | `424.91 ns` | `429.40 ns` |
| AsyncResult.err (Err)               | `339.14 ns/iter` | `326.80 ns` | `336.05 ns` | `436.95 ns` | `441.43 ns` |
| AsyncResult.map (Err)               | `326.07 ns/iter` | `315.86 ns` | `322.64 ns` | `426.95 ns` | `432.68 ns` |
| AsyncResult.mapAsync (Err)          | `509.70 ns/iter` | `494.21 ns` | `502.26 ns` | `610.30 ns` | `627.21 ns` |
| AsyncResult.mapOr (Err)             | `179.09 ns/iter` | `171.15 ns` | `177.22 ns` | `271.65 ns` | `279.43 ns` |
| AsyncResult.mapOrElse (Err)         | `190.18 ns/iter` | `182.09 ns` | `188.65 ns` | `284.86 ns` | `294.09 ns` |
| AsyncResult.mapOrElseAsync (Err)    | `254.17 ns/iter` | `246.20 ns` | `251.31 ns` | `351.91 ns` | `356.96 ns` |
| AsyncResult.mapErr (Err)            | `337.66 ns/iter` | `324.23 ns` | `332.70 ns` | `442.84 ns` | `494.89 ns` |
| AsyncResult.mapErrAsync (Err)       | `713.43 ns/iter` | `689.76 ns` | `708.11 ns` | `819.13 ns` | `843.30 ns` |
| AsyncResult.inspect (Err)           | `327.99 ns/iter` | `315.75 ns` | `323.56 ns` | `427.96 ns` | `432.20 ns` |
| AsyncResult.inspectAsync (Err)      | `510.16 ns/iter` | `494.00 ns` | `502.60 ns` | `611.24 ns` | `637.08 ns` |
| AsyncResult.inspectErr (Err)        | `331.30 ns/iter` | `320.59 ns` | `327.81 ns` | `429.40 ns` | `437.19 ns` |
| AsyncResult.inspectErrAsync (Err)   | `708.90 ns/iter` | `685.01 ns` | `703.77 ns` | `822.68 ns` | `841.01 ns` |
| AsyncResult.expect (Err)            | `  1.26 µs/iter` | `  1.19 µs` | `  1.28 µs` | `  1.45 µs` | `  1.47 µs` |
| AsyncResult.unwrap (Err)            | `  1.25 µs/iter` | `  1.19 µs` | `  1.28 µs` | `  1.34 µs` | `  1.38 µs` |
| AsyncResult.expectErr (Err)         | `181.64 ns/iter` | `172.92 ns` | `179.69 ns` | `275.63 ns` | `285.06 ns` |
| AsyncResult.unwrapErr (Err)         | `175.18 ns/iter` | `167.76 ns` | `173.80 ns` | `274.19 ns` | `282.04 ns` |
| AsyncResult.and (Err)               | `335.60 ns/iter` | `325.83 ns` | `332.97 ns` | `440.34 ns` | `446.73 ns` |
| AsyncResult.andThen (Err)           | `329.46 ns/iter` | `316.44 ns` | `325.73 ns` | `431.31 ns` | `436.16 ns` |
| AsyncResult.andThenAsync (Err)      | `518.59 ns/iter` | `501.56 ns` | `511.64 ns` | `621.66 ns` | `625.36 ns` |
| AsyncResult.or (Err)                | `337.95 ns/iter` | `325.16 ns` | `335.01 ns` | `442.12 ns` | `447.55 ns` |
| AsyncResult.orElse (Err)            | `350.68 ns/iter` | `336.29 ns` | `345.34 ns` | `460.70 ns` | `560.82 ns` |
| AsyncResult.orElseAsync (Err)       | `659.50 ns/iter` | `639.65 ns` | `651.60 ns` | `764.49 ns` | `781.44 ns` |
| AsyncResult.unwrapOr (Err)          | `180.74 ns/iter` | `171.85 ns` | `179.25 ns` | `279.66 ns` | `294.11 ns` |
| AsyncResult.unwrapOrElse (Err)      | `183.45 ns/iter` | `174.66 ns` | `181.15 ns` | `277.96 ns` | `304.32 ns` |
| AsyncResult.unwrapOrElseAsync (Err) | `253.19 ns/iter` | `245.81 ns` | `250.26 ns` | `352.53 ns` | `360.59 ns` |
| AsyncResult.flatten (Err)           | `327.00 ns/iter` | `316.72 ns` | `323.78 ns` | `426.95 ns` | `456.03 ns` |
| AsyncResult.transpose (Err)         | `354.07 ns/iter` | `340.82 ns` | `350.36 ns` | `459.76 ns` | `467.99 ns` |
| AsyncResult.match (Err)             | `189.52 ns/iter` | `181.01 ns` | `187.10 ns` | `284.43 ns` | `300.99 ns` |

| • Formatting            | avg              | min         | p75         | p99         | max         |
| ----------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.toString           | `381.45 ps/iter` | `334.96 ps` | `342.29 ps` | `  2.57 ns` | ` 17.11 ns` |
| Some Symbol.toStringTag | ` 77.65 ns/iter` | ` 67.83 ns` | ` 80.86 ns` | ` 86.88 ns` | `196.33 ns` |
| None.toString           | `  4.14 ns/iter` | `  3.37 ns` | `  3.39 ns` | `  9.53 ns` | ` 19.31 ns` |
| None Symbol.toStringTag | ` 79.47 ns/iter` | ` 76.22 ns` | ` 80.50 ns` | ` 85.31 ns` | `195.86 ns` |
| Ok.toString             | ` 11.21 ns/iter` | `  9.60 ns` | ` 10.82 ns` | ` 17.56 ns` | `123.19 ns` |
| Ok Symbol.toStringTag   | ` 75.25 ns/iter` | ` 73.03 ns` | ` 76.12 ns` | ` 82.02 ns` | `189.34 ns` |
| Err.toString            | ` 11.79 ns/iter` | ` 10.79 ns` | ` 11.47 ns` | ` 16.90 ns` | `113.61 ns` |
| Err Symbol.toStringTag  | ` 75.21 ns/iter` | ` 73.12 ns` | ` 76.16 ns` | ` 80.69 ns` | `190.41 ns` |

| • Synchronous panic paths | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| None.expect               | `874.27 ns/iter` | `763.75 ns` | `885.29 ns` | `  1.00 µs` | `  1.01 µs` |
| None.unwrap               | `879.07 ns/iter` | `760.45 ns` | `890.50 ns` | `  1.00 µs` | `  1.01 µs` |
| Err.expect                | `959.51 ns/iter` | `859.51 ns` | `961.20 ns` | `  1.09 µs` | `  1.10 µs` |
| Err.unwrap                | `978.67 ns/iter` | `947.13 ns` | `979.82 ns` | `  1.09 µs` | `  1.11 µs` |
| Ok.expectErr              | `  1.04 µs/iter` | `999.04 ns` | `  1.06 µs` | `  1.16 µs` | `  1.25 µs` |
| Ok.unwrapErr              | `  1.10 µs/iter` | `  1.02 µs` | `  1.12 µs` | `  1.27 µs` | `  1.29 µs` |

| • Nested and inactive branches | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(Err).flatten                | ` 26.50 ns/iter` | ` 22.25 ns` | ` 25.60 ns` | `105.78 ns` | `126.60 ns` |
| Err.flatten                    | ` 13.63 ns/iter` | ` 11.50 ns` | ` 13.31 ns` | ` 19.32 ns` | `115.28 ns` |
| Some(None).flatten             | `  9.04 ns/iter` | `  7.47 ns` | `  8.76 ns` | ` 13.24 ns` | `110.98 ns` |
| None.flatten                   | `  9.27 ns/iter` | `  7.49 ns` | `  9.07 ns` | ` 13.49 ns` | `109.19 ns` |
| None.xor(None)                 | `  6.49 ns/iter` | `  6.37 ns` | `  6.38 ns` | `  8.73 ns` | ` 15.63 ns` |
| None.takeIf                    | ` 21.92 ns/iter` | ` 17.04 ns` | ` 21.50 ns` | ` 99.64 ns` | `127.90 ns` |
| Some.filterAsync false         | `453.69 ns/iter` | `433.27 ns` | `445.87 ns` | `744.30 ns` | `764.45 ns` |

| • Unwind error mapping                    | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind mapped error                  | `  1.08 µs/iter` | `  1.02 µs` | `  1.05 µs` | `  1.51 µs` | `  1.52 µs` |
| catchUnwindAsync mapped synchronous throw | `  1.07 µs/iter` | `  1.02 µs` | `  1.07 µs` | `  1.27 µs` | `  1.28 µs` |
| catchUnwindAsync synchronous return       | `423.31 ns/iter` | `402.70 ns` | `417.79 ns` | `549.29 ns` | `639.95 ns` |

| • Async nested branches               | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.flatten nested branch 0   | `315.78 ns/iter` | `300.23 ns` | `315.29 ns` | `420.93 ns` | `511.43 ns` |
| AsyncOption.flatten nested branch 1   | `311.44 ns/iter` | `300.03 ns` | `309.70 ns` | `410.21 ns` | `418.06 ns` |
| AsyncOption.flatten nested branch 2   | `316.70 ns/iter` | `304.79 ns` | `314.81 ns` | `414.47 ns` | `418.41 ns` |
| AsyncResult.flatten nested branch 0   | `314.56 ns/iter` | `301.78 ns` | `312.07 ns` | `410.93 ns` | `484.94 ns` |
| AsyncResult.flatten nested branch 1   | `313.75 ns/iter` | `303.52 ns` | `312.13 ns` | `410.85 ns` | `415.21 ns` |
| AsyncResult.flatten nested branch 2   | `321.63 ns/iter` | `309.79 ns` | `319.70 ns` | `423.25 ns` | `432.01 ns` |
| AsyncOption.transpose nested branch 0 | `339.65 ns/iter` | `323.74 ns` | `336.39 ns` | `441.24 ns` | `521.07 ns` |
| AsyncOption.transpose nested branch 1 | `330.09 ns/iter` | `318.30 ns` | `327.48 ns` | `426.21 ns` | `429.14 ns` |
| AsyncOption.transpose nested branch 2 | `337.24 ns/iter` | `325.53 ns` | `335.00 ns` | `433.45 ns` | `438.89 ns` |
| AsyncResult.transpose nested branch 0 | `335.11 ns/iter` | `321.35 ns` | `332.30 ns` | `435.59 ns` | `463.88 ns` |
| AsyncResult.transpose nested branch 1 | `321.12 ns/iter` | `309.31 ns` | `319.43 ns` | `421.37 ns` | `424.98 ns` |
| AsyncResult.transpose nested branch 2 | `330.57 ns/iter` | `316.86 ns` | `328.31 ns` | `423.50 ns` | `436.98 ns` |

| • Async Option initialization contention       | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| None.getOrInsertWithAsync concurrent callers   | `637.92 ns/iter` | `608.54 ns` | `630.44 ns` | `761.10 ns` | `859.61 ns` |
| None.getOrInsertWithAsync intervening mutation | `487.26 ns/iter` | `468.66 ns` | `480.05 ns` | `586.17 ns` | `852.49 ns` |

| • Result - fresh wrapper workloads                | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Err.flatten fresh wrappers with varied payloads   | ` 24.83 ns/iter` | ` 20.43 ns` | ` 23.30 ns` | `108.91 ns` | `239.46 ns` |
| Err.transpose fresh wrappers with varied payloads | ` 44.26 ns/iter` | ` 37.02 ns` | ` 42.77 ns` | `127.80 ns` | `152.30 ns` |

| • Async Result - fresh wrapper workloads             | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Err.mapAsync fresh wrappers with varied payloads     | `695.97 ns/iter` | `667.29 ns` | `697.77 ns` | `820.70 ns` | `859.39 ns` |
| Ok.mapErrAsync fresh wrappers with varied payloads   | `703.07 ns/iter` | `669.60 ns` | `702.88 ns` | `839.53 ns` | `849.49 ns` |
| Err.andThenAsync fresh wrappers with varied payloads | `700.14 ns/iter` | `668.39 ns` | `697.36 ns` | `888.27 ns` | `  1.12 µs` |
| Ok.orElseAsync fresh wrappers with varied payloads   | `694.44 ns/iter` | `665.93 ns` | `696.61 ns` | `815.67 ns` | `979.31 ns` |

| • Workloads - synchronous pipelines    | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result object pipeline (success heavy) | `310.72 ns/iter` | `285.05 ns` | `301.36 ns` | `420.87 ns` | `531.89 ns` |
| Option object pipeline (success heavy) | `244.23 ns/iter` | `214.35 ns` | `232.27 ns` | `397.54 ns` | `656.46 ns` |
| Result object pipeline (failure heavy) | `321.58 ns/iter` | `296.90 ns` | `312.65 ns` | `418.76 ns` | `459.90 ns` |
| Option object pipeline (failure heavy) | `238.53 ns/iter` | `219.43 ns` | `231.62 ns` | `329.65 ns` | `335.93 ns` |
| Result mixed object chain (eight maps) | `432.64 ns/iter` | `393.38 ns` | `481.54 ns` | `526.10 ns` | `591.00 ns` |
| Option mixed object chain (eight maps) | `280.09 ns/iter` | `249.16 ns` | `273.18 ns` | `378.06 ns` | `454.05 ns` |
| Option escaping mutation cycle         | `171.17 ns/iter` | `150.78 ns` | `164.93 ns` | `264.74 ns` | `476.23 ns` |
| Nested object transpose round trip     | `250.29 ns/iter` | `225.43 ns` | `242.47 ns` | `358.15 ns` | `568.66 ns` |

| • Workloads - structural operands | avg              | min         | p75         | p99         | max         |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result structural object operands | ` 32.71 ns/iter` | ` 29.00 ns` | ` 31.51 ns` | `117.45 ns` | `143.29 ns` |
| Option structural object operands | ` 38.92 ns/iter` | ` 34.70 ns` | ` 37.81 ns` | `121.58 ns` | `144.09 ns` |

| • Workloads - async pipelines     | avg              | min         | p75         | p99         | max         |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result PromiseLike object operand | `660.90 ns/iter` | `627.27 ns` | `646.41 ns` | `  1.14 µs` | `  1.26 µs` |
| Option PromiseLike object operand | `723.57 ns/iter` | `683.92 ns` | `721.02 ns` | `911.71 ns` | `  1.21 µs` |
| AsyncResult mixed object chain    | `  2.75 µs/iter` | `  2.63 µs` | `  2.78 µs` | `  2.86 µs` | `  3.73 µs` |
| AsyncOption mixed object chain    | `  2.74 µs/iter` | `  2.65 µs` | `  2.79 µs` | `  2.97 µs` | `  3.11 µs` |
