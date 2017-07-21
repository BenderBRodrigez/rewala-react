import {Component} from 'react';
import {SIGNIN, SIGNIN_REQUEST, HANDLE_EMAIL, HANDLE_PASSWORD} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../../store';
import {push} from 'react-router-redux';
import NetService from '../../../net-service';
import template from './signin.jsx';

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  email: state.auth.email,
  password: state.auth.password,
  snackbarOpen: state.notify.open,
  message: state.notify.message
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Signin
}, dispatch);

class Signin extends Component {

  email = '';
  password = '';

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

  signin() {
    const auth = store.getState().auth;
    store.dispatch({
      type: SIGNIN_REQUEST
    });
    return NetService.post('/clients/login', {
      email: auth.email,
      password: auth.password
    })
    .then(response => {
      store.dispatch({
        type: SIGNIN,
        token: response.data.id
      })
      store.dispatch(push('/'));
    })
    .catch(error => {
      store.dispatch({
        type: SIGNIN
      })
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
)(Signin);