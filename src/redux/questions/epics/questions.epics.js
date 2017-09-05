import {Observable} from 'rxjs';
import {routerActions} from 'react-router-redux';
import store from '../../../store';
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
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
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
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

const createEpic = action$ => action$.ofType(ActionTypes.CREATE_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: netService.setToken(`${netService.baseUrl}/questions`),
    method: 'POST',
    body: action.payload.question,
  })
  .map(response => ({
    type: ActionTypes.CREATE_OPTIONS,
    payload: action.payload.questionOptions.map(item => ({
      text: item,
      questionId: response.xhr.response.id
    })),
  }))
  .catch(error => Observable.of({
    type: net.ActionTypes.REQUEST_FAILED,
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

const createOptionsEpic = action$ => action$.ofType(ActionTypes.CREATE_OPTIONS).switchMap(action => {
  return Observable.ajax({
    url: netService.setToken(`${netService.baseUrl}/questionOptions/post-multiple-options`),
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: action.payload,
  })
  .map(response => ({
    type: ActionTypes.CREATE,
    payload: response,
  }))
  .catch(error => Observable.of({
    type: net.ActionTypes.REQUEST_FAILED,
    error: error.xhr.response ? error.xhr.response.error : {message: 'error network connection'}
  }))
});

const createAnswerEpic = action$ => action$.ofType(ActionTypes.CREATE_ANSWER)
.filter(action => !action.id)
.do(action => {
  store.dispatch(routerActions.push('/home/question/YourCreatedQuestions'));
}).ignoreElements();

const redirectEpic = action$ => action$.ofType(ActionTypes.CREATE).do(action => {
  store.dispatch(routerActions.push('/home/question/YourCreatedQuestions'));
}).ignoreElements();

export const questionsEpics = [
  deleteEpic,
  finishEpic,
  createEpic,
  createOptionsEpic,
  createAnswerEpic,
  redirectEpic,
];
