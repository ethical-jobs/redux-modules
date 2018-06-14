'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ethicalJobsRedux = require('@ethical-jobs/redux');
var Api = _interopDefault(require('@ethical-jobs/sdk'));
var Immutable = require('immutable');
var Immutable__default = _interopDefault(Immutable);

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_APP_DATA = ethicalJobsRedux.createActionType('APP/FETCH_DATA');
var UPLOAD_MEDIA = ethicalJobsRedux.createActionType('APP/UPLOAD_MEDIA');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchAppData = function fetchAppData() {
  return {
    type: FETCH_APP_DATA,
    payload: Api.get('/')
  };
};

var uploadMedia = function uploadMedia(file) {
  return {
    type: UPLOAD_MEDIA,
    payload: Api.media.upload(file)
  };
};

var actions = /*#__PURE__*/Object.freeze({
  FETCH_APP_DATA: FETCH_APP_DATA,
  UPLOAD_MEDIA: UPLOAD_MEDIA,
  fetchAppData: fetchAppData,
  uploadMedia: uploadMedia
});

var App = {
  actions: actions
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var LOGIN = ethicalJobsRedux.createActionType('AUTH/LOGIN');
var LOGOUT = ethicalJobsRedux.createActionType('AUTH/LOGOUT');
var LOAD = ethicalJobsRedux.createActionType('AUTH/LOAD');
var RECOVER = ethicalJobsRedux.createActionType('AUTH/RECOVER');
var RESET = ethicalJobsRedux.createActionType('AUTH/RESET');
var DO_THIS = ethicalJobsRedux.createActionType('AUTH/DO_THIS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var login = function login(params) {
  return {
    type: LOGIN,
    payload: Api.auth.login(params)
  };
};

var logout = function logout() {
  return {
    type: LOGOUT,
    payload: Api.auth.logout()
  };
};

var load = function load() {
  return {
    type: LOAD,
    payload: Api.auth.load()
  };
};

var recover = function recover(params) {
  return {
    type: RECOVER,
    payload: Api.auth.recoverPassword(params)
  };
};

var reset = function reset(params) {
  return {
    type: RESET,
    payload: Api.auth.resetPassword(params)
  };
};

var actions$1 = /*#__PURE__*/Object.freeze({
  LOGIN: LOGIN,
  LOGOUT: LOGOUT,
  LOAD: LOAD,
  RECOVER: RECOVER,
  RESET: RESET,
  DO_THIS: DO_THIS,
  login: login,
  logout: logout,
  load: load,
  recover: recover,
  reset: reset
});

// Initial state
var initialState = Immutable__default.fromJS({
  fetching: false,
  error: false,
  entities: {},
  results: [],
  result: false
});

/**
 * Auth reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ethicalJobsRedux.REQUEST(LOGIN):
    case ethicalJobsRedux.REQUEST(LOGOUT):
    case ethicalJobsRedux.REQUEST(LOAD):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(LOGIN):
    case ethicalJobsRedux.SUCCESS(LOAD):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(LOGOUT):
      return initialState;

    case ethicalJobsRedux.FAILURE(LOGIN):
    case ethicalJobsRedux.FAILURE(LOGOUT):
    case ethicalJobsRedux.FAILURE(LOAD):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);

var fetching = ethicalJobsRedux.SelectorFactory.create('auth', 'fetching');

var error = ethicalJobsRedux.SelectorFactory.create('auth', 'error');

var result = ethicalJobsRedux.SelectorFactory.createResultSelector('auth');

var results = ethicalJobsRedux.SelectorFactory.createResultsSelector('auth');

var users = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('auth', 'users');

var organisations = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('auth', 'organisations');

var authedUser = ethicalJobsRedux.SelectorFactory.createIdSelector(users, result);

var authedOrganisation = createSelector([organisations, authedUser], function (orgs, user) {
  return orgs.get(user.get('organisation_id', '').toString());
});

var selectors = /*#__PURE__*/Object.freeze({
  fetching: fetching,
  error: error,
  result: result,
  results: results,
  users: users,
  organisations: organisations,
  authedUser: authedUser,
  authedOrganisation: authedOrganisation
});

var index = {
  reducer: reducer,
  actions: actions$1,
  selectors: selectors
};

// Initial state
var initialState$1 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  creditPacks: []
});

/**
 * Credits reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$1() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ethicalJobsRedux.REQUEST(App.actions.FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(App.actions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('creditPacks', Immutable__default.fromJS(action.payload.data.creditPacks));

    case ethicalJobsRedux.FAILURE(App.actions.FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var PURCHASE = ethicalJobsRedux.createActionType('CREDITS/PURCHASE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var purchase = function purchase(params) {
  return {
    type: PURCHASE,
    payload: Api.post('/credits/purchase', params)
  };
};

var actions$2 = /*#__PURE__*/Object.freeze({
  PURCHASE: PURCHASE,
  purchase: purchase
});

var fetching$1 = ethicalJobsRedux.SelectorFactory.create('credits', 'fetching');

var error$1 = ethicalJobsRedux.SelectorFactory.create('credits', 'error');

var creditPacks = function creditPacks(state) {
  return state.getIn(['entities', 'credits', 'creditPacks']);
};

var selectors$1 = /*#__PURE__*/Object.freeze({
  fetching: fetching$1,
  error: error$1,
  creditPacks: creditPacks
});

var index$1 = {
  reducer: reducer$1,
  selectors: selectors$1,
  actions: actions$2
};

// Initial state
var initialState$2 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  enumerables: {}
});

/**
 * Enumerables reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$2;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ethicalJobsRedux.REQUEST(App.actions.FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(App.actions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('enumerables', Immutable__default.fromJS(action.payload.data.enumerables));

    case ethicalJobsRedux.FAILURE(App.actions.FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$2 = ethicalJobsRedux.SelectorFactory.create('enumerables', 'fetching');

var error$2 = ethicalJobsRedux.SelectorFactory.create('enumerables', 'error');

var enumerables = function enumerables(state) {
  return state.getIn(['entities', 'enumerables', 'enumerables']);
};

var orderedEnumerable = function orderedEnumerable(state, enumerableKey) {
  return state.getIn(["entities", "enumerables", "enumerables", enumerableKey], Immutable.Map()).sortBy(function (value, key) {
    return value;
  });
};

var selectors$2 = /*#__PURE__*/Object.freeze({
  fetching: fetching$2,
  error: error$2,
  enumerables: enumerables,
  orderedEnumerable: orderedEnumerable
});

