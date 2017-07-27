import {Observable} from 'rxjs';
import {push} from 'react-router-redux';
import store from '../../../store';
import {ActionTypes} from '../actions';
import * as notify from '../../notify/actions';
import {baseUrl} from '../../../shared/services/net.service';

export const signinEpic = action$ => action$.ofType(ActionTypes.SIGNIN_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${baseUrl}/clients/login`,
    method: 'POST',
    body: action.options,
  })
  .pluck('response','id')
  .map(token => {
    return {
      type: ActionTypes.SIGNIN,
      token
    }
  })
  .catch(error => {
    store.dispatch({
      type: ActionTypes.SIGNIN
    });
    return Observable.of({
      type: notify.ActionTypes.OPEN,
      error: error.xhr.response.error
    })
  })
});

export const redirectEpic = action$ => action$.ofType(ActionTypes.SIGNIN).do(action => {
  if (action.token) store.dispatch(push('/'));
}).ignoreElements();

export const signupEpic = action$ => action$.ofType(ActionTypes.SIGNUP_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${baseUrl}/clients`,
    method: 'POST',
    body: action.options,
  })
  .map(response => ({
    type: ActionTypes.SIGNIN_REQUEST,
    options: action.options
  }))
  .catch(error => {
    store.dispatch({
      type: ActionTypes.SIGNIN
    });
    return Observable.of({
      type: notify.ActionTypes.OPEN,
      error: error.xhr.response.error
    })
  })
});
