# Benchmarks

clk: ~3.10 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.4.2 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  6.51 ns/iter` | `  4.95 ns` | `  5.77 ns` | ` 54.45 ns` | `169.12 ns` |
| Err(1)         | `  6.70 ns/iter` | `  4.97 ns` | `  5.95 ns` | ` 53.35 ns` | `113.84 ns` |
| Some(1)        | `  4.55 ns/iter` | `  3.03 ns` | `  4.04 ns` | ` 14.47 ns` | ` 97.44 ns` |
| None()         | `  5.39 ns/iter` | `  3.00 ns` | `  5.55 ns` | ` 14.04 ns` | ` 79.83 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.71 ns/iter` | `  1.47 ns` | `  8.14 ns` | ` 10.45 ns` | ` 20.95 ns` |
| Err.isOk()          | `  8.45 ns/iter` | `  7.83 ns` | `  9.07 ns` | ` 11.31 ns` | ` 23.59 ns` |
| Ok.isErr()          | `  9.44 ns/iter` | `  8.14 ns` | `  9.38 ns` | ` 15.48 ns` | ` 24.89 ns` |
| Err.isErr()         | `  9.56 ns/iter` | `  9.06 ns` | ` 10.30 ns` | ` 12.55 ns` | ` 22.06 ns` |
| Ok.isOkAnd (true)   | `  5.89 ns/iter` | `  4.94 ns` | `  5.99 ns` | `  8.27 ns` | ` 24.50 ns` |
| Err.isOkAnd         | `  6.67 ns/iter` | `  6.56 ns` | `  6.57 ns` | `  8.79 ns` | ` 38.80 ns` |
| Ok.isErrAnd         | `  3.32 ns/iter` | `  2.36 ns` | `  2.38 ns` | `  6.68 ns` | ` 22.03 ns` |
| Err.isErrAnd (true) | `  5.20 ns/iter` | `  5.09 ns` | `  5.10 ns` | `  8.09 ns` | ` 14.49 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | `  8.06 ns/iter` | `  7.18 ns` | `  7.64 ns` | ` 15.37 ns` | ` 77.85 ns` |
| Err.ok()               | `  9.67 ns/iter` | `  8.88 ns` | `  9.18 ns` | ` 16.16 ns` | ` 78.10 ns` |
| Ok.err()               | `  9.65 ns/iter` | `  8.27 ns` | `  8.73 ns` | ` 21.43 ns` | `104.18 ns` |
| Err.err()              | ` 10.67 ns/iter` | `  8.89 ns` | ` 11.65 ns` | ` 19.91 ns` | `106.10 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 13.11 ns/iter` | ` 11.86 ns` | ` 12.48 ns` | ` 60.82 ns` | ` 90.28 ns` |
| Err.map (reuse)       | `  9.57 ns/iter` | `  9.41 ns` | `  9.42 ns` | ` 11.95 ns` | ` 28.33 ns` |
| Ok.mapOr              | `  6.46 ns/iter` | `  6.02 ns` | `  6.80 ns` | `  8.95 ns` | ` 26.97 ns` |
| Err.mapOr             | `  8.20 ns/iter` | `  8.03 ns` | `  8.03 ns` | ` 10.33 ns` | ` 34.19 ns` |
| Ok.mapOrElse          | ` 12.16 ns/iter` | ` 11.43 ns` | ` 11.76 ns` | ` 17.83 ns` | ` 89.01 ns` |
| Err.mapOrElse         | ` 12.65 ns/iter` | ` 11.95 ns` | ` 12.18 ns` | ` 18.94 ns` | ` 83.04 ns` |
| Ok.mapErr (reuse)     | `  8.63 ns/iter` | `  8.49 ns` | `  8.49 ns` | ` 11.60 ns` | ` 20.39 ns` |
| Err.mapErr (alloc)    | ` 14.05 ns/iter` | ` 12.75 ns` | ` 13.38 ns` | ` 62.57 ns` | ` 92.58 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  7.48 ns/iter` | `  6.94 ns` | `  7.20 ns` | ` 11.42 ns` | ` 96.65 ns` |
| Err.inspect               | `  8.63 ns/iter` | `  7.87 ns` | `  8.27 ns` | ` 12.68 ns` | `109.16 ns` |
| Ok.inspectErr             | `  5.79 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  7.90 ns` | ` 30.24 ns` |
| Err.inspectErr            | `  7.55 ns/iter` | `  6.94 ns` | `  7.19 ns` | ` 11.65 ns` | ` 89.40 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  5.48 ns/iter` | `  5.41 ns` | `  5.41 ns` | `  7.59 ns` | ` 14.36 ns` |
| Err.unwrapErr            | `  5.48 ns/iter` | `  5.41 ns` | `  5.41 ns` | `  7.58 ns` | ` 20.58 ns` |
| Ok.expect                | `  5.49 ns/iter` | `  5.40 ns` | `  5.41 ns` | `  7.69 ns` | ` 20.60 ns` |
| Err.expectErr            | `  8.30 ns/iter` | `  8.18 ns` | `  8.19 ns` | ` 10.51 ns` | ` 23.23 ns` |
| Ok.unwrapOr              | `  5.47 ns/iter` | `  5.40 ns` | `  5.41 ns` | `  7.58 ns` | ` 13.08 ns` |
| Err.unwrapOr             | `  5.80 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  7.92 ns` | ` 16.35 ns` |
| Ok.unwrapOrElse          | `  5.48 ns/iter` | `  5.40 ns` | `  5.41 ns` | `  7.58 ns` | ` 26.71 ns` |
| Err.unwrapOrElse         | `  8.83 ns/iter` | `  8.17 ns` | `  8.47 ns` | ` 12.59 ns` | ` 99.32 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | ` 11.81 ns/iter` | ` 11.57 ns` | ` 11.58 ns` | ` 17.22 ns` | ` 36.01 ns` |
| Err.and (reuse)        | `  7.98 ns/iter` | `  7.87 ns` | `  7.88 ns` | ` 10.18 ns` | ` 20.28 ns` |
| Ok.andThen (alloc)     | ` 18.40 ns/iter` | ` 16.47 ns` | ` 17.48 ns` | ` 75.89 ns` | ` 97.80 ns` |
| Err.andThen (alloc)    | `  6.47 ns/iter` | `  6.33 ns` | `  6.34 ns` | `  9.08 ns` | ` 26.98 ns` |
| Ok.or (reuse)          | ` 11.40 ns/iter` | ` 11.26 ns` | ` 11.27 ns` | ` 13.69 ns` | ` 22.45 ns` |
| Err.or (reuse)         | `  7.36 ns/iter` | `  7.26 ns` | `  7.26 ns` | `  9.49 ns` | ` 16.28 ns` |
| Ok.orElse (alloc)      | `  5.81 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  7.93 ns` | ` 27.47 ns` |
| Err.orElse (alloc)     | `  7.59 ns/iter` | `  6.97 ns` | `  7.29 ns` | ` 10.60 ns` | ` 89.48 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  7.04 ns/iter` | `  6.95 ns` | `  6.95 ns` | `  9.17 ns` | ` 31.48 ns` |
| Ok(Some).transpose                     | ` 27.55 ns/iter` | ` 23.47 ns` | ` 25.78 ns` | ` 86.23 ns` | `110.08 ns` |
| Ok(None).transpose                     | ` 21.08 ns/iter` | ` 18.38 ns` | ` 19.81 ns` | ` 76.79 ns` | ` 96.05 ns` |
| Err.transpose                          | ` 21.00 ns/iter` | ` 17.97 ns` | ` 19.60 ns` | ` 81.59 ns` | `101.54 ns` |
| Ok.match                               | ` 12.65 ns/iter` | ` 11.90 ns` | ` 12.27 ns` | ` 18.60 ns` | `107.63 ns` |
| Err.match                              | ` 13.85 ns/iter` | ` 13.12 ns` | ` 13.39 ns` | ` 20.04 ns` | `102.97 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 14.03 ns/iter` | ` 12.34 ns` | ` 13.38 ns` | ` 64.74 ns` | ` 88.06 ns` |
| Err.iter        | `  6.44 ns/iter` | `  6.33 ns` | `  6.34 ns` | `  8.55 ns` | ` 27.86 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 18.94 ns/iter` | ` 16.48 ns` | ` 17.71 ns` | ` 77.67 ns` | `122.32 ns` |
| catchUnwind (call only, Ok)    | ` 13.81 ns/iter` | ` 12.34 ns` | ` 13.10 ns` | ` 62.75 ns` | ` 97.21 ns` |
| catchUnwind (wrap + call, Err) | `  1.04 µs/iter` | `994.63 ns` | `  1.04 µs` | `  1.37 µs` | `  1.38 µs` |
| catchUnwind (call only, catch) | `  1.01 µs/iter` | `928.81 ns` | `  1.01 µs` | `  1.11 µs` | `  1.12 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  4.64 ns/iter` | `  4.48 ns` | `  4.59 ns` | `  6.78 ns` | ` 12.64 ns` |
| None.isSome()         | `  4.85 ns/iter` | `  4.48 ns` | `  4.82 ns` | `  8.89 ns` | ` 16.57 ns` |
| Some.isNone()         | `  4.69 ns/iter` | `  4.51 ns` | `  4.69 ns` | `  6.83 ns` | ` 11.93 ns` |
| None.isNone()         | `  4.66 ns/iter` | `  4.48 ns` | `  4.66 ns` | `  6.78 ns` | ` 11.57 ns` |
| Some.isSomeAnd (true) | `  4.67 ns/iter` | `  4.48 ns` | `  4.62 ns` | `  6.80 ns` | ` 21.52 ns` |
| None.isSomeAnd        | `  5.80 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  7.90 ns` | ` 30.75 ns` |
| Some.isNoneOr (true)  | `  4.66 ns/iter` | `  4.48 ns` | `  4.60 ns` | `  6.78 ns` | ` 23.16 ns` |
| None.isNoneOr         | `  6.11 ns/iter` | `  6.02 ns` | `  6.03 ns` | `  8.24 ns` | ` 27.46 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  4.61 ns/iter` | `  4.45 ns` | `  4.56 ns` | `  6.70 ns` | ` 10.76 ns` |
| Some.expect              | `  4.63 ns/iter` | `  4.18 ns` | `  4.68 ns` | `  6.82 ns` | ` 14.78 ns` |
| Some.unwrapOr            | `  4.57 ns/iter` | `  4.18 ns` | `  4.54 ns` | `  6.69 ns` | ` 17.15 ns` |
| None.unwrapOr            | `  5.79 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  7.91 ns` | ` 37.93 ns` |
| Some.unwrapOrElse        | `  4.72 ns/iter` | `  4.45 ns` | `  4.76 ns` | `  6.92 ns` | ` 26.53 ns` |
| None.unwrapOrElse        | ` 10.03 ns/iter` | `  9.33 ns` | `  9.73 ns` | ` 13.71 ns` | ` 93.48 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | `  7.77 ns/iter` | `  6.81 ns` | `  7.43 ns` | ` 13.82 ns` | ` 94.32 ns` |
| None.map (alloc)      | `  6.11 ns/iter` | `  6.02 ns` | `  6.03 ns` | `  8.24 ns` | ` 29.99 ns` |
| Some.mapOr            | `  4.67 ns/iter` | `  4.49 ns` | `  4.57 ns` | `  8.12 ns` | ` 17.20 ns` |
| None.mapOr            | `  5.50 ns/iter` | `  5.41 ns` | `  5.41 ns` | `  7.62 ns` | ` 19.47 ns` |
| Some.mapOrElse        | `  4.63 ns/iter` | `  4.48 ns` | `  4.56 ns` | `  6.75 ns` | ` 26.98 ns` |
| None.mapOrElse        | `  7.88 ns/iter` | `  7.26 ns` | `  7.57 ns` | ` 13.02 ns` | ` 91.41 ns` |
| Some.inspect          | `  6.67 ns/iter` | `  6.07 ns` | `  6.39 ns` | `  9.35 ns` | ` 90.49 ns` |
| None.inspect          | `  6.45 ns/iter` | `  5.82 ns` | `  6.19 ns` | ` 10.81 ns` | ` 83.07 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 10.23 ns/iter` | `  8.91 ns` | `  9.71 ns` | ` 26.42 ns` | ` 96.64 ns` |
| None.okOr              | ` 11.11 ns/iter` | `  9.82 ns` | ` 10.51 ns` | ` 32.84 ns` | ` 96.48 ns` |
| Some.okOrElse          | ` 10.19 ns/iter` | `  8.86 ns` | `  9.68 ns` | ` 24.07 ns` | `100.37 ns` |
| None.okOrElse          | ` 13.55 ns/iter` | ` 11.88 ns` | ` 12.78 ns` | ` 69.43 ns` | ` 89.76 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.91 ns/iter` | `  8.80 ns` | `  8.80 ns` | ` 11.10 ns` | ` 19.61 ns` |
| None.and (alloc)           | `  4.90 ns/iter` | `  4.79 ns` | `  4.81 ns` | `  7.02 ns` | ` 13.34 ns` |
| Some.andThen (alloc)       | ` 14.21 ns/iter` | ` 12.78 ns` | ` 13.58 ns` | ` 30.96 ns` | `103.13 ns` |
| None.andThen (alloc)       | `  5.51 ns/iter` | `  5.41 ns` | `  5.41 ns` | `  7.70 ns` | ` 33.49 ns` |
| Some.filter (true, reuse)  | `  6.68 ns/iter` | `  6.07 ns` | `  6.41 ns` | `  9.65 ns` | ` 89.73 ns` |
| Some.filter (false, alloc) | `  9.56 ns/iter` | `  8.28 ns` | `  9.01 ns` | ` 22.27 ns` | ` 92.41 ns` |
| None.filter (alloc)        | `  4.66 ns/iter` | `  4.48 ns` | `  4.56 ns` | `  6.75 ns` | ` 22.19 ns` |
| Some.or (reuse)            | `  9.23 ns/iter` | `  9.11 ns` | `  9.11 ns` | ` 11.46 ns` | ` 21.09 ns` |
| None.or (reuse/optb)       | `  4.89 ns/iter` | `  4.79 ns` | `  4.81 ns` | `  7.01 ns` | ` 12.33 ns` |
| Some.orElse (reuse)        | `  4.86 ns/iter` | `  4.79 ns` | `  4.80 ns` | `  6.97 ns` | ` 19.41 ns` |
| None.orElse (alloc)        | `  8.30 ns/iter` | `  7.60 ns` | `  7.96 ns` | ` 16.31 ns` | ` 89.62 ns` |
| Some xor None (reuse)      | `  9.55 ns/iter` | `  9.41 ns` | `  9.42 ns` | ` 12.06 ns` | ` 19.33 ns` |
| None xor Some (reuse/optb) | `  5.46 ns/iter` | `  5.10 ns` | `  5.58 ns` | `  7.74 ns` | ` 14.87 ns` |
| Some xor Some (alloc)      | ` 12.45 ns/iter` | ` 11.42 ns` | ` 11.99 ns` | ` 22.00 ns` | ` 94.73 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | `  4.68 ns/iter` | `  4.18 ns` | `  4.66 ns` | `  6.84 ns` | ` 28.17 ns` |
| None.insert                     | `  4.73 ns/iter` | `  4.18 ns` | `  4.69 ns` | `  6.85 ns` | ` 22.94 ns` |
| Some.getOrInsert (existing)     | `  4.79 ns/iter` | `  4.48 ns` | `  4.83 ns` | `  7.07 ns` | ` 31.43 ns` |
| None.getOrInsert (insert)       | ` 13.88 ns/iter` | ` 12.46 ns` | ` 13.18 ns` | ` 57.87 ns` | `107.68 ns` |
| Some.getOrInsertWith (existing) | ` 13.75 ns/iter` | ` 12.50 ns` | ` 13.23 ns` | ` 24.10 ns` | ` 87.51 ns` |
| None.getOrInsertWith (insert)   | ` 14.06 ns/iter` | ` 12.71 ns` | ` 13.55 ns` | ` 25.90 ns` | ` 93.02 ns` |
| Some.take                       | ` 13.99 ns/iter` | ` 12.24 ns` | ` 13.37 ns` | ` 66.29 ns` | `105.03 ns` |
| None.take                       | ` 14.81 ns/iter` | ` 13.09 ns` | ` 14.19 ns` | ` 65.40 ns` | `100.73 ns` |
| Some.takeIf (true)              | ` 17.34 ns/iter` | ` 15.33 ns` | ` 16.49 ns` | ` 74.31 ns` | ` 98.95 ns` |
| Some.takeIf (false)             | ` 16.79 ns/iter` | ` 14.78 ns` | ` 15.99 ns` | ` 74.32 ns` | ` 92.23 ns` |
| Some.replace                    | `  7.76 ns/iter` | `  6.83 ns` | `  7.45 ns` | ` 11.86 ns` | ` 90.30 ns` |
| None.replace                    | ` 12.30 ns/iter` | ` 10.48 ns` | ` 11.80 ns` | ` 61.77 ns` | ` 91.69 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  4.91 ns/iter` | `  4.79 ns` | `  4.90 ns` | `  7.10 ns` | ` 15.59 ns` |
| Some(Ok).transpose                             | ` 31.87 ns/iter` | ` 27.79 ns` | ` 30.22 ns` | ` 95.47 ns` | `112.77 ns` |
| Some(Err).transpose                            | ` 28.12 ns/iter` | ` 24.72 ns` | ` 26.90 ns` | ` 92.04 ns` | `108.52 ns` |
| None.transpose                                 | ` 21.10 ns/iter` | ` 17.95 ns` | ` 20.05 ns` | ` 80.24 ns` | `102.09 ns` |
| Some.unzip                                     | ` 23.64 ns/iter` | ` 20.25 ns` | ` 22.47 ns` | ` 87.45 ns` | `102.03 ns` |
| None.unzip                                     | ` 21.55 ns/iter` | ` 18.42 ns` | ` 20.37 ns` | ` 86.47 ns` | `100.41 ns` |
| Some.match                                     | ` 13.22 ns/iter` | ` 12.08 ns` | ` 12.77 ns` | ` 19.60 ns` | `101.75 ns` |
| None.match                                     | ` 15.11 ns/iter` | ` 13.96 ns` | ` 14.61 ns` | ` 25.30 ns` | `104.55 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 10.92 ns/iter` | `  9.60 ns` | ` 10.53 ns` | ` 16.09 ns` | ` 89.47 ns` |
| None.iter       | `  6.12 ns/iter` | `  6.02 ns` | `  6.03 ns` | `  8.23 ns` | ` 30.68 ns` |

| • Async Result - terminal unwrap       | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)           | `158.30 ns/iter` | `139.71 ns` | `146.48 ns` | `343.87 ns` | `576.91 ns` |
| AsyncResult.unwrapErr (Err path)       | `148.44 ns/iter` | `141.65 ns` | `146.52 ns` | `217.77 ns` | `265.97 ns` |
| AsyncResult.unwrap (Err path -> panic) | `  1.30 µs/iter` | `  1.17 µs` | `  1.23 µs` | `  1.98 µs` | `  2.20 µs` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `118.81 ns/iter` | `111.96 ns` | `116.59 ns` | `200.08 ns` | `257.20 ns` |
| Result.mapOrElseAsync (Err path)    | `119.30 ns/iter` | `113.76 ns` | `118.00 ns` | `191.67 ns` | `237.91 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `118.74 ns/iter` | `113.68 ns` | `117.91 ns` | `188.75 ns` | `215.11 ns` |
| Result.unwrapOrElseAsync (Err path) | `115.98 ns/iter` | `109.76 ns` | `114.25 ns` | `190.39 ns` | `305.66 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `446.40 ns/iter` | `434.04 ns` | `442.46 ns` | `529.56 ns` | `536.87 ns` |
| Err.mapAsync (alloc AsyncResult)        | `264.99 ns/iter` | `256.96 ns` | `262.10 ns` | `339.09 ns` | `348.41 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `269.02 ns/iter` | `260.78 ns` | `265.54 ns` | `350.22 ns` | `444.48 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `452.23 ns/iter` | `436.12 ns` | `448.42 ns` | `534.13 ns` | `605.53 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `453.82 ns/iter` | `437.92 ns` | `448.67 ns` | `546.02 ns` | `645.84 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `266.95 ns/iter` | `258.68 ns` | `262.71 ns` | `346.39 ns` | `422.32 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `259.81 ns/iter` | `251.76 ns` | `256.65 ns` | `343.42 ns` | `442.63 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `465.06 ns/iter` | `449.64 ns` | `461.12 ns` | `562.52 ns` | `590.76 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `404.34 ns/iter` | `389.49 ns` | `400.35 ns` | `486.59 ns` | `697.98 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `264.48 ns/iter` | `255.60 ns` | `260.79 ns` | `349.40 ns` | `447.34 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `264.44 ns/iter` | `256.76 ns` | `261.22 ns` | `346.64 ns` | `450.82 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `410.40 ns/iter` | `396.91 ns` | `405.42 ns` | `488.86 ns` | `546.72 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `246.89 ns/iter` | `239.27 ns` | `244.68 ns` | `321.18 ns` | `347.96 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `515.00 ns/iter` | `501.08 ns` | `509.18 ns` | `595.05 ns` | `603.50 ns` |
| catchUnwindAsync (call only, Ok)       | `535.43 ns/iter` | `512.25 ns` | `525.87 ns` | `838.47 ns` | `  1.12 µs` |
| catchUnwindAsync (wrap + call, reject) | `  1.04 µs/iter` | `961.35 ns` | `  1.03 µs` | `  1.62 µs` | `  1.63 µs` |
| catchUnwindAsync (call only, reject)   | `  1.02 µs/iter` | `948.10 ns` | `  1.02 µs` | `  1.18 µs` | `  1.19 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `153.21 ns/iter` | `146.69 ns` | `151.79 ns` | `235.48 ns` | `324.01 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.22 µs/iter` | `  1.11 µs` | `  1.16 µs` | `  1.82 µs` | `  1.93 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `127.29 ns/iter` | `119.95 ns` | `124.72 ns` | `214.20 ns` | `251.76 ns` |
| Option.mapOrElseAsync (None path)    | `125.18 ns/iter` | `118.70 ns` | `123.58 ns` | `199.64 ns` | `243.42 ns` |
| Option.unwrapOrElseAsync (Some path) | `125.18 ns/iter` | `119.81 ns` | `124.02 ns` | `196.59 ns` | `209.94 ns` |
| Option.unwrapOrElseAsync (None path) | `124.43 ns/iter` | `118.84 ns` | `123.23 ns` | `196.31 ns` | `228.71 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `446.28 ns/iter` | `434.34 ns` | `441.66 ns` | `529.43 ns` | `563.43 ns` |
| None.mapAsync (alloc AsyncOption)         | `268.19 ns/iter` | `258.67 ns` | `264.41 ns` | `347.04 ns` | `374.26 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `458.33 ns/iter` | `442.75 ns` | `455.11 ns` | `538.29 ns` | `568.82 ns` |
| None.inspectAsync (alloc AsyncOption)     | `256.46 ns/iter` | `248.97 ns` | `253.25 ns` | `335.73 ns` | `350.34 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `394.32 ns/iter` | `381.86 ns` | `390.14 ns` | `472.77 ns` | `523.03 ns` |
| None.andThenAsync (alloc AsyncOption)     | `265.16 ns/iter` | `256.01 ns` | `262.27 ns` | `351.69 ns` | `366.76 ns` |
| Some.filterAsync true (alloc AsyncOption) | `446.26 ns/iter` | `430.10 ns` | `442.56 ns` | `528.32 ns` | `579.21 ns` |
| None.filterAsync (alloc AsyncOption)      | `264.37 ns/iter` | `256.43 ns` | `261.17 ns` | `342.48 ns` | `354.28 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `262.82 ns/iter` | `254.51 ns` | `259.66 ns` | `342.44 ns` | `349.93 ns` |
| None.orElseAsync (alloc AsyncOption)      | `385.76 ns/iter` | `373.47 ns` | `381.74 ns` | `477.07 ns` | `601.65 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `268.44 ns/iter` | `256.73 ns` | `265.19 ns` | `356.30 ns` | `372.16 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `434.01 ns/iter` | `421.07 ns` | `430.22 ns` | `517.76 ns` | `528.49 ns` |
| Some.getOrInsertWithAsync (existing)      | `128.79 ns/iter` | `122.33 ns` | `127.41 ns` | `209.71 ns` | `239.53 ns` |
| None.getOrInsertWithAsync (insert)        | `382.27 ns/iter` | `368.68 ns` | `377.90 ns` | `460.61 ns` | `497.44 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `243.70 ns/iter` | `234.75 ns` | `241.18 ns` | `322.33 ns` | `346.49 ns` |

