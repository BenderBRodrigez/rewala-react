import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import store from '../../../../store';
import * as questions from "../../../../redux/questions/actions";
import * as answers from "../../../../redux/answers/actions";
import {netService} from '../../../../shared/services/net.service';
import YourCreatedQuestions from './YourCreatedQuestions';
import VoiceGivenQuestions from './VoiceGivenQuestions';
import AwaitingYourAnswerQuestions from './AwaitingYourAnswerQuestions';
import QuestionResults from './QuestionResults';
import PastQuestions from './PastQuestions';

import './question-list.css';

const mapStateToProps = state => ({
  user: state.auth.user,
  list: state.questions.list,
  question_types: state.questions.question_types,
  finished_id: state.questions.finished_id,
  deleted_id: state.questions.deleted_id,
  voice_given_id: state.questions.voice_given_id,
});

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_id: '',
    };
    this.activateQuestion = this.activateQuestion.bind(this);
  }

  components = {
    YourCreatedQuestions,
    VoiceGivenQuestions,
    AwaitingYourAnswerQuestions,
    QuestionResults,
    PastQuestions,
  };

  urls = {
    YourCreatedQuestions: '/clients/get-questions',
    VoiceGivenQuestions: `/clients/${this.props.user.id}/answers`,
    AwaitingYourAnswerQuestions: '/clients/get-awaiting-questions',
    QuestionResults: '/clients/get-completed-questions',
    PastQuestions: '/clients/get-past-questions',
  };

  render() {
    const QuestionDetail = this.components[this.props.match.params.list];

    return (
      <div>
        {this.props.match.params.list}
        {this.props.list
        .filter(item => item.id !== this.props.finished_id && item.id !== this.props.deleted_id && item.id !== this.props.voice_given_id)
        .map((item, i) => {
          const question_type = this.props.question_types.find(type => type.id === item.questionTypeId);
          const createdAt = new Date(item.createdAt);
          const deadline = new Date(createdAt).setSeconds(createdAt.getSeconds() + item.ttl);

          return <Paper
            key={i}
            className='home-list-item'
            onClick={() => this.activateQuestion(item.id)}
          >
            {item.text}
            {this.state.active_id === item.id &&
            <QuestionDetail
              id={item.id}
              type={question_type ? question_type.name : ''}
              createdAt={createdAt.getTime()}
              deadline={deadline}
              answers={item.answerQuestionOptionIds}
            />}
          </Paper>
        })}
      </div>
    );
  }

  componentWillMount() {
    this.getList(this.props.match.params.list);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.list !== this.props.match.params.list) {
      this.setState({
        active_id: ''
      });
      this.getList(nextProps.match.params.list);
    }
  }

  activateQuestion(id) {
    this.setState({
      active_id: id
    })
  }

  getList(list_type) {
    const dispatch_type = (list_type === 'VoiceGivenQuestions') ? answers.ActionTypes.GET : questions.ActionTypes.GET_LIST;

    store.dispatch(netService.ajaxGet({
      url: this.urls[list_type],
      dispatch_type,
    }));
  }

}

export default connect(
  mapStateToProps
)(QuestionList);