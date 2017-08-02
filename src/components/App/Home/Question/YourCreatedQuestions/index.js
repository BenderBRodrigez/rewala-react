import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';
import template from './your-created-questions.jsx';

const mapStateToProps = state => ({
  results: state.questions.results,
  // pending: state.auth.pending,
});

class YourCreatedQuestions extends Component {
  constructor(props) {
    super(props);
    this.finishVoting = this.finishVoting.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render = template.bind(this);

  finishVoting() {

  }

  deleteQuestion() {
    store.dispatch({
      type: questions.ActionTypes.DELETE_REQUEST,
      id: this.props.id,
    })
  }

}

export default connect(
  mapStateToProps,
)(YourCreatedQuestions);