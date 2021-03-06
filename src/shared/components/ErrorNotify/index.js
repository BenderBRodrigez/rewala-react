import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import store from '../../../store';
import * as notify from '../../../redux/notify/actions';
import './error-notify.css';

const mapStateToProps = state => ({
  snackbarOpen: state.notify.error_open,
  message: state.notify.error_message,
});

class ErrorNotify extends Component {
  render() {
    return (
      <Snackbar
        className="error-message"
        open={this.props.snackbarOpen}
        message={this.props.message}
        autoHideDuration={this.props.hideDuration || 5000}
        onRequestClose={this.close}
      />
    )
  }

  close() {
    store.dispatch({
      type: notify.ActionTypes.ERROR_CLOSE,
    });
  }
}

export default connect(
  mapStateToProps
)(ErrorNotify)