var index$2 = {
  reducer: reducer$2,
  selectors: selectors$2
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION = ethicalJobsRedux.createActionType('INVOICES/FETCH_COLLECTION');
var FETCH_ENTITY = ethicalJobsRedux.createActionType('INVOICES/FETCH_ENTITY');
var SEARCH = ethicalJobsRedux.createActionType('INVOICES/SEARCH');
var CREATE = ethicalJobsRedux.createActionType('INVOICES/CREATE');
var UPDATE = ethicalJobsRedux.createActionType('INVOICES/UPDATE');
var ARCHIVE = ethicalJobsRedux.createActionType('INVOICES/ARCHIVE');
var RESTORE = ethicalJobsRedux.createActionType('INVOICES/RESTORE');
var CLEAR_ENTITIES = ethicalJobsRedux.createActionType('INVOICES/CLEAR_ENTITIES');
var UPDATE_FILTERS = ethicalJobsRedux.createActionType('INVOICES/UPDATE_FILTERS');
var REPLACE_FILTERS = ethicalJobsRedux.createActionType('INVOICES/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION,
    payload: Api.get('/invoices', params)
  };
};

var fetchEntity = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY,
    payload: Api.get('/invoices/' + id)
  };
};

var searchCollection = function searchCollection(params) {
  return {
    type: SEARCH,
    payload: Api.search('invoices', params)
  };
};

var create = function create(params) {
  return {
    type: CREATE,
    payload: Api.post('/invoices', params)
  };
};

var update = function update(id, params) {
  return {
    type: UPDATE,
    payload: Api.put('/invoices/' + id, params)
  };
};

var archive = function archive(id) {
  return {
    type: ARCHIVE,
    payload: Api.archive('invoices', id)
  };
};

var restore = function restore(id) {
  return {
    type: RESTORE,
    payload: Api.restore('invoices', id)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clear = function clear() {
  return {
    type: CLEAR_ENTITIES
  };
};

var updateFilters = function updateFilters(filters) {
  return {
    type: UPDATE_FILTERS,
    payload: filters
  };
};

var replaceFilters = function replaceFilters(filters) {
  return {
    type: REPLACE_FILTERS,
    payload: filters
  };
};

var actions$3 = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION,
  FETCH_ENTITY: FETCH_ENTITY,
  SEARCH: SEARCH,
  CREATE: CREATE,
  UPDATE: UPDATE,
  ARCHIVE: ARCHIVE,
  RESTORE: RESTORE,
  CLEAR_ENTITIES: CLEAR_ENTITIES,
  UPDATE_FILTERS: UPDATE_FILTERS,
  REPLACE_FILTERS: REPLACE_FILTERS,
  fetchCollection: fetchCollection,
  fetchEntity: fetchEntity,
  searchCollection: searchCollection,
  create: create,
  update: update,
  archive: archive,
  restore: restore,
  clear: clear,
  updateFilters: updateFilters,
  replaceFilters: replaceFilters
});

// Initial state
var initialState$3 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Invoice reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer$3() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$3;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(SEARCH):
    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY):
    case ethicalJobsRedux.REQUEST(CREATE):
    case ethicalJobsRedux.REQUEST(UPDATE):
    case ethicalJobsRedux.REQUEST(ARCHIVE):
    case ethicalJobsRedux.REQUEST(RESTORE):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY):
    case ethicalJobsRedux.SUCCESS(CREATE):
    case ethicalJobsRedux.SUCCESS(UPDATE):
    case ethicalJobsRedux.SUCCESS(ARCHIVE):
    case ethicalJobsRedux.SUCCESS(RESTORE):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION):
    case ethicalJobsRedux.SUCCESS(SEARCH):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY):
    case ethicalJobsRedux.FAILURE(CREATE):
    case ethicalJobsRedux.FAILURE(UPDATE):
    case ethicalJobsRedux.FAILURE(ARCHIVE):
    case ethicalJobsRedux.FAILURE(RESTORE):
    case ethicalJobsRedux.FAILURE(SEARCH):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/**
 * Returns invoices filtered by {organisationId}
 * @param {Map} invoice entity
 * @param {Number|Collection} organisations
 * @returns {Bool}
 */
function byOrganisations(invoice, organisations) {
  if (!organisations) {
    return true; // pass through
  }
  if (Immutable__default.isCollection(organisations)) {
    return organisations.includes(invoice.get('organisation_id'));
  }
  return invoice.get('organisation_id') === organisations;
}

/**
 * Filters invoice entities
 * @param {Map} Invoices to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered invoice state.
 */
function selectByFilters(invoices, filters) {
  return invoices.filter(function (invoice) {
    return byOrganisations(invoice, filters.get('organisations'));
  });
}

var fetching$3 = ethicalJobsRedux.SelectorFactory.create('invoices', 'fetching');

var error$3 = ethicalJobsRedux.SelectorFactory.create('invoices', 'error');

var filters = ethicalJobsRedux.SelectorFactory.createFiltersSelector('invoices');

var result$1 = ethicalJobsRedux.SelectorFactory.createResultSelector('invoices');

var results$1 = ethicalJobsRedux.SelectorFactory.createResultsSelector('invoices');

var invoices = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('invoices');

var orderedInvoices = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(invoices, results$1);

var invoiceByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(invoices, result$1);

var filteredInvoices = createSelector([orderedInvoices, filters], selectByFilters);

var selectors$3 = /*#__PURE__*/Object.freeze({
  fetching: fetching$3,
  error: error$3,
  filters: filters,
  result: result$1,
  results: results$1,
  invoices: invoices,
  orderedInvoices: orderedInvoices,
  invoiceByResult: invoiceByResult,
  filteredInvoices: filteredInvoices
});

