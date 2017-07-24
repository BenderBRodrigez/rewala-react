import {Component} from 'react';
import {SIGNUP_REQUEST, SIGNIN} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import {connect} from 'react-redux';
import NetService from '../../../net-service';
import store from '../../../store';
import {push} from 'react-router-redux';
import minLengthValidator from '../../../validators/min-length';
import template from './signup.jsx';

const signin = state => {
  return NetService.post('/clients/login', {
    email: state.email,
    password: state.password
  })
  .then(response => {
    store.dispatch({
      type: SIGNIN,
      token: response.data.id
    });
    store.dispatch(push('/'));
  })
  .catch(error => console.log(error))
};

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  snackbarOpen: state.notify.open,
  message: state.notify.message
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.signup = this.signup.bind(this);
  }

  render = template.bind(this);

  componentWillMount() {
    minLengthValidator();
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  signup() {
    store.dispatch({
      type: SIGNUP_REQUEST
    });
    return NetService.post('/clients', {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    })
    .then(response => signin(this.state))
    .catch(error => {
      store.dispatch({
        type: SIGNIN
      });
    })
  }

  snackbarClose() {
    store.dispatch({
      type: CLOSE,
    });
  }
}

export default connect(
  mapStateToProps
)(Signup);