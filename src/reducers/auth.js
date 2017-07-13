export const SIGNIN = 'auth/SIGNIN';
export const SIGNIN_REQUEST = 'auth/SIGNIN_REQUEST';
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const HANDLE_EMAIL = 'auth/HANDLE_EMAIL';
export const HANDLE_PASSWORD = 'auth/HANDLE_PASSWORD';
export const HANDLE_USERNAME = 'auth/HANDLE_USERNAME';

const initialState = {
  token: '',
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
    default:
      return state;
  }
}
