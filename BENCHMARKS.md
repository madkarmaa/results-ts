# Benchmarks

clk: ~3.01 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  6.51 ns/iter` | `  3.89 ns` | `  6.91 ns` | ` 45.77 ns` | `425.50 ns` |
| Err(1)         | `  6.82 ns/iter` | `  4.01 ns` | `  7.02 ns` | ` 17.84 ns` | `106.76 ns` |
| Some(1)        | ` 10.71 ns/iter` | `  7.73 ns` | ` 10.67 ns` | ` 74.82 ns` | `203.53 ns` |
| None()         | `  7.90 ns/iter` | `  4.80 ns` | `  8.90 ns` | ` 23.31 ns` | `114.70 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  4.76 ns/iter` | `  1.70 ns` | `  6.99 ns` | `  9.23 ns` | ` 16.79 ns` |
| Err.isOk()          | `  8.43 ns/iter` | `  7.98 ns` | `  8.83 ns` | ` 12.22 ns` | ` 22.56 ns` |
| Ok.isErr()          | `  8.61 ns/iter` | `  8.21 ns` | `  8.53 ns` | ` 11.64 ns` | ` 21.05 ns` |
| Err.isErr()         | `  9.51 ns/iter` | `  9.21 ns` | `  9.24 ns` | ` 12.34 ns` | ` 21.56 ns` |
| Ok.isOkAnd (true)   | `  5.75 ns/iter` | `  5.17 ns` | `  6.48 ns` | `  8.80 ns` | ` 25.52 ns` |
| Err.isOkAnd         | `  5.30 ns/iter` | `  2.79 ns` | `  7.49 ns` | `  9.77 ns` | ` 29.13 ns` |
| Ok.isErrAnd         | `  5.22 ns/iter` | `  5.10 ns` | `  5.16 ns` | `  7.48 ns` | ` 23.68 ns` |
| Err.isErrAnd (true) | `  5.32 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  8.18 ns` | ` 30.99 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 14.27 ns/iter` | ` 12.19 ns` | ` 13.19 ns` | ` 73.37 ns` | ` 97.42 ns` |
| Err.ok()               | ` 13.15 ns/iter` | ` 11.82 ns` | ` 12.50 ns` | ` 37.23 ns` | ` 99.32 ns` |
| Ok.err()               | ` 11.50 ns/iter` | ` 10.05 ns` | ` 10.89 ns` | ` 22.23 ns` | ` 98.11 ns` |
| Err.err()              | ` 15.16 ns/iter` | ` 12.83 ns` | ` 14.23 ns` | ` 77.61 ns` | `106.23 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 14.68 ns/iter` | ` 13.11 ns` | ` 13.96 ns` | ` 25.60 ns` | `107.16 ns` |
| Err.map (reuse)       | ` 10.03 ns/iter` | `  9.83 ns` | `  9.84 ns` | ` 14.73 ns` | ` 26.80 ns` |
| Ok.mapOr              | `  6.29 ns/iter` | `  6.13 ns` | `  6.20 ns` | `  9.18 ns` | ` 26.41 ns` |
| Err.mapOr             | `  7.19 ns/iter` | `  7.05 ns` | `  7.06 ns` | ` 10.33 ns` | ` 20.81 ns` |
| Ok.mapOrElse          | ` 11.99 ns/iter` | ` 11.05 ns` | ` 11.24 ns` | ` 24.90 ns` | `109.07 ns` |
| Err.mapOrElse         | ` 13.88 ns/iter` | ` 13.07 ns` | ` 13.42 ns` | ` 19.59 ns` | `105.27 ns` |
| Ok.mapErr (reuse)     | `  9.46 ns/iter` | `  9.29 ns` | `  9.30 ns` | ` 12.88 ns` | ` 22.46 ns` |
| Err.mapErr (alloc)    | ` 15.34 ns/iter` | ` 13.59 ns` | ` 14.39 ns` | ` 47.63 ns` | `114.79 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  7.93 ns/iter` | `  7.16 ns` | `  7.57 ns` | ` 13.20 ns` | ` 91.40 ns` |
| Err.inspect               | `  9.15 ns/iter` | `  8.42 ns` | `  8.75 ns` | ` 14.87 ns` | ` 93.61 ns` |
| Ok.inspectErr             | `  6.25 ns/iter` | `  6.13 ns` | `  6.14 ns` | `  9.42 ns` | ` 17.60 ns` |
| Err.inspectErr            | `  7.94 ns/iter` | `  7.13 ns` | `  7.41 ns` | ` 19.92 ns` | ` 94.39 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.20 ns/iter` | `  5.90 ns` | `  6.12 ns` | `  9.45 ns` | ` 17.52 ns` |
| Err.unwrapErr            | `  6.22 ns/iter` | `  5.85 ns` | `  6.13 ns` | ` 10.33 ns` | ` 22.22 ns` |
| Ok.expect                | `  6.18 ns/iter` | `  5.96 ns` | `  6.11 ns` | `  8.81 ns` | ` 17.79 ns` |
| Err.expectErr            | `  9.06 ns/iter` | `  8.91 ns` | `  8.92 ns` | ` 12.54 ns` | ` 21.79 ns` |
| Ok.unwrapOr              | `  4.55 ns/iter` | `  4.40 ns` | `  4.52 ns` | `  6.92 ns` | ` 13.79 ns` |
| Err.unwrapOr             | `  6.12 ns/iter` | `  5.71 ns` | `  6.10 ns` | `  9.01 ns` | ` 16.80 ns` |
| Ok.unwrapOrElse          | `  6.08 ns/iter` | `  5.79 ns` | `  6.10 ns` | `  9.64 ns` | ` 34.38 ns` |
| Err.unwrapOrElse         | `  9.38 ns/iter` | `  8.53 ns` | `  8.80 ns` | ` 21.59 ns` | ` 91.66 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.43 ns/iter` | `  8.26 ns` | `  8.26 ns` | ` 12.73 ns` | ` 24.72 ns` |
| Err.and (reuse)        | `  7.28 ns/iter` | `  7.18 ns` | `  7.18 ns` | `  9.79 ns` | ` 17.04 ns` |
| Ok.andThen (alloc)     | ` 17.37 ns/iter` | ` 15.24 ns` | ` 16.19 ns` | ` 77.34 ns` | `110.02 ns` |
| Err.andThen (alloc)    | `  6.67 ns/iter` | `  6.56 ns` | `  6.56 ns` | `  9.05 ns` | ` 37.18 ns` |
| Ok.or (reuse)          | `  7.36 ns/iter` | `  7.18 ns` | `  7.18 ns` | ` 12.78 ns` | ` 22.83 ns` |
| Err.or (reuse)         | `  7.44 ns/iter` | `  7.33 ns` | `  7.34 ns` | ` 10.01 ns` | ` 16.47 ns` |
| Ok.orElse (alloc)      | `  5.57 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.89 ns` | ` 33.13 ns` |
| Err.orElse (alloc)     | `  7.33 ns/iter` | `  6.53 ns` | `  6.85 ns` | ` 19.23 ns` | ` 91.08 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.08 ns/iter` | `  9.95 ns` | `  9.96 ns` | ` 12.78 ns` | ` 21.81 ns` |
| Ok(Some).transpose                     | ` 46.15 ns/iter` | ` 39.60 ns` | ` 43.58 ns` | `120.03 ns` | `317.25 ns` |
| Ok(None).transpose                     | ` 30.60 ns/iter` | ` 27.39 ns` | ` 29.11 ns` | ` 94.69 ns` | `120.59 ns` |
| Err.transpose                          | ` 28.85 ns/iter` | ` 24.88 ns` | ` 26.96 ns` | ` 95.01 ns` | `113.57 ns` |
| Ok.match                               | ` 12.46 ns/iter` | ` 11.77 ns` | ` 12.07 ns` | ` 16.43 ns` | ` 91.04 ns` |
| Err.match                              | ` 13.47 ns/iter` | ` 12.71 ns` | ` 13.08 ns` | ` 17.48 ns` | ` 97.99 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 15.15 ns/iter` | ` 13.16 ns` | ` 14.36 ns` | ` 74.27 ns` | `119.86 ns` |
| Err.iter        | `  6.29 ns/iter` | `  6.10 ns` | `  6.11 ns` | `  9.36 ns` | ` 28.94 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 18.76 ns/iter` | ` 15.83 ns` | ` 17.19 ns` | ` 84.18 ns` | `208.27 ns` |
| catchUnwind (call only, Ok)    | ` 13.17 ns/iter` | ` 11.69 ns` | ` 12.48 ns` | ` 24.39 ns` | `106.98 ns` |
| catchUnwind (wrap + call, Err) | `  1.20 µs/iter` | `  1.10 µs` | `  1.20 µs` | `  1.46 µs` | `  1.54 µs` |
| catchUnwind (call only, catch) | `  1.15 µs/iter` | `930.92 ns` | `  1.18 µs` | `  1.28 µs` | `  1.28 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  5.71 ns/iter` | `  5.63 ns` | `  5.64 ns` | `  7.92 ns` | ` 19.15 ns` |
| None.isSome()         | `  5.71 ns/iter` | `  5.64 ns` | `  5.64 ns` | `  7.95 ns` | ` 14.28 ns` |
| Some.isNone()         | `  5.71 ns/iter` | `  5.64 ns` | `  5.64 ns` | `  7.95 ns` | ` 15.66 ns` |
| None.isNone()         | `  5.71 ns/iter` | `  5.63 ns` | `  5.64 ns` | `  7.94 ns` | ` 17.10 ns` |
| Some.isSomeAnd (true) | `  5.89 ns/iter` | `  5.79 ns` | `  5.83 ns` | `  8.10 ns` | ` 24.94 ns` |
| None.isSomeAnd        | `  6.66 ns/iter` | `  6.56 ns` | `  6.56 ns` | `  9.02 ns` | ` 33.41 ns` |
| Some.isNoneOr (true)  | `  5.88 ns/iter` | `  5.79 ns` | `  5.79 ns` | `  8.11 ns` | ` 24.21 ns` |
| None.isNoneOr         | `  6.81 ns/iter` | `  6.71 ns` | `  6.72 ns` | `  9.03 ns` | ` 33.54 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  5.66 ns/iter` | `  5.33 ns` | `  5.60 ns` | `  7.87 ns` | ` 17.10 ns` |
| Some.expect              | `  5.67 ns/iter` | `  5.33 ns` | `  5.61 ns` | `  8.11 ns` | ` 23.88 ns` |
| Some.unwrapOr            | `  5.45 ns/iter` | `  5.33 ns` | `  5.36 ns` | `  8.04 ns` | ` 19.87 ns` |
| None.unwrapOr            | `  5.40 ns/iter` | `  5.32 ns` | `  5.33 ns` | `  7.65 ns` | ` 24.04 ns` |
| Some.unwrapOrElse        | `  8.04 ns/iter` | `  7.16 ns` | `  7.49 ns` | ` 22.06 ns` | `101.01 ns` |
| None.unwrapOrElse        | `  8.55 ns/iter` | `  7.95 ns` | `  8.22 ns` | ` 11.84 ns` | `107.78 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 13.77 ns/iter` | ` 12.09 ns` | ` 13.05 ns` | ` 71.50 ns` | `103.89 ns` |
| None.map (alloc)      | `  6.99 ns/iter` | `  6.87 ns` | `  6.87 ns` | `  9.25 ns` | ` 33.28 ns` |
| Some.mapOr            | `  5.79 ns/iter` | `  5.64 ns` | `  5.80 ns` | `  8.08 ns` | ` 24.15 ns` |
| None.mapOr            | `  6.51 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  8.84 ns` | ` 30.62 ns` |
| Some.mapOrElse        | ` 11.79 ns/iter` | ` 10.85 ns` | ` 11.14 ns` | ` 26.31 ns` | `106.68 ns` |
| None.mapOrElse        | ` 12.52 ns/iter` | ` 11.88 ns` | ` 12.14 ns` | ` 16.56 ns` | `100.34 ns` |
| Some.inspect          | `  7.19 ns/iter` | `  6.58 ns` | `  6.89 ns` | ` 10.26 ns` | ` 89.34 ns` |
| None.inspect          | `  8.40 ns/iter` | `  7.80 ns` | `  8.08 ns` | ` 11.43 ns` | ` 95.47 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 10.79 ns/iter` | `  9.53 ns` | ` 10.35 ns` | ` 15.89 ns` | ` 88.81 ns` |
| None.okOr              | ` 11.78 ns/iter` | ` 10.70 ns` | ` 11.26 ns` | ` 18.22 ns` | `102.47 ns` |
| Some.okOrElse          | ` 15.97 ns/iter` | ` 14.34 ns` | ` 15.24 ns` | ` 72.29 ns` | ` 94.61 ns` |
| None.okOrElse          | ` 17.06 ns/iter` | ` 15.42 ns` | ` 16.28 ns` | ` 46.15 ns` | `103.36 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.28 ns/iter` | `  7.18 ns` | `  7.18 ns` | `  9.70 ns` | ` 19.84 ns` |
| None.and (alloc)           | `  7.27 ns/iter` | `  7.18 ns` | `  7.18 ns` | `  9.60 ns` | ` 15.00 ns` |
| Some.andThen (alloc)       | ` 20.37 ns/iter` | ` 17.72 ns` | ` 18.91 ns` | ` 86.83 ns` | `149.05 ns` |
| None.andThen (alloc)       | `  6.97 ns/iter` | `  6.87 ns` | `  6.87 ns` | `  9.40 ns` | ` 19.26 ns` |
| Some.filter (true, reuse)  | `  7.39 ns/iter` | `  6.54 ns` | `  6.92 ns` | ` 19.52 ns` | `100.03 ns` |
| Some.filter (false, alloc) | ` 12.63 ns/iter` | ` 11.12 ns` | ` 11.99 ns` | ` 41.52 ns` | ` 94.79 ns` |
| None.filter (alloc)        | `  6.67 ns/iter` | `  6.56 ns` | `  6.56 ns` | `  8.90 ns` | ` 32.85 ns` |
| Some.or (reuse)            | `  7.29 ns/iter` | `  7.18 ns` | `  7.18 ns` | `  9.73 ns` | ` 27.45 ns` |
| None.or (reuse/optb)       | `  7.28 ns/iter` | `  7.18 ns` | `  7.18 ns` | `  9.61 ns` | ` 26.36 ns` |
| Some.orElse (reuse)        | `  6.19 ns/iter` | `  6.10 ns` | `  6.10 ns` | `  8.42 ns` | ` 42.50 ns` |
| None.orElse (alloc)        | ` 10.49 ns/iter` | `  9.55 ns` | `  9.90 ns` | ` 24.80 ns` | ` 97.46 ns` |
| Some xor None (reuse)      | `  9.64 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 12.09 ns` | ` 42.87 ns` |
| None xor Some (reuse/optb) | `  9.64 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 12.33 ns` | ` 29.00 ns` |
| Some xor Some (alloc)      | ` 15.46 ns/iter` | ` 13.71 ns` | ` 14.50 ns` | ` 47.13 ns` | `113.58 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 15.69 ns/iter` | ` 13.69 ns` | ` 14.84 ns` | ` 78.95 ns` | `101.57 ns` |
| None.insert                     | ` 12.28 ns/iter` | ` 10.69 ns` | ` 11.64 ns` | ` 23.28 ns` | ` 94.42 ns` |
| Some.getOrInsert (existing)     | ` 12.23 ns/iter` | ` 10.63 ns` | ` 11.62 ns` | ` 24.35 ns` | ` 90.68 ns` |
| None.getOrInsert (insert)       | ` 15.87 ns/iter` | ` 13.91 ns` | ` 15.19 ns` | ` 30.41 ns` | ` 98.34 ns` |
| Some.getOrInsertWith (existing) | ` 19.94 ns/iter` | ` 17.88 ns` | ` 19.01 ns` | ` 87.17 ns` | `107.64 ns` |
| None.getOrInsertWith (insert)   | ` 21.07 ns/iter` | ` 18.88 ns` | ` 20.08 ns` | ` 89.96 ns` | `112.99 ns` |
| Some.take                       | ` 26.78 ns/iter` | ` 23.76 ns` | ` 25.38 ns` | ` 95.19 ns` | `112.55 ns` |
| None.take                       | ` 20.93 ns/iter` | ` 18.77 ns` | ` 20.00 ns` | ` 89.03 ns` | `110.40 ns` |
| Some.takeIf (true)              | ` 30.05 ns/iter` | ` 26.38 ns` | ` 28.24 ns` | `102.02 ns` | `128.72 ns` |
| Some.takeIf (false)             | ` 26.45 ns/iter` | ` 23.38 ns` | ` 24.88 ns` | ` 97.94 ns` | `119.97 ns` |
| Some.replace                    | ` 30.33 ns/iter` | ` 26.12 ns` | ` 28.66 ns` | `101.20 ns` | `116.49 ns` |
| None.replace                    | ` 24.91 ns/iter` | ` 22.19 ns` | ` 23.68 ns` | ` 91.60 ns` | `113.98 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  8.89 ns/iter` | `  8.72 ns` | `  8.72 ns` | ` 13.04 ns` | ` 36.75 ns` |
| Some(Ok).transpose                             | ` 47.71 ns/iter` | ` 40.29 ns` | ` 44.63 ns` | `128.46 ns` | `312.00 ns` |
| Some(Err).transpose                            | ` 34.65 ns/iter` | ` 31.13 ns` | ` 32.97 ns` | `103.87 ns` | `118.47 ns` |
| None.transpose                                 | ` 25.45 ns/iter` | ` 22.33 ns` | ` 23.94 ns` | ` 96.74 ns` | `114.35 ns` |
| Some.unzip                                     | ` 43.55 ns/iter` | ` 38.30 ns` | ` 41.13 ns` | `116.01 ns` | `186.40 ns` |
| None.unzip                                     | ` 30.24 ns/iter` | ` 26.58 ns` | ` 28.48 ns` | `100.17 ns` | `112.47 ns` |
| Some.match                                     | ` 14.98 ns/iter` | ` 13.83 ns` | ` 14.51 ns` | ` 20.70 ns` | `103.87 ns` |
| None.match                                     | ` 15.62 ns/iter` | ` 14.47 ns` | ` 15.13 ns` | ` 22.38 ns` | ` 98.65 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 14.72 ns/iter` | ` 12.67 ns` | ` 14.11 ns` | ` 50.53 ns` | `108.46 ns` |
| None.iter       | `  6.42 ns/iter` | `  6.10 ns` | `  6.41 ns` | `  8.71 ns` | ` 34.04 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `230.15 ns/iter` | `216.54 ns` | `221.25 ns` | `410.52 ns` | `455.03 ns` |
| AsyncResult.unwrap (Err path)    | `242.89 ns/iter` | `234.67 ns` | `240.04 ns` | `326.60 ns` | `357.28 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `168.61 ns/iter` | `161.68 ns` | `166.38 ns` | `250.49 ns` | `327.13 ns` |
| Result.mapOrElseAsync (Err path)    | `165.52 ns/iter` | `159.97 ns` | `163.94 ns` | `240.00 ns` | `256.66 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `174.45 ns/iter` | `168.84 ns` | `173.04 ns` | `248.36 ns` | `275.11 ns` |
| Result.unwrapOrElseAsync (Err path) | `164.78 ns/iter` | `158.88 ns` | `163.36 ns` | `244.60 ns` | `275.78 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `657.14 ns/iter` | `638.11 ns` | `653.38 ns` | `756.25 ns` | `779.89 ns` |
| Err.mapAsync (alloc AsyncResult)        | `428.55 ns/iter` | `414.72 ns` | `424.44 ns` | `535.65 ns` | `603.24 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `420.66 ns/iter` | `407.78 ns` | `416.15 ns` | `521.27 ns` | `570.15 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `673.21 ns/iter` | `646.16 ns` | `661.05 ns` | `995.91 ns` | `  1.20 µs` |
| Ok.inspectAsync (alloc AsyncResult)     | `652.81 ns/iter` | `627.48 ns` | `648.72 ns` | `763.78 ns` | `  1.01 µs` |
| Err.inspectAsync (alloc AsyncResult)    | `409.25 ns/iter` | `398.19 ns` | `405.51 ns` | `494.22 ns` | `556.60 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `414.23 ns/iter` | `401.17 ns` | `411.00 ns` | `516.86 ns` | `617.67 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `664.49 ns/iter` | `644.22 ns` | `660.63 ns` | `763.93 ns` | `791.71 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `582.51 ns/iter` | `564.57 ns` | `578.27 ns` | `669.44 ns` | `684.13 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `423.16 ns/iter` | `408.25 ns` | `417.40 ns` | `536.68 ns` | `691.49 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `417.30 ns/iter` | `404.61 ns` | `413.32 ns` | `503.39 ns` | `641.48 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `585.24 ns/iter` | `567.44 ns` | `579.29 ns` | `699.86 ns` | `862.60 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `382.13 ns/iter` | `372.69 ns` | `379.02 ns` | `473.52 ns` | `504.66 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `724.11 ns/iter` | `701.80 ns` | `718.89 ns` | `826.40 ns` | `958.81 ns` |
| catchUnwindAsync (call only, Ok)       | `703.15 ns/iter` | `686.16 ns` | `696.92 ns` | `795.03 ns` | `802.44 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.22 µs/iter` | `  1.15 µs` | `  1.19 µs` | `  1.90 µs` | `  2.07 µs` |
| catchUnwindAsync (call only, reject)   | `  1.20 µs/iter` | `  1.16 µs` | `  1.20 µs` | `  1.34 µs` | `  1.73 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `236.90 ns/iter` | `228.77 ns` | `235.29 ns` | `321.79 ns` | `374.51 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.60 µs/iter` | `  1.39 µs` | `  1.55 µs` | `  2.19 µs` | `  2.43 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `181.76 ns/iter` | `173.51 ns` | `178.92 ns` | `271.34 ns` | `365.91 ns` |
| Option.mapOrElseAsync (None path)    | `178.72 ns/iter` | `170.38 ns` | `175.98 ns` | `268.12 ns` | `353.52 ns` |
| Option.unwrapOrElseAsync (Some path) | `188.01 ns/iter` | `180.44 ns` | `185.66 ns` | `267.25 ns` | `340.57 ns` |
| Option.unwrapOrElseAsync (None path) | `173.82 ns/iter` | `166.46 ns` | `171.29 ns` | `260.96 ns` | `345.41 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `655.43 ns/iter` | `636.62 ns` | `650.10 ns` | `756.16 ns` | `  1.04 µs` |
| None.mapAsync (alloc AsyncOption)         | `418.57 ns/iter` | `402.99 ns` | `412.00 ns` | `533.99 ns` | `719.58 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `669.24 ns/iter` | `649.88 ns` | `663.06 ns` | `770.97 ns` | `  1.07 µs` |
| None.inspectAsync (alloc AsyncOption)     | `407.44 ns/iter` | `395.28 ns` | `402.11 ns` | `512.48 ns` | `626.16 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `587.87 ns/iter` | `571.65 ns` | `581.98 ns` | `687.18 ns` | `929.85 ns` |
| None.andThenAsync (alloc AsyncOption)     | `414.03 ns/iter` | `400.43 ns` | `407.96 ns` | `512.31 ns` | `711.34 ns` |
| Some.filterAsync true (alloc AsyncOption) | `  1.22 µs/iter` | `791.00 ns` | `992.00 ns` | `  6.09 µs` | ` 42.48 µs` |
| None.filterAsync (alloc AsyncOption)      | `452.70 ns/iter` | `426.53 ns` | `441.70 ns` | `717.08 ns` | `807.89 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `413.87 ns/iter` | `403.27 ns` | `411.97 ns` | `504.67 ns` | `550.84 ns` |
| None.orElseAsync (alloc AsyncOption)      | `578.55 ns/iter` | `562.62 ns` | `574.26 ns` | `672.35 ns` | `688.30 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `413.51 ns/iter` | `401.87 ns` | `409.85 ns` | `503.78 ns` | `507.48 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `643.87 ns/iter` | `629.46 ns` | `640.26 ns` | `738.25 ns` | `741.36 ns` |
| Some.getOrInsertWithAsync (existing)      | `184.27 ns/iter` | `176.77 ns` | `181.77 ns` | `270.69 ns` | `360.14 ns` |
| None.getOrInsertWithAsync (insert)        | `577.62 ns/iter` | `555.44 ns` | `571.57 ns` | `689.09 ns` | `819.95 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `390.15 ns/iter` | `379.83 ns` | `387.83 ns` | `482.44 ns` | `497.29 ns` |
