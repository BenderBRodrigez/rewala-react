import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";

const mapStateToProps = state => ({
});

class PastQuestions extends Component {
  render() {
    return (
      <div>
        QuestionResults {this.props.id}
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(PastQuestions);