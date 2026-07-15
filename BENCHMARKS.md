# Benchmarks

clk: ~3.60 GHz
cpu: 13th Gen Intel(R) Core(TM) i7-13650HX
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  8.90 ns/iter` | `  5.30 ns` | `  8.86 ns` | ` 23.21 ns` | `261.90 ns` |
| Err(1)         | `  8.11 ns/iter` | `  5.22 ns` | `  8.80 ns` | ` 14.06 ns` | `167.62 ns` |
| Some(1)        | ` 11.73 ns/iter` | `  7.54 ns` | ` 12.50 ns` | ` 35.12 ns` | `294.70 ns` |
| None()         | `  9.08 ns/iter` | `  5.32 ns` | `  9.34 ns` | ` 17.88 ns` | `245.62 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  3.37 ns/iter` | ` 75.20 ps` | `  7.79 ns` | ` 12.20 ns` | ` 68.24 ns` |
| Err.isOk()          | `  8.93 ns/iter` | `  8.17 ns` | `  8.57 ns` | ` 13.12 ns` | ` 15.62 ns` |
| Ok.isErr()          | `  9.61 ns/iter` | `  8.58 ns` | `  9.10 ns` | ` 14.80 ns` | ` 51.47 ns` |
| Err.isErr()         | ` 10.14 ns/iter` | `  9.44 ns` | `  9.75 ns` | ` 15.42 ns` | ` 43.80 ns` |
| Ok.isOkAnd (true)   | `  3.94 ns/iter` | `  3.35 ns` | `  3.54 ns` | `  8.47 ns` | ` 65.13 ns` |
| Err.isOkAnd         | `  4.94 ns/iter` | `  4.37 ns` | `  4.64 ns` | `  9.22 ns` | ` 65.89 ns` |
| Ok.isErrAnd         | `  4.01 ns/iter` | `  3.22 ns` | `  4.76 ns` | `  7.55 ns` | ` 29.27 ns` |
| Err.isErrAnd (true) | `  5.86 ns/iter` | `  4.81 ns` | `  5.38 ns` | `  9.21 ns` | ` 53.29 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 15.48 ns/iter` | ` 10.49 ns` | ` 17.40 ns` | ` 54.26 ns` | `292.11 ns` |
| Err.ok()               | ` 12.58 ns/iter` | `  9.48 ns` | ` 13.15 ns` | ` 24.96 ns` | `253.73 ns` |
| Ok.err()               | ` 12.13 ns/iter` | `  8.98 ns` | ` 11.14 ns` | ` 25.27 ns` | `288.50 ns` |
| Err.err()              | ` 15.31 ns/iter` | ` 11.28 ns` | ` 14.61 ns` | ` 31.75 ns` | `299.52 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 13.56 ns/iter` | ` 10.04 ns` | ` 14.98 ns` | ` 27.66 ns` | `354.37 ns` |
| Err.map (reuse)       | `  8.58 ns/iter` | `  7.15 ns` | `  7.83 ns` | ` 15.52 ns` | ` 61.30 ns` |
| Ok.mapOr              | `  5.90 ns/iter` | `  4.80 ns` | `  5.20 ns` | ` 10.15 ns` | ` 70.59 ns` |
| Err.mapOr             | `  6.74 ns/iter` | `  5.49 ns` | `  6.39 ns` | ` 11.25 ns` | ` 79.81 ns` |
| Ok.mapOrElse          | `  9.85 ns/iter` | `  7.41 ns` | `  8.99 ns` | ` 19.13 ns` | `170.43 ns` |
| Err.mapOrElse         | ` 10.76 ns/iter` | `  9.21 ns` | ` 10.16 ns` | ` 19.87 ns` | `155.98 ns` |
| Ok.mapErr (reuse)     | `  7.28 ns/iter` | `  6.09 ns` | `  6.74 ns` | ` 13.96 ns` | ` 50.15 ns` |
| Err.mapErr (alloc)    | ` 13.60 ns/iter` | `  9.92 ns` | ` 13.29 ns` | ` 52.45 ns` | `270.85 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  6.93 ns/iter` | `  5.58 ns` | `  6.56 ns` | ` 12.16 ns` | `222.82 ns` |
| Err.inspect               | `  8.20 ns/iter` | `  6.56 ns` | `  7.31 ns` | ` 14.02 ns` | `283.66 ns` |
| Ok.inspectErr             | `  6.82 ns/iter` | `  4.95 ns` | `  8.63 ns` | `  9.57 ns` | ` 76.10 ns` |
| Err.inspectErr            | `  7.75 ns/iter` | `  5.56 ns` | `  9.07 ns` | ` 27.64 ns` | `185.57 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  5.65 ns/iter` | `  4.73 ns` | `  5.26 ns` | `  9.02 ns` | ` 42.58 ns` |
| Err.unwrapErr            | `  5.94 ns/iter` | `  4.65 ns` | `  7.96 ns` | `  9.19 ns` | ` 38.48 ns` |
| Ok.expect                | `  6.11 ns/iter` | `  4.67 ns` | `  8.34 ns` | `  9.09 ns` | ` 15.99 ns` |
| Err.expectErr            | `  7.49 ns/iter` | `  6.49 ns` | `  6.81 ns` | ` 13.10 ns` | `165.31 ns` |
| Ok.unwrapOr              | `  5.78 ns/iter` | `  4.76 ns` | `  5.44 ns` | `  9.94 ns` | ` 56.42 ns` |
| Err.unwrapOr             | `  5.78 ns/iter` | `  5.17 ns` | `  5.52 ns` | `  9.24 ns` | ` 40.36 ns` |
| Ok.unwrapOrElse          | `  5.05 ns/iter` | `  4.62 ns` | `  4.79 ns` | `  8.06 ns` | ` 14.58 ns` |
| Err.unwrapOrElse         | `  8.53 ns/iter` | `  6.61 ns` | `  8.06 ns` | ` 21.95 ns` | `217.10 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  6.63 ns/iter` | `  5.90 ns` | `  6.26 ns` | ` 12.28 ns` | ` 41.18 ns` |
| Err.and (reuse)        | `  6.72 ns/iter` | `  5.91 ns` | `  6.29 ns` | ` 12.35 ns` | ` 17.93 ns` |
| Ok.andThen (alloc)     | ` 17.10 ns/iter` | ` 12.58 ns` | ` 16.46 ns` | ` 43.46 ns` | `391.14 ns` |
| Err.andThen (alloc)    | `  6.14 ns/iter` | `  5.34 ns` | `  5.70 ns` | ` 10.98 ns` | ` 39.55 ns` |
| Ok.or (reuse)          | `  6.89 ns/iter` | `  6.02 ns` | `  6.23 ns` | ` 12.51 ns` | ` 78.47 ns` |
| Err.or (reuse)         | `  6.91 ns/iter` | `  6.02 ns` | `  6.32 ns` | ` 12.45 ns` | `172.84 ns` |
| Ok.orElse (alloc)      | `  5.72 ns/iter` | `  4.93 ns` | `  5.20 ns` | ` 11.37 ns` | `158.13 ns` |
| Err.orElse (alloc)     | `  7.30 ns/iter` | `  5.58 ns` | `  7.01 ns` | ` 17.25 ns` | `230.16 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | `  8.83 ns/iter` | `  7.68 ns` | `  8.10 ns` | ` 16.41 ns` | ` 53.41 ns` |
| Ok(Some).transpose                     | ` 42.41 ns/iter` | ` 31.12 ns` | ` 44.11 ns` | `145.26 ns` | `362.80 ns` |
| Ok(None).transpose                     | ` 29.74 ns/iter` | ` 21.63 ns` | ` 32.08 ns` | ` 78.39 ns` | `482.11 ns` |
| Err.transpose                          | ` 35.13 ns/iter` | ` 24.68 ns` | ` 37.14 ns` | `126.25 ns` | `415.26 ns` |
| Ok.match                               | ` 10.76 ns/iter` | `  8.23 ns` | `  9.98 ns` | ` 25.32 ns` | `291.42 ns` |
| Err.match                              | ` 11.57 ns/iter` | `  9.64 ns` | ` 10.92 ns` | ` 20.96 ns` | `196.72 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 15.76 ns/iter` | ` 11.13 ns` | ` 15.05 ns` | ` 34.32 ns` | `328.41 ns` |
| Err.iter        | `  7.02 ns/iter` | `  5.62 ns` | `  6.50 ns` | ` 11.50 ns` | ` 97.54 ns` |

