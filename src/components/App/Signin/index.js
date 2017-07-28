import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../store';
import * as auth from '../../../redux/auth/actions';
import minLengthValidator from '../../../shared/validators/min-length';
import template from './signin.jsx';

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  snackbarOpen: state.notify.open,
  message: state.notify.message
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentWillMount() {
    minLengthValidator();
  }

  render = template.bind(this);

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

  signin() {
    store.dispatch({
      type: auth.ActionTypes.SIGNIN_REQUEST,
      options: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

}

export default connect(
  mapStateToProps
)(Signin);