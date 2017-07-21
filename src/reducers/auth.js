export const SIGNIN = 'auth/SIGNIN';
export const SIGNOUT = 'auth/SIGNOUT';
export const SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST';
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const HANDLE_EMAIL = 'auth/HANDLE_EMAIL';
export const HANDLE_PASSWORD = 'auth/HANDLE_PASSWORD';
export const HANDLE_USERNAME = 'auth/HANDLE_USERNAME';
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
    case HANDLE_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case HANDLE_PASSWORD:
      return {
        ...state,
        password: action.password
      }
    case HANDLE_USERNAME:
      return {
        ...state,
        username: action.username
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
