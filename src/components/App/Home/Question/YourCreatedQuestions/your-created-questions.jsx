import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorNotify from '../../../../../shared/components/ErrorNotify';

import './your-created-questions.css';

export default function() {
  return (
    <div>
      <List className="created-list">
        {this.props.results.map((item, i) =>
          <ListItem
            key={i}
            id={item.id}
            primaryText={item.text}
          />
        )}
      </List>
      <RaisedButton
        label="Finish Voting"
        className="created-button"
        disabled={this.props.pending}
        onClick={this.finishVoting}
      />
      <RaisedButton
        label="Delete Question"
        secondary={true}
        className="created-button"
        disabled={this.props.pending}
        onClick={this.deleteQuestion}
      />
      <ErrorNotify />
    </div>
  );
}