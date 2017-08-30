import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import store from '../../../../../store';
import * as groups from "../../../../../redux/groups/actions";

const mapStateToProps = state => ({
  contacts: state.groups.contacts,
});

class CreateGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper
        className='home-list-item'
      >
        Create New Group
      </Paper>
    );
  }

}

export default connect(
  mapStateToProps
)(CreateGroup);