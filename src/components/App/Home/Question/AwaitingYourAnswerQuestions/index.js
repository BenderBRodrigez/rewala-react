import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';

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
        {this.props.type=='checkbox' && <List className="created-list">
          {this.props.results.map((item, i) =>
            <ListItem
              key={i}
              id={item.id}
              leftCheckbox={<Checkbox />}
              primaryText={item.text}
            />
          )}
        </List>}
        {this.props.type=='radio' && <RadioButtonGroup name="oneOption" className="created-list">
          {this.props.results.map((item, i) =>
            <RadioButton
              key={i}
              value={item.id}
              label={item.text}
            />
          )}
        </RadioButtonGroup>}
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(AwaitingYourAnswerQuestions);