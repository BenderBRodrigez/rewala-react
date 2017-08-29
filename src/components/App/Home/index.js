import {Component} from 'react';
import store from '../../../store';
import {connect} from 'react-redux';
import * as auth from '../../../redux/auth/actions';
import * as questions from "../../../redux/questions/actions";
import * as answers from "../../../redux/answers/actions";
import {netService} from '../../../shared/services/net.service';
import template from './home.jsx';
import './home.css';

const getUser = token => {
  store.dispatch(netService.ajaxGet({
    url: `/tokens/${token}/user`,
    dispatch_type: auth.ActionTypes.GET_USER
  }))
};

const camelize = string => string.split(" ").reduce(function (result, char) {
  const add = char.toLowerCase();
  return result + (add[0].toUpperCase() + add.slice(1));
});

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  user: state.auth.user,
  groups: state.groups.list,
  list: state.questions.list,
  list_type: state.questions.list_type,
  answers_list: state.answers.answers_list,
  question_types: state.questions.question_types,
  finished_id: state.questions.finished_id,
  deleted_id: state.questions.deleted_id,
  voice_given_id: state.questions.voice_given_id,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.getCreated = this.getCreated.bind(this);
    this.getVoiceGiven = this.getVoiceGiven.bind(this);
    this.getAwaiting = this.getAwaiting.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getPast = this.getPast.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.getGroups = this.getGroups.bind(this);
    if (this.props.token) getUser(this.props.token);
  }

  render = template.bind(this);

  getCreated(event) {
    store.dispatch(netService.ajaxGet({
      url: '/clients/get-questions',
      dispatch_type: questions.ActionTypes.GET_LIST,
      list_type: camelize(event.target.textContent),
    }));
  }

  getVoiceGiven(event) {
    store.dispatch(netService.ajaxGet({
      url: `/clients/${this.props.user.id}/answers`,
      dispatch_type: answers.ActionTypes.GET,
      list_type: camelize(event.target.textContent),
    }));
  }

  getAwaiting(event) {
    store.dispatch(netService.ajaxGet({
      url: '/clients/get-awaiting-questions',
      dispatch_type: questions.ActionTypes.GET_LIST,
      list_type: camelize(event.target.textContent),
    }));
  }

  getResults(event) {
    store.dispatch(netService.ajaxGet({
      url: '/clients/get-completed-questions',
      dispatch_type: questions.ActionTypes.GET_LIST,
      list_type: camelize(event.target.textContent),
    }));
  }

  getPast(event) {
    store.dispatch(netService.ajaxGet({
      url: '/clients/get-past-questions',
      dispatch_type: questions.ActionTypes.GET_LIST,
      list_type: camelize(event.target.textContent),
    }));
  }

  createQuestion(event) {
    // store.dispatch()
  }

  getGroups(event) {
    store.dispatch({
      type: questions.ActionTypes.CLEAR_LIST,
    })
  }
}

export default connect(
  mapStateToProps
)(Home);
