import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';
import ErrorNotify from '../../../../../shared/components/ErrorNotify';

const mapStateToProps = state => ({
  results: state.questions.results,
});

class AwaitingYourAnswerQuestions extends Component {
  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render() {
    return (
      <div>
        {this.props.type=='checkbox' && <List className="question-list">
          {this.props.results.length && this.props.results.map((item, i) =>
            <ListItem
              key={i}
              id={item.id}
              leftCheckbox={<Checkbox />}
              primaryText={item.text}
            />
          )}
        </List>}
        {this.props.type=='radio' && <RadioButtonGroup name="radioQuestion" className="question-list">
          {this.props.results.length && this.props.results.map((item, i) =>
            <RadioButton
              key={i}
              value={item.id}
              label={item.text}
              className="question-list-item"
            />
          )}
        </RadioButtonGroup>}
        <Divider />
        <div className="question-deadline">{moment(this.props.deadline).format('YYYY MM DD')}</div>
        <RaisedButton
          label="Vote"
          className="question-button"
          disabled={this.props.pending}
          onClick={this.vote}
        />
        <ErrorNotify />
      </div>
    );
  }

  vote() {
  }

}

export default connect(
  mapStateToProps,
)(AwaitingYourAnswerQuestions);