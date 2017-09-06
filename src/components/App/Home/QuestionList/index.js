import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../store';
import * as questions from "../../../../redux/questions/actions";
import * as answers from "../../../../redux/answers/actions";
import {netService} from '../../../../shared/services/net.service';
import YourCreatedQuestions from './YourCreatedQuestions';
import VoiceGivenQuestions from './VoiceGivenQuestions';
import AwaitingYourAnswerQuestions from './AwaitingYourAnswerQuestions';
import QuestionResults from './QuestionResults';
import PastQuestions from './PastQuestions';
import template from './question-list';

const mapStateToProps = state => ({
  user: state.auth.user,
  list: state.questions.list,
  list_type: state.questions.list_type,
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

  render = template.bind(this);

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
      list_type,
    }));
  }

}

export default connect(
  mapStateToProps
)(QuestionList);
