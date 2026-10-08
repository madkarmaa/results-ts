# Benchmarks

clk: ~3.00 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.4.2 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  6.66 ns/iter` | `  5.09 ns` | `  5.98 ns` | ` 53.36 ns` | `148.27 ns` |
| Err(1)         | `  6.77 ns/iter` | `  4.96 ns` | `  6.01 ns` | ` 51.92 ns` | `108.33 ns` |
| Some(1)        | `  8.65 ns/iter` | `  5.92 ns` | `  9.49 ns` | ` 56.73 ns` | `172.42 ns` |
| None()         | `  7.26 ns/iter` | `  4.04 ns` | `  8.04 ns` | ` 21.07 ns` | ` 84.60 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.33 ns/iter` | `  1.47 ns` | `  7.07 ns` | ` 15.97 ns` | ` 20.40 ns` |
| Err.isOk()          | `  8.52 ns/iter` | `  7.98 ns` | `  8.30 ns` | ` 17.05 ns` | ` 23.15 ns` |
| Ok.isErr()          | `  8.69 ns/iter` | `  8.29 ns` | `  8.37 ns` | ` 13.79 ns` | ` 25.12 ns` |
| Err.isErr()         | `  9.38 ns/iter` | `  8.98 ns` | ` 10.06 ns` | ` 12.42 ns` | ` 23.31 ns` |
| Ok.isOkAnd (true)   | `  5.99 ns/iter` | `  5.02 ns` | `  6.14 ns` | `  8.82 ns` | ` 24.78 ns` |
| Err.isOkAnd         | `  6.80 ns/iter` | `  6.64 ns` | `  6.65 ns` | `  9.80 ns` | ` 34.19 ns` |
| Ok.isErrAnd         | `  3.18 ns/iter` | `  2.40 ns` | `  2.41 ns` | `  8.33 ns` | ` 28.58 ns` |
| Err.isErrAnd (true) | `  4.86 ns/iter` | `  4.79 ns` | `  4.79 ns` | `  7.03 ns` | ` 22.33 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 11.77 ns/iter` | ` 10.04 ns` | ` 10.92 ns` | ` 58.88 ns` | ` 89.77 ns` |
| Err.ok()               | ` 10.82 ns/iter` | `  9.72 ns` | ` 10.33 ns` | ` 33.26 ns` | ` 79.99 ns` |
| Ok.err()               | ` 10.21 ns/iter` | `  9.12 ns` | `  9.66 ns` | ` 22.72 ns` | ` 84.28 ns` |
| Err.err()              | ` 13.18 ns/iter` | ` 11.53 ns` | ` 12.32 ns` | ` 63.20 ns` | `127.14 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 12.94 ns/iter` | ` 11.68 ns` | ` 12.29 ns` | ` 60.30 ns` | ` 89.41 ns` |
| Err.map (reuse)       | `  9.63 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 12.12 ns` | ` 27.42 ns` |
| Ok.mapOr              | `  6.22 ns/iter` | `  6.10 ns` | `  6.10 ns` | `  8.45 ns` | ` 16.81 ns` |
| Err.mapOr             | `  8.21 ns/iter` | `  8.10 ns` | `  8.11 ns` | ` 10.40 ns` | ` 21.25 ns` |
| Ok.mapOrElse          | ` 12.46 ns/iter` | ` 11.74 ns` | ` 12.07 ns` | ` 16.97 ns` | ` 83.10 ns` |
| Err.mapOrElse         | ` 12.68 ns/iter` | ` 12.02 ns` | ` 12.24 ns` | ` 19.17 ns` | ` 82.90 ns` |
| Ok.mapErr (reuse)     | `  8.69 ns/iter` | `  8.57 ns` | `  8.57 ns` | ` 10.94 ns` | ` 19.91 ns` |
| Err.mapErr (alloc)    | ` 13.99 ns/iter` | ` 12.65 ns` | ` 13.31 ns` | ` 63.71 ns` | ` 86.21 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  7.62 ns/iter` | `  7.03 ns` | `  7.27 ns` | ` 13.10 ns` | ` 75.30 ns` |
| Err.inspect               | `  8.57 ns/iter` | `  7.96 ns` | `  8.19 ns` | ` 14.84 ns` | ` 77.54 ns` |
| Ok.inspectErr             | `  5.88 ns/iter` | `  5.79 ns` | `  5.79 ns` | `  8.05 ns` | ` 21.61 ns` |
| Err.inspectErr            | `  7.66 ns/iter` | `  7.04 ns` | `  7.31 ns` | ` 12.66 ns` | ` 80.59 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  5.60 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  8.28 ns` | ` 22.10 ns` |
| Err.unwrapErr            | `  5.58 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.78 ns` | ` 23.51 ns` |
| Ok.expect                | `  5.57 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.72 ns` | ` 21.94 ns` |
| Err.expectErr            | `  8.47 ns/iter` | `  8.26 ns` | `  8.41 ns` | ` 10.74 ns` | ` 17.65 ns` |
| Ok.unwrapOr              | `  5.57 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.73 ns` | ` 15.58 ns` |
| Err.unwrapOr             | `  6.05 ns/iter` | `  5.90 ns` | `  5.97 ns` | `  8.22 ns` | ` 19.61 ns` |
| Ok.unwrapOrElse          | `  5.59 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.79 ns` | ` 32.63 ns` |
| Err.unwrapOrElse         | `  8.92 ns/iter` | `  8.26 ns` | `  8.57 ns` | ` 13.30 ns` | ` 86.02 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  7.12 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.34 ns` | ` 27.76 ns` |
| Err.and (reuse)        | `  7.14 ns/iter` | `  7.02 ns` | `  7.04 ns` | `  9.42 ns` | ` 14.90 ns` |
| Ok.andThen (alloc)     | ` 19.14 ns/iter` | ` 17.21 ns` | ` 18.20 ns` | ` 75.58 ns` | ` 92.90 ns` |
| Err.andThen (alloc)    | `  6.52 ns/iter` | `  6.41 ns` | `  6.42 ns` | `  8.70 ns` | ` 35.89 ns` |
| Ok.or (reuse)          | `  7.46 ns/iter` | `  7.33 ns` | `  7.34 ns` | `  9.89 ns` | ` 27.45 ns` |
| Err.or (reuse)         | `  7.36 ns/iter` | `  7.26 ns` | `  7.26 ns` | `  9.56 ns` | ` 25.85 ns` |
| Ok.orElse (alloc)      | `  5.89 ns/iter` | `  5.79 ns` | `  5.80 ns` | `  8.13 ns` | ` 31.36 ns` |
| Err.orElse (alloc)     | `  7.40 ns/iter` | `  6.75 ns` | `  7.06 ns` | ` 13.65 ns` | ` 86.86 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  9.62 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 11.86 ns` | ` 24.41 ns` |
| Ok(Some).transpose                     | ` 41.60 ns/iter` | ` 36.27 ns` | ` 38.82 ns` | `104.87 ns` | `135.35 ns` |
| Ok(None).transpose                     | ` 26.75 ns/iter` | ` 23.82 ns` | ` 25.05 ns` | ` 87.04 ns` | ` 98.85 ns` |
| Err.transpose                          | ` 29.12 ns/iter` | ` 25.35 ns` | ` 26.90 ns` | ` 91.39 ns` | `103.19 ns` |
| Ok.match                               | ` 12.09 ns/iter` | ` 11.37 ns` | ` 11.73 ns` | ` 15.77 ns` | ` 81.00 ns` |
| Err.match                              | ` 14.11 ns/iter` | ` 13.43 ns` | ` 13.67 ns` | ` 20.43 ns` | ` 88.49 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 14.41 ns/iter` | ` 12.76 ns` | ` 13.74 ns` | ` 66.82 ns` | `102.48 ns` |
| Err.iter        | `  6.64 ns/iter` | `  6.41 ns` | `  6.42 ns` | `  8.89 ns` | ` 23.08 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 19.78 ns/iter` | ` 17.23 ns` | ` 18.37 ns` | ` 80.00 ns` | `139.13 ns` |
| catchUnwind (call only, Ok)    | ` 13.64 ns/iter` | ` 12.36 ns` | ` 13.02 ns` | ` 56.37 ns` | ` 92.67 ns` |
| catchUnwind (wrap + call, Err) | `  1.01 µs/iter` | `960.62 ns` | `990.17 ns` | `  1.42 µs` | `  1.43 µs` |
| catchUnwind (call only, catch) | `989.46 ns/iter` | `889.18 ns` | `989.19 ns` | `  1.09 µs` | `  1.21 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  5.90 ns/iter` | `  5.79 ns` | `  5.81 ns` | `  8.24 ns` | ` 15.14 ns` |
| None.isSome()         | `  5.87 ns/iter` | `  5.79 ns` | `  5.80 ns` | `  8.06 ns` | ` 13.35 ns` |
| Some.isNone()         | `  5.89 ns/iter` | `  5.79 ns` | `  5.81 ns` | `  8.13 ns` | ` 16.10 ns` |
| None.isNone()         | `  5.87 ns/iter` | `  5.79 ns` | `  5.79 ns` | `  8.06 ns` | ` 17.47 ns` |
| Some.isSomeAnd (true) | `  6.26 ns/iter` | `  6.10 ns` | `  6.11 ns` | ` 10.75 ns` | ` 26.40 ns` |
| None.isSomeAnd        | `  6.83 ns/iter` | `  6.72 ns` | `  6.72 ns` | `  9.12 ns` | ` 29.71 ns` |
| Some.isNoneOr (true)  | `  5.88 ns/iter` | `  5.79 ns` | `  5.80 ns` | `  8.03 ns` | ` 27.14 ns` |
| None.isNoneOr         | `  7.12 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.29 ns` | ` 30.75 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  5.58 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.83 ns` | ` 14.49 ns` |
| Some.expect              | `  5.57 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.88 ns` | ` 15.82 ns` |
| Some.unwrapOr            | `  5.92 ns/iter` | `  5.79 ns` | `  5.80 ns` | `  8.18 ns` | ` 16.27 ns` |
| None.unwrapOr            | `  5.56 ns/iter` | `  5.48 ns` | `  5.49 ns` | `  7.76 ns` | ` 14.09 ns` |
| Some.unwrapOrElse        | `  8.32 ns/iter` | `  7.65 ns` | `  7.94 ns` | ` 15.30 ns` | ` 88.30 ns` |
| None.unwrapOrElse        | `  8.53 ns/iter` | `  7.95 ns` | `  8.20 ns` | ` 12.07 ns` | ` 85.64 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 12.37 ns/iter` | ` 10.88 ns` | ` 11.71 ns` | ` 65.07 ns` | ` 86.41 ns` |
| None.map (alloc)      | `  6.52 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  8.75 ns` | ` 35.13 ns` |
| Some.mapOr            | `  5.93 ns/iter` | `  5.79 ns` | `  5.79 ns` | `  8.19 ns` | ` 24.34 ns` |
| None.mapOr            | `  6.52 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  8.73 ns` | ` 32.09 ns` |
| Some.mapOrElse        | ` 11.42 ns/iter` | ` 10.73 ns` | ` 11.04 ns` | ` 19.52 ns` | ` 90.38 ns` |
| None.mapOrElse        | ` 12.55 ns/iter` | ` 11.74 ns` | ` 12.23 ns` | ` 17.74 ns` | `112.83 ns` |
| Some.inspect          | `  7.75 ns/iter` | `  7.05 ns` | `  7.48 ns` | ` 11.34 ns` | `107.28 ns` |
| None.inspect          | `  8.59 ns/iter` | `  7.96 ns` | `  8.30 ns` | ` 11.66 ns` | `105.61 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 11.62 ns/iter` | ` 10.21 ns` | ` 11.14 ns` | ` 23.69 ns` | ` 96.66 ns` |
| None.okOr              | ` 12.27 ns/iter` | ` 11.03 ns` | ` 11.70 ns` | ` 35.21 ns` | ` 83.52 ns` |
| Some.okOrElse          | ` 16.60 ns/iter` | ` 14.63 ns` | ` 15.55 ns` | ` 72.12 ns` | `137.46 ns` |
| None.okOrElse          | ` 17.90 ns/iter` | ` 16.23 ns` | ` 17.07 ns` | ` 74.03 ns` | ` 94.75 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.13 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.32 ns` | ` 31.93 ns` |
| None.and (alloc)           | `  7.13 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.37 ns` | ` 17.27 ns` |
| Some.andThen (alloc)       | ` 20.36 ns/iter` | ` 18.22 ns` | ` 19.51 ns` | ` 78.72 ns` | `106.85 ns` |
| None.andThen (alloc)       | `  6.82 ns/iter` | `  6.72 ns` | `  6.72 ns` | `  8.98 ns` | ` 35.39 ns` |
| Some.filter (true, reuse)  | `  7.71 ns/iter` | `  7.06 ns` | `  7.37 ns` | ` 12.41 ns` | ` 92.01 ns` |
| Some.filter (false, alloc) | ` 11.78 ns/iter` | `  9.81 ns` | ` 10.83 ns` | ` 63.91 ns` | `117.55 ns` |
| None.filter (alloc)        | `  6.81 ns/iter` | `  6.72 ns` | `  6.72 ns` | `  9.01 ns` | ` 37.40 ns` |
| Some.or (reuse)            | `  7.14 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.41 ns` | ` 29.42 ns` |
| None.or (reuse/optb)       | `  7.12 ns/iter` | `  7.02 ns` | `  7.03 ns` | `  9.32 ns` | ` 23.92 ns` |
| Some.orElse (reuse)        | `  6.51 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  8.73 ns` | ` 32.25 ns` |
| None.orElse (alloc)        | ` 10.30 ns/iter` | `  9.55 ns` | `  9.92 ns` | ` 16.47 ns` | ` 84.97 ns` |
| Some xor None (reuse)      | `  9.35 ns/iter` | `  9.18 ns` | `  9.19 ns` | ` 11.92 ns` | ` 36.09 ns` |
| None xor Some (reuse/optb) | `  9.95 ns/iter` | `  9.80 ns` | `  9.81 ns` | ` 12.20 ns` | ` 31.76 ns` |
| Some xor Some (alloc)      | ` 13.78 ns/iter` | ` 12.63 ns` | ` 13.31 ns` | ` 21.85 ns` | `101.63 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | `  4.87 ns/iter` | `  4.79 ns` | `  4.79 ns` | `  7.03 ns` | ` 71.70 ns` |
| None.insert                     | `  5.40 ns/iter` | `  5.32 ns` | `  5.33 ns` | `  7.54 ns` | ` 40.64 ns` |
| Some.getOrInsert (existing)     | `  5.34 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  7.39 ns` | ` 66.45 ns` |
| None.getOrInsert (insert)       | ` 13.74 ns/iter` | ` 12.10 ns` | ` 13.10 ns` | ` 65.35 ns` | ` 93.28 ns` |
| Some.getOrInsertWith (existing) | ` 19.06 ns/iter` | ` 16.97 ns` | ` 18.17 ns` | ` 81.33 ns` | `102.84 ns` |
| None.getOrInsertWith (insert)   | ` 20.22 ns/iter` | ` 18.05 ns` | ` 19.36 ns` | ` 82.03 ns` | `113.48 ns` |
| Some.take                       | ` 22.97 ns/iter` | ` 19.99 ns` | ` 21.73 ns` | ` 87.00 ns` | `107.91 ns` |
| None.take                       | ` 18.00 ns/iter` | ` 15.84 ns` | ` 17.31 ns` | ` 76.80 ns` | ` 91.30 ns` |
| Some.takeIf (true)              | ` 26.19 ns/iter` | ` 23.11 ns` | ` 24.67 ns` | ` 90.37 ns` | `102.24 ns` |
| Some.takeIf (false)             | ` 23.52 ns/iter` | ` 20.50 ns` | ` 22.25 ns` | ` 88.38 ns` | `119.40 ns` |
| Some.replace                    | ` 25.98 ns/iter` | ` 22.80 ns` | ` 24.40 ns` | ` 88.57 ns` | `107.29 ns` |
| None.replace                    | ` 21.76 ns/iter` | ` 19.31 ns` | ` 20.74 ns` | ` 83.90 ns` | ` 97.80 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  8.40 ns/iter` | `  8.26 ns` | `  8.27 ns` | ` 11.09 ns` | ` 22.36 ns` |
| Some(Ok).transpose                             | ` 41.90 ns/iter` | ` 36.39 ns` | ` 39.57 ns` | `114.28 ns` | `148.63 ns` |
| Some(Err).transpose                            | ` 34.16 ns/iter` | ` 30.00 ns` | ` 32.45 ns` | `103.49 ns` | `140.18 ns` |
| None.transpose                                 | ` 24.15 ns/iter` | ` 20.90 ns` | ` 22.74 ns` | ` 87.83 ns` | `102.43 ns` |
| Some.unzip                                     | ` 36.43 ns/iter` | ` 31.36 ns` | ` 34.18 ns` | `102.53 ns` | `117.33 ns` |
| None.unzip                                     | ` 26.35 ns/iter` | ` 22.65 ns` | ` 25.03 ns` | ` 89.48 ns` | `101.27 ns` |
| Some.match                                     | ` 14.48 ns/iter` | ` 13.34 ns` | ` 13.95 ns` | ` 26.89 ns` | ` 89.12 ns` |
| None.match                                     | ` 16.18 ns/iter` | ` 14.61 ns` | ` 15.30 ns` | ` 42.16 ns` | `151.87 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 14.67 ns/iter` | ` 12.84 ns` | ` 14.13 ns` | ` 54.62 ns` | ` 93.55 ns` |
| None.iter       | `  6.62 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  8.75 ns` | ` 37.15 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `153.80 ns/iter` | `146.93 ns` | `151.24 ns` | `226.23 ns` | `279.96 ns` |
| AsyncResult.unwrap (Err path)    | `152.59 ns/iter` | `144.54 ns` | `149.56 ns` | `286.12 ns` | `302.90 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `119.55 ns/iter` | `113.36 ns` | `117.52 ns` | `199.82 ns` | `253.61 ns` |
| Result.mapOrElseAsync (Err path)    | `123.60 ns/iter` | `117.31 ns` | `121.76 ns` | `194.08 ns` | `259.97 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `126.94 ns/iter` | `121.85 ns` | `126.29 ns` | `196.71 ns` | `210.10 ns` |
| Result.unwrapOrElseAsync (Err path) | `119.08 ns/iter` | `114.23 ns` | `118.20 ns` | `188.07 ns` | `240.02 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `473.45 ns/iter` | `459.46 ns` | `466.46 ns` | `550.60 ns` | `814.22 ns` |
| Err.mapAsync (alloc AsyncResult)        | `277.91 ns/iter` | `268.56 ns` | `275.17 ns` | `354.70 ns` | `449.37 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `285.02 ns/iter` | `275.22 ns` | `282.05 ns` | `361.91 ns` | `482.90 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `467.85 ns/iter` | `453.42 ns` | `463.91 ns` | `549.40 ns` | `559.30 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `487.16 ns/iter` | `469.59 ns` | `482.70 ns` | `575.66 ns` | `602.11 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `262.81 ns/iter` | `255.99 ns` | `258.94 ns` | `337.53 ns` | `374.96 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `269.96 ns/iter` | `262.49 ns` | `266.35 ns` | `340.65 ns` | `380.01 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `478.28 ns/iter` | `464.33 ns` | `474.31 ns` | `549.60 ns` | `564.21 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `421.51 ns/iter` | `410.67 ns` | `416.71 ns` | `497.04 ns` | `545.24 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `274.82 ns/iter` | `266.27 ns` | `270.72 ns` | `350.89 ns` | `452.97 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `274.12 ns/iter` | `265.54 ns` | `270.65 ns` | `352.82 ns` | `480.44 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `422.07 ns/iter` | `409.53 ns` | `418.66 ns` | `505.10 ns` | `522.76 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `259.92 ns/iter` | `248.88 ns` | `256.42 ns` | `377.65 ns` | `397.64 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `535.53 ns/iter` | `519.94 ns` | `530.77 ns` | `629.50 ns` | `635.54 ns` |
| catchUnwindAsync (call only, Ok)       | `533.84 ns/iter` | `519.04 ns` | `529.19 ns` | `626.74 ns` | `665.91 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.05 µs/iter` | `963.38 ns` | `  1.04 µs` | `  1.42 µs` | `  1.60 µs` |
| catchUnwindAsync (call only, reject)   | `  1.04 µs/iter` | `973.78 ns` | `  1.04 µs` | `  1.14 µs` | `  1.38 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `157.75 ns/iter` | `151.59 ns` | `156.66 ns` | `227.84 ns` | `249.67 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.21 µs/iter` | `  1.09 µs` | `  1.15 µs` | `  1.74 µs` | `  1.79 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `135.40 ns/iter` | `128.10 ns` | `133.27 ns` | `208.84 ns` | `247.89 ns` |
| Option.mapOrElseAsync (None path)    | `132.91 ns/iter` | `127.10 ns` | `131.29 ns` | `206.42 ns` | `229.55 ns` |
| Option.unwrapOrElseAsync (Some path) | `136.76 ns/iter` | `130.13 ns` | `134.97 ns` | `208.97 ns` | `238.57 ns` |
| Option.unwrapOrElseAsync (None path) | `131.05 ns/iter` | `124.84 ns` | `129.70 ns` | `202.78 ns` | `213.90 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `464.29 ns/iter` | `450.14 ns` | `457.81 ns` | `543.83 ns` | `600.88 ns` |
| None.mapAsync (alloc AsyncOption)         | `275.54 ns/iter` | `265.50 ns` | `272.98 ns` | `354.89 ns` | `369.51 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `473.12 ns/iter` | `457.60 ns` | `470.03 ns` | `552.56 ns` | `679.75 ns` |
| None.inspectAsync (alloc AsyncOption)     | `269.34 ns/iter` | `260.61 ns` | `267.11 ns` | `354.18 ns` | `359.64 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `436.49 ns/iter` | `420.83 ns` | `431.22 ns` | `528.90 ns` | `541.54 ns` |
| None.andThenAsync (alloc AsyncOption)     | `273.21 ns/iter` | `264.20 ns` | `269.77 ns` | `355.79 ns` | `377.71 ns` |
| Some.filterAsync true (alloc AsyncOption) | `458.59 ns/iter` | `446.25 ns` | `454.98 ns` | `538.73 ns` | `555.98 ns` |
| None.filterAsync (alloc AsyncOption)      | `270.08 ns/iter` | `261.41 ns` | `266.70 ns` | `349.75 ns` | `475.20 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `269.14 ns/iter` | `261.73 ns` | `266.50 ns` | `345.99 ns` | `393.23 ns` |
| None.orElseAsync (alloc AsyncOption)      | `417.49 ns/iter` | `402.92 ns` | `411.20 ns` | `507.94 ns` | `657.22 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `271.46 ns/iter` | `263.94 ns` | `267.90 ns` | `344.69 ns` | `357.46 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `452.32 ns/iter` | `440.51 ns` | `448.40 ns` | `527.08 ns` | `542.06 ns` |
| Some.getOrInsertWithAsync (existing)      | `137.21 ns/iter` | `130.87 ns` | `135.28 ns` | `211.71 ns` | `267.72 ns` |
| None.getOrInsertWithAsync (insert)        | `449.48 ns/iter` | `434.38 ns` | `443.67 ns` | `526.62 ns` | `566.44 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `249.38 ns/iter` | `243.95 ns` | `247.14 ns` | `323.72 ns` | `331.88 ns` |
