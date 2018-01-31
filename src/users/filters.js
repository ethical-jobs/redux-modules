import Immutable from 'immutable';

/**
 * Returns users filtered by {roles}
 * @param {Map} user entity
 * @param {String|Collection} roles
 * @returns {Bool}
 */
export function byRoles(user, roles) {
  if (!roles) {
    return true; // pass through
  }
  return user.get('roles').isSuperset(roles);
}

/**
 * Filters user entities
 * @param {Map} Users to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered user state.
 */
export default function selectByFilters(users, filters) {
  return users
    .filter(user => byRoles(user, filters.get('roles')));
}
