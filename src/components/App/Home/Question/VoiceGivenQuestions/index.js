import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
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
        <List className="created-list">
          {this.props.results.map((item, i) =>
            <ListItem
              key={i}
              id={item.id}
              primaryText={item.text}
            />
          )}
        </List>
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
)(VoiceGivenQuestions);