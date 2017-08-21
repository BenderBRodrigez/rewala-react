import {Component} from 'react';
import store from '../../../store';
import {connect} from 'react-redux';
import * as auth from '../../../redux/auth/actions';
import * as questions from "../../../redux/questions/actions";
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
  list: state.questions.list,
  list_type: state.questions.list_type,
  question_types: state.questions.question_types,
  finished_id: state.questions.finished_id,
  deleted_id: state.questions.deleted_id,
});

class Home extends Component {
  constructor(props) {
    super(props);
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
      url: '/clients/get-voice-given-questions',
      dispatch_type: questions.ActionTypes.GET_LIST,
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

}

export default connect(
  mapStateToProps
)(Home);
