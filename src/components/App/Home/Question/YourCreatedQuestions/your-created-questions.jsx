import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import ErrorNotify from '../../../../../shared/components/ErrorNotify';

export default function() {
  return (
    <div>
      <List className="question-list">
        {this.props.results.length && this.props.results.map((item, i) =>
          <ListItem
            key={i}
            id={item.id}
            primaryText={item.text}
          />
        )}
      </List>
      <Divider />
      <div className="question-deadline">{moment(this.props.deadline).format('YYYY MM DD')}</div>
      <RaisedButton
        label="Finish Voting"
        className="question-button"
        disabled={this.props.pending}
        onClick={this.finishVoting}
      />
      <RaisedButton
        label="Delete Question"
        secondary={true}
        className="question-button"
        disabled={this.props.pending}
        onClick={this.deleteQuestion}
      />
      <ErrorNotify />
    </div>
  );
}