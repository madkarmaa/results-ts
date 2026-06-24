# Benchmarks

clk: ~3.10 GHz
cpu: AMD EPYC 7763 64-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  5.80 ns/iter` | `  3.91 ns` | `  5.14 ns` | ` 33.73 ns` | `129.08 ns` |
| Err(1)         | `  6.38 ns/iter` | `  4.11 ns` | `  5.75 ns` | ` 15.01 ns` | `114.49 ns` |
| Some(1)        | ` 11.44 ns/iter` | `  8.65 ns` | ` 11.14 ns` | ` 82.22 ns` | `248.84 ns` |
| None()         | `  7.86 ns/iter` | `  4.94 ns` | `  8.07 ns` | ` 22.30 ns` | `171.66 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.44 ns/iter` | `  1.70 ns` | `  8.22 ns` | ` 11.85 ns` | ` 22.60 ns` |
| Err.isOk()          | `  8.92 ns/iter` | `  7.98 ns` | `  8.85 ns` | ` 14.94 ns` | ` 24.72 ns` |
| Ok.isErr()          | `  9.09 ns/iter` | `  8.22 ns` | `  9.45 ns` | ` 15.61 ns` | ` 26.48 ns` |
| Err.isErr()         | `  9.98 ns/iter` | `  9.21 ns` | ` 10.07 ns` | ` 13.35 ns` | ` 27.87 ns` |
| Ok.isOkAnd (true)   | `  6.00 ns/iter` | `  5.17 ns` | `  6.47 ns` | ` 11.37 ns` | ` 28.77 ns` |
| Err.isOkAnd         | `  6.30 ns/iter` | `  2.63 ns` | `  6.96 ns` | ` 14.78 ns` | ` 31.03 ns` |
| Ok.isErrAnd         | `  4.58 ns/iter` | `  4.48 ns` | `  4.49 ns` | `  6.98 ns` | ` 28.87 ns` |
| Err.isErrAnd (true) | `  5.31 ns/iter` | `  5.17 ns` | `  5.18 ns` | `  7.88 ns` | ` 25.42 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 14.63 ns/iter` | ` 11.89 ns` | ` 13.49 ns` | ` 76.76 ns` | ` 99.53 ns` |
| Err.ok()               | ` 12.37 ns/iter` | ` 11.01 ns` | ` 11.74 ns` | ` 36.97 ns` | ` 98.43 ns` |
| Ok.err()               | ` 11.40 ns/iter` | ` 10.05 ns` | ` 10.77 ns` | ` 20.94 ns` | `122.80 ns` |
| Err.err()              | ` 15.47 ns/iter` | ` 13.10 ns` | ` 14.53 ns` | ` 82.97 ns` | `114.11 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 14.79 ns/iter` | ` 13.13 ns` | ` 14.10 ns` | ` 26.16 ns` | `109.45 ns` |
| Err.map (reuse)       | ` 10.00 ns/iter` | `  9.73 ns` | `  9.84 ns` | ` 13.09 ns` | ` 32.51 ns` |
| Ok.mapOr              | `  6.26 ns/iter` | `  6.04 ns` | `  6.19 ns` | `  8.72 ns` | ` 24.65 ns` |
| Err.mapOr             | `  9.63 ns/iter` | `  6.96 ns` | ` 11.22 ns` | ` 12.97 ns` | ` 31.02 ns` |
| Ok.mapOrElse          | ` 12.03 ns/iter` | ` 11.05 ns` | ` 11.25 ns` | ` 25.59 ns` | `111.50 ns` |
| Err.mapOrElse         | ` 13.73 ns/iter` | ` 12.77 ns` | ` 13.23 ns` | ` 18.43 ns` | `113.20 ns` |
| Ok.mapErr (reuse)     | `  9.49 ns/iter` | `  9.18 ns` | `  9.31 ns` | ` 13.62 ns` | ` 26.80 ns` |
| Err.mapErr (alloc)    | ` 15.07 ns/iter` | ` 13.12 ns` | ` 14.05 ns` | ` 46.76 ns` | `108.48 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.03 ns/iter` | `  7.15 ns` | `  7.65 ns` | ` 12.73 ns` | `108.75 ns` |
| Err.inspect               | `  9.12 ns/iter` | `  8.38 ns` | `  8.70 ns` | ` 14.39 ns` | `106.37 ns` |
| Ok.inspectErr             | `  6.27 ns/iter` | `  6.02 ns` | `  6.16 ns` | `  9.50 ns` | ` 29.45 ns` |
| Err.inspectErr            | `  8.14 ns/iter` | `  7.13 ns` | `  7.61 ns` | ` 20.26 ns` | `114.72 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.22 ns/iter` | `  5.84 ns` | `  6.16 ns` | `  9.04 ns` | ` 22.30 ns` |
| Err.unwrapErr            | `  6.61 ns/iter` | `  5.83 ns` | `  6.16 ns` | ` 13.25 ns` | ` 25.65 ns` |
| Ok.expect                | `  6.23 ns/iter` | `  5.85 ns` | `  6.14 ns` | `  9.21 ns` | ` 23.16 ns` |
| Err.expectErr            | `  9.15 ns/iter` | `  8.88 ns` | `  8.99 ns` | ` 12.63 ns` | ` 24.11 ns` |
| Ok.unwrapOr              | `  6.17 ns/iter` | `  5.95 ns` | `  6.06 ns` | `  8.96 ns` | ` 16.25 ns` |
| Err.unwrapOr             | `  6.04 ns/iter` | `  5.90 ns` | `  5.94 ns` | `  8.91 ns` | ` 17.72 ns` |
| Ok.unwrapOrElse          | `  6.25 ns/iter` | `  5.85 ns` | `  6.16 ns` | `  9.45 ns` | ` 40.59 ns` |
| Err.unwrapOrElse         | `  9.34 ns/iter` | `  8.36 ns` | `  8.74 ns` | ` 21.74 ns` | ` 97.74 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.13 ns/iter` | `  7.87 ns` | `  8.00 ns` | ` 11.03 ns` | ` 30.59 ns` |
| Err.and (reuse)        | `  8.20 ns/iter` | `  7.95 ns` | `  8.07 ns` | ` 10.87 ns` | ` 22.75 ns` |
| Ok.andThen (alloc)     | ` 19.51 ns/iter` | ` 16.90 ns` | ` 18.22 ns` | ` 87.02 ns` | `119.27 ns` |
| Err.andThen (alloc)    | `  7.22 ns/iter` | `  6.95 ns` | `  7.06 ns` | ` 11.73 ns` | ` 39.22 ns` |
| Ok.or (reuse)          | `  8.17 ns/iter` | `  7.88 ns` | `  7.99 ns` | ` 13.38 ns` | ` 21.46 ns` |
| Err.or (reuse)         | `  8.15 ns/iter` | `  7.87 ns` | `  7.99 ns` | ` 12.64 ns` | ` 19.12 ns` |
| Ok.orElse (alloc)      | `  6.27 ns/iter` | `  6.03 ns` | `  6.16 ns` | `  9.02 ns` | ` 32.27 ns` |
| Err.orElse (alloc)     | `  8.22 ns/iter` | `  7.14 ns` | `  7.66 ns` | ` 20.56 ns` | `106.75 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.97 ns/iter` | ` 10.65 ns` | ` 10.77 ns` | ` 16.02 ns` | ` 25.11 ns` |
| Ok(Some).transpose                     | ` 50.37 ns/iter` | ` 42.83 ns` | ` 47.22 ns` | `135.69 ns` | `322.74 ns` |
| Ok(None).transpose                     | ` 33.14 ns/iter` | ` 29.46 ns` | ` 31.43 ns` | `106.81 ns` | `130.63 ns` |
| Err.transpose                          | ` 32.87 ns/iter` | ` 27.96 ns` | ` 31.07 ns` | `107.31 ns` | `124.16 ns` |
| Ok.match                               | ` 13.06 ns/iter` | ` 12.06 ns` | ` 12.60 ns` | ` 20.59 ns` | `108.68 ns` |
| Err.match                              | ` 14.34 ns/iter` | ` 13.41 ns` | ` 13.86 ns` | ` 20.53 ns` | `114.17 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 16.17 ns/iter` | ` 13.82 ns` | ` 15.20 ns` | ` 84.92 ns` | `117.14 ns` |
| Err.iter        | `  7.15 ns/iter` | `  6.98 ns` | `  6.99 ns` | ` 12.26 ns` | ` 21.97 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.25 ns/iter` | `  6.03 ns` | `  6.17 ns` | `  8.76 ns` | ` 16.31 ns` |
| None.isSome()         | `  6.26 ns/iter` | `  6.03 ns` | `  6.17 ns` | `  9.22 ns` | ` 17.47 ns` |
| Some.isNone()         | `  6.27 ns/iter` | `  6.03 ns` | `  6.17 ns` | `  8.93 ns` | ` 20.40 ns` |
| None.isNone()         | `  6.30 ns/iter` | `  6.04 ns` | `  6.19 ns` | `  9.94 ns` | ` 19.04 ns` |
| Some.isSomeAnd (true) | `  6.59 ns/iter` | `  6.34 ns` | `  6.48 ns` | `  9.73 ns` | ` 27.68 ns` |
| None.isSomeAnd        | `  7.20 ns/iter` | `  6.95 ns` | `  7.06 ns` | ` 10.57 ns` | ` 29.31 ns` |
| Some.isNoneOr (true)  | `  6.61 ns/iter` | `  6.33 ns` | `  6.46 ns` | ` 11.67 ns` | ` 24.79 ns` |
| None.isNoneOr         | `  7.29 ns/iter` | `  6.95 ns` | `  7.06 ns` | ` 13.53 ns` | ` 35.60 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.21 ns/iter` | `  5.88 ns` | `  6.15 ns` | `  8.99 ns` | ` 15.84 ns` |
| Some.expect              | `  6.20 ns/iter` | `  5.84 ns` | `  6.14 ns` | `  8.74 ns` | ` 22.91 ns` |
| Some.unwrapOr            | `  6.23 ns/iter` | `  5.90 ns` | `  6.06 ns` | ` 11.85 ns` | ` 18.30 ns` |
| None.unwrapOr            | `  6.04 ns/iter` | `  5.80 ns` | `  5.94 ns` | `  9.32 ns` | ` 16.84 ns` |
| Some.unwrapOrElse        | `  8.78 ns/iter` | `  7.75 ns` | `  8.18 ns` | ` 22.29 ns` | `103.90 ns` |
| None.unwrapOrElse        | `  9.10 ns/iter` | `  8.37 ns` | `  8.71 ns` | ` 15.26 ns` | `102.89 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 14.88 ns/iter` | ` 13.02 ns` | ` 14.08 ns` | ` 78.95 ns` | `106.74 ns` |
| None.map (alloc)      | `  7.54 ns/iter` | `  7.36 ns` | `  7.37 ns` | ` 13.00 ns` | ` 23.68 ns` |
| Some.mapOr            | `  5.50 ns/iter` | `  4.71 ns` | `  6.16 ns` | `  8.73 ns` | ` 20.98 ns` |
| None.mapOr            | `  6.73 ns/iter` | `  6.56 ns` | `  6.79 ns` | `  9.41 ns` | ` 20.98 ns` |
| Some.mapOrElse        | ` 12.57 ns/iter` | ` 11.47 ns` | ` 11.85 ns` | ` 27.07 ns` | `104.05 ns` |
| None.mapOrElse        | ` 14.02 ns/iter` | ` 13.13 ns` | ` 13.70 ns` | ` 20.95 ns` | `110.87 ns` |
| Some.inspect          | `  8.85 ns/iter` | `  8.10 ns` | `  8.59 ns` | ` 12.58 ns` | `109.50 ns` |
| None.inspect          | ` 11.39 ns/iter` | `  9.75 ns` | ` 11.06 ns` | ` 15.45 ns` | `107.44 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 13.00 ns/iter` | ` 10.65 ns` | ` 12.57 ns` | ` 27.12 ns` | `136.09 ns` |
| None.okOr              | ` 10.98 ns/iter` | `  9.38 ns` | ` 10.30 ns` | ` 21.32 ns` | `108.09 ns` |
| Some.okOrElse          | ` 15.93 ns/iter` | ` 14.16 ns` | ` 15.08 ns` | ` 81.40 ns` | `107.12 ns` |
| None.okOrElse          | ` 17.81 ns/iter` | ` 16.05 ns` | ` 16.90 ns` | ` 82.13 ns` | `109.36 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.12 ns/iter` | `  7.95 ns` | `  7.96 ns` | ` 12.26 ns` | ` 28.52 ns` |
| None.and (alloc)           | `  9.05 ns/iter` | `  8.87 ns` | `  8.88 ns` | ` 13.60 ns` | ` 23.85 ns` |
| Some.andThen (alloc)       | ` 20.83 ns/iter` | ` 17.84 ns` | ` 19.13 ns` | ` 95.76 ns` | `145.70 ns` |
| None.andThen (alloc)       | `  6.87 ns/iter` | `  6.71 ns` | `  6.72 ns` | ` 11.41 ns` | ` 37.94 ns` |
| Some.filter (true, reuse)  | `  7.74 ns/iter` | `  6.70 ns` | `  7.16 ns` | ` 20.92 ns` | `110.60 ns` |
| Some.filter (false, alloc) | ` 13.11 ns/iter` | ` 11.20 ns` | ` 12.40 ns` | ` 47.81 ns` | `108.83 ns` |
| None.filter (alloc)        | `  6.83 ns/iter` | `  6.71 ns` | `  6.72 ns` | `  9.19 ns` | ` 36.62 ns` |
| Some.or (reuse)            | `  7.76 ns/iter` | `  7.64 ns` | `  7.64 ns` | ` 10.23 ns` | ` 27.35 ns` |
| None.or (reuse/optb)       | `  7.76 ns/iter` | `  7.64 ns` | `  7.64 ns` | ` 10.47 ns` | ` 18.73 ns` |
| Some.orElse (reuse)        | `  6.52 ns/iter` | `  6.41 ns` | `  6.41 ns` | `  9.02 ns` | ` 34.76 ns` |
| None.orElse (alloc)        | ` 10.76 ns/iter` | `  9.63 ns` | ` 10.07 ns` | ` 25.24 ns` | `114.01 ns` |
| Some xor None (reuse)      | `  9.66 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 12.67 ns` | ` 41.06 ns` |
| None xor Some (reuse/optb) | `  9.66 ns/iter` | `  9.49 ns` | `  9.50 ns` | ` 13.58 ns` | ` 22.38 ns` |
| Some xor Some (alloc)      | ` 15.81 ns/iter` | ` 13.74 ns` | ` 14.79 ns` | ` 47.36 ns` | `120.98 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 16.32 ns/iter` | ` 13.46 ns` | ` 15.32 ns` | ` 88.60 ns` | `124.36 ns` |
| None.insert                     | ` 13.12 ns/iter` | ` 11.38 ns` | ` 12.38 ns` | ` 25.94 ns` | `105.25 ns` |
| Some.getOrInsert (existing)     | ` 12.87 ns/iter` | ` 11.11 ns` | ` 12.10 ns` | ` 26.50 ns` | `111.45 ns` |
| None.getOrInsert (insert)       | ` 16.42 ns/iter` | ` 14.39 ns` | ` 15.60 ns` | ` 50.42 ns` | `115.46 ns` |
| Some.getOrInsertWith (existing) | ` 21.16 ns/iter` | ` 18.41 ns` | ` 20.05 ns` | `101.75 ns` | `125.82 ns` |
| None.getOrInsertWith (insert)   | ` 22.36 ns/iter` | ` 19.46 ns` | ` 21.18 ns` | `107.56 ns` | `133.45 ns` |
| Some.take                       | ` 29.00 ns/iter` | ` 24.22 ns` | ` 27.41 ns` | `112.58 ns` | `143.05 ns` |
| None.take                       | ` 21.53 ns/iter` | ` 18.85 ns` | ` 20.45 ns` | `101.14 ns` | `127.26 ns` |
| Some.takeIf (true)              | ` 30.65 ns/iter` | ` 26.59 ns` | ` 28.83 ns` | `115.68 ns` | `138.27 ns` |
| Some.takeIf (false)             | ` 27.15 ns/iter` | ` 23.55 ns` | ` 25.61 ns` | `110.62 ns` | `133.03 ns` |
| Some.replace                    | ` 31.25 ns/iter` | ` 26.10 ns` | ` 29.58 ns` | `109.66 ns` | `135.07 ns` |
| None.replace                    | ` 25.33 ns/iter` | ` 21.98 ns` | ` 23.99 ns` | `100.24 ns` | `128.43 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  9.05 ns/iter` | `  8.87 ns` | `  8.88 ns` | ` 12.64 ns` | ` 37.82 ns` |
| Some(Ok).transpose                             | ` 49.88 ns/iter` | ` 42.21 ns` | ` 46.58 ns` | `143.66 ns` | `335.42 ns` |
| Some(Err).transpose                            | ` 36.44 ns/iter` | ` 31.13 ns` | ` 34.57 ns` | `116.95 ns` | `140.81 ns` |
| None.transpose                                 | ` 26.03 ns/iter` | ` 22.62 ns` | ` 24.50 ns` | `104.21 ns` | `126.16 ns` |
| Some.unzip                                     | ` 45.23 ns/iter` | ` 38.87 ns` | ` 42.51 ns` | `131.39 ns` | `197.57 ns` |
| None.unzip                                     | ` 31.64 ns/iter` | ` 27.12 ns` | ` 29.88 ns` | `114.95 ns` | `134.03 ns` |
| Some.match                                     | ` 15.73 ns/iter` | ` 14.08 ns` | ` 15.02 ns` | ` 26.26 ns` | `128.17 ns` |
| None.match                                     | ` 16.52 ns/iter` | ` 15.00 ns` | ` 15.85 ns` | ` 23.62 ns` | `129.28 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 15.19 ns/iter` | ` 12.80 ns` | ` 14.49 ns` | ` 32.91 ns` | `116.40 ns` |
| None.iter       | `  7.18 ns/iter` | `  7.02 ns` | `  7.03 ns` | ` 11.84 ns` | ` 23.05 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `235.83 ns/iter` | `221.14 ns` | `226.41 ns` | `408.25 ns` | `431.44 ns` |
| AsyncResult.unwrap (Err path)    | `229.14 ns/iter` | `220.19 ns` | `225.44 ns` | `334.18 ns` | `367.41 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `168.00 ns/iter` | `160.09 ns` | `165.53 ns` | `267.56 ns` | `332.94 ns` |
| Result.mapOrElseAsync (Err path)    | `171.49 ns/iter` | `162.82 ns` | `169.23 ns` | `272.19 ns` | `282.28 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `182.38 ns/iter` | `169.13 ns` | `187.31 ns` | `288.37 ns` | `309.68 ns` |
| Result.unwrapOrElseAsync (Err path) | `164.02 ns/iter` | `157.43 ns` | `162.56 ns` | `256.33 ns` | `284.08 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `660.50 ns/iter` | `641.94 ns` | `653.19 ns` | `776.47 ns` | `786.11 ns` |
| Err.mapAsync (alloc AsyncResult)        | `439.32 ns/iter` | `421.78 ns` | `431.76 ns` | `561.29 ns` | `700.39 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `438.14 ns/iter` | `423.75 ns` | `432.70 ns` | `554.77 ns` | `575.79 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `654.86 ns/iter` | `631.45 ns` | `648.12 ns` | `771.08 ns` | `832.05 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `665.17 ns/iter` | `644.09 ns` | `660.54 ns` | `788.34 ns` | `839.03 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `405.19 ns/iter` | `391.46 ns` | `399.35 ns` | `522.41 ns` | `553.93 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `412.12 ns/iter` | `395.89 ns` | `409.51 ns` | `525.75 ns` | `597.64 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `664.13 ns/iter` | `644.39 ns` | `659.46 ns` | `775.07 ns` | `796.28 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `591.06 ns/iter` | `568.43 ns` | `586.98 ns` | `714.27 ns` | `737.08 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `431.37 ns/iter` | `416.55 ns` | `425.49 ns` | `551.81 ns` | `602.40 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `421.18 ns/iter` | `407.22 ns` | `415.34 ns` | `546.96 ns` | `580.31 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `597.74 ns/iter` | `575.45 ns` | `591.47 ns` | `723.49 ns` | `737.63 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `383.06 ns/iter` | `372.34 ns` | `380.24 ns` | `492.40 ns` | `503.99 ns` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `226.86 ns/iter` | `218.22 ns` | `223.62 ns` | `333.65 ns` | `425.01 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.53 µs/iter` | `  1.38 µs` | `  1.46 µs` | `  2.07 µs` | `  2.08 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `181.70 ns/iter` | `172.79 ns` | `178.71 ns` | `283.38 ns` | `309.60 ns` |
| Option.mapOrElseAsync (None path)    | `176.02 ns/iter` | `167.68 ns` | `173.18 ns` | `275.05 ns` | `298.45 ns` |
| Option.unwrapOrElseAsync (Some path) | `193.18 ns/iter` | `181.76 ns` | `188.84 ns` | `308.70 ns` | `322.83 ns` |
| Option.unwrapOrElseAsync (None path) | `174.54 ns/iter` | `165.88 ns` | `171.64 ns` | `279.51 ns` | `341.83 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `668.09 ns/iter` | `646.72 ns` | `659.94 ns` | `785.42 ns` | `  1.07 µs` |
| None.mapAsync (alloc AsyncOption)         | `426.46 ns/iter` | `410.99 ns` | `419.57 ns` | `548.90 ns` | `722.61 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `672.15 ns/iter` | `653.43 ns` | `665.83 ns` | `791.65 ns` | `851.52 ns` |
| None.inspectAsync (alloc AsyncOption)     | `404.41 ns/iter` | `390.32 ns` | `398.43 ns` | `524.40 ns` | `625.05 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `597.50 ns/iter` | `578.93 ns` | `589.71 ns` | `712.33 ns` | `935.00 ns` |
| None.andThenAsync (alloc AsyncOption)     | `422.52 ns/iter` | `408.48 ns` | `417.58 ns` | `531.21 ns` | `586.84 ns` |
| Some.filterAsync true (alloc AsyncOption) | `652.12 ns/iter` | `630.43 ns` | `645.87 ns` | `769.98 ns` | `782.04 ns` |
| None.filterAsync (alloc AsyncOption)      | `416.14 ns/iter` | `403.46 ns` | `410.86 ns` | `524.94 ns` | `574.40 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `410.11 ns/iter` | `398.21 ns` | `406.16 ns` | `518.40 ns` | `534.70 ns` |
| None.orElseAsync (alloc AsyncOption)      | `579.93 ns/iter` | `564.42 ns` | `573.02 ns` | `700.49 ns` | `705.35 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `429.82 ns/iter` | `416.61 ns` | `424.94 ns` | `548.28 ns` | `557.33 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `644.76 ns/iter` | `626.56 ns` | `640.13 ns` | `761.23 ns` | `776.26 ns` |
| Some.getOrInsertWithAsync (existing)      | `187.59 ns/iter` | `178.75 ns` | `184.47 ns` | `294.02 ns` | `372.24 ns` |
| None.getOrInsertWithAsync (insert)        | `597.43 ns/iter` | `576.90 ns` | `590.55 ns` | `709.16 ns` | `725.62 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `384.66 ns/iter` | `374.10 ns` | `380.83 ns` | `501.39 ns` | `522.60 ns` |