| • Option - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.and some sync + sync          | `  4.79 ns/iter` | `  4.52 ns` | `  4.58 ns` | `  8.33 ns` | ` 16.94 ns` |
| Option.and some sync + async         | `366.75 ns/iter` | `348.68 ns` | `357.31 ns` | `656.55 ns` | `777.02 ns` |
| Option.and some async + sync         | `335.11 ns/iter` | `324.60 ns` | `332.61 ns` | `418.79 ns` | `545.28 ns` |
| Option.and some async + async        | `543.59 ns/iter` | `524.63 ns` | `535.79 ns` | `677.66 ns` | `900.18 ns` |
| Option.or some sync + sync           | `  5.67 ns/iter` | `  5.49 ns` | `  5.50 ns` | ` 11.40 ns` | ` 17.57 ns` |
| Option.or some sync + async          | `359.51 ns/iter` | `346.89 ns` | `355.68 ns` | `452.46 ns` | `559.61 ns` |
| Option.or some async + sync          | `340.60 ns/iter` | `325.83 ns` | `334.26 ns` | `589.81 ns` | `722.55 ns` |
| Option.or some async + async         | `551.85 ns/iter` | `532.33 ns` | `544.56 ns` | `658.51 ns` | `  1.10 µs` |
| Option.xor some sync + sync          | ` 14.26 ns/iter` | `  9.22 ns` | ` 13.75 ns` | ` 22.06 ns` | `113.96 ns` |
| Option.xor some sync + async         | `368.32 ns/iter` | `356.62 ns` | `363.71 ns` | `451.24 ns` | `491.99 ns` |
| Option.xor some async + sync         | `355.20 ns/iter` | `329.76 ns` | `341.30 ns` | `649.92 ns` | `718.03 ns` |
| Option.xor some async + async        | `563.36 ns/iter` | `543.58 ns` | `555.22 ns` | `690.50 ns` | `  1.09 µs` |
| Option.zip some sync + sync          | ` 16.45 ns/iter` | ` 12.55 ns` | ` 15.45 ns` | ` 52.95 ns` | `150.40 ns` |
| Option.zip some sync + async         | `385.46 ns/iter` | `362.49 ns` | `371.35 ns` | `718.81 ns` | `868.16 ns` |
| Option.zip some async + sync         | `349.75 ns/iter` | `333.48 ns` | `342.56 ns` | `581.81 ns` | `764.57 ns` |
| Option.zip some async + async        | `560.52 ns/iter` | `542.06 ns` | `559.99 ns` | `654.03 ns` | `669.48 ns` |
| Option.and none sync + sync          | `  5.38 ns/iter` | `  5.10 ns` | `  5.11 ns` | ` 13.35 ns` | ` 22.76 ns` |
| Option.and none sync + async         | `369.56 ns/iter` | `353.74 ns` | `360.81 ns` | `682.41 ns` | `766.62 ns` |
| Option.and none async + sync         | `335.56 ns/iter` | `322.96 ns` | `329.99 ns` | `443.45 ns` | `708.43 ns` |
| Option.and none async + async        | `548.62 ns/iter` | `530.89 ns` | `551.18 ns` | `646.72 ns` | `669.08 ns` |
| Option.or none sync + sync           | `  5.16 ns/iter` | `  5.02 ns` | `  5.03 ns` | `  7.26 ns` | ` 15.48 ns` |
| Option.or none sync + async          | `359.73 ns/iter` | `345.85 ns` | `356.18 ns` | `445.69 ns` | `527.65 ns` |
| Option.or none async + sync          | `332.87 ns/iter` | `320.28 ns` | `327.51 ns` | `437.61 ns` | `697.95 ns` |
| Option.or none async + async         | `559.33 ns/iter` | `534.37 ns` | `563.26 ns` | `684.67 ns` | `743.81 ns` |
| Option.xor none sync + sync          | `  5.69 ns/iter` | `  5.41 ns` | `  5.42 ns` | ` 14.46 ns` | ` 20.80 ns` |
| Option.xor none sync + async         | `365.75 ns/iter` | `350.96 ns` | `360.72 ns` | `455.87 ns` | `646.55 ns` |
| Option.xor none async + sync         | `330.33 ns/iter` | `317.99 ns` | `325.78 ns` | `433.29 ns` | `690.71 ns` |
| Option.xor none async + async        | `581.88 ns/iter` | `535.04 ns` | `571.13 ns` | `  1.06 µs` | `  1.11 µs` |
| Option.zip none sync + sync          | `  9.41 ns/iter` | `  8.38 ns` | `  9.02 ns` | ` 15.48 ns` | `114.32 ns` |
| Option.zip none sync + async         | `381.83 ns/iter` | `362.58 ns` | `374.58 ns` | `620.03 ns` | `744.55 ns` |
| Option.zip none async + sync         | `344.14 ns/iter` | `332.71 ns` | `341.69 ns` | `434.21 ns` | `476.95 ns` |
| Option.zip none async + async        | `590.02 ns/iter` | `560.14 ns` | `574.37 ns` | `978.36 ns` | `  1.21 µs` |

