import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as groups from "../../../../../redux/groups/actions";
import template from './group';

const mapStateToProps = state => ({
  groups: state.groups.list,
  group_id: state.groups.group_id,
  contacts: state.groups.contacts,
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.activateGroup = this.activateGroup.bind(this);
  }

  render = template.bind(this);

  shouldComponentUpdate(nextProps) {
    return nextProps.group_id === this.props.group_id ||
      nextProps.group_id === nextProps.id ||
      this.props.group_id === this.props.id;
  }

  activateGroup() {
    store.dispatch({
      type: groups.ActionTypes.ACTIVATE,
      group_id: this.props.id,
    })
  }

}

export default connect(
  mapStateToProps,
)(Question);