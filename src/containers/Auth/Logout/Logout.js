import React, { Component} from 'react';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount(){
    this.props.onlogout();
  }
  render() {
      return (
        <Redirect to='/' />
      );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onlogout: () => dispatch(actionCreators.logout())
  }
}

export default connect(null,mapDispatchtoProps)(Logout);
