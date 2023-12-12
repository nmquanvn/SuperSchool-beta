// ##############################
// // // Dashboard View styles
// #############################

import {
  successColor,
  tooltip,
} from '@cmsassets/jss/material-dashboard-pro-react.jsx';
import customSelectStyle from '@cmsassets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from '@cmsassets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
const dashboardStyle = {
  successText: {
    color: successColor,
  },
  upArrowCardCategory: {
    width: 14,
    height: 14,
  },
  underChartIcons: {
    width: '17px',
    height: '17px',
  },

  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  tooltip,
};

export default dashboardStyle;
