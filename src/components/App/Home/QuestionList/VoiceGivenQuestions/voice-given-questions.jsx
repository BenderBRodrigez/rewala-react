import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import moment from 'moment';

export default function() {
  return (
    <div>
      {this.props.type === 'checkbox' &&
      <List className="question-list">
        {!!this.props.results.length && this.props.results.map((item, i) =>
          <ListItem
            key={i}
            id={item.id}
            leftCheckbox={
              <Checkbox
                onCheck={this.checkChange}
                value={item.id}
                checked={this.checkAnswers(item.id)}
              />
            }
            primaryText={item.text}
          />
        )}
      </List>}
      {this.props.type === 'radio' && this.props.results.length &&
      <RadioButtonGroup
        name="radioQuestion"
        onChange={this.radioChange}
        valueSelected={this.state.questionOptionId[0]}
        className="question-list"
      >
        {this.props.results.map((item, i) =>
          <RadioButton
            key={i}
            value={item.id}
            label={item.text}
            className="question-list-item"
          />
        )}
      </RadioButtonGroup>}
      <Divider />
      <div className="question-deadline">
        {moment(this.props.deadline).format('YYYY MM DD')}
      </div>
      <RaisedButton
        label="Change My Vote"
        className="question-button"
        disabled={this.props.pending}
        onClick={this.openDialog}
      />
      <Dialog
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.closeDialog}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.changeVote}
          />,
        ]}
        modal={false}
        open={this.state.dialog}
        onRequestClose={this.closeDialog}
      >
        Change vote?
    </Dialog>
    </div>
  );
}
