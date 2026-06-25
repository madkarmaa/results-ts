# Benchmarks

clk: ~3.04 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  5.35 ns/iter` | `  3.84 ns` | `  4.68 ns` | ` 37.66 ns` | `118.13 ns` |
| Err(1)         | `  5.59 ns/iter` | `  3.93 ns` | `  5.03 ns` | ` 16.76 ns` | `132.32 ns` |
| Some(1)        | ` 10.34 ns/iter` | `  7.68 ns` | ` 10.37 ns` | ` 70.93 ns` | `177.89 ns` |
| None()         | `  7.65 ns/iter` | `  4.75 ns` | `  8.91 ns` | ` 20.27 ns` | `506.98 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  5.58 ns/iter` | `  1.70 ns` | `  8.22 ns` | ` 12.83 ns` | ` 24.28 ns` |
| Err.isOk()          | `  9.01 ns/iter` | `  7.98 ns` | `  8.84 ns` | ` 14.05 ns` | ` 24.09 ns` |
| Ok.isErr()          | `  9.53 ns/iter` | `  8.22 ns` | `  9.45 ns` | ` 16.41 ns` | ` 27.03 ns` |
| Err.isErr()         | ` 10.55 ns/iter` | ` 10.37 ns` | ` 10.38 ns` | ` 14.26 ns` | ` 26.60 ns` |
| Ok.isOkAnd (true)   | `  5.98 ns/iter` | `  5.17 ns` | `  6.48 ns` | `  9.08 ns` | ` 17.54 ns` |
| Err.isOkAnd         | `  6.42 ns/iter` | `  2.79 ns` | `  7.49 ns` | ` 10.54 ns` | ` 32.20 ns` |
| Ok.isErrAnd         | `  4.68 ns/iter` | `  4.56 ns` | `  4.56 ns` | `  8.34 ns` | ` 23.36 ns` |
| Err.isErrAnd (true) | `  5.32 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  8.50 ns` | ` 22.60 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 14.12 ns/iter` | ` 12.06 ns` | ` 13.01 ns` | ` 73.37 ns` | `105.12 ns` |
| Err.ok()               | ` 12.89 ns/iter` | ` 11.67 ns` | ` 12.20 ns` | ` 37.66 ns` | `101.67 ns` |
| Ok.err()               | ` 11.33 ns/iter` | ` 10.11 ns` | ` 10.68 ns` | ` 29.30 ns` | ` 92.57 ns` |
| Err.err()              | ` 15.38 ns/iter` | ` 13.49 ns` | ` 14.45 ns` | ` 75.14 ns` | `104.43 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 14.40 ns/iter` | ` 13.12 ns` | ` 13.76 ns` | ` 25.04 ns` | `102.21 ns` |
| Err.map (reuse)       | ` 10.01 ns/iter` | `  9.73 ns` | `  9.84 ns` | ` 13.33 ns` | ` 28.42 ns` |
| Ok.mapOr              | `  6.28 ns/iter` | `  6.04 ns` | `  6.20 ns` | `  8.75 ns` | ` 25.10 ns` |
| Err.mapOr             | `  6.95 ns/iter` | `  6.72 ns` | `  6.83 ns` | `  9.60 ns` | ` 29.23 ns` |
| Ok.mapOrElse          | ` 11.96 ns/iter` | ` 11.10 ns` | ` 11.26 ns` | ` 24.71 ns` | ` 96.33 ns` |
| Err.mapOrElse         | ` 13.89 ns/iter` | ` 13.01 ns` | ` 13.33 ns` | ` 25.93 ns` | `101.67 ns` |
| Ok.mapErr (reuse)     | `  9.45 ns/iter` | `  9.18 ns` | `  9.30 ns` | ` 12.22 ns` | ` 27.00 ns` |
| Err.mapErr (alloc)    | ` 15.25 ns/iter` | ` 13.63 ns` | ` 14.27 ns` | ` 46.04 ns` | `110.93 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  7.83 ns/iter` | `  7.15 ns` | `  7.45 ns` | ` 13.45 ns` | ` 87.63 ns` |
| Err.inspect               | `  9.31 ns/iter` | `  8.63 ns` | `  8.93 ns` | ` 15.24 ns` | ` 88.04 ns` |
| Ok.inspectErr             | `  6.24 ns/iter` | `  6.02 ns` | `  6.15 ns` | `  8.68 ns` | ` 28.51 ns` |
| Err.inspectErr            | `  8.01 ns/iter` | `  7.14 ns` | `  7.48 ns` | ` 20.29 ns` | ` 91.07 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.21 ns/iter` | `  5.91 ns` | `  6.12 ns` | `  9.53 ns` | ` 21.57 ns` |
| Err.unwrapErr            | `  6.19 ns/iter` | `  5.84 ns` | `  6.13 ns` | `  8.69 ns` | ` 21.59 ns` |
| Ok.expect                | `  6.70 ns/iter` | `  5.95 ns` | `  6.15 ns` | ` 11.53 ns` | ` 20.64 ns` |
| Err.expectErr            | `  9.03 ns/iter` | `  8.80 ns` | `  8.92 ns` | ` 11.59 ns` | ` 22.43 ns` |
| Ok.unwrapOr              | `  6.16 ns/iter` | `  5.95 ns` | `  6.06 ns` | `  8.80 ns` | ` 15.83 ns` |
| Err.unwrapOr             | `  6.47 ns/iter` | `  6.25 ns` | `  6.37 ns` | `  9.04 ns` | ` 24.83 ns` |
| Ok.unwrapOrElse          | `  6.20 ns/iter` | `  5.87 ns` | `  6.12 ns` | `  8.87 ns` | ` 53.85 ns` |
| Err.unwrapOrElse         | `  9.51 ns/iter` | `  8.60 ns` | `  8.94 ns` | ` 21.98 ns` | `101.10 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  7.90 ns/iter` | `  7.64 ns` | `  7.76 ns` | ` 11.00 ns` | ` 30.06 ns` |
| Err.and (reuse)        | `  8.11 ns/iter` | `  7.87 ns` | `  7.99 ns` | ` 10.93 ns` | ` 22.74 ns` |
| Ok.andThen (alloc)     | ` 19.46 ns/iter` | ` 17.09 ns` | ` 18.13 ns` | ` 86.92 ns` | `122.99 ns` |
| Err.andThen (alloc)    | `  7.51 ns/iter` | `  7.26 ns` | `  7.37 ns` | ` 10.41 ns` | ` 35.03 ns` |
| Ok.or (reuse)          | `  8.14 ns/iter` | `  7.87 ns` | `  7.99 ns` | ` 11.13 ns` | ` 30.28 ns` |
| Err.or (reuse)         | `  7.82 ns/iter` | `  7.57 ns` | `  7.68 ns` | ` 11.58 ns` | ` 20.62 ns` |
| Ok.orElse (alloc)      | `  6.25 ns/iter` | `  6.02 ns` | `  6.15 ns` | `  9.05 ns` | ` 46.54 ns` |
| Err.orElse (alloc)     | `  8.18 ns/iter` | `  7.14 ns` | `  7.59 ns` | ` 20.20 ns` | `114.79 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.83 ns/iter` | ` 10.42 ns` | ` 10.53 ns` | ` 19.05 ns` | ` 29.21 ns` |
| Ok(Some).transpose                     | ` 49.88 ns/iter` | ` 43.36 ns` | ` 46.87 ns` | `130.23 ns` | `323.21 ns` |
| Ok(None).transpose                     | ` 33.80 ns/iter` | ` 29.98 ns` | ` 32.12 ns` | `105.92 ns` | `123.46 ns` |
| Err.transpose                          | ` 33.27 ns/iter` | ` 29.19 ns` | ` 31.39 ns` | `106.39 ns` | `120.34 ns` |
| Ok.match                               | ` 13.38 ns/iter` | ` 12.34 ns` | ` 12.91 ns` | ` 21.18 ns` | `120.06 ns` |
| Err.match                              | ` 14.62 ns/iter` | ` 13.75 ns` | ` 14.14 ns` | ` 21.50 ns` | `108.80 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 16.16 ns/iter` | ` 14.43 ns` | ` 15.27 ns` | ` 77.03 ns` | `104.55 ns` |
| Err.iter        | `  7.46 ns/iter` | `  7.29 ns` | `  7.30 ns` | ` 12.23 ns` | ` 21.86 ns` |

| • Result - fromThrowable         | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| fromThrowable (wrap + call, Ok)  | ` 19.73 ns/iter` | ` 16.76 ns` | ` 18.06 ns` | ` 89.06 ns` | `160.03 ns` |
| fromThrowable (call only, Ok)    | ` 13.98 ns/iter` | ` 12.72 ns` | ` 13.38 ns` | ` 20.63 ns` | `100.54 ns` |
| fromThrowable (wrap + call, Err) | `  1.20 µs/iter` | `  1.10 µs` | `  1.20 µs` | `  1.46 µs` | `  1.57 µs` |
| fromThrowable (call only, catch) | `  1.14 µs/iter` | `905.97 ns` | `  1.16 µs` | `  1.28 µs` | `  1.30 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.25 ns/iter` | `  6.03 ns` | `  6.16 ns` | `  8.77 ns` | ` 14.61 ns` |
| None.isSome()         | `  6.24 ns/iter` | `  6.03 ns` | `  6.15 ns` | `  8.81 ns` | ` 15.89 ns` |
| Some.isNone()         | `  6.26 ns/iter` | `  6.03 ns` | `  6.15 ns` | `  9.38 ns` | ` 17.50 ns` |
| None.isNone()         | `  6.24 ns/iter` | `  6.03 ns` | `  6.15 ns` | `  8.75 ns` | ` 15.73 ns` |
| Some.isSomeAnd (true) | `  6.59 ns/iter` | `  6.36 ns` | `  6.49 ns` | `  9.27 ns` | ` 30.10 ns` |
| None.isSomeAnd        | `  7.38 ns/iter` | `  7.06 ns` | `  7.29 ns` | `  9.84 ns` | ` 34.22 ns` |
| Some.isNoneOr (true)  | `  6.56 ns/iter` | `  6.34 ns` | `  6.46 ns` | `  9.20 ns` | ` 16.71 ns` |
| None.isNoneOr         | `  7.19 ns/iter` | `  6.95 ns` | `  7.06 ns` | ` 10.09 ns` | ` 28.74 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.19 ns/iter` | `  5.91 ns` | `  6.13 ns` | `  8.65 ns` | ` 13.82 ns` |
| Some.expect              | `  6.18 ns/iter` | `  5.86 ns` | `  6.11 ns` | `  8.66 ns` | ` 22.96 ns` |
| Some.unwrapOr            | `  6.16 ns/iter` | `  5.95 ns` | `  6.06 ns` | `  8.67 ns` | ` 15.92 ns` |
| None.unwrapOr            | `  6.05 ns/iter` | `  5.85 ns` | `  5.97 ns` | `  8.58 ns` | ` 16.25 ns` |
| Some.unwrapOrElse        | `  8.68 ns/iter` | `  7.76 ns` | `  8.12 ns` | ` 21.70 ns` | `100.44 ns` |
| None.unwrapOrElse        | `  9.33 ns/iter` | `  8.66 ns` | `  8.98 ns` | ` 14.29 ns` | ` 98.82 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 14.48 ns/iter` | ` 12.80 ns` | ` 13.73 ns` | ` 75.91 ns` | `101.02 ns` |
| None.map (alloc)      | `  6.43 ns/iter` | `  5.94 ns` | `  7.45 ns` | `  9.66 ns` | ` 34.14 ns` |
| Some.mapOr            | `  6.09 ns/iter` | `  5.94 ns` | `  5.95 ns` | `  9.83 ns` | ` 25.73 ns` |
| None.mapOr            | ` 13.82 ns/iter` | `  7.19 ns` | ` 14.11 ns` | ` 16.00 ns` | ` 33.39 ns` |
| Some.mapOrElse        | ` 12.90 ns/iter` | ` 11.79 ns` | ` 12.19 ns` | ` 27.56 ns` | `102.89 ns` |
| None.mapOrElse        | ` 13.81 ns/iter` | ` 13.05 ns` | ` 13.47 ns` | ` 18.89 ns` | ` 97.53 ns` |
| Some.inspect          | ` 10.02 ns/iter` | `  8.69 ns` | `  9.73 ns` | ` 14.14 ns` | ` 92.68 ns` |
| None.inspect          | ` 10.48 ns/iter` | `  8.43 ns` | ` 11.38 ns` | ` 15.14 ns` | `106.85 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 11.50 ns/iter` | ` 10.27 ns` | ` 10.98 ns` | ` 18.72 ns` | ` 96.86 ns` |
| None.okOr              | ` 12.60 ns/iter` | ` 11.34 ns` | ` 11.95 ns` | ` 23.26 ns` | `129.92 ns` |
| Some.okOrElse          | ` 16.47 ns/iter` | ` 14.94 ns` | ` 15.70 ns` | ` 76.00 ns` | `110.76 ns` |
| None.okOrElse          | ` 17.81 ns/iter` | ` 16.27 ns` | ` 17.05 ns` | ` 72.84 ns` | `108.45 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.91 ns/iter` | `  7.66 ns` | `  7.76 ns` | ` 11.61 ns` | ` 20.74 ns` |
| None.and (alloc)           | `  8.12 ns/iter` | `  7.89 ns` | `  7.99 ns` | ` 11.45 ns` | ` 19.32 ns` |
| Some.andThen (alloc)       | ` 21.26 ns/iter` | ` 18.66 ns` | ` 19.65 ns` | ` 90.95 ns` | `123.01 ns` |
| None.andThen (alloc)       | `  7.53 ns/iter` | `  7.36 ns` | `  7.37 ns` | ` 12.44 ns` | ` 22.86 ns` |
| Some.filter (true, reuse)  | `  8.00 ns/iter` | `  7.05 ns` | `  7.44 ns` | ` 20.45 ns` | ` 92.13 ns` |
| Some.filter (false, alloc) | ` 13.31 ns/iter` | ` 11.70 ns` | ` 12.53 ns` | ` 32.38 ns` | `106.09 ns` |
| None.filter (alloc)        | `  7.21 ns/iter` | `  7.05 ns` | `  7.06 ns` | ` 11.21 ns` | ` 28.95 ns` |
| Some.or (reuse)            | `  8.14 ns/iter` | `  7.98 ns` | `  7.99 ns` | ` 11.46 ns` | ` 21.68 ns` |
| None.or (reuse/optb)       | `  7.89 ns/iter` | `  7.66 ns` | `  7.76 ns` | ` 11.00 ns` | ` 19.13 ns` |
| Some.orElse (reuse)        | `  6.87 ns/iter` | `  6.64 ns` | `  6.76 ns` | `  9.42 ns` | ` 38.62 ns` |
| None.orElse (alloc)        | ` 11.34 ns/iter` | ` 10.25 ns` | ` 10.70 ns` | ` 25.83 ns` | ` 95.92 ns` |
| Some xor None (reuse)      | ` 10.38 ns/iter` | ` 10.14 ns` | ` 10.20 ns` | ` 15.46 ns` | ` 25.07 ns` |
| None xor Some (reuse/optb) | ` 10.34 ns/iter` | ` 10.14 ns` | ` 10.21 ns` | ` 13.93 ns` | ` 24.43 ns` |
| Some xor Some (alloc)      | ` 16.32 ns/iter` | ` 14.38 ns` | ` 15.30 ns` | ` 48.73 ns` | `115.58 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 16.77 ns/iter` | ` 14.51 ns` | ` 15.78 ns` | ` 87.53 ns` | `110.85 ns` |
| None.insert                     | ` 13.61 ns/iter` | ` 11.80 ns` | ` 12.88 ns` | ` 27.57 ns` | `106.63 ns` |
| Some.getOrInsert (existing)     | ` 13.32 ns/iter` | ` 11.56 ns` | ` 12.55 ns` | ` 28.67 ns` | `106.82 ns` |
| None.getOrInsert (insert)       | ` 15.65 ns/iter` | ` 13.90 ns` | ` 14.96 ns` | ` 27.60 ns` | `104.67 ns` |
| Some.getOrInsertWith (existing) | ` 21.12 ns/iter` | ` 19.02 ns` | ` 20.19 ns` | ` 91.43 ns` | `117.71 ns` |
| None.getOrInsertWith (insert)   | ` 21.91 ns/iter` | ` 19.76 ns` | ` 20.88 ns` | ` 93.27 ns` | `115.71 ns` |
| Some.take                       | ` 29.35 ns/iter` | ` 25.99 ns` | ` 27.82 ns` | `102.61 ns` | `125.07 ns` |
| None.take                       | ` 21.56 ns/iter` | ` 19.39 ns` | ` 20.46 ns` | ` 90.39 ns` | `114.36 ns` |
| Some.takeIf (true)              | ` 32.22 ns/iter` | ` 28.51 ns` | ` 30.55 ns` | `110.18 ns` | `126.99 ns` |
| Some.takeIf (false)             | ` 28.00 ns/iter` | ` 24.35 ns` | ` 26.69 ns` | `103.94 ns` | `123.41 ns` |
| Some.replace                    | ` 33.12 ns/iter` | ` 29.22 ns` | ` 31.47 ns` | `110.68 ns` | `131.56 ns` |
| None.replace                    | ` 26.47 ns/iter` | ` 23.55 ns` | ` 25.25 ns` | ` 98.80 ns` | `120.42 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  9.38 ns/iter` | `  9.11 ns` | `  9.23 ns` | ` 12.24 ns` | ` 33.39 ns` |
| Some(Ok).transpose                             | ` 51.66 ns/iter` | ` 45.36 ns` | ` 48.76 ns` | `140.75 ns` | `309.02 ns` |
| Some(Err).transpose                            | ` 38.37 ns/iter` | ` 34.81 ns` | ` 36.58 ns` | `112.80 ns` | `133.17 ns` |
| None.transpose                                 | ` 27.77 ns/iter` | ` 24.64 ns` | ` 26.28 ns` | `102.08 ns` | `133.73 ns` |
| Some.unzip                                     | ` 46.01 ns/iter` | ` 40.40 ns` | ` 43.30 ns` | `126.23 ns` | `197.29 ns` |
| None.unzip                                     | ` 31.58 ns/iter` | ` 27.74 ns` | ` 29.70 ns` | `106.25 ns` | `127.70 ns` |
| Some.match                                     | ` 15.59 ns/iter` | ` 14.41 ns` | ` 15.04 ns` | ` 24.08 ns` | `114.30 ns` |
| None.match                                     | ` 16.53 ns/iter` | ` 15.08 ns` | ` 16.04 ns` | ` 25.20 ns` | `110.34 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 15.65 ns/iter` | ` 13.41 ns` | ` 14.84 ns` | ` 56.82 ns` | `108.90 ns` |
| None.iter       | `  7.15 ns/iter` | `  6.87 ns` | `  6.99 ns` | ` 12.11 ns` | ` 31.63 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `232.37 ns/iter` | `214.68 ns` | `220.87 ns` | `424.65 ns` | `684.75 ns` |
| AsyncResult.unwrap (Err path)    | `225.79 ns/iter` | `216.18 ns` | `222.03 ns` | `320.85 ns` | `391.96 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `168.96 ns/iter` | `160.32 ns` | `166.41 ns` | `254.31 ns` | `315.11 ns` |
| Result.mapOrElseAsync (Err path)    | `166.97 ns/iter` | `159.96 ns` | `164.91 ns` | `251.06 ns` | `287.74 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `174.94 ns/iter` | `168.17 ns` | `173.18 ns` | `255.98 ns` | `269.05 ns` |
| Result.unwrapOrElseAsync (Err path) | `163.89 ns/iter` | `157.57 ns` | `162.13 ns` | `248.85 ns` | `261.29 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `659.09 ns/iter` | `638.77 ns` | `653.55 ns` | `772.98 ns` | `802.55 ns` |
| Err.mapAsync (alloc AsyncResult)        | `420.34 ns/iter` | `406.23 ns` | `414.00 ns` | `524.51 ns` | `702.89 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `421.72 ns/iter` | `408.25 ns` | `417.59 ns` | `517.08 ns` | `642.03 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `648.69 ns/iter` | `628.11 ns` | `641.33 ns` | `744.49 ns` | `995.05 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `648.98 ns/iter` | `630.04 ns` | `643.19 ns` | `750.38 ns` | `852.19 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `410.91 ns/iter` | `396.77 ns` | `405.44 ns` | `512.44 ns` | `616.50 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `412.48 ns/iter` | `398.22 ns` | `410.11 ns` | `515.51 ns` | `536.10 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `654.37 ns/iter` | `635.74 ns` | `649.86 ns` | `757.61 ns` | `768.51 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `581.70 ns/iter` | `562.86 ns` | `577.84 ns` | `678.78 ns` | `693.98 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `424.74 ns/iter` | `412.48 ns` | `421.32 ns` | `519.90 ns` | `538.22 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `414.01 ns/iter` | `400.47 ns` | `410.91 ns` | `518.53 ns` | `528.32 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `591.80 ns/iter` | `572.44 ns` | `586.26 ns` | `688.84 ns` | `700.56 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `387.48 ns/iter` | `376.91 ns` | `384.85 ns` | `484.48 ns` | `494.63 ns` |

