import {Component} from 'react';
import {SIGNIN, SIGNIN_REQUEST} from '../../../reducers/auth';
import {CLOSE} from '../../../reducers/notify';
import {connect} from 'react-redux';
import store from '../../../store';
import {push} from 'react-router-redux';
import NetService from '../../../net-service';
import minLengthValidator from '../../../validators/min-length';
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
      type: SIGNIN_REQUEST
    });
    return NetService.post('/clients/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      store.dispatch({
        type: SIGNIN,
        token: response.data.id
      })
      store.dispatch(push('/'));
    })
    .catch(error => {
      store.dispatch({
        type: SIGNIN
      })
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
)(Signin);