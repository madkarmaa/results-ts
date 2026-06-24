# Benchmarks

clk: ~3.32 GHz
cpu: Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz
runtime: bun 1.3.14 (x64-linux)

| • constructors | avg              | min         | p75         | p99         | max         |
| -------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok(1)          | ` 10.53 ns/iter` | `  7.14 ns` | `  9.86 ns` | ` 31.66 ns` | `117.82 ns` |
| Err(1)         | ` 10.34 ns/iter` | `  7.35 ns` | `  9.79 ns` | ` 20.57 ns` | `110.72 ns` |
| Some(1)        | ` 14.23 ns/iter` | `  9.99 ns` | ` 14.82 ns` | ` 80.26 ns` | `188.20 ns` |
| None()         | ` 11.23 ns/iter` | `  7.13 ns` | ` 11.44 ns` | ` 21.22 ns` | `134.11 ns` |

| • Result - queries  | avg              | min         | p75         | p99         | max         |
| ------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.isOk()           | `  4.35 ns/iter` | ` 83.01 ps` | `  8.45 ns` | ` 10.60 ns` | ` 18.57 ns` |
| Err.isOk()          | `  9.44 ns/iter` | `  9.18 ns` | `  9.31 ns` | ` 12.37 ns` | ` 20.85 ns` |
| Ok.isErr()          | `  9.42 ns/iter` | `  9.12 ns` | `  9.24 ns` | ` 14.90 ns` | ` 19.97 ns` |
| Err.isErr()         | ` 10.20 ns/iter` | `  9.97 ns` | ` 10.10 ns` | ` 12.40 ns` | ` 19.60 ns` |
| Ok.isOkAnd (true)   | `  5.07 ns/iter` | `  4.24 ns` | `  4.96 ns` | `  8.89 ns` | ` 18.42 ns` |
| Err.isOkAnd         | `  6.24 ns/iter` | `  5.89 ns` | `  6.25 ns` | `  8.09 ns` | ` 30.37 ns` |
| Ok.isErrAnd         | `  4.61 ns/iter` | `  4.17 ns` | `  4.41 ns` | `  6.40 ns` | ` 26.62 ns` |
| Err.isErrAnd (true) | `  5.75 ns/iter` | `  5.67 ns` | `  5.68 ns` | `  7.35 ns` | ` 20.25 ns` |

| • Result - conversions | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.ok()                | ` 18.08 ns/iter` | ` 14.39 ns` | ` 17.41 ns` | ` 86.26 ns` | `108.92 ns` |
| Err.ok()               | ` 15.15 ns/iter` | ` 12.95 ns` | ` 14.54 ns` | ` 37.56 ns` | `108.68 ns` |
| Ok.err()               | ` 14.54 ns/iter` | ` 12.45 ns` | ` 13.97 ns` | ` 26.85 ns` | `106.78 ns` |
| Err.err()              | ` 19.48 ns/iter` | ` 16.01 ns` | ` 18.99 ns` | ` 88.63 ns` | `109.50 ns` |

| • Result - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.map (alloc)        | ` 17.05 ns/iter` | ` 14.62 ns` | ` 16.42 ns` | ` 30.79 ns` | `107.85 ns` |
| Err.map (reuse)       | `  9.86 ns/iter` | `  9.17 ns` | `  9.98 ns` | ` 11.87 ns` | ` 27.11 ns` |
| Ok.mapOr              | `  5.99 ns/iter` | `  5.50 ns` | `  6.05 ns` | `  7.43 ns` | ` 24.70 ns` |
| Err.mapOr             | `  7.12 ns/iter` | `  6.64 ns` | `  7.22 ns` | `  8.81 ns` | ` 30.27 ns` |
| Ok.mapOrElse          | ` 11.98 ns/iter` | ` 10.48 ns` | ` 11.41 ns` | ` 22.30 ns` | `105.26 ns` |
| Err.mapOrElse         | ` 13.90 ns/iter` | ` 12.28 ns` | ` 13.53 ns` | ` 18.69 ns` | `104.14 ns` |
| Ok.mapErr (reuse)     | `  8.59 ns/iter` | `  7.81 ns` | `  8.65 ns` | ` 10.35 ns` | ` 24.48 ns` |
| Err.mapErr (alloc)    | ` 17.08 ns/iter` | ` 14.52 ns` | ` 16.27 ns` | ` 40.82 ns` | `105.14 ns` |

