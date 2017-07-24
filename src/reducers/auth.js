export const SIGNIN = 'auth/SIGNIN';
export const SIGNOUT = 'auth/SIGNOUT';
export const SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST';
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const GET_USER = 'auth/GET_USER';

const initialState = {
  token: '',
  user: {},
  pending: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        pending: true
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        pending: true
      }
    case SIGNIN:
      return {
        ...state,
        pending: false,
        token: action.token
      }
    case SIGNOUT:
      return {
        ...state,
        token: ''
      }
    case GET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
