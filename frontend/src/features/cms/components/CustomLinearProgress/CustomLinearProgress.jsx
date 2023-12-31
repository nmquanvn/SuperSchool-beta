import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import LinearProgress from 'material-ui/Progress/LinearProgress';

import customLinearProgressStyle from '@cmsassets/jss/material-dashboard-pro-react/components/customLinearProgressStyle.jsx';

function CustomLinearProgress({ ...props }) {
  const { classes, color, ...rest } = props;
  return (
    <LinearProgress
      {...rest}
      classes={{
        root: classes.root + ' ' + classes[color + 'Background'],
        bar: classes.bar + ' ' + classes[color],
      }}
    />
  );
}

CustomLinearProgress.defaultProps = {
  color: 'gray',
};

CustomLinearProgress.propTypes = {
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

export default withStyles(customLinearProgressStyle)(CustomLinearProgress);
