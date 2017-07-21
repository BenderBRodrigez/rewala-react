import React from 'react';
import {Redirect} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

export default function () {

  if (!this.props.token) return <Redirect to="/signin" />;

  return (
    <div>
      <Paper className='home-menu'>
        <Menu>
          <MenuItem primaryText="Your created questions" leftIcon={<ArrowForward />} onClick={this.getCreated} />
          <MenuItem primaryText="Voice given questions" leftIcon={<ArrowForward />} onClick={this.getVoiceGiven} />
          <MenuItem primaryText="Awaiting your answer questions" leftIcon={<ArrowForward />} onClick={this.getAwaiting} />
          <MenuItem primaryText="Question results" leftIcon={<ArrowForward />} onClick={this.getResults} />
          <MenuItem primaryText="Past questions" leftIcon={<ArrowForward />} onClick={this.getPast} />
        </Menu>
      </Paper>
      <div className='home-list'>
        {this.props.list.map((item, i) =>
          <Paper key={i} className='home-list-item'>
            {item.text}
          </Paper>
        )}
      </div>
      <Snackbar
        className="error-message"
        open={this.props.snackbarOpen}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.snackbarClose}
      />
    </div>
  );

};