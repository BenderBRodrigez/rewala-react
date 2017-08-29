import React from 'react';
import Paper from 'material-ui/Paper';

export default function() {
  return (
    <Paper
      className='home-list-item'
      onClick={this.activateGroup}
    >
      {this.props.name}
    </Paper>
  );
}