import Immutable from 'immutable';
import * as Fltrs from 'invoices/filters';

test('byOrganisationId correctly filters entities', () => {
  const invoice = Immutable.fromJS({
    organisation_id: 100,
  });
  expect(Fltrs.byOrganisationId(invoice, 100)).toBe(true);
  expect(Fltrs.byOrganisationId(invoice, 155)).toBe(false);
});
