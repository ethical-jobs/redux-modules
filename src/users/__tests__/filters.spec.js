import Immutable from 'immutable';
import * as Fltrs from 'users/filters';

test('byRoles correctly filters entities', () => {
  const user = Immutable.fromJS({
    roles: ['staff-member','admin','relations-team'],
  });
  expect(Fltrs.byRoles(user, ['staff-member'])).toBe(true);
  expect(Fltrs.byRoles(user, ['staff-member','admin'])).toBe(true);
  expect(Fltrs.byRoles(user, ['staff-member','relations-team'])).toBe(true);
  expect(Fltrs.byRoles(user, ['staff-member','admin','relations-team'])).toBe(true);
  expect(Fltrs.byRoles(user, ['job-seeker'])).toBe(false);
  expect(Fltrs.byRoles(user, ['staff-member','job-seeker'])).toBe(false);
  expect(Fltrs.byRoles(user, Immutable.fromJS(['staff-member']))).toBe(true);
  expect(Fltrs.byRoles(user, Immutable.fromJS(['job-seeker']))).toBe(false);
  expect(Fltrs.byRoles(user, undefined)).toBe(true);
  expect(Fltrs.byRoles(user, null)).toBe(true);
});
