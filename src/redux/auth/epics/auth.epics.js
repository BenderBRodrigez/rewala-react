import {Observable} from 'rxjs';
import {routerActions} from 'react-router-redux';
import store from '../../../store';
import {ActionTypes} from '../actions';
import * as groups from '../../groups/actions';
import * as notify from '../../notify/actions';
import {netService} from '../../../shared/services/net.service';

const signinEpic = action$ => action$.ofType(ActionTypes.SIGNIN_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${netService.baseUrl}/clients/login`,
    method: 'POST',
    body: action.options,
  })
  .pluck('response','id')
  .map(token => ({
    type: ActionTypes.SIGNIN,
    token
  }))
  .catch(error => Observable.of({
    type: ActionTypes.REQUEST_FAILED,
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

const signupEpic = action$ => action$.ofType(ActionTypes.SIGNUP_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${netService.baseUrl}/clients`,
    method: 'POST',
    body: action.options,
  })
  .map(response => ({
    type: ActionTypes.SIGNIN_REQUEST,
    options: action.options
  }))
  .catch(error => Observable.of({
    type: ActionTypes.REQUEST_FAILED,
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

const signoutEpic = action$ => action$.ofType(ActionTypes.SIGNOUT).do(action => {
  netService.setSocketClose();
}).ignoreElements();

const getUserEpic = action$ => action$.ofType(ActionTypes.GET_USER).map(action => {
  netService.subscribeTo('create');
  netService.subscribeTo('delete');
  netService.subscribeTo('deadline');
  return netService.ajaxGet({
    url: `/clients/${action.payload.response.id}/groups`,
    dispatch_type: groups.ActionTypes.GET_GROUPS
  })
});

const failEpic = action$ => action$.ofType(ActionTypes.REQUEST_FAILED).map(action => ({
  type: notify.ActionTypes.ERROR_OPEN,
  error: action.error
}));

const redirectEpic = action$ => action$.ofType(ActionTypes.SIGNIN).do(action => {
  store.dispatch(routerActions.push('/home'));
}).ignoreElements();

export const authEpics = [
  signinEpic,
  signupEpic,
  signoutEpic,
  redirectEpic,
  getUserEpic,
  failEpic,
];
