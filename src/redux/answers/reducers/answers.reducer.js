import {ActionTypes} from '../actions';
import {initialState} from '../states';

export function reducer(state = initialState, action) {
  switch (action.type) {
    // case ActionTypes.CREATE:
    //   return {
    //     ...state,
    //     answer: action.payload
    //   }
    default:
      return state;
  }
}
