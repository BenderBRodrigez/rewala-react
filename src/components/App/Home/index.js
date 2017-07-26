import {Component} from 'react';
import store from '../../../store';
import {connect} from 'react-redux';
import {CLOSE} from '../../../reducers/notify';
import {GET_USER} from '../../../reducers/auth';
import {GET_LIST} from "../../../reducers/questions";
import {ajaxGet} from '../../../epics/net';
import template from './home.jsx';
import './home.css';

const getUser = token => {
  store.dispatch(ajaxGet({
    url: `/tokens/${token}/user`,
    dispatch_type: GET_USER
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
      dispatch_type: GET_LIST
    }));
  }

  getVoiceGiven() {
    store.dispatch(ajaxGet({
      url: '/clients/get-voice-given-questions',
      dispatch_type: GET_LIST
    }));
  }

  getAwaiting() {
    store.dispatch(ajaxGet({
      url: '/clients/get-awaiting-questions',
      dispatch_type: GET_LIST
    }));
  }

  getResults() {
    store.dispatch(ajaxGet({
      url: '/clients/get-completed-questions',
      dispatch_type: GET_LIST
    }));
  }

  getPast() {
    store.dispatch(ajaxGet({
      url: '/clients/get-past-questions',
      dispatch_type: GET_LIST
    }));
  }

  snackbarClose() {
    store.dispatch({
      type: CLOSE,
    });
  }

}

export default connect(
  mapStateToProps
)(Home);