| • Result - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.and ok sync + sync            | `  7.66 ns/iter` | `  6.46 ns` | `  7.50 ns` | ` 10.56 ns` | ` 18.85 ns` |
| Result.and ok sync + async           | `352.93 ns/iter` | `336.70 ns` | `344.26 ns` | `653.33 ns` | `811.15 ns` |
| Result.and ok async + sync           | `351.02 ns/iter` | `338.89 ns` | `347.83 ns` | `436.41 ns` | `482.37 ns` |
| Result.and ok async + async          | `561.92 ns/iter` | `535.49 ns` | `549.53 ns` | `986.30 ns` | `  1.17 µs` |
| Result.or ok sync + sync             | `  8.49 ns/iter` | `  7.14 ns` | `  8.12 ns` | ` 19.05 ns` | ` 26.58 ns` |
| Result.or ok sync + async            | `372.69 ns/iter` | `348.43 ns` | `361.35 ns` | `665.50 ns` | `789.26 ns` |
| Result.or ok async + sync            | `352.98 ns/iter` | `336.66 ns` | `345.86 ns` | `566.31 ns` | `662.82 ns` |
| Result.or ok async + async           | `549.20 ns/iter` | `531.04 ns` | `544.94 ns` | `639.49 ns` | `684.11 ns` |
| Result.and err sync + sync           | `  9.10 ns/iter` | `  8.95 ns` | `  8.96 ns` | ` 11.70 ns` | ` 19.78 ns` |
| Result.and err sync + async          | `347.21 ns/iter` | `335.27 ns` | `343.75 ns` | `447.71 ns` | `484.72 ns` |
| Result.and err async + sync          | `352.54 ns/iter` | `341.05 ns` | `348.41 ns` | `441.18 ns` | `489.72 ns` |
| Result.and err async + async         | `547.72 ns/iter` | `530.44 ns` | `542.44 ns` | `651.61 ns` | `693.55 ns` |
| Result.or err sync + sync            | `  9.41 ns/iter` | `  9.26 ns` | `  9.27 ns` | ` 11.94 ns` | ` 21.06 ns` |
| Result.or err sync + async           | `365.75 ns/iter` | `350.98 ns` | `359.36 ns` | `554.12 ns` | `664.79 ns` |
| Result.or err async + sync           | `341.25 ns/iter` | `330.48 ns` | `337.09 ns` | `443.38 ns` | `623.83 ns` |
| Result.or err async + async          | `563.76 ns/iter` | `549.72 ns` | `559.27 ns` | `659.42 ns` | `723.58 ns` |