var index$3 = {
  reducer: reducer$3,
  actions: actions$3,
  selectors: selectors$3
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$1 = ethicalJobsRedux.createActionType('JOBS/FETCH_COLLECTION');
var FETCH_ENTITY$1 = ethicalJobsRedux.createActionType('JOBS/FETCH_ENTITY');
var SEARCH$1 = ethicalJobsRedux.createActionType('JOBS/SEARCH');
var CREATE$1 = ethicalJobsRedux.createActionType('JOBS/CREATE');
var UPDATE$1 = ethicalJobsRedux.createActionType('JOBS/UPDATE');
var ARCHIVE$1 = ethicalJobsRedux.createActionType('JOBS/ARCHIVE');
var RESTORE$1 = ethicalJobsRedux.createActionType('JOBS/RESTORE');
var APPROVE = ethicalJobsRedux.createActionType('JOBS/APPROVE');
var EXPIRE = ethicalJobsRedux.createActionType('JOBS/EXPIRE');
var ATTACH = ethicalJobsRedux.createActionType('JOBS/ATTACH');
var DETACH = ethicalJobsRedux.createActionType('JOBS/DETACH');
var LOCK = ethicalJobsRedux.createActionType('JOBS/LOCK');
var UNLOCK = ethicalJobsRedux.createActionType('JOBS/UNLOCK');
var CLEAR_ENTITIES$1 = ethicalJobsRedux.createActionType('JOBS/CLEAR_ENTITIES');
var UPDATE_FILTERS$1 = ethicalJobsRedux.createActionType('JOBS/UPDATE_FILTERS');
var REPLACE_FILTERS$1 = ethicalJobsRedux.createActionType('JOBS/REPLACE_FILTERS');
var CLEAR_FILTERS = ethicalJobsRedux.createActionType('JOBS/CLEAR_FILTERS');
var UPDATE_SYNC_FILTERS = ethicalJobsRedux.createActionType('JOBS/UPDATE_SYNC_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection$1 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$1,
    payload: Api.get('/jobs', params)
  };
};

var searchCollection$1 = function searchCollection(params) {
  return {
    type: SEARCH$1,
    payload: Api.search('jobs', params)
  };
};

var fetchEntity$1 = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY$1,
    payload: Api.get('/jobs/' + id)
  };
};

var create$1 = function create(params) {
  return {
    type: CREATE$1,
    payload: Api.post('/jobs', params)
  };
};

var draft = function draft(params) {
  return {
    type: CREATE$1,
    payload: Api.post('/jobs/drafts', params)
  };
};

var update$1 = function update(id, params) {
  return {
    type: UPDATE$1,
    payload: Api.put('/jobs/' + id, params)
  };
};

var archive$1 = function archive(id) {
  return {
    type: ARCHIVE$1,
    payload: Api.archive('jobs', id)
  };
};

var restore$1 = function restore(id) {
  return {
    type: RESTORE$1,
    payload: Api.restore('jobs', id)
  };
};

var approve = function approve(id) {
  return {
    type: APPROVE,
    payload: Api.jobs.approve(id)
  };
};

var expire = function expire(id) {
  return {
    type: EXPIRE,
    payload: Api.jobs.expire(id)
  };
};

var attachMedia = function attachMedia(id, file) {
  return {
    type: ATTACH,
    payload: Api.media.attach(file, 'jobs', id)
  };
};

var detachMedia = function detachMedia(id) {
  return {
    type: DETACH,
    payload: Api.media.detach(id, 'jobs')
  };
};

var lock = function lock(params) {
  return {
    type: LOCK,
    payload: Api.post('/jobs/users', params)
  };
};

var unlock = function unlock(params) {
  return {
    type: UNLOCK,
    payload: Api.delete('/jobs/users', params)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clear$1 = function clear() {
  return {
    type: CLEAR_ENTITIES$1
  };
};

var updateFilters$1 = function updateFilters(filters) {
  return {
    type: UPDATE_FILTERS$1,
    payload: filters
  };
};

var replaceFilters$1 = function replaceFilters(filters) {
  return {
    type: REPLACE_FILTERS$1,
    payload: filters
  };
};

var clearFilters = function clearFilters(filters) {
  return {
    type: CLEAR_FILTERS,
    payload: filters
  };
};

var updateSyncFilters = function updateSyncFilters(filters) {
  return {
    type: UPDATE_SYNC_FILTERS,
    payload: filters
  };
};

var actions$4 = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION$1,
  FETCH_ENTITY: FETCH_ENTITY$1,
  SEARCH: SEARCH$1,
  CREATE: CREATE$1,
  UPDATE: UPDATE$1,
  ARCHIVE: ARCHIVE$1,
  RESTORE: RESTORE$1,
  APPROVE: APPROVE,
  EXPIRE: EXPIRE,
  ATTACH: ATTACH,
  DETACH: DETACH,
  LOCK: LOCK,
  UNLOCK: UNLOCK,
  CLEAR_ENTITIES: CLEAR_ENTITIES$1,
  UPDATE_FILTERS: UPDATE_FILTERS$1,
  REPLACE_FILTERS: REPLACE_FILTERS$1,
  CLEAR_FILTERS: CLEAR_FILTERS,
  UPDATE_SYNC_FILTERS: UPDATE_SYNC_FILTERS,
  fetchCollection: fetchCollection$1,
  searchCollection: searchCollection$1,
  fetchEntity: fetchEntity$1,
  create: create$1,
  draft: draft,
  update: update$1,
  archive: archive$1,
  restore: restore$1,
  approve: approve,
  expire: expire,
  attachMedia: attachMedia,
  detachMedia: detachMedia,
  lock: lock,
  unlock: unlock,
  clear: clear$1,
  updateFilters: updateFilters$1,
  replaceFilters: replaceFilters$1,
  clearFilters: clearFilters,
  updateSyncFilters: updateSyncFilters
});

// Initial state
var initialState$4 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  syncFilters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$4() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$4;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$1:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS$1:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case CLEAR_FILTERS:
      return ethicalJobsRedux.ImmutableUtils.clearFilters(state);

    case UPDATE_SYNC_FILTERS:
      return ethicalJobsRedux.ImmutableUtils.updateSyncFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(SEARCH$1):
    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$1):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$1):
    case ethicalJobsRedux.REQUEST(CREATE$1):
    case ethicalJobsRedux.REQUEST(UPDATE$1):
    case ethicalJobsRedux.REQUEST(ARCHIVE$1):
    case ethicalJobsRedux.REQUEST(RESTORE$1):
    case ethicalJobsRedux.REQUEST(APPROVE):
    case ethicalJobsRedux.REQUEST(EXPIRE):
    case ethicalJobsRedux.REQUEST(ATTACH):
    case ethicalJobsRedux.REQUEST(DETACH):
    case ethicalJobsRedux.REQUEST(LOCK):
    case ethicalJobsRedux.REQUEST(UNLOCK):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$1):
    case ethicalJobsRedux.SUCCESS(CREATE$1):
    case ethicalJobsRedux.SUCCESS(UPDATE$1):
    case ethicalJobsRedux.SUCCESS(ARCHIVE$1):
    case ethicalJobsRedux.SUCCESS(RESTORE$1):
    case ethicalJobsRedux.SUCCESS(APPROVE):
    case ethicalJobsRedux.SUCCESS(EXPIRE):
    case ethicalJobsRedux.SUCCESS(ATTACH):
    case ethicalJobsRedux.SUCCESS(DETACH):
    case ethicalJobsRedux.SUCCESS(LOCK):
    case ethicalJobsRedux.SUCCESS(UNLOCK):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$1):
    case ethicalJobsRedux.SUCCESS(SEARCH$1):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$1):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$1):
    case ethicalJobsRedux.FAILURE(CREATE$1):
    case ethicalJobsRedux.FAILURE(UPDATE$1):
    case ethicalJobsRedux.FAILURE(ARCHIVE$1):
    case ethicalJobsRedux.FAILURE(RESTORE$1):
    case ethicalJobsRedux.FAILURE(APPROVE):
    case ethicalJobsRedux.FAILURE(EXPIRE):
    case ethicalJobsRedux.FAILURE(ATTACH):
    case ethicalJobsRedux.FAILURE(DETACH):
    case ethicalJobsRedux.FAILURE(SEARCH$1):
    case ethicalJobsRedux.FAILURE(LOCK):
    case ethicalJobsRedux.FAILURE(UNLOCK):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/**
 * Returns jobs filtered by {organisationId}
 * @param {Map} job entity
 * @param {Number|Collection} organisations
 * @returns {Bool}
 */
