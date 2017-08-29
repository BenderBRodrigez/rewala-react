import React from 'react';
import {Redirect} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Question from './Question';
import Group from './Group';
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
          <Divider
            className="menu-divider"
          />
          <MenuItem
            primaryText="Create new question"
            leftIcon={<ArrowForward />}
            onClick={this.createQuestion}
          />
          <MenuItem
            primaryText="My Groups"
            leftIcon={<ArrowForward />}
            onClick={this.getGroups}
          />
          <MenuItem
            primaryText="Settings"
            leftIcon={<ArrowForward />}
            onClick={this.getSettings}
          />
        </Menu>
      </Paper>
      <div className='home-list'>
        {this.props.list_type || 'My Groups'}

        {!this.props.list.length && !this.props.list_type && this.props.groups.map((item, i) => {

          return <Group
            key={i}
            name={item.name}
          />
        })}

        {!!this.props.list.length && this.props.list
        .filter(item => item.id !== this.props.finished_id && item.id !== this.props.deleted_id && item.id !== this.props.voice_given_id)
        .map((item, i) => {
          const question_type = this.props.question_types.find(type => type.id === item.questionTypeId);
          const createdAt = new Date(item.createdAt);
          const deadline = new Date(createdAt).setSeconds(createdAt.getSeconds() + item.ttl);
          return <Question
            key={i}
            id={item.id}
            text={item.text}
            type={question_type ? question_type.name : ''}
            createdAt={createdAt.getTime()}
            deadline={deadline}
            answers={item.answerQuestionOptionIds}
          />
        })}
      </div>
      <ErrorNotify />
    </div>
  );

};