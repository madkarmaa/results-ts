# Benchmarks

clk: ~4.05 GHz
cpu: Intel(R) Xeon(R) 6973P-C
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  4.64 ns/iter` | `  3.86 ns` | `  4.14 ns` | ` 24.24 ns` | `103.58 ns` |
| Err(1)         | `  4.58 ns/iter` | `  3.86 ns` | `  4.20 ns` | `  8.95 ns` | ` 68.89 ns` |
| Some(1)        | `  7.32 ns/iter` | `  5.76 ns` | `  6.40 ns` | ` 54.63 ns` | ` 98.17 ns` |
| None()         | `  5.57 ns/iter` | `  4.03 ns` | `  6.40 ns` | ` 10.91 ns` | ` 85.93 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  1.23 ns/iter` | ` 66.89 ps` | `  1.32 ns` | `  6.45 ns` | ` 14.21 ns` |
| Err.isOk()          | `  7.31 ns/iter` | `  6.72 ns` | `  7.36 ns` | `  9.06 ns` | ` 12.36 ns` |
| Ok.isErr()          | `  7.45 ns/iter` | `  7.23 ns` | `  7.41 ns` | `  9.42 ns` | ` 14.66 ns` |
| Err.isErr()         | `  4.27 ns/iter` | `  1.74 ns` | `  8.03 ns` | `  9.40 ns` | ` 17.82 ns` |
| Ok.isOkAnd (true)   | `  4.13 ns/iter` | `  3.89 ns` | `  4.14 ns` | `  5.28 ns` | ` 15.51 ns` |
| Err.isOkAnd         | `  4.13 ns/iter` | `  3.83 ns` | `  4.13 ns` | `  5.42 ns` | ` 16.48 ns` |
| Ok.isErrAnd         | `  2.19 ns/iter` | `  1.71 ns` | `  1.76 ns` | `  4.91 ns` | ` 14.41 ns` |
| Err.isErrAnd (true) | `  3.01 ns/iter` | `  2.75 ns` | `  3.06 ns` | `  4.08 ns` | ` 16.51 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | `  9.25 ns/iter` | `  7.34 ns` | `  8.61 ns` | ` 52.99 ns` | ` 92.66 ns` |
| Err.ok()               | `  7.98 ns/iter` | `  7.06 ns` | `  7.57 ns` | ` 13.30 ns` | ` 73.71 ns` |
| Ok.err()               | `  7.56 ns/iter` | `  6.46 ns` | `  7.06 ns` | ` 12.81 ns` | ` 78.06 ns` |
| Err.err()              | `  9.91 ns/iter` | `  8.43 ns` | `  9.38 ns` | ` 53.07 ns` | ` 76.44 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | `  9.12 ns/iter` | `  8.16 ns` | `  8.79 ns` | ` 13.29 ns` | ` 71.37 ns` |
| Err.map (reuse)       | `  6.87 ns/iter` | `  6.10 ns` | `  6.88 ns` | `  8.36 ns` | ` 13.52 ns` |
| Ok.mapOr              | `  4.26 ns/iter` | `  3.95 ns` | `  4.31 ns` | `  5.41 ns` | ` 11.78 ns` |
| Err.mapOr             | `  4.88 ns/iter` | `  4.57 ns` | `  4.92 ns` | `  6.06 ns` | ` 15.76 ns` |
| Ok.mapOrElse          | `  7.34 ns/iter` | `  6.61 ns` | `  7.04 ns` | ` 15.34 ns` | ` 86.14 ns` |
| Err.mapOrElse         | `  8.64 ns/iter` | `  7.88 ns` | `  8.44 ns` | ` 12.12 ns` | ` 89.76 ns` |
| Ok.mapErr (reuse)     | `  6.15 ns/iter` | `  5.51 ns` | `  6.16 ns` | `  7.88 ns` | ` 16.48 ns` |
| Err.mapErr (alloc)    | `  9.30 ns/iter` | `  8.22 ns` | `  8.83 ns` | ` 26.83 ns` | ` 65.92 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  5.01 ns/iter` | `  4.52 ns` | `  4.87 ns` | `  7.73 ns` | ` 68.78 ns` |
| Err.inspect               | `  6.07 ns/iter` | `  5.52 ns` | `  5.94 ns` | `  8.83 ns` | ` 64.47 ns` |
| Ok.inspectErr             | `  4.00 ns/iter` | `  3.77 ns` | `  4.07 ns` | `  5.09 ns` | ` 15.55 ns` |
| Err.inspectErr            | `  5.05 ns/iter` | `  4.49 ns` | `  4.82 ns` | ` 13.49 ns` | ` 64.16 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  3.90 ns/iter` | `  3.69 ns` | `  3.90 ns` | `  5.03 ns` | ` 12.33 ns` |
| Err.unwrapErr            | `  3.94 ns/iter` | `  3.70 ns` | `  3.96 ns` | `  5.03 ns` | ` 15.12 ns` |
| Ok.expect                | `  3.93 ns/iter` | `  3.67 ns` | `  3.96 ns` | `  5.14 ns` | ` 16.24 ns` |
| Err.expectErr            | `  5.94 ns/iter` | `  5.70 ns` | `  5.93 ns` | `  7.34 ns` | ` 13.26 ns` |
| Ok.unwrapOr              | `  4.17 ns/iter` | `  3.95 ns` | `  4.19 ns` | `  5.42 ns` | ` 11.74 ns` |
| Err.unwrapOr             | `  4.00 ns/iter` | `  3.77 ns` | `  4.07 ns` | `  5.27 ns` | `  8.85 ns` |
| Ok.unwrapOrElse          | `  3.93 ns/iter` | `  3.69 ns` | `  3.96 ns` | `  5.05 ns` | ` 19.34 ns` |
| Err.unwrapOrElse         | `  6.13 ns/iter` | `  5.52 ns` | `  5.86 ns` | ` 14.96 ns` | ` 66.02 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  5.55 ns/iter` | `  5.03 ns` | `  5.74 ns` | `  6.76 ns` | ` 12.79 ns` |
| Err.and (reuse)        | `  5.43 ns/iter` | `  4.97 ns` | `  5.52 ns` | `  6.70 ns` | ` 10.85 ns` |
| Ok.andThen (alloc)     | ` 11.86 ns/iter` | ` 10.06 ns` | ` 11.26 ns` | ` 43.27 ns` | ` 76.14 ns` |
| Err.andThen (alloc)    | `  4.85 ns/iter` | `  4.55 ns` | `  4.87 ns` | `  6.75 ns` | ` 15.85 ns` |
| Ok.or (reuse)          | `  5.30 ns/iter` | `  4.97 ns` | `  5.33 ns` | `  6.62 ns` | ` 13.34 ns` |
| Err.or (reuse)         | `  5.36 ns/iter` | `  4.97 ns` | `  5.45 ns` | `  6.66 ns` | ` 10.89 ns` |
| Ok.orElse (alloc)      | `  4.17 ns/iter` | `  3.84 ns` | `  4.20 ns` | `  5.39 ns` | ` 20.13 ns` |
| Err.orElse (alloc)     | `  5.07 ns/iter` | `  4.54 ns` | `  4.85 ns` | ` 13.41 ns` | ` 62.54 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  6.48 ns/iter` | `  6.10 ns` | `  6.53 ns` | `  7.78 ns` | ` 16.51 ns` |
| Ok(Some).transpose                     | ` 27.18 ns/iter` | ` 23.58 ns` | ` 24.98 ns` | ` 85.25 ns` | `187.23 ns` |
| Ok(None).transpose                     | ` 18.73 ns/iter` | ` 16.15 ns` | ` 17.84 ns` | ` 71.72 ns` | ` 83.41 ns` |
| Err.transpose                          | ` 19.61 ns/iter` | ` 17.30 ns` | ` 18.50 ns` | ` 72.06 ns` | ` 86.18 ns` |
| Ok.match                               | `  7.35 ns/iter` | `  6.38 ns` | `  7.71 ns` | ` 10.54 ns` | ` 90.35 ns` |
| Err.match                              | `  9.04 ns/iter` | `  8.22 ns` | `  8.92 ns` | ` 11.87 ns` | ` 92.53 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 10.49 ns/iter` | `  8.86 ns` | ` 10.04 ns` | ` 26.70 ns` | `105.96 ns` |
| Err.iter        | `  6.04 ns/iter` | `  5.80 ns` | `  5.98 ns` | `  7.41 ns` | ` 18.46 ns` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 14.37 ns/iter` | ` 12.01 ns` | ` 13.46 ns` | ` 66.94 ns` | `113.01 ns` |
| catchUnwind (call only, Ok)    | `  7.62 ns/iter` | `  5.73 ns` | ` 10.18 ns` | ` 14.06 ns` | ` 88.54 ns` |
| catchUnwind (wrap + call, Err) | `700.70 ns/iter` | `657.29 ns` | `693.40 ns` | `906.73 ns` | `932.77 ns` |
| catchUnwind (call only, catch) | `672.41 ns/iter` | `522.26 ns` | `691.32 ns` | `762.26 ns` | `798.39 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  4.01 ns/iter` | `  3.88 ns` | `  4.07 ns` | `  5.15 ns` | ` 12.59 ns` |
| None.isSome()         | `  4.42 ns/iter` | `  4.18 ns` | `  4.43 ns` | `  5.55 ns` | `  9.72 ns` |
| Some.isNone()         | `  4.97 ns/iter` | `  4.72 ns` | `  4.91 ns` | `  6.19 ns` | `  9.36 ns` |
| None.isNone()         | `  3.73 ns/iter` | `  3.44 ns` | `  3.77 ns` | `  4.93 ns` | `  9.12 ns` |
| Some.isSomeAnd (true) | `  3.81 ns/iter` | `  3.64 ns` | `  3.89 ns` | `  4.89 ns` | ` 17.33 ns` |
| None.isSomeAnd        | `  4.82 ns/iter` | `  4.60 ns` | `  4.85 ns` | `  5.93 ns` | ` 18.30 ns` |
| Some.isNoneOr (true)  | `  3.99 ns/iter` | `  3.65 ns` | `  4.07 ns` | `  5.11 ns` | ` 13.56 ns` |
| None.isNoneOr         | `  4.76 ns/iter` | `  4.54 ns` | `  4.79 ns` | `  5.87 ns` | ` 19.10 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  3.69 ns/iter` | `  3.41 ns` | `  3.76 ns` | `  4.82 ns` | `  7.30 ns` |
| Some.expect              | `  3.69 ns/iter` | `  3.41 ns` | `  3.71 ns` | `  4.85 ns` | ` 13.12 ns` |
| Some.unwrapOr            | `  3.72 ns/iter` | `  3.42 ns` | `  3.78 ns` | `  4.91 ns` | `  8.28 ns` |
| None.unwrapOr            | `  3.86 ns/iter` | `  3.64 ns` | `  3.90 ns` | `  5.07 ns` | ` 12.90 ns` |
| Some.unwrapOrElse        | `  5.22 ns/iter` | `  4.60 ns` | `  4.97 ns` | ` 14.02 ns` | ` 65.13 ns` |
| None.unwrapOrElse        | `  5.70 ns/iter` | `  5.28 ns` | `  5.58 ns` | `  8.44 ns` | ` 92.74 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | `  9.49 ns/iter` | `  8.14 ns` | `  9.09 ns` | ` 14.82 ns` | ` 76.55 ns` |
| None.map (alloc)      | `  5.06 ns/iter` | `  4.54 ns` | `  5.32 ns` | `  6.24 ns` | ` 18.17 ns` |
| Some.mapOr            | `  3.92 ns/iter` | `  3.59 ns` | `  3.96 ns` | `  5.12 ns` | ` 12.44 ns` |
| None.mapOr            | `  4.73 ns/iter` | `  4.36 ns` | `  4.79 ns` | `  5.90 ns` | ` 16.32 ns` |
| Some.mapOrElse        | `  7.38 ns/iter` | `  6.41 ns` | `  7.13 ns` | ` 16.49 ns` | `100.83 ns` |
| None.mapOrElse        | `  8.31 ns/iter` | `  7.48 ns` | `  8.17 ns` | ` 11.86 ns` | `105.02 ns` |
| Some.inspect          | `  4.74 ns/iter` | `  4.23 ns` | `  4.64 ns` | `  7.63 ns` | ` 67.14 ns` |
| None.inspect          | `  5.77 ns/iter` | `  5.17 ns` | `  5.65 ns` | `  8.73 ns` | ` 91.09 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | `  7.02 ns/iter` | `  6.24 ns` | `  6.77 ns` | ` 10.58 ns` | ` 71.40 ns` |
| None.okOr              | `  7.95 ns/iter` | `  7.17 ns` | `  7.70 ns` | ` 11.62 ns` | ` 74.68 ns` |
| Some.okOrElse          | ` 10.27 ns/iter` | `  9.23 ns` | `  9.86 ns` | ` 15.30 ns` | ` 72.85 ns` |
| None.okOrElse          | ` 10.91 ns/iter` | `  9.72 ns` | ` 10.55 ns` | ` 15.85 ns` | ` 73.10 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  5.55 ns/iter` | `  4.78 ns` | `  6.03 ns` | `  6.79 ns` | ` 13.76 ns` |
| None.and (alloc)           | `  5.55 ns/iter` | `  4.78 ns` | `  6.04 ns` | `  6.90 ns` | `  9.68 ns` |
| Some.andThen (alloc)       | ` 13.82 ns/iter` | ` 12.13 ns` | ` 12.88 ns` | ` 62.56 ns` | `101.03 ns` |
| None.andThen (alloc)       | `  4.68 ns/iter` | `  4.36 ns` | `  4.79 ns` | `  5.91 ns` | ` 22.71 ns` |
| Some.filter (true, reuse)  | `  4.71 ns/iter` | `  4.14 ns` | `  4.50 ns` | ` 13.52 ns` | ` 67.26 ns` |
| Some.filter (false, alloc) | `  8.70 ns/iter` | `  7.87 ns` | `  8.27 ns` | ` 13.66 ns` | ` 76.72 ns` |
| None.filter (alloc)        | `  4.74 ns/iter` | `  4.36 ns` | `  5.02 ns` | `  5.88 ns` | ` 17.01 ns` |
| Some.or (reuse)            | `  5.61 ns/iter` | `  4.78 ns` | `  6.04 ns` | `  6.91 ns` | ` 16.18 ns` |
| None.or (reuse/optb)       | `  5.60 ns/iter` | `  4.78 ns` | `  6.03 ns` | `  6.91 ns` | ` 15.12 ns` |
| Some.orElse (reuse)        | `  4.15 ns/iter` | `  3.82 ns` | `  4.19 ns` | `  5.27 ns` | ` 19.69 ns` |
| None.orElse (alloc)        | `  6.18 ns/iter` | `  5.56 ns` | `  5.92 ns` | ` 15.18 ns` | ` 91.36 ns` |
| Some xor None (reuse)      | `  6.65 ns/iter` | `  6.04 ns` | `  6.52 ns` | `  8.18 ns` | ` 15.44 ns` |
| None xor Some (reuse/optb) | `  6.75 ns/iter` | `  6.22 ns` | `  6.76 ns` | `  8.18 ns` | ` 13.14 ns` |
| Some xor Some (alloc)      | `  9.51 ns/iter` | `  8.51 ns` | `  9.03 ns` | ` 26.74 ns` | ` 72.26 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 11.68 ns/iter` | ` 10.53 ns` | ` 11.08 ns` | ` 25.96 ns` | ` 76.43 ns` |
| None.insert                     | `  9.83 ns/iter` | `  8.40 ns` | `  9.55 ns` | ` 14.47 ns` | ` 75.87 ns` |
| Some.getOrInsert (existing)     | `  9.69 ns/iter` | `  8.17 ns` | `  9.35 ns` | ` 14.16 ns` | ` 79.28 ns` |
| None.getOrInsert (insert)       | ` 10.22 ns/iter` | `  9.02 ns` | `  9.90 ns` | ` 15.27 ns` | ` 70.98 ns` |
| Some.getOrInsertWith (existing) | ` 13.00 ns/iter` | ` 11.54 ns` | ` 12.49 ns` | ` 19.08 ns` | ` 77.44 ns` |
| None.getOrInsertWith (insert)   | ` 14.09 ns/iter` | ` 12.38 ns` | ` 13.67 ns` | ` 28.69 ns` | ` 84.55 ns` |
| Some.take                       | ` 18.90 ns/iter` | ` 15.92 ns` | ` 18.35 ns` | ` 74.08 ns` | ` 88.89 ns` |
| None.take                       | ` 14.04 ns/iter` | ` 12.10 ns` | ` 13.66 ns` | ` 21.99 ns` | ` 76.61 ns` |
| Some.takeIf (true)              | ` 20.62 ns/iter` | ` 17.81 ns` | ` 19.91 ns` | ` 76.01 ns` | ` 89.98 ns` |
| Some.takeIf (false)             | ` 18.11 ns/iter` | ` 15.65 ns` | ` 17.41 ns` | ` 72.24 ns` | ` 91.60 ns` |
| Some.replace                    | ` 20.76 ns/iter` | ` 18.23 ns` | ` 19.95 ns` | ` 76.99 ns` | ` 93.04 ns` |
| None.replace                    | ` 16.87 ns/iter` | ` 14.65 ns` | ` 16.52 ns` | ` 68.09 ns` | ` 85.36 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  6.04 ns/iter` | `  5.74 ns` | `  6.04 ns` | `  7.19 ns` | ` 14.68 ns` |
| Some(Ok).transpose                             | ` 27.48 ns/iter` | ` 23.56 ns` | ` 25.52 ns` | ` 88.66 ns` | `140.18 ns` |
| Some(Err).transpose                            | ` 21.41 ns/iter` | ` 18.93 ns` | ` 20.48 ns` | ` 77.48 ns` | ` 99.95 ns` |
| None.transpose                                 | ` 18.25 ns/iter` | ` 16.05 ns` | ` 17.68 ns` | ` 71.65 ns` | ` 84.82 ns` |
| Some.unzip                                     | ` 29.12 ns/iter` | ` 25.99 ns` | ` 27.12 ns` | ` 91.88 ns` | `164.90 ns` |
| None.unzip                                     | ` 21.50 ns/iter` | ` 19.15 ns` | ` 20.42 ns` | ` 77.83 ns` | ` 91.22 ns` |
| Some.match                                     | `  9.24 ns/iter` | `  8.25 ns` | `  9.07 ns` | ` 13.14 ns` | ` 74.08 ns` |
| None.match                                     | `  9.74 ns/iter` | `  8.79 ns` | `  9.50 ns` | ` 13.78 ns` | ` 76.92 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | `  9.37 ns/iter` | `  8.12 ns` | `  9.03 ns` | ` 15.06 ns` | ` 76.89 ns` |
| None.iter       | `  4.65 ns/iter` | `  4.36 ns` | `  4.67 ns` | `  5.86 ns` | ` 23.16 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `169.56 ns/iter` | `158.91 ns` | `164.27 ns` | `288.35 ns` | `375.01 ns` |
| AsyncResult.unwrap (Err path)    | `167.67 ns/iter` | `159.76 ns` | `166.66 ns` | `253.95 ns` | `258.52 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `120.44 ns/iter` | `114.66 ns` | `119.98 ns` | `193.79 ns` | `231.92 ns` |
| Result.mapOrElseAsync (Err path)    | `120.92 ns/iter` | `115.73 ns` | `120.82 ns` | `184.13 ns` | `209.46 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `129.01 ns/iter` | `123.54 ns` | `128.87 ns` | `190.74 ns` | `214.42 ns` |
| Result.unwrapOrElseAsync (Err path) | `120.95 ns/iter` | `114.77 ns` | `120.66 ns` | `183.28 ns` | `215.50 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `400.18 ns/iter` | `388.81 ns` | `397.14 ns` | `487.75 ns` | `504.89 ns` |
| Err.mapAsync (alloc AsyncResult)        | `253.78 ns/iter` | `246.80 ns` | `250.81 ns` | `335.07 ns` | `395.06 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `250.84 ns/iter` | `244.15 ns` | `248.24 ns` | `326.43 ns` | `412.58 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `398.63 ns/iter` | `387.82 ns` | `395.08 ns` | `481.53 ns` | `554.88 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `404.58 ns/iter` | `392.54 ns` | `400.77 ns` | `483.24 ns` | `598.40 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `244.76 ns/iter` | `236.71 ns` | `242.35 ns` | `330.01 ns` | `378.96 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `245.70 ns/iter` | `238.78 ns` | `244.10 ns` | `320.03 ns` | `345.20 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `406.22 ns/iter` | `396.22 ns` | `403.45 ns` | `477.16 ns` | `517.60 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `352.03 ns/iter` | `342.68 ns` | `349.11 ns` | `438.75 ns` | `473.96 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `251.42 ns/iter` | `244.80 ns` | `248.28 ns` | `344.84 ns` | `408.28 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `251.91 ns/iter` | `245.65 ns` | `249.51 ns` | `335.04 ns` | `402.24 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `351.92 ns/iter` | `342.50 ns` | `349.30 ns` | `437.42 ns` | `488.37 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `234.72 ns/iter` | `227.77 ns` | `233.25 ns` | `306.98 ns` | `365.43 ns` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `438.61 ns/iter` | `425.02 ns` | `435.39 ns` | `524.40 ns` | `549.83 ns` |
| catchUnwindAsync (call only, Ok)       | `430.75 ns/iter` | `419.37 ns` | `428.81 ns` | `515.56 ns` | `541.86 ns` |
| catchUnwindAsync (wrap + call, reject) | `764.79 ns/iter` | `726.17 ns` | `745.02 ns` | `  1.16 µs` | `  1.24 µs` |
| catchUnwindAsync (call only, reject)   | `723.40 ns/iter` | `688.00 ns` | `719.42 ns` | `833.73 ns` | `918.29 ns` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `172.04 ns/iter` | `164.80 ns` | `171.66 ns` | `237.14 ns` | `261.08 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.11 µs/iter` | `977.73 ns` | `  1.10 µs` | `  1.38 µs` | `  1.40 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `132.11 ns/iter` | `125.82 ns` | `131.34 ns` | `199.99 ns` | `228.84 ns` |
| Option.mapOrElseAsync (None path)    | `130.24 ns/iter` | `124.37 ns` | `129.77 ns` | `201.88 ns` | `221.64 ns` |
| Option.unwrapOrElseAsync (Some path) | `136.99 ns/iter` | `130.49 ns` | `136.51 ns` | `216.10 ns` | `241.84 ns` |
| Option.unwrapOrElseAsync (None path) | `128.72 ns/iter` | `122.59 ns` | `128.41 ns` | `196.67 ns` | `222.69 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `404.76 ns/iter` | `392.78 ns` | `400.50 ns` | `492.22 ns` | `517.80 ns` |
| None.mapAsync (alloc AsyncOption)         | `254.13 ns/iter` | `247.94 ns` | `251.97 ns` | `334.25 ns` | `359.04 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `403.97 ns/iter` | `393.15 ns` | `400.04 ns` | `493.80 ns` | `643.77 ns` |
| None.inspectAsync (alloc AsyncOption)     | `250.79 ns/iter` | `244.06 ns` | `248.28 ns` | `342.38 ns` | `385.63 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `359.00 ns/iter` | `349.41 ns` | `356.69 ns` | `434.23 ns` | `449.76 ns` |
| None.andThenAsync (alloc AsyncOption)     | `252.89 ns/iter` | `246.62 ns` | `250.81 ns` | `323.26 ns` | `364.51 ns` |
| Some.filterAsync true (alloc AsyncOption) | `393.52 ns/iter` | `384.36 ns` | `391.21 ns` | `450.88 ns` | `477.36 ns` |
| None.filterAsync (alloc AsyncOption)      | `252.03 ns/iter` | `245.81 ns` | `250.18 ns` | `310.79 ns` | `353.26 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `246.94 ns/iter` | `240.39 ns` | `245.41 ns` | `311.00 ns` | `342.04 ns` |
| None.orElseAsync (alloc AsyncOption)      | `353.69 ns/iter` | `344.29 ns` | `351.84 ns` | `417.94 ns` | `453.59 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `253.30 ns/iter` | `245.22 ns` | `249.73 ns` | `355.17 ns` | `391.20 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `393.23 ns/iter` | `382.70 ns` | `391.18 ns` | `476.92 ns` | `491.28 ns` |
| Some.getOrInsertWithAsync (existing)      | `137.94 ns/iter` | `131.60 ns` | `137.32 ns` | `215.25 ns` | `293.86 ns` |
| None.getOrInsertWithAsync (insert)        | `389.13 ns/iter` | `378.11 ns` | `385.61 ns` | `473.36 ns` | `491.50 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `238.08 ns/iter` | `231.41 ns` | `236.66 ns` | `307.30 ns` | `351.55 ns` |
