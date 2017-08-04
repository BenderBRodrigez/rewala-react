import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import * as notify from '../../notify/actions';
import {netService} from '../../../shared/services/net.service';

const getEpic = action$ => action$.ofType(ActionTypes.GET).switchMap(action => {
  return Observable.ajax({
    url: netService.baseUrl + netService.setToken(action.options.url),
    method: 'GET'
  })
  .map(response => ({
    type: action.options.dispatch_type,
    payload: {
      ...action.options,
      response: response.xhr.response
    }
  }))
  .catch(error => Observable.of({
    type: notify.ActionTypes.OPEN,
    error: error.xhr.response.error
  }))
});

const failEpic = action$ => action$.ofType(ActionTypes.REQUEST_FAILED).map(action => {
  return ({
    type: notify.ActionTypes.OPEN,
    error: action.error
  })
});

export const netEpics = [
  getEpic,
  failEpic,
];
