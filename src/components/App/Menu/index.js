import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../../store';
import * as auth from '../../../redux/auth/actions';

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Menu
}, dispatch);

class Menu extends Component {
  render() {
    return (
      <div>
        {!this.props.token && <Link to="/signin">Signin</Link>}
        {!this.props.token && <Link to="/signup">Signup</Link>}
        {this.props.token && <Link to="/">Home</Link>}
        {this.props.token && <span>{this.props.user.username}</span>}
        {this.props.token && <a href="/" onClick={this.signout}>Signout</a>}
      </div>
    );
  }

  signout() {
    localStorage.removeItem('access_token');
    store.dispatch({
      type: auth.ActionTypes.SIGNOUT
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);