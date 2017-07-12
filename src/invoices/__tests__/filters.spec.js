import Immutable from 'immutable';
import * as Fltrs from 'invoices/filters';

test('byOrganisations correctly filters entities', () => {
  const invoice = Immutable.fromJS({
    organisation_id: 100,
  });
  expect(Fltrs.byOrganisations(invoice, 100)).toBe(true);
  expect(Fltrs.byOrganisations(invoice, 155)).toBe(false);
  expect(Fltrs.byOrganisations(invoice, Immutable.fromJS([107,150,100]))).toBe(true);
  expect(Fltrs.byOrganisations(invoice, Immutable.fromJS([99,5,300]))).toBe(false);
  expect(Fltrs.byOrganisations(invoice, undefined)).toBe(true);
  expect(Fltrs.byOrganisations(invoice, null)).toBe(true);
});
