import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ErrorNotify from '../../../shared/components/ErrorNotify';

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
          onChange={this.handleEmail}
          name="email"
          value={this.state.email}
          validators={['required', 'isEmail']}
          errorMessages={['email is required', 'email is not valid']}
        />
        <TextValidator
          type="text"
          hintText="Username"
          onChange={this.handleUsername}
          name="username"
          value={this.state.username}
          validators={['required']}
          errorMessages={['username is required']}
        />
        <TextValidator
          type="password"
          hintText="Password"
          onChange={this.handlePassword}
          name="password"
          value={this.state.password}
          validators={['required', 'minLength']}
          errorMessages={['password is required', 'minimum 6 characters']}
        />
        <div className="paper-button">
          <RaisedButton
            type="submit"
            label="Register"
            disabled={this.props.pending}
          />
        </div>
      </ValidatorForm>
      <ErrorNotify />
    </Paper>
  )
}