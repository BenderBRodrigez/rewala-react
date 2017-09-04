import React from 'react';
import {Redirect, Switch, Route, Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import GroupList from './GroupList';
import QuestionList from './QuestionList';
import Settings from './Settings';
import CreateQuestion from './CreateQuestion';
import ErrorNotify from '../../../shared/components/ErrorNotify';

export default function () {
  if (!this.props.token) return <Redirect to="/signin" />;

  return (
    <div>
      <Paper className='home-menu'>
        <Menu>
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/YourCreatedQuestions`} />}
            primaryText="Your created questions"
            leftIcon={<ArrowForward />}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/VoiceGivenQuestions`} />}
            primaryText="Voice given questions"
            leftIcon={<ArrowForward />}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/AwaitingYourAnswerQuestions`} />}
            primaryText="Awaiting your answer questions"
            leftIcon={<ArrowForward />}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/QuestionResults`} />}
            primaryText="Question results"
            leftIcon={<ArrowForward />}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/PastQuestions`} />}
            primaryText="Past questions"
            leftIcon={<ArrowForward />}
          />
          <Divider
            className="menu-divider"
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/create`} />}
            primaryText="Create new question"
            leftIcon={<ArrowForward />}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/groups`} />}
            primaryText="My Groups"
            leftIcon={<ArrowForward />}
            onClick={this.getGroups}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/settings`} />}
            primaryText="Settings"
            leftIcon={<ArrowForward />}
          />
        </Menu>
      </Paper>
      <div className='home-list'>
        <Switch>
          <Route exact path={`${this.props.match.url}/question/create`} component={CreateQuestion} />
          <Route path={`${this.props.match.url}/question/:list`} component={QuestionList} />
          <Route path={`${this.props.match.url}/groups`} component={GroupList} />
          <Route path={`${this.props.match.url}/settings`} component={Settings} />
        </Switch>
      </div>
      <ErrorNotify />
    </div>
  );

};