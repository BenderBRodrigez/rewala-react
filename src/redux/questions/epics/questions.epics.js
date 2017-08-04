import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import {netService} from '../../../shared/services/net.service';
import * as net from '../../net/actions';

const deleteEpic = action$ => action$.ofType(ActionTypes.DELETE_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${netService.baseUrl}/questions/${action.id}`,
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

export const questionsEpics = [
  deleteEpic,
];
