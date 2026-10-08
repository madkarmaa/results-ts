# Benchmarks

clk: ~3.54 GHz
cpu: AMD EPYC 9V74 80-Core Processor
runtime: bun 1.4.2 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  7.75 ns/iter` | `  5.60 ns` | `  7.35 ns` | ` 49.98 ns` | ` 90.18 ns` |
| Err(1)         | `  7.44 ns/iter` | `  5.41 ns` | `  7.02 ns` | ` 48.32 ns` | `209.37 ns` |
| Some(1)        | `  9.64 ns/iter` | `  6.77 ns` | ` 10.24 ns` | ` 51.79 ns` | ` 84.72 ns` |
| None()         | `  6.88 ns/iter` | `  3.83 ns` | `  7.63 ns` | ` 14.78 ns` | ` 69.40 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  4.38 ns/iter` | `  1.50 ns` | `  6.04 ns` | `  7.69 ns` | ` 15.09 ns` |
| Err.isOk()          | `  6.99 ns/iter` | `  6.72 ns` | `  7.27 ns` | `  9.13 ns` | ` 19.27 ns` |
| Ok.isErr()          | `  7.40 ns/iter` | `  7.06 ns` | `  7.64 ns` | `  9.28 ns` | ` 16.83 ns` |
| Err.isErr()         | `  7.91 ns/iter` | `  7.60 ns` | `  7.71 ns` | ` 10.00 ns` | ` 18.81 ns` |
| Ok.isOkAnd (true)   | `  4.43 ns/iter` | `  3.73 ns` | `  5.32 ns` | `  6.81 ns` | ` 18.83 ns` |
| Err.isOkAnd         | `  3.79 ns/iter` | `  2.24 ns` | `  5.83 ns` | `  7.70 ns` | ` 21.85 ns` |
| Ok.isErrAnd         | `  4.04 ns/iter` | `  3.47 ns` | `  4.03 ns` | `  5.59 ns` | ` 11.57 ns` |
| Err.isErrAnd (true) | `  3.88 ns/iter` | `  3.73 ns` | `  3.81 ns` | `  5.60 ns` | ` 15.93 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 11.94 ns/iter` | `  9.10 ns` | ` 11.49 ns` | ` 57.67 ns` | ` 76.32 ns` |
| Err.ok()               | `  9.23 ns/iter` | `  7.85 ns` | `  9.00 ns` | ` 17.00 ns` | ` 86.82 ns` |
| Ok.err()               | `  7.37 ns/iter` | `  6.16 ns` | `  7.07 ns` | ` 12.19 ns` | ` 81.19 ns` |
| Err.err()              | ` 11.58 ns/iter` | `  8.86 ns` | ` 11.13 ns` | ` 57.63 ns` | ` 76.96 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 12.49 ns/iter` | ` 10.75 ns` | ` 12.06 ns` | ` 22.54 ns` | ` 86.15 ns` |
| Err.map (reuse)       | `  8.48 ns/iter` | `  8.20 ns` | `  8.48 ns` | ` 10.30 ns` | ` 19.89 ns` |
| Ok.mapOr              | `  6.05 ns/iter` | `  5.97 ns` | `  5.98 ns` | `  7.67 ns` | ` 21.90 ns` |
| Err.mapOr             | `  5.37 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  6.97 ns` | ` 24.24 ns` |
| Ok.mapOrElse          | `  9.39 ns/iter` | `  8.40 ns` | `  9.13 ns` | ` 15.54 ns` | ` 83.68 ns` |
| Err.mapOrElse         | ` 10.05 ns/iter` | `  9.34 ns` | `  9.80 ns` | ` 16.03 ns` | ` 78.99 ns` |
| Ok.mapErr (reuse)     | `  6.73 ns/iter` | `  6.65 ns` | `  6.67 ns` | `  8.40 ns` | ` 15.41 ns` |
| Err.mapErr (alloc)    | ` 12.29 ns/iter` | ` 10.26 ns` | ` 11.81 ns` | ` 28.62 ns` | ` 82.32 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  6.20 ns/iter` | `  5.52 ns` | `  6.08 ns` | `  9.62 ns` | ` 75.01 ns` |
| Err.inspect               | `  6.99 ns/iter` | `  6.36 ns` | `  6.85 ns` | ` 10.31 ns` | ` 81.27 ns` |
| Ok.inspectErr             | `  4.60 ns/iter` | `  4.54 ns` | `  4.55 ns` | `  6.18 ns` | ` 18.49 ns` |
| Err.inspectErr            | `  6.28 ns/iter` | `  5.53 ns` | `  6.15 ns` | `  8.98 ns` | ` 79.29 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  4.27 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  5.93 ns` | ` 15.78 ns` |
| Err.unwrapErr            | `  4.26 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  5.82 ns` | ` 18.60 ns` |
| Ok.expect                | `  4.27 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  5.85 ns` | ` 13.42 ns` |
| Err.expectErr            | `  7.11 ns/iter` | `  6.95 ns` | `  7.06 ns` | `  8.79 ns` | ` 16.57 ns` |
| Ok.unwrapOr              | `  4.28 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  5.81 ns` | ` 12.10 ns` |
| Err.unwrapOr             | `  4.54 ns/iter` | `  4.47 ns` | `  4.49 ns` | `  6.15 ns` | ` 11.00 ns` |
| Ok.unwrapOrElse          | `  4.29 ns/iter` | `  4.20 ns` | `  4.24 ns` | `  5.91 ns` | ` 16.54 ns` |
| Err.unwrapOrElse         | `  7.14 ns/iter` | `  6.35 ns` | `  6.98 ns` | ` 12.47 ns` | ` 82.17 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.97 ns/iter` | `  8.81 ns` | `  8.89 ns` | ` 10.82 ns` | ` 19.12 ns` |
| Err.and (reuse)        | `  5.90 ns/iter` | `  5.83 ns` | `  5.85 ns` | `  7.51 ns` | ` 13.77 ns` |
| Ok.andThen (alloc)     | ` 16.13 ns/iter` | ` 13.33 ns` | ` 15.56 ns` | ` 68.92 ns` | ` 91.74 ns` |
| Err.andThen (alloc)    | `  5.36 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  6.95 ns` | ` 21.88 ns` |
| Ok.or (reuse)          | `  8.70 ns/iter` | `  8.54 ns` | `  8.60 ns` | ` 10.95 ns` | ` 25.12 ns` |
| Err.or (reuse)         | `  5.91 ns/iter` | `  5.83 ns` | `  5.85 ns` | `  7.55 ns` | ` 16.61 ns` |
| Ok.orElse (alloc)      | `  4.72 ns/iter` | `  4.54 ns` | `  4.55 ns` | `  9.08 ns` | ` 24.07 ns` |
| Err.orElse (alloc)     | `  6.12 ns/iter` | `  5.34 ns` | `  6.01 ns` | `  8.96 ns` | ` 90.98 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  7.81 ns/iter` | `  7.61 ns` | `  7.72 ns` | ` 10.76 ns` | ` 19.93 ns` |
| Ok(Some).transpose                     | ` 39.76 ns/iter` | ` 31.31 ns` | ` 38.52 ns` | ` 97.96 ns` | `115.18 ns` |
| Ok(None).transpose                     | ` 25.34 ns/iter` | ` 21.45 ns` | ` 24.29 ns` | ` 80.61 ns` | ` 99.90 ns` |
| Err.transpose                          | ` 27.80 ns/iter` | ` 22.98 ns` | ` 26.71 ns` | ` 85.03 ns` | `103.22 ns` |
| Ok.match                               | ` 10.12 ns/iter` | `  9.08 ns` | `  9.95 ns` | ` 13.56 ns` | ` 90.70 ns` |
| Err.match                              | ` 10.69 ns/iter` | `  9.89 ns` | ` 10.47 ns` | ` 15.05 ns` | ` 98.55 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 13.04 ns/iter` | ` 10.35 ns` | ` 13.74 ns` | ` 64.32 ns` | ` 98.96 ns` |
| Err.iter        | `  5.09 ns/iter` | `  5.02 ns` | `  5.03 ns` | `  6.70 ns` | ` 21.96 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 19.28 ns/iter` | ` 14.76 ns` | ` 18.46 ns` | ` 75.31 ns` | `101.93 ns` |
| catchUnwind (call only, Ok)    | ` 12.21 ns/iter` | ` 10.24 ns` | ` 11.78 ns` | ` 19.12 ns` | ` 87.61 ns` |
| catchUnwind (wrap + call, Err) | `826.39 ns/iter` | `782.35 ns` | `814.32 ns` | `  1.19 µs` | `  1.23 µs` |
| catchUnwind (call only, catch) | `789.90 ns/iter` | `693.08 ns` | `793.23 ns` | `889.67 ns` | `901.22 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  4.61 ns/iter` | `  4.54 ns` | `  4.58 ns` | `  6.17 ns` | ` 10.56 ns` |
| None.isSome()         | `  4.62 ns/iter` | `  4.54 ns` | `  4.57 ns` | `  6.22 ns` | ` 11.13 ns` |
| Some.isNone()         | `  4.62 ns/iter` | `  4.54 ns` | `  4.58 ns` | `  6.23 ns` | ` 11.61 ns` |
| None.isNone()         | `  4.61 ns/iter` | `  4.54 ns` | `  4.58 ns` | `  6.17 ns` | `  9.97 ns` |
| Some.isSomeAnd (true) | `  4.81 ns/iter` | `  4.74 ns` | `  4.76 ns` | `  6.42 ns` | ` 18.72 ns` |
| None.isSomeAnd        | `  5.35 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  6.90 ns` | ` 23.93 ns` |
| Some.isNoneOr (true)  | `  4.67 ns/iter` | `  4.61 ns` | `  4.63 ns` | `  6.21 ns` | ` 14.35 ns` |
| None.isNoneOr         | `  5.42 ns/iter` | `  5.35 ns` | `  5.37 ns` | `  7.02 ns` | ` 20.90 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  4.27 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  5.84 ns` | ` 11.67 ns` |
| Some.expect              | `  4.27 ns/iter` | `  4.20 ns` | `  4.22 ns` | `  6.11 ns` | ` 13.71 ns` |
| Some.unwrapOr            | `  4.53 ns/iter` | `  4.47 ns` | `  4.49 ns` | `  6.11 ns` | ` 10.66 ns` |
| None.unwrapOr            | `  4.53 ns/iter` | `  4.47 ns` | `  4.49 ns` | `  6.17 ns` | ` 16.20 ns` |
| Some.unwrapOrElse        | `  6.86 ns/iter` | `  5.92 ns` | `  6.78 ns` | `  9.45 ns` | ` 95.42 ns` |
| None.unwrapOrElse        | `  7.02 ns/iter` | `  6.23 ns` | `  6.91 ns` | `  9.78 ns` | ` 94.48 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 11.80 ns/iter` | `  9.68 ns` | ` 11.47 ns` | ` 30.58 ns` | ` 96.73 ns` |
| None.map (alloc)      | `  5.36 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  7.00 ns` | ` 21.38 ns` |
| Some.mapOr            | `  4.54 ns/iter` | `  4.47 ns` | `  4.49 ns` | `  6.10 ns` | ` 18.80 ns` |
| None.mapOr            | `  5.09 ns/iter` | `  5.01 ns` | `  5.03 ns` | `  6.71 ns` | ` 28.24 ns` |
| Some.mapOrElse        | `  9.46 ns/iter` | `  8.59 ns` | `  9.27 ns` | ` 16.39 ns` | ` 92.02 ns` |
| None.mapOrElse        | ` 10.18 ns/iter` | `  9.21 ns` | `  9.99 ns` | ` 15.03 ns` | `103.78 ns` |
| Some.inspect          | `  6.38 ns/iter` | `  5.54 ns` | `  6.33 ns` | `  9.68 ns` | ` 93.94 ns` |
| None.inspect          | `  7.23 ns/iter` | `  6.44 ns` | `  7.12 ns` | `  9.51 ns` | ` 95.55 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 10.89 ns/iter` | `  8.78 ns` | ` 10.71 ns` | ` 15.56 ns` | `102.64 ns` |
| None.okOr              | ` 11.47 ns/iter` | `  8.86 ns` | ` 11.14 ns` | ` 17.22 ns` | `103.83 ns` |
| Some.okOrElse          | ` 14.41 ns/iter` | ` 12.44 ns` | ` 13.91 ns` | ` 70.38 ns` | ` 98.03 ns` |
| None.okOrElse          | ` 15.93 ns/iter` | ` 12.66 ns` | ` 15.58 ns` | ` 70.42 ns` | `103.03 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.95 ns/iter` | `  8.81 ns` | `  8.88 ns` | ` 10.73 ns` | ` 27.14 ns` |
| None.and (alloc)           | `  5.91 ns/iter` | `  5.83 ns` | `  5.85 ns` | `  7.56 ns` | ` 14.21 ns` |
| Some.andThen (alloc)       | ` 18.09 ns/iter` | ` 14.48 ns` | ` 17.63 ns` | ` 75.72 ns` | `116.56 ns` |
| None.andThen (alloc)       | `  5.37 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  7.06 ns` | ` 27.05 ns` |
| Some.filter (true, reuse)  | `  6.60 ns/iter` | `  5.55 ns` | `  6.52 ns` | `  9.46 ns` | ` 95.62 ns` |
| Some.filter (false, alloc) | ` 12.23 ns/iter` | `  9.71 ns` | ` 11.97 ns` | ` 19.60 ns` | ` 99.36 ns` |
| None.filter (alloc)        | `  5.38 ns/iter` | `  5.29 ns` | `  5.30 ns` | `  7.09 ns` | ` 19.74 ns` |
| Some.or (reuse)            | `  8.95 ns/iter` | `  8.81 ns` | `  8.89 ns` | ` 10.71 ns` | ` 18.51 ns` |
| None.or (reuse/optb)       | `  5.91 ns/iter` | `  5.83 ns` | `  5.85 ns` | `  7.54 ns` | ` 13.14 ns` |
| Some.orElse (reuse)        | `  4.94 ns/iter` | `  4.88 ns` | `  4.89 ns` | `  6.55 ns` | ` 17.16 ns` |
| None.orElse (alloc)        | `  9.07 ns/iter` | `  8.10 ns` | `  9.00 ns` | ` 11.84 ns` | ` 93.71 ns` |
| Some xor None (reuse)      | ` 10.56 ns/iter` | ` 10.25 ns` | ` 10.49 ns` | ` 12.45 ns` | ` 20.46 ns` |
| None xor Some (reuse/optb) | `  7.89 ns/iter` | `  7.60 ns` | `  7.85 ns` | `  9.56 ns` | ` 15.35 ns` |
| Some xor Some (alloc)      | ` 15.32 ns/iter` | ` 13.40 ns` | ` 15.08 ns` | ` 24.03 ns` | `104.63 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | `  4.24 ns/iter` | `  3.80 ns` | `  4.20 ns` | `  5.78 ns` | ` 53.83 ns` |
| None.insert                     | `  3.76 ns/iter` | `  3.66 ns` | `  3.68 ns` | `  5.28 ns` | ` 43.20 ns` |
| Some.getOrInsert (existing)     | `  4.04 ns/iter` | `  3.93 ns` | `  3.95 ns` | `  5.61 ns` | ` 42.61 ns` |
| None.getOrInsert (insert)       | ` 13.70 ns/iter` | `  9.98 ns` | ` 12.95 ns` | ` 45.25 ns` | `100.25 ns` |
| Some.getOrInsertWith (existing) | ` 17.69 ns/iter` | ` 13.44 ns` | ` 17.26 ns` | ` 76.02 ns` | `119.09 ns` |
| None.getOrInsertWith (insert)   | ` 18.57 ns/iter` | ` 14.59 ns` | ` 18.14 ns` | ` 78.09 ns` | `106.47 ns` |
| Some.take                       | ` 23.55 ns/iter` | ` 19.34 ns` | ` 23.24 ns` | ` 85.84 ns` | `106.99 ns` |
| None.take                       | ` 16.75 ns/iter` | ` 13.13 ns` | ` 17.56 ns` | ` 73.33 ns` | `100.80 ns` |
| Some.takeIf (true)              | ` 27.61 ns/iter` | ` 19.80 ns` | ` 26.80 ns` | ` 93.83 ns` | `107.67 ns` |
| Some.takeIf (false)             | ` 23.44 ns/iter` | ` 19.82 ns` | ` 22.88 ns` | ` 83.43 ns` | `104.48 ns` |
| Some.replace                    | ` 26.70 ns/iter` | ` 22.37 ns` | ` 26.01 ns` | ` 86.68 ns` | `104.60 ns` |
| None.replace                    | ` 20.61 ns/iter` | ` 16.05 ns` | ` 20.86 ns` | ` 80.80 ns` | `111.61 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  6.65 ns/iter` | `  6.46 ns` | `  6.58 ns` | `  8.41 ns` | ` 19.77 ns` |
| Some(Ok).transpose                             | ` 40.43 ns/iter` | ` 33.33 ns` | ` 39.09 ns` | `104.90 ns` | `116.19 ns` |
| Some(Err).transpose                            | ` 32.85 ns/iter` | ` 28.54 ns` | ` 31.84 ns` | ` 95.34 ns` | `110.71 ns` |
| None.transpose                                 | ` 24.29 ns/iter` | ` 18.13 ns` | ` 23.77 ns` | ` 85.38 ns` | `108.05 ns` |
| Some.unzip                                     | ` 39.40 ns/iter` | ` 27.75 ns` | ` 38.41 ns` | `104.59 ns` | `117.72 ns` |
| None.unzip                                     | ` 27.36 ns/iter` | ` 21.35 ns` | ` 27.89 ns` | ` 88.23 ns` | ` 99.34 ns` |
| Some.match                                     | ` 12.26 ns/iter` | ` 10.96 ns` | ` 11.96 ns` | ` 17.05 ns` | ` 89.03 ns` |
| None.match                                     | ` 13.37 ns/iter` | ` 11.50 ns` | ` 12.73 ns` | ` 32.48 ns` | `109.91 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 14.07 ns/iter` | ` 10.32 ns` | ` 14.52 ns` | ` 26.36 ns` | ` 87.11 ns` |
| None.iter       | `  5.09 ns/iter` | `  5.02 ns` | `  5.03 ns` | `  6.69 ns` | ` 25.59 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `124.33 ns/iter` | `118.39 ns` | `123.49 ns` | `194.92 ns` | `213.58 ns` |
| AsyncResult.unwrap (Err path)    | `124.70 ns/iter` | `117.95 ns` | `123.16 ns` | `197.03 ns` | `260.07 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `101.77 ns/iter` | ` 95.95 ns` | `100.72 ns` | `178.92 ns` | `191.37 ns` |
| Result.mapOrElseAsync (Err path)    | `105.10 ns/iter` | ` 98.78 ns` | `103.81 ns` | `186.96 ns` | `204.44 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `108.47 ns/iter` | `102.77 ns` | `107.56 ns` | `191.58 ns` | `201.03 ns` |
| Result.unwrapOrElseAsync (Err path) | `108.97 ns/iter` | `103.37 ns` | `108.21 ns` | `186.50 ns` | `197.01 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `381.16 ns/iter` | `365.29 ns` | `378.38 ns` | `470.00 ns` | `475.71 ns` |
| Err.mapAsync (alloc AsyncResult)        | `223.69 ns/iter` | `212.22 ns` | `220.45 ns` | `313.88 ns` | `359.34 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `218.78 ns/iter` | `209.06 ns` | `215.02 ns` | `310.23 ns` | `325.26 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `378.89 ns/iter` | `365.06 ns` | `374.40 ns` | `469.08 ns` | `488.36 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `384.10 ns/iter` | `372.29 ns` | `379.04 ns` | `476.32 ns` | `508.93 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `213.15 ns/iter` | `204.88 ns` | `210.53 ns` | `300.43 ns` | `321.52 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `209.37 ns/iter` | `200.69 ns` | `206.74 ns` | `297.67 ns` | `305.17 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `380.35 ns/iter` | `368.47 ns` | `376.98 ns` | `462.21 ns` | `472.49 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `335.17 ns/iter` | `324.00 ns` | `331.12 ns` | `415.61 ns` | `509.53 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `222.97 ns/iter` | `204.87 ns` | `214.41 ns` | `392.26 ns` | `458.69 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `216.39 ns/iter` | `207.12 ns` | `214.34 ns` | `301.42 ns` | `319.13 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `340.67 ns/iter` | `322.74 ns` | `337.09 ns` | `429.78 ns` | `450.16 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `197.70 ns/iter` | `191.18 ns` | `196.43 ns` | `270.65 ns` | `284.73 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `439.21 ns/iter` | `406.50 ns` | `423.89 ns` | `751.80 ns` | `778.93 ns` |
| catchUnwindAsync (call only, Ok)       | `409.17 ns/iter` | `389.14 ns` | `405.59 ns` | `503.18 ns` | `699.80 ns` |
| catchUnwindAsync (wrap + call, reject) | `879.02 ns/iter` | `814.48 ns` | `870.88 ns` | `  1.33 µs` | `  1.53 µs` |
| catchUnwindAsync (call only, reject)   | `842.87 ns/iter` | `775.36 ns` | `851.13 ns` | `969.25 ns` | `  1.02 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `130.91 ns/iter` | `124.30 ns` | `129.35 ns` | `216.59 ns` | `277.45 ns` |
| AsyncOption.unwrap (None path -> Err) | `995.14 ns/iter` | `892.56 ns` | `923.16 ns` | `  1.57 µs` | `  1.58 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `118.24 ns/iter` | `111.77 ns` | `117.10 ns` | `190.07 ns` | `199.54 ns` |
| Option.mapOrElseAsync (None path)    | `114.65 ns/iter` | `106.17 ns` | `113.00 ns` | `189.72 ns` | `237.83 ns` |
| Option.unwrapOrElseAsync (Some path) | `121.02 ns/iter` | `110.25 ns` | `116.32 ns` | `217.55 ns` | `323.37 ns` |
| Option.unwrapOrElseAsync (None path) | `109.39 ns/iter` | `102.34 ns` | `108.31 ns` | `181.98 ns` | `204.95 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `376.90 ns/iter` | `363.13 ns` | `372.86 ns` | `460.69 ns` | `621.22 ns` |
| None.mapAsync (alloc AsyncOption)         | `215.82 ns/iter` | `205.35 ns` | `213.26 ns` | `311.75 ns` | `346.13 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `386.18 ns/iter` | `369.33 ns` | `380.02 ns` | `477.49 ns` | `634.81 ns` |
| None.inspectAsync (alloc AsyncOption)     | `208.23 ns/iter` | `200.24 ns` | `206.39 ns` | `281.63 ns` | `298.02 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `340.71 ns/iter` | `324.91 ns` | `337.69 ns` | `430.07 ns` | `528.18 ns` |
| None.andThenAsync (alloc AsyncOption)     | `217.07 ns/iter` | `206.71 ns` | `214.01 ns` | `306.99 ns` | `315.35 ns` |
| Some.filterAsync true (alloc AsyncOption) | `369.90 ns/iter` | `355.89 ns` | `366.25 ns` | `463.96 ns` | `496.37 ns` |
| None.filterAsync (alloc AsyncOption)      | `214.65 ns/iter` | `205.64 ns` | `212.71 ns` | `296.54 ns` | `306.56 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `208.66 ns/iter` | `199.76 ns` | `206.75 ns` | `295.14 ns` | `312.05 ns` |
| None.orElseAsync (alloc AsyncOption)      | `332.91 ns/iter` | `319.39 ns` | `328.35 ns` | `430.15 ns` | `553.65 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `219.83 ns/iter` | `209.15 ns` | `216.17 ns` | `314.05 ns` | `377.95 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `363.44 ns/iter` | `350.00 ns` | `359.96 ns` | `454.42 ns` | `459.29 ns` |
| Some.getOrInsertWithAsync (existing)      | `118.97 ns/iter` | `112.11 ns` | `117.42 ns` | `205.32 ns` | `236.59 ns` |
| None.getOrInsertWithAsync (insert)        | `370.35 ns/iter` | `353.51 ns` | `365.84 ns` | `460.01 ns` | `524.37 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `196.97 ns/iter` | `190.12 ns` | `194.78 ns` | `291.20 ns` | `300.14 ns` |

| • Option - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.and some sync + sync          | `  5.86 ns/iter` | `  5.76 ns` | `  5.77 ns` | `  7.58 ns` | ` 16.17 ns` |
| Option.and some sync + async         | `284.76 ns/iter` | `267.86 ns` | `276.37 ns` | `500.39 ns` | `582.85 ns` |
| Option.and some async + sync         | `256.27 ns/iter` | `245.11 ns` | `250.03 ns` | `400.47 ns` | `452.11 ns` |
| Option.and some async + async        | `400.35 ns/iter` | `383.58 ns` | `395.21 ns` | `499.29 ns` | `737.82 ns` |
| Option.or some sync + sync           | `  6.56 ns/iter` | `  5.51 ns` | `  6.42 ns` | ` 12.02 ns` | ` 17.34 ns` |
| Option.or some sync + async          | `274.92 ns/iter` | `262.60 ns` | `270.76 ns` | `361.32 ns` | `455.07 ns` |
| Option.or some async + sync          | `249.11 ns/iter` | `238.57 ns` | `245.04 ns` | `345.56 ns` | `481.97 ns` |
| Option.or some async + async         | `408.00 ns/iter` | `388.91 ns` | `417.15 ns` | `503.59 ns` | `524.67 ns` |
| Option.xor some sync + sync          | ` 15.61 ns/iter` | ` 12.23 ns` | ` 15.23 ns` | ` 25.44 ns` | `113.18 ns` |
| Option.xor some sync + async         | `286.07 ns/iter` | `270.23 ns` | `282.36 ns` | `381.12 ns` | `529.02 ns` |
| Option.xor some async + sync         | `264.23 ns/iter` | `252.74 ns` | `261.02 ns` | `359.51 ns` | `430.47 ns` |
| Option.xor some async + async        | `419.92 ns/iter` | `397.73 ns` | `413.15 ns` | `585.86 ns` | `774.57 ns` |
| Option.zip some sync + sync          | ` 20.42 ns/iter` | ` 17.87 ns` | ` 19.71 ns` | ` 86.72 ns` | `115.80 ns` |
| Option.zip some sync + async         | `305.99 ns/iter` | `289.69 ns` | `300.12 ns` | `410.24 ns` | `606.05 ns` |
| Option.zip some async + sync         | `282.16 ns/iter` | `267.04 ns` | `275.78 ns` | `482.83 ns` | `606.37 ns` |
| Option.zip some async + async        | `427.05 ns/iter` | `402.26 ns` | `432.23 ns` | `539.73 ns` | `601.85 ns` |
| Option.and none sync + sync          | `  5.90 ns/iter` | `  5.77 ns` | `  5.78 ns` | `  8.04 ns` | ` 19.69 ns` |
| Option.and none sync + async         | `295.57 ns/iter` | `262.02 ns` | `275.38 ns` | `627.95 ns` | `726.85 ns` |
| Option.and none async + sync         | `256.46 ns/iter` | `242.13 ns` | `250.02 ns` | `442.81 ns` | `514.56 ns` |
| Option.and none async + async        | `407.58 ns/iter` | `386.33 ns` | `412.34 ns` | `517.51 ns` | `557.06 ns` |
| Option.or none sync + sync           | `  5.95 ns/iter` | `  5.77 ns` | `  5.78 ns` | ` 13.12 ns` | ` 20.82 ns` |
| Option.or none sync + async          | `278.56 ns/iter` | `263.18 ns` | `273.38 ns` | `375.37 ns` | `505.49 ns` |
| Option.or none async + sync          | `253.58 ns/iter` | `242.39 ns` | `248.43 ns` | `362.22 ns` | `523.77 ns` |
| Option.or none async + async         | `409.07 ns/iter` | `378.74 ns` | `431.11 ns` | `573.09 ns` | `797.36 ns` |
| Option.xor none sync + sync          | `  8.12 ns/iter` | `  7.87 ns` | `  8.00 ns` | ` 10.58 ns` | ` 20.01 ns` |
| Option.xor none sync + async         | `285.24 ns/iter` | `270.62 ns` | `282.58 ns` | `384.71 ns` | `509.36 ns` |
| Option.xor none async + sync         | `259.34 ns/iter` | `247.25 ns` | `255.53 ns` | `362.01 ns` | `486.03 ns` |
| Option.xor none async + async        | `420.46 ns/iter` | `385.34 ns` | `431.71 ns` | `762.60 ns` | `857.69 ns` |
| Option.zip none sync + sync          | ` 12.25 ns/iter` | ` 10.20 ns` | ` 11.93 ns` | ` 25.18 ns` | `106.21 ns` |
| Option.zip none sync + async         | `287.09 ns/iter` | `270.45 ns` | `281.75 ns` | `394.85 ns` | `505.80 ns` |
| Option.zip none async + sync         | `266.26 ns/iter` | `252.82 ns` | `259.92 ns` | `460.62 ns` | `542.10 ns` |
| Option.zip none async + async        | `412.81 ns/iter` | `395.79 ns` | `406.41 ns` | `517.22 ns` | `579.25 ns` |

| • Result - combinator operand matrix | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.and ok sync + sync            | `  5.90 ns/iter` | `  5.76 ns` | `  5.77 ns` | ` 10.09 ns` | ` 16.05 ns` |
| Result.and ok sync + async           | `263.98 ns/iter` | `253.17 ns` | `259.10 ns` | `365.20 ns` | `584.57 ns` |
| Result.and ok async + sync           | `260.60 ns/iter` | `250.71 ns` | `256.42 ns` | `358.56 ns` | `403.51 ns` |
| Result.and ok async + async          | `405.66 ns/iter` | `386.44 ns` | `411.42 ns` | `521.62 ns` | `794.63 ns` |
| Result.or ok sync + sync             | `  6.59 ns/iter` | `  5.51 ns` | `  6.42 ns` | ` 11.32 ns` | ` 18.50 ns` |
| Result.or ok sync + async            | `261.83 ns/iter` | `251.88 ns` | `257.82 ns` | `357.13 ns` | `365.38 ns` |
| Result.or ok async + sync            | `257.24 ns/iter` | `247.12 ns` | `253.04 ns` | `353.02 ns` | `377.85 ns` |
| Result.or ok async + async           | `400.01 ns/iter` | `381.29 ns` | `394.79 ns` | `503.50 ns` | `562.92 ns` |
| Result.and err sync + sync           | `  6.89 ns/iter` | `  6.78 ns` | `  6.85 ns` | `  8.63 ns` | ` 15.81 ns` |
| Result.and err sync + async          | `263.14 ns/iter` | `250.30 ns` | `259.71 ns` | `360.15 ns` | `368.55 ns` |
| Result.and err async + sync          | `254.57 ns/iter` | `245.44 ns` | `250.92 ns` | `344.30 ns` | `499.48 ns` |
| Result.and err async + async         | `414.92 ns/iter` | `394.86 ns` | `420.08 ns` | `513.48 ns` | `534.71 ns` |
| Result.or err sync + sync            | `  6.90 ns/iter` | `  6.78 ns` | `  6.79 ns` | `  9.25 ns` | ` 17.79 ns` |
| Result.or err sync + async           | `264.29 ns/iter` | `251.46 ns` | `259.32 ns` | `366.65 ns` | `468.79 ns` |
| Result.or err async + sync           | `255.58 ns/iter` | `245.63 ns` | `252.36 ns` | `342.98 ns` | `375.04 ns` |
| Result.or err async + async          | `407.48 ns/iter` | `389.73 ns` | `411.35 ns` | `507.31 ns` | `520.27 ns` |
