import React, {Component} from 'react';
import {connect} from 'react-redux';
// import store from '../../../../store';
// import * as auth from '../../../../redux/auth/actions';

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

class QuestionResults extends Component {
  render() {
    return (
      <div>
        QuestionResults
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(QuestionResults);