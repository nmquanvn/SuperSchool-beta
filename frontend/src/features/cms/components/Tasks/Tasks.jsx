import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableRow from 'material-ui/Table/TableRow';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

// material-ui-icons
import Edit from 'material-ui-icons/Edit';
import Close from 'material-ui-icons/Close';
import Check from 'material-ui-icons/Check';

import tasksStyle from '@cmsassets/jss/material-dashboard-pro-react/components/tasksStyle.jsx';

class Tasks extends React.Component {
  state = {
    checked: this.props.checkedIndexes,
  };
  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  render() {
    const { classes, tasksIndexes, tasks } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {tasksIndexes.map((value) => (
            <TableRow key={value} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  onClick={this.handleToggle(value)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                  }}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                {tasks[value]}
              </TableCell>
              <TableCell className={classes.tableActions}>
                <Tooltip
                  id="tooltip-top"
                  title="Edit Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + ' ' + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  id="tooltip-top-start"
                  title="Remove"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + ' ' + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  checkedIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
};

export default withStyles(tasksStyle)(Tasks);
