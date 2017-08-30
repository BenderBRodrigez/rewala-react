import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
});

class Settings extends Component {

  render() {
    return (
      <div>
        Settings
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Settings);