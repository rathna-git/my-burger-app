import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) =>
    ({showSideDrawer: !prevState.sideDrawer}));
  }

  render(){
    return(
    <Fragment>
        <Toolbar
            isAuth = { this.props.isAuth}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
            isAuth = { this.props.isAuth}
            opened = {this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
        <main className = {classes.Content}>
          {this.props.children}
        </main>
    </Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStatetoProps)(Layout);
