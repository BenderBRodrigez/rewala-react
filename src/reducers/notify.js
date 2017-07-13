export const OPEN = 'notify/OPEN';

const initialState = {
  message: '',
  open: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        open: true,
        message: action.message
      }
    default:
      return state;
  }
}
