import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui components
import withStyles from 'material-ui/styles/withStyles';

import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
// material-ui-icons
// core components

import headerLinksStyle from '@cmsassets/jss/material-dashboard-pro-react/components/headerLinksStyle';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive,
    });
    return (
      <div className={wrapper}>
        <Link to="/">
          <IconButton
            color="inherit"
            aria-label=""
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            classes={{
              label: 'Về trang chủ',
            }}
          >
            <HomeIcon />
          </IconButton>
        </Link>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
};

export default withStyles(headerLinksStyle)(HeaderLinks);
