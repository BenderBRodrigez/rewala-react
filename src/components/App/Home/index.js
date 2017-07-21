import {Component} from 'react';
import {bindActionCreators} from 'redux';
import store from '../../../store';
import {connect} from 'react-redux';
import {CLOSE} from '../../../reducers/notify';
import {GET_LIST} from '../../../reducers/questions';
import {GET_USER} from '../../../reducers/auth';
import NetService from '../../../net-service';
import template from './home.jsx';
import './home.css';

const getRequest = url => {
  return NetService.get(url)
  .then(response => {
    store.dispatch({
      type: GET_LIST,
      list: response.data.data
    })
  })
  .catch(error => console.log(error))
};

const getUser = token => {
  return NetService.get(`tokens/${token}/user`)
  .then(response => {
    store.dispatch({
      type: GET_USER,
      user: response.data
    })
  })
  .catch(error => console.log(error))
};

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  snackbarOpen: state.notify.open,
  message: state.notify.message,
  list: state.questions.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Home
}, dispatch);

class Home extends Component {
  constructor(props) {
    super(props);
    if (this.props.token) getUser(this.props.token);
  }

  render = template.bind(this);

  getCreated() {
    return getRequest('clients/get-questions')
  }

  getVoiceGiven() {
    return getRequest('clients/get-voice-given-questions')
  }

  getAwaiting() {
    return getRequest('clients/get-awaiting-questions')
  }

  getResults() {
    return getRequest('clients/get-completed-questions')
  }

  getPast() {
    return getRequest('clients/get-past-questions');
  }

  snackbarClose() {
    store.dispatch({
      type: CLOSE,
    });
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
