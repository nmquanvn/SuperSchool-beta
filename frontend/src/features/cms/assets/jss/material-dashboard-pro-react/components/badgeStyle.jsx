// ##############################
// // // Badge component styles
// #############################

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
} from '@cmsassets/jss/material-dashboard-pro-react.jsx';

const badgeStyle = {
  badge: {
    borderRadius: '12px',
    padding: '5px 12px',
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: '1',
    color: '#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    display: 'inline',
  },
  primary: {
    backgroundColor: primaryColor,
  },
  warning: {
    backgroundColor: warningColor,
  },
  danger: {
    backgroundColor: dangerColor,
  },
  success: {
    backgroundColor: successColor,
  },
  info: {
    backgroundColor: infoColor,
  },
  rose: {
    backgroundColor: roseColor,
  },
  gray: {
    backgroundColor: grayColor,
  },
};

export default badgeStyle;