| • Result - inspect family | avg              | min         | p75         | p99         | max         |
| ------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.inspect                | `  8.86 ns/iter` | `  7.37 ns` | `  8.60 ns` | ` 13.04 ns` | `130.04 ns` |
| Err.inspect               | ` 10.61 ns/iter` | `  9.03 ns` | ` 10.29 ns` | ` 15.40 ns` | `104.82 ns` |
| Ok.inspectErr             | `  6.05 ns/iter` | `  5.27 ns` | `  6.15 ns` | `  7.40 ns` | ` 26.66 ns` |
| Err.inspectErr            | `  8.91 ns/iter` | `  7.39 ns` | `  8.48 ns` | ` 17.73 ns` | `137.43 ns` |

| • Result - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.unwrap                | `  5.65 ns/iter` | `  5.20 ns` | `  5.73 ns` | `  7.25 ns` | ` 20.76 ns` |
| Err.unwrapErr            | `  5.58 ns/iter` | `  5.20 ns` | `  5.62 ns` | `  7.16 ns` | ` 23.32 ns` |
| Ok.expect                | `  5.59 ns/iter` | `  5.20 ns` | `  5.64 ns` | `  7.88 ns` | ` 17.30 ns` |
| Err.expectErr            | `  8.60 ns/iter` | `  7.82 ns` | `  8.69 ns` | ` 11.05 ns` | ` 19.28 ns` |
| Ok.unwrapOr              | `  5.72 ns/iter` | `  5.49 ns` | `  5.79 ns` | `  7.57 ns` | ` 14.78 ns` |
| Err.unwrapOr             | `  6.22 ns/iter` | `  5.50 ns` | `  6.44 ns` | `  8.07 ns` | ` 16.45 ns` |
| Ok.unwrapOrElse          | `  5.71 ns/iter` | `  5.21 ns` | `  5.80 ns` | `  7.79 ns` | ` 30.31 ns` |
| Err.unwrapOrElse         | ` 10.64 ns/iter` | `  8.94 ns` | ` 10.02 ns` | ` 27.21 ns` | `141.25 ns` |

| • Result - combinators | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.and (reuse)         | `  7.40 ns/iter` | `  6.93 ns` | `  7.49 ns` | `  9.22 ns` | ` 31.25 ns` |
| Err.and (reuse)        | `  7.34 ns/iter` | `  6.93 ns` | `  7.43 ns` | `  8.95 ns` | ` 23.13 ns` |
| Ok.andThen (alloc)     | ` 21.51 ns/iter` | ` 17.59 ns` | ` 20.83 ns` | ` 92.36 ns` | `125.28 ns` |
| Err.andThen (alloc)    | `  7.16 ns/iter` | `  6.64 ns` | `  7.29 ns` | `  8.82 ns` | ` 35.86 ns` |
| Ok.or (reuse)          | `  7.30 ns/iter` | `  6.69 ns` | `  7.36 ns` | `  9.12 ns` | ` 31.56 ns` |
| Err.or (reuse)         | `  7.33 ns/iter` | `  6.92 ns` | `  7.36 ns` | `  9.30 ns` | ` 25.13 ns` |
| Ok.orElse (alloc)      | `  6.11 ns/iter` | `  5.49 ns` | `  6.15 ns` | `  7.61 ns` | ` 31.46 ns` |
| Err.orElse (alloc)     | `  9.36 ns/iter` | `  7.81 ns` | `  8.91 ns` | ` 18.15 ns` | `105.92 ns` |

