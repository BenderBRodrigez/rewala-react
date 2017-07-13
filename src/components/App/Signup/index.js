import React, {Component} from 'react';
import {SIGNUP_REQUEST, SIGNIN, HANDLE_EMAIL, HANDLE_PASSWORD, HANDLE_USERNAME} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NetService from '../../../net-service';
import store from '../../../store';
import {push} from 'react-router-redux';

const signin = auth => {
  return NetService.post('/clients/login', {
    email: auth.email,
    password: auth.password
  })
  .then(response => {
    store.dispatch(push('/'));
    store.dispatch({
      type: SIGNIN,
      token: response.data.id
    })
  })
  .catch(error => console.log(error))
}

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

  static handleEmail(event) {
    store.dispatch({
      type: HANDLE_EMAIL,
      email: event.target.value
    });
  }

  static handlePassword(event) {
    store.dispatch({
      type: HANDLE_PASSWORD,
      password: event.target.value
    });
  }

  static handleUsername(event) {
    store.dispatch({
      type: HANDLE_USERNAME,
      username: event.target.value
    })
  }

  render() {
    return (
      <Paper zDepth={3} className="paper">
        <p>signup page</p>
        <div>
          <TextField type="email"
            hintText="Email"
            onChange={this.handleEmail}
          />
        </div>
        <div>
          <TextField type="text"
            hintText="Username"
            onChange={this.handleUsername}
          />
        </div>
        <div>
          <TextField type="password"
            hintText="Password"
            onChange={this.handlePassword}
          />
        </div>
        <div className="paper-button">
          <RaisedButton
            label="Register"
            onClick={this.signup}
            disabled={this.props.pending}
          />
        </div>
        <Snackbar
          className="error-message"
          open={this.props.snackbarOpen}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={this.snackbarClose}
        />
      </Paper>
    )
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