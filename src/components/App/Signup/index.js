import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {SIGNUP_REQUEST, SIGNIN, HANDLE_EMAIL, HANDLE_PASSWORD, HANDLE_USERNAME} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
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
    store.dispatch({
      type: SIGNIN,
      token: response.data.id
    })
    store.dispatch(push('/'));
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

  email = '';
  password = '';
  username = '';

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

  render() {
    return (
      <Paper zDepth={3} className="paper">
        <p>signup page</p>
        <ValidatorForm
          onSubmit={this.signup}
        >
          <TextValidator
            type="email"
            hintText="Email"
            onChange={this.handleEmail.bind(this)}
            name="email"
            value={this.email}
            validators={['required', 'isEmail']}
            errorMessages={['email is required', 'email is not valid']}
          />
          <TextValidator
            type="text"
            hintText="Username"
            onChange={this.handleUsername.bind(this)}
            name="username"
            value={this.username}
            validators={['required']}
            errorMessages={['username is required']}
          />
          <TextValidator
            type="password"
            hintText="Password"
            onChange={this.handlePassword.bind(this)}
            name="password"
            value={this.password}
            validators={['required']}
            errorMessages={['password is required']}
          />
          <div className="paper-button">
            <RaisedButton
              type="submit"
              label="Register"
              disabled={this.props.pending}
            />
          </div>
        </ValidatorForm>
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