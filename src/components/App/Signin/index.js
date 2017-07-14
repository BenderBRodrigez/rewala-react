import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {SIGNIN, SIGNIN_REQUEST, HANDLE_EMAIL, HANDLE_PASSWORD} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../../store';
import {push} from 'react-router-redux';
import NetService from '../../../net-service';


let email = '';
let password = '';

const Signin = props => (
  <Paper zDepth={3} className="paper">
    <p>signin page</p>
    <ValidatorForm
      onSubmit={signin}
    >
      <TextValidator
        type="email"
        hintText="Email"
        onChange={handleEmail}
        name="email"
        value={email}
        validators={['required', 'isEmail']}
        errorMessages={['email is required', 'email is not valid']}
      />
      <TextValidator
        type="password"
        hintText="Password"
        onChange={handlePassword}
        name="password"
        value={password}
        validators={['required']}
        errorMessages={['password is required']}
      />
      <div className="paper-button">
        <RaisedButton
          type="submit"
          label="Login"
          disabled={props.pending}
        />
      </div>
    </ValidatorForm>
    <Snackbar
      className="error-message"
      open={props.snackbarOpen}
      message={props.message}
      autoHideDuration={4000}
      onRequestClose={snackbarClose}
    />
  </Paper>
);

const handleEmail = event => {
  email = event.target.value;
  store.dispatch({
    type: HANDLE_EMAIL,
    email: email
  });
}

const handlePassword = event => {
  password = event.target.value;
  store.dispatch({
    type: HANDLE_PASSWORD,
    password: password
  });
}

const signin = () => {
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

const snackbarClose = () => {
  store.dispatch({
    type: CLOSE,
  });
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);