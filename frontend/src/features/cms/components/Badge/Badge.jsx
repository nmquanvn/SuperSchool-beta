import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

import badgeStyle from '@cmsassets/jss/material-dashboard-pro-react/components/badgeStyle.jsx';

function Badge({ ...props }) {
  const { classes, color, children } = props;
  return (
    <span className={classes.badge + ' ' + classes[color]}>{children}</span>
  );
}

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
};

export default withStyles(badgeStyle)(Badge);
