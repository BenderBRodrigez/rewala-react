export const GET_LIST = 'questions/GET_LIST';
export const AJAX_GET = 'questions/AJAX_GET';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.payloads.data
      }
    default:
      return state;
  }
}
