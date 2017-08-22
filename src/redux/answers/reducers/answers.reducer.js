import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET:
      return {
        ...state,
        answers_list: action.payload.response,
      }
    default:
      return state;
  }
}
