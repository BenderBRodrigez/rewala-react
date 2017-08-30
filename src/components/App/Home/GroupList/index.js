import React, {Component} from 'react';
import {connect} from 'react-redux';
import Group from './Group';

const mapStateToProps = state => ({
  groups: state.groups.list,
});

class GroupList extends Component {

  render() {
    return (
      <div>
        My Groups
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
}

export default connect(
  mapStateToProps
)(GroupList);