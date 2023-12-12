import React from 'react';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Checkbox from 'material-ui/Checkbox';

// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';

import customSelectStyle from '@cmsassets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from '@cmsassets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
import UserContext from '../UserContext';
const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: false,
      teacher: false,
      admin: false,
    };
  }
  handleChange = (name) => (event) => {
    let newState = { ...this.state };
    Object.keys(newState).forEach((v) => (newState[v] = false));
    this.setState({ ...newState, [name]: event.target.checked });
  };
  isValidated() {
    if (this.state.student || this.state.teacher || this.state.admin) {
      let { user, setUser } = this.context;
      if (this.state.student) {
        setUser({ ...user, usergroupid: 2 });
        return true;
      }

      if (this.state.admin) {
        setUser({ ...user, usergroupid: 1 });
        return true;
      }
      if (this.state.teacher) {
        setUser({ ...user, usergroupid: 3 });
        return true;
      }
    } else return false;
  }
  render() {
    const { classes } = this.props;
    console.log(this.context);
    return (
      <div>
        <h4 className={classes.infoText}>Chọn loại tài khoản</h4>
        <GridContainer justify="center">
          <ItemGrid xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <ItemGrid xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    checked={this.state.student ? true : false}
                    tabIndex={-1}
                    onClick={this.handleChange('student')}
                    checkedIcon={
                      <i
                        className={'fas fa-users ' + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={'fas fa-users ' + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      default: classes.iconCheckbox,
                    }}
                  />
                  <h6>Học Viên</h6>
                </div>
              </ItemGrid>
              <ItemGrid xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    checked={this.state.teacher ? true : false}
                    tabIndex={-1}
                    onClick={this.handleChange('teacher')}
                    checkedIcon={
                      <i
                        className={
                          'fas fa-user-graduate ' + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          'fas fa-user-graduate ' + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      default: classes.iconCheckbox,
                    }}
                  />
                  <h6>Giáo Viên</h6>
                </div>
              </ItemGrid>
              <ItemGrid xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    checked={this.state.admin ? true : false}
                    tabIndex={-1}
                    onClick={this.handleChange('admin')}
                    checkedIcon={
                      <i
                        className={
                          'fas fa-user-tie ' + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          'fas fa-user-tie ' + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      default: classes.iconCheckbox,
                    }}
                  />
                  <h6>Quản trị viên</h6>
                </div>
              </ItemGrid>
            </GridContainer>
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}
Step2.contextType = UserContext;
export default withStyles(style)(Step2);
