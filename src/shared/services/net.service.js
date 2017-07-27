import {Observable} from 'rxjs';
import * as notify from '../../redux/notify/actions';

class NetService {
  constructor() {
    this.baseUrl = 'http://localhost:33001/api';
  }

  setToken(url) {
    const token = localStorage.getItem('access_token');
    if (!token) return url;

    const tokenParam = `access_token=${token}`;
    url = url.indexOf('?') + 1 ? `${url}&${tokenParam}` : `${url}?${tokenParam}`;
    return url;
  }

  ajaxGet(options) {
    return {
      type: 'AJAX_GET',
      options
    }
  }
}

export const netService = new NetService();

export const getEpic = action$ => action$.ofType('AJAX_GET').switchMap(action => {
  return Observable.ajax({
    url: netService.baseUrl + netService.setToken(action.options.url),
    method: 'GET'
  })
  .map(response => ({
    type: action.options.dispatch_type,
    payload: response.xhr.response
  }))
  .catch(error => Observable.of({
    type: notify.ActionTypes.OPEN,
    error: error.xhr.response.error
  }))
});
