import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import * as questions from "../../questions/actions";
import {netService} from '../../../shared/services/net.service';
import * as net from '../../net/actions';

const createEpic = action$ => action$.ofType(ActionTypes.CREATE_REQUEST).switchMap(action => {
  let query = action.payload.questionOptionIds.map(item => Observable.ajax({
    url: netService.baseUrl + netService.setToken('/answers'),
    method: 'POST',
    body: {
      questionOptionId: item,
      clientId: action.payload.clientId,
    }
  }));

  return Observable
  .zip(...query)
  .map(response => {
    return ({
      type: questions.ActionTypes.CREATE_ANSWER,
      id: action.payload.voice_given_id
    })
  })
  .catch(error => {
    return Observable.of({
      type: net.ActionTypes.REQUEST_FAILED,
      error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
    })
  })
});

const deleteEpic = action$ => action$.ofType(ActionTypes.DELETE_REQUEST).switchMap(action => {
  let query = action.payload.answers2delete.map(item => Observable.ajax({
    url: netService.baseUrl + netService.setToken(`/answers/${item}`),
    method: 'DELETE',
  }));

  return Observable
  .zip(...query)
  .map(response => {
    return ({
      type: ActionTypes.CREATE_REQUEST,
      payload: {
        questionOptionIds: action.payload.answers2add,
        clientId: action.payload.clientId,
      },
    })
  })
  .catch(error => {
    return Observable.of({
      type: net.ActionTypes.REQUEST_FAILED,
      error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
    })
  })
});

const getEpic = action$ => action$.ofType(ActionTypes.GET).map(action => {
  return netService.ajaxGet({
    url: '/clients/get-voice-given-questions',
    dispatch_type: questions.ActionTypes.GET_LIST,
    list_type: action.payload.list_type,
  })
});

export const answersEpics = [
  createEpic,
  deleteEpic,
  getEpic,
];
