import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as answers from "../../../../../redux/answers/actions";
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';
import template from './voice-given-questions';

const mapStateToProps = state => ({
  results: state.questions.results,
  answers_list: state.answers.answers_list,
  user: state.auth.user,
});

class VoiceGivenQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionOptionId: this.props.answers,
    };
    this.checkAnswers = this.checkAnswers.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.changeVote = this.changeVote.bind(this);
  }

  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render = template.bind(this);

  checkAnswers(id) {
    return !!this.state.questionOptionId.filter(item => item === id).length;
  }

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
      questionOptionId = questionOptionId.filter(item => item !== value);
    }
    this.setState({questionOptionId});
  }

  changeVote() {
    const answers2delete = this.props.answers.map(item => {
      const answer = this.props.answers_list.find(elem => elem.questionOptionId === item);
      return answer.id;
    });
    const answers2add = this.state.questionOptionId;
    store.dispatch({
      type: answers.ActionTypes.DELETE_REQUEST,
      payload: {
        clientId: this.props.user.id,
        answers2add,
        answers2delete
      }
    })
  }

}

export default connect(
  mapStateToProps,
)(VoiceGivenQuestions);