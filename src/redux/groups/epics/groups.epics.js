import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import {netService} from '../../../shared/services/net.service';
import * as net from '../../net/actions';

const contactsEpic = action$ => action$.ofType(ActionTypes.GET_GROUPS).map(action => {
  return netService.ajaxGet({
    url: `/clients/get-contacts`,
    dispatch_type: ActionTypes.GET_CONTACTS,
  })
});

const createEpic = action$ => action$.ofType(ActionTypes.CREATE_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: netService.setToken(`${netService.baseUrl}/groups`),
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: action.payload
  })
  .map(response => ({
    type: ActionTypes.CREATE_GROUP,
    group: response.xhr.response,
  }))
  .catch(error => Observable.of({
    type: net.ActionTypes.REQUEST_FAILED,
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

export const groupsEpics = [
  contactsEpic,
  createEpic,
];
