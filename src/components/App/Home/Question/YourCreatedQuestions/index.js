import React, {Component} from 'react';
import {connect} from 'react-redux';
// import store from '../../../../store';
// import * as auth from '../../../../redux/auth/actions';

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

class YourCreatedQuestions extends Component {
  render() {
    return (
      <div>
        YourCreatedQuestions
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(YourCreatedQuestions);