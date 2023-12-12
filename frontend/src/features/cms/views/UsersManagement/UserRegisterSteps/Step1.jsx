import React from 'react';

// material-ui-icons
import Face from 'material-ui-icons/Face';
import RecordVoiceOver from 'material-ui-icons/RecordVoiceOver';
import Email from 'material-ui-icons/Email';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import InputAdornment from 'material-ui/Input/InputAdornment';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import PictureUpload from '@cmscomponents/CustomUpload/PictureUpload.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
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
  inputAdornment: {
    top: '3px',
    position: 'relative',
  },
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameState: '',
      fullname: '',
      fullnameState: '',
      email: '',
      emailState: '',
      password: '',
      passwordState: '',
    };
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.usernameState === 'success' &&
      this.state.fullnameState === 'success' &&
      this.state.emailState === 'success'
    ) {
      let { setUser } = this.context;
      setUser({
        username: this.state.username,
        fullname: this.state.fullname,
        email: this.state.email,
      });
      return true;
    } else {
      if (this.state.usernameState !== 'success') {
        this.setState({ usernameState: 'error' });
      }
      if (this.state.fullnameState !== 'success') {
        this.setState({ fullnameState: 'error' });
      }
      if (this.state.emailState !== 'success') {
        this.setState({ emailState: 'error' });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    console.log(this.context);
    return (
      <GridContainer justify="center">
        <ItemGrid xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Vui lòng nhập thông tin tài khoản và email
          </h4>
        </ItemGrid>
        <ItemGrid xs={12} sm={4}>
          <PictureUpload />
        </ItemGrid>
        <ItemGrid xs={12} sm={6}>
          <CustomInput
            success={this.state.usernameState === 'success'}
            error={this.state.usernameState === 'error'}
            labelText={
              <span>
                Username: <small>(bắt buộc)</small>
              </span>
            }
            id="username"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, 'username', 'length', 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            success={this.state.fullnameState === 'success'}
            error={this.state.fullnameState === 'error'}
            labelText={
              <span>
                Họ tên <small>(bắt buộc)</small>
              </span>
            }
            id="fullname"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, 'fullname', 'length', 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.emailState === 'success'}
            error={this.state.emailState === 'error'}
            labelText={
              <span>
                Email <small>(bắt buộc)</small>
              </span>
            }
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, 'email', 'email'),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}
Step1.contextType = UserContext;
export default withStyles(style)(Step1);
