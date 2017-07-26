import {Component} from 'react';
import {CLOSE} from '../../../reducers/notify';
import {connect} from 'react-redux';
import store from '../../../store';
import {AJAX_SIGNIN, ajaxPost} from '../../../epics/net';
import minLengthValidator from '../../../validators/min-length';
import template from './signup.jsx';

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
    store.dispatch(ajaxPost({
      url: `/clients`,
      dispatch_type: AJAX_SIGNIN,
      body: {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      }
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
)(Signup);