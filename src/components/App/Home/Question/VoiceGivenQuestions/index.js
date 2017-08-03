import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import store from '../../../../../store';
import * as questions from "../../../../../redux/questions/actions";
import {netService} from '../../../../../shared/services/net.service';

const mapStateToProps = state => ({
  results: state.questions.results,
});

class VoiceGivenQuestions extends Component {
  componentWillMount() {
    store.dispatch(netService.ajaxGet({
      url: `/questions/${this.props.id}/questionOptions`,
      dispatch_type: questions.ActionTypes.GET_RESULTS,
    }));
  }

  render() {
    return (
      <div>
        <List className="question-list">
          {this.props.results.length && this.props.results.map((item, i) =>
            <ListItem
              key={i}
              id={item.id}
              primaryText={item.text}
            />
          )}
        </List>
        <Divider />
        <div className="question-deadline">{moment(this.props.deadline).format('YYYY MM DD')}</div>
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(VoiceGivenQuestions);