import { SelectorFactory } from 'ethical-jobs-redux';

export const fetching = SelectorFactory.create('subscriptions', 'fetching');

export const error = SelectorFactory.create('subscriptions', 'error');

export const result = SelectorFactory.createResultSelector('subscriptions');

export const results = SelectorFactory.createResultsSelector('subscriptions');

export const subscriptions = SelectorFactory.createEntitiesSelector('subscriptions');

export const alerts = SelectorFactory.createEntitiesSelector('subscriptions','alerts');
