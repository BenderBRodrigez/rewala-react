import {Component} from 'react';
import * as auth from '../../../redux/auth/actions';
import {connect} from 'react-redux';
import store from '../../../store';
import minLengthValidator from '../../../shared/validators/min-length';
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
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  signup() {
    store.dispatch({
      type: auth.ActionTypes.SIGNUP_REQUEST,
      options: {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      }
    });
  }

}

export default connect(
  mapStateToProps
)(Signup);