function byOrganisations$1(job, organisations) {
  if (!organisations) {
    return true; // pass through
  }
  if (Immutable__default.isCollection(organisations)) {
    return organisations.includes(job.get('organisation_id'));
  }
  return job.get('organisation_id') === organisations;
}

/**
 * Returns jobs filtered by {status}
 * @param {Map} job entity
 * @param {String} jobs status to filter
 * @returns {Bool}
 */
function byStatus(job, status) {
  if (!status) {
    return true; // pass through
  }
  var jobStatus = job.get('status', '').toUpperCase();
  if (Immutable__default.isCollection(status)) {
    return status.map(function (stati) {
      return stati.toUpperCase();
    }).includes(jobStatus);
  }
  return jobStatus === status.toUpperCase();
}

/**
 * Returns jobs filtered by {expired}
 * @param {Map} job entity
 * @param {Bool} true for expired
 * @returns {Bool}
 */
function byExpiration(job, expiration) {
  if (expiration === null || typeof expiration === 'undefined') {
    return true;
  }
  return job.get('expired') === expiration;
}

/**
 * Returns jobs filtered by {taxonomy}
 * @param {Map} job entity
 * @param {String} taxonomy key
 * @param {List} taxonomy filterTerms
 * @returns {Bool}
 */
function byTaxonomy(job, filters, taxonomy) {
  var jobTerms = job.get(taxonomy, Immutable__default.List());
  if (!filters) {
    return true; // pass through
  }
  if (typeof filters === 'string' || typeof filters === 'number') {
    return jobTerms.includes(parseInt(filters, 10)); // is single term
  }
  return filters.size > jobTerms.size ? jobTerms.isSubset(filters) : filters.isSubset(jobTerms);
}

/**
 * Returns jobs that were "searched" for
 * @param {Map} job entity
 * @param {String} taxonomy key
 * @param {List} taxonomy filterTerms
 * @returns {Bool}
 */
function bySearched(job) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!query) {
    return true; // pass through
  }
  return job.get('_score', 0) > 0;
}

/**
 * Filters job entities
 * @param {Map} Jobs to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered job state.
 */
function filterJobs(jobs, filters) {
  return jobs.filter(function (job) {
    return byOrganisations$1(job, filters.get('organisations'));
  }).filter(function (job) {
    return byStatus(job, filters.get('status'));
  }).filter(function (job) {
    return byExpiration(job, filters.get('expired'));
  }).filter(function (job) {
    return byTaxonomy(job, filters.get('categories'), 'categories');
  }).filter(function (job) {
    return byTaxonomy(job, filters.get('locations'), 'locations');
  }).filter(function (job) {
    return byTaxonomy(job, filters.get('sectors'), 'sectors');
  }).filter(function (job) {
    return byTaxonomy(job, filters.get('workTypes'), 'workTypes');
  }).filter(function (job) {
    return bySearched(job, filters.get('q'));
  });
}

var fetching$4 = ethicalJobsRedux.SelectorFactory.create('jobs', 'fetching');

var error$4 = ethicalJobsRedux.SelectorFactory.create('jobs', 'error');

var filters$1 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('jobs');

var syncFilters = ethicalJobsRedux.SelectorFactory.createSyncFiltersSelector('jobs');

var propsFilters = ethicalJobsRedux.SelectorFactory.createPropFiltersSelector();

var result$2 = ethicalJobsRedux.SelectorFactory.createResultSelector('jobs');

var results$2 = ethicalJobsRedux.SelectorFactory.createResultsSelector('jobs');

var jobs = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs');

var orderedJobs = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(jobs, results$2);

var jobByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(jobs, result$2);

var organisations$1 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs', 'organisations');

var media = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs', 'media');

var filteredJobs = createSelector([jobs, filters$1], filterJobs);

var orderedFilteredJobs = createSelector([orderedJobs, filters$1], filterJobs);

var propsOrderedFilteredJobs = createSelector([orderedJobs, propsFilters], filterJobs);

var selectors$4 = /*#__PURE__*/Object.freeze({
  fetching: fetching$4,
  error: error$4,
  filters: filters$1,
  syncFilters: syncFilters,
  propsFilters: propsFilters,
  result: result$2,
  results: results$2,
  jobs: jobs,
  orderedJobs: orderedJobs,
  jobByResult: jobByResult,
  organisations: organisations$1,
  media: media,
  filteredJobs: filteredJobs,
  orderedFilteredJobs: orderedFilteredJobs,
  propsOrderedFilteredJobs: propsOrderedFilteredJobs
});

var APPROVED = 'APPROVED';

var PENDING = 'PENDING';

var DRAFT = 'DRAFT';

