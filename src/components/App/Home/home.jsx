import React from 'react';
import {Redirect} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Question from './Question';
import ErrorNotify from '../../../shared/components/ErrorNotify';

export default function () {

  if (!this.props.token) return <Redirect to="/signin" />;

  return (
    <div>
      <Paper className='home-menu'>
        <Menu>
          <MenuItem
            primaryText="Your created questions"
            leftIcon={<ArrowForward />}
            onClick={this.getCreated}
          />
          <MenuItem
            primaryText="Voice given questions"
            leftIcon={<ArrowForward />}
            onClick={this.getVoiceGiven}
          />
          <MenuItem
            primaryText="Awaiting your answer questions"
            leftIcon={<ArrowForward />}
            onClick={this.getAwaiting}
          />
          <MenuItem
            primaryText="Question results"
            leftIcon={<ArrowForward />}
            onClick={this.getResults}
          />
          <MenuItem
            primaryText="Past questions"
            leftIcon={<ArrowForward />}
            onClick={this.getPast}
          />
        </Menu>
      </Paper>
      <div className='home-list'>
        {this.props.list_type}
        {this.props.list.map((item, i) =>
          <Question
            key={i}
            id={item.id}
            text={item.text}
          />
        )}
      </div>
      <ErrorNotify />
    </div>
  );

};