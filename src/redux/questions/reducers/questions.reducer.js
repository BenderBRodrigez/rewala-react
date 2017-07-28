import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_LIST:
      return {
        ...state,
        list: action.payload.response.data,
        list_type: action.payload.list_type
      }
    default:
      return state;
  }
}