| • Result - tryBlock   | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| tryBlock (Ok path)    | `766.85 ns/iter` | `311.00 ns` | `625.00 ns` | `  3.45 µs` | `  2.42 ms` |
| tryBlock (first Err)  | `415.04 ns/iter` | `298.28 ns` | `396.26 ns` | `913.56 ns` | `  1.68 µs` |
| tryBlock (second Err) | `452.97 ns/iter` | `331.90 ns` | `439.53 ns` | `848.07 ns` | `  1.33 µs` |

| • Result - catchUnwind         | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwind (wrap + call, Ok)  | ` 19.23 ns/iter` | ` 14.30 ns` | ` 20.19 ns` | ` 53.18 ns` | `318.57 ns` |
| catchUnwind (call only, Ok)    | ` 10.11 ns/iter` | `  6.21 ns` | ` 11.07 ns` | ` 17.50 ns` | `260.19 ns` |
| catchUnwind (wrap + call, Err) | `868.20 ns/iter` | `717.92 ns` | `915.37 ns` | `  1.46 µs` | `  1.46 µs` |
| catchUnwind (call only, catch) | `836.91 ns/iter` | `563.49 ns` | `886.23 ns` | `  1.39 µs` | `  1.40 µs` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.09 ns/iter` | `  2.03 ns` | `  8.92 ns` | ` 12.58 ns` | ` 15.54 ns` |
| None.isSome()         | ` 10.48 ns/iter` | `  9.01 ns` | ` 10.42 ns` | ` 16.09 ns` | ` 54.53 ns` |
| Some.isNone()         | `  6.67 ns/iter` | `  4.95 ns` | `  8.76 ns` | `  9.97 ns` | ` 50.74 ns` |
| None.isNone()         | `  4.83 ns/iter` | `  3.43 ns` | `  5.05 ns` | `  9.41 ns` | ` 41.20 ns` |
| Some.isSomeAnd (true) | `  3.64 ns/iter` | `  2.39 ns` | `  5.09 ns` | `  8.26 ns` | ` 39.65 ns` |
| None.isSomeAnd        | `  5.51 ns/iter` | `  4.39 ns` | `  4.89 ns` | ` 10.04 ns` | ` 64.92 ns` |
| Some.isNoneOr (true)  | `  6.02 ns/iter` | `  4.66 ns` | `  7.78 ns` | `  9.97 ns` | ` 42.95 ns` |
| None.isNoneOr         | `  7.67 ns/iter` | `  5.59 ns` | `  9.50 ns` | ` 12.62 ns` | ` 43.64 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.46 ns/iter` | `  5.29 ns` | `  5.70 ns` | ` 11.45 ns` | ` 41.62 ns` |
| Some.expect              | `  7.17 ns/iter` | `  6.22 ns` | `  6.54 ns` | ` 12.32 ns` | ` 70.97 ns` |
| Some.unwrapOr            | `  5.03 ns/iter` | `  4.37 ns` | `  4.50 ns` | ` 10.18 ns` | ` 50.64 ns` |
| None.unwrapOr            | `  5.84 ns/iter` | `  4.36 ns` | `  8.87 ns` | `  9.77 ns` | ` 12.63 ns` |
| Some.unwrapOrElse        | `  8.19 ns/iter` | `  5.57 ns` | `  9.74 ns` | ` 22.86 ns` | `190.77 ns` |
| None.unwrapOrElse        | `  7.94 ns/iter` | `  6.07 ns` | `  8.32 ns` | ` 18.61 ns` | `216.07 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 14.85 ns/iter` | ` 10.25 ns` | ` 16.54 ns` | ` 34.90 ns` | `271.58 ns` |
| None.map (alloc)      | `  6.39 ns/iter` | `  5.23 ns` | `  5.81 ns` | ` 11.46 ns` | ` 65.41 ns` |
| Some.mapOr            | `  5.37 ns/iter` | `  4.37 ns` | `  4.90 ns` | ` 10.18 ns` | ` 54.93 ns` |
| None.mapOr            | `  6.17 ns/iter` | `  5.22 ns` | `  5.55 ns` | ` 11.74 ns` | `151.29 ns` |
| Some.mapOrElse        | `  9.75 ns/iter` | `  7.44 ns` | `  8.97 ns` | ` 20.57 ns` | `238.74 ns` |
| None.mapOrElse        | ` 10.83 ns/iter` | `  8.81 ns` | ` 10.08 ns` | ` 20.15 ns` | `187.36 ns` |
| Some.inspect          | `  6.84 ns/iter` | `  5.09 ns` | `  6.47 ns` | ` 14.29 ns` | `260.99 ns` |
| None.inspect          | `  8.00 ns/iter` | `  6.24 ns` | `  7.34 ns` | ` 17.42 ns` | `365.69 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 10.05 ns/iter` | `  7.91 ns` | ` 10.33 ns` | ` 16.61 ns` | `296.44 ns` |
| None.okOr              | ` 11.13 ns/iter` | `  8.50 ns` | ` 10.95 ns` | ` 17.74 ns` | `295.73 ns` |
| Some.okOrElse          | ` 15.74 ns/iter` | ` 11.83 ns` | ` 17.14 ns` | ` 29.84 ns` | `254.73 ns` |
| None.okOrElse          | ` 16.79 ns/iter` | ` 13.10 ns` | ` 16.86 ns` | ` 27.42 ns` | `191.35 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.66 ns/iter` | `  5.95 ns` | `  6.90 ns` | ` 13.66 ns` | ` 41.78 ns` |
| None.and (alloc)           | `  7.62 ns/iter` | `  5.95 ns` | `  9.50 ns` | ` 13.37 ns` | ` 96.67 ns` |
| Some.andThen (alloc)       | ` 20.73 ns/iter` | ` 15.68 ns` | ` 20.12 ns` | ` 62.47 ns` | `315.12 ns` |
| None.andThen (alloc)       | `  6.19 ns/iter` | `  5.15 ns` | `  5.56 ns` | ` 11.52 ns` | ` 78.44 ns` |
| Some.filter (true, reuse)  | `  7.18 ns/iter` | `  5.10 ns` | `  7.14 ns` | ` 22.87 ns` | `206.17 ns` |
| Some.filter (false, alloc) | ` 13.76 ns/iter` | ` 10.52 ns` | ` 14.18 ns` | ` 27.92 ns` | `311.60 ns` |
| None.filter (alloc)        | `  6.34 ns/iter` | `  5.16 ns` | `  5.61 ns` | ` 11.42 ns` | `101.37 ns` |
| Some.or (reuse)            | `  7.39 ns/iter` | `  6.21 ns` | `  6.48 ns` | ` 14.16 ns` | ` 95.99 ns` |
| None.or (reuse/optb)       | `  7.33 ns/iter` | `  6.02 ns` | `  6.48 ns` | ` 13.66 ns` | ` 49.62 ns` |
| Some.orElse (reuse)        | `  5.68 ns/iter` | `  4.51 ns` | `  5.04 ns` | ` 10.19 ns` | ` 59.04 ns` |
| None.orElse (alloc)        | `  9.55 ns/iter` | `  6.80 ns` | ` 12.21 ns` | ` 18.73 ns` | `192.56 ns` |
| Some xor None (reuse)      | ` 11.44 ns/iter` | `  9.65 ns` | ` 10.47 ns` | ` 20.89 ns` | ` 73.26 ns` |
| None xor Some (reuse/optb) | `  8.72 ns/iter` | `  7.40 ns` | `  7.94 ns` | ` 16.12 ns` | ` 50.78 ns` |
| Some xor Some (alloc)      | ` 16.64 ns/iter` | ` 12.72 ns` | ` 14.57 ns` | ` 51.56 ns` | `187.21 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 22.81 ns/iter` | ` 13.96 ns` | ` 28.83 ns` | ` 59.18 ns` | `232.83 ns` |
| None.insert                     | ` 15.79 ns/iter` | ` 10.82 ns` | ` 17.23 ns` | ` 37.61 ns` | `237.12 ns` |
| Some.getOrInsert (existing)     | ` 15.41 ns/iter` | ` 10.04 ns` | ` 15.70 ns` | ` 44.14 ns` | `281.99 ns` |
| None.getOrInsert (insert)       | ` 15.29 ns/iter` | ` 11.55 ns` | ` 15.22 ns` | ` 35.61 ns` | `202.81 ns` |
| Some.getOrInsertWith (existing) | ` 22.26 ns/iter` | ` 12.62 ns` | ` 27.49 ns` | ` 52.36 ns` | `238.94 ns` |
| None.getOrInsertWith (insert)   | ` 21.17 ns/iter` | ` 13.79 ns` | ` 22.91 ns` | ` 49.38 ns` | `232.83 ns` |
| Some.take                       | ` 28.56 ns/iter` | ` 18.02 ns` | ` 31.04 ns` | ` 66.66 ns` | `227.50 ns` |
| None.take                       | ` 24.90 ns/iter` | ` 14.06 ns` | ` 29.98 ns` | ` 58.72 ns` | `241.89 ns` |
| Some.takeIf (true)              | ` 31.12 ns/iter` | ` 20.45 ns` | ` 33.17 ns` | ` 90.91 ns` | `231.27 ns` |
| Some.takeIf (false)             | `108.13 ns/iter` | ` 30.00 ns` | ` 58.00 ns` | `  1.48 µs` | `138.16 µs` |
| Some.replace                    | ` 32.26 ns/iter` | ` 22.44 ns` | ` 33.58 ns` | ` 85.34 ns` | `234.33 ns` |
| None.replace                    | ` 23.54 ns/iter` | ` 15.91 ns` | ` 24.61 ns` | ` 57.60 ns` | `228.75 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  7.28 ns/iter` | `  6.61 ns` | `  7.01 ns` | ` 15.97 ns` | ` 59.00 ns` |
| Some(Ok).transpose                             | ` 54.98 ns/iter` | ` 32.38 ns` | ` 62.22 ns` | `160.95 ns` | `291.48 ns` |
| Some(Err).transpose                            | ` 35.88 ns/iter` | ` 23.03 ns` | ` 37.73 ns` | ` 94.26 ns` | `259.91 ns` |
| None.transpose                                 | ` 28.50 ns/iter` | ` 20.45 ns` | ` 29.49 ns` | ` 68.32 ns` | `225.89 ns` |
| Some.unzip                                     | ` 50.80 ns/iter` | ` 33.58 ns` | ` 55.25 ns` | `134.87 ns` | `295.75 ns` |
| None.unzip                                     | ` 38.18 ns/iter` | ` 26.66 ns` | ` 41.49 ns` | ` 93.02 ns` | `251.93 ns` |
| Some.match                                     | ` 12.55 ns/iter` | `  8.32 ns` | ` 15.14 ns` | ` 29.45 ns` | `299.97 ns` |
| None.match                                     | ` 12.85 ns/iter` | ` 10.07 ns` | ` 12.16 ns` | ` 29.84 ns` | `196.48 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 13.50 ns/iter` | `  8.42 ns` | ` 13.55 ns` | ` 36.09 ns` | `190.26 ns` |
| None.iter       | `  6.64 ns/iter` | `  5.00 ns` | `  6.09 ns` | ` 14.75 ns` | ` 49.89 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `249.08 ns/iter` | `180.36 ns` | `307.00 ns` | `404.51 ns` | `477.87 ns` |
| AsyncResult.unwrap (Err path)    | `229.15 ns/iter` | `176.86 ns` | `256.06 ns` | `411.08 ns` | `520.10 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `161.58 ns/iter` | `129.93 ns` | `160.79 ns` | `309.70 ns` | `352.97 ns` |
| Result.mapOrElseAsync (Err path)    | `146.22 ns/iter` | `128.32 ns` | `144.20 ns` | `265.53 ns` | `299.86 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `185.74 ns/iter` | `136.58 ns` | `225.70 ns` | `364.81 ns` | `414.67 ns` |
| Result.unwrapOrElseAsync (Err path) | `147.73 ns/iter` | `128.97 ns` | `144.51 ns` | `252.90 ns` | `272.19 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `455.33 ns/iter` | `441.89 ns` | `449.19 ns` | `610.61 ns` | `615.70 ns` |
| Err.mapAsync (alloc AsyncResult)        | `406.09 ns/iter` | `282.84 ns` | `538.84 ns` | `666.08 ns` | `770.81 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `355.22 ns/iter` | `279.90 ns` | `403.49 ns` | `644.03 ns` | `666.05 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `526.23 ns/iter` | `454.80 ns` | `557.91 ns` | `987.39 ns` | `  1.10 µs` |
| Ok.inspectAsync (alloc AsyncResult)     | `505.50 ns/iter` | `458.89 ns` | `491.72 ns` | `877.48 ns` | `929.00 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `353.20 ns/iter` | `276.28 ns` | `399.00 ns` | `609.49 ns` | `634.45 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `325.82 ns/iter` | `276.85 ns` | `335.74 ns` | `582.64 ns` | `707.86 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `588.26 ns/iter` | `456.97 ns` | `665.17 ns` | `991.22 ns` | `  1.02 µs` |
| Ok.andThenAsync (alloc AsyncResult)     | `475.54 ns/iter` | `394.73 ns` | `498.26 ns` | `884.99 ns` | `933.47 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `422.63 ns/iter` | `280.44 ns` | `538.18 ns` | `751.85 ns` | `829.16 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `364.32 ns/iter` | `283.79 ns` | `410.02 ns` | `697.23 ns` | `747.82 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `486.83 ns/iter` | `395.05 ns` | `528.00 ns` | `868.21 ns` | `  1.04 µs` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `290.37 ns/iter` | `265.29 ns` | `277.72 ns` | `506.74 ns` | `580.40 ns` |

| • Async Result - tryBlockAsync | avg              | min         | p75         | p99         | max         |
| ------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| tryBlockAsync (Ok path)        | `  1.61 µs/iter` | `898.00 ns` | `  1.67 µs` | `  4.71 µs` | `  1.53 ms` |
| tryBlockAsync (first Err)      | `993.57 ns/iter` | `764.64 ns` | `  1.12 µs` | `  1.87 µs` | `  2.26 µs` |
| tryBlockAsync (second Err)     | `  1.46 µs/iter` | `982.00 ns` | `  1.39 µs` | `  3.88 µs` | `  1.48 ms` |

| • Async Result - catchUnwindAsync      | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| catchUnwindAsync (wrap + call, Ok)     | `551.52 ns/iter` | `485.22 ns` | `520.43 ns` | `  1.09 µs` | `  1.11 µs` |
| catchUnwindAsync (call only, Ok)       | `517.57 ns/iter` | `479.64 ns` | `504.66 ns` | `856.05 ns` | `891.69 ns` |
| catchUnwindAsync (wrap + call, reject) | `  1.30 µs/iter` | `871.94 ns` | `  1.63 µs` | `  2.13 µs` | `  2.21 µs` |
| catchUnwindAsync (call only, reject)   | `  1.20 µs/iter` | `796.25 ns` | `  1.52 µs` | `  2.36 µs` | `  3.40 µs` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `225.21 ns/iter` | `184.79 ns` | `228.28 ns` | `434.23 ns` | `514.61 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.33 µs/iter` | `  1.03 µs` | `  1.41 µs` | `  1.89 µs` | `  1.96 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `187.26 ns/iter` | `141.43 ns` | `209.69 ns` | `347.07 ns` | `435.00 ns` |
| Option.mapOrElseAsync (None path)    | `168.56 ns/iter` | `139.74 ns` | `170.18 ns` | `338.30 ns` | `426.85 ns` |
| Option.unwrapOrElseAsync (Some path) | `171.71 ns/iter` | `147.12 ns` | `159.89 ns` | `350.10 ns` | `469.37 ns` |
| Option.unwrapOrElseAsync (None path) | `183.44 ns/iter` | `136.64 ns` | `232.46 ns` | `334.43 ns` | `380.85 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `586.88 ns/iter` | `458.57 ns` | `636.38 ns` | `  1.27 µs` | `  1.34 µs` |
| None.mapAsync (alloc AsyncOption)         | `337.84 ns/iter` | `277.12 ns` | `351.59 ns` | `627.13 ns` | `716.25 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `571.67 ns/iter` | `457.85 ns` | `632.53 ns` | `996.67 ns` | `  1.06 µs` |
| None.inspectAsync (alloc AsyncOption)     | `326.78 ns/iter` | `271.18 ns` | `322.09 ns` | `623.66 ns` | `691.43 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `514.59 ns/iter` | `405.28 ns` | `555.02 ns` | `949.10 ns` | `  1.07 µs` |
| None.andThenAsync (alloc AsyncOption)     | `346.35 ns/iter` | `278.90 ns` | `380.68 ns` | `660.97 ns` | `839.19 ns` |
| Some.filterAsync true (alloc AsyncOption) | `500.45 ns/iter` | `442.37 ns` | `488.76 ns` | `875.11 ns` | `912.71 ns` |
| None.filterAsync (alloc AsyncOption)      | `375.50 ns/iter` | `283.46 ns` | `440.72 ns` | `684.74 ns` | `746.25 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `344.44 ns/iter` | `277.64 ns` | `394.10 ns` | `596.98 ns` | `623.01 ns` |
| None.orElseAsync (alloc AsyncOption)      | `609.18 ns/iter` | `395.99 ns` | `795.48 ns` | `937.02 ns` | `966.81 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `303.01 ns/iter` | `272.06 ns` | `290.17 ns` | `506.14 ns` | `698.77 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `507.74 ns/iter` | `437.51 ns` | `520.67 ns` | `882.42 ns` | `  1.06 µs` |
| Some.getOrInsertWithAsync (existing)      | `174.89 ns/iter` | `150.70 ns` | `165.97 ns` | `330.32 ns` | `367.18 ns` |
| None.getOrInsertWithAsync (insert)        | `593.36 ns/iter` | `435.65 ns` | `712.44 ns` | `977.27 ns` | `  1.03 µs` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `349.39 ns/iter` | `266.43 ns` | `396.54 ns` | `668.77 ns` | `703.73 ns` |
