import React, {Component} from 'react';
import {SIGNUP_REQUEST, SIGNIN, HANDLE_EMAIL, HANDLE_PASSWORD, HANDLE_USERNAME} from '../../../reducers/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
    .catch(error => console.log(error))
  }
}

export default Signup;