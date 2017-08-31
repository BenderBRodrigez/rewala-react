import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../../../../store';
import * as groups from "../../../../../redux/groups/actions";
import template from './create-group';
import {netService} from "../../../../../shared/services/net.service";

const mapStateToProps = state => ({
  contacts: state.groups.contacts,
  user: state.auth.user,
});

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      members: [],
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
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

  handleName(event) {
    this.setState({
      name: event.target.value
    })
  }

  checkChange(event, isChecked) {
    const value = event.target.value;
    let members = this.state.members || [];
    if (isChecked) {
      members.push(value);
    } else {
      members = members.filter(item => item !== value);
    }
    this.setState({members});
  }

  findContact() {
    store.dispatch(netService.ajaxGet({
      url: `/clients/find-by-email?email=${this.state.email}`,
      dispatch_type: groups.ActionTypes.FIND_CONTACT,
    }));
  }

  createGroup() {
    store.dispatch({
      type: groups.ActionTypes.CREATE_REQUEST,
      payload: {
        name: this.state.name,
        memberIds: this.state.members,
        clientId: this.props.user.id,
      }
    });
  }
}

export default connect(
  mapStateToProps
)(CreateGroup);