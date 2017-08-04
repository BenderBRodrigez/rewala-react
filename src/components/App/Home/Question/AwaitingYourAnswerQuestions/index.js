import {Observable} from 'rxjs';
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
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render = template.bind(this);

  radioChange(event, value) {
    this.setState({
      createQuery: [
        {
          clientId: this.props.user.id,
          questionOptionId: value,
        }
      ]
    })
  }

  checkChange(event, isChecked) {
    // console.log(event.target.value, isChecked)
    let state = this.state ? this.state.createQuery : [];
    if (isChecked) {
      state.push({
        clientId: this.props.user.id,
        questionOptionId: event.target.value,
      });
    } else {
      state = state.filter(item => item.questionOptionId != event.target.value)
    }
    this.setState({createQuery: state});
  }

  vote() {
    // console.log(this.state.createQuery)
    //
    // let arr$ = this.state.createQuery.map(res => Observable.of(res));
    //
    // Observable.zip(...arr$)
    // .map(arr => {
    //   return arr;
    // })
    // .subscribe()

    // store.dispatch({
    //   type: answers.ActionTypes.CREATE_REQUEST,
    //   body: this.state
    // })
  }

}

export default connect(
  mapStateToProps,
)(AwaitingYourAnswerQuestions);