| • Result - flatten / transpose / match | avg              | min         | p75         | p99         | max         |
| -------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.flatten                         | ` 10.49 ns/iter` | `  9.96 ns` | ` 10.49 ns` | ` 12.53 ns` | ` 33.85 ns` |
| Ok(Some).transpose                     | ` 60.16 ns/iter` | ` 48.83 ns` | ` 58.87 ns` | `146.02 ns` | `267.74 ns` |
| Ok(None).transpose                     | ` 37.50 ns/iter` | ` 30.46 ns` | ` 37.45 ns` | `110.49 ns` | `131.61 ns` |
| Err.transpose                          | ` 44.88 ns/iter` | ` 36.92 ns` | ` 44.30 ns` | `123.55 ns` | `142.36 ns` |
| Ok.match                               | ` 13.03 ns/iter` | ` 11.52 ns` | ` 12.62 ns` | ` 18.25 ns` | `106.50 ns` |
| Err.match                              | ` 15.61 ns/iter` | ` 13.56 ns` | ` 15.31 ns` | ` 21.25 ns` | `135.07 ns` |

| • Result - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.iter         | `493.11 ns/iter` | `444.01 ns` | `478.70 ns` | `800.03 ns` | `  1.41 µs` |
| Err.iter        | `  6.87 ns/iter` | `  6.37 ns` | `  6.80 ns` | `  9.20 ns` | ` 38.13 ns` |

| • Option - queries    | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.isSome()         | `  8.37 ns/iter` | `  8.26 ns` | `  8.29 ns` | ` 10.16 ns` | ` 22.35 ns` |
| None.isSome()         | `  5.78 ns/iter` | `  5.49 ns` | `  5.86 ns` | `  7.16 ns` | ` 14.92 ns` |
| Some.isNone()         | `  5.88 ns/iter` | `  5.49 ns` | `  5.88 ns` | `  7.33 ns` | ` 17.19 ns` |
| None.isNone()         | `  5.91 ns/iter` | `  5.49 ns` | `  5.87 ns` | `  7.29 ns` | ` 14.87 ns` |
| Some.isSomeAnd (true) | `  6.05 ns/iter` | `  5.77 ns` | `  6.13 ns` | `  7.60 ns` | ` 24.86 ns` |
| None.isSomeAnd        | `  7.63 ns/iter` | `  7.21 ns` | `  7.59 ns` | `  9.39 ns` | ` 30.28 ns` |
| Some.isNoneOr (true)  | `  6.21 ns/iter` | `  5.77 ns` | `  6.27 ns` | `  7.79 ns` | ` 25.34 ns` |
| None.isNoneOr         | `  7.93 ns/iter` | `  6.93 ns` | `  7.94 ns` | `  9.47 ns` | ` 29.32 ns` |

| • Option - unwrap family | avg              | min         | p75         | p99         | max         |
| ------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.unwrap              | `  5.55 ns/iter` | `  5.20 ns` | `  5.61 ns` | `  7.10 ns` | ` 20.71 ns` |
| Some.expect              | `  5.59 ns/iter` | `  5.20 ns` | `  5.66 ns` | `  7.05 ns` | ` 22.89 ns` |
| Some.unwrapOr            | `  5.69 ns/iter` | `  5.48 ns` | `  5.78 ns` | `  7.25 ns` | ` 16.77 ns` |
| None.unwrapOr            | `  6.11 ns/iter` | `  5.49 ns` | `  6.15 ns` | `  9.43 ns` | ` 23.04 ns` |
| Some.unwrapOrElse        | `  9.59 ns/iter` | `  7.93 ns` | `  9.07 ns` | ` 18.98 ns` | `101.04 ns` |
| None.unwrapOrElse        | ` 11.17 ns/iter` | `  9.67 ns` | ` 10.78 ns` | ` 16.22 ns` | ` 99.01 ns` |