| • AsyncOption - Some wrapper methods | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.toString (Some)          | `157.50 ns/iter` | `150.99 ns` | `156.29 ns` | `233.25 ns` | `269.79 ns` |
| AsyncOption.iter (Some)              | `359.36 ns/iter` | `348.38 ns` | `355.45 ns` | `439.49 ns` | `574.90 ns` |
| AsyncOption.then (Some)              | `170.23 ns/iter` | `163.79 ns` | `168.68 ns` | `247.09 ns` | `256.19 ns` |
| AsyncOption.isSome (Some)            | `160.54 ns/iter` | `154.65 ns` | `159.65 ns` | `231.36 ns` | `278.50 ns` |
| AsyncOption.isSomeAnd (Some)         | `168.25 ns/iter` | `161.85 ns` | `166.39 ns` | `245.79 ns` | `307.71 ns` |
| AsyncOption.isNone (Some)            | `162.40 ns/iter` | `156.21 ns` | `161.16 ns` | `237.50 ns` | `263.66 ns` |
| AsyncOption.isNoneOr (Some)          | `162.12 ns/iter` | `155.84 ns` | `160.37 ns` | `240.26 ns` | `280.72 ns` |
| AsyncOption.expect (Some)            | `166.06 ns/iter` | `159.36 ns` | `164.52 ns` | `241.40 ns` | `282.42 ns` |
| AsyncOption.unwrap (Some)            | `160.82 ns/iter` | `154.61 ns` | `159.75 ns` | `237.37 ns` | `260.30 ns` |
| AsyncOption.unwrapOr (Some)          | `163.70 ns/iter` | `155.96 ns` | `161.34 ns` | `241.73 ns` | `341.67 ns` |
| AsyncOption.unwrapOrElse (Some)      | `165.73 ns/iter` | `158.85 ns` | `163.88 ns` | `242.48 ns` | `280.33 ns` |
| AsyncOption.unwrapOrElseAsync (Some) | `230.79 ns/iter` | `221.76 ns` | `228.47 ns` | `307.60 ns` | `314.26 ns` |
| AsyncOption.map (Some)               | `351.16 ns/iter` | `340.23 ns` | `346.76 ns` | `437.45 ns` | `444.94 ns` |
| AsyncOption.mapAsync (Some)          | `674.66 ns/iter` | `656.01 ns` | `671.17 ns` | `763.55 ns` | `780.09 ns` |
| AsyncOption.inspect (Some)           | `339.33 ns/iter` | `329.45 ns` | `335.75 ns` | `428.81 ns` | `491.57 ns` |
| AsyncOption.inspectAsync (Some)      | `671.62 ns/iter` | `649.33 ns` | `668.39 ns` | `762.63 ns` | `793.99 ns` |
| AsyncOption.mapOr (Some)             | `166.17 ns/iter` | `158.61 ns` | `164.10 ns` | `247.62 ns` | `265.15 ns` |
| AsyncOption.mapOrElse (Some)         | `168.57 ns/iter` | `161.66 ns` | `166.66 ns` | `249.47 ns` | `267.71 ns` |
| AsyncOption.mapOrElseAsync (Some)    | `225.91 ns/iter` | `216.99 ns` | `224.15 ns` | `308.86 ns` | `328.53 ns` |
| AsyncOption.okOr (Some)              | `351.11 ns/iter` | `340.48 ns` | `347.94 ns` | `436.30 ns` | `540.24 ns` |
| AsyncOption.okOrElse (Some)          | `353.83 ns/iter` | `342.63 ns` | `349.84 ns` | `441.70 ns` | `478.24 ns` |
| AsyncOption.okOrElseAsync (Some)     | `518.72 ns/iter` | `500.76 ns` | `516.08 ns` | `613.99 ns` | `650.56 ns` |
| AsyncOption.and (Some)               | `346.79 ns/iter` | `335.35 ns` | `343.82 ns` | `443.50 ns` | `552.99 ns` |
| AsyncOption.andThen (Some)           | `350.44 ns/iter` | `339.66 ns` | `346.52 ns` | `437.08 ns` | `491.25 ns` |
| AsyncOption.andThenAsync (Some)      | `620.56 ns/iter` | `597.17 ns` | `616.20 ns` | `723.52 ns` | `969.34 ns` |
| AsyncOption.filter (Some)            | `348.06 ns/iter` | `337.43 ns` | `344.18 ns` | `434.00 ns` | `470.18 ns` |
| AsyncOption.filterAsync (Some)       | `673.35 ns/iter` | `652.80 ns` | `668.12 ns` | `765.03 ns` | `974.57 ns` |
| AsyncOption.or (Some)                | `344.40 ns/iter` | `332.98 ns` | `340.15 ns` | `434.51 ns` | `445.19 ns` |
| AsyncOption.orElse (Some)            | `336.99 ns/iter` | `327.38 ns` | `333.39 ns` | `422.27 ns` | `439.27 ns` |
| AsyncOption.orElseAsync (Some)       | `490.30 ns/iter` | `473.21 ns` | `485.41 ns` | `584.85 ns` | `594.47 ns` |
| AsyncOption.xor (Some)               | `347.47 ns/iter` | `337.12 ns` | `343.89 ns` | `436.11 ns` | `460.85 ns` |
| AsyncOption.flatten (Some)           | `334.22 ns/iter` | `325.00 ns` | `331.51 ns` | `425.04 ns` | `429.86 ns` |
| AsyncOption.transpose (Some)         | `367.28 ns/iter` | `356.36 ns` | `364.91 ns` | `452.83 ns` | `467.64 ns` |
| AsyncOption.zip (Some)               | `359.95 ns/iter` | `344.80 ns` | `354.88 ns` | `464.49 ns` | `492.48 ns` |
| AsyncOption.unzip (Some)             | `866.11 ns/iter` | `837.06 ns` | `860.42 ns` | `992.67 ns` | `  1.44 µs` |
| AsyncOption.match (Some)             | `171.21 ns/iter` | `163.42 ns` | `169.00 ns` | `251.12 ns` | `286.36 ns` |

| • AsyncOption - None wrapper methods | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.toString (None)          | `158.08 ns/iter` | `152.53 ns` | `157.15 ns` | `233.59 ns` | `260.75 ns` |
| AsyncOption.iter (None)              | `267.18 ns/iter` | `257.86 ns` | `263.53 ns` | `348.59 ns` | `359.20 ns` |
| AsyncOption.then (None)              | `170.59 ns/iter` | `164.88 ns` | `169.85 ns` | `246.63 ns` | `255.95 ns` |
| AsyncOption.isSome (None)            | `165.66 ns/iter` | `158.30 ns` | `165.11 ns` | `244.55 ns` | `260.64 ns` |
| AsyncOption.isSomeAnd (None)         | `171.10 ns/iter` | `164.35 ns` | `169.21 ns` | `251.37 ns` | `262.70 ns` |
| AsyncOption.isNone (None)            | `164.19 ns/iter` | `158.15 ns` | `162.74 ns` | `239.63 ns` | `257.94 ns` |
| AsyncOption.isNoneOr (None)          | `163.03 ns/iter` | `156.56 ns` | `161.66 ns` | `242.62 ns` | `250.79 ns` |
| AsyncOption.expect (None)            | `  1.27 µs/iter` | `  1.14 µs` | `  1.22 µs` | `  1.80 µs` | `  1.83 µs` |
| AsyncOption.unwrap (None)            | `  1.20 µs/iter` | `  1.12 µs` | `  1.17 µs` | `  1.77 µs` | `  1.77 µs` |
| AsyncOption.unwrapOr (None)          | `168.05 ns/iter` | `160.21 ns` | `165.22 ns` | `262.12 ns` | `314.63 ns` |
| AsyncOption.unwrapOrElse (None)      | `172.29 ns/iter` | `164.28 ns` | `169.78 ns` | `252.80 ns` | `290.12 ns` |
| AsyncOption.unwrapOrElseAsync (None) | `225.25 ns/iter` | `216.20 ns` | `223.68 ns` | `311.79 ns` | `327.95 ns` |
| AsyncOption.map (None)               | `346.11 ns/iter` | `334.71 ns` | `343.21 ns` | `436.52 ns` | `448.09 ns` |
| AsyncOption.mapAsync (None)          | `509.15 ns/iter` | `492.65 ns` | `505.80 ns` | `609.97 ns` | `631.22 ns` |
| AsyncOption.inspect (None)           | `343.71 ns/iter` | `332.79 ns` | `340.73 ns` | `432.80 ns` | `447.50 ns` |
| AsyncOption.inspectAsync (None)      | `501.91 ns/iter` | `486.14 ns` | `498.76 ns` | `590.91 ns` | `596.40 ns` |
| AsyncOption.mapOr (None)             | `166.51 ns/iter` | `159.11 ns` | `164.94 ns` | `243.90 ns` | `280.22 ns` |
| AsyncOption.mapOrElse (None)         | `166.97 ns/iter` | `159.46 ns` | `164.84 ns` | `247.93 ns` | `276.09 ns` |
| AsyncOption.mapOrElseAsync (None)    | `233.15 ns/iter` | `223.07 ns` | `230.29 ns` | `317.39 ns` | `349.76 ns` |
| AsyncOption.okOr (None)              | `352.10 ns/iter` | `341.19 ns` | `349.26 ns` | `437.92 ns` | `453.23 ns` |
| AsyncOption.okOrElse (None)          | `357.69 ns/iter` | `344.73 ns` | `352.69 ns` | `455.19 ns` | `471.11 ns` |
| AsyncOption.okOrElseAsync (None)     | `663.03 ns/iter` | `642.41 ns` | `656.51 ns` | `761.65 ns` | `776.59 ns` |
| AsyncOption.and (None)               | `348.33 ns/iter` | `337.66 ns` | `344.66 ns` | `426.34 ns` | `440.13 ns` |
| AsyncOption.andThen (None)           | `346.24 ns/iter` | `335.90 ns` | `341.92 ns` | `434.42 ns` | `440.62 ns` |
| AsyncOption.andThenAsync (None)      | `509.61 ns/iter` | `490.43 ns` | `504.67 ns` | `631.34 ns` | `723.59 ns` |
| AsyncOption.filter (None)            | `352.50 ns/iter` | `341.92 ns` | `351.20 ns` | `449.28 ns` | `461.74 ns` |
| AsyncOption.filterAsync (None)       | `511.60 ns/iter` | `493.46 ns` | `508.76 ns` | `614.84 ns` | `632.31 ns` |
| AsyncOption.or (None)                | `345.04 ns/iter` | `334.36 ns` | `341.77 ns` | `432.92 ns` | `441.18 ns` |
| AsyncOption.orElse (None)            | `348.44 ns/iter` | `337.37 ns` | `345.10 ns` | `437.28 ns` | `548.79 ns` |
| AsyncOption.orElseAsync (None)       | `614.82 ns/iter` | `598.54 ns` | `610.52 ns` | `699.87 ns` | `721.34 ns` |
| AsyncOption.xor (None)               | `347.88 ns/iter` | `339.23 ns` | `344.53 ns` | `431.95 ns` | `434.25 ns` |
| AsyncOption.flatten (None)           | `339.19 ns/iter` | `328.63 ns` | `336.07 ns` | `430.91 ns` | `440.13 ns` |
| AsyncOption.transpose (None)         | `359.33 ns/iter` | `347.60 ns` | `356.72 ns` | `447.59 ns` | `452.10 ns` |
| AsyncOption.zip (None)               | `355.24 ns/iter` | `342.82 ns` | `350.59 ns` | `442.14 ns` | `448.51 ns` |
| AsyncOption.unzip (None)             | `870.45 ns/iter` | `846.05 ns` | `863.93 ns` | `996.76 ns` | `  1.01 µs` |
| AsyncOption.match (None)             | `178.53 ns/iter` | `167.68 ns` | `174.95 ns` | `296.00 ns` | `314.19 ns` |

