# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-

### Changed

-

### Deprecated

-

### Removed

-

### Fixed

-

### Security

-

## [1.0.0] - 2026-02-09

### Added

- Initial public release published to npm as `v1.0.0`.

- SDK entrypoint: `DataCanvas` client exported from `src/index.ts` exposing `devices` and `data` resources and re-exporting types, constants and errors.

- Device management resource: `DevicesResource` with `list()` method to retrieve project devices via the `/access-keys/external/devices` endpoint.

- Data retrieval resource: `DataResource` with `list(params: GetDataParams)` providing filtering, pagination and validation for datatable queries against `/access-keys/external/data`.

- Types & defaults: `SDKConfig`, `GetDataParams`, `Device`, `DataPoint`, `DataResponse`, and `DEFAULT_CONFIG` (pagination and limit defaults and caps).

- Runtime & packaging: built with `tsup` producing CJS/ESM bundles and `.d.ts` declarations; `prepublishOnly` script builds `dist` on publish. Package metadata includes `engines.node` constraint (`>=14.0.0`).

### Changed

-

### Fixed

-

This project follows the Keep a Changelog format and Semantic Versioning.

[unreleased]: https://github.com/Datacanvas-IoT/Datacanvas-NPM/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Datacanvas-IoT/Datacanvas-NPM/releases/tag/v1.0.0