| • Option - map family | avg              | min         | p75         | p99         | max         |
| --------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.map (alloc)      | ` 17.81 ns/iter` | ` 14.52 ns` | ` 17.29 ns` | ` 58.00 ns` | `129.92 ns` |
| None.map (alloc)      | `  7.75 ns/iter` | `  6.93 ns` | `  7.66 ns` | ` 10.49 ns` | ` 29.66 ns` |
| Some.mapOr            | `  5.95 ns/iter` | `  5.49 ns` | `  6.00 ns` | `  7.72 ns` | ` 26.64 ns` |
| None.mapOr            | `  7.24 ns/iter` | `  6.92 ns` | `  7.30 ns` | `  9.43 ns` | ` 29.23 ns` |
| Some.mapOrElse        | ` 12.66 ns/iter` | ` 10.72 ns` | ` 12.10 ns` | ` 23.38 ns` | `118.88 ns` |
| None.mapOrElse        | ` 13.65 ns/iter` | ` 12.14 ns` | ` 13.30 ns` | ` 18.58 ns` | `114.61 ns` |
| Some.inspect          | `  8.93 ns/iter` | `  7.55 ns` | `  8.65 ns` | ` 13.18 ns` | `112.45 ns` |
| None.inspect          | ` 10.52 ns/iter` | `  9.09 ns` | ` 10.19 ns` | ` 16.06 ns` | `104.75 ns` |

| • Option - okOr family | avg              | min         | p75         | p99         | max         |
| ---------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.okOr              | ` 14.57 ns/iter` | ` 12.24 ns` | ` 14.06 ns` | ` 22.03 ns` | `176.81 ns` |
| None.okOr              | ` 15.64 ns/iter` | ` 13.35 ns` | ` 15.19 ns` | ` 22.80 ns` | `108.30 ns` |
| Some.okOrElse          | ` 20.56 ns/iter` | ` 16.74 ns` | ` 20.44 ns` | ` 32.18 ns` | `116.05 ns` |
| None.okOrElse          | ` 22.17 ns/iter` | ` 18.48 ns` | ` 21.88 ns` | ` 37.42 ns` | `178.05 ns` |

| • Option - combinators     | avg              | min         | p75         | p99         | max         |
| -------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.and (reuse/optb)      | `  7.39 ns/iter` | `  6.93 ns` | `  7.48 ns` | `  9.12 ns` | ` 22.58 ns` |
| None.and (alloc)           | `  7.36 ns/iter` | `  6.93 ns` | `  7.47 ns` | `  9.25 ns` | ` 17.11 ns` |
| Some.andThen (alloc)       | ` 26.75 ns/iter` | ` 21.52 ns` | ` 26.19 ns` | `105.09 ns` | `124.98 ns` |
| None.andThen (alloc)       | `  7.22 ns/iter` | `  6.64 ns` | `  7.29 ns` | ` 10.75 ns` | ` 29.61 ns` |
| Some.filter (true, reuse)  | `  9.21 ns/iter` | `  7.74 ns` | `  8.79 ns` | ` 18.14 ns` | `114.37 ns` |
| Some.filter (false, alloc) | ` 17.69 ns/iter` | ` 14.80 ns` | ` 17.34 ns` | ` 31.05 ns` | `109.20 ns` |
| None.filter (alloc)        | `  7.12 ns/iter` | `  6.64 ns` | `  7.22 ns` | `  8.90 ns` | ` 21.76 ns` |
| Some.or (reuse)            | `  7.46 ns/iter` | `  6.94 ns` | `  7.57 ns` | `  9.33 ns` | ` 18.21 ns` |
| None.or (reuse/optb)       | `  7.40 ns/iter` | `  6.94 ns` | `  7.51 ns` | `  9.00 ns` | ` 17.85 ns` |
| Some.orElse (reuse)        | `  6.45 ns/iter` | `  5.79 ns` | `  6.56 ns` | `  8.07 ns` | ` 34.36 ns` |
| None.orElse (alloc)        | ` 11.60 ns/iter` | `  9.87 ns` | ` 11.02 ns` | ` 21.10 ns` | `116.82 ns` |
| Some xor None (reuse)      | `  9.56 ns/iter` | `  8.94 ns` | `  9.59 ns` | ` 12.45 ns` | ` 29.92 ns` |
| None xor Some (reuse/optb) | `  9.96 ns/iter` | `  8.97 ns` | ` 10.15 ns` | ` 11.88 ns` | ` 17.56 ns` |
| Some xor Some (alloc)      | ` 16.06 ns/iter` | ` 13.74 ns` | ` 15.20 ns` | ` 40.09 ns` | `130.73 ns` |

