import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import store from '../../../../store';
import * as questions from "../../../../redux/questions/actions";

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  active_id: state.questions.active_id,
});

class PastQuestions extends Component {
  constructor(props) {
    super(props);
    this.activateQuestion = this.activateQuestion.bind(this);
  }

  render() {
    return (
      <Paper
        className='home-list-item'
        onClick={this.activateQuestion}
      >
        {this.props.text}
        {this.props.active_id==this.props.id && <div>blablabla</div>}
      </Paper>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.active_id == nextProps.id || this.props.active_id == this.props.id;
  }

  activateQuestion(event) {
    store.dispatch({
      type: questions.ActionTypes.ACTIVATE,
      active_id: this.props.id,
    })
  }

}

export default connect(
  mapStateToProps,
)(PastQuestions);