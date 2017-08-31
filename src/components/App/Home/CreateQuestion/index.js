import {Component} from 'react';
import {connect} from 'react-redux';
import template from './create-question';

const mapStateToProps = state => ({
  question_types: state.questions.question_types,
  user: state.auth.user,
  group_id: state.groups.group_id,
});

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      answers: [],
      questionTypeId: this.props.question_types[0].id,
      deadline: null,
    };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.isMultiple = this.isMultiple.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
  }

  render = template.bind(this);

  handleQuestion(event) {
    this.setState({
      question: event.target.value
    })
  }

  handleAnswer(event) {
    this.setState({
      answer: event.target.value
    })
  }

  isMultiple(event, isInputChecked) {
    this.setState({
      questionTypeId: isInputChecked ? this.props.question_types[1].id : this.props.question_types[0].id
    })
  }

  addAnswer() {
    this.setState(prevState => ({
      answers: [...prevState.answers, this.state.answer],
      answer: '',
    }));
  }

  handleDate(event, date) {
    this.setState({
      deadline: date
    })
  }

  createQuestion() {
    const now = new Date();
    const ttl = Math.floor((this.state.deadline.getTime() - now.getTime()) / 1000);
    console.log(this.state, this.props.group_id, this.props.user.id, ttl)
  }
}

export default connect(
  mapStateToProps
)(CreateQuestion);