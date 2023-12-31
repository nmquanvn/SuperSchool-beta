import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Snack from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

// material-ui-icons
import Close from 'material-ui-icons/Close';

import snackbarContentStyle from '@cmsassets/jss/material-dashboard-pro-react/components/snackbarContentStyle.jsx';

function Snackbar({ ...props }) {
  const { classes, message, color, close, icon, place, open } = props;
  var action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>,
    ];
  }
  const iconClasses = cx({
    [classes.icon]: classes.icon,
    [classes.infoIcon]: color === 'info',
    [classes.successIcon]: color === 'success',
    [classes.warningIcon]: color === 'warning',
    [classes.dangerIcon]: color === 'danger',
    [classes.primaryIcon]: color === 'primary',
    [classes.roseIcon]: color === 'rose',
  });
  return (
    <Snack
      classes={{
        anchorTopCenter: classes.top20,
        anchorTopRight: classes.top40,
        anchorTopLeft: classes.top40,
      }}
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1
            ? 'center'
            : 'right',
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={iconClasses} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      SnackbarContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color],
          message: classes.message,
        },
      }}
    />
  );
}

Snackbar.defaultProps = {
  color: 'info',
};

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'danger',
    'primary',
    'rose',
  ]),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  open: PropTypes.bool,
};

export default withStyles(snackbarContentStyle)(Snackbar);
