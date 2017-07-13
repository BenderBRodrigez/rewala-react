import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {SIGNIN, SIGNIN_REQUEST, HANDLE_EMAIL, HANDLE_PASSWORD} from '../../../reducers/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../../store';
import {push} from 'react-router-redux';
import NetService from '../../../net-service';

const Signin = props => (
  <Paper zDepth={3} className="paper">
    <p>signin page</p>
    <div>
      <TextField type="email"
        hintText="Email"
        onChange={handleEmail}
      />
    </div>
    <div>
      <TextField type="password"
        hintText="Password"
        onChange={handlePassword}
      />
    </div>
    <div className="paper-button">
      <RaisedButton
        label="Login"
        onClick={signin}
        disabled={props.pending}
      />
    </div>
    <Snackbar
      className="error-message"
      open={props.snackbarOpen}
      message={props.message}
      autoHideDuration={4000}
    />
  </Paper>
);

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  email: state.auth.email,
  password: state.auth.password,
  snackbarOpen: state.notify.open,
  message: state.notify.message
});

const handleEmail = event => {
  store.dispatch({
    type: HANDLE_EMAIL,
    email: event.target.value
  });
}

const handlePassword = event => {
  store.dispatch({
    type: HANDLE_PASSWORD,
    password: event.target.value
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
    store.dispatch(push('/'));
    store.dispatch({
      type: SIGNIN,
      token: response.data.id
    })
  })
  .catch(error => {
    console.log(error)
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signin
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);