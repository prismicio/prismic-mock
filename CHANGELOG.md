# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/prismicio/prismic-mock/compare/v0.0.5...v0.0.6) (2021-08-28)


### Features

* rename slices config to sliceZone ([50c1c9f](https://github.com/prismicio/prismic-mock/commit/50c1c9f3fca4d66b84d7e781ca8cb5f4290a0ed6))
* return alternative language documents for mock documents ([4444df2](https://github.com/prismicio/prismic-mock/commit/4444df26736471ced2a875f0d52c681d96e2b0a3))
* use given variations in a Shared Slice model ([c5b7afd](https://github.com/prismicio/prismic-mock/commit/c5b7afd6ddef481c2781f3dd8e9d4c6bafd69022))


### Bug Fixes

* generate image thumbnail names without spaces ([25b26b6](https://github.com/prismicio/prismic-mock/commit/25b26b65768abdebed6f1d9438bcf699aba017f8))
* use Custom Type tab names with more variety ([f2c905c](https://github.com/prismicio/prismic-mock/commit/f2c905cc1b896c83fc3ea1217da43d81863ccccf))


### Refactor

* fix const name typo ([52d8119](https://github.com/prismicio/prismic-mock/commit/52d81191cc5cbdb3c3d26035aa05859355ac0b51))

### [0.0.5](https://github.com/prismicio/prismic-mock/compare/v0.0.4...v0.0.5) (2021-08-23)


### Features

* mock a Slice Zone with given choice models ([a565ebc](https://github.com/prismicio/prismic-mock/commit/a565ebc07b196052223eb3dc4a6cb3fe4b142c52))
* support string seed ([3616cb8](https://github.com/prismicio/prismic-mock/commit/3616cb840c41dc9b11326a1a49b0980f7df64f39))


### Bug Fixes

* filter UID field from document's data field ([5e17ec9](https://github.com/prismicio/prismic-mock/commit/5e17ec94e78976a85de57d37f102040dfb719b34))
* generate mock sliceZone choices if none are given ([c421c46](https://github.com/prismicio/prismic-mock/commit/c421c46ae5489e540308abd5e236f5e0ae9f5564))

### [0.0.4](https://github.com/prismicio/prismic-mock/compare/v0.0.3...v0.0.4) (2021-08-20)


### Features

* add api mocks ([8e0ef1b](https://github.com/prismicio/prismic-mock/commit/8e0ef1be718a11482ecc2fbc9dc8c58ceda71cdc))

### [0.0.3](https://github.com/prismicio/prismic-mock/compare/v0.0.2...v0.0.3) (2021-08-19)


### Features

* support integration fields and linked documents ([921ce13](https://github.com/prismicio/prismic-mock/commit/921ce134cb530cfface37bf52f11a29f914f4ba2))


### Bug Fixes

* types ([3fe946e](https://github.com/prismicio/prismic-mock/commit/3fe946ecd74bfcfc306cef05ed57abca23307c86))
* use deterministic timestamp for integration fields ([e3112d9](https://github.com/prismicio/prismic-mock/commit/e3112d92c215c582c3124c551230f08d6c930a51))


### Documentation

* add missing documentation disclaimer ([9dca75f](https://github.com/prismicio/prismic-mock/commit/9dca75f20f1d0db54ea52a9cee77f5ee0a608b2b))

### [0.0.2](https://github.com/prismicio/prismic-mock/compare/v0.0.1...v0.0.2) (2021-08-11)


### Features

* allow explicit blank target for link values ([93c87cf](https://github.com/prismicio/prismic-mock/commit/93c87cfc4960cb9f2dc4c43f734431bb039f7877))
* use mock URLs for url fields ([414f35e](https://github.com/prismicio/prismic-mock/commit/414f35e14d3aad1ddb95a44c79afb65021a65e69))

### 0.0.1 (2021-08-11)


### Features

* add document generator ([edd7787](https://github.com/prismicio/prismic-mock/commit/edd778712c41fe6f9e3018b6ef203e4b23bbc82f))
* add group and slice value generators ([2804d36](https://github.com/prismicio/prismic-mock/commit/2804d36652b09b927195fc552c45179477d126c1))
* add model generators ([ad95cd2](https://github.com/prismicio/prismic-mock/commit/ad95cd2a04383ea0ccc52a1cb11aeaa4dfc9c021))
* add non-group-based value generators ([5561ea1](https://github.com/prismicio/prismic-mock/commit/5561ea1aff5877b5230079f92e6e509e679427a5))
* add remaining field model generators ([66b5ee5](https://github.com/prismicio/prismic-mock/commit/66b5ee5c5ab8ba39ef1a636b58f0acdac27e0260))
* add rich text value generators ([f8bc705](https://github.com/prismicio/prismic-mock/commit/f8bc7058d521f5bc3e12518466cb6c1a19f26b87))
* add subset of value generators ([50bcf16](https://github.com/prismicio/prismic-mock/commit/50bcf1695109a2b94f47ef28c355855771d7379f))
* enable deterministic generation ([7332eac](https://github.com/prismicio/prismic-mock/commit/7332eac1d0c8b015d598530f9550635eb6d3f852))
* export model and value modules from index ([1a56262](https://github.com/prismicio/prismic-mock/commit/1a56262977cec22069fbbe8c086d8036a19cf195))
* init ([4e24f1c](https://github.com/prismicio/prismic-mock/commit/4e24f1c590570e881e7cda14fd87c463336e1e14))


### Bug Fixes

* don't set labels when using Shared Slices ([4725b5e](https://github.com/prismicio/prismic-mock/commit/4725b5e75c30c33d1678b3b1824cef1586c823e6))
* prioritize specific seeds over general ones ([27b795f](https://github.com/prismicio/prismic-mock/commit/27b795ff7587befcf962918a32089d92c4962f0e))
* use enum for Rich Text block type ([2689a52](https://github.com/prismicio/prismic-mock/commit/2689a52cf7fb83190ce5f48b0fad9a51a62c6a70))


### Documentation

* add experimental notice ([f20e12c](https://github.com/prismicio/prismic-mock/commit/f20e12c67a4765c5197b016e5bc353dee473f017))
* add README content ([7450b75](https://github.com/prismicio/prismic-mock/commit/7450b752ef4210d09ed29f0f4a543084baf6e3de))
* use more general package description ([e6edd0f](https://github.com/prismicio/prismic-mock/commit/e6edd0fe5ecde1a6fb8871b9ab228a4597b60573))


### Refactor

* rename getRandomXData to getMockXData ([b92ed9a](https://github.com/prismicio/prismic-mock/commit/b92ed9ac81b0b3f3eb12008854cd490aa60b1667))


### Chore

* remove node-fetch ([661f7fe](https://github.com/prismicio/prismic-mock/commit/661f7fe01b1d767eafb296737c2334d1d505a8e1))
* update dependencies ([df45798](https://github.com/prismicio/prismic-mock/commit/df457987d5d97acff8f9778794344d75cb2dfbc3))
* update package.json properties ([ebff577](https://github.com/prismicio/prismic-mock/commit/ebff577e67a141d42410074e13cf8b247f5462fa))