| • Option - mutation             | avg              | min         | p75         | p99         | max         |
| ------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.insert                     | ` 24.29 ns/iter` | ` 19.66 ns` | ` 24.01 ns` | ` 98.03 ns` | `121.37 ns` |
| None.insert                     | ` 18.42 ns/iter` | ` 14.70 ns` | ` 18.42 ns` | ` 35.94 ns` | `125.74 ns` |
| Some.getOrInsert (existing)     | ` 17.94 ns/iter` | ` 14.28 ns` | ` 17.94 ns` | ` 32.90 ns` | `115.02 ns` |
| None.getOrInsert (insert)       | ` 20.38 ns/iter` | ` 16.13 ns` | ` 20.47 ns` | ` 37.38 ns` | `166.34 ns` |
| Some.getOrInsertWith (existing) | ` 23.50 ns/iter` | ` 19.45 ns` | ` 23.16 ns` | `101.73 ns` | `124.54 ns` |
| None.getOrInsertWith (insert)   | ` 24.61 ns/iter` | ` 20.34 ns` | ` 24.29 ns` | `102.78 ns` | `123.12 ns` |
| Some.take                       | ` 37.36 ns/iter` | ` 28.33 ns` | ` 37.83 ns` | `121.61 ns` | `141.61 ns` |
| None.take                       | ` 28.01 ns/iter` | ` 22.09 ns` | ` 28.09 ns` | `108.48 ns` | `186.72 ns` |
| Some.takeIf (true)              | ` 41.16 ns/iter` | ` 33.22 ns` | ` 40.69 ns` | `126.46 ns` | `142.49 ns` |
| Some.takeIf (false)             | ` 34.69 ns/iter` | ` 27.07 ns` | ` 34.55 ns` | `118.37 ns` | `136.29 ns` |
| Some.replace                    | ` 42.70 ns/iter` | ` 35.37 ns` | ` 42.08 ns` | `127.63 ns` | `146.96 ns` |
| None.replace                    | ` 31.40 ns/iter` | ` 24.51 ns` | ` 31.61 ns` | `113.43 ns` | `132.31 ns` |

| • Option - flatten / transpose / unzip / match | avg              | min         | p75         | p99         | max         |
| ---------------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.flatten                                 | `  8.76 ns/iter` | `  8.18 ns` | `  8.81 ns` | ` 10.60 ns` | ` 32.88 ns` |
| Some(Ok).transpose                             | ` 64.42 ns/iter` | ` 54.41 ns` | ` 62.89 ns` | `159.38 ns` | `281.96 ns` |
| Some(Err).transpose                            | ` 50.90 ns/iter` | ` 42.41 ns` | ` 50.40 ns` | `138.39 ns` | `191.87 ns` |
| None.transpose                                 | ` 42.01 ns/iter` | ` 32.24 ns` | ` 42.00 ns` | `129.95 ns` | `208.42 ns` |
| Some.unzip                                     | ` 58.27 ns/iter` | ` 48.96 ns` | ` 57.39 ns` | `146.27 ns` | `158.69 ns` |
| None.unzip                                     | ` 46.33 ns/iter` | ` 38.68 ns` | ` 45.78 ns` | `130.45 ns` | `145.51 ns` |
| Some.match                                     | ` 16.16 ns/iter` | ` 14.21 ns` | ` 15.67 ns` | ` 24.41 ns` | `127.64 ns` |
| None.match                                     | ` 17.20 ns/iter` | ` 15.38 ns` | ` 16.79 ns` | ` 24.85 ns` | `108.17 ns` |

