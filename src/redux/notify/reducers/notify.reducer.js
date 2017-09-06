import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ERROR_OPEN:
      return {
        ...state,
        error_open: true,
        error_message: action.error.message
      }
    case ActionTypes.OPEN:
      return {
        ...state,
        open: true,
        message: action.message
      }
    case ActionTypes.ERROR_CLOSE:
      return {
        ...state,
        error_open: false,
        error_message: ''
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
