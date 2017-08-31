import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as groups from "../../../../../redux/groups/actions";
import template from './create-group';
import {netService} from "../../../../../shared/services/net.service";

const mapStateToProps = state => ({
  contacts: state.groups.contacts,
});

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.findContact = this.findContact.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  render = template.bind(this);

  handleEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  checkChange() {

  }

  findContact() {
    store.dispatch(netService.ajaxGet({
      url: `/clients/find-by-email?email=${this.state.email}`,
      dispatch_type: groups.ActionTypes.FIND,
    }));
  }

  createGroup() {

  }
}

export default connect(
  mapStateToProps
)(CreateGroup);