| • Option - iter | avg              | min         | p75         | p99         | max         |
| --------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.iter       | `507.57 ns/iter` | `465.17 ns` | `491.19 ns` | `884.36 ns` | `  1.39 µs` |
| None.iter       | `  7.07 ns/iter` | `  6.36 ns` | `  7.09 ns` | ` 10.29 ns` | ` 36.02 ns` |

| • Async Result - terminal unwrap | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.unwrap (Ok path)     | `259.99 ns/iter` | `244.31 ns` | `249.26 ns` | `485.90 ns` | `701.52 ns` |
| AsyncResult.unwrap (Err path)    | `247.43 ns/iter` | `239.51 ns` | `245.08 ns` | `345.38 ns` | `404.67 ns` |

| • Async Result - sync-typed methods | avg              | min         | p75         | p99         | max         |
| ----------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Result.mapOrElseAsync (Ok path)     | `185.44 ns/iter` | `176.45 ns` | `184.35 ns` | `274.82 ns` | `317.91 ns` |
| Result.mapOrElseAsync (Err path)    | `184.03 ns/iter` | `175.70 ns` | `182.62 ns` | `275.54 ns` | `283.04 ns` |
| Result.unwrapOrElseAsync (Ok path)  | `196.55 ns/iter` | `188.10 ns` | `195.76 ns` | `279.21 ns` | `332.96 ns` |
| Result.unwrapOrElseAsync (Err path) | `186.75 ns/iter` | `178.41 ns` | `185.88 ns` | `275.71 ns` | `293.65 ns` |

| • Async Result - transform methods      | avg              | min         | p75         | p99         | max         |
| --------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Ok.mapAsync (alloc AsyncResult)         | `663.17 ns/iter` | `642.29 ns` | `658.28 ns` | `775.57 ns` | `790.47 ns` |
| Err.mapAsync (alloc AsyncResult)        | `427.30 ns/iter` | `411.09 ns` | `422.76 ns` | `542.27 ns` | `556.12 ns` |
| Ok.mapErrAsync (alloc AsyncResult)      | `424.19 ns/iter` | `408.91 ns` | `420.14 ns` | `539.73 ns` | `556.50 ns` |
| Err.mapErrAsync (alloc AsyncResult)     | `662.35 ns/iter` | `635.46 ns` | `659.69 ns` | `775.52 ns` | `840.48 ns` |
| Ok.inspectAsync (alloc AsyncResult)     | `664.48 ns/iter` | `643.63 ns` | `661.89 ns` | `774.42 ns` | `795.73 ns` |
| Err.inspectAsync (alloc AsyncResult)    | `415.51 ns/iter` | `403.35 ns` | `412.43 ns` | `517.37 ns` | `538.74 ns` |
| Ok.inspectErrAsync (alloc AsyncResult)  | `417.09 ns/iter` | `404.42 ns` | `413.49 ns` | `525.20 ns` | `538.41 ns` |
| Err.inspectErrAsync (alloc AsyncResult) | `673.08 ns/iter` | `647.01 ns` | `667.48 ns` | `776.55 ns` | `782.62 ns` |
| Ok.andThenAsync (alloc AsyncResult)     | `592.61 ns/iter` | `574.02 ns` | `589.65 ns` | `701.51 ns` | `730.01 ns` |
| Err.andThenAsync (alloc AsyncResult)    | `428.73 ns/iter` | `413.40 ns` | `425.06 ns` | `544.76 ns` | `585.24 ns` |
| Ok.orElseAsync (alloc AsyncResult)      | `425.05 ns/iter` | `410.23 ns` | `421.71 ns` | `535.10 ns` | `546.41 ns` |
| Err.orElseAsync (alloc AsyncResult)     | `594.06 ns/iter` | `573.64 ns` | `589.34 ns` | `716.40 ns` | `745.13 ns` |

| • Async Result - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncResult.then (await)         | `392.56 ns/iter` | `379.34 ns` | `390.33 ns` | `497.93 ns` | `518.21 ns` |

