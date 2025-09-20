# Changelog

## [1.9.1](https://github.com/ehmpathy/uni-time/compare/v1.9.0...v1.9.1) (2025-09-20)


### Bug Fixes

* **shapes:** ensure date time satisfies date, since its a superset of info ([23e3725](https://github.com/ehmpathy/uni-time/commit/23e372599c5e3c8c35accf239835c61b13eafbc6))
* **tests:** add more test coverage to asUniDateTime ([5465481](https://github.com/ehmpathy/uni-time/commit/5465481c06e5ef54f1c65b3418e219d4e998e9b5))

## [1.9.0](https://github.com/ehmpathy/uni-time/compare/v1.8.2...v1.9.0) (2025-09-12)


### Features

* **duration:** asDurationInWords ([8d6048e](https://github.com/ehmpathy/uni-time/commit/8d6048e0f4081691f9831945062d72c517d01fa5))

## [1.8.2](https://github.com/ehmpathy/uni-time/compare/v1.8.1...v1.8.2) (2025-07-14)


### Bug Fixes

* **duration:** ensure duration of milliseconds 0 is supported ([0fac0c6](https://github.com/ehmpathy/uni-time/commit/0fac0c6de1ad2361db8f4a265ef171260bb833af))

## [1.8.1](https://github.com/ehmpathy/uni-time/compare/v1.8.0...v1.8.1) (2025-07-05)


### Bug Fixes

* **pkg:** revert to org scoped pkg name ([72e0492](https://github.com/ehmpathy/uni-time/commit/72e0492b17168964d43808e0dede77246380e642))

## [1.8.0](https://github.com/ehmpathy/uni-time/compare/v1.7.4...v1.8.0) (2025-07-05)


### Features

* **checks:** expose isUniDateTimeRange ([2c26eeb](https://github.com/ehmpathy/uni-time/commit/2c26eeb89174f54daebe62cb9ecc61abf45129e7))


### Bug Fixes

* **practs:** bump to latest best ([9394a31](https://github.com/ehmpathy/uni-time/commit/9394a31a87cda73998c6adb5e306b0c6d68c966a))

## [1.7.4](https://github.com/ehmpathy/uni-time/compare/v1.7.3...v1.7.4) (2024-11-21)


### Bug Fixes

* **duration:** add type overrides to distinguish grain in manipulators ([40499e1](https://github.com/ehmpathy/uni-time/commit/40499e1891fb12d834ce99798375fa568fdce146))

## [1.7.3](https://github.com/ehmpathy/uni-time/compare/v1.7.2...v1.7.3) (2024-11-21)


### Bug Fixes

* **pkg:** ensure isUniMonth utils are exported ([f9b12bf](https://github.com/ehmpathy/uni-time/commit/f9b12bf1e97e2dd1565878515a1ec6ad26df812a))

## [1.7.2](https://github.com/ehmpathy/uni-time/compare/v1.7.1...v1.7.2) (2024-11-21)


### Bug Fixes

* **checks:** add checks for UniMonth ([6f061bc](https://github.com/ehmpathy/uni-time/commit/6f061bc5c5f8d7801518281e0642ac6cbe5aacaa))

## [1.7.1](https://github.com/ehmpathy/uni-time/compare/v1.7.0...v1.7.1) (2024-09-12)


### Bug Fixes

* **types:** ensure UniDateTimes are not assignable within UniDateRange ([95a2376](https://github.com/ehmpathy/uni-time/commit/95a23766c401d799094fd23d6e9ec9354b8cfc1a))

## [1.7.0](https://github.com/ehmpathy/uni-time/compare/v1.6.1...v1.7.0) (2024-09-12)


### Features

* **duration:** expose get duration procedure ([87b9d7b](https://github.com/ehmpathy/uni-time/commit/87b9d7bf7f5e6a8bcf0daf32cb86840b357027b2))

## [1.6.1](https://github.com/ehmpathy/uni-time/compare/v1.6.0...v1.6.1) (2024-09-01)


### Bug Fixes

* **practs:** bump practs to latest best ([ddbcff3](https://github.com/ehmpathy/uni-time/commit/ddbcff30e4a3940513b099a277f2f9dd9d042de7))

## [1.6.0](https://github.com/ehmpathy/uni-time/compare/v1.5.0...v1.6.0) (2024-09-01)


### Features

* **observe:** expose duration stopwatch ([c70c2ab](https://github.com/ehmpathy/uni-time/commit/c70c2ab1f235c06592d352f7f3153f9c8c64dda2))

## [1.5.0](https://github.com/ehmpathy/uni-time/compare/v1.4.2...v1.5.0) (2024-08-18)


### Features

* **wrappers:** expose waitFor wrapper ([920410c](https://github.com/ehmpathy/uni-time/commit/920410c27fc6872d73aa1660561c750e9c9042c7))

## [1.4.2](https://github.com/ehmpathy/uni-time/compare/v1.4.1...v1.4.2) (2024-07-21)


### Bug Fixes

* **duration:** support weeks as final duration grain ([f99d8ce](https://github.com/ehmpathy/uni-time/commit/f99d8ce9c2cb36ffca16a2c7808315b52e198aaa))

## [1.4.1](https://github.com/ehmpathy/uni-time/compare/v1.4.0...v1.4.1) (2024-07-21)


### Bug Fixes

* **duration:** handle zero unit durations correctly ([49805d4](https://github.com/ehmpathy/uni-time/commit/49805d412a3f0c79a7d88d2bb3c8e162124637b4))

## [1.4.0](https://github.com/ehmpathy/uni-time/compare/v1.3.0...v1.4.0) (2024-05-26)


### Features

* **manip:** addDuration and subDuration ([0c198f5](https://github.com/ehmpathy/uni-time/commit/0c198f55c0aee0a896380778f290187966387c94))

## [1.3.0](https://github.com/ehmpathy/uni-time/compare/v1.2.0...v1.3.0) (2024-05-26)


### Features

* **cast:** toMillisecondsSinceEpoch ([c91cd01](https://github.com/ehmpathy/uni-time/commit/c91cd01e116640d9a0a61f306832f369ff1bab1e))

## [1.2.0](https://github.com/ehmpathy/uni-time/compare/v1.1.0...v1.2.0) (2024-05-25)


### Features

* **checks:** expose isUniDate and isUniDateTime checks with assure ([f6680b6](https://github.com/ehmpathy/uni-time/commit/f6680b60b4a95cf5eef4a854cdad8cd0c1e11fe9))

## [1.1.0](https://github.com/ehmpathy/uni-time/compare/v1.0.1...v1.1.0) (2024-05-25)


### Features

* **type:** expose UniDateTimeRange ([527dd1e](https://github.com/ehmpathy/uni-time/commit/527dd1e75c88494f954cc5e7720931e16451e9eb))

## [1.0.1](https://github.com/ehmpathy/uni-time/compare/v1.0.0...v1.0.1) (2024-05-25)


### Bug Fixes

* **pkg:** deploy under [@ehmpathy](https://github.com/ehmpathy) namespace to npm ([1721fe8](https://github.com/ehmpathy/uni-time/commit/1721fe86acb78efc4523125588ca223444388002))

## 1.0.0 (2024-05-25)


### Features

* **domain:** expose UniDate, UniDateTime, UniDuration, checks, and sleep ([68807d3](https://github.com/ehmpathy/uni-time/commit/68807d33972e5513e9ef06943a9748e5f9c68e92))
* **init:** initialize repo based on latest best practices ([9bee9bc](https://github.com/ehmpathy/uni-time/commit/9bee9bcb89cf2b3e69fc13fdde4519eeb019b1d3))
