import {Component} from 'react';
import {SIGNUP_REQUEST, SIGNIN, HANDLE_EMAIL, HANDLE_PASSWORD, HANDLE_USERNAME} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NetService from '../../../net-service';
import store from '../../../store';
import {push} from 'react-router-redux';
import template from './signup.jsx';

const signin = auth => {
  return NetService.post('/clients/login', {
    email: auth.email,
    password: auth.password
  })
  .then(response => {
    store.dispatch({
      type: SIGNIN,
      token: response.data.id
    });
    store.dispatch(push('/'));
  })
  .catch(error => console.log(error))
};

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  email: state.auth.email,
  password: state.auth.password,
  username: state.auth.username,
  snackbarOpen: state.notify.open,
  message: state.notify.message
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Signup
}, dispatch);

class Signup extends Component {

  email = '';
  password = '';
  username = '';

  render = template.bind(this);

  handleEmail(event) {
    this.email = event.target.value;
    store.dispatch({
      type: HANDLE_EMAIL,
      email: this.email
    });
  }

  handlePassword(event) {
    this.password = event.target.value;
    store.dispatch({
      type: HANDLE_PASSWORD,
      password: this.password
    });
  }

  handleUsername(event) {
    this.username = event.target.value;
    store.dispatch({
      type: HANDLE_USERNAME,
      username: this.username
    })
  }

  signup() {
    const auth = store.getState().auth;
    store.dispatch({
      type: SIGNUP_REQUEST
    });
    return NetService.post('/clients', {
      email: auth.email,
      password: auth.password,
      username: auth.username
    })
    .then(response => signin(auth))
    .catch(error => {
      store.dispatch({
        type: SIGNIN
      });
    })
  }

  snackbarClose() {
    store.dispatch({
      type: CLOSE,
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);