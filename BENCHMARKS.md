# Benchmarks

clk: ~4.18 GHz
cpu: AMD EPYC 9V45 96-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  4.11 ns/iter` | `  2.68 ns` | `  3.39 ns` | ` 22.39 ns` | `116.56 ns` |
| Err(1)         | `  7.24 ns/iter` | `  3.53 ns` | `  7.05 ns` | ` 10.65 ns` | ` 72.84 ns` |
| Some(1)        | ` 10.49 ns/iter` | `  6.89 ns` | ` 10.48 ns` | ` 60.29 ns` | `135.05 ns` |
| None()         | `  6.79 ns/iter` | `  4.22 ns` | `  6.88 ns` | ` 12.20 ns` | `274.47 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  1.33 ns/iter` | `122.07 ps` | `  3.58 ns` | `  4.59 ns` | ` 12.17 ns` |
| Err.isOk()          | `  4.15 ns/iter` | `  3.90 ns` | `  4.15 ns` | `  5.56 ns` | ` 16.70 ns` |
| Ok.isErr()          | `  4.10 ns/iter` | `943.85 ps` | `  4.33 ns` | `  6.10 ns` | ` 15.06 ns` |
| Err.isErr()         | `  4.60 ns/iter` | `  4.45 ns` | `  4.53 ns` | `  6.26 ns` | ` 14.31 ns` |
| Ok.isOkAnd (true)   | `  3.37 ns/iter` | `  3.25 ns` | `  3.35 ns` | `  4.74 ns` | ` 17.60 ns` |
| Err.isOkAnd         | `  4.23 ns/iter` | `  4.13 ns` | `  4.20 ns` | `  5.55 ns` | ` 19.31 ns` |
| Ok.isErrAnd         | `  3.30 ns/iter` | `  2.94 ns` | `  3.43 ns` | `  4.63 ns` | ` 13.57 ns` |
| Err.isErrAnd (true) | `  3.36 ns/iter` | `  3.24 ns` | `  3.36 ns` | `  4.69 ns` | ` 16.83 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 11.79 ns/iter` | `  8.69 ns` | ` 11.32 ns` | ` 55.33 ns` | ` 82.05 ns` |
| Err.ok()               | `  8.67 ns/iter` | `  7.31 ns` | `  8.40 ns` | ` 12.91 ns` | ` 74.42 ns` |
| Ok.err()               | `  8.23 ns/iter` | `  6.98 ns` | `  7.89 ns` | ` 12.11 ns` | ` 74.35 ns` |
| Err.err()              | ` 12.16 ns/iter` | ` 10.02 ns` | ` 11.71 ns` | ` 56.10 ns` | ` 96.65 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | `  9.87 ns/iter` | `  6.45 ns` | `  9.81 ns` | ` 14.98 ns` | ` 84.14 ns` |
| Err.map (reuse)       | `  5.00 ns/iter` | `  4.69 ns` | `  4.97 ns` | `  6.99 ns` | ` 22.29 ns` |
| Ok.mapOr              | `  2.50 ns/iter` | `  1.75 ns` | `  3.11 ns` | `  6.55 ns` | ` 14.90 ns` |
| Err.mapOr             | `  3.10 ns/iter` | `  3.03 ns` | `  3.08 ns` | `  4.36 ns` | ` 14.47 ns` |
| Ok.mapOrElse          | `  5.68 ns/iter` | `  4.93 ns` | `  5.39 ns` | ` 15.36 ns` | ` 73.98 ns` |
| Err.mapOrElse         | `  7.33 ns/iter` | `  6.41 ns` | `  7.28 ns` | ` 10.58 ns` | ` 83.78 ns` |
| Ok.mapErr (reuse)     | `  4.96 ns/iter` | `  4.55 ns` | `  4.97 ns` | `  6.37 ns` | ` 15.85 ns` |
| Err.mapErr (alloc)    | ` 11.02 ns/iter` | `  7.06 ns` | `  9.87 ns` | ` 55.10 ns` | `128.66 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  4.85 ns/iter` | `  2.31 ns` | `  5.34 ns` | `  7.49 ns` | `102.83 ns` |
| Err.inspect               | `  5.17 ns/iter` | `  3.86 ns` | `  5.02 ns` | `  7.75 ns` | ` 76.30 ns` |
| Ok.inspectErr             | `  3.33 ns/iter` | `  3.06 ns` | `  3.26 ns` | `  5.49 ns` | ` 45.68 ns` |
| Err.inspectErr            | `  5.25 ns/iter` | `  3.79 ns` | `  5.03 ns` | ` 13.06 ns` | ` 66.53 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  3.14 ns/iter` | `  3.03 ns` | `  3.11 ns` | `  5.18 ns` | ` 38.26 ns` |
| Err.unwrapErr            | `  3.37 ns/iter` | `  3.27 ns` | `  3.33 ns` | `  4.77 ns` | ` 14.48 ns` |
| Ok.expect                | `  2.98 ns/iter` | `  2.84 ns` | `  2.97 ns` | `  4.44 ns` | ` 10.34 ns` |
| Err.expectErr            | `  4.41 ns/iter` | `  4.24 ns` | `  4.41 ns` | `  5.95 ns` | ` 12.80 ns` |
| Ok.unwrapOr              | `  2.93 ns/iter` | `  2.83 ns` | `  2.91 ns` | `  4.29 ns` | `  8.64 ns` |
| Err.unwrapOr             | `  3.26 ns/iter` | `  2.88 ns` | `  3.28 ns` | `  4.76 ns` | ` 11.38 ns` |
| Ok.unwrapOrElse          | `  2.95 ns/iter` | `  2.87 ns` | `  2.92 ns` | `  4.27 ns` | ` 23.32 ns` |
| Err.unwrapOrElse         | `  5.54 ns/iter` | `  4.31 ns` | `  5.44 ns` | ` 13.51 ns` | ` 76.56 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  4.06 ns/iter` | `  3.92 ns` | `  4.03 ns` | `  6.26 ns` | ` 14.93 ns` |
| Err.and (reuse)        | `  4.03 ns/iter` | `  3.92 ns` | `  4.01 ns` | `  5.46 ns` | ` 11.38 ns` |
| Ok.andThen (alloc)     | ` 13.18 ns/iter` | `  9.67 ns` | ` 12.54 ns` | ` 49.87 ns` | ` 94.90 ns` |
| Err.andThen (alloc)    | `  4.50 ns/iter` | `  4.38 ns` | `  4.47 ns` | `  6.09 ns` | ` 13.50 ns` |
| Ok.or (reuse)          | `  3.85 ns/iter` | `  3.62 ns` | `  3.83 ns` | `  5.43 ns` | ` 10.49 ns` |
| Err.or (reuse)         | `  3.86 ns/iter` | `  3.65 ns` | `  3.83 ns` | `  5.26 ns` | ` 11.20 ns` |
| Ok.orElse (alloc)      | `  3.59 ns/iter` | `  3.50 ns` | `  3.56 ns` | `  4.97 ns` | ` 23.71 ns` |
| Err.orElse (alloc)     | `  5.15 ns/iter` | `  3.73 ns` | `  5.08 ns` | ` 13.06 ns` | ` 80.49 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  5.68 ns/iter` | `  5.50 ns` | `  5.64 ns` | `  7.06 ns` | ` 15.68 ns` |
| Ok(Some).transpose                     | ` 39.74 ns/iter` | ` 28.14 ns` | ` 38.56 ns` | ` 97.10 ns` | `190.42 ns` |
| Ok(None).transpose                     | ` 23.25 ns/iter` | ` 20.23 ns` | ` 22.67 ns` | ` 75.30 ns` | ` 94.72 ns` |
| Err.transpose                          | ` 27.32 ns/iter` | ` 20.85 ns` | ` 26.82 ns` | ` 77.78 ns` | ` 95.33 ns` |
| Ok.match                               | `  7.28 ns/iter` | `  6.07 ns` | `  7.18 ns` | ` 10.34 ns` | ` 82.35 ns` |
| Err.match                              | `  7.97 ns/iter` | `  6.86 ns` | `  7.79 ns` | ` 10.73 ns` | ` 91.40 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 13.11 ns/iter` | `  8.04 ns` | ` 12.87 ns` | ` 19.50 ns` | `111.39 ns` |
| Err.iter        | `  4.26 ns/iter` | `  4.19 ns` | `  4.23 ns` | `  5.55 ns` | ` 15.06 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 15.56 ns/iter` | ` 12.59 ns` | ` 14.90 ns` | ` 66.95 ns` | `151.40 ns` |
| catchUnwind (call only, Ok)    | ` 10.11 ns/iter` | `  6.98 ns` | `  9.91 ns` | ` 13.57 ns` | ` 84.99 ns` |
| catchUnwind (wrap + call, Err) | `723.22 ns/iter` | `646.59 ns` | `717.78 ns` | `948.97 ns` | `  1.05 µs` |
| catchUnwind (call only, catch) | `699.57 ns/iter` | `557.84 ns` | `714.72 ns` | `792.79 ns` | `837.39 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  3.21 ns/iter` | `  2.98 ns` | `  3.29 ns` | `  4.57 ns` | ` 12.85 ns` |
| None.isSome()         | `  3.30 ns/iter` | `  2.95 ns` | `  3.30 ns` | `  4.61 ns` | ` 10.33 ns` |
| Some.isNone()         | `  3.22 ns/iter` | `  2.99 ns` | `  3.30 ns` | `  4.64 ns` | `  9.79 ns` |
| None.isNone()         | `  3.33 ns/iter` | `  3.06 ns` | `  3.32 ns` | `  4.65 ns` | `  9.67 ns` |
| Some.isSomeAnd (true) | `  3.08 ns/iter` | `  3.01 ns` | `  3.06 ns` | `  4.37 ns` | ` 14.29 ns` |
| None.isSomeAnd        | `  4.03 ns/iter` | `  3.96 ns` | `  4.01 ns` | `  5.31 ns` | ` 15.61 ns` |
| Some.isNoneOr (true)  | `  3.14 ns/iter` | `  3.07 ns` | `  3.12 ns` | `  4.43 ns` | ` 12.53 ns` |
| None.isNoneOr         | `  3.57 ns/iter` | `  3.42 ns` | `  3.56 ns` | `  4.86 ns` | ` 15.41 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  2.93 ns/iter` | `  2.82 ns` | `  2.92 ns` | `  4.27 ns` | ` 12.81 ns` |
| Some.expect              | `  2.91 ns/iter` | `  2.82 ns` | `  2.90 ns` | `  4.23 ns` | ` 16.99 ns` |
| Some.unwrapOr            | `  2.92 ns/iter` | `  2.84 ns` | `  2.91 ns` | `  4.24 ns` | `  8.22 ns` |
| None.unwrapOr            | `  3.26 ns/iter` | `  3.06 ns` | `  3.24 ns` | `  4.56 ns` | `  9.49 ns` |
| Some.unwrapOrElse        | `  5.58 ns/iter` | `  4.08 ns` | `  5.38 ns` | ` 13.81 ns` | ` 85.63 ns` |
| None.unwrapOrElse        | `  5.95 ns/iter` | `  4.80 ns` | `  5.85 ns` | `  7.78 ns` | ` 87.44 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 11.46 ns/iter` | `  8.45 ns` | ` 11.31 ns` | ` 16.29 ns` | ` 86.35 ns` |
| None.map (alloc)      | `  4.43 ns/iter` | `  4.18 ns` | `  4.24 ns` | `  6.37 ns` | ` 60.63 ns` |
| Some.mapOr            | `  3.06 ns/iter` | `  2.95 ns` | `  3.04 ns` | `  4.41 ns` | ` 13.05 ns` |
| None.mapOr            | `  3.53 ns/iter` | `  3.35 ns` | `  3.49 ns` | `  4.85 ns` | ` 38.01 ns` |
| Some.mapOrElse        | `  7.30 ns/iter` | `  5.83 ns` | `  6.97 ns` | ` 17.19 ns` | ` 88.76 ns` |
| None.mapOrElse        | `  7.54 ns/iter` | `  6.38 ns` | `  7.41 ns` | `  9.69 ns` | ` 88.43 ns` |
| Some.inspect          | `  5.27 ns/iter` | `  3.92 ns` | `  5.15 ns` | `  7.13 ns` | ` 87.65 ns` |
| None.inspect          | `  5.65 ns/iter` | `  4.37 ns` | `  5.52 ns` | `  7.57 ns` | ` 89.26 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | `  8.74 ns/iter` | `  5.71 ns` | `  8.81 ns` | ` 11.79 ns` | ` 78.75 ns` |
| None.okOr              | `  9.35 ns/iter` | `  6.60 ns` | `  9.17 ns` | ` 12.10 ns` | ` 82.29 ns` |
| Some.okOrElse          | ` 12.45 ns/iter` | `  9.66 ns` | ` 12.16 ns` | ` 16.88 ns` | ` 90.70 ns` |
| None.okOrElse          | ` 13.04 ns/iter` | ` 10.52 ns` | ` 12.75 ns` | ` 16.94 ns` | ` 91.47 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  4.03 ns/iter` | `  3.93 ns` | `  4.02 ns` | `  5.33 ns` | ` 15.28 ns` |
| None.and (alloc)           | `  4.07 ns/iter` | `  3.97 ns` | `  4.06 ns` | `  5.38 ns` | ` 11.93 ns` |
| Some.andThen (alloc)       | ` 16.16 ns/iter` | ` 11.72 ns` | ` 15.40 ns` | ` 77.92 ns` | `104.32 ns` |
| None.andThen (alloc)       | `  3.81 ns/iter` | `  3.72 ns` | `  3.78 ns` | `  5.11 ns` | ` 20.76 ns` |
| Some.filter (true, reuse)  | `  5.44 ns/iter` | `  3.72 ns` | `  5.22 ns` | ` 13.64 ns` | ` 87.17 ns` |
| Some.filter (false, alloc) | ` 10.81 ns/iter` | `  7.27 ns` | ` 10.53 ns` | ` 14.25 ns` | ` 90.29 ns` |
| None.filter (alloc)        | `  3.57 ns/iter` | `  3.35 ns` | `  3.57 ns` | `  4.89 ns` | ` 17.75 ns` |
| Some.or (reuse)            | `  4.07 ns/iter` | `  3.96 ns` | `  4.05 ns` | `  5.39 ns` | ` 12.86 ns` |
| None.or (reuse/optb)       | `  4.02 ns/iter` | `  3.89 ns` | `  4.01 ns` | `  5.33 ns` | ` 11.87 ns` |
| Some.orElse (reuse)        | `  3.63 ns/iter` | `  3.54 ns` | `  3.60 ns` | `  4.94 ns` | ` 26.03 ns` |
| None.orElse (alloc)        | `  6.38 ns/iter` | `  4.89 ns` | `  6.12 ns` | ` 15.10 ns` | ` 88.50 ns` |
| Some xor None (reuse)      | `  4.73 ns/iter` | `  4.61 ns` | `  4.70 ns` | `  6.04 ns` | ` 19.74 ns` |
| None xor Some (reuse/optb) | `  4.73 ns/iter` | `  4.63 ns` | `  4.70 ns` | `  6.06 ns` | ` 17.72 ns` |
| Some xor Some (alloc)      | ` 10.39 ns/iter` | `  8.86 ns` | `  9.91 ns` | ` 29.85 ns` | ` 92.59 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 15.26 ns/iter` | `  8.78 ns` | ` 14.95 ns` | ` 27.27 ns` | ` 87.95 ns` |
| None.insert                     | ` 11.43 ns/iter` | `  9.69 ns` | ` 11.25 ns` | ` 15.31 ns` | ` 89.86 ns` |
| Some.getOrInsert (existing)     | ` 11.84 ns/iter` | `  7.33 ns` | ` 11.61 ns` | ` 15.74 ns` | ` 93.77 ns` |
| None.getOrInsert (insert)       | ` 12.08 ns/iter` | ` 10.30 ns` | ` 11.87 ns` | ` 16.27 ns` | ` 81.75 ns` |
| Some.getOrInsertWith (existing) | ` 15.20 ns/iter` | ` 13.05 ns` | ` 14.93 ns` | ` 25.31 ns` | ` 94.87 ns` |
| None.getOrInsertWith (insert)   | ` 15.84 ns/iter` | ` 13.75 ns` | ` 15.48 ns` | ` 30.39 ns` | ` 98.14 ns` |
| Some.take                       | ` 23.26 ns/iter` | ` 20.41 ns` | ` 22.88 ns` | ` 79.09 ns` | ` 95.34 ns` |
| None.take                       | ` 15.83 ns/iter` | ` 13.32 ns` | ` 15.49 ns` | ` 27.93 ns` | ` 99.54 ns` |
| Some.takeIf (true)              | ` 26.14 ns/iter` | ` 20.88 ns` | ` 25.62 ns` | ` 84.76 ns` | `126.16 ns` |
| Some.takeIf (false)             | ` 21.97 ns/iter` | ` 18.97 ns` | ` 21.52 ns` | ` 78.16 ns` | ` 90.18 ns` |
| Some.replace                    | ` 27.81 ns/iter` | ` 23.20 ns` | ` 27.47 ns` | ` 86.33 ns` | `107.88 ns` |
| None.replace                    | ` 20.20 ns/iter` | ` 17.29 ns` | ` 19.79 ns` | ` 77.42 ns` | ` 94.54 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  4.68 ns/iter` | `  4.53 ns` | `  4.66 ns` | `  6.00 ns` | ` 17.50 ns` |
| Some(Ok).transpose                             | ` 40.15 ns/iter` | ` 31.29 ns` | ` 38.70 ns` | `113.70 ns` | `208.33 ns` |
| Some(Err).transpose                            | ` 29.91 ns/iter` | ` 23.82 ns` | ` 29.41 ns` | ` 89.62 ns` | `109.08 ns` |
| None.transpose                                 | ` 22.29 ns/iter` | ` 19.04 ns` | ` 22.01 ns` | ` 81.25 ns` | ` 99.39 ns` |
| Some.unzip                                     | ` 37.78 ns/iter` | ` 28.14 ns` | ` 37.23 ns` | ` 99.97 ns` | `128.38 ns` |
| None.unzip                                     | ` 26.03 ns/iter` | ` 21.79 ns` | ` 25.61 ns` | ` 87.09 ns` | `109.36 ns` |
| Some.match                                     | `  9.67 ns/iter` | `  8.44 ns` | `  9.43 ns` | ` 12.33 ns` | ` 94.83 ns` |
| None.match                                     | `  9.86 ns/iter` | `  8.31 ns` | `  9.60 ns` | ` 12.36 ns` | ` 98.18 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 12.92 ns/iter` | `  7.61 ns` | ` 13.03 ns` | ` 17.44 ns` | ` 89.11 ns` |
| None.iter       | `  4.30 ns/iter` | `  4.20 ns` | `  4.26 ns` | `  5.62 ns` | ` 31.04 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `162.42 ns/iter` | `150.73 ns` | `156.63 ns` | `288.50 ns` | `381.96 ns` |
| AsyncResult.unwrap (Err path)    | `156.08 ns/iter` | `149.11 ns` | `155.20 ns` | `236.26 ns` | `247.57 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `116.71 ns/iter` | `111.25 ns` | `116.06 ns` | `184.51 ns` | `199.15 ns` |
| Result.mapOrElseAsync (Err path)    | `116.91 ns/iter` | `111.77 ns` | `115.94 ns` | `191.77 ns` | `210.46 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `121.55 ns/iter` | `116.21 ns` | `120.81 ns` | `196.87 ns` | `216.42 ns` |
| Result.unwrapOrElseAsync (Err path) | `116.48 ns/iter` | `110.67 ns` | `115.00 ns` | `192.38 ns` | `204.75 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `399.49 ns/iter` | `379.59 ns` | `394.71 ns` | `521.64 ns` | `655.41 ns` |
| Err.mapAsync (alloc AsyncResult)        | `243.74 ns/iter` | `231.99 ns` | `240.48 ns` | `335.22 ns` | `417.22 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `235.83 ns/iter` | `224.60 ns` | `233.02 ns` | `327.51 ns` | `345.97 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `392.74 ns/iter` | `377.99 ns` | `388.47 ns` | `482.84 ns` | `562.35 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `405.12 ns/iter` | `392.21 ns` | `402.17 ns` | `495.08 ns` | `509.37 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `236.04 ns/iter` | `224.68 ns` | `233.35 ns` | `321.77 ns` | `370.92 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `231.57 ns/iter` | `222.15 ns` | `229.24 ns` | `316.87 ns` | `343.77 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `400.08 ns/iter` | `384.47 ns` | `396.55 ns` | `492.33 ns` | `527.50 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `348.66 ns/iter` | `334.62 ns` | `345.18 ns` | `444.55 ns` | `461.95 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `243.07 ns/iter` | `231.72 ns` | `240.67 ns` | `327.53 ns` | `368.08 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `241.04 ns/iter` | `228.95 ns` | `238.49 ns` | `329.46 ns` | `350.62 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `342.82 ns/iter` | `329.70 ns` | `339.40 ns` | `431.93 ns` | `484.48 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `216.99 ns/iter` | `205.72 ns` | `215.53 ns` | `302.29 ns` | `330.93 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `447.97 ns/iter` | `420.92 ns` | `446.23 ns` | `542.92 ns` | `549.00 ns` |
| catchUnwindAsync (call only, Ok)       | `435.07 ns/iter` | `417.60 ns` | `432.03 ns` | `524.65 ns` | `528.36 ns` |
| catchUnwindAsync (wrap + call, reject) | `830.27 ns/iter` | `785.23 ns` | `808.49 ns` | `  1.29 µs` | `  1.34 µs` |
| catchUnwindAsync (call only, reject)   | `793.00 ns/iter` | `742.53 ns` | `790.18 ns` | `894.43 ns` | `909.03 ns` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `160.15 ns/iter` | `154.36 ns` | `159.05 ns` | `240.82 ns` | `267.09 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.08 µs/iter` | `913.59 ns` | `  1.06 µs` | `  1.53 µs` | `  1.55 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `127.66 ns/iter` | `119.55 ns` | `126.37 ns` | `212.19 ns` | `230.41 ns` |
| Option.mapOrElseAsync (None path)    | `125.18 ns/iter` | `116.74 ns` | `124.33 ns` | `203.48 ns` | `213.04 ns` |
| Option.unwrapOrElseAsync (Some path) | `129.95 ns/iter` | `122.13 ns` | `128.83 ns` | `212.08 ns` | `224.82 ns` |
| Option.unwrapOrElseAsync (None path) | `121.82 ns/iter` | `114.65 ns` | `120.74 ns` | `202.24 ns` | `218.62 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `402.09 ns/iter` | `383.39 ns` | `398.29 ns` | `491.47 ns` | `623.98 ns` |
| None.mapAsync (alloc AsyncOption)         | `244.12 ns/iter` | `232.23 ns` | `240.76 ns` | `334.23 ns` | `386.98 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `404.83 ns/iter` | `387.51 ns` | `401.12 ns` | `496.80 ns` | `505.30 ns` |
| None.inspectAsync (alloc AsyncOption)     | `234.59 ns/iter` | `221.65 ns` | `232.25 ns` | `320.90 ns` | `383.28 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `353.83 ns/iter` | `336.97 ns` | `350.36 ns` | `447.37 ns` | `486.86 ns` |
| None.andThenAsync (alloc AsyncOption)     | `247.51 ns/iter` | `235.39 ns` | `244.69 ns` | `342.53 ns` | `361.10 ns` |
| Some.filterAsync true (alloc AsyncOption) | `398.06 ns/iter` | `384.19 ns` | `394.45 ns` | `493.83 ns` | `505.21 ns` |
| None.filterAsync (alloc AsyncOption)      | `240.67 ns/iter` | `225.92 ns` | `237.96 ns` | `334.56 ns` | `348.33 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `232.53 ns/iter` | `221.97 ns` | `230.29 ns` | `329.61 ns` | `334.42 ns` |
| None.orElseAsync (alloc AsyncOption)      | `342.26 ns/iter` | `329.86 ns` | `339.09 ns` | `433.01 ns` | `452.67 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `238.57 ns/iter` | `227.84 ns` | `237.02 ns` | `330.08 ns` | `355.77 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `388.80 ns/iter` | `370.31 ns` | `386.35 ns` | `484.21 ns` | `509.65 ns` |
| Some.getOrInsertWithAsync (existing)      | `129.41 ns/iter` | `121.00 ns` | `128.03 ns` | `211.96 ns` | `238.30 ns` |
| None.getOrInsertWithAsync (insert)        | `378.67 ns/iter` | `360.08 ns` | `374.99 ns` | `468.13 ns` | `564.66 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `222.72 ns/iter` | `212.67 ns` | `220.84 ns` | `311.18 ns` | `332.54 ns` |
