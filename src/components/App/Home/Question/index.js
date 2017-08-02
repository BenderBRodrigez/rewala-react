import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import store from '../../../../store';
import * as questions from "../../../../redux/questions/actions";
import YourCreatedQuestions from './YourCreatedQuestions';
import VoiceGivenQuestions from './VoiceGivenQuestions';
import AwaitingYourAnswerQuestions from './AwaitingYourAnswerQuestions';
import QuestionResults from './QuestionResults';
import PastQuestions from './PastQuestions';

const mapStateToProps = state => ({
  active_id: state.questions.active_id,
  list_type: state.questions.list_type,
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.activateQuestion = this.activateQuestion.bind(this);
  }

  components = {
    YourCreatedQuestions,
    VoiceGivenQuestions,
    AwaitingYourAnswerQuestions,
    QuestionResults,
    PastQuestions,
  };

  render() {
    const QuestionDetail = this.components[this.props.list_type];

    return (
      <Paper
        className='home-list-item'
        onClick={this.activateQuestion}
      >
        {this.props.text}
        {this.props.active_id==this.props.id &&
        <QuestionDetail
          id={this.props.id}
          type={this.props.type}
        />}
      </Paper>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.active_id == this.props.active_id ||
           nextProps.active_id == nextProps.id ||
           this.props.active_id == this.props.id;
  }

  activateQuestion() {
    store.dispatch({
      type: questions.ActionTypes.ACTIVATE,
      active_id: this.props.id,
    })
  }

}

export default connect(
  mapStateToProps,
)(Question);