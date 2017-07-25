import {ajax} from 'rxjs/observable/dom/ajax';
import {Observable} from 'rxjs';
import {AJAX_GET} from '../reducers/questions';
import {OPEN} from '../reducers/notify';

export const ajaxGet = options => {
  return ({
    type: AJAX_GET,
    options
  });
};

export const netEpic = action$ => {
  return action$.ofType(AJAX_GET).switchMap(action => {
    return ajax({
      url: `http://localhost:33001/api/${action.options.url}?access_token=${localStorage.getItem('access_token')}`
    })
    .map(response => ({
      type: action.options.dispatch_type,
      payloads: response.xhr.response
    }))
    .catch(error => Observable.of({
      type: OPEN,
      error: error.xhr.response.error
    }))
  })
};
