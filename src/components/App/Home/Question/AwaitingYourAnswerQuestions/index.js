import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import * as answers from "../../../../../redux/answers/actions";
import {netService} from '../../../../../shared/services/net.service';
import template from './awaiting-your-answer-questions';

const mapStateToProps = state => ({
  results: state.questions.results,
  user: state.auth.user,
  answer: state.answers.answer,
});

class AwaitingYourAnswerQuestions extends Component {
  constructor(props) {
    super(props);
    this.radioChange = this.radioChange.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentWillMount() {
    this.setState({
      clientId: this.props.user.id,
    });
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render = template.bind(this);

  radioChange(event, value) {
    this.setState({
      questionOptionId: [value],
    })
  }

  checkChange(event, isChecked) {
    const value = event.target.value;
    let questionOptionId = this.state.questionOptionId || [];
    if (isChecked) {
      questionOptionId.push(value);
    } else {
      questionOptionId = questionOptionId.filter(item => item != value);
    }
    this.setState({questionOptionId});
  }

  vote() {
    store.dispatch({
      type: answers.ActionTypes.CREATE_REQUEST,
      payload: {
        voice_given_id: this.props.id,
        clientId: this.state.clientId,
        questionOptionIds: this.state.questionOptionId,
      }
    })
  }

}

export default connect(
  mapStateToProps,
)(AwaitingYourAnswerQuestions);