var JobStatus = {
  APPROVED: APPROVED,
  PENDING: PENDING,
  DRAFT: DRAFT
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var JobTypes = Object.assign({}, JobStatus, {
  EXPIRED: 'EXPIRED'
});

var getFiltersByType = (function (type) {
  switch (type) {
    case JobTypes.PENDING:
      return {
        status: JobStatus.PENDING
      };
    case JobTypes.EXPIRED:
      return {
        status: [JobStatus.APPROVED, JobStatus.PENDING],
        expired: true,
        limit: 1200
      };
    case JobTypes.DRAFT:
      return {
        status: JobStatus.DRAFT,
        limit: 1200
      };
    case JobTypes.APPROVED:
    default:
      return {
        status: JobStatus.APPROVED,
        expired: false
      };
  }
});

var index$4 = {
  reducer: reducer$4,
  actions: actions$4,
  selectors: selectors$4,
  statuses: JobStatus,
  getFiltersByType: getFiltersByType
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/FETCH_COLLECTION');
var FETCH_ENTITY$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/FETCH_ENTITY');
var CLEAR_ENTITIES$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/CLEAR_ENTITIES');
var SEARCH$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/SEARCH');
var CREATE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/CREATE');
var UPDATE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/UPDATE');
var PATCH = ethicalJobsRedux.createActionType('ORGANISATIONS/PATCH');
var ARCHIVE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/ARCHIVE');
var RESTORE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/RESTORE');
var UPLOAD_LOGO = ethicalJobsRedux.createActionType('ORGANISATIONS/UPLOAD_LOGO');
var CREATE_CREDITS = ethicalJobsRedux.createActionType('ORGANISATIONS/CREATE_CREDITS');
var DEDUCT_CREDITS = ethicalJobsRedux.createActionType('ORGANISATIONS/DEDUCT_CREDITS');
var UPDATE_FILTERS$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/UPDATE_FILTERS');
var REPLACE_FILTERS$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection$2 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$2,
    payload: Api.get('/organisations', params)
  };
};

var fetchEntity$2 = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY$2,
    payload: Api.get('/organisations/' + id)
  };
};

var searchCollection$2 = function searchCollection(params) {
  return {
    type: SEARCH$2,
    payload: Api.search('organisations', params)
  };
};

var create$2 = function create(params) {
  return {
    type: CREATE$2,
    payload: Api.post('/organisations', params)
  };
};

var update$2 = function update(id, params) {
  return {
    type: UPDATE$2,
    payload: Api.put('/organisations/' + id, params)
  };
};

var patch = function patch(id, params) {
  return {
    type: PATCH,
    payload: Api.patch('/organisations/' + id, params)
  };
};

var archive$2 = function archive(id) {
  return {
    type: ARCHIVE$2,
    payload: Api.archive('organisations', id)
  };
};

var restore$2 = function restore(id) {
  return {
    type: RESTORE$2,
    payload: Api.restore('organisations', id)
  };
};

var uploadLogo = function uploadLogo(file, id) {
  return {
    type: UPLOAD_LOGO,
    payload: Api.media.attach(file, 'organisations', id)
  };
};

var createCredits = function createCredits(params) {
  return {
    type: CREATE_CREDITS,
    payload: Api.post('/credits', params)
  };
};

var deductCredits = function deductCredits(params) {
  return {
    type: DEDUCT_CREDITS,
    payload: Api.delete('/credits', params)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clear$2 = function clear() {
  return {
    type: CLEAR_ENTITIES$2
  };
};

var updateFilters$2 = function updateFilters(_updateFilters) {
  return {
    type: UPDATE_FILTERS$2,
    payload: _updateFilters
  };
};

var replaceFilters$2 = function replaceFilters(updateFilters) {
  return {
    type: REPLACE_FILTERS$2,
    payload: updateFilters
  };
};

var actions$5 = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION$2,
  FETCH_ENTITY: FETCH_ENTITY$2,
  CLEAR_ENTITIES: CLEAR_ENTITIES$2,
  SEARCH: SEARCH$2,
  CREATE: CREATE$2,
  UPDATE: UPDATE$2,
  PATCH: PATCH,
  ARCHIVE: ARCHIVE$2,
  RESTORE: RESTORE$2,
  UPLOAD_LOGO: UPLOAD_LOGO,
  CREATE_CREDITS: CREATE_CREDITS,
  DEDUCT_CREDITS: DEDUCT_CREDITS,
  UPDATE_FILTERS: UPDATE_FILTERS$2,
  REPLACE_FILTERS: REPLACE_FILTERS$2,
  fetchCollection: fetchCollection$2,
  fetchEntity: fetchEntity$2,
  searchCollection: searchCollection$2,
  create: create$2,
  update: update$2,
  patch: patch,
  archive: archive$2,
  restore: restore$2,
  uploadLogo: uploadLogo,
  createCredits: createCredits,
  deductCredits: deductCredits,
  clear: clear$2,
  updateFilters: updateFilters$2,
  replaceFilters: replaceFilters$2
});

// Initial state
var initialState$5 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$5() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$5;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$2:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS$2:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(SEARCH$2):
    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$2):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$2):
    case ethicalJobsRedux.REQUEST(CREATE$2):
    case ethicalJobsRedux.REQUEST(UPDATE$2):
    case ethicalJobsRedux.REQUEST(PATCH):
    case ethicalJobsRedux.REQUEST(ARCHIVE$2):
    case ethicalJobsRedux.REQUEST(RESTORE$2):
    case ethicalJobsRedux.REQUEST(UPLOAD_LOGO):
    case ethicalJobsRedux.REQUEST(CREATE_CREDITS):
    case ethicalJobsRedux.REQUEST(DEDUCT_CREDITS):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$2):
    case ethicalJobsRedux.SUCCESS(CREATE$2):
    case ethicalJobsRedux.SUCCESS(UPDATE$2):
    case ethicalJobsRedux.SUCCESS(PATCH):
    case ethicalJobsRedux.SUCCESS(ARCHIVE$2):
    case ethicalJobsRedux.SUCCESS(RESTORE$2):
    case ethicalJobsRedux.SUCCESS(UPLOAD_LOGO):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$2):
    case ethicalJobsRedux.SUCCESS(SEARCH$2):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$2):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$2):
    case ethicalJobsRedux.FAILURE(CREATE$2):
    case ethicalJobsRedux.FAILURE(UPDATE$2):
    case ethicalJobsRedux.FAILURE(PATCH):
    case ethicalJobsRedux.FAILURE(ARCHIVE$2):
    case ethicalJobsRedux.FAILURE(RESTORE$2):
    case ethicalJobsRedux.FAILURE(UPLOAD_LOGO):
    case ethicalJobsRedux.FAILURE(CREATE_CREDITS):
    case ethicalJobsRedux.FAILURE(DEDUCT_CREDITS):
    case ethicalJobsRedux.FAILURE(SEARCH$2):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$5 = ethicalJobsRedux.SelectorFactory.create('organisations', 'fetching');

var error$5 = ethicalJobsRedux.SelectorFactory.create('organisations', 'error');

