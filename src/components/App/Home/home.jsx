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
            containerElement={<Link to={`${this.props.match.url}/question/created`} />}
            primaryText="Your created questions"
            leftIcon={<ArrowForward />}
            onClick={this.getCreated}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/voicegiven`} />}
            primaryText="Voice given questions"
            leftIcon={<ArrowForward />}
            onClick={this.getVoiceGiven}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/awaiting`} />}
            primaryText="Awaiting your answer questions"
            leftIcon={<ArrowForward />}
            onClick={this.getAwaiting}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/results`} />}
            primaryText="Question results"
            leftIcon={<ArrowForward />}
            onClick={this.getResults}
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/past`} />}
            primaryText="Past questions"
            leftIcon={<ArrowForward />}
            onClick={this.getPast}
          />
          <Divider
            className="menu-divider"
          />
          <MenuItem
            containerElement={<Link to={`${this.props.match.url}/question/create`} />}
            primaryText="Create new question"
            leftIcon={<ArrowForward />}
            onClick={this.createQuestion}
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
            onClick={this.getSettings}
          />
        </Menu>
      </Paper>
      <div className='home-list'>
        <Switch>
          <Route path={`${this.props.match.url}/question/created`} component={QuestionList} />
          <Route path={`${this.props.match.url}/question/voicegiven`} component={QuestionList} />
          <Route path={`${this.props.match.url}/question/awaiting`} component={QuestionList} />
          <Route path={`${this.props.match.url}/question/results`} component={QuestionList} />
          <Route path={`${this.props.match.url}/question/past`} component={QuestionList} />
          <Route path={`${this.props.match.url}/question/create`} component={CreateQuestion} />
          <Route path={`${this.props.match.url}/groups`} component={GroupList} />
          <Route path={`${this.props.match.url}/settings`} component={Settings} />
        </Switch>
      </div>
      <ErrorNotify />
    </div>
  );

};