# Benchmarks

clk: ~3.33 GHz
cpu: Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | ` 11.14 ns/iter` | `  8.56 ns` | ` 10.44 ns` | ` 33.01 ns` | `181.46 ns` |
| Err(1)         | ` 11.31 ns/iter` | `  8.76 ns` | ` 10.72 ns` | ` 21.98 ns` | `120.25 ns` |
| Some(1)        | ` 15.66 ns/iter` | ` 11.62 ns` | ` 15.72 ns` | ` 88.90 ns` | `194.69 ns` |
| None()         | ` 12.00 ns/iter` | `  7.79 ns` | ` 11.98 ns` | ` 21.39 ns` | `154.09 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  4.71 ns/iter` | `870.61 ps` | `  8.43 ns` | `  9.89 ns` | ` 16.49 ns` |
| Err.isOk()          | `  9.66 ns/iter` | `  9.47 ns` | `  9.57 ns` | ` 11.64 ns` | ` 19.22 ns` |
| Ok.isErr()          | `  9.51 ns/iter` | `  9.18 ns` | `  9.22 ns` | ` 18.50 ns` | ` 22.00 ns` |
| Err.isErr()         | `  9.95 ns/iter` | `  9.76 ns` | `  9.79 ns` | ` 13.65 ns` | ` 21.24 ns` |
| Ok.isOkAnd (true)   | `  5.07 ns/iter` | `  4.39 ns` | `  5.32 ns` | ` 10.07 ns` | ` 24.22 ns` |
| Err.isOkAnd         | `  6.39 ns/iter` | `  5.96 ns` | `  6.41 ns` | `  8.74 ns` | ` 25.03 ns` |
| Ok.isErrAnd         | `  5.00 ns/iter` | `  2.46 ns` | `  5.39 ns` | `  7.00 ns` | ` 18.28 ns` |
| Err.isErrAnd (true) | `  4.64 ns/iter` | `  4.45 ns` | `  4.60 ns` | `  6.53 ns` | ` 19.56 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 18.27 ns/iter` | ` 14.03 ns` | ` 17.58 ns` | ` 92.54 ns` | `116.99 ns` |
| Err.ok()               | ` 14.38 ns/iter` | ` 12.02 ns` | ` 13.72 ns` | ` 28.29 ns` | `107.68 ns` |
| Ok.err()               | ` 13.65 ns/iter` | ` 11.59 ns` | ` 13.02 ns` | ` 23.95 ns` | `108.24 ns` |
| Err.err()              | ` 19.35 ns/iter` | ` 15.43 ns` | ` 18.97 ns` | ` 91.02 ns` | `109.34 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 17.31 ns/iter` | ` 14.86 ns` | ` 16.63 ns` | ` 27.45 ns` | `154.93 ns` |
| Err.map (reuse)       | `  9.76 ns/iter` | `  8.93 ns` | `  9.87 ns` | ` 12.36 ns` | ` 24.51 ns` |
| Ok.mapOr              | `  5.98 ns/iter` | `  5.49 ns` | `  6.06 ns` | `  7.64 ns` | ` 26.22 ns` |
| Err.mapOr             | `  7.31 ns/iter` | `  6.92 ns` | `  7.36 ns` | `  9.35 ns` | ` 30.26 ns` |
| Ok.mapOrElse          | ` 11.88 ns/iter` | ` 10.39 ns` | ` 11.28 ns` | ` 22.24 ns` | `102.84 ns` |
| Err.mapOrElse         | ` 13.96 ns/iter` | ` 12.19 ns` | ` 13.61 ns` | ` 20.30 ns` | `133.71 ns` |
| Ok.mapErr (reuse)     | `  8.83 ns/iter` | `  7.81 ns` | `  8.81 ns` | ` 11.45 ns` | ` 22.68 ns` |
| Err.mapErr (alloc)    | ` 17.53 ns/iter` | ` 14.93 ns` | ` 16.67 ns` | ` 39.99 ns` | `141.20 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  9.08 ns/iter` | `  7.54 ns` | `  8.72 ns` | ` 13.93 ns` | ` 99.59 ns` |
| Err.inspect               | ` 10.42 ns/iter` | `  9.04 ns` | ` 10.06 ns` | ` 16.30 ns` | `112.97 ns` |
| Ok.inspectErr             | `  5.80 ns/iter` | `  5.23 ns` | `  5.89 ns` | `  7.21 ns` | ` 29.51 ns` |
| Err.inspectErr            | `  9.14 ns/iter` | `  7.57 ns` | `  8.71 ns` | ` 18.05 ns` | `105.01 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  5.53 ns/iter` | `  5.20 ns` | `  5.63 ns` | `  7.02 ns` | ` 22.16 ns` |
| Err.unwrapErr            | `  5.43 ns/iter` | `  5.20 ns` | `  5.56 ns` | `  6.91 ns` | ` 21.75 ns` |
| Ok.expect                | `  5.64 ns/iter` | `  5.20 ns` | `  5.78 ns` | `  7.33 ns` | ` 24.25 ns` |
| Err.expectErr            | `  8.32 ns/iter` | `  7.65 ns` | `  8.42 ns` | ` 10.08 ns` | ` 20.79 ns` |
| Ok.unwrapOr              | `  5.70 ns/iter` | `  5.45 ns` | `  5.79 ns` | `  7.38 ns` | ` 17.82 ns` |
| Err.unwrapOr             | `  5.93 ns/iter` | `  5.70 ns` | `  5.93 ns` | `  7.53 ns` | ` 24.14 ns` |
| Ok.unwrapOrElse          | `  5.71 ns/iter` | `  5.20 ns` | `  5.85 ns` | `  7.31 ns` | ` 40.54 ns` |
| Err.unwrapOrElse         | ` 10.75 ns/iter` | `  9.07 ns` | ` 10.19 ns` | ` 19.90 ns` | `136.15 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  7.45 ns/iter` | `  6.92 ns` | `  7.57 ns` | `  9.12 ns` | ` 31.38 ns` |
| Err.and (reuse)        | `  7.36 ns/iter` | `  6.64 ns` | `  7.57 ns` | `  9.08 ns` | ` 25.35 ns` |
| Ok.andThen (alloc)     | ` 21.55 ns/iter` | ` 17.71 ns` | ` 20.76 ns` | ` 95.54 ns` | `125.45 ns` |
| Err.andThen (alloc)    | `  7.27 ns/iter` | `  6.63 ns` | `  7.43 ns` | `  8.95 ns` | ` 35.98 ns` |
| Ok.or (reuse)          | `  7.32 ns/iter` | `  6.69 ns` | `  7.36 ns` | `  9.82 ns` | ` 29.83 ns` |
| Err.or (reuse)         | `  7.28 ns/iter` | `  6.73 ns` | `  7.35 ns` | `  9.41 ns` | ` 25.02 ns` |
| Ok.orElse (alloc)      | `  5.89 ns/iter` | `  5.47 ns` | `  5.94 ns` | `  7.55 ns` | ` 34.05 ns` |
| Err.orElse (alloc)     | `  9.51 ns/iter` | `  7.88 ns` | `  8.99 ns` | ` 18.81 ns` | `129.19 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.05 ns/iter` | `  9.50 ns` | ` 10.15 ns` | ` 12.09 ns` | ` 28.61 ns` |
| Ok(Some).transpose                     | ` 62.19 ns/iter` | ` 51.28 ns` | ` 60.66 ns` | `149.63 ns` | `272.05 ns` |
| Ok(None).transpose                     | ` 39.68 ns/iter` | ` 30.62 ns` | ` 40.03 ns` | `119.98 ns` | `139.08 ns` |
| Err.transpose                          | ` 45.90 ns/iter` | ` 37.83 ns` | ` 45.41 ns` | `126.81 ns` | `153.65 ns` |
| Ok.match                               | ` 12.97 ns/iter` | ` 11.11 ns` | ` 12.51 ns` | ` 18.92 ns` | `106.64 ns` |
| Err.match                              | ` 15.14 ns/iter` | ` 13.21 ns` | ` 14.78 ns` | ` 20.66 ns` | `109.99 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 19.01 ns/iter` | ` 15.78 ns` | ` 18.32 ns` | ` 87.22 ns` | `111.55 ns` |
| Err.iter        | `  7.95 ns/iter` | `  6.92 ns` | `  8.00 ns` | ` 10.61 ns` | ` 27.54 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 25.53 ns/iter` | ` 20.45 ns` | ` 24.47 ns` | `102.68 ns` | `160.35 ns` |
| catchUnwind (call only, Ok)    | ` 17.40 ns/iter` | ` 14.53 ns` | ` 16.94 ns` | ` 30.76 ns` | `128.35 ns` |
| catchUnwind (wrap + call, Err) | `  1.13 µs/iter` | `999.21 ns` | `  1.15 µs` | `  1.26 µs` | `  1.34 µs` |
| catchUnwind (call only, catch) | `  1.10 µs/iter` | `863.72 ns` | `  1.14 µs` | `  1.21 µs` | `  1.23 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  5.97 ns/iter` | `  5.49 ns` | `  6.06 ns` | `  9.72 ns` | ` 18.87 ns` |
| None.isSome()         | `  5.83 ns/iter` | `  5.49 ns` | `  5.90 ns` | `  8.18 ns` | ` 15.13 ns` |
| Some.isNone()         | `  5.82 ns/iter` | `  5.49 ns` | `  5.92 ns` | `  7.73 ns` | ` 17.66 ns` |
| None.isNone()         | `  5.82 ns/iter` | `  5.49 ns` | `  5.90 ns` | `  8.02 ns` | ` 13.97 ns` |
| Some.isSomeAnd (true) | `  6.04 ns/iter` | `  5.77 ns` | `  6.13 ns` | `  7.74 ns` | ` 30.32 ns` |
| None.isSomeAnd        | `  7.91 ns/iter` | `  7.21 ns` | `  7.93 ns` | `  9.38 ns` | ` 28.01 ns` |
| Some.isNoneOr (true)  | `  6.20 ns/iter` | `  5.78 ns` | `  6.22 ns` | `  8.12 ns` | ` 22.68 ns` |
| None.isNoneOr         | `  7.40 ns/iter` | `  6.92 ns` | `  7.56 ns` | `  9.47 ns` | ` 17.30 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  5.55 ns/iter` | `  5.20 ns` | `  5.58 ns` | `  7.76 ns` | ` 18.04 ns` |
| Some.expect              | `  5.56 ns/iter` | `  5.20 ns` | `  5.63 ns` | `  7.53 ns` | ` 20.90 ns` |
| Some.unwrapOr            | `  5.57 ns/iter` | `  5.48 ns` | `  5.52 ns` | `  7.30 ns` | ` 13.98 ns` |
| None.unwrapOr            | `  5.96 ns/iter` | `  5.49 ns` | `  6.09 ns` | `  7.97 ns` | ` 14.64 ns` |
| Some.unwrapOrElse        | ` 10.21 ns/iter` | `  8.37 ns` | `  9.68 ns` | ` 20.07 ns` | `151.42 ns` |
| None.unwrapOrElse        | ` 10.75 ns/iter` | `  9.29 ns` | ` 10.31 ns` | ` 16.43 ns` | `104.87 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 18.20 ns/iter` | ` 14.65 ns` | ` 17.75 ns` | ` 50.06 ns` | `115.14 ns` |
| None.map (alloc)      | `  7.51 ns/iter` | `  6.92 ns` | `  7.44 ns` | `  9.69 ns` | ` 20.59 ns` |
| Some.mapOr            | `  5.75 ns/iter` | `  5.49 ns` | `  5.85 ns` | `  7.44 ns` | ` 28.23 ns` |
| None.mapOr            | `  7.59 ns/iter` | `  6.92 ns` | `  7.59 ns` | `  9.32 ns` | ` 27.10 ns` |
| Some.mapOrElse        | ` 12.70 ns/iter` | ` 10.93 ns` | ` 12.08 ns` | ` 24.42 ns` | `115.29 ns` |
| None.mapOrElse        | ` 13.65 ns/iter` | ` 12.02 ns` | ` 13.23 ns` | ` 18.85 ns` | `108.58 ns` |
| Some.inspect          | `  9.03 ns/iter` | `  7.65 ns` | `  8.70 ns` | ` 13.83 ns` | `142.90 ns` |
| None.inspect          | ` 10.93 ns/iter` | `  9.29 ns` | ` 10.50 ns` | ` 16.35 ns` | `143.93 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 15.18 ns/iter` | ` 12.91 ns` | ` 14.53 ns` | ` 23.09 ns` | `165.11 ns` |
| None.okOr              | ` 15.96 ns/iter` | ` 13.72 ns` | ` 15.45 ns` | ` 24.10 ns` | `133.83 ns` |
| Some.okOrElse          | ` 21.61 ns/iter` | ` 17.38 ns` | ` 21.34 ns` | ` 38.81 ns` | `158.32 ns` |
| None.okOrElse          | ` 22.55 ns/iter` | ` 18.47 ns` | ` 22.21 ns` | ` 46.02 ns` | `166.04 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.67 ns/iter` | `  6.93 ns` | `  7.65 ns` | `  9.29 ns` | ` 30.13 ns` |
| None.and (alloc)           | `  7.39 ns/iter` | `  6.65 ns` | `  7.51 ns` | `  9.47 ns` | ` 26.03 ns` |
| Some.andThen (alloc)       | ` 27.82 ns/iter` | ` 21.47 ns` | ` 27.74 ns` | `111.24 ns` | `156.96 ns` |
| None.andThen (alloc)       | `  7.26 ns/iter` | `  6.64 ns` | `  7.36 ns` | `  9.05 ns` | ` 43.77 ns` |
| Some.filter (true, reuse)  | `  9.28 ns/iter` | `  7.69 ns` | `  8.83 ns` | ` 19.27 ns` | `106.73 ns` |
| Some.filter (false, alloc) | ` 17.34 ns/iter` | ` 14.36 ns` | ` 16.85 ns` | ` 41.45 ns` | `121.27 ns` |
| None.filter (alloc)        | `  7.14 ns/iter` | `  6.64 ns` | `  7.25 ns` | `  9.99 ns` | ` 24.56 ns` |
| Some.or (reuse)            | `  7.36 ns/iter` | `  6.65 ns` | `  7.44 ns` | ` 10.15 ns` | ` 23.48 ns` |
| None.or (reuse/optb)       | `  7.35 ns/iter` | `  6.92 ns` | `  7.49 ns` | `  9.66 ns` | ` 17.29 ns` |
| Some.orElse (reuse)        | `  6.07 ns/iter` | `  5.78 ns` | `  6.14 ns` | `  7.79 ns` | ` 37.37 ns` |
| None.orElse (alloc)        | ` 12.00 ns/iter` | ` 10.07 ns` | ` 11.31 ns` | ` 22.26 ns` | `116.54 ns` |
| Some xor None (reuse)      | `  9.02 ns/iter` | `  8.64 ns` | `  9.03 ns` | ` 12.44 ns` | ` 24.64 ns` |
| None xor Some (reuse/optb) | `  9.48 ns/iter` | `  8.65 ns` | `  9.58 ns` | ` 13.26 ns` | ` 22.59 ns` |
| Some xor Some (alloc)      | ` 16.47 ns/iter` | ` 14.02 ns` | ` 15.66 ns` | ` 39.74 ns` | `143.20 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 25.26 ns/iter` | ` 20.15 ns` | ` 25.15 ns` | `102.63 ns` | `122.97 ns` |
| None.insert                     | ` 18.85 ns/iter` | ` 14.68 ns` | ` 18.90 ns` | ` 37.26 ns` | `128.49 ns` |
| Some.getOrInsert (existing)     | ` 18.92 ns/iter` | ` 14.75 ns` | ` 18.94 ns` | ` 41.04 ns` | `134.11 ns` |
| None.getOrInsert (insert)       | ` 21.13 ns/iter` | ` 16.25 ns` | ` 21.35 ns` | ` 41.69 ns` | `174.74 ns` |
| Some.getOrInsertWith (existing) | ` 24.25 ns/iter` | ` 19.76 ns` | ` 24.08 ns` | `106.04 ns` | `139.27 ns` |
| None.getOrInsertWith (insert)   | ` 24.78 ns/iter` | ` 20.20 ns` | ` 24.58 ns` | `105.46 ns` | `125.15 ns` |
| Some.take                       | ` 36.77 ns/iter` | ` 27.89 ns` | ` 37.14 ns` | `121.40 ns` | `150.77 ns` |
| None.take                       | ` 27.01 ns/iter` | ` 20.76 ns` | ` 27.28 ns` | `108.02 ns` | `185.35 ns` |
| Some.takeIf (true)              | ` 41.62 ns/iter` | ` 33.57 ns` | ` 40.66 ns` | `130.24 ns` | `175.75 ns` |
| Some.takeIf (false)             | ` 35.22 ns/iter` | ` 27.11 ns` | ` 35.19 ns` | `121.07 ns` | `141.60 ns` |
| Some.replace                    | ` 45.11 ns/iter` | ` 37.11 ns` | ` 44.37 ns` | `132.83 ns` | `156.93 ns` |
| None.replace                    | ` 32.43 ns/iter` | ` 25.13 ns` | ` 32.94 ns` | `117.49 ns` | `137.06 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  8.25 ns/iter` | `  7.80 ns` | `  8.24 ns` | ` 11.89 ns` | ` 23.61 ns` |
| Some(Ok).transpose                             | ` 65.09 ns/iter` | ` 53.98 ns` | ` 63.65 ns` | `159.50 ns` | `211.00 ns` |
| Some(Err).transpose                            | ` 50.31 ns/iter` | ` 41.98 ns` | ` 49.69 ns` | `140.69 ns` | `217.52 ns` |
| None.transpose                                 | ` 42.85 ns/iter` | ` 32.43 ns` | ` 43.36 ns` | `127.02 ns` | `173.15 ns` |
| Some.unzip                                     | ` 59.63 ns/iter` | ` 50.26 ns` | ` 58.85 ns` | `145.85 ns` | `210.84 ns` |
| None.unzip                                     | ` 48.30 ns/iter` | ` 40.31 ns` | ` 47.46 ns` | `136.10 ns` | `162.76 ns` |
| Some.match                                     | ` 16.24 ns/iter` | ` 14.22 ns` | ` 15.79 ns` | ` 25.51 ns` | `131.25 ns` |
| None.match                                     | ` 17.42 ns/iter` | ` 15.08 ns` | ` 16.92 ns` | ` 26.10 ns` | `147.66 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 19.04 ns/iter` | ` 15.27 ns` | ` 18.48 ns` | ` 53.31 ns` | `179.06 ns` |
| None.iter       | `  7.62 ns/iter` | `  6.92 ns` | `  7.85 ns` | ` 10.21 ns` | ` 39.94 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `262.93 ns/iter` | `239.76 ns` | `254.01 ns` | `418.05 ns` | `490.46 ns` |
| AsyncResult.unwrap (Err path)    | `247.36 ns/iter` | `235.54 ns` | `246.22 ns` | `351.51 ns` | `425.85 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `184.26 ns/iter` | `173.68 ns` | `183.82 ns` | `277.37 ns` | `362.56 ns` |
| Result.mapOrElseAsync (Err path)    | `190.03 ns/iter` | `181.02 ns` | `189.28 ns` | `278.84 ns` | `321.06 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `200.65 ns/iter` | `188.98 ns` | `200.94 ns` | `292.86 ns` | `309.22 ns` |
| Result.unwrapOrElseAsync (Err path) | `187.29 ns/iter` | `178.83 ns` | `186.74 ns` | `274.70 ns` | `297.69 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `660.37 ns/iter` | `640.59 ns` | `655.80 ns` | `763.03 ns` | `778.09 ns` |
| Err.mapAsync (alloc AsyncResult)        | `433.57 ns/iter` | `418.90 ns` | `429.38 ns` | `536.88 ns` | `599.87 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `430.67 ns/iter` | `415.32 ns` | `427.15 ns` | `529.93 ns` | `543.19 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `665.46 ns/iter` | `639.04 ns` | `663.98 ns` | `782.10 ns` | `810.32 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `671.26 ns/iter` | `649.37 ns` | `666.10 ns` | `792.76 ns` | `827.71 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `427.98 ns/iter` | `411.05 ns` | `425.25 ns` | `535.75 ns` | `571.37 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `421.99 ns/iter` | `408.42 ns` | `418.80 ns` | `526.28 ns` | `542.22 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `674.76 ns/iter` | `650.92 ns` | `670.79 ns` | `785.28 ns` | `805.44 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `594.59 ns/iter` | `574.07 ns` | `590.66 ns` | `710.95 ns` | `760.85 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `434.24 ns/iter` | `418.29 ns` | `431.20 ns` | `543.06 ns` | `586.22 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `427.52 ns/iter` | `413.50 ns` | `424.10 ns` | `536.13 ns` | `547.69 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `599.13 ns/iter` | `575.72 ns` | `597.93 ns` | `715.76 ns` | `723.19 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `400.60 ns/iter` | `385.87 ns` | `398.77 ns` | `501.49 ns` | `526.34 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `806.97 ns/iter` | `763.89 ns` | `809.28 ns` | `925.33 ns` | `  1.02 µs` |
| catchUnwindAsync (call only, Ok)       | `794.08 ns/iter` | `731.25 ns` | `791.97 ns` | `908.32 ns` | `976.92 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.47 µs/iter` | `  1.40 µs` | `  1.46 µs` | `  1.73 µs` | `  1.74 µs` |
| catchUnwindAsync (call only, reject)   | `  1.42 µs/iter` | `  1.31 µs` | `  1.43 µs` | `  1.53 µs` | `  1.55 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `256.34 ns/iter` | `246.97 ns` | `255.74 ns` | `349.98 ns` | `451.36 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.65 µs/iter` | `  1.43 µs` | `  1.68 µs` | `  1.95 µs` | `  1.96 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `206.83 ns/iter` | `195.13 ns` | `204.80 ns` | `305.50 ns` | `328.01 ns` |
| Option.mapOrElseAsync (None path)    | `211.28 ns/iter` | `197.96 ns` | `210.58 ns` | `308.28 ns` | `340.11 ns` |
| Option.unwrapOrElseAsync (Some path) | `217.16 ns/iter` | `205.62 ns` | `215.59 ns` | `314.84 ns` | `332.94 ns` |
| Option.unwrapOrElseAsync (None path) | `200.03 ns/iter` | `189.59 ns` | `199.14 ns` | `295.65 ns` | `334.00 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `667.65 ns/iter` | `643.73 ns` | `665.90 ns` | `778.40 ns` | `791.95 ns` |
| None.mapAsync (alloc AsyncOption)         | `433.59 ns/iter` | `418.89 ns` | `430.12 ns` | `541.15 ns` | `568.78 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `667.95 ns/iter` | `648.42 ns` | `664.77 ns` | `773.57 ns` | `782.02 ns` |
| None.inspectAsync (alloc AsyncOption)     | `426.43 ns/iter` | `411.83 ns` | `423.77 ns` | `529.05 ns` | `540.49 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `606.57 ns/iter` | `582.31 ns` | `601.71 ns` | `732.74 ns` | `825.05 ns` |
| None.andThenAsync (alloc AsyncOption)     | `430.89 ns/iter` | `414.72 ns` | `427.13 ns` | `555.03 ns` | `619.77 ns` |
| Some.filterAsync true (alloc AsyncOption) | `654.14 ns/iter` | `632.34 ns` | `649.41 ns` | `773.14 ns` | `785.18 ns` |
| None.filterAsync (alloc AsyncOption)      | `436.80 ns/iter` | `420.08 ns` | `434.23 ns` | `542.05 ns` | `572.99 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `425.92 ns/iter` | `410.39 ns` | `423.51 ns` | `529.77 ns` | `569.24 ns` |
| None.orElseAsync (alloc AsyncOption)      | `588.95 ns/iter` | `570.73 ns` | `584.68 ns` | `706.03 ns` | `775.61 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `428.95 ns/iter` | `414.38 ns` | `425.43 ns` | `534.01 ns` | `546.38 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `639.08 ns/iter` | `618.22 ns` | `637.23 ns` | `749.79 ns` | `780.75 ns` |
| Some.getOrInsertWithAsync (existing)      | `218.06 ns/iter` | `204.79 ns` | `217.13 ns` | `314.56 ns` | `369.76 ns` |
| None.getOrInsertWithAsync (insert)        | `617.53 ns/iter` | `589.61 ns` | `613.66 ns` | `735.30 ns` | `748.43 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `405.29 ns/iter` | `389.16 ns` | `402.37 ns` | `514.86 ns` | `597.69 ns` |
