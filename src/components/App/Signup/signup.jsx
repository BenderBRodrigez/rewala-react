import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function () {
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