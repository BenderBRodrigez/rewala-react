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
    Observable.of({
      type: net.ActionTypes.REQUEST_FAILED,
      error: error//.xhr.response.error
    })
  })

});

export const answersEpics = [
  createEpic,
];