| • AsyncResult - Ok wrapper methods | avg              | min         | p75         | p99         | max         |
| ---------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.toString (Ok)          | `168.62 ns/iter` | `162.13 ns` | `167.14 ns` | `249.32 ns` | `267.20 ns` |
| AsyncResult.iter (Ok)              | `357.30 ns/iter` | `346.43 ns` | `352.23 ns` | `443.47 ns` | `484.17 ns` |
| AsyncResult.then (Ok)              | `170.32 ns/iter` | `164.14 ns` | `168.70 ns` | `248.55 ns` | `264.00 ns` |
| AsyncResult.isOk (Ok)              | `164.42 ns/iter` | `158.10 ns` | `163.01 ns` | `242.44 ns` | `263.69 ns` |
| AsyncResult.isOkAnd (Ok)           | `168.31 ns/iter` | `161.45 ns` | `166.67 ns` | `245.79 ns` | `294.47 ns` |
| AsyncResult.isErr (Ok)             | `163.71 ns/iter` | `157.78 ns` | `162.72 ns` | `242.28 ns` | `269.62 ns` |
| AsyncResult.isErrAnd (Ok)          | `165.06 ns/iter` | `157.63 ns` | `163.41 ns` | `243.89 ns` | `258.66 ns` |
| AsyncResult.ok (Ok)                | `344.33 ns/iter` | `334.91 ns` | `340.78 ns` | `431.75 ns` | `451.14 ns` |
| AsyncResult.err (Ok)               | `349.87 ns/iter` | `340.18 ns` | `346.81 ns` | `432.91 ns` | `453.59 ns` |
| AsyncResult.map (Ok)               | `357.26 ns/iter` | `347.50 ns` | `353.63 ns` | `439.16 ns` | `483.05 ns` |
| AsyncResult.mapAsync (Ok)          | `679.41 ns/iter` | `657.04 ns` | `672.37 ns` | `780.86 ns` | `835.06 ns` |
| AsyncResult.mapOr (Ok)             | `171.33 ns/iter` | `159.26 ns` | `164.82 ns` | `328.11 ns` | `361.21 ns` |
| AsyncResult.mapOrElse (Ok)         | `170.50 ns/iter` | `157.30 ns` | `162.55 ns` | `391.07 ns` | `583.88 ns` |
| AsyncResult.mapOrElseAsync (Ok)    | `227.87 ns/iter` | `217.85 ns` | `225.70 ns` | `312.83 ns` | `400.08 ns` |
| AsyncResult.mapErr (Ok)            | `352.76 ns/iter` | `341.28 ns` | `349.00 ns` | `442.34 ns` | `495.32 ns` |
| AsyncResult.mapErrAsync (Ok)       | `505.98 ns/iter` | `489.11 ns` | `501.21 ns` | `605.30 ns` | `646.72 ns` |
| AsyncResult.inspect (Ok)           | `342.85 ns/iter` | `332.63 ns` | `338.29 ns` | `427.83 ns` | `433.28 ns` |
| AsyncResult.inspectAsync (Ok)      | `675.10 ns/iter` | `649.89 ns` | `664.41 ns` | `783.98 ns` | `  1.03 µs` |
| AsyncResult.inspectErr (Ok)        | `349.67 ns/iter` | `337.94 ns` | `344.77 ns` | `434.04 ns` | `533.56 ns` |
| AsyncResult.inspectErrAsync (Ok)   | `495.99 ns/iter` | `477.81 ns` | `491.76 ns` | `599.62 ns` | `817.90 ns` |
| AsyncResult.expect (Ok)            | `162.84 ns/iter` | `155.58 ns` | `160.39 ns` | `241.96 ns` | `294.55 ns` |
| AsyncResult.unwrap (Ok)            | `174.16 ns/iter` | `166.91 ns` | `172.83 ns` | `253.80 ns` | `278.33 ns` |
| AsyncResult.expectErr (Ok)         | `  1.41 µs/iter` | `  1.30 µs` | `  1.34 µs` | `  2.00 µs` | `  2.02 µs` |
| AsyncResult.unwrapErr (Ok)         | `  1.42 µs/iter` | `  1.28 µs` | `  1.34 µs` | `  1.99 µs` | `  2.32 µs` |
| AsyncResult.and (Ok)               | `361.06 ns/iter` | `349.27 ns` | `356.67 ns` | `445.62 ns` | `470.00 ns` |
| AsyncResult.andThen (Ok)           | `360.47 ns/iter` | `348.85 ns` | `355.50 ns` | `445.44 ns` | `571.26 ns` |
| AsyncResult.andThenAsync (Ok)      | `632.22 ns/iter` | `612.98 ns` | `625.65 ns` | `719.08 ns` | `  1.02 µs` |
| AsyncResult.or (Ok)                | `366.40 ns/iter` | `355.49 ns` | `361.85 ns` | `450.26 ns` | `459.51 ns` |
| AsyncResult.orElse (Ok)            | `350.88 ns/iter` | `341.43 ns` | `347.11 ns` | `435.13 ns` | `461.94 ns` |
| AsyncResult.orElseAsync (Ok)       | `510.73 ns/iter` | `492.22 ns` | `505.46 ns` | `609.68 ns` | `658.84 ns` |
| AsyncResult.unwrapOr (Ok)          | `164.34 ns/iter` | `156.84 ns` | `162.79 ns` | `242.15 ns` | `272.10 ns` |
| AsyncResult.unwrapOrElse (Ok)      | `178.31 ns/iter` | `170.85 ns` | `176.30 ns` | `262.36 ns` | `279.62 ns` |
| AsyncResult.unwrapOrElseAsync (Ok) | `235.02 ns/iter` | `224.90 ns` | `233.50 ns` | `323.46 ns` | `352.59 ns` |
| AsyncResult.flatten (Ok)           | `349.33 ns/iter` | `339.76 ns` | `346.00 ns` | `433.31 ns` | `446.03 ns` |
| AsyncResult.transpose (Ok)         | `362.46 ns/iter` | `350.60 ns` | `358.70 ns` | `455.34 ns` | `482.85 ns` |
| AsyncResult.match (Ok)             | `169.24 ns/iter` | `162.51 ns` | `167.20 ns` | `250.29 ns` | `264.69 ns` |

