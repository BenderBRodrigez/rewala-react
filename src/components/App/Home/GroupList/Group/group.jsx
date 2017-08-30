import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

export default function() {
  return (
    <Paper
      className='home-list-item'
      onClick={this.activateGroup}
    >
      {this.props.name}
      {this.props.group_id === this.props.id &&
        <List className="question-list">
          {this.props.contacts.length && this.props.contacts
          .filter(item => this.props.memberList.find(member => member === item.id))
          .map((item, i) => (
            <ListItem
              key={i}
              id={item.id}
              primaryText={`${item.username} : ${item.email}`}
            />
          ))}
        </List>
      }
    </Paper>
  );
}