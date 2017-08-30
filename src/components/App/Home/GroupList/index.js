import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import store from '../../../../store';
import * as groups from "../../../../redux/groups/actions";
import Group from './Group';
import CreateGroup from './CreateGroup';

const mapStateToProps = state => ({
  groups: state.groups.list,
});

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCreateForm: false
    };
    this.getNewGroup = this.getNewGroup.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          My Groups
          <IconButton
            tooltip="create new group"
            onClick={this.getNewGroup}
          >
            <ContentAdd />
          </IconButton>
        </div>
        {this.state.displayCreateForm && <CreateGroup />}
        {this.props.groups.map((item, i) => (
          <Group
            key={i}
            id={item.id}
            name={item.name}
            memberList={item.memberIds}
          />
        ))}

      </div>
    );
  }

  getNewGroup() {
    this.setState(prevState => ({
      displayCreateForm: !prevState.displayCreateForm
    }));
  }
}

export default connect(
  mapStateToProps
)(GroupList);