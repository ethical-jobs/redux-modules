# 0.3.14

- Added orderedTaxonomyWithJobs selector

# 0.3.13

- Added organisation patch method
- Added adminUserSelector method

# 0.3.12

- Added Core.js polyfills for Number.IsInteger and Object.Assign for improved browser support in older Safari versions on iOS <=8

# 0.3.10

- Bumped ethical-jobs-redux to 0.2.34

# 0.3.9

- Added LOCK and UNLOCK actions to the Jobs module 

# 0.3.8

- Added new Payments model with PURCHASE action

# 0.3.7

- bumped ej-redux-modules to 0.3.32
- bumped ej-redux-sdk to 0.2.12
- updated attachMedia job action inline with new API call

# 0.3.5

- Issue where organisations filters for invoices where not working correctly

# 0.3.4

- added orderBy param to OrderedTaxonomies selector, title by default

# 0.3.2

- job syncfilter actions, selectors and reducer logic

# 0.3.0

- refactored selector names
- refactored jobs selectors

# 0.2.29

- getFiltersByType returns PENDING + APPROVED when set to expired.
- added bySearched job filter, this filters results in the store by if they have been searched or not.
- TODO: remove `clear` from search results Merger

# 0.2.25

- Changelog (no backlog)
- jobs clear filter action + tests
