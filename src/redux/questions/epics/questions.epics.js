import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import {netService} from '../../../shared/services/net.service';
import * as net from '../../net/actions';

const deleteEpic = action$ => action$.ofType(ActionTypes.DELETE_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: netService.setToken(`${netService.baseUrl}/questions/${action.id}`),
    method: 'DELETE',
  })
  .map(response => ({
    type: ActionTypes.DELETE,
    id: action.id,
  }))
  .catch(error => Observable.of({
    type: net.ActionTypes.REQUEST_FAILED,
    error: error.xhr.response.error
  }))
});

const finishEpic = action$ => action$.ofType(ActionTypes.FINISH_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: netService.setToken(`${netService.baseUrl}/questions/${action.id}`),
    method: 'PATCH',
    body: {ttl: action.ttl},
  })
  .map(response => ({
    type: ActionTypes.FINISH,
    id: action.id,
  }))
  .catch(error => Observable.of({
    type: net.ActionTypes.REQUEST_FAILED,
    error: error.xhr.response.error
  }))
});

const refreshEpic = action$ => action$.ofType(ActionTypes.DELETE, ActionTypes.FINISH).map(action => {
  return netService.ajaxGet({
    url: '/clients/get-questions',
    dispatch_type: ActionTypes.GET_LIST,
    list_type: 'YourCreatedQuestions',
  });
});

export const questionsEpics = [
  deleteEpic,
  finishEpic,
  refreshEpic,
];
