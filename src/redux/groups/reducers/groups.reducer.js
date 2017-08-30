import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_GROUPS:
      return {
        ...state,
        list: action.payload.response,
        group_id: '',
      }
    case ActionTypes.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.response.data,
      }
    case ActionTypes.ACTIVATE:
      return {
        ...state,
        group_id: action.group_id
      }
    default:
      return state;
  }
}