var filters$2 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('organisations');

var result$3 = ethicalJobsRedux.SelectorFactory.createResultSelector('organisations');

var results$3 = ethicalJobsRedux.SelectorFactory.createResultsSelector('organisations');

var organisations$2 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('organisations');

var orderedOrganisations = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(organisations$2, results$3);

var organisationByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(organisations$2, result$3);

var users$1 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('organisations', 'users');

var organisationOwner = createSelector([organisationByResult, users$1], function (org, users) {
  return users.get(org.get('owner_id', '').toString(), Immutable__default.Map());
});

var organisationAdmin = createSelector([organisationByResult, users$1], function (org, users) {
  return users.get(org.get('admin_id', '').toString(), Immutable__default.Map());
});

var selectors$5 = /*#__PURE__*/Object.freeze({
  fetching: fetching$5,
  error: error$5,
  filters: filters$2,
  result: result$3,
  results: results$3,
  organisations: organisations$2,
  orderedOrganisations: orderedOrganisations,
  organisationByResult: organisationByResult,
  users: users$1,
  organisationOwner: organisationOwner,
  organisationAdmin: organisationAdmin
});

var index$5 = {
  reducer: reducer$5,
  actions: actions$5,
  selectors: selectors$5
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$3 = ethicalJobsRedux.createActionType('POSTS/FETCH_COLLECTION');
var FETCH_ENTITY$3 = ethicalJobsRedux.createActionType('POSTS/FETCH_ENTITY');
var CLEAR_ENTITIES$3 = ethicalJobsRedux.createActionType('POSTS/CLEAR_ENTITIES');
var UPDATE_FILTERS$3 = ethicalJobsRedux.createActionType('POSTS/UPDATE_FILTERS');
var REPLACE_FILTERS$3 = ethicalJobsRedux.createActionType('POSTS/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection$3 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$3,
    payload: Api.get('/content/posts', params)
  };
};

var fetchEntity$3 = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY$3,
    payload: Api.get('/content/posts/' + id)
  };
};

var fetchBySlug = function fetchBySlug(slug) {
  return {
    type: FETCH_ENTITY$3,
    payload: Api.get('/content/posts?slug=' + slug)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clear$3 = function clear() {
  return {
    type: CLEAR_ENTITIES$3
  };
};

var updateFilters$3 = function updateFilters(filters) {
  return {
    type: UPDATE_FILTERS$3,
    payload: filters
  };
};

var replaceFilters$3 = function replaceFilters(filters) {
  return {
    type: REPLACE_FILTERS$3,
    payload: filters
  };
};

var actions$6 = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION$3,
  FETCH_ENTITY: FETCH_ENTITY$3,
  CLEAR_ENTITIES: CLEAR_ENTITIES$3,
  UPDATE_FILTERS: UPDATE_FILTERS$3,
  REPLACE_FILTERS: REPLACE_FILTERS$3,
  fetchCollection: fetchCollection$3,
  fetchEntity: fetchEntity$3,
  fetchBySlug: fetchBySlug,
  clear: clear$3,
  updateFilters: updateFilters$3,
  replaceFilters: replaceFilters$3
});

// Initial state
var initialState$6 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$6() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$6;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$3:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS$3:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$3):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$3):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$3):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$3):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$3):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$3):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$6 = ethicalJobsRedux.SelectorFactory.create('posts', 'fetching');

var error$6 = ethicalJobsRedux.SelectorFactory.create('posts', 'error');

var filters$3 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('posts');

var result$4 = ethicalJobsRedux.SelectorFactory.createResultSelector('posts');

var results$4 = ethicalJobsRedux.SelectorFactory.createResultsSelector('posts');

var postsSelector = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('posts');

// export const orderedPosts = SelectorFactory.createOrderedEntitiesSelector(postsSelector, results);

var orderedPosts = createSelector([postsSelector, results$4], function (posts, results) {
  return Immutable__default.OrderedMap(results.map(function (result) {
    return [result.toString(), posts.get(result.toString())];
  }));
});

var postByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(postsSelector, result$4);

var selectors$6 = /*#__PURE__*/Object.freeze({
  fetching: fetching$6,
  error: error$6,
  filters: filters$3,
  result: result$4,
  results: results$4,
  postsSelector: postsSelector,
  orderedPosts: orderedPosts,
  postByResult: postByResult
});

var index$6 = {
  reducer: reducer$6,
  actions: actions$6,
  selectors: selectors$6
};

// Initial state
var initialState$7 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  taxonomies: {}
});

/**
 * Taxonomies reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer$7() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$7;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ethicalJobsRedux.REQUEST(FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('taxonomies', Immutable__default.fromJS(action.payload.data.taxonomies));

    case ethicalJobsRedux.FAILURE(FETCH_APP_DATA):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

// 20.1.2.3 Number.isInteger(number)

var floor$1 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', { isInteger: _isInteger });

var isInteger = _core.Number.isInteger;

var fetching$7 = ethicalJobsRedux.SelectorFactory.create('taxonomies', 'fetching');

var error$7 = ethicalJobsRedux.SelectorFactory.create('taxonomies', 'error');

var taxonomies = function taxonomies(state) {
  return state.getIn(['entities', 'taxonomies', 'taxonomies']);
};

var orderedTaxonomy = function orderedTaxonomy(state, taxonomy) {
  var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';

  return taxonomies(state).get(taxonomy, Immutable__default.Map()).toOrderedMap().sort(function (a, b) {
    if (Number.isInteger(a.get(orderBy))) {
      return a.get('id') - b.get('id');
    } else {
      return a.get(orderBy).localeCompare(b.get(orderBy));
    }
  });
};

var orderedTaxonomyWithJobs = function orderedTaxonomyWithJobs(state, taxonomy) {
  var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';

  return orderedTaxonomy(state, taxonomy, orderBy).filter(function (term) {
    return term.has('job_count') && term.get('job_count') > 0;
  });
};

var selectors$7 = /*#__PURE__*/Object.freeze({
  fetching: fetching$7,
  error: error$7,
  taxonomies: taxonomies,
  orderedTaxonomy: orderedTaxonomy,
  orderedTaxonomyWithJobs: orderedTaxonomyWithJobs
});

