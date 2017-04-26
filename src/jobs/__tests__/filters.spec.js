import Immutable from 'immutable';
import { PENDING, APPROVED, DRAFT } from 'jobs/statuses';
import * as Fltrs from 'jobs/filters';

test('byOrganisationId correctly filters entities', () => {
  const job = Immutable.fromJS({
    organisation_id: 100,
  });
  expect(Fltrs.byOrganisationId(job, 100)).toBe(true);
  expect(Fltrs.byOrganisationId(job, 155)).toBe(false);
});

test('byStatus correctly filters entities', () => {
  const job = Immutable.fromJS({
    status: PENDING,
  });
  expect(Fltrs.byStatus(job, PENDING)).toBe(true);
  expect(Fltrs.byStatus(job, APPROVED)).toBe(false);
});

test('byExpiration correctly filters entities', () => {
  const job = Immutable.fromJS({
    expired: true,
  });
  expect(Fltrs.byExpiration(job, true)).toBe(true);
  expect(Fltrs.byExpiration(job, false)).toBe(false);
});

test('byTaxonomy correctly filters entities', () => {
  const job = Immutable.fromJS({
    categories: [17,33,66],
  });
  expect(Fltrs.byTaxonomy(job, 'categories', [17,33,66,88,99,100,222])).toBe(true);
  expect(Fltrs.byTaxonomy(job, 'categories', [17,33,66])).toBe(true);
  expect(Fltrs.byTaxonomy(job, 'categories', [17,33])).toBe(false);
});
