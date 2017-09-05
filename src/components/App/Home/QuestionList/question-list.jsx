import React from 'react';
import Paper from 'material-ui/Paper';

import './question-list.css';

export default function() {
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