| • AsyncResult - Err wrapper methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.toString (Err)          | `168.82 ns/iter` | `161.88 ns` | `167.18 ns` | `254.63 ns` | `300.06 ns` |
| AsyncResult.iter (Err)              | `273.03 ns/iter` | `262.45 ns` | `269.60 ns` | `364.92 ns` | `373.35 ns` |
| AsyncResult.then (Err)              | `166.75 ns/iter` | `160.90 ns` | `165.66 ns` | `246.81 ns` | `255.86 ns` |
| AsyncResult.isOk (Err)              | `159.59 ns/iter` | `153.62 ns` | `158.42 ns` | `240.72 ns` | `259.15 ns` |
| AsyncResult.isOkAnd (Err)           | `162.86 ns/iter` | `155.47 ns` | `161.29 ns` | `248.17 ns` | `305.27 ns` |
| AsyncResult.isErr (Err)             | `159.32 ns/iter` | `153.35 ns` | `158.13 ns` | `241.26 ns` | `263.15 ns` |
| AsyncResult.isErrAnd (Err)          | `165.77 ns/iter` | `159.21 ns` | `164.14 ns` | `247.27 ns` | `278.85 ns` |
| AsyncResult.ok (Err)                | `336.19 ns/iter` | `326.32 ns` | `333.50 ns` | `419.00 ns` | `423.65 ns` |
| AsyncResult.err (Err)               | `347.46 ns/iter` | `337.19 ns` | `343.72 ns` | `438.25 ns` | `447.19 ns` |
| AsyncResult.map (Err)               | `345.95 ns/iter` | `336.08 ns` | `342.59 ns` | `432.06 ns` | `445.70 ns` |
| AsyncResult.mapAsync (Err)          | `512.36 ns/iter` | `494.87 ns` | `505.36 ns` | `618.31 ns` | `663.49 ns` |
| AsyncResult.mapOr (Err)             | `164.12 ns/iter` | `157.47 ns` | `162.59 ns` | `244.56 ns` | `251.09 ns` |
| AsyncResult.mapOrElse (Err)         | `169.14 ns/iter` | `162.26 ns` | `166.90 ns` | `248.38 ns` | `255.20 ns` |
| AsyncResult.mapOrElseAsync (Err)    | `227.87 ns/iter` | `218.25 ns` | `224.99 ns` | `309.41 ns` | `318.05 ns` |
| AsyncResult.mapErr (Err)            | `366.97 ns/iter` | `357.02 ns` | `363.23 ns` | `453.43 ns` | `465.38 ns` |
| AsyncResult.mapErrAsync (Err)       | `693.95 ns/iter` | `670.21 ns` | `685.44 ns` | `816.02 ns` | `944.06 ns` |
| AsyncResult.inspect (Err)           | `351.76 ns/iter` | `329.91 ns` | `339.52 ns` | `661.48 ns` | `695.63 ns` |
| AsyncResult.inspectAsync (Err)      | `513.32 ns/iter` | `496.10 ns` | `506.75 ns` | `616.95 ns` | `634.93 ns` |
| AsyncResult.inspectErr (Err)        | `338.85 ns/iter` | `328.51 ns` | `334.95 ns` | `430.71 ns` | `484.38 ns` |
| AsyncResult.inspectErrAsync (Err)   | `676.50 ns/iter` | `655.35 ns` | `667.69 ns` | `771.94 ns` | `965.64 ns` |
| AsyncResult.expect (Err)            | `  1.32 µs/iter` | `  1.20 µs` | `  1.25 µs` | `  1.90 µs` | `  1.94 µs` |
| AsyncResult.unwrap (Err)            | `  1.25 µs/iter` | `  1.17 µs` | `  1.23 µs` | `  1.83 µs` | `  1.83 µs` |
| AsyncResult.expectErr (Err)         | `167.72 ns/iter` | `161.36 ns` | `165.86 ns` | `250.58 ns` | `291.24 ns` |
| AsyncResult.unwrapErr (Err)         | `162.59 ns/iter` | `156.74 ns` | `161.57 ns` | `242.63 ns` | `251.10 ns` |
| AsyncResult.and (Err)               | `364.07 ns/iter` | `354.55 ns` | `360.66 ns` | `446.61 ns` | `453.57 ns` |
| AsyncResult.andThen (Err)           | `347.01 ns/iter` | `335.21 ns` | `342.84 ns` | `433.45 ns` | `448.20 ns` |
| AsyncResult.andThenAsync (Err)      | `511.31 ns/iter` | `495.30 ns` | `505.87 ns` | `605.87 ns` | `703.85 ns` |
| AsyncResult.or (Err)                | `363.30 ns/iter` | `353.72 ns` | `360.29 ns` | `448.06 ns` | `457.65 ns` |
| AsyncResult.orElse (Err)            | `361.34 ns/iter` | `350.58 ns` | `356.80 ns` | `443.50 ns` | `546.44 ns` |
| AsyncResult.orElseAsync (Err)       | `644.35 ns/iter` | `623.06 ns` | `639.73 ns` | `748.67 ns` | `752.97 ns` |
| AsyncResult.unwrapOr (Err)          | `164.72 ns/iter` | `157.87 ns` | `163.16 ns` | `245.57 ns` | `271.82 ns` |
| AsyncResult.unwrapOrElse (Err)      | `163.53 ns/iter` | `156.86 ns` | `161.88 ns` | `244.10 ns` | `285.98 ns` |
| AsyncResult.unwrapOrElseAsync (Err) | `233.56 ns/iter` | `223.54 ns` | `232.59 ns` | `322.36 ns` | `390.08 ns` |
| AsyncResult.flatten (Err)           | `352.45 ns/iter` | `341.89 ns` | `349.18 ns` | `436.81 ns` | `487.88 ns` |
| AsyncResult.transpose (Err)         | `350.63 ns/iter` | `340.64 ns` | `347.45 ns` | `434.78 ns` | `440.65 ns` |
| AsyncResult.match (Err)             | `168.67 ns/iter` | `162.09 ns` | `166.72 ns` | `249.29 ns` | `258.74 ns` |

| • Public async iteration - Some, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Some, resolved wrapper)     | `519.13 ns/iter` | `506.31 ns` | `514.22 ns` | `607.27 ns` | `627.17 ns` |
| public iter production (Some, resolved wrapper)   | `289.82 ns/iter` | `278.48 ns` | `287.41 ns` | `373.14 ns` | `599.00 ns` |

| • Public async iteration - Some, fresh wrapper | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Some, fresh wrapper)     | `758.16 ns/iter` | `734.15 ns` | `753.82 ns` | `860.27 ns` | `877.53 ns` |
| public iter production (Some, fresh wrapper)   | `483.75 ns/iter` | `469.08 ns` | `479.26 ns` | `568.32 ns` | `581.55 ns` |

| • Async iteration comparison - Some, resolved promise | avg              | min         | p75         | p99         | max         |
| ----------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Some, resolved promise)                | `345.38 ns/iter` | `333.31 ns` | `341.56 ns` | `435.34 ns` | `443.19 ns` |
| iter implicitAwait (Some, resolved promise)           | `312.21 ns/iter` | `300.89 ns` | `307.94 ns` | `396.72 ns` | `431.12 ns` |
| iter delegate (Some, resolved promise)                | `631.92 ns/iter` | `616.06 ns` | `629.13 ns` | `729.83 ns` | `734.87 ns` |
| iter direct (Some, resolved promise)                  | `294.99 ns/iter` | `284.47 ns` | `292.49 ns` | `384.71 ns` | `518.84 ns` |
| iter thenIterator (Some, resolved promise)            | `640.66 ns/iter` | `618.10 ns` | `634.95 ns` | `740.80 ns` | `835.19 ns` |
| iter fastThenIterator (Some, resolved promise)        | `549.16 ns/iter` | `524.48 ns` | `543.28 ns` | `769.10 ns` | `986.43 ns` |
| iter singleReadThenIterator (Some, resolved promise)  | `394.39 ns/iter` | `376.66 ns` | `395.80 ns` | `522.69 ns` | `664.96 ns` |

| • Async iteration comparison - Some, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ----------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Some, resolved wrapper)                | `669.76 ns/iter` | `623.12 ns` | `688.57 ns` | `870.88 ns` | `898.86 ns` |
| iter implicitAwait (Some, resolved wrapper)           | `638.55 ns/iter` | `592.05 ns` | `677.91 ns` | `764.59 ns` | `780.24 ns` |
| iter delegate (Some, resolved wrapper)                | `  1.02 µs/iter` | `956.45 ns` | `  1.04 µs` | `  1.13 µs` | `  1.14 µs` |
| iter direct (Some, resolved wrapper)                  | `606.67 ns/iter` | `569.77 ns` | `650.07 ns` | `755.21 ns` | `767.98 ns` |
| iter thenIterator (Some, resolved wrapper)            | `921.09 ns/iter` | `891.07 ns` | `919.00 ns` | `  1.03 µs` | `  1.07 µs` |
| iter fastThenIterator (Some, resolved wrapper)        | `855.63 ns/iter` | `784.51 ns` | `855.20 ns` | `949.55 ns` | `954.66 ns` |
| iter singleReadThenIterator (Some, resolved wrapper)  | `674.13 ns/iter` | `568.37 ns` | `693.67 ns` | `785.79 ns` | `796.94 ns` |

| • Async iteration comparison - Some, fresh wrapper | avg              | min         | p75         | p99         | max         |
| -------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Some, fresh wrapper)                | `892.63 ns/iter` | `865.17 ns` | `885.76 ns` | `994.76 ns` | `  1.01 µs` |
| iter implicitAwait (Some, fresh wrapper)           | `891.44 ns/iter` | `867.82 ns` | `886.52 ns` | `986.35 ns` | `  1.00 µs` |
| iter delegate (Some, fresh wrapper)                | `  1.24 µs/iter` | `  1.21 µs` | `  1.23 µs` | `  1.34 µs` | `  1.36 µs` |
| iter direct (Some, fresh wrapper)                  | `858.05 ns/iter` | `836.06 ns` | `858.91 ns` | `943.81 ns` | `948.34 ns` |
| iter thenIterator (Some, fresh wrapper)            | `  1.34 µs/iter` | `  1.29 µs` | `  1.37 µs` | `  1.45 µs` | `  1.46 µs` |
| iter fastThenIterator (Some, fresh wrapper)        | `  1.26 µs/iter` | `  1.23 µs` | `  1.26 µs` | `  1.35 µs` | `  1.37 µs` |
| iter singleReadThenIterator (Some, fresh wrapper)  | `919.81 ns/iter` | `894.28 ns` | `913.27 ns` | `  1.05 µs` | `  1.08 µs` |

| • Public async iteration - None, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (None, resolved wrapper)     | `420.70 ns/iter` | `378.83 ns` | `395.91 ns` | `802.64 ns` | `941.02 ns` |
| public iter production (None, resolved wrapper)   | `193.62 ns/iter` | `184.62 ns` | `192.62 ns` | `271.90 ns` | `286.27 ns` |

| • Public async iteration - None, fresh wrapper | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (None, fresh wrapper)     | `398.66 ns/iter` | `384.20 ns` | `393.52 ns` | `485.18 ns` | `498.29 ns` |
| public iter production (None, fresh wrapper)   | `200.86 ns/iter` | `191.43 ns` | `196.94 ns` | `282.47 ns` | `348.14 ns` |

| • Async iteration comparison - None, resolved promise | avg              | min         | p75         | p99         | max         |
| ----------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (None, resolved promise)                | `340.09 ns/iter` | `329.51 ns` | `337.14 ns` | `430.10 ns` | `441.66 ns` |
| iter implicitAwait (None, resolved promise)           | `263.40 ns/iter` | `237.18 ns` | `246.56 ns` | `431.44 ns` | `625.36 ns` |
| iter delegate (None, resolved promise)                | `492.57 ns/iter` | `477.84 ns` | `485.58 ns` | `583.48 ns` | `669.37 ns` |
| iter direct (None, resolved promise)                  | `243.17 ns/iter` | `235.34 ns` | `239.53 ns` | `324.43 ns` | `329.85 ns` |
| iter thenIterator (None, resolved promise)            | `400.23 ns/iter` | `386.79 ns` | `395.05 ns` | `486.99 ns` | `607.58 ns` |
| iter fastThenIterator (None, resolved promise)        | `294.17 ns/iter` | `282.35 ns` | `290.07 ns` | `380.59 ns` | `411.92 ns` |
| iter singleReadThenIterator (None, resolved promise)  | `211.03 ns/iter` | `200.88 ns` | `210.20 ns` | `295.90 ns` | `326.36 ns` |

| • Async iteration comparison - None, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ----------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (None, resolved wrapper)                | `454.87 ns/iter` | `442.02 ns` | `448.85 ns` | `540.26 ns` | `543.99 ns` |
| iter implicitAwait (None, resolved wrapper)           | `443.93 ns/iter` | `432.40 ns` | `438.67 ns` | `527.48 ns` | `538.00 ns` |
| iter delegate (None, resolved wrapper)                | `710.05 ns/iter` | `689.67 ns` | `702.73 ns` | `807.57 ns` | `821.28 ns` |
| iter direct (None, resolved wrapper)                  | `459.21 ns/iter` | `447.65 ns` | `455.09 ns` | `544.37 ns` | `554.45 ns` |
| iter thenIterator (None, resolved wrapper)            | `580.74 ns/iter` | `561.75 ns` | `574.42 ns` | `668.91 ns` | `717.49 ns` |
| iter fastThenIterator (None, resolved wrapper)        | `460.20 ns/iter` | `447.96 ns` | `456.23 ns` | `545.88 ns` | `562.57 ns` |
| iter singleReadThenIterator (None, resolved wrapper)  | `381.92 ns/iter` | `371.36 ns` | `379.54 ns` | `474.13 ns` | `481.91 ns` |

