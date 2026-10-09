## [4.3.1](https://github.com/madkarmaa/results-ts/compare/v4.3.0...v4.3.1) (2026-10-09)

### Documentation

- add installable results-ts skill ([c5bca33](https://github.com/madkarmaa/results-ts/commit/c5bca330a08fd1dbb8f523ed21e80474caee998a))
- prefer llms.txt in results-ts skill ([5b44546](https://github.com/madkarmaa/results-ts/commit/5b4454646a9d0b190346229383071587ec1aff0e))
- regenerate API reference ([8980271](https://github.com/madkarmaa/results-ts/commit/8980271f9f0195323cfe64fe770008385e4c37f6))
- require tests and benchmarks for new features ([3a45a14](https://github.com/madkarmaa/results-ts/commit/3a45a14824cafcf90245f4d990a20200ddf3a8c1))
- restrict exception adapters to unavoidable external failures ([82bcd1b](https://github.com/madkarmaa/results-ts/commit/82bcd1b3d24238fd0b35175ca7b5e7b534ec52c0))
- simplify documentation and comments ([493f3f8](https://github.com/madkarmaa/results-ts/commit/493f3f8eafc3c624562921c2d6fcb76392af4130))
- simplify results-ts skill prose ([081d952](https://github.com/madkarmaa/results-ts/commit/081d9527b37c7999ff98eb6eea9e7eb49a4c61bb))

### Performance Improvements

- allocate option insertion bookkeeping lazily ([7a47964](https://github.com/madkarmaa/results-ts/commit/7a479646ac4574aac0406bc0750eef972bdcc5b5))
- reduce async kickoff allocations ([6304f43](https://github.com/madkarmaa/results-ts/commit/6304f43ac36a6620fb98f9047ce2cc15a82d007e))
- share immutable result state in fresh wrappers ([61622af](https://github.com/madkarmaa/results-ts/commit/61622afd15e078cb5fc60d2e7070effc78c4821a))
- simplify async insertion cleanup ([c2b7584](https://github.com/madkarmaa/results-ts/commit/c2b75843714c9c4ece1aa39fa325bcf60824af1c))
- store option payloads without intermediate objects ([a98eee9](https://github.com/madkarmaa/results-ts/commit/a98eee9c8448fd2b0cffdc2e7124d79ed1ec4133))

## [4.3.1-canary.1](https://github.com/madkarmaa/results-ts/compare/v4.3.0...v4.3.1-canary.1) (2026-10-09)

### Performance Improvements

- allocate option insertion bookkeeping lazily ([7a47964](https://github.com/madkarmaa/results-ts/commit/7a479646ac4574aac0406bc0750eef972bdcc5b5))
- reduce async kickoff allocations ([6304f43](https://github.com/madkarmaa/results-ts/commit/6304f43ac36a6620fb98f9047ce2cc15a82d007e))
- share immutable result state in fresh wrappers ([61622af](https://github.com/madkarmaa/results-ts/commit/61622afd15e078cb5fc60d2e7070effc78c4821a))
- simplify async insertion cleanup ([c2b7584](https://github.com/madkarmaa/results-ts/commit/c2b75843714c9c4ece1aa39fa325bcf60824af1c))
- store option payloads without intermediate objects ([a98eee9](https://github.com/madkarmaa/results-ts/commit/a98eee9c8448fd2b0cffdc2e7124d79ed1ec4133))

# [4.3.0](https://github.com/madkarmaa/results-ts/compare/v4.2.7...v4.3.0) (2026-10-08)

### Bug Fixes

- **combinators:** preserve fast paths across realms ([fe835f5](https://github.com/madkarmaa/results-ts/commit/fe835f5be928adf4730208aa5cb4725b3e766d70))

### Features

- **combinators:** support mixed sync and async operands ([e3c12fb](https://github.com/madkarmaa/results-ts/commit/e3c12fb00da68fffa932cbeb0c8ff52514fc0f4d))
- **option:** add zip to sync and async options ([46c03ac](https://github.com/madkarmaa/results-ts/commit/46c03ac32e66aaeb460e18948baa8b9b7e81778a))

# [4.3.0-canary.3](https://github.com/madkarmaa/results-ts/compare/v4.3.0-canary.2...v4.3.0-canary.3) (2026-10-08)

### Bug Fixes

- **combinators:** preserve fast paths across realms ([fe835f5](https://github.com/madkarmaa/results-ts/commit/fe835f5be928adf4730208aa5cb4725b3e766d70))

# [4.3.0-canary.2](https://github.com/madkarmaa/results-ts/compare/v4.3.0-canary.1...v4.3.0-canary.2) (2026-10-08)

### Features

- **combinators:** support mixed sync and async operands ([e3c12fb](https://github.com/madkarmaa/results-ts/commit/e3c12fb00da68fffa932cbeb0c8ff52514fc0f4d))

# [4.3.0-canary.1](https://github.com/madkarmaa/results-ts/compare/v4.2.7...v4.3.0-canary.1) (2026-10-08)

### Features

- **option:** add zip to sync and async options ([46c03ac](https://github.com/madkarmaa/results-ts/commit/46c03ac32e66aaeb460e18948baa8b9b7e81778a))

## [4.2.7](https://github.com/madkarmaa/results-ts/compare/v4.2.6...v4.2.7) (2026-10-08)

### Bug Fixes

- **docs:** resolve documentation paths on Windows ([9662b88](https://github.com/madkarmaa/results-ts/commit/9662b88f152bda56cedcc75b644941bab45dbe1f))

### Dependency Updates

- update deps ([a84c4bc](https://github.com/madkarmaa/results-ts/commit/a84c4bc6c4d81a6083c1840711c851b72a34d7d8))

### Documentation

- **agents:** update instructions ([8f5d45e](https://github.com/madkarmaa/results-ts/commit/8f5d45ebd75aa2560e6c94a4e5d2c01a888264bb))
- auto-generate llms.txt ([#52](https://github.com/madkarmaa/results-ts/issues/52)) ([b0b146a](https://github.com/madkarmaa/results-ts/commit/b0b146a5207e44eabae51c84467d8f9683ddf177))

## [4.2.7-canary.1](https://github.com/madkarmaa/results-ts/compare/v4.2.6...v4.2.7-canary.1) (2026-10-08)

### Bug Fixes

- **docs:** resolve documentation paths on Windows ([9662b88](https://github.com/madkarmaa/results-ts/commit/9662b88f152bda56cedcc75b644941bab45dbe1f))

### Dependency Updates

- update deps ([a84c4bc](https://github.com/madkarmaa/results-ts/commit/a84c4bc6c4d81a6083c1840711c851b72a34d7d8))

### Documentation

- **agents:** update instructions ([8f5d45e](https://github.com/madkarmaa/results-ts/commit/8f5d45ebd75aa2560e6c94a4e5d2c01a888264bb))
- auto-generate llms.txt ([#52](https://github.com/madkarmaa/results-ts/issues/52)) ([b0b146a](https://github.com/madkarmaa/results-ts/commit/b0b146a5207e44eabae51c84467d8f9683ddf177))

## [4.2.6](https://github.com/madkarmaa/results-ts/compare/v4.2.5...v4.2.6) (2026-07-16)

### Bug Fixes

- restore PanicError stack traces ([dda7b6a](https://github.com/madkarmaa/results-ts/commit/dda7b6ac869af9653d4ce23c0598937527949fc1))

## [4.2.5](https://github.com/madkarmaa/results-ts/compare/v4.2.4...v4.2.5) (2026-07-15)

### Bug Fixes

- **ci:** bump to the next canary ([9fc2c69](https://github.com/madkarmaa/results-ts/commit/9fc2c6943b8747a4228bd4eebd028aea7ff84f5d))
- **ci:** repair canary release history ([ffe0f42](https://github.com/madkarmaa/results-ts/commit/ffe0f428929e9a21296d14e67eb2cb545de0b9d3))
- **docs:** keep guide navigation active ([614b079](https://github.com/madkarmaa/results-ts/commit/614b079a68a4d46ea491310398fa17d4da59babe))

### Dependency Updates

- update deps ([7c9e783](https://github.com/madkarmaa/results-ts/commit/7c9e783c99f55ddbefd66a6493753d55f70dc8c2))

### Documentation

- eliminate spaces in badge links in README ([#50](https://github.com/madkarmaa/results-ts/issues/50)) ([1410bac](https://github.com/madkarmaa/results-ts/commit/1410bacd93f27de4bcc090ec4c43cdc3c2f9b5df))
- **fix:** uncapitalize some words ([f2d66a8](https://github.com/madkarmaa/results-ts/commit/f2d66a8acabd32e0f4eef6c6eba33bdadde62582))
- **guide:** restructure introductory content ([e52b190](https://github.com/madkarmaa/results-ts/commit/e52b190fa6e757220a2c419a9cab228adea8e044))
- reword panics concept ([e36afe5](https://github.com/madkarmaa/results-ts/commit/e36afe5134b1aa5ad4ff053b3dc5fbd94017751e))
- update readme ([1e090ec](https://github.com/madkarmaa/results-ts/commit/1e090ecd3a1c2063ae92a4e61818b54dec9c17e2))

### Performance Improvements

- remove PanicError's stack trace ([031e8de](https://github.com/madkarmaa/results-ts/commit/031e8deb4411775c34dbeca77a0261ac498cfe4f))

## [4.2.5-canary.2](https://github.com/madkarmaa/results-ts/compare/v4.2.5-canary.1...v4.2.5-canary.2) (2026-07-13)

### Bug Fixes

- **ci:** bump to the next canary ([9fc2c69](https://github.com/madkarmaa/results-ts/commit/9fc2c6943b8747a4228bd4eebd028aea7ff84f5d))
- **ci:** repair canary release history ([ffe0f42](https://github.com/madkarmaa/results-ts/commit/ffe0f428929e9a21296d14e67eb2cb545de0b9d3))
- **docs:** keep guide navigation active ([614b079](https://github.com/madkarmaa/results-ts/commit/614b079a68a4d46ea491310398fa17d4da59babe))

### Dependency Updates

- update deps ([7c9e783](https://github.com/madkarmaa/results-ts/commit/7c9e783c99f55ddbefd66a6493753d55f70dc8c2))

### Documentation

- eliminate spaces in badge links in README ([#50](https://github.com/madkarmaa/results-ts/issues/50)) ([1410bac](https://github.com/madkarmaa/results-ts/commit/1410bacd93f27de4bcc090ec4c43cdc3c2f9b5df))
- **guide:** restructure introductory content ([e52b190](https://github.com/madkarmaa/results-ts/commit/e52b190fa6e757220a2c419a9cab228adea8e044))
- update readme ([1e090ec](https://github.com/madkarmaa/results-ts/commit/1e090ecd3a1c2063ae92a4e61818b54dec9c17e2))

## [4.2.5-canary.1](https://github.com/madkarmaa/results-ts/compare/v4.2.4...v4.2.5-canary.1) (2026-07-11)

### Performance Improvements

- remove PanicError's stack trace ([031e8de](https://github.com/madkarmaa/results-ts/commit/031e8deb4411775c34dbeca77a0261ac498cfe4f))

## [4.2.4](https://github.com/madkarmaa/results-ts/compare/v4.2.3...v4.2.4) (2026-07-11)

### Dependency Updates

- update deps ([e06d87f](https://github.com/madkarmaa/results-ts/commit/e06d87f4712f84aa3ce77c0017af1c5cbf61db14))

## [4.2.3](https://github.com/madkarmaa/results-ts/compare/v4.2.2...v4.2.3) (2026-07-10)

### Dependency Updates

- update deps ([43d5c9e](https://github.com/madkarmaa/results-ts/commit/43d5c9e7bc65118c6b42ba2e091701fd0e5f475a))

### Documentation

- reword some sentences ([456f1b6](https://github.com/madkarmaa/results-ts/commit/456f1b6ed4908db138c2323ab4ca358edd0e5535))

## [4.2.3-canary.3](https://github.com/madkarmaa/results-ts/compare/v4.2.3-canary.2...v4.2.3-canary.3) (2026-07-10)

### Dependency Updates

- update deps ([f34f431](https://github.com/madkarmaa/results-ts/commit/f34f4313622fe554980129a498e23df812d74510))

## [4.2.3-canary.2](https://github.com/madkarmaa/results-ts/compare/v4.2.3-canary.1...v4.2.3-canary.2) (2026-07-10)

## [4.2.3-canary.1](https://github.com/madkarmaa/results-ts/compare/v4.2.2...v4.2.3-canary.1) (2026-07-10)

## [4.2.2](https://github.com/madkarmaa/results-ts/compare/v4.2.1...v4.2.2) (2026-06-29)

### Bug Fixes

- shorten website url ([9655297](https://github.com/madkarmaa/results-ts/commit/9655297ad0b810274341b7bb0e7068caa523c30c))

### Documentation

- **fix:** also show methods in website sidebar ([79cc492](https://github.com/madkarmaa/results-ts/commit/79cc4925bb369e47185133b7a5a57daa8a64d21b))

## [4.2.1](https://github.com/madkarmaa/results-ts/compare/v4.2.0...v4.2.1) (2026-06-29)

### Bug Fixes

- **docs:** match readme style ([15bea49](https://github.com/madkarmaa/results-ts/commit/15bea492a91924808a37e246b716be78ec79f497))

### Documentation

- add `typedoc` + `vitepress` documentation website ([#45](https://github.com/madkarmaa/results-ts/issues/45)) ([0543c72](https://github.com/madkarmaa/results-ts/commit/0543c72eeb49c4fad399742918e42536b0e34b0c))

## [4.2.0](https://github.com/madkarmaa/results-ts/compare/v4.1.1...v4.2.0) (2026-06-26)

### Features

- add `fromThrowable` and `fromThrowableAsync` helper methods ([#41](https://github.com/madkarmaa/results-ts/issues/41)) ([52560d8](https://github.com/madkarmaa/results-ts/commit/52560d85918ddb60b8004b7cdfd1896740f47ee6))

### Documentation

- add badges ([1834c77](https://github.com/madkarmaa/results-ts/commit/1834c776ef4ff50bf8a03ee374118ac35477b443))
- add contributors section ([7174b2b](https://github.com/madkarmaa/results-ts/commit/7174b2b7b6475b1746b22af4d526b21af601351e))
- update jsdocs and readme for `catchUnwind` ([a9e848b](https://github.com/madkarmaa/results-ts/commit/a9e848b23ebd416c1e75052116956ac7388526ff))

## [4.1.1](https://github.com/madkarmaa/results-ts/compare/v4.1.0...v4.1.1) (2026-06-24)

### Bug Fixes

- use custom token to bypass branch push rules [skip ci] ([e7acdfd](https://github.com/madkarmaa/results-ts/commit/e7acdfd70053eba54893d1c5d87fa2e0cafa9cc2))

### Performance Improvements

- fewer allocations ([#38](https://github.com/madkarmaa/results-ts/issues/38)) ([08cfc4b](https://github.com/madkarmaa/results-ts/commit/08cfc4bca935dffb52bcfa66259561d8ddf9f113))
- manually implement generator protocol ([b96b830](https://github.com/madkarmaa/results-ts/commit/b96b830997f4f931b762ed0b1aaac3af86ee86e6))

## [4.1.0](https://github.com/madkarmaa/results-ts/compare/v4.0.1...v4.1.0) (2026-06-23)

### Features

- add transpose and unzip for Option/Result and async variants ([42cddaf](https://github.com/madkarmaa/results-ts/commit/42cddafe39e18f674f982f8ea855ddea810d3110))

## [4.0.1](https://github.com/madkarmaa/results-ts/compare/v4.0.0...v4.0.1) (2026-06-23)

### Bug Fixes

- bugfixes and performance improvements ([#30](https://github.com/madkarmaa/results-ts/issues/30)) ([3c322e2](https://github.com/madkarmaa/results-ts/commit/3c322e23fe6dc47ce89641f0e4b531cb9c7c656d))

### Miscellaneous Chores

- merge branch `dev` to `main` ([#32](https://github.com/madkarmaa/results-ts/issues/32)) ([fb27818](https://github.com/madkarmaa/results-ts/commit/fb27818cc5384c2fc0edc2329df0c55c75c3977b)), closes [#31](https://github.com/madkarmaa/results-ts/issues/31)

### Continuous Integration

- scope canary to dev ([78a2464](https://github.com/madkarmaa/results-ts/commit/78a2464380e41b066362bb14505fd6774784f73f))
- use PAT token to bypass branch protection ruleset ([38abe4d](https://github.com/madkarmaa/results-ts/commit/38abe4d9c72030148fd7740cc6f4837a6c7a84eb))
