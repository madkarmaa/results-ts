# Benchmarks

clk: ~3.10 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  5.80 ns/iter` | `  3.82 ns` | `  5.02 ns` | ` 47.86 ns` | `190.60 ns` |
| Err(1)         | `  6.67 ns/iter` | `  4.65 ns` | `  5.94 ns` | ` 20.68 ns` | `259.18 ns` |
| Some(1)        | ` 11.54 ns/iter` | `  8.36 ns` | ` 11.26 ns` | ` 83.65 ns` | `232.69 ns` |
| None()         | `  8.34 ns/iter` | `  4.95 ns` | `  9.29 ns` | ` 26.39 ns` | `280.22 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.29 ns/iter` | `  1.70 ns` | `  8.22 ns` | ` 10.76 ns` | ` 19.48 ns` |
| Err.isOk()          | `  9.28 ns/iter` | `  7.94 ns` | `  9.15 ns` | ` 12.09 ns` | ` 20.11 ns` |
| Ok.isErr()          | `  9.81 ns/iter` | `  9.45 ns` | `  9.46 ns` | ` 19.94 ns` | ` 25.78 ns` |
| Err.isErr()         | ` 10.64 ns/iter` | ` 10.37 ns` | ` 10.38 ns` | ` 17.20 ns` | ` 28.05 ns` |
| Ok.isOkAnd (true)   | `  6.09 ns/iter` | `  5.17 ns` | `  6.59 ns` | `  9.24 ns` | ` 30.97 ns` |
| Err.isOkAnd         | `  6.33 ns/iter` | `  2.63 ns` | `  6.95 ns` | `  9.86 ns` | ` 35.65 ns` |
| Ok.isErrAnd         | `  4.58 ns/iter` | `  4.48 ns` | `  4.50 ns` | `  6.99 ns` | ` 22.85 ns` |
| Err.isErrAnd (true) | `  5.31 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  7.74 ns` | ` 26.48 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 14.87 ns/iter` | ` 12.30 ns` | ` 13.46 ns` | ` 78.39 ns` | `121.83 ns` |
| Err.ok()               | ` 12.78 ns/iter` | ` 11.18 ns` | ` 11.89 ns` | ` 37.91 ns` | `110.24 ns` |
| Ok.err()               | ` 11.71 ns/iter` | ` 10.40 ns` | ` 11.04 ns` | ` 32.93 ns` | ` 96.32 ns` |
| Err.err()              | ` 15.45 ns/iter` | ` 13.30 ns` | ` 14.35 ns` | ` 80.80 ns` | `121.06 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 14.65 ns/iter` | ` 13.12 ns` | ` 13.94 ns` | ` 29.83 ns` | `101.43 ns` |
| Err.map (reuse)       | ` 10.13 ns/iter` | `  9.91 ns` | `  9.94 ns` | ` 15.13 ns` | ` 25.34 ns` |
| Ok.mapOr              | `  6.43 ns/iter` | `  6.22 ns` | `  6.33 ns` | `  9.73 ns` | ` 16.96 ns` |
| Err.mapOr             | `  7.27 ns/iter` | `  7.13 ns` | `  7.14 ns` | ` 10.48 ns` | ` 21.18 ns` |
| Ok.mapOrElse          | ` 12.04 ns/iter` | ` 11.13 ns` | ` 11.33 ns` | ` 25.25 ns` | ` 98.52 ns` |
| Err.mapOrElse         | ` 13.37 ns/iter` | ` 12.54 ns` | ` 12.90 ns` | ` 17.86 ns` | `101.17 ns` |
| Ok.mapErr (reuse)     | `  9.44 ns/iter` | `  9.29 ns` | `  9.30 ns` | ` 12.23 ns` | ` 25.77 ns` |
| Err.mapErr (alloc)    | ` 14.92 ns/iter` | ` 13.13 ns` | ` 13.95 ns` | ` 51.22 ns` | `105.58 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.00 ns/iter` | `  7.22 ns` | `  7.61 ns` | ` 12.15 ns` | ` 96.86 ns` |
| Err.inspect               | `  9.48 ns/iter` | `  8.70 ns` | `  9.07 ns` | ` 13.66 ns` | ` 99.87 ns` |
| Ok.inspectErr             | `  6.47 ns/iter` | `  6.29 ns` | `  6.37 ns` | `  9.51 ns` | ` 33.62 ns` |
| Err.inspectErr            | `  8.17 ns/iter` | `  7.16 ns` | `  7.64 ns` | ` 20.46 ns` | ` 95.06 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.39 ns/iter` | `  6.13 ns` | `  6.34 ns` | `  8.90 ns` | ` 21.69 ns` |
| Err.unwrapErr            | `  6.38 ns/iter` | `  6.09 ns` | `  6.30 ns` | `  9.10 ns` | ` 21.35 ns` |
| Ok.expect                | `  6.41 ns/iter` | `  6.11 ns` | `  6.34 ns` | `  9.00 ns` | ` 29.03 ns` |
| Err.expectErr            | `  9.45 ns/iter` | `  9.29 ns` | `  9.30 ns` | ` 12.39 ns` | ` 24.99 ns` |
| Ok.unwrapOr              | `  4.47 ns/iter` | `  4.40 ns` | `  4.41 ns` | `  6.82 ns` | ` 13.89 ns` |
| Err.unwrapOr             | `  6.19 ns/iter` | `  6.10 ns` | `  6.10 ns` | `  8.72 ns` | ` 16.79 ns` |
| Ok.unwrapOrElse          | `  5.70 ns/iter` | `  5.40 ns` | `  5.64 ns` | `  8.57 ns` | ` 34.94 ns` |
| Err.unwrapOrElse         | `  9.40 ns/iter` | `  8.46 ns` | `  8.76 ns` | ` 21.89 ns` | ` 97.06 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.67 ns/iter` | `  8.49 ns` | `  8.49 ns` | ` 13.59 ns` | ` 27.29 ns` |
| Err.and (reuse)        | `  7.93 ns/iter` | `  7.80 ns` | `  7.80 ns` | ` 12.22 ns` | ` 21.25 ns` |
| Ok.andThen (alloc)     | ` 17.56 ns/iter` | ` 15.38 ns` | ` 16.26 ns` | ` 80.69 ns` | `119.27 ns` |
| Err.andThen (alloc)    | `  6.56 ns/iter` | `  6.41 ns` | `  6.41 ns` | ` 11.29 ns` | ` 26.50 ns` |
| Ok.or (reuse)          | `  7.91 ns/iter` | `  7.80 ns` | `  7.80 ns` | ` 10.30 ns` | ` 38.32 ns` |
| Err.or (reuse)         | `  7.79 ns/iter` | `  7.64 ns` | `  7.64 ns` | ` 11.77 ns` | ` 19.75 ns` |
| Ok.orElse (alloc)      | `  5.58 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  8.13 ns` | ` 33.57 ns` |
| Err.orElse (alloc)     | `  7.40 ns/iter` | `  6.53 ns` | `  6.88 ns` | ` 19.34 ns` | ` 98.98 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.77 ns/iter` | ` 10.57 ns` | ` 10.57 ns` | ` 15.33 ns` | ` 35.88 ns` |
| Ok(Some).transpose                     | ` 45.86 ns/iter` | ` 39.46 ns` | ` 43.17 ns` | `122.40 ns` | `330.32 ns` |
| Ok(None).transpose                     | ` 31.36 ns/iter` | ` 27.49 ns` | ` 29.58 ns` | `102.39 ns` | `117.71 ns` |
| Err.transpose                          | ` 29.38 ns/iter` | ` 24.84 ns` | ` 27.44 ns` | `100.07 ns` | `124.60 ns` |
| Ok.match                               | ` 12.36 ns/iter` | ` 11.51 ns` | ` 11.86 ns` | ` 20.83 ns` | `105.07 ns` |
| Err.match                              | ` 13.58 ns/iter` | ` 12.79 ns` | ` 13.11 ns` | ` 19.71 ns` | `105.41 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 15.37 ns/iter` | ` 13.23 ns` | ` 14.45 ns` | ` 76.42 ns` | `102.61 ns` |
| Err.iter        | `  6.24 ns/iter` | `  6.10 ns` | `  6.10 ns` | `  9.50 ns` | ` 27.59 ns` |

| • Result - tryBlock   | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| tryBlock (Ok path)    | `  2.40 µs/iter` | `  1.19 µs` | `  2.11 µs` | `  8.24 µs` | `  2.94 ms` |
| tryBlock (first Err)  | `958.02 ns/iter` | `841.55 ns` | `965.38 ns` | `  1.27 µs` | `  1.78 µs` |
| tryBlock (second Err) | `  1.44 µs/iter` | `  1.29 µs` | `  1.50 µs` | `  1.96 µs` | `  2.55 µs` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 18.10 ns/iter` | ` 14.82 ns` | ` 16.25 ns` | ` 93.17 ns` | `181.82 ns` |
| catchUnwind (call only, Ok)    | ` 11.61 ns/iter` | `  9.73 ns` | ` 10.77 ns` | ` 22.29 ns` | `167.05 ns` |
| catchUnwind (wrap + call, Err) | `  1.24 µs/iter` | `  1.13 µs` | `  1.24 µs` | `  1.49 µs` | `  1.51 µs` |
| catchUnwind (call only, catch) | `  1.17 µs/iter` | `921.50 ns` | `  1.20 µs` | `  1.30 µs` | `  1.33 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  3.14 ns/iter` | `  2.78 ns` | `  2.86 ns` | `  9.45 ns` | ` 17.37 ns` |
| None.isSome()         | `  4.11 ns/iter` | `  2.77 ns` | `  3.81 ns` | ` 10.52 ns` | ` 23.01 ns` |
| Some.isNone()         | `  6.01 ns/iter` | `  4.86 ns` | `  6.32 ns` | `  9.28 ns` | ` 20.85 ns` |
| None.isNone()         | `  3.90 ns/iter` | `  2.79 ns` | `  6.02 ns` | ` 12.40 ns` | ` 27.38 ns` |
| Some.isSomeAnd (true) | `  5.18 ns/iter` | `  5.09 ns` | `  5.10 ns` | `  7.66 ns` | ` 18.38 ns` |
| None.isSomeAnd        | `  6.83 ns/iter` | `  6.71 ns` | `  6.72 ns` | `  9.71 ns` | ` 19.96 ns` |
| Some.isNoneOr (true)  | `  6.52 ns/iter` | `  6.10 ns` | `  6.41 ns` | ` 11.17 ns` | ` 26.01 ns` |
| None.isNoneOr         | `  7.76 ns/iter` | `  7.33 ns` | `  7.65 ns` | ` 10.57 ns` | ` 19.99 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.53 ns/iter` | `  6.10 ns` | `  6.49 ns` | `  9.24 ns` | ` 16.34 ns` |
| Some.expect              | `  5.63 ns/iter` | `  5.48 ns` | `  5.57 ns` | `  8.87 ns` | ` 15.98 ns` |
| Some.unwrapOr            | `  5.84 ns/iter` | `  5.71 ns` | `  5.72 ns` | `  9.03 ns` | ` 17.05 ns` |
| None.unwrapOr            | `  6.20 ns/iter` | `  6.10 ns` | `  6.10 ns` | `  8.99 ns` | ` 17.03 ns` |
| Some.unwrapOrElse        | `  8.40 ns/iter` | `  7.32 ns` | `  7.81 ns` | ` 23.55 ns` | `115.29 ns` |
| None.unwrapOrElse        | `  8.82 ns/iter` | `  8.09 ns` | `  8.37 ns` | ` 14.98 ns` | `112.00 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 14.51 ns/iter` | ` 12.52 ns` | ` 13.62 ns` | ` 83.89 ns` | `115.02 ns` |
| None.map (alloc)      | `  7.19 ns/iter` | `  7.02 ns` | `  7.03 ns` | ` 12.04 ns` | ` 34.90 ns` |
| Some.mapOr            | `  5.90 ns/iter` | `  5.79 ns` | `  5.79 ns` | `  9.04 ns` | ` 24.04 ns` |
| None.mapOr            | `  6.54 ns/iter` | `  6.41 ns` | `  6.41 ns` | ` 10.05 ns` | ` 34.45 ns` |
| Some.mapOrElse        | ` 12.25 ns/iter` | ` 11.02 ns` | ` 11.48 ns` | ` 27.59 ns` | `123.01 ns` |
| None.mapOrElse        | ` 13.25 ns/iter` | ` 12.43 ns` | ` 12.76 ns` | ` 20.08 ns` | `123.41 ns` |
| Some.inspect          | `  7.52 ns/iter` | `  6.86 ns` | `  7.14 ns` | ` 12.71 ns` | `113.00 ns` |
| None.inspect          | `  8.74 ns/iter` | `  7.99 ns` | `  8.34 ns` | ` 14.92 ns` | `103.74 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 11.05 ns/iter` | `  9.53 ns` | ` 10.51 ns` | ` 17.72 ns` | `108.59 ns` |
| None.okOr              | ` 11.97 ns/iter` | ` 10.50 ns` | ` 11.36 ns` | ` 19.06 ns` | `106.23 ns` |
| Some.okOrElse          | ` 16.91 ns/iter` | ` 15.12 ns` | ` 16.06 ns` | ` 85.13 ns` | `112.85 ns` |
| None.okOrElse          | ` 17.11 ns/iter` | ` 15.28 ns` | ` 16.17 ns` | ` 85.42 ns` | `114.72 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.07 ns/iter` | `  7.95 ns` | `  7.95 ns` | ` 10.55 ns` | ` 22.23 ns` |
| None.and (alloc)           | `  8.08 ns/iter` | `  7.95 ns` | `  7.95 ns` | ` 11.15 ns` | ` 19.86 ns` |
| Some.andThen (alloc)       | ` 20.80 ns/iter` | ` 17.87 ns` | ` 19.12 ns` | ` 99.21 ns` | `126.67 ns` |
| None.andThen (alloc)       | `  6.83 ns/iter` | `  6.71 ns` | `  6.72 ns` | `  9.28 ns` | ` 25.23 ns` |
| Some.filter (true, reuse)  | `  7.76 ns/iter` | `  6.70 ns` | `  7.20 ns` | ` 21.10 ns` | `106.81 ns` |
| Some.filter (false, alloc) | ` 13.14 ns/iter` | ` 11.23 ns` | ` 12.22 ns` | ` 83.46 ns` | `116.36 ns` |
| None.filter (alloc)        | `  6.87 ns/iter` | `  6.71 ns` | `  6.72 ns` | ` 11.10 ns` | ` 33.56 ns` |
| Some.or (reuse)            | `  8.10 ns/iter` | `  7.95 ns` | `  7.95 ns` | ` 11.45 ns` | ` 33.89 ns` |
| None.or (reuse/optb)       | `  8.09 ns/iter` | `  7.95 ns` | `  7.95 ns` | ` 11.56 ns` | ` 22.42 ns` |
| Some.orElse (reuse)        | `  6.52 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  9.35 ns` | ` 38.27 ns` |
| None.orElse (alloc)        | ` 10.83 ns/iter` | `  9.69 ns` | ` 10.10 ns` | ` 26.14 ns` | `109.27 ns` |
| Some xor None (reuse)      | ` 14.01 ns/iter` | ` 13.80 ns` | ` 13.81 ns` | ` 17.03 ns` | ` 37.58 ns` |
| None xor Some (reuse/optb) | ` 10.60 ns/iter` | ` 10.41 ns` | ` 10.42 ns` | ` 15.39 ns` | ` 23.53 ns` |
| Some xor Some (alloc)      | ` 20.32 ns/iter` | ` 18.36 ns` | ` 19.18 ns` | ` 55.52 ns` | `127.09 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 15.75 ns/iter` | ` 13.47 ns` | ` 14.82 ns` | ` 85.41 ns` | `114.08 ns` |
| None.insert                     | ` 12.77 ns/iter` | ` 11.13 ns` | ` 12.08 ns` | ` 21.45 ns` | `103.14 ns` |
| Some.getOrInsert (existing)     | ` 12.50 ns/iter` | ` 10.81 ns` | ` 11.74 ns` | ` 42.38 ns` | `114.68 ns` |
| None.getOrInsert (insert)       | ` 14.98 ns/iter` | ` 13.34 ns` | ` 14.22 ns` | ` 49.69 ns` | `107.48 ns` |
| Some.getOrInsertWith (existing) | ` 19.97 ns/iter` | ` 17.88 ns` | ` 18.98 ns` | ` 90.28 ns` | `110.69 ns` |
| None.getOrInsertWith (insert)   | ` 21.16 ns/iter` | ` 19.06 ns` | ` 20.10 ns` | ` 91.92 ns` | `118.86 ns` |
| Some.take                       | ` 26.65 ns/iter` | ` 23.04 ns` | ` 25.23 ns` | `100.40 ns` | `128.46 ns` |
| None.take                       | ` 20.45 ns/iter` | ` 18.22 ns` | ` 19.37 ns` | ` 90.52 ns` | `111.32 ns` |
| Some.takeIf (true)              | ` 29.83 ns/iter` | ` 26.14 ns` | ` 28.11 ns` | `106.37 ns` | `125.13 ns` |
| Some.takeIf (false)             | ` 25.87 ns/iter` | ` 22.69 ns` | ` 24.27 ns` | `101.58 ns` | `142.22 ns` |
| Some.replace                    | ` 30.20 ns/iter` | ` 26.50 ns` | ` 28.37 ns` | `106.41 ns` | `127.23 ns` |
| None.replace                    | ` 24.77 ns/iter` | ` 22.00 ns` | ` 23.37 ns` | ` 96.94 ns` | `120.37 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | ` 12.96 ns/iter` | ` 12.24 ns` | ` 12.40 ns` | ` 27.28 ns` | ` 75.94 ns` |
| Some(Ok).transpose                             | ` 47.88 ns/iter` | ` 40.31 ns` | ` 44.99 ns` | `136.39 ns` | `338.46 ns` |
| Some(Err).transpose                            | ` 36.58 ns/iter` | ` 32.50 ns` | ` 34.81 ns` | `112.35 ns` | `131.23 ns` |
| None.transpose                                 | ` 25.28 ns/iter` | ` 21.95 ns` | ` 23.81 ns` | `101.27 ns` | `126.13 ns` |
| Some.unzip                                     | ` 43.56 ns/iter` | ` 37.60 ns` | ` 41.48 ns` | `125.03 ns` | `205.76 ns` |
| None.unzip                                     | ` 29.77 ns/iter` | ` 25.97 ns` | ` 27.80 ns` | `107.29 ns` | `130.71 ns` |
| Some.match                                     | ` 15.12 ns/iter` | ` 13.91 ns` | ` 14.53 ns` | ` 24.45 ns` | `105.50 ns` |
| None.match                                     | ` 16.28 ns/iter` | ` 14.85 ns` | ` 15.55 ns` | ` 33.05 ns` | `121.22 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 15.38 ns/iter` | ` 13.08 ns` | ` 14.58 ns` | ` 53.92 ns` | `114.55 ns` |
| None.iter       | `  6.77 ns/iter` | `  6.41 ns` | `  7.03 ns` | `  9.72 ns` | ` 35.75 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `228.86 ns/iter` | `212.31 ns` | `218.51 ns` | `422.24 ns` | `593.23 ns` |
| AsyncResult.unwrap (Err path)    | `221.13 ns/iter` | `211.73 ns` | `217.66 ns` | `315.45 ns` | `366.97 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `168.03 ns/iter` | `160.00 ns` | `164.98 ns` | `260.36 ns` | `344.13 ns` |
| Result.mapOrElseAsync (Err path)    | `180.46 ns/iter` | `171.86 ns` | `177.43 ns` | `264.53 ns` | `284.59 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `179.68 ns/iter` | `169.42 ns` | `174.81 ns` | `292.15 ns` | `311.89 ns` |
| Result.unwrapOrElseAsync (Err path) | `161.96 ns/iter` | `155.81 ns` | `160.05 ns` | `246.49 ns` | `314.62 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `648.31 ns/iter` | `629.31 ns` | `641.01 ns` | `760.62 ns` | `927.52 ns` |
| Err.mapAsync (alloc AsyncResult)        | `427.31 ns/iter` | `413.47 ns` | `420.92 ns` | `575.55 ns` | `715.71 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `418.98 ns/iter` | `406.21 ns` | `415.03 ns` | `517.56 ns` | `526.05 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `646.43 ns/iter` | `627.99 ns` | `640.02 ns` | `744.19 ns` | `754.64 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `644.86 ns/iter` | `626.02 ns` | `639.52 ns` | `756.03 ns` | `770.66 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `407.54 ns/iter` | `394.37 ns` | `403.96 ns` | `511.22 ns` | `528.13 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `403.71 ns/iter` | `391.85 ns` | `399.97 ns` | `499.60 ns` | `619.03 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `648.49 ns/iter` | `625.57 ns` | `638.25 ns` | `877.45 ns` | `  1.13 µs` |
| Ok.andThenAsync (alloc AsyncResult)     | `581.77 ns/iter` | `562.01 ns` | `576.54 ns` | `695.90 ns` | `784.90 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `417.48 ns/iter` | `403.99 ns` | `412.78 ns` | `517.96 ns` | `569.83 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `424.86 ns/iter` | `412.75 ns` | `420.76 ns` | `525.45 ns` | `548.00 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `574.53 ns/iter` | `556.44 ns` | `569.31 ns` | `688.13 ns` | `755.95 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `391.13 ns/iter` | `380.98 ns` | `388.27 ns` | `490.22 ns` | `508.92 ns` |

| • Async Result - tryBlockAsync | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| tryBlockAsync (Ok path)        | `  4.01 µs/iter` | `  2.42 µs` | `  3.75 µs` | ` 11.25 µs` | `  2.93 ms` |
| tryBlockAsync (first Err)      | `  1.94 µs/iter` | `  1.72 µs` | `  1.87 µs` | `  4.07 µs` | `  4.27 µs` |
| tryBlockAsync (second Err)     | `  2.75 µs/iter` | `  2.48 µs` | `  2.80 µs` | `  4.31 µs` | `  4.87 µs` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `730.69 ns/iter` | `701.84 ns` | `722.47 ns` | `852.54 ns` | `  1.17 µs` |
| catchUnwindAsync (call only, Ok)       | `724.12 ns/iter` | `697.73 ns` | `720.19 ns` | `847.80 ns` | `861.06 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.31 µs/iter` | `  1.24 µs` | `  1.27 µs` | `  1.98 µs` | `  2.15 µs` |
| catchUnwindAsync (call only, reject)   | `  1.31 µs/iter` | `  1.24 µs` | `  1.30 µs` | `  1.46 µs` | `  1.81 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `230.17 ns/iter` | `220.79 ns` | `228.17 ns` | `341.95 ns` | `377.45 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.61 µs/iter` | `  1.38 µs` | `  1.57 µs` | `  2.37 µs` | `  2.57 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `191.41 ns/iter` | `173.64 ns` | `188.18 ns` | `345.37 ns` | `375.83 ns` |
| Option.mapOrElseAsync (None path)    | `181.89 ns/iter` | `172.88 ns` | `179.14 ns` | `293.54 ns` | `313.33 ns` |
| Option.unwrapOrElseAsync (Some path) | `189.08 ns/iter` | `179.97 ns` | `186.39 ns` | `296.11 ns` | `348.59 ns` |
| Option.unwrapOrElseAsync (None path) | `179.94 ns/iter` | `171.09 ns` | `177.00 ns` | `288.18 ns` | `360.19 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `682.31 ns/iter` | `659.90 ns` | `673.48 ns` | `803.69 ns` | `  1.07 µs` |
| None.mapAsync (alloc AsyncOption)         | `436.25 ns/iter` | `419.75 ns` | `428.02 ns` | `557.22 ns` | `727.52 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `665.84 ns/iter` | `646.39 ns` | `659.14 ns` | `802.71 ns` | `848.60 ns` |
| None.inspectAsync (alloc AsyncOption)     | `420.65 ns/iter` | `408.65 ns` | `415.98 ns` | `531.86 ns` | `549.65 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `596.78 ns/iter` | `577.85 ns` | `590.78 ns` | `721.93 ns` | `735.23 ns` |
| None.andThenAsync (alloc AsyncOption)     | `433.36 ns/iter` | `419.00 ns` | `428.59 ns` | `550.90 ns` | `565.17 ns` |
| Some.filterAsync true (alloc AsyncOption) | `651.95 ns/iter` | `633.10 ns` | `645.80 ns` | `775.18 ns` | `780.75 ns` |
| None.filterAsync (alloc AsyncOption)      | `429.03 ns/iter` | `415.30 ns` | `424.13 ns` | `534.54 ns` | `560.54 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `423.39 ns/iter` | `410.31 ns` | `417.98 ns` | `543.11 ns` | `557.70 ns` |
| None.orElseAsync (alloc AsyncOption)      | `583.91 ns/iter` | `566.09 ns` | `577.94 ns` | `706.73 ns` | `863.39 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `427.74 ns/iter` | `413.61 ns` | `422.18 ns` | `540.97 ns` | `626.90 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `654.81 ns/iter` | `636.07 ns` | `648.32 ns` | `772.91 ns` | `  1.02 µs` |
| Some.getOrInsertWithAsync (existing)      | `190.26 ns/iter` | `181.31 ns` | `187.38 ns` | `295.96 ns` | `391.18 ns` |
| None.getOrInsertWithAsync (insert)        | `584.50 ns/iter` | `559.71 ns` | `574.68 ns` | `702.89 ns` | `  1.05 µs` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `400.06 ns/iter` | `388.56 ns` | `396.49 ns` | `514.78 ns` | `570.90 ns` |
