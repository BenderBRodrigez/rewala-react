import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_LIST:
      return {
        ...state,
        list: action.payload.response.data,
        list_type: action.payload.list_type,
        deleted_id: '',
        finished_id: '',
        voice_given_id: '',
        active_id: '',
      }
    case ActionTypes.CLEAR_LIST:
      return {
        ...state,
        list: [],
        list_type: '',
        deleted_id: '',
        finished_id: '',
        voice_given_id: '',
        active_id: '',
      }
    case ActionTypes.ACTIVATE:
      return {
        ...state,
        active_id: action.active_id
      }
    case ActionTypes.GET_RESULTS:
      return {
        ...state,
        results: action.payload.response
      }
    case ActionTypes.DELETE:
      return {
        ...state,
        deleted_id: action.id
      }
    case ActionTypes.FINISH:
      return {
        ...state,
        finished_id: action.id
      }
    case ActionTypes.CREATE_ANSWER:
      return {
        ...state,
        voice_given_id: action.id
      }
    default:
      return state;
  }
}