| • Async iteration comparison - None, fresh wrapper | avg              | min         | p75         | p99         | max         |
| -------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (None, fresh wrapper)                | `471.57 ns/iter` | `457.96 ns` | `466.16 ns` | `556.90 ns` | `559.76 ns` |
| iter implicitAwait (None, fresh wrapper)           | `461.96 ns/iter` | `448.66 ns` | `455.92 ns` | `544.02 ns` | `550.84 ns` |
| iter delegate (None, fresh wrapper)                | `733.59 ns/iter` | `716.95 ns` | `728.75 ns` | `822.58 ns` | `828.61 ns` |
| iter direct (None, fresh wrapper)                  | `475.53 ns/iter` | `463.22 ns` | `471.25 ns` | `566.98 ns` | `569.80 ns` |
| iter thenIterator (None, fresh wrapper)            | `597.46 ns/iter` | `582.14 ns` | `591.75 ns` | `682.76 ns` | `694.12 ns` |
| iter fastThenIterator (None, fresh wrapper)        | `482.57 ns/iter` | `470.27 ns` | `476.71 ns` | `565.80 ns` | `580.52 ns` |
| iter singleReadThenIterator (None, fresh wrapper)  | `402.40 ns/iter` | `387.45 ns` | `400.68 ns` | `508.35 ns` | `523.49 ns` |

| • Public async iteration - Ok, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ----------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Ok, resolved wrapper)     | `556.15 ns/iter` | `541.84 ns` | `550.32 ns` | `650.83 ns` | `655.20 ns` |
| public iter production (Ok, resolved wrapper)   | `295.60 ns/iter` | `286.37 ns` | `293.30 ns` | `380.96 ns` | `412.59 ns` |

| • Public async iteration - Ok, fresh wrapper | avg              | min         | p75         | p99         | max         |
| -------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Ok, fresh wrapper)     | `789.07 ns/iter` | `756.11 ns` | `786.89 ns` | `949.17 ns` | `965.31 ns` |
| public iter production (Ok, fresh wrapper)   | `500.80 ns/iter` | `483.96 ns` | `495.69 ns` | `607.67 ns` | `613.89 ns` |

| • Async iteration comparison - Ok, resolved promise | avg              | min         | p75         | p99         | max         |
| --------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Ok, resolved promise)                | `466.44 ns/iter` | `450.38 ns` | `463.55 ns` | `560.89 ns` | `565.53 ns` |
| iter implicitAwait (Ok, resolved promise)           | `413.46 ns/iter` | `397.92 ns` | `408.55 ns` | `508.54 ns` | `536.51 ns` |
| iter delegate (Ok, resolved promise)                | `753.00 ns/iter` | `731.44 ns` | `749.56 ns` | `870.41 ns` | `893.29 ns` |
| iter direct (Ok, resolved promise)                  | `404.25 ns/iter` | `390.42 ns` | `401.38 ns` | `506.28 ns` | `610.73 ns` |
| iter thenIterator (Ok, resolved promise)            | `715.97 ns/iter` | `693.57 ns` | `710.07 ns` | `811.96 ns` | `873.41 ns` |
| iter fastThenIterator (Ok, resolved promise)        | `620.64 ns/iter` | `603.17 ns` | `615.06 ns` | `706.65 ns` | `737.46 ns` |
| iter singleReadThenIterator (Ok, resolved promise)  | `446.50 ns/iter` | `431.53 ns` | `440.75 ns` | `535.76 ns` | `587.75 ns` |

| • Async iteration comparison - Ok, resolved wrapper | avg              | min         | p75         | p99         | max         |
| --------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Ok, resolved wrapper)                | `654.41 ns/iter` | `638.93 ns` | `648.49 ns` | `748.88 ns` | `756.82 ns` |
| iter implicitAwait (Ok, resolved wrapper)           | `603.60 ns/iter` | `585.18 ns` | `597.66 ns` | `697.46 ns` | `718.15 ns` |
| iter delegate (Ok, resolved wrapper)                | `963.02 ns/iter` | `938.07 ns` | `960.85 ns` | `  1.07 µs` | `  1.07 µs` |
| iter direct (Ok, resolved wrapper)                  | `600.38 ns/iter` | `571.24 ns` | `582.59 ns` | `  1.09 µs` | `  1.11 µs` |
| iter thenIterator (Ok, resolved wrapper)            | `891.65 ns/iter` | `868.41 ns` | `886.17 ns` | `983.49 ns` | `  1.00 µs` |
| iter fastThenIterator (Ok, resolved wrapper)        | `782.58 ns/iter` | `764.59 ns` | `777.10 ns` | `867.09 ns` | `869.77 ns` |
| iter singleReadThenIterator (Ok, resolved wrapper)  | `613.60 ns/iter` | `599.52 ns` | `609.62 ns` | `703.07 ns` | `708.04 ns` |

| • Async iteration comparison - Ok, fresh wrapper | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Ok, fresh wrapper)                | `954.25 ns/iter` | `924.81 ns` | `947.78 ns` | `  1.06 µs` | `  1.09 µs` |
| iter implicitAwait (Ok, fresh wrapper)           | `948.78 ns/iter` | `921.90 ns` | `946.01 ns` | `  1.05 µs` | `  1.06 µs` |
| iter delegate (Ok, fresh wrapper)                | `  1.28 µs/iter` | `  1.25 µs` | `  1.28 µs` | `  1.39 µs` | `  1.41 µs` |
| iter direct (Ok, fresh wrapper)                  | `883.44 ns/iter` | `860.17 ns` | `879.65 ns` | `977.09 ns` | `983.19 ns` |
| iter thenIterator (Ok, fresh wrapper)            | `  1.36 µs/iter` | `  1.32 µs` | `  1.36 µs` | `  1.46 µs` | `  1.48 µs` |
| iter fastThenIterator (Ok, fresh wrapper)        | `  1.23 µs/iter` | `  1.20 µs` | `  1.23 µs` | `  1.32 µs` | `  1.39 µs` |
| iter singleReadThenIterator (Ok, fresh wrapper)  | `903.39 ns/iter` | `880.90 ns` | `898.78 ns` | `993.59 ns` | `998.67 ns` |

| • Public async iteration - Err, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Err, resolved wrapper)     | `421.41 ns/iter` | `406.73 ns` | `415.81 ns` | `515.15 ns` | `518.56 ns` |
| public iter production (Err, resolved wrapper)   | `199.34 ns/iter` | `189.68 ns` | `197.41 ns` | `281.65 ns` | `294.23 ns` |

| • Public async iteration - Err, fresh wrapper | avg              | min         | p75         | p99         | max         |
| --------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| public iter original (Err, fresh wrapper)     | `433.36 ns/iter` | `417.30 ns` | `429.77 ns` | `522.71 ns` | `552.68 ns` |
| public iter production (Err, fresh wrapper)   | `207.67 ns/iter` | `197.73 ns` | `206.70 ns` | `289.11 ns` | `300.14 ns` |

| • Async iteration comparison - Err, resolved promise | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Err, resolved promise)                | `286.28 ns/iter` | `276.33 ns` | `281.83 ns` | `370.55 ns` | `379.22 ns` |
| iter implicitAwait (Err, resolved promise)           | `275.87 ns/iter` | `266.00 ns` | `271.82 ns` | `362.80 ns` | `372.53 ns` |
| iter delegate (Err, resolved promise)                | `515.68 ns/iter` | `501.29 ns` | `513.29 ns` | `604.72 ns` | `610.28 ns` |
| iter direct (Err, resolved promise)                  | `273.38 ns/iter` | `264.82 ns` | `271.61 ns` | `354.43 ns` | `382.19 ns` |
| iter thenIterator (Err, resolved promise)            | `435.42 ns/iter` | `421.83 ns` | `431.90 ns` | `518.90 ns` | `527.46 ns` |
| iter fastThenIterator (Err, resolved promise)        | `331.94 ns/iter` | `321.38 ns` | `329.00 ns` | `416.18 ns` | `425.68 ns` |
| iter singleReadThenIterator (Err, resolved promise)  | `241.33 ns/iter` | `233.17 ns` | `238.65 ns` | `321.12 ns` | `342.47 ns` |

| • Async iteration comparison - Err, resolved wrapper | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Err, resolved wrapper)                | `481.54 ns/iter` | `467.68 ns` | `477.44 ns` | `565.02 ns` | `577.07 ns` |
| iter implicitAwait (Err, resolved wrapper)           | `467.31 ns/iter` | `452.84 ns` | `461.37 ns` | `554.96 ns` | `564.23 ns` |
| iter delegate (Err, resolved wrapper)                | `724.96 ns/iter` | `705.19 ns` | `718.71 ns` | `819.69 ns` | `822.23 ns` |
| iter direct (Err, resolved wrapper)                  | `458.78 ns/iter` | `444.88 ns` | `453.75 ns` | `540.17 ns` | `547.15 ns` |
| iter thenIterator (Err, resolved wrapper)            | `611.42 ns/iter` | `591.45 ns` | `605.72 ns` | `721.94 ns` | `768.66 ns` |
| iter fastThenIterator (Err, resolved wrapper)        | `491.54 ns/iter` | `480.01 ns` | `486.08 ns` | `573.14 ns` | `581.50 ns` |
| iter singleReadThenIterator (Err, resolved wrapper)  | `406.03 ns/iter` | `393.91 ns` | `403.96 ns` | `492.80 ns` | `503.51 ns` |

| • Async iteration comparison - Err, fresh wrapper | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| iter original (Err, fresh wrapper)                | `567.53 ns/iter` | `549.37 ns` | `563.06 ns` | `672.89 ns` | `684.02 ns` |
| iter implicitAwait (Err, fresh wrapper)           | `599.23 ns/iter` | `562.25 ns` | `608.33 ns` | `700.51 ns` | `705.92 ns` |
| iter delegate (Err, fresh wrapper)                | `848.88 ns/iter` | `825.71 ns` | `841.97 ns` | `955.30 ns` | `956.74 ns` |
| iter direct (Err, fresh wrapper)                  | `580.80 ns/iter` | `561.38 ns` | `579.09 ns` | `673.85 ns` | `687.24 ns` |
| iter thenIterator (Err, fresh wrapper)            | `736.56 ns/iter` | `713.83 ns` | `731.24 ns` | `851.06 ns` | `855.12 ns` |
| iter fastThenIterator (Err, fresh wrapper)        | `609.94 ns/iter` | `592.75 ns` | `607.48 ns` | `693.38 ns` | `698.80 ns` |
| iter singleReadThenIterator (Err, fresh wrapper)  | `510.66 ns/iter` | `498.04 ns` | `507.29 ns` | `596.61 ns` | `600.43 ns` |

