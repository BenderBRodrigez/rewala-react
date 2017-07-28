import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../store';
import * as auth from '../../../../redux/auth/actions';

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

class PastQuestions extends Component {
  render() {
    return (
      <div>
        PastQuestions
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(PastQuestions);