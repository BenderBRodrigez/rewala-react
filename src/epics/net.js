// import {ajax} from 'rxjs/observable/dom/ajax';
import {Observable} from 'rxjs';
import {push} from 'react-router-redux';
import store from '../store';
import {OPEN} from '../reducers/notify';
import {SIGNIN} from '../reducers/auth';

const baseUrl = 'http://localhost:33001/api';
const setToken = url => {
  const token = localStorage.getItem('access_token');
  if (!token) return url;

  const tokenParam = `access_token=${token}`;
  url = url.indexOf('?') + 1 ? `${url}&${tokenParam}` : `${url}?${tokenParam}`;
  return url;
};

export const ajaxGet = options => ({
  type: 'AJAX_GET',
  options
});

export const ajaxPost = options => ({
  type: 'AJAX_POST',
  options
});

export const AJAX_SIGNIN = 'net/AJAX_SIGNIN';

export const getEpic = action$ => action$.ofType('AJAX_GET').switchMap(action => {
  return Observable.ajax({
    url: baseUrl + setToken(action.options.url),
    method: 'GET'
  })
  .map(response => ({
    type: action.options.dispatch_type,
    payload: response.xhr.response
  }))
  .catch(error => Observable.of({
    type: OPEN,
    error: error.xhr.response.error
  }))
});

export const postEpic = action$ => action$.ofType('AJAX_POST').switchMap(action => {
  return Observable.ajax({
    url: baseUrl + setToken(action.options.url),
    method: 'POST',
    body: action.options.body,
  })
  .map(response => ({
    type: action.options.dispatch_type,
    options: action.options.body
  }))
  .catch(error => {
    store.dispatch({
      type: SIGNIN
    });
    return Observable.of({
      type: OPEN,
      error: error.xhr.response.error
    })
  })
});

export const signinEpic = action$ => action$.ofType(AJAX_SIGNIN).switchMap(action => {
  return Observable.ajax({
    url: `${baseUrl}/clients/login`,
    method: 'POST',
    body: action.options,
  })
  .pluck('response','xhr','response','id')
  .map(token => {
    return {
      type: SIGNIN,
      token
    }
  })
  .catch(error => { // ActionTypes
    store.dispatch({
      type: SIGNIN
    });
    return Observable.of({
      type: OPEN,
      error: error.xhr.response.error
    })
  })
});

export const redirectEpic = action$ => action$.ofType(SIGNIN).do(action => {
  if (action.token) store.dispatch(push('/'));
}).ignoreElements();