| • Formatting            | avg              | min         | p75         | p99         | max         |
| ----------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.toString           | `364.81 ps/iter` | `320.31 ps` | `325.20 ps` | `868.16 ps` | ` 20.27 ns` |
| Some Symbol.toStringTag | ` 72.63 ns/iter` | ` 67.16 ns` | ` 73.88 ns` | ` 85.21 ns` | `168.32 ns` |
| None.toString           | `  4.66 ns/iter` | `  3.33 ns` | `  3.34 ns` | ` 10.57 ns` | ` 18.62 ns` |
| None Symbol.toStringTag | ` 76.30 ns/iter` | ` 74.01 ns` | ` 77.36 ns` | ` 84.47 ns` | `179.75 ns` |
| Ok.toString             | ` 10.27 ns/iter` | `  9.11 ns` | `  9.85 ns` | ` 17.82 ns` | `111.66 ns` |
| Ok Symbol.toStringTag   | ` 75.60 ns/iter` | ` 73.47 ns` | ` 76.49 ns` | ` 87.08 ns` | `163.41 ns` |
| Err.toString            | ` 12.39 ns/iter` | ` 11.54 ns` | ` 12.04 ns` | ` 18.29 ns` | `114.69 ns` |
| Err Symbol.toStringTag  | ` 76.00 ns/iter` | ` 73.76 ns` | ` 76.98 ns` | ` 87.72 ns` | `177.00 ns` |

| • Synchronous panic paths | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| None.expect               | `957.50 ns/iter` | `892.02 ns` | `929.14 ns` | `  1.29 µs` | `  1.34 µs` |
| None.unwrap               | `919.72 ns/iter` | `820.88 ns` | `924.06 ns` | `  1.05 µs` | `  1.18 µs` |
| Err.expect                | `987.12 ns/iter` | `944.82 ns` | `975.04 ns` | `  1.32 µs` | `  1.33 µs` |
| Err.unwrap                | `  1.01 µs/iter` | `954.95 ns` | `985.24 ns` | `  1.43 µs` | `  1.45 µs` |
| Ok.expectErr              | `  1.09 µs/iter` | `999.50 ns` | `  1.13 µs` | `  1.52 µs` | `  1.56 µs` |
| Ok.unwrapErr              | `  1.08 µs/iter` | `999.12 ns` | `  1.12 µs` | `  1.38 µs` | `  1.52 µs` |

| • Nested and inactive branches | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(Err).flatten                | ` 22.15 ns/iter` | ` 19.31 ns` | ` 21.16 ns` | ` 91.42 ns` | `108.93 ns` |
| Err.flatten                    | ` 12.66 ns/iter` | ` 10.76 ns` | ` 12.50 ns` | ` 18.82 ns` | `113.90 ns` |
| Some(None).flatten             | `  7.71 ns/iter` | `  6.59 ns` | `  7.38 ns` | ` 12.67 ns` | ` 97.53 ns` |
| None.flatten                   | `  7.74 ns/iter` | `  6.59 ns` | `  7.46 ns` | ` 12.89 ns` | `105.96 ns` |
| None.xor(None)                 | `  6.44 ns/iter` | `  6.33 ns` | `  6.34 ns` | `  8.64 ns` | ` 27.22 ns` |
| None.takeIf                    | ` 18.85 ns/iter` | ` 16.13 ns` | ` 17.94 ns` | ` 87.93 ns` | `124.31 ns` |
| Some.filterAsync false         | `443.44 ns/iter` | `430.25 ns` | `439.15 ns` | `529.68 ns` | `542.66 ns` |

| • Unwind error mapping                    | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind mapped error                  | `  1.10 µs/iter` | `  1.04 µs` | `  1.07 µs` | `  1.47 µs` | `  1.49 µs` |
| catchUnwindAsync mapped synchronous throw | `  1.08 µs/iter` | `993.64 ns` | `  1.07 µs` | `  1.59 µs` | `  1.69 µs` |
| catchUnwindAsync synchronous return       | `442.41 ns/iter` | `421.66 ns` | `438.42 ns` | `550.88 ns` | `567.53 ns` |

| • Async nested branches               | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.flatten nested branch 0   | `325.12 ns/iter` | `309.28 ns` | `319.47 ns` | `438.80 ns` | `604.41 ns` |
| AsyncOption.flatten nested branch 1   | `320.99 ns/iter` | `311.19 ns` | `318.03 ns` | `404.59 ns` | `416.54 ns` |
| AsyncOption.flatten nested branch 2   | `324.20 ns/iter` | `315.07 ns` | `321.68 ns` | `406.82 ns` | `417.76 ns` |
| AsyncResult.flatten nested branch 0   | `327.59 ns/iter` | `318.14 ns` | `325.08 ns` | `410.52 ns` | `503.21 ns` |
| AsyncResult.flatten nested branch 1   | `326.94 ns/iter` | `318.22 ns` | `323.78 ns` | `409.88 ns` | `443.11 ns` |
| AsyncResult.flatten nested branch 2   | `326.98 ns/iter` | `317.69 ns` | `324.36 ns` | `410.25 ns` | `433.10 ns` |
| AsyncOption.transpose nested branch 0 | `336.13 ns/iter` | `325.51 ns` | `333.36 ns` | `416.38 ns` | `434.53 ns` |
| AsyncOption.transpose nested branch 1 | `337.73 ns/iter` | `327.11 ns` | `333.67 ns` | `420.35 ns` | `434.55 ns` |
| AsyncOption.transpose nested branch 2 | `330.09 ns/iter` | `320.05 ns` | `326.18 ns` | `407.82 ns` | `417.95 ns` |
| AsyncResult.transpose nested branch 0 | `345.19 ns/iter` | `331.30 ns` | `341.13 ns` | `438.89 ns` | `551.04 ns` |
| AsyncResult.transpose nested branch 1 | `335.43 ns/iter` | `325.38 ns` | `333.22 ns` | `421.11 ns` | `439.46 ns` |
| AsyncResult.transpose nested branch 2 | `337.74 ns/iter` | `326.59 ns` | `334.10 ns` | `422.01 ns` | `441.68 ns` |

| • Async Option initialization contention       | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| None.getOrInsertWithAsync concurrent callers   | `632.45 ns/iter` | `609.11 ns` | `624.64 ns` | `739.24 ns` | `818.60 ns` |
| None.getOrInsertWithAsync intervening mutation | `452.15 ns/iter` | `435.21 ns` | `445.66 ns` | `551.60 ns` | `831.60 ns` |

| • Result - fresh wrapper workloads                | avg              | min         | p75         | p99         | max         |
| ------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Err.flatten fresh wrappers with varied payloads   | ` 24.91 ns/iter` | ` 21.34 ns` | ` 23.31 ns` | ` 92.75 ns` | `138.07 ns` |
| Err.transpose fresh wrappers with varied payloads | ` 38.28 ns/iter` | ` 32.39 ns` | ` 36.67 ns` | `112.91 ns` | `122.40 ns` |

| • Async Result - fresh wrapper workloads             | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Err.mapAsync fresh wrappers with varied payloads     | `680.04 ns/iter` | `661.12 ns` | `671.52 ns` | `821.79 ns` | `894.55 ns` |
| Ok.mapErrAsync fresh wrappers with varied payloads   | `690.03 ns/iter` | `671.00 ns` | `681.56 ns` | `799.43 ns` | `855.68 ns` |
| Err.andThenAsync fresh wrappers with varied payloads | `680.79 ns/iter` | `658.03 ns` | `674.52 ns` | `807.53 ns` | `912.19 ns` |
| Ok.orElseAsync fresh wrappers with varied payloads   | `676.89 ns/iter` | `659.06 ns` | `667.71 ns` | `798.94 ns` | `849.71 ns` |

| • Workloads - synchronous pipelines    | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result object pipeline (success heavy) | `279.48 ns/iter` | `258.26 ns` | `269.89 ns` | `378.73 ns` | `581.56 ns` |
| Option object pipeline (success heavy) | `220.23 ns/iter` | `192.93 ns` | `209.80 ns` | `452.05 ns` | `686.87 ns` |
| Result object pipeline (failure heavy) | `298.60 ns/iter` | `276.20 ns` | `289.00 ns` | `390.47 ns` | `521.33 ns` |
| Option object pipeline (failure heavy) | `211.26 ns/iter` | `194.39 ns` | `205.61 ns` | `300.60 ns` | `348.23 ns` |
| Result mixed object chain (eight maps) | `356.73 ns/iter` | `321.55 ns` | `375.97 ns` | `451.36 ns` | `915.89 ns` |
| Option mixed object chain (eight maps) | `225.34 ns/iter` | `201.00 ns` | `216.96 ns` | `335.28 ns` | `421.14 ns` |
| Option escaping mutation cycle         | `144.52 ns/iter` | `128.30 ns` | `138.78 ns` | `227.14 ns` | `368.54 ns` |
| Nested object transpose round trip     | `225.93 ns/iter` | `205.68 ns` | `218.91 ns` | `319.21 ns` | `560.45 ns` |

| • Workloads - structural operands | avg              | min         | p75         | p99         | max         |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result structural object operands | ` 31.50 ns/iter` | ` 28.24 ns` | ` 30.11 ns` | `104.93 ns` | `128.42 ns` |
| Option structural object operands | ` 36.49 ns/iter` | ` 33.57 ns` | ` 35.33 ns` | `103.62 ns` | `137.00 ns` |

| • Workloads - async pipelines     | avg              | min         | p75         | p99         | max         |
| --------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result PromiseLike object operand | `697.38 ns/iter` | `676.66 ns` | `689.61 ns` | `849.22 ns` | `  1.00 µs` |
| Option PromiseLike object operand | `763.93 ns/iter` | `736.26 ns` | `761.21 ns` | `917.78 ns` | `995.17 ns` |
| AsyncResult mixed object chain    | `  2.70 µs/iter` | `  2.61 µs` | `  2.73 µs` | `  2.84 µs` | `  2.85 µs` |
| AsyncOption mixed object chain    | `  2.60 µs/iter` | `  2.53 µs` | `  2.64 µs` | `  2.86 µs` | `  2.90 µs` |
