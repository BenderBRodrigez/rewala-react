export const OPEN = 'notify/OPEN';
export const CLOSE = 'notify/CLOSE';

const initialState = {
  message: '',
  open: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        open: true,
        message: action.message
      }
    case CLOSE:
      return {
        ...state,
        open: false,
        message: ''
      }
    default:
      return state;
  }
}
