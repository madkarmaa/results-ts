# Benchmarks

clk: ~2.74 GHz
cpu: AMD EPYC 9V74 80-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  6.69 ns/iter` | `  4.12 ns` | `  7.48 ns` | ` 57.50 ns` | `390.72 ns` |
| Err(1)         | `  6.68 ns/iter` | `  4.72 ns` | `  5.90 ns` | ` 25.60 ns` | `428.90 ns` |
| Some(1)        | ` 11.45 ns/iter` | `  8.53 ns` | ` 11.71 ns` | ` 74.57 ns` | `177.94 ns` |
| None()         | `  8.37 ns/iter` | `  5.33 ns` | `  9.57 ns` | ` 23.04 ns` | `105.43 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.10 ns/iter` | `  1.93 ns` | `  7.73 ns` | ` 10.40 ns` | ` 20.68 ns` |
| Err.isOk()          | `  8.62 ns/iter` | `  8.31 ns` | `  8.44 ns` | ` 11.52 ns` | ` 20.84 ns` |
| Ok.isErr()          | `  9.42 ns/iter` | `  9.00 ns` | `  9.30 ns` | ` 12.72 ns` | ` 24.36 ns` |
| Err.isErr()         | ` 10.39 ns/iter` | `  9.70 ns` | ` 10.37 ns` | ` 18.64 ns` | ` 50.24 ns` |
| Ok.isOkAnd (true)   | `  6.38 ns/iter` | `  5.15 ns` | `  6.98 ns` | `  9.15 ns` | ` 24.86 ns` |
| Err.isOkAnd         | `  6.96 ns/iter` | `  2.89 ns` | `  6.90 ns` | ` 12.76 ns` | ` 28.74 ns` |
| Ok.isErrAnd         | `  5.26 ns/iter` | `  5.11 ns` | `  5.20 ns` | `  7.44 ns` | ` 37.20 ns` |
| Err.isErrAnd (true) | `  5.42 ns/iter` | `  5.15 ns` | `  5.28 ns` | `  7.70 ns` | ` 30.21 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 15.83 ns/iter` | ` 13.12 ns` | ` 14.72 ns` | ` 80.56 ns` | `118.09 ns` |
| Err.ok()               | ` 13.09 ns/iter` | ` 11.75 ns` | ` 12.46 ns` | ` 27.62 ns` | ` 95.63 ns` |
| Ok.err()               | ` 12.30 ns/iter` | ` 10.95 ns` | ` 11.70 ns` | ` 32.68 ns` | ` 93.42 ns` |
| Err.err()              | ` 16.56 ns/iter` | ` 14.37 ns` | ` 15.74 ns` | ` 81.60 ns` | ` 97.27 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 16.01 ns/iter` | ` 14.16 ns` | ` 15.36 ns` | ` 32.21 ns` | `106.45 ns` |
| Err.map (reuse)       | ` 10.71 ns/iter` | ` 10.28 ns` | ` 10.46 ns` | ` 16.72 ns` | ` 29.74 ns` |
| Ok.mapOr              | `  7.02 ns/iter` | `  6.35 ns` | `  6.97 ns` | `  9.65 ns` | ` 25.37 ns` |
| Err.mapOr             | `  7.19 ns/iter` | `  7.00 ns` | `  7.13 ns` | `  9.37 ns` | ` 35.14 ns` |
| Ok.mapOrElse          | ` 12.47 ns/iter` | ` 11.41 ns` | ` 11.70 ns` | ` 28.44 ns` | `105.96 ns` |
| Err.mapOrElse         | ` 15.21 ns/iter` | ` 13.35 ns` | ` 14.23 ns` | ` 44.38 ns` | `260.85 ns` |
| Ok.mapErr (reuse)     | `  9.96 ns/iter` | `  9.47 ns` | `  9.61 ns` | ` 19.46 ns` | ` 50.78 ns` |
| Err.mapErr (alloc)    | ` 15.63 ns/iter` | ` 13.73 ns` | ` 14.71 ns` | ` 60.36 ns` | `115.07 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.41 ns/iter` | `  7.43 ns` | `  7.93 ns` | ` 14.00 ns` | `102.81 ns` |
| Err.inspect               | `  9.58 ns/iter` | `  8.75 ns` | `  9.13 ns` | ` 15.13 ns` | ` 93.50 ns` |
| Ok.inspectErr             | `  6.73 ns/iter` | `  6.41 ns` | `  6.62 ns` | `  9.34 ns` | ` 33.72 ns` |
| Err.inspectErr            | `  8.49 ns/iter` | `  7.44 ns` | `  7.95 ns` | ` 23.26 ns` | ` 96.07 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.81 ns/iter` | `  6.25 ns` | `  6.76 ns` | `  9.07 ns` | ` 22.05 ns` |
| Err.unwrapErr            | `  7.01 ns/iter` | `  6.78 ns` | `  6.96 ns` | `  9.53 ns` | ` 22.04 ns` |
| Ok.expect                | `  7.00 ns/iter` | `  6.06 ns` | `  6.79 ns` | ` 11.98 ns` | ` 42.05 ns` |
| Err.expectErr            | `  9.15 ns/iter` | `  8.88 ns` | `  9.06 ns` | ` 12.52 ns` | ` 20.49 ns` |
| Ok.unwrapOr              | `  6.48 ns/iter` | `  6.30 ns` | `  6.42 ns` | `  9.15 ns` | ` 27.22 ns` |
| Err.unwrapOr             | `  6.45 ns/iter` | `  6.23 ns` | `  6.39 ns` | `  8.93 ns` | ` 21.23 ns` |
| Ok.unwrapOrElse          | `  7.06 ns/iter` | `  6.79 ns` | `  6.97 ns` | ` 10.04 ns` | ` 37.97 ns` |
| Err.unwrapOrElse         | `  9.93 ns/iter` | `  8.69 ns` | `  9.15 ns` | ` 26.49 ns` | ` 93.83 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.38 ns/iter` | `  7.89 ns` | `  8.15 ns` | ` 15.41 ns` | ` 50.35 ns` |
| Err.and (reuse)        | `  8.26 ns/iter` | `  7.99 ns` | `  8.18 ns` | ` 11.62 ns` | ` 17.77 ns` |
| Ok.andThen (alloc)     | ` 20.00 ns/iter` | ` 17.46 ns` | ` 18.64 ns` | ` 86.36 ns` | `125.58 ns` |
| Err.andThen (alloc)    | `  7.41 ns/iter` | `  7.18 ns` | `  7.32 ns` | ` 10.97 ns` | ` 36.58 ns` |
| Ok.or (reuse)          | `  8.56 ns/iter` | `  8.19 ns` | `  8.42 ns` | ` 11.46 ns` | ` 44.34 ns` |
| Err.or (reuse)         | `  8.37 ns/iter` | `  8.11 ns` | `  8.27 ns` | ` 11.99 ns` | ` 23.51 ns` |
| Ok.orElse (alloc)      | `  6.67 ns/iter` | `  6.41 ns` | `  6.59 ns` | `  9.50 ns` | ` 43.50 ns` |
| Err.orElse (alloc)     | `  8.48 ns/iter` | `  7.37 ns` | `  7.91 ns` | ` 22.71 ns` | ` 97.71 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.95 ns/iter` | ` 10.58 ns` | ` 10.77 ns` | ` 16.45 ns` | ` 38.70 ns` |
| Ok(Some).transpose                     | ` 54.75 ns/iter` | ` 45.41 ns` | ` 49.51 ns` | `165.72 ns` | `334.01 ns` |
| Ok(None).transpose                     | ` 34.69 ns/iter` | ` 30.83 ns` | ` 33.02 ns` | `103.66 ns` | `117.42 ns` |
| Err.transpose                          | ` 33.58 ns/iter` | ` 28.97 ns` | ` 31.51 ns` | `103.70 ns` | `140.69 ns` |
| Ok.match                               | ` 13.91 ns/iter` | ` 12.92 ns` | ` 13.52 ns` | ` 17.65 ns` | ` 99.13 ns` |
| Err.match                              | ` 15.41 ns/iter` | ` 13.65 ns` | ` 14.47 ns` | ` 23.24 ns` | `112.23 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 16.82 ns/iter` | ` 14.59 ns` | ` 16.03 ns` | ` 81.31 ns` | `105.64 ns` |
| Err.iter        | `  7.25 ns/iter` | `  7.03 ns` | `  7.17 ns` | `  9.57 ns` | ` 31.39 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 21.39 ns/iter` | ` 17.97 ns` | ` 19.62 ns` | ` 93.96 ns` | `241.57 ns` |
| catchUnwind (call only, Ok)    | ` 15.29 ns/iter` | ` 13.88 ns` | ` 14.68 ns` | ` 21.16 ns` | `101.05 ns` |
| catchUnwind (wrap + call, Err) | `  1.17 µs/iter` | `  1.06 µs` | `  1.17 µs` | `  1.55 µs` | `  1.56 µs` |
| catchUnwind (call only, catch) | `  1.13 µs/iter` | `866.81 ns` | `  1.16 µs` | `  1.37 µs` | `  1.46 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.58 ns/iter` | `  6.39 ns` | `  6.54 ns` | `  8.77 ns` | ` 15.15 ns` |
| None.isSome()         | `  6.83 ns/iter` | `  6.62 ns` | `  6.78 ns` | `  9.07 ns` | ` 21.21 ns` |
| Some.isNone()         | `  6.60 ns/iter` | `  6.38 ns` | `  6.55 ns` | `  8.89 ns` | ` 18.91 ns` |
| None.isNone()         | `  6.91 ns/iter` | `  6.70 ns` | `  6.85 ns` | `  9.26 ns` | ` 22.13 ns` |
| Some.isSomeAnd (true) | `  6.85 ns/iter` | `  6.65 ns` | `  6.79 ns` | `  9.03 ns` | ` 26.70 ns` |
| None.isSomeAnd        | `  7.56 ns/iter` | `  7.34 ns` | `  7.47 ns` | ` 10.80 ns` | ` 32.26 ns` |
| Some.isNoneOr (true)  | `  6.84 ns/iter` | `  6.66 ns` | `  6.78 ns` | `  9.69 ns` | ` 19.76 ns` |
| None.isNoneOr         | `  7.54 ns/iter` | `  7.34 ns` | `  7.47 ns` | `  9.93 ns` | ` 22.69 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  7.15 ns/iter` | `  6.71 ns` | `  6.88 ns` | ` 13.58 ns` | ` 41.49 ns` |
| Some.expect              | `  6.95 ns/iter` | `  6.72 ns` | `  6.89 ns` | `  9.20 ns` | ` 23.95 ns` |
| Some.unwrapOr            | `  6.96 ns/iter` | `  6.38 ns` | `  6.92 ns` | `  9.25 ns` | ` 14.48 ns` |
| None.unwrapOr            | `  6.71 ns/iter` | `  6.51 ns` | `  6.66 ns` | `  8.96 ns` | ` 20.59 ns` |
| Some.unwrapOrElse        | `  9.41 ns/iter` | `  8.14 ns` | `  8.68 ns` | ` 27.96 ns` | `101.17 ns` |
| None.unwrapOrElse        | `  9.50 ns/iter` | `  8.50 ns` | `  9.17 ns` | ` 14.46 ns` | `100.26 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 15.80 ns/iter` | ` 13.68 ns` | ` 15.02 ns` | ` 82.85 ns` | `110.99 ns` |
| None.map (alloc)      | `  8.16 ns/iter` | `  7.69 ns` | `  7.82 ns` | ` 16.22 ns` | ` 59.10 ns` |
| Some.mapOr            | `  6.93 ns/iter` | `  6.31 ns` | `  6.98 ns` | `  9.26 ns` | ` 29.27 ns` |
| None.mapOr            | `  7.25 ns/iter` | `  7.03 ns` | `  7.17 ns` | `  9.66 ns` | ` 36.81 ns` |
| Some.mapOrElse        | ` 13.80 ns/iter` | ` 10.31 ns` | ` 12.41 ns` | ` 39.72 ns` | `141.26 ns` |
| None.mapOrElse        | ` 12.61 ns/iter` | ` 11.76 ns` | ` 12.21 ns` | ` 17.75 ns` | `100.90 ns` |
| Some.inspect          | `  8.10 ns/iter` | `  7.28 ns` | `  7.72 ns` | ` 12.57 ns` | `113.50 ns` |
| None.inspect          | `  9.91 ns/iter` | `  9.03 ns` | `  9.68 ns` | ` 13.58 ns` | ` 93.35 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 12.72 ns/iter` | ` 10.91 ns` | ` 12.08 ns` | ` 36.33 ns` | ` 95.37 ns` |
| None.okOr              | ` 15.61 ns/iter` | ` 12.76 ns` | ` 14.25 ns` | ` 56.75 ns` | `212.60 ns` |
| Some.okOrElse          | ` 18.68 ns/iter` | ` 16.77 ns` | ` 17.96 ns` | ` 86.10 ns` | `106.74 ns` |
| None.okOrElse          | ` 21.30 ns/iter` | ` 18.68 ns` | ` 20.57 ns` | ` 87.29 ns` | `128.47 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.72 ns/iter` | `  6.02 ns` | `  7.81 ns` | ` 14.81 ns` | ` 33.14 ns` |
| None.and (alloc)           | `  6.14 ns/iter` | `  6.02 ns` | `  6.07 ns` | `  8.46 ns` | ` 23.14 ns` |
| Some.andThen (alloc)       | ` 21.95 ns/iter` | ` 18.41 ns` | ` 20.32 ns` | ` 93.72 ns` | `154.87 ns` |
| None.andThen (alloc)       | `  6.89 ns/iter` | `  6.72 ns` | `  6.75 ns` | `  9.16 ns` | ` 35.30 ns` |
| Some.filter (true, reuse)  | `  8.32 ns/iter` | `  7.18 ns` | `  7.72 ns` | ` 26.28 ns` | `107.41 ns` |
| Some.filter (false, alloc) | ` 14.69 ns/iter` | ` 12.87 ns` | ` 13.96 ns` | ` 79.98 ns` | `100.20 ns` |
| None.filter (alloc)        | `  6.84 ns/iter` | `  6.72 ns` | `  6.73 ns` | `  9.02 ns` | ` 33.35 ns` |
| Some.or (reuse)            | `  7.68 ns/iter` | `  7.42 ns` | `  7.52 ns` | ` 13.00 ns` | ` 30.96 ns` |
| None.or (reuse/optb)       | `  7.69 ns/iter` | `  7.42 ns` | `  7.60 ns` | ` 10.11 ns` | ` 21.38 ns` |
| Some.orElse (reuse)        | `  6.54 ns/iter` | `  6.39 ns` | `  6.47 ns` | `  8.74 ns` | ` 50.67 ns` |
| None.orElse (alloc)        | ` 11.65 ns/iter` | ` 10.40 ns` | ` 10.88 ns` | ` 29.71 ns` | `110.60 ns` |
| Some xor None (reuse)      | `  9.86 ns/iter` | `  9.54 ns` | `  9.67 ns` | ` 14.96 ns` | ` 35.11 ns` |
| None xor Some (reuse/optb) | `  9.85 ns/iter` | `  9.37 ns` | `  9.51 ns` | ` 18.13 ns` | ` 56.41 ns` |
| Some xor Some (alloc)      | ` 16.28 ns/iter` | ` 14.34 ns` | ` 15.15 ns` | ` 56.26 ns` | `121.22 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 17.63 ns/iter` | ` 15.27 ns` | ` 16.72 ns` | ` 87.61 ns` | `105.53 ns` |
| None.insert                     | ` 14.04 ns/iter` | ` 12.13 ns` | ` 13.36 ns` | ` 78.90 ns` | `108.87 ns` |
| Some.getOrInsert (existing)     | ` 13.89 ns/iter` | ` 11.75 ns` | ` 13.11 ns` | ` 80.35 ns` | `102.12 ns` |
| None.getOrInsert (insert)       | ` 17.09 ns/iter` | ` 14.43 ns` | ` 15.73 ns` | ` 83.28 ns` | `117.73 ns` |
| Some.getOrInsertWith (existing) | ` 21.03 ns/iter` | ` 18.56 ns` | ` 20.08 ns` | ` 94.19 ns` | `113.15 ns` |
| None.getOrInsertWith (insert)   | ` 22.71 ns/iter` | ` 20.11 ns` | ` 21.68 ns` | ` 97.70 ns` | `112.67 ns` |
| Some.take                       | ` 28.97 ns/iter` | ` 25.66 ns` | ` 27.51 ns` | `103.04 ns` | `119.30 ns` |
| None.take                       | ` 21.70 ns/iter` | ` 19.22 ns` | ` 20.66 ns` | ` 94.21 ns` | `120.41 ns` |
| Some.takeIf (true)              | ` 33.30 ns/iter` | ` 29.11 ns` | ` 31.51 ns` | `108.73 ns` | `139.12 ns` |
| Some.takeIf (false)             | ` 28.82 ns/iter` | ` 25.10 ns` | ` 27.28 ns` | `106.15 ns` | `118.62 ns` |
| Some.replace                    | ` 33.36 ns/iter` | ` 28.86 ns` | ` 31.60 ns` | `110.04 ns` | `123.15 ns` |
| None.replace                    | ` 26.82 ns/iter` | ` 23.84 ns` | ` 25.56 ns` | `101.70 ns` | `137.25 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  9.61 ns/iter` | `  9.03 ns` | `  9.30 ns` | ` 17.49 ns` | ` 53.50 ns` |
| Some(Ok).transpose                             | ` 53.48 ns/iter` | ` 46.32 ns` | ` 50.44 ns` | `138.83 ns` | `283.37 ns` |
| Some(Err).transpose                            | ` 39.28 ns/iter` | ` 35.12 ns` | ` 37.73 ns` | `114.84 ns` | `132.88 ns` |
| None.transpose                                 | ` 28.51 ns/iter` | ` 24.93 ns` | ` 27.07 ns` | `103.36 ns` | `117.11 ns` |
| Some.unzip                                     | ` 49.07 ns/iter` | ` 41.82 ns` | ` 46.54 ns` | `128.08 ns` | `209.89 ns` |
| None.unzip                                     | ` 33.88 ns/iter` | ` 27.98 ns` | ` 31.78 ns` | `111.78 ns` | `145.42 ns` |
| Some.match                                     | ` 15.64 ns/iter` | ` 14.22 ns` | ` 15.05 ns` | ` 24.73 ns` | `110.40 ns` |
| None.match                                     | ` 16.94 ns/iter` | ` 14.53 ns` | ` 15.48 ns` | ` 52.77 ns` | `138.82 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 16.73 ns/iter` | ` 13.20 ns` | ` 16.13 ns` | ` 47.95 ns` | `105.04 ns` |
| None.iter       | `  6.87 ns/iter` | `  6.72 ns` | `  6.72 ns` | ` 11.43 ns` | ` 24.31 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `248.05 ns/iter` | `231.44 ns` | `237.34 ns` | `456.93 ns` | `497.06 ns` |
| AsyncResult.unwrap (Err path)    | `251.09 ns/iter` | `233.67 ns` | `240.94 ns` | `415.45 ns` | `490.30 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `175.64 ns/iter` | `167.46 ns` | `173.00 ns` | `262.54 ns` | `344.91 ns` |
| Result.mapOrElseAsync (Err path)    | `180.73 ns/iter` | `173.40 ns` | `178.63 ns` | `269.36 ns` | `290.90 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `187.09 ns/iter` | `179.94 ns` | `185.01 ns` | `275.52 ns` | `295.05 ns` |
| Result.unwrapOrElseAsync (Err path) | `178.48 ns/iter` | `170.54 ns` | `176.06 ns` | `268.52 ns` | `290.96 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `657.39 ns/iter` | `637.12 ns` | `651.45 ns` | `757.83 ns` | `770.19 ns` |
| Err.mapAsync (alloc AsyncResult)        | `402.22 ns/iter` | `386.41 ns` | `395.04 ns` | `516.72 ns` | `621.53 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `397.37 ns/iter` | `381.02 ns` | `396.18 ns` | `501.03 ns` | `651.19 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `657.56 ns/iter` | `638.02 ns` | `651.30 ns` | `759.90 ns` | `771.12 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `650.09 ns/iter` | `632.74 ns` | `642.94 ns` | `754.81 ns` | `768.59 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `389.10 ns/iter` | `376.88 ns` | `384.57 ns` | `483.29 ns` | `564.34 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `388.29 ns/iter` | `376.56 ns` | `383.94 ns` | `487.41 ns` | `502.16 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `665.08 ns/iter` | `647.10 ns` | `657.71 ns` | `779.36 ns` | `835.25 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `577.00 ns/iter` | `558.50 ns` | `570.71 ns` | `697.95 ns` | `776.90 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `401.91 ns/iter` | `387.44 ns` | `396.17 ns` | `503.81 ns` | `539.26 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `399.22 ns/iter` | `385.53 ns` | `393.59 ns` | `506.10 ns` | `534.69 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `581.29 ns/iter` | `563.88 ns` | `574.97 ns` | `688.73 ns` | `708.38 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `379.30 ns/iter` | `363.06 ns` | `379.35 ns` | `482.92 ns` | `503.49 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `719.55 ns/iter` | `697.82 ns` | `711.58 ns` | `828.96 ns` | `840.87 ns` |
| catchUnwindAsync (call only, Ok)       | `723.30 ns/iter` | `684.05 ns` | `723.80 ns` | `832.58 ns` | `846.12 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.31 µs/iter` | `  1.24 µs` | `  1.27 µs` | `  2.11 µs` | `  2.14 µs` |
| catchUnwindAsync (call only, reject)   | `  1.26 µs/iter` | `  1.21 µs` | `  1.25 µs` | `  1.39 µs` | `  1.40 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `247.50 ns/iter` | `240.15 ns` | `244.61 ns` | `344.40 ns` | `419.39 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.66 µs/iter` | `  1.40 µs` | `  1.59 µs` | `  2.53 µs` | `  2.56 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `190.61 ns/iter` | `181.79 ns` | `187.33 ns` | `283.78 ns` | `327.44 ns` |
| Option.mapOrElseAsync (None path)    | `190.52 ns/iter` | `179.71 ns` | `190.42 ns` | `284.99 ns` | `330.83 ns` |
| Option.unwrapOrElseAsync (Some path) | `198.19 ns/iter` | `189.95 ns` | `195.45 ns` | `290.22 ns` | `317.26 ns` |
| Option.unwrapOrElseAsync (None path) | `188.08 ns/iter` | `178.21 ns` | `187.92 ns` | `282.59 ns` | `293.89 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `651.37 ns/iter` | `632.04 ns` | `643.20 ns` | `752.64 ns` | `869.17 ns` |
| None.mapAsync (alloc AsyncOption)         | `406.85 ns/iter` | `392.37 ns` | `400.41 ns` | `522.04 ns` | `623.23 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `655.04 ns/iter` | `638.35 ns` | `647.64 ns` | `764.37 ns` | `821.69 ns` |
| None.inspectAsync (alloc AsyncOption)     | `398.89 ns/iter` | `386.55 ns` | `393.10 ns` | `510.73 ns` | `599.47 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `579.49 ns/iter` | `563.23 ns` | `571.69 ns` | `686.43 ns` | `855.92 ns` |
| None.andThenAsync (alloc AsyncOption)     | `407.81 ns/iter` | `392.58 ns` | `399.96 ns` | `522.82 ns` | `653.95 ns` |
| Some.filterAsync true (alloc AsyncOption) | `639.18 ns/iter` | `619.88 ns` | `630.91 ns` | `743.33 ns` | `837.57 ns` |
| None.filterAsync (alloc AsyncOption)      | `405.94 ns/iter` | `392.69 ns` | `400.11 ns` | `512.26 ns` | `584.20 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `395.30 ns/iter` | `383.86 ns` | `390.87 ns` | `495.62 ns` | `516.64 ns` |
| None.orElseAsync (alloc AsyncOption)      | `571.24 ns/iter` | `558.00 ns` | `565.52 ns` | `672.62 ns` | `682.01 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `398.19 ns/iter` | `384.65 ns` | `394.08 ns` | `498.85 ns` | `514.96 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `656.93 ns/iter` | `622.21 ns` | `639.86 ns` | `  1.01 µs` | `  1.19 µs` |
| Some.getOrInsertWithAsync (existing)      | `198.42 ns/iter` | `189.29 ns` | `195.06 ns` | `295.62 ns` | `359.60 ns` |
| None.getOrInsertWithAsync (insert)        | `588.53 ns/iter` | `566.94 ns` | `577.86 ns` | `717.18 ns` | `959.46 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `385.19 ns/iter` | `374.62 ns` | `381.44 ns` | `491.45 ns` | `562.74 ns` |
