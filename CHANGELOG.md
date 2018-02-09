# Changelog

All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v1.0.0.html).

## [Unreleased]

## [0.6.1] - 2018-02-07

### Fixed

- Modules.Auth.load test for localStorage token

## [0.6.0] - 2018-02-07

### Added

- Breaking changes
- Bumping SDK version.

## [0.5.0] - 2018-02-07

### Added

- Adding Subscriptions module to the exports

## [0.4.1]

### Added

- Adding user.patch action and tests

## [0.4.00]

### Added

- Users module expanded to first class citizen

## [0.3.14]

### Added

- Added orderedTaxonomyWithJobs selector

## [0.3.13]

### Added

- Added organisation patch method
- Added adminUserSelector method

## [0.3.12]

### Added

- Added Core.js polyfills for Number.IsInteger and Object.Assign for improved browser support in older Safari versions on iOS <=8

## [0.3.10]

### Added

- Bumped ethical-jobs-redux to 0.2.34

## [0.3.9]

### Added

- Added LOCK and UNLOCK actions to the Jobs module 

## [0.3.8]

### Added

- Added new Payments model with PURCHASE action

## [0.3.7]

### Changed 

- bumped ej-redux-modules to 0.3.32
- bumped ej-redux-sdk to 0.2.12
- updated attachMedia job action inline with new API call

## [0.3.5]

### Fixed 

- Issue where organisations filters for invoices where not working correctly

## [0.3.4]

### Added 

- added orderBy param to OrderedTaxonomies selector, title by default

## [0.3.2]

### Changed

- job syncfilter actions, selectors and reducer logic

## [0.3.0]

### Changed

- refactored selector names
- refactored jobs selectors

## [0.2.29]

### Changed

- getFiltersByType returns PENDING + APPROVED when set to expired.
- added bySearched job filter, this filters results in the store by if they have been searched or not.
- TODO: remove `clear` from search results Merger

## [0.2.25]

### Added

- Changelog (no backlog)
- jobs clear filter action + tests
