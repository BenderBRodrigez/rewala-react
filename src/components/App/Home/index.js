import React from 'react';
import {Redirect} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import {bindActionCreators} from 'redux';
import store from '../../../store';
import {connect} from 'react-redux';
import {CLOSE} from '../../../reducers/notify';
import {GET_LIST} from '../../../reducers/questions';
import NetService from '../../../net-service';
import './home.css';

const Home = props => {
  if (!props.token) return <Redirect to="/signin" />;
  return (
    <div>
      <Paper className='home-menu'>
        <Menu>
          <MenuItem primaryText="Your created questions" leftIcon={<ArrowForward />} onClick={getCreated} />
          <MenuItem primaryText="Voice given questions" leftIcon={<ArrowForward />} onClick={getVoiceGiven} />
          <MenuItem primaryText="Awaiting your answer questions" leftIcon={<ArrowForward />} onClick={getAwaiting} />
          <MenuItem primaryText="Question results" leftIcon={<ArrowForward />} onClick={getResults} />
          <MenuItem primaryText="Past questions" leftIcon={<ArrowForward />} onClick={getPast} />
        </Menu>
      </Paper>
      <div className='home-list'>
        {props.list.map((item, i) =>
          <Paper key={i} className='home-list-item'>
            {item.text}
          </Paper>
        )}
      </div>
      <Snackbar
        className="error-message"
        open={props.snackbarOpen}
        message={props.message}
        autoHideDuration={4000}
        onRequestClose={snackbarClose}
      />
    </div>
  );
};

const getCreated = () => {
  return getRequest('clients/get-questions')
}

const getVoiceGiven = () => {
  return getRequest('clients/get-voice-given-questions')
}

const getAwaiting = () => {
  return getRequest('clients/get-awaiting-questions')
}

const getResults = () => {
  return getRequest('clients/get-completed-questions')
}

const getPast = () => {
  return getRequest('clients/get-past-questions');
}

const getRequest = url => {
  return NetService.get(url)
  .then(response => {
    store.dispatch({
      type: GET_LIST,
      list: response.data.data
    })
  })
  .catch(error => console.log(error))
}

const snackbarClose = () => {
  store.dispatch({
    type: CLOSE,
  });
}

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token,
  snackbarOpen: state.notify.open,
  message: state.notify.message,
  list: state.questions.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Home
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
