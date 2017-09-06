import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import store from '../../../store';
import * as notify from '../../../redux/notify/actions';

const mapStateToProps = state => ({
  snackbarOpen: state.notify.open,
  message: state.notify.message,
});

class Notify extends Component {
  render() {
    return (
      <Snackbar
        open={this.props.snackbarOpen}
        message={this.props.message}
        autoHideDuration={this.props.hideDuration || 10000}
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
)(Notify)
