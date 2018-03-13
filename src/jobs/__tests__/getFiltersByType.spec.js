import getFiltersByType from 'jobs/getFiltersByType';

test('getFiltersByType returns correct default params', () => {
  expect(getFiltersByType()).toEqual({
    status: 'APPROVED',
    expired: false,
  });
});

test('getFiltersByType returns correct params for PENDING', () => {
  expect(getFiltersByType('PENDING')).toEqual({
    status: 'PENDING',
  });
});

test('getFiltersByType returns correct params for EXPIRED', () => {
  expect(getFiltersByType('EXPIRED')).toEqual({
    status: ['APPROVED','PENDING'],
    expired: true,
    limit: 1200,
  });
});

test('getFiltersByType returns correct params for DRAFT', () => {
  expect(getFiltersByType('DRAFT')).toEqual({
    status: 'DRAFT',
    limit: 1200,
  });
});

test('getFiltersByType returns correct params for APPROVED', () => {
  expect(getFiltersByType('APPROVED')).toEqual({
    status: 'APPROVED',
    expired: false,
  });
});