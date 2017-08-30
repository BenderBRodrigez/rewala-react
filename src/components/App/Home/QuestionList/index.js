import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';

const mapStateToProps = state => ({
  list: state.questions.list,
  list_type: state.questions.list_type,
  question_types: state.questions.question_types,
  finished_id: state.questions.finished_id,
  deleted_id: state.questions.deleted_id,
  voice_given_id: state.questions.voice_given_id,
});

class QuestionList extends Component {
  render() {
    return (
      <div>
        {this.props.list_type}
        {this.props.list
        .filter(item => item.id !== this.props.finished_id && item.id !== this.props.deleted_id && item.id !== this.props.voice_given_id)
        .map((item, i) => {
          const question_type = this.props.question_types.find(type => type.id === item.questionTypeId);
          const createdAt = new Date(item.createdAt);
          const deadline = new Date(createdAt).setSeconds(createdAt.getSeconds() + item.ttl);
          return <Question
            key={i}
            id={item.id}
            text={item.text}
            type={question_type ? question_type.name : ''}
            createdAt={createdAt.getTime()}
            deadline={deadline}
            answers={item.answerQuestionOptionIds}
          />
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(QuestionList);