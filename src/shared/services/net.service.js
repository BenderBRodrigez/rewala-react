import {Observable} from 'rxjs';
import * as notify from '../../redux/notify/actions';

export const setToken = url => {
  const token = localStorage.getItem('access_token');
  if (!token) return url;

  const tokenParam = `access_token=${token}`;
  url = url.indexOf('?') + 1 ? `${url}&${tokenParam}` : `${url}?${tokenParam}`;
  return url;
};

export const baseUrl = 'http://localhost:33001/api';

export const ajaxGet = options => ({
  type: 'AJAX_GET',
  options
});

export const getEpic = action$ => action$.ofType('AJAX_GET').switchMap(action => {
  return Observable.ajax({
    url: baseUrl + setToken(action.options.url),
    method: 'GET'
  })
  .map(response => ({ //response == null ????
    type: action.options.dispatch_type,
    payload: response.xhr.response
  }))
  .catch(error => Observable.of({
    type: notify.ActionTypes.OPEN,
    error: error.xhr.response.error
  }))
});
