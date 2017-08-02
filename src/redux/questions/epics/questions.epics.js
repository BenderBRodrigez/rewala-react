import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import * as notify from '../../notify/actions';
import {netService} from '../../../shared/services/net.service';

export const deleteEpic = action$ => action$.ofType(ActionTypes.DELETE_REQUEST).switchMap(action => {
  return Observable.ajax({
    url: `${netService.baseUrl}/questions/${action.id}`,
    method: 'DELETE',
  })
  .map(response => ({
    type: ActionTypes.DELETE,
    id: action.id,
  }))
  .catch(error => Observable.of({
    type: ActionTypes.REQUEST_FAILED,
    error: error.xhr.response.error
  }))
});

export const failEpic = action$ => action$.ofType(ActionTypes.REQUEST_FAILED).map(action => ({
  type: notify.ActionTypes.OPEN,
  error: action.error
}));
