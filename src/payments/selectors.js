import { SelectorFactory } from '@ethical-jobs/redux';

export const fetching = SelectorFactory.create('payments', 'fetching');

export const error = SelectorFactory.create('payments', 'error');
