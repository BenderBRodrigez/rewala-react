import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NetService from '../../../net-service';
import './home.css';

const Home = props => (
  <div>
    <p>home page</p>
    <RaisedButton
      label="test"
      onClick={test}
    />
    <p>{props.token}</p>
  </div>
);

const mapStateToProps = state => ({
  pending: state.auth.pending,
  token: state.auth.token
});

const test = () => {
  return NetService.get('questions?filter[where][clientId]=593fab235304b71beed351b6')
  .then(response => console.log(response.data))
  .catch(error => console.log(error))
}

const mapDispatchToProps = dispatch => bindActionCreators({
  test
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);