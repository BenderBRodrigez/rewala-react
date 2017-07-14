import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import store from '../../../store';
import {SIGNOUT} from '../../../reducers/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  token: state.auth.token,
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
        {this.props.token && <a href="/" onClick={this.signout}>Signout</a>}
      </div>
    );
  }

  signout() {
    localStorage.removeItem('access_token');
    store.dispatch({
      type: SIGNOUT
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);