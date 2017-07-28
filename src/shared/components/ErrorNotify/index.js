import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import store from '../../../store';
import * as notify from '../../../redux/notify/actions';
import './error-notify.css';

const mapStateToProps = state => ({
  snackbarOpen: state.notify.open,
  message: state.notify.message,
});

class ErrorNotify extends Component {
  render() {
    return (
      <Snackbar
        className="error-message"
        open={this.props.snackbarOpen}
        message={this.props.message}
        onRequestClose={this.close}
      />
    )
  }

  close() {
    store.dispatch({
      type: notify.ActionTypes.CLOSE,
    });
  }
}

export default connect(
  mapStateToProps
)(ErrorNotify)
