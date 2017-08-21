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
        {this.props.list.filter(item => {
          return item.id != this.props.finished_id && item.id != this.props.deleted_id;
        }).map((item, i) => {
          const question_type = this.props.question_types.find(type => type.id == item.questionTypeId);
          const createdAt = new Date(item.createdAt);
          const deadline = new Date(createdAt).setSeconds(createdAt.getSeconds() + item.ttl);
          return <Question
            key={i}
            id={item.id}
            text={item.text}
            type={question_type ? question_type.name : ''}
            createdAt={createdAt.getTime()}
            deadline={deadline}
          />}
        )}
      </div>
      <ErrorNotify />
    </div>
  );

};