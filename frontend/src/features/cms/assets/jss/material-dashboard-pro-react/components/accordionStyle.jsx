// ##############################
// // // Accordion component style
// #############################

import { roseColor } from '@cmsassets/jss/material-dashboard-pro-react.jsx';

const accordionStyle = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  expansionPanel: {
    boxShadow: 'none',
    '&:before': {
      display: 'none !important',
    },
  },
  expansionPanelExpanded: {
    margin: '0',
  },
  expansionPanelSummary: {
    minHeight: 'auto !important',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #ddd',
    padding: '25px 10px 5px 0px',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    color: '#3C4858',
    '&:hover': {
      color: roseColor,
    },
  },
  expansionPanelSummaryExpaned: {
    color: roseColor,
  },
  expansionPanelSummaryContent: {
    margin: '0',
  },
  expansionPanelSummaryExpandIcon: {
    [theme.breakpoints.up('md')]: {
      top: 'auto !important',
    },
    transform: 'rotate(0deg)',
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      top: '10px !important',
    },
  },
  expansionPanelSummaryExpandIconExpanded: {
    [theme.breakpoints.up('md')]: {
      top: 'auto !important',
    },
    transform: 'rotate(180deg)',
    [theme.breakpoints.down('sm')]: {
      top: '10px !important',
    },
  },
  title: {
    fontSize: '15px',
    fontWeight: 'bolder',
    marginTop: '0',
    marginBottom: '0',
    color: 'inherit',
  },
  expansionPanelDetails: {
    padding: '15px 0px 5px',
  },
});

export default accordionStyle;
