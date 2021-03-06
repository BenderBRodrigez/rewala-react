import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        pending: true
      }
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        pending: true
      }
    case ActionTypes.SIGNIN:
      return {
        ...state,
        pending: false,
        token: action.token
      }
    case ActionTypes.SIGNOUT:
      return {
        ...state,
        token: null
      }
    case ActionTypes.REQUEST_FAILED:
      return {
        ...state,
        pending: false
      }
    case ActionTypes.GET_USER:
      return {
        ...state,
        user: action.payload.response
      }
    default:
      return state;
  }
}
