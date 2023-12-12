import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

import typographyStyle from '@cmsassets/jss/material-dashboard-pro-react/components/typographyStyle.jsx';

function Info({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.infoText}>
      {children}
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Info);
