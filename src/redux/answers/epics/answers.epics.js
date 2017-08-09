import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import * as questions from '../../questions/actions';
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
      type: ActionTypes.CREATE,
      payload: response[response.length-1].xhr.response
    })
  })
  .catch(error => {
    Observable.of({
      type: net.ActionTypes.REQUEST_FAILED,
      error: error//.xhr.response.error
    })
  })

});

const refreshEpic = action$ => action$.ofType(ActionTypes.CREATE).map(action => {
  return netService.ajaxGet({
    url: '/clients/get-awaiting-questions',
    dispatch_type: questions.ActionTypes.GET_LIST,
    list_type: 'AwaitingYourAnswerQuestions',
  })
});

export const answersEpics = [
  createEpic,
  refreshEpic,
];
