import Immutable from 'immutable';
import { PENDING, APPROVED, DRAFT } from 'jobs/statuses';
import * as Fltrs from 'jobs/filters';

test('byOrganisations correctly filters entities', () => {
  const job = Immutable.fromJS({
    organisation_id: 100,
  });
  expect(Fltrs.byOrganisations(job, 100)).toBe(true);
  expect(Fltrs.byOrganisations(job, 155)).toBe(false);
  expect(Fltrs.byOrganisations(job, Immutable.fromJS([107,150,100]))).toBe(true);
  expect(Fltrs.byOrganisations(job, Immutable.fromJS([99,5,300]))).toBe(false);
  expect(Fltrs.byOrganisations(job, undefined)).toBe(true);
  expect(Fltrs.byOrganisations(job, null)).toBe(true);
});

test('byStatus correctly filters entities ', () => {
  const job = Immutable.fromJS({
    status: PENDING,
  });
  expect(Fltrs.byStatus(job, PENDING)).toBe(true);
  expect(Fltrs.byStatus(job, APPROVED)).toBe(false);
  expect(Fltrs.byStatus(job, '')).toBe(true);
});

test('byStatus collection correctly filters entities ', () => {
  const job = Immutable.fromJS({
    status: PENDING,
  });
  expect(Fltrs.byStatus(job, Immutable.fromJS([PENDING, APPROVED, DRAFT]))).toBe(true);
  expect(Fltrs.byStatus(job, Immutable.fromJS([PENDING, APPROVED]))).toBe(true);
  expect(Fltrs.byStatus(job, Immutable.fromJS([APPROVED]))).toBe(false);
  expect(Fltrs.byStatus(job, Immutable.fromJS([APPROVED, DRAFT]))).toBe(false);
  expect(Fltrs.byStatus(job, Immutable.fromJS(['approved', 'draft']))).toBe(false);
  expect(Fltrs.byStatus(job, Immutable.fromJS(['','??asdj','%4746','foo']))).toBe(false);
});

test('byExpiration correctly filters entities', () => {
  const job = Immutable.fromJS({
    expired: true,
  });
  expect(Fltrs.byExpiration(job, true)).toBe(true);
  expect(Fltrs.byExpiration(job, false)).toBe(false);
  expect(Fltrs.byExpiration(job, undefined)).toBe(true);
  expect(Fltrs.byExpiration(job, null)).toBe(true);
});

test('byTaxonomy correctly filters entities', () => {
  const job = Immutable.fromJS({
    categories: [17,33,66],
  });
  expect(Fltrs.byTaxonomy(job, Immutable.fromJS([17,33,66,88,99]), 'categories')).toBe(true);
  expect(Fltrs.byTaxonomy(job, Immutable.fromJS([17,33]), 'categories')).toBe(true);
  expect(Fltrs.byTaxonomy(job, Immutable.fromJS([105,1010]), 'categories')).toBe(false);
  expect(Fltrs.byTaxonomy(job, undefined, 'categories')).toBe(true);
  expect(Fltrs.byTaxonomy(job, null, 'categories')).toBe(true);
});
