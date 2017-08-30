import {Observable} from 'rxjs';
import {ActionTypes} from '../actions';
import {netService} from '../../../shared/services/net.service';

const contacsEpic = action$ => action$.ofType(ActionTypes.GET_GROUPS).map(action => {
  return netService.ajaxGet({
    url: `/clients/get-contacts`,
    dispatch_type: ActionTypes.GET_CONTACTS,
  })
});

export const groupsEpics = [
  contacsEpic,
];