var index$7 = {
  reducer: reducer$7,
  selectors: selectors$7
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$4 = ethicalJobsRedux.createActionType('USERS/FETCH_COLLECTION');
var FETCH_ENTITY$4 = ethicalJobsRedux.createActionType('USERS/FETCH_ENTITY');
var CREATE$3 = ethicalJobsRedux.createActionType('USERS/CREATE');
var UPDATE$3 = ethicalJobsRedux.createActionType('USERS/UPDATE');
var PATCH$1 = ethicalJobsRedux.createActionType('USERS/PATCH');
var ARCHIVE$3 = ethicalJobsRedux.createActionType('USERS/ARCHIVE');
var RESTORE$3 = ethicalJobsRedux.createActionType('USERS/RESTORE');
var CLEAR_ENTITIES$4 = ethicalJobsRedux.createActionType('USERS/CLEAR_ENTITIES');
var UPDATE_FILTERS$4 = ethicalJobsRedux.createActionType('USERS/UPDATE_FILTERS');
var REPLACE_FILTERS$4 = ethicalJobsRedux.createActionType('USERS/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection$4 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$4,
    payload: Api.get('/users', params)
  };
};

var fetchEntity$4 = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY$4,
    payload: Api.get('/users/' + id)
  };
};

var create$3 = function create(params) {
  return {
    type: CREATE$3,
    payload: Api.post('/users', params)
  };
};

var update$3 = function update(id, params) {
  return {
    type: UPDATE$3,
    payload: Api.put('/users/' + id, params)
  };
};

var patch$1 = function patch(id, params) {
  return {
    type: PATCH$1,
    payload: Api.patch('/users/' + id, params)
  };
};

var archive$3 = function archive(id) {
  return {
    type: ARCHIVE$3,
    payload: Api.archive('users', id)
  };
};

var restore$3 = function restore(id) {
  return {
    type: RESTORE$3,
    payload: Api.restore('users', id)
  };
};

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

var clear$4 = function clear() {
  return {
    type: CLEAR_ENTITIES$4
  };
};

var updateFilters$4 = function updateFilters(filters) {
  return {
    type: UPDATE_FILTERS$4,
    payload: filters
  };
};

var replaceFilters$4 = function replaceFilters(filters) {
  return {
    type: REPLACE_FILTERS$4,
    payload: filters
  };
};

var actions$7 = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION$4,
  FETCH_ENTITY: FETCH_ENTITY$4,
  CREATE: CREATE$3,
  UPDATE: UPDATE$3,
  PATCH: PATCH$1,
  ARCHIVE: ARCHIVE$3,
  RESTORE: RESTORE$3,
  CLEAR_ENTITIES: CLEAR_ENTITIES$4,
  UPDATE_FILTERS: UPDATE_FILTERS$4,
  REPLACE_FILTERS: REPLACE_FILTERS$4,
  fetchCollection: fetchCollection$4,
  fetchEntity: fetchEntity$4,
  create: create$3,
  update: update$3,
  patch: patch$1,
  archive: archive$3,
  restore: restore$3,
  clear: clear$4,
  updateFilters: updateFilters$4,
  replaceFilters: replaceFilters$4
});

// Initial state
var initialState$8 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * User reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer$8() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$8;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$4:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS$4:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$4):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$4):
    case ethicalJobsRedux.REQUEST(CREATE$3):
    case ethicalJobsRedux.REQUEST(UPDATE$3):
    case ethicalJobsRedux.REQUEST(PATCH$1):
    case ethicalJobsRedux.REQUEST(ARCHIVE$3):
    case ethicalJobsRedux.REQUEST(RESTORE$3):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$4):
    case ethicalJobsRedux.SUCCESS(CREATE$3):
    case ethicalJobsRedux.SUCCESS(UPDATE$3):
    case ethicalJobsRedux.SUCCESS(PATCH$1):
    case ethicalJobsRedux.SUCCESS(ARCHIVE$3):
    case ethicalJobsRedux.SUCCESS(RESTORE$3):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$4):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$4):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$4):
    case ethicalJobsRedux.FAILURE(CREATE$3):
    case ethicalJobsRedux.FAILURE(UPDATE$3):
    case ethicalJobsRedux.FAILURE(PATCH$1):
    case ethicalJobsRedux.FAILURE(ARCHIVE$3):
    case ethicalJobsRedux.FAILURE(RESTORE$3):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/**
 * Returns users filtered by {roles}
 * @param {Map} user entity
 * @param {String|Collection} roles
 * @returns {Bool}
 */
