import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_APP_DATA = createActionType('APP/FETCH_DATA');
export const UPLOAD_MEDIA = createActionType('APP/UPLOAD_MEDIA');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchAppData = () => ({
  type: FETCH_APP_DATA,
  payload: Api.get('/'),
});

export const uploadMedia = file => ({
  type: UPLOAD_MEDIA,
  payload: Api.media.upload(file),
});

