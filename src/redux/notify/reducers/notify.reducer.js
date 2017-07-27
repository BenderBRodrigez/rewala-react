import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.OPEN:
      return {
        ...state,
        open: true,
        message: action.error.message
      }
    case ActionTypes.CLOSE:
      return {
        ...state,
        open: false,
        message: ''
      }
    default:
      return state;
  }
}
