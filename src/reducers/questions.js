export const GET_LIST = 'questions/GET_LIST';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.list
      }
    default:
      return state;
  }
}
