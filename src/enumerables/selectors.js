
export const rootSelector = (state) => state.getIn(['entities','enumerables']);

export const fetchingSelector = (state) => state.getIn(['entities','enumerables','fetching']);

export const enumerablesSelector = (state) => state.getIn(['entities','enumerables','enumerables']);