| • Async Option - terminal unwrap      | avg              | min         | p75         | p99         | max         |
| ------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.unwrap (Some path)        | `251.42 ns/iter` | `243.59 ns` | `250.18 ns` | `342.95 ns` | `410.97 ns` |
| AsyncOption.unwrap (None path -> Err) | `  1.55 µs/iter` | `  1.40 µs` | `  1.53 µs` | `  1.86 µs` | `  1.86 µs` |

| • Async Option - sync-typed methods  | avg              | min         | p75         | p99         | max         |
| ------------------------------------ | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Option.mapOrElseAsync (Some path)    | `201.74 ns/iter` | `191.59 ns` | `199.31 ns` | `292.95 ns` | `339.03 ns` |
| Option.mapOrElseAsync (None path)    | `203.61 ns/iter` | `192.53 ns` | `201.27 ns` | `300.79 ns` | `408.92 ns` |
| Option.unwrapOrElseAsync (Some path) | `217.25 ns/iter` | `204.25 ns` | `216.30 ns` | `313.99 ns` | `410.70 ns` |
| Option.unwrapOrElseAsync (None path) | `200.57 ns/iter` | `189.77 ns` | `198.75 ns` | `299.20 ns` | `390.27 ns` |

| • Async Option - transform methods        | avg              | min         | p75         | p99         | max         |
| ----------------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| Some.mapAsync (alloc AsyncOption)         | `670.35 ns/iter` | `642.66 ns` | `667.19 ns` | `786.52 ns` | `985.98 ns` |
| None.mapAsync (alloc AsyncOption)         | `427.71 ns/iter` | `413.43 ns` | `423.37 ns` | `532.71 ns` | `588.78 ns` |
| Some.inspectAsync (alloc AsyncOption)     | `670.26 ns/iter` | `649.03 ns` | `668.13 ns` | `776.98 ns` | `804.30 ns` |
| None.inspectAsync (alloc AsyncOption)     | `420.22 ns/iter` | `406.24 ns` | `417.72 ns` | `527.39 ns` | `544.90 ns` |
| Some.andThenAsync (alloc AsyncOption)     | `598.86 ns/iter` | `579.08 ns` | `595.78 ns` | `709.94 ns` | `715.93 ns` |
| None.andThenAsync (alloc AsyncOption)     | `428.24 ns/iter` | `413.68 ns` | `424.55 ns` | `536.63 ns` | `563.05 ns` |
| Some.filterAsync true (alloc AsyncOption) | `652.45 ns/iter` | `630.19 ns` | `650.62 ns` | `761.97 ns` | `788.08 ns` |
| None.filterAsync (alloc AsyncOption)      | `430.15 ns/iter` | `415.15 ns` | `427.29 ns` | `542.03 ns` | `562.86 ns` |
| Some.orElseAsync (alloc AsyncOption)      | `417.84 ns/iter` | `403.99 ns` | `415.20 ns` | `526.24 ns` | `535.01 ns` |
| None.orElseAsync (alloc AsyncOption)      | `588.88 ns/iter` | `568.27 ns` | `584.03 ns` | `701.45 ns` | `885.12 ns` |
| Some.okOrElseAsync (alloc AsyncResult)    | `438.99 ns/iter` | `421.37 ns` | `436.64 ns` | `540.09 ns` | `560.32 ns` |
| None.okOrElseAsync (alloc AsyncResult)    | `647.92 ns/iter` | `626.87 ns` | `644.34 ns` | `765.26 ns` | `783.09 ns` |
| Some.getOrInsertWithAsync (existing)      | `215.85 ns/iter` | `202.94 ns` | `213.48 ns` | `321.21 ns` | `439.78 ns` |
| None.getOrInsertWithAsync (insert)        | `619.66 ns/iter` | `588.60 ns` | `611.87 ns` | `740.62 ns` | `  1.05 µs` |

| • Async Option - then() wrapping | avg              | min         | p75         | p99         | max         |
| -------------------------------- | ---------------- | ----------- | ----------- | ----------- | ----------- |
| AsyncOption.then (await)         | `392.83 ns/iter` | `381.03 ns` | `389.79 ns` | `500.64 ns` | `547.56 ns` |
