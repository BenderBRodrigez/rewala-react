import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import GroupList from '../GroupList';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './create-question.css';

export default function() {
    return (
      <div>
        Create Question
        <Paper
          className='home-list-item'
        >
          <TextField
            className="question-input"
            hintText="Enter Question"
            onChange={this.handleQuestion}
            name="question"
            value={this.state.question}
          />
          <Divider className='create-question-divider' />
          <Toggle
            label='Multiple Answers'
            labelPosition='right'
            onToggle={this.isMultiple}
          />
          <Divider className='create-question-divider' />
          {!!this.state.answers.length &&
          <List className="question-list">
            {this.state.answers.map((item, i) => (
              <ListItem
                key={i}
                primaryText={item}
              />
            ))}
          </List>}
          <ValidatorForm
            onSubmit={this.addAnswer}
          >
            <TextValidator
              hintText="Enter Answer"
              onChange={this.handleAnswer}
              name="question"
              value={this.state.answer}
              validators={['required']}
              errorMessages={['required']}
            />
            <RaisedButton
              type="submit"
              label="add"
              disabled={this.props.pending}
            />
          </ValidatorForm>

          <Divider className='create-question-divider' />
          <DatePicker
            hintText="Question Deadline"
            value={this.state.deadline}
            shouldDisableDate={date => date < new Date()}
            autoOk={true}
            onChange={this.handleDate}
          />
        </Paper>

        <GroupList
          title='Select Group'
          selector={true}
        />
        <Divider className='create-question-divider' />
        <RaisedButton
          label="create question"
          onClick={this.createQuestion}
          disabled={!this.isValidForm()}
          className="create-question-button"
        />
      </div>
    )
}
