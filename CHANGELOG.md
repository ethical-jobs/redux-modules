# Changelog

All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v1.0.0.html).

## [Unreleased]

## [2.6.0]

- trello-102 Add Invitation create action and reducer

## [2.5.4]

- trello-bug-212 Fixed bug where filter was not fetching correct subject

## [2.5.0, 2.5.1]

- Adding Jobs.selectors.attachments
- updating redux package for new entities merger

## [2.3.0]

- Updated packes to use organisation scope ethical-jobs

## [2.2.0]

- Adding ordered enumerable selector
- Migrating to ethical-jobs npm organisation

## [2.1.0]

- Upgrading rollup build facilities
- Only building ES and CommonJS modules.

## [2.0.0]

- Bumping @ethical-jobs/sdk to v1.1.0
- Bumping @ethical-jobs/redux to v1.0.0
- Bumping sem ver t0 v2.0.0 as there are BCs
- Upgraded misc packages

## [1.0.0]

- Bumping to first major version, API has stabalised, Test suite is extensive
- Migrating to proper SemVer 2.0.0 as of v1.0.0 of this package for proper dependancy resolution.

## [0.10.0]

- Activities module for fetching activity log collections

## [0.9.0]

- The prefix for the alert-api from "subscriptions" to "alerts"

## [0.8.0]

- Removed the expired=false filter from Pending job type

## [0.7.0]

- Search requests no longer clear the state tree for that module

## [0.6.5]

- Addressing minor version pataches on ej-sdk package

## [0.6.3]

- SDK version bump v0.3.2

## [0.6.2]

- Modules.Auth.login workflow and token issue

## [0.6.1]

- Modules.Auth.load test for localStorage token

## [0.6.0]

- Breaking changes
- Bumping SDK version.

## [0.5.0]

- Adding Subscriptions module to the exports

## [0.4.1]

- Adding user.patch action and tests

## [0.4.00]

- Users module expanded to first class citizen

## [0.3.14]

- Added orderedTaxonomyWithJobs selector

## [0.3.13]

- Added organisation patch method
- Added adminUserSelector method

## [0.3.12]

- Added Core.js polyfills for Number.IsInteger and Object.Assign for improved browser support in older Safari versions on iOS

## [0.3.10]

- Bumped @ethical-jobs/redux to 0.2.34

## [0.3.9]

- Added LOCK and UNLOCK actions to the Jobs module

## [0.3.8]

- Added new Payments model with PURCHASE action

## [0.3.7]

- bumped ej-redux-modules to 0.3.32
- bumped ej-redux-sdk to 0.2.12
- updated attachMedia job action inline with new API call

## [0.3.5]

- Issue where organisations filters for invoices where not working correctly

## [0.3.4]

- added orderBy param to OrderedTaxonomies selector, title by default

## [0.3.2]

- job syncfilter actions, selectors and reducer logic

## [0.3.0]

- refactored selector names
- refactored jobs selectors

## [0.2.29]

- getFiltersByType returns PENDING + APPROVED when set to expired.
- added bySearched job filter, this filters results in the store by if they have been searched or not.
- TODO: remove `clear` from search results Merger

## [0.2.25]

- Changelog (no backlog)
- jobs clear filter action + tests
