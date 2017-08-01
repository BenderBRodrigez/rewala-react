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
    case ActionTypes.ACTIVATE:
      return {
        ...state,
        active_id: action.active_id
      }
    case ActionTypes.CHANGE_CHART_TYPE:
      return {
        ...state,
        chart_type: action.chart_type
      }
    case ActionTypes.GET_RESULTS:
      return {
        ...state,
        results: action.payload.response.data
      }
    default:
      return state;
  }
}
