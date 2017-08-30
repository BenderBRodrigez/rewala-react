import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
});

class CreateQuestion extends Component {

  render() {
    return (
      <div>
        Create Question
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(CreateQuestion);