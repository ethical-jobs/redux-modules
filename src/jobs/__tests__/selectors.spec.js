import Immutable from 'immutable';
import { ImmutableUtils, Assertions } from '@ethical-jobs/redux';
import { APPROVED, PENDING, DRAFT } from 'jobs/statuses';
import Jobs from 'jobs';

const { selectors } = Jobs;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('jobs', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('jobs', selectors.filters)
  ).toBe(true);
});

test('syncFilters returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      jobs: {
        syncFilters: 'foo-bar-bam',
      },
    }
  });
  expect(Immutable.is('foo-bar-bam', selectors.syncFilters(state))).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('jobs', selectors.result)
  ).toBe(true);
});

test('jobs selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('jobs', 'jobs', selectors.jobs)
  ).toBe(true);
});

test('organisations selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('jobs', 'organisations', selectors.organisations)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single job selector
|--------------------------------------------------------------------------
*/

test('jobByResult selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      jobs: {
        entities: {
          jobs: {
            55425: 'foo-bar-bam',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.jobByResult(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/
describe('filter selector functions', () => {

  const jobs = Immutable.fromJS({
    51: {
      id: 51,
      organisation_id: 15,
      status: PENDING,
      expired: true,
      categories: [10,20,30],
      locations: [10,20,30],
      workTypes: [10,20,30],
      sectors: [20,30,13,33],
    },
    52: {
      id: 52,
      organisation_id: 8,
      status: APPROVED,
      expired: true,
      categories: [10,20,30],
      locations: [10,20,30],
      workTypes: [10,20,30],
      sectors: [20,30,13],
    },
    53: { // <<-- This job should be selected
      id: 53,
      organisation_id: 15,
      status: PENDING,
      expired: true,
      categories: [10,20,30],
      locations: [10,201,30],
      workTypes: [10,20,301],
      sectors: [20,30,13],
    },
  }).toList(); // << NOTE: we are convertion to a list

  const filters = Immutable.fromJS({
    organisationId: 15,
    status: PENDING,
    expired: true,
    categories: [10,20,30,40,50],
    locations: [10,201],
    sectors: [20],
    workTypes: [301],
  });

  test('filteredJobs selector works correctly', () => {
    const result = selectors.filteredJobs.resultFunc(jobs, filters);
    expect(result.includes(jobs.get(2))).toBe(true);
  });

  test('orderedFilteredJobs selector works correctly', () => {
    const result = selectors.orderedFilteredJobs.resultFunc(jobs, filters);
    expect(result.includes(jobs.get(2))).toBe(true);
  });

  test('propsOrderedFilteredJobs selector works correctly', () => {
    const result = selectors.propsOrderedFilteredJobs.resultFunc(jobs, filters);
    expect(result.includes(jobs.get(2))).toBe(true);
  });
});
