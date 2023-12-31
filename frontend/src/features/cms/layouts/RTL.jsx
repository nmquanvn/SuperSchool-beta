import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

// core components
import Header from '@cmscomponents/Header/Header.jsx';
import Footer from '@cmscomponents/Footer/Footer.jsx';
import Sidebar from '@cmscomponents/Sidebar/Sidebar.jsx';

import rtlRoutes from '@cmsroutes/rtl.jsx';
import { sidebarLinks } from '@cmsroutes/rtl.jsx';

import rtlStyle from '@cmsassets/jss/material-dashboard-pro-react/layouts/rtlStyle.jsx';

import image from '@cmsassets/img/sidebar-2.jpg';
import logo from '@cmsassets/img/logo-white.svg';

const switchRoutes = (
  <Switch>
    {rtlRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class RTL extends React.Component {
  state = {
    mobileOpen: false,
    miniActive: false,
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      ' ' +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={sidebarLinks}
          logoText={'توقيت الإبداعية'}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="white"
          bgColor="blue"
          miniActive={this.state.miniActive}
          rtlActive
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            rtlActive
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={rtlRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer fluid rtlActive />
        </div>
      </div>
    );
  }
}

RTL.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(rtlStyle)(RTL);