function byRoles(user, roles) {
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
function selectByFilters$1(users, filters) {
  return users.filter(function (user) {
    return byRoles(user, filters.get('roles'));
  });
}

var fetching$8 = ethicalJobsRedux.SelectorFactory.create('users', 'fetching');

var error$8 = ethicalJobsRedux.SelectorFactory.create('users', 'error');

var filters$4 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('users');

var result$5 = ethicalJobsRedux.SelectorFactory.createResultSelector('users');

var results$5 = ethicalJobsRedux.SelectorFactory.createResultsSelector('users');

var users$2 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('users');

var orderedUsers = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(users$2, results$5);

var userByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(users$2, result$5);

var filteredUsers = createSelector([orderedUsers, filters$4], selectByFilters$1);

var selectors$8 = /*#__PURE__*/Object.freeze({
  fetching: fetching$8,
  error: error$8,
  filters: filters$4,
  result: result$5,
  results: results$5,
  users: users$2,
  orderedUsers: orderedUsers,
  userByResult: userByResult,
  filteredUsers: filteredUsers
});

var index$8 = {
  actions: actions$7,
  reducer: reducer$8,
  selectors: selectors$8
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var PURCHASE$1 = ethicalJobsRedux.createActionType('PAYMENTS/PURCHASE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/
var purchase$1 = function purchase(params) {
  return {
    type: PURCHASE$1,
    payload: Api.post('/payments', params)
  };
};

var actions$8 = /*#__PURE__*/Object.freeze({
  PURCHASE: PURCHASE$1,
  purchase: purchase$1
});

// Initial state
var initialState$9 = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Purchase reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

function reducer$9() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$9;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ethicalJobsRedux.REQUEST(PURCHASE$1):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(PURCHASE$1):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(PURCHASE$1):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$9 = ethicalJobsRedux.SelectorFactory.create('payments', 'fetching');

var error$9 = ethicalJobsRedux.SelectorFactory.create('payments', 'error');

var selectors$9 = /*#__PURE__*/Object.freeze({
  fetching: fetching$9,
  error: error$9
});

var index$9 = {
  reducer: reducer$9,
  actions: actions$8,
  selectors: selectors$9
};

/**
 * API prefix for the subscriptions API
 *
 * @type {string}
 */
var prefix = '/alerts';
/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var CREATE$4 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/CREATE');
var FETCH_COLLECTION$5 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/FETCH_COLLECTION');
var FETCH_ENTITY$5 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/FETCH_ENTITY');
var DELETE = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/DELETE');
var CONFIRM = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/CONFIRM');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/
var create$4 = function create(params) {
  return {
    type: CREATE$4,
    payload: Api.post(prefix + '/subscriptions', params)
  };
};

var fetchCollection$5 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$5,
    payload: Api.get(prefix + '/subscriptions', params)
  };
};

var fetchEntity$5 = function fetchEntity(id) {
  return {
    type: FETCH_ENTITY$5,
    payload: Api.get(prefix + ('/subscriptions/' + id))
  };
};

var destroy = function destroy(id) {
  return {
    type: DELETE,
    payload: Api.delete(prefix + ('/subscriptions/' + id))
  };
};

var confirm = function confirm(id, params) {
  return {
    type: CONFIRM,
    payload: Api.put(prefix + ('/subscriptions/' + id), params)
  };
};

var actions$9 = /*#__PURE__*/Object.freeze({
  CREATE: CREATE$4,
  FETCH_COLLECTION: FETCH_COLLECTION$5,
  FETCH_ENTITY: FETCH_ENTITY$5,
  DELETE: DELETE,
  CONFIRM: CONFIRM,
  create: create$4,
  fetchCollection: fetchCollection$5,
  fetchEntity: fetchEntity$5,
  destroy: destroy,
  confirm: confirm
});

// Initial state
var initialState$a = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * subscriptions reducer
 *
 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
 */

function reducer$a() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$a;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {

    case ethicalJobsRedux.REQUEST(CREATE$4):
    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$5):
    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$5):
    case ethicalJobsRedux.REQUEST(DELETE):
    case ethicalJobsRedux.REQUEST(CONFIRM):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(CREATE$4):
    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$5):
    case ethicalJobsRedux.SUCCESS(DELETE):
    case ethicalJobsRedux.SUCCESS(CONFIRM):
      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$5):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(CREATE$4):
    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$5):
    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$5):
    case ethicalJobsRedux.FAILURE(DELETE):
    case ethicalJobsRedux.FAILURE(CONFIRM):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$a = ethicalJobsRedux.SelectorFactory.create('subscriptions', 'fetching');

var error$a = ethicalJobsRedux.SelectorFactory.create('subscriptions', 'error');

var result$6 = ethicalJobsRedux.SelectorFactory.createResultSelector('subscriptions');

var results$6 = ethicalJobsRedux.SelectorFactory.createResultsSelector('subscriptions');

var subscriptions = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('subscriptions');

var alerts = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('subscriptions', 'alerts');

var selectors$a = /*#__PURE__*/Object.freeze({
  fetching: fetching$a,
  error: error$a,
  result: result$6,
  results: results$6,
  subscriptions: subscriptions,
  alerts: alerts
});

var index$a = {
  reducer: reducer$a,
  actions: actions$9,
  selectors: selectors$a
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/
var FETCH_COLLECTION$6 = ethicalJobsRedux.createActionType('ACTIVITIES/FETCH_COLLECTION');
var CLEAR_ENTITIES$5 = ethicalJobsRedux.createActionType('ACTIVITIES/CLEAR_ENTITIES');
var UPDATE_FILTERS$5 = ethicalJobsRedux.createActionType('ACTIVITIES/UPDATE_FILTERS');
/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

var fetchCollection$6 = function fetchCollection(params) {
  return {
    type: FETCH_COLLECTION$6,
    payload: Api.get('/activities', params)
  };
};

var clear$5 = function clear() {
  return {
    type: CLEAR_ENTITIES$5
  };
};

var updateFilters$5 = function updateFilters(_updateFilters) {
  return {
    type: UPDATE_FILTERS$5,
    payload: _updateFilters
  };
};

var actions$a = /*#__PURE__*/Object.freeze({
  FETCH_COLLECTION: FETCH_COLLECTION$6,
  CLEAR_ENTITIES: CLEAR_ENTITIES$5,
  UPDATE_FILTERS: UPDATE_FILTERS$5,
  fetchCollection: fetchCollection$6,
  clear: clear$5,
  updateFilters: updateFilters$5
});

// Initial state
var initialState$b = Immutable__default.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false
});

/**
 * Activity reducer
 *
 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
 */
function reducer$b() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$b;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$5:
      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

    case UPDATE_FILTERS$5:
      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$6):
      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$6):
      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$6):
      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/**
 * Returns invoices filtered by {organisationId}
 * @param {Map} invoice entity
 * @param {Number|Collection} organisations
 * @returns {Bool}
 */
function byOrganisations$2(activity, organisations) {
  if (!organisations) {
    return true; // pass through
  }
  if (Immutable__default.isCollection(organisations)) {
    return organisations.includes(activity.get('subject_id'));
  }
  return activity.get('subject_id') === organisations;
}

/**
 * Filters invoice entities
 * @param {Map} Invoices to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered invoice state.
 */
function selectByFilters$2(activities, filters) {

  return activities.filter(function (activity) {
    return byOrganisations$2(activity, filters.get('organisations'));
  });
}

var fetching$b = ethicalJobsRedux.SelectorFactory.create('activities', 'fetching');

var error$b = ethicalJobsRedux.SelectorFactory.create('activities', 'error');

var filters$5 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('activities');

var result$7 = ethicalJobsRedux.SelectorFactory.createResultSelector('activities');

var results$7 = ethicalJobsRedux.SelectorFactory.createResultsSelector('activities');

var activities = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('activities');

var orderedActivities = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(activities, results$7);

var filteredActivities = createSelector([orderedActivities, filters$5], selectByFilters$2);

var selectors$b = /*#__PURE__*/Object.freeze({
  fetching: fetching$b,
  error: error$b,
  filters: filters$5,
  result: result$7,
  results: results$7,
  activities: activities,
  orderedActivities: orderedActivities,
  filteredActivities: filteredActivities
});

var index$b = {
  reducer: reducer$b,
  selectors: selectors$b,
  actions: actions$a
};

exports.App = App;
exports.Auth = index;
exports.Credits = index$1;
exports.Enumerables = index$2;
exports.Invoices = index$3;
exports.Jobs = index$4;
exports.Organisations = index$5;
exports.Posts = index$6;
exports.Taxonomies = index$7;
exports.Users = index$8;
exports.Payments = index$9;
exports.Subscriptions = index$a;
exports.Activities = index$b;
