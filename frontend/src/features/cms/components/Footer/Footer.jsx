/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

import footerStyle from '@cmsassets/jss/material-dashboard-pro-react/components/footerStyle';

function Footer({ ...props }) {
  const { classes, fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  var anchor =
    classes.a +
    cx({
      [' ' + classes.whiteColor]: white,
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}></div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a className={anchor}>Super School</a>, study is a key to success
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
