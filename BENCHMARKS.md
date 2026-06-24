# Benchmarks

clk: ~2.75 GHz
cpu: AMD EPYC 9V74 80-Core Processor
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | `  5.46 ns/iter` | `  4.07 ns` | `  4.75 ns` | ` 64.06 ns` | `158.80 ns` |
| Err(1)         | `  5.88 ns/iter` | `  4.12 ns` | `  5.31 ns` | ` 59.78 ns` | ` 98.05 ns` |
| Some(1)        | ` 11.07 ns/iter` | `  8.02 ns` | ` 11.21 ns` | ` 77.64 ns` | `238.34 ns` |
| None()         | `  8.37 ns/iter` | `  5.02 ns` | `  9.85 ns` | ` 64.60 ns` | ` 94.94 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  6.93 ns/iter` | `  1.93 ns` | `  8.73 ns` | ` 11.21 ns` | ` 20.79 ns` |
| Err.isOk()          | `  9.14 ns/iter` | `  8.66 ns` | `  8.78 ns` | ` 16.80 ns` | ` 27.46 ns` |
| Ok.isErr()          | ` 10.50 ns/iter` | `  9.00 ns` | ` 10.85 ns` | ` 15.11 ns` | ` 21.28 ns` |
| Err.isErr()         | ` 10.41 ns/iter` | ` 10.05 ns` | ` 10.17 ns` | ` 14.72 ns` | ` 26.53 ns` |
| Ok.isOkAnd (true)   | `  6.53 ns/iter` | `  5.08 ns` | `  6.69 ns` | ` 12.90 ns` | ` 24.94 ns` |
| Err.isOkAnd         | `  7.21 ns/iter` | `  6.89 ns` | `  7.07 ns` | ` 13.67 ns` | ` 33.42 ns` |
| Ok.isErrAnd         | `  4.80 ns/iter` | `  4.71 ns` | `  4.72 ns` | `  7.08 ns` | ` 16.86 ns` |
| Err.isErrAnd (true) | `  6.78 ns/iter` | `  6.63 ns` | `  6.64 ns` | ` 11.18 ns` | ` 24.25 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 13.86 ns/iter` | ` 11.33 ns` | ` 12.73 ns` | ` 75.98 ns` | `102.98 ns` |
| Err.ok()               | ` 13.01 ns/iter` | ` 11.56 ns` | ` 12.31 ns` | ` 71.06 ns` | ` 96.24 ns` |
| Ok.err()               | ` 12.08 ns/iter` | ` 10.53 ns` | ` 11.43 ns` | ` 41.00 ns` | ` 91.75 ns` |
| Err.err()              | ` 15.51 ns/iter` | ` 13.24 ns` | ` 14.55 ns` | ` 80.84 ns` | `123.02 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 15.43 ns/iter` | ` 13.74 ns` | ` 14.73 ns` | ` 34.13 ns` | ` 99.37 ns` |
| Err.map (reuse)       | ` 16.82 ns/iter` | ` 15.10 ns` | ` 17.12 ns` | ` 19.96 ns` | ` 31.33 ns` |
| Ok.mapOr              | `  7.07 ns/iter` | `  6.36 ns` | `  7.03 ns` | `  9.47 ns` | ` 25.15 ns` |
| Err.mapOr             | `  7.29 ns/iter` | `  7.01 ns` | `  7.27 ns` | `  9.67 ns` | ` 30.73 ns` |
| Ok.mapOrElse          | ` 12.58 ns/iter` | ` 11.53 ns` | ` 11.83 ns` | ` 27.84 ns` | `106.68 ns` |
| Err.mapOrElse         | ` 14.70 ns/iter` | ` 13.30 ns` | ` 13.99 ns` | ` 21.76 ns` | `100.43 ns` |
| Ok.mapErr (reuse)     | `  9.78 ns/iter` | `  9.54 ns` | `  9.68 ns` | ` 12.31 ns` | ` 23.80 ns` |
| Err.mapErr (alloc)    | ` 15.92 ns/iter` | ` 13.76 ns` | ` 14.95 ns` | ` 62.50 ns` | `127.33 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.36 ns/iter` | `  7.40 ns` | `  8.00 ns` | ` 11.93 ns` | ` 98.35 ns` |
| Err.inspect               | `  9.60 ns/iter` | `  8.73 ns` | `  9.22 ns` | ` 12.98 ns` | ` 92.07 ns` |
| Ok.inspectErr             | `  6.63 ns/iter` | `  6.42 ns` | `  6.58 ns` | `  8.88 ns` | ` 29.57 ns` |
| Err.inspectErr            | `  8.52 ns/iter` | `  7.41 ns` | `  7.98 ns` | ` 22.80 ns` | ` 97.46 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  6.81 ns/iter` | `  6.39 ns` | `  6.76 ns` | `  9.06 ns` | ` 22.03 ns` |
| Err.unwrapErr            | `  7.15 ns/iter` | `  6.90 ns` | `  7.10 ns` | `  9.52 ns` | ` 22.43 ns` |
| Ok.expect                | `  6.82 ns/iter` | `  6.35 ns` | `  6.76 ns` | `  9.28 ns` | ` 28.09 ns` |
| Err.expectErr            | `  9.70 ns/iter` | `  9.32 ns` | `  9.61 ns` | ` 13.00 ns` | ` 23.59 ns` |
| Ok.unwrapOr              | `  6.90 ns/iter` | `  6.62 ns` | `  6.85 ns` | `  9.40 ns` | ` 17.46 ns` |
| Err.unwrapOr             | `  6.43 ns/iter` | `  6.21 ns` | `  6.34 ns` | ` 10.16 ns` | ` 18.78 ns` |
| Ok.unwrapOrElse          | `  6.79 ns/iter` | `  6.12 ns` | `  6.73 ns` | `  9.30 ns` | ` 42.39 ns` |
| Err.unwrapOrElse         | `  9.99 ns/iter` | `  8.69 ns` | `  9.29 ns` | ` 24.37 ns` | `103.19 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  8.28 ns/iter` | `  7.88 ns` | `  8.20 ns` | ` 10.78 ns` | ` 28.80 ns` |
| Err.and (reuse)        | `  8.40 ns/iter` | `  7.98 ns` | `  8.34 ns` | ` 10.70 ns` | ` 26.01 ns` |
| Ok.andThen (alloc)     | ` 18.64 ns/iter` | ` 16.06 ns` | ` 17.35 ns` | ` 86.30 ns` | `114.85 ns` |
| Err.andThen (alloc)    | ` 18.96 ns/iter` | ` 16.70 ns` | ` 17.96 ns` | ` 86.75 ns` | `107.25 ns` |
| Ok.or (reuse)          | `  8.38 ns/iter` | `  7.95 ns` | `  8.29 ns` | ` 10.68 ns` | ` 31.45 ns` |
| Err.or (reuse)         | `  8.16 ns/iter` | `  7.76 ns` | `  8.10 ns` | ` 10.62 ns` | ` 19.14 ns` |
| Ok.orElse (alloc)      | ` 17.52 ns/iter` | ` 14.96 ns` | ` 16.27 ns` | ` 84.31 ns` | `110.74 ns` |
| Err.orElse (alloc)     | ` 13.54 ns/iter` | ` 12.48 ns` | ` 13.05 ns` | ` 21.04 ns` | `107.84 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 11.09 ns/iter` | ` 10.82 ns` | ` 10.98 ns` | ` 13.45 ns` | ` 31.16 ns` |
| Ok(Some).transpose                     | ` 52.72 ns/iter` | ` 44.93 ns` | ` 49.31 ns` | `130.50 ns` | `327.13 ns` |
| Ok(None).transpose                     | ` 35.09 ns/iter` | ` 30.86 ns` | ` 33.29 ns` | `106.90 ns` | `121.47 ns` |
| Err.transpose                          | ` 34.43 ns/iter` | ` 29.05 ns` | ` 32.59 ns` | `106.19 ns` | `125.64 ns` |
| Ok.match                               | ` 14.10 ns/iter` | ` 12.78 ns` | ` 13.72 ns` | ` 17.62 ns` | `102.66 ns` |
| Err.match                              | ` 14.78 ns/iter` | ` 13.80 ns` | ` 14.35 ns` | ` 18.65 ns` | `107.94 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | ` 14.16 ns/iter` | ` 12.33 ns` | ` 13.44 ns` | ` 49.45 ns` | `109.35 ns` |
| Err.iter        | ` 21.41 ns/iter` | ` 18.78 ns` | ` 20.17 ns` | ` 92.41 ns` | `115.07 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  6.60 ns/iter` | `  6.41 ns` | `  6.55 ns` | `  8.94 ns` | ` 18.71 ns` |
| None.isSome()         | `  6.63 ns/iter` | `  6.41 ns` | `  6.58 ns` | `  8.94 ns` | ` 23.15 ns` |
| Some.isNone()         | `  6.67 ns/iter` | `  6.41 ns` | `  6.64 ns` | `  9.02 ns` | ` 18.18 ns` |
| None.isNone()         | `  6.59 ns/iter` | `  6.40 ns` | `  6.55 ns` | `  8.91 ns` | ` 17.65 ns` |
| Some.isSomeAnd (true) | `  6.75 ns/iter` | `  6.52 ns` | `  6.67 ns` | `  9.19 ns` | ` 24.39 ns` |
| None.isSomeAnd        | `  7.53 ns/iter` | `  7.34 ns` | `  7.46 ns` | ` 10.63 ns` | ` 29.55 ns` |
| Some.isNoneOr (true)  | `  6.77 ns/iter` | `  6.50 ns` | `  6.71 ns` | `  9.23 ns` | ` 25.46 ns` |
| None.isNoneOr         | `  7.53 ns/iter` | `  7.34 ns` | `  7.46 ns` | ` 10.34 ns` | ` 34.26 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  6.81 ns/iter` | `  6.26 ns` | `  6.76 ns` | `  9.28 ns` | ` 15.40 ns` |
| Some.expect              | `  6.80 ns/iter` | `  5.96 ns` | `  6.75 ns` | `  9.48 ns` | ` 21.96 ns` |
| Some.unwrapOr            | `  6.88 ns/iter` | `  6.60 ns` | `  6.83 ns` | `  9.40 ns` | ` 15.99 ns` |
| None.unwrapOr            | `  6.33 ns/iter` | `  6.18 ns` | `  6.26 ns` | `  8.68 ns` | ` 15.72 ns` |
| Some.unwrapOrElse        | `  9.30 ns/iter` | `  8.07 ns` | `  8.70 ns` | ` 25.99 ns` | ` 98.79 ns` |
| None.unwrapOrElse        | `  9.62 ns/iter` | `  8.45 ns` | `  9.30 ns` | ` 14.54 ns` | `102.45 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 16.01 ns/iter` | ` 13.45 ns` | ` 15.15 ns` | ` 85.47 ns` | `111.48 ns` |
| None.map (alloc)      | ` 13.19 ns/iter` | ` 11.73 ns` | ` 12.56 ns` | ` 22.78 ns` | `105.24 ns` |
| Some.mapOr            | `  7.16 ns/iter` | `  6.24 ns` | `  7.09 ns` | ` 10.42 ns` | ` 17.79 ns` |
| None.mapOr            | `  7.34 ns/iter` | `  7.17 ns` | `  7.28 ns` | `  9.74 ns` | ` 20.78 ns` |
| Some.mapOrElse        | ` 13.15 ns/iter` | ` 11.73 ns` | ` 12.41 ns` | ` 30.59 ns` | `102.94 ns` |
| None.mapOrElse        | ` 13.78 ns/iter` | ` 12.50 ns` | ` 13.38 ns` | ` 19.10 ns` | `107.78 ns` |
| Some.inspect          | `  8.37 ns/iter` | `  7.47 ns` | `  8.04 ns` | ` 12.37 ns` | ` 98.59 ns` |
| None.inspect          | `  9.64 ns/iter` | `  8.79 ns` | `  9.28 ns` | ` 14.27 ns` | ` 94.16 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 12.17 ns/iter` | ` 10.19 ns` | ` 11.71 ns` | ` 18.03 ns` | ` 99.44 ns` |
| None.okOr              | ` 12.19 ns/iter` | ` 10.33 ns` | ` 11.69 ns` | ` 19.35 ns` | ` 97.56 ns` |
| Some.okOrElse          | ` 17.08 ns/iter` | ` 14.93 ns` | ` 16.32 ns` | ` 83.61 ns` | `105.13 ns` |
| None.okOrElse          | ` 18.65 ns/iter` | ` 16.50 ns` | ` 17.82 ns` | ` 85.36 ns` | `104.36 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  8.23 ns/iter` | `  8.03 ns` | `  8.13 ns` | ` 10.67 ns` | ` 30.52 ns` |
| None.and (alloc)           | ` 15.01 ns/iter` | ` 13.19 ns` | ` 14.03 ns` | ` 55.18 ns` | `107.48 ns` |
| Some.andThen (alloc)       | ` 22.56 ns/iter` | ` 19.56 ns` | ` 21.48 ns` | ` 95.06 ns` | `126.37 ns` |
| None.andThen (alloc)       | ` 14.75 ns/iter` | ` 12.99 ns` | ` 14.24 ns` | ` 44.90 ns` | `113.12 ns` |
| Some.filter (true, reuse)  | ` 12.25 ns/iter` | ` 10.51 ns` | ` 12.04 ns` | ` 15.90 ns` | `103.13 ns` |
| Some.filter (false, alloc) | ` 13.82 ns/iter` | ` 10.61 ns` | ` 13.29 ns` | ` 81.20 ns` | `114.70 ns` |
| None.filter (alloc)        | ` 13.72 ns/iter` | ` 11.78 ns` | ` 12.94 ns` | ` 83.01 ns` | `111.19 ns` |
| Some.or (reuse)            | `  7.92 ns/iter` | `  7.25 ns` | `  7.82 ns` | ` 10.33 ns` | ` 26.94 ns` |
| None.or (reuse/optb)       | `  8.01 ns/iter` | `  7.42 ns` | `  8.25 ns` | ` 10.48 ns` | ` 18.09 ns` |
| Some.orElse (reuse)        | `  7.65 ns/iter` | `  7.05 ns` | `  8.08 ns` | ` 10.30 ns` | ` 55.05 ns` |
| None.orElse (alloc)        | ` 12.63 ns/iter` | ` 11.10 ns` | ` 11.88 ns` | ` 31.03 ns` | `110.66 ns` |
| Some xor None (reuse)      | `  9.75 ns/iter` | `  9.27 ns` | `  9.65 ns` | ` 12.13 ns` | ` 32.82 ns` |
| None xor Some (reuse/optb) | `  9.81 ns/iter` | `  9.42 ns` | `  9.73 ns` | ` 12.45 ns` | ` 17.81 ns` |
| Some xor Some (alloc)      | ` 16.58 ns/iter` | ` 14.44 ns` | ` 15.52 ns` | ` 55.92 ns` | `114.97 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 18.84 ns/iter` | ` 15.49 ns` | ` 18.32 ns` | ` 91.81 ns` | `110.97 ns` |
| None.insert                     | ` 15.98 ns/iter` | ` 13.35 ns` | ` 15.20 ns` | ` 88.57 ns` | `116.76 ns` |
| Some.getOrInsert (existing)     | ` 15.34 ns/iter` | ` 13.12 ns` | ` 14.53 ns` | ` 90.91 ns` | `115.07 ns` |
| None.getOrInsert (insert)       | ` 18.89 ns/iter` | ` 16.45 ns` | ` 18.02 ns` | ` 96.31 ns` | `120.17 ns` |
| Some.getOrInsertWith (existing) | ` 23.09 ns/iter` | ` 19.63 ns` | ` 22.02 ns` | `104.43 ns` | `127.90 ns` |
| None.getOrInsertWith (insert)   | ` 24.68 ns/iter` | ` 21.35 ns` | ` 23.54 ns` | `106.40 ns` | `128.58 ns` |
| Some.take                       | ` 32.43 ns/iter` | ` 27.97 ns` | ` 30.75 ns` | `115.47 ns` | `133.39 ns` |
| None.take                       | ` 23.34 ns/iter` | ` 19.80 ns` | ` 22.45 ns` | `104.20 ns` | `129.57 ns` |
| Some.takeIf (true)              | ` 36.78 ns/iter` | ` 31.64 ns` | ` 34.75 ns` | `123.02 ns` | `158.22 ns` |
| Some.takeIf (false)             | ` 32.05 ns/iter` | ` 27.74 ns` | ` 30.35 ns` | `118.24 ns` | `142.86 ns` |
| Some.replace                    | ` 38.09 ns/iter` | ` 32.89 ns` | ` 36.36 ns` | `123.33 ns` | `144.71 ns` |
| None.replace                    | ` 29.68 ns/iter` | ` 25.84 ns` | ` 28.17 ns` | `111.36 ns` | `131.23 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  9.73 ns/iter` | `  9.08 ns` | `  9.60 ns` | ` 14.11 ns` | ` 31.78 ns` |
| Some(Ok).transpose                             | ` 59.94 ns/iter` | ` 48.48 ns` | ` 56.16 ns` | `175.08 ns` | `348.43 ns` |
| Some(Err).transpose                            | ` 44.34 ns/iter` | ` 38.14 ns` | ` 42.38 ns` | `133.10 ns` | `161.35 ns` |
| None.transpose                                 | ` 31.96 ns/iter` | ` 27.54 ns` | ` 30.24 ns` | `119.99 ns` | `141.74 ns` |
| Some.unzip                                     | ` 55.90 ns/iter` | ` 48.03 ns` | ` 53.23 ns` | `143.84 ns` | `249.08 ns` |
| None.unzip                                     | ` 38.15 ns/iter` | ` 32.29 ns` | ` 36.11 ns` | `127.06 ns` | `153.84 ns` |
| Some.match                                     | ` 16.93 ns/iter` | ` 14.98 ns` | ` 16.29 ns` | ` 23.52 ns` | `132.30 ns` |
| None.match                                     | ` 17.90 ns/iter` | ` 15.45 ns` | ` 17.25 ns` | ` 25.45 ns` | `137.08 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | ` 31.32 ns/iter` | ` 26.79 ns` | ` 30.26 ns` | `121.38 ns` | `147.06 ns` |
| None.iter       | ` 22.43 ns/iter` | ` 17.94 ns` | ` 21.36 ns` | `106.10 ns` | `132.68 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `246.86 ns/iter` | `233.76 ns` | `241.80 ns` | `364.42 ns` | `507.56 ns` |
| AsyncResult.unwrap (Err path)    | `244.46 ns/iter` | `233.77 ns` | `239.87 ns` | `354.67 ns` | `446.78 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `179.22 ns/iter` | `169.43 ns` | `176.67 ns` | `289.44 ns` | `349.53 ns` |
| Result.mapOrElseAsync (Err path)    | `182.39 ns/iter` | `173.00 ns` | `178.86 ns` | `295.90 ns` | `315.84 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `193.43 ns/iter` | `180.03 ns` | `188.58 ns` | `322.82 ns` | `365.96 ns` |
| Result.unwrapOrElseAsync (Err path) | `180.14 ns/iter` | `170.92 ns` | `177.89 ns` | `281.10 ns` | `295.52 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `661.42 ns/iter` | `633.66 ns` | `654.43 ns` | `791.06 ns` | `943.34 ns` |
| Err.mapAsync (alloc AsyncResult)        | `408.48 ns/iter` | `388.52 ns` | `402.97 ns` | `536.64 ns` | `663.91 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `405.02 ns/iter` | `386.44 ns` | `399.09 ns` | `530.77 ns` | `582.63 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `662.12 ns/iter` | `628.49 ns` | `655.17 ns` | `804.27 ns` | `952.77 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `675.87 ns/iter` | `651.02 ns` | `667.63 ns` | `805.65 ns` | `841.28 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `404.45 ns/iter` | `384.88 ns` | `398.04 ns` | `540.28 ns` | `635.04 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `399.22 ns/iter` | `382.69 ns` | `393.37 ns` | `527.05 ns` | `537.56 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `679.63 ns/iter` | `650.77 ns` | `670.05 ns` | `804.55 ns` | `  1.04 µs` |
| Ok.andThenAsync (alloc AsyncResult)     | `589.85 ns/iter` | `562.47 ns` | `580.41 ns` | `739.83 ns` | `844.10 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `413.92 ns/iter` | `393.53 ns` | `406.32 ns` | `547.61 ns` | `698.71 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `411.54 ns/iter` | `392.22 ns` | `405.13 ns` | `543.69 ns` | `617.02 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `595.79 ns/iter` | `565.30 ns` | `586.30 ns` | `730.89 ns` | `869.69 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `381.47 ns/iter` | `364.48 ns` | `376.31 ns` | `508.80 ns` | `556.85 ns` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `259.18 ns/iter` | `243.25 ns` | `253.67 ns` | `413.47 ns` | `445.73 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.62 µs/iter` | `  1.44 µs` | `  1.54 µs` | `  2.44 µs` | `  2.45 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `195.71 ns/iter` | `182.66 ns` | `192.57 ns` | `310.30 ns` | `327.53 ns` |
| Option.mapOrElseAsync (None path)    | `192.95 ns/iter` | `181.41 ns` | `189.68 ns` | `309.33 ns` | `317.51 ns` |
| Option.unwrapOrElseAsync (Some path) | `207.50 ns/iter` | `195.06 ns` | `204.45 ns` | `326.32 ns` | `336.76 ns` |
| Option.unwrapOrElseAsync (None path) | `188.99 ns/iter` | `177.23 ns` | `186.14 ns` | `299.83 ns` | `363.02 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `676.18 ns/iter` | `646.25 ns` | `666.36 ns` | `798.22 ns` | `817.00 ns` |
| None.mapAsync (alloc AsyncOption)         | `412.87 ns/iter` | `393.43 ns` | `406.73 ns` | `532.62 ns` | `553.53 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `676.56 ns/iter` | `647.66 ns` | `668.97 ns` | `805.02 ns` | `827.31 ns` |
| None.inspectAsync (alloc AsyncOption)     | `401.14 ns/iter` | `381.25 ns` | `393.99 ns` | `526.67 ns` | `632.27 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `601.47 ns/iter` | `574.63 ns` | `592.07 ns` | `724.46 ns` | `879.96 ns` |
| None.andThenAsync (alloc AsyncOption)     | `417.86 ns/iter` | `395.37 ns` | `409.84 ns` | `551.50 ns` | `619.65 ns` |
| Some.filterAsync true (alloc AsyncOption) | `660.89 ns/iter` | `633.39 ns` | `652.82 ns` | `787.31 ns` | `825.55 ns` |
| None.filterAsync (alloc AsyncOption)      | `415.92 ns/iter` | `394.36 ns` | `410.15 ns` | `537.04 ns` | `592.59 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `403.11 ns/iter` | `387.02 ns` | `398.32 ns` | `519.92 ns` | `532.40 ns` |
| None.orElseAsync (alloc AsyncOption)      | `588.83 ns/iter` | `564.86 ns` | `580.10 ns` | `721.42 ns` | `788.48 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `410.79 ns/iter` | `390.81 ns` | `405.19 ns` | `538.41 ns` | `549.02 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `661.48 ns/iter` | `634.38 ns` | `652.74 ns` | `795.93 ns` | `981.68 ns` |
| Some.getOrInsertWithAsync (existing)      | `204.79 ns/iter` | `191.08 ns` | `201.38 ns` | `321.60 ns` | `372.59 ns` |
| None.getOrInsertWithAsync (insert)        | `602.70 ns/iter` | `570.36 ns` | `592.26 ns` | `732.97 ns` | `802.18 ns` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `385.38 ns/iter` | `371.76 ns` | `381.08 ns` | `506.81 ns` | `515.05 ns` |
