import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function() {
    return (
      <Paper
        className='home-list-item'
      >
        Create New Group
        <Divider />
        <TextField
          hintText="Group Name"
        />
        <Divider />
        <ValidatorForm
          onSubmit={this.findContact}
        >
          <TextValidator
            type="email"
            hintText="Find New Contacts by Email"
            onChange={this.handleEmail}
            name="email"
            value={this.state.email}
            validators={['isEmail']}
            errorMessages={['enter valid email']}
          />
          <RaisedButton
            type="submit"
            label="Find"
            disabled={this.props.pending}
          />
        </ValidatorForm>

        <List className="question-list">
          {this.props.contacts.length && this.props.contacts
          .map((item, i) => (
            <ListItem
              key={i}
              id={item.id}
              leftCheckbox={
                <Checkbox
                  onCheck={this.checkChange}
                  value={item.id}
                />
              }
              primaryText={`${item.username} : ${item.email}`}
            />
          ))}
        </List>
        <Divider />
        <RaisedButton
          label="Create Group"
          disabled={this.props.pending}
          onClick={this.createGroup}
          className="group-button"
        />
      </Paper>
    );
}
