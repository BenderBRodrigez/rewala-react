import {Component} from 'react';
import store from '../../../store';
import {connect} from 'react-redux';
import * as auth from '../../../redux/auth/actions';
import * as groups from "../../../redux/groups/actions";
import {netService} from '../../../shared/services/net.service';
import template from './home.jsx';
import './home.css';

const getUser = token => {
  store.dispatch(netService.ajaxGet({
    url: `/tokens/${token}/user`,
    dispatch_type: auth.ActionTypes.GET_USER
  }))
};

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.getGroups = this.getGroups.bind(this);
    if (this.props.token) getUser(this.props.token);
  }

  render = template.bind(this);

  getGroups() {
    store.dispatch({
      type: groups.ActionTypes.ACTIVATE,
      group_id: '',
    })
  }

}

export default connect(
  mapStateToProps
)(Home);