| • Async Result - fromThrowableAsync      | avg              | min         | p75         | p99         | max         |
| ---------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| fromThrowableAsync (wrap + call, Ok)     | `726.23 ns/iter` | `705.26 ns` | `719.04 ns` | `832.33 ns` | `966.70 ns` |
| fromThrowableAsync (call only, Ok)       | `723.64 ns/iter` | `702.03 ns` | `716.15 ns` | `841.21 ns` | `990.75 ns` |
| fromThrowableAsync (wrap + call, reject) | `  1.30 µs/iter` | `  1.20 µs` | `  1.28 µs` | `  1.92 µs` | `  2.08 µs` |
| fromThrowableAsync (call only, reject)   | `  1.22 µs/iter` | `  1.18 µs` | `  1.21 µs` | `  1.36 µs` | `  1.76 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `240.40 ns/iter` | `231.66 ns` | `238.51 ns` | `343.87 ns` | `405.68 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.58 µs/iter` | `  1.36 µs` | `  1.52 µs` | `  2.21 µs` | `  2.45 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `188.49 ns/iter` | `173.47 ns` | `187.10 ns` | `337.87 ns` | `402.85 ns` |
| Option.mapOrElseAsync (None path)    | `177.13 ns/iter` | `169.21 ns` | `174.52 ns` | `276.19 ns` | `293.93 ns` |
| Option.unwrapOrElseAsync (Some path) | `189.77 ns/iter` | `181.38 ns` | `187.82 ns` | `284.24 ns` | `303.90 ns` |
| Option.unwrapOrElseAsync (None path) | `176.21 ns/iter` | `168.83 ns` | `174.06 ns` | `268.19 ns` | `294.33 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `666.65 ns/iter` | `646.80 ns` | `661.23 ns` | `773.42 ns` | `792.60 ns` |
| None.mapAsync (alloc AsyncOption)         | `433.25 ns/iter` | `416.19 ns` | `429.60 ns` | `544.72 ns` | `593.80 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `669.52 ns/iter` | `649.46 ns` | `664.02 ns` | `776.67 ns` | `817.44 ns` |
| None.inspectAsync (alloc AsyncOption)     | `417.91 ns/iter` | `403.54 ns` | `414.27 ns` | `523.09 ns` | `569.40 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `593.68 ns/iter` | `575.13 ns` | `588.81 ns` | `695.98 ns` | `703.11 ns` |
| None.andThenAsync (alloc AsyncOption)     | `423.89 ns/iter` | `407.52 ns` | `418.64 ns` | `537.60 ns` | `665.45 ns` |
| Some.filterAsync true (alloc AsyncOption) | `650.57 ns/iter` | `631.63 ns` | `644.29 ns` | `768.24 ns` | `774.76 ns` |
| None.filterAsync (alloc AsyncOption)      | `426.60 ns/iter` | `410.85 ns` | `420.01 ns` | `567.15 ns` | `718.71 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `419.46 ns/iter` | `402.74 ns` | `415.79 ns` | `538.96 ns` | `587.89 ns` |
| None.orElseAsync (alloc AsyncOption)      | `580.98 ns/iter` | `562.62 ns` | `575.82 ns` | `695.81 ns` | `822.66 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `423.74 ns/iter` | `404.19 ns` | `416.21 ns` | `623.61 ns` | `676.97 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `642.36 ns/iter` | `623.72 ns` | `636.36 ns` | `737.95 ns` | `759.50 ns` |
| Some.getOrInsertWithAsync (existing)      | `191.25 ns/iter` | `182.43 ns` | `188.52 ns` | `284.38 ns` | `379.33 ns` |
| None.getOrInsertWithAsync (insert)        | `588.12 ns/iter` | `565.00 ns` | `579.16 ns` | `723.44 ns` | `974.77 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `389.17 ns/iter` | `379.71 ns` | `386.45 ns` | `481.38 ns` | `492.82 ns` |
