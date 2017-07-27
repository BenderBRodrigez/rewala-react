import {Component} from 'react';
import store from '../../../store';
import {connect} from 'react-redux';
import * as notify from '../../../redux/notify/actions';
import * as auth from '../../../redux/auth/actions';
import * as questions from "../../../redux/questions/actions";
import {ajaxGet} from '../../../shared/services/net.service';
import template from './home.jsx';
import './home.css';

const getUser = token => {
  store.dispatch(ajaxGet({
    url: `/tokens/${token}/user`,
    dispatch_type: auth.ActionTypes.GET_USER
  }))
};

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  snackbarOpen: state.notify.open,
  message: state.notify.message,
  list: state.questions.list,
});

class Home extends Component {
  constructor(props) {
    super(props);
    if (this.props.token) getUser(this.props.token);
  }

  render = template.bind(this);

  getCreated() {
    store.dispatch(ajaxGet({
      url: '/clients/get-questions',
      dispatch_type: questions.ActionTypes.GET_LIST
    }));
  }

  getVoiceGiven() {
    store.dispatch(ajaxGet({
      url: '/clients/get-voice-given-questions',
      dispatch_type: questions.ActionTypes.GET_LIST
    }));
  }

  getAwaiting() {
    store.dispatch(ajaxGet({
      url: '/clients/get-awaiting-questions',
      dispatch_type: questions.ActionTypes.GET_LIST
    }));
  }

  getResults() {
    store.dispatch(ajaxGet({
      url: '/clients/get-completed-questions',
      dispatch_type: questions.ActionTypes.GET_LIST
    }));
  }

  getPast() {
    store.dispatch(ajaxGet({
      url: '/clients/get-past-questions',
      dispatch_type: questions.ActionTypes.GET_LIST
    }));
  }

  snackbarClose() {
    store.dispatch({
      type: notify.ActionTypes.CLOSE,
    });
  }

}

export default connect(
  mapStateToProps
)(Home);
