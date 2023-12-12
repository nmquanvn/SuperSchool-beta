import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

import typographyStyle from '@cmsassets/jss/material-dashboard-pro-react/components/typographyStyle.jsx';

function Danger({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.dangerText}>
      {children}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Danger);
