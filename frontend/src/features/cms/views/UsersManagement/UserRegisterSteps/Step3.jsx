import React from 'react';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import InputAdornment from 'material-ui/Input/InputAdornment';

import SweetAlert from 'react-bootstrap-sweetalert';
//material Icon
import HomeIcon from 'material-ui-icons/Home';
import PhoneIcon from 'material-ui-icons/Phone';
import FingerprintIcon from 'material-ui-icons/Fingerprint';
// core components
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import userApi from '@api/userApi';
import customSelectStyle from '@cmsassets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
import { InputLabel } from 'material-ui';
import UserContext from '../UserContext';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  ...customSelectStyle,
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false,
      address: '',
      phonenumber: '',
      phonenumberState: '',
      identity: '',
      identityState: '',
      url: 'www.superschool.com',
      urlState: 'success',
    };
  }
  hideAlert() {
    this.setState({
      alert: null,
    });
  }
  successAlert() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Đăng ký hoàn tất!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + ' ' + this.props.classes.success
          }
        >
          Mật khẩu sẽ được gửi qua Email trong vài giây!
        </SweetAlert>
      ),
    });
  }
  handleSimple = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  isValidated() {
    if (
      this.state.phonenumberState === 'success' &&
      this.state.identityState === 'success' &&
      this.state.urlState === 'success'
    ) {
      let { user } = this.context;
      console.log(user);
      userApi
        .adminCreateAccount(user)
        .then((data) => {
          if (data.message)
            alert('Không thể đăng ký tài khoản, vui lòng kiểm tra lại Email');
          else if (data) this.successAlert();
        })
        .catch((err) => alert('Không thể đăng ký tài khoản'));
      return true;
    } else {
      if (this.state.phonenumberState !== 'success') {
        this.setState({ phonenumberState: 'error' });
      }
      if (this.state.identityState !== 'success') {
        this.setState({ fullnameState: 'error' });
      }

      if (this.state.urlState !== 'success') {
        this.setState({ urlState: 'error' });
      }
      if (this.state.identityState !== 'success') {
        this.setState({ identityState: 'error' });
      }
    }
    return false;
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  verifyNumber(value) {
    var numberRex = new RegExp('^[0-9]+$');
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case 'checkbox':
        if (event.target.checked) {
          this.setState({ [stateName + 'State']: '' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'number':
        if (this.verifyNumber(event.target.value)) {
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
      case 'max-length':
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'url':
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'range':
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
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
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        {this.state.alert}
        <ItemGrid xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Nhập các thông tin cá nhân để hoàn tất
          </h4>
        </ItemGrid>
        <ItemGrid xs={12} sm={7}>
          <CustomInput
            labelText="Địa chỉ"
            id="streetname"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <HomeIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={3}>
          <CustomInput
            success={this.state.identityState === 'success'}
            error={this.state.identityState === 'error'}
            labelText={<span>Căn cước công dân</span>}
            id="identify"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => this.change(e, 'identity', 'number'),
              type: 'text',
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <FingerprintIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={5}>
          <CustomInput
            success={this.state.phonenumberState === 'success'}
            error={this.state.phonenumberState === 'error'}
            labelText={
              <span>
                Số điện thoại <small>(bắt buộc)</small>
              </span>
            }
            id="phonenumber"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => this.change(e, 'phonenumber', 'number'),
              type: 'text',
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <PhoneIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={5}>
          <CustomInput
            success={this.state.urlState === 'success'}
            error={this.state.urlState === 'error'}
            labelText={
              <span>
                Đường dẫn trang web <small>(nếu có)</small>
              </span>
            }
            id="url"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              defaultValue: this.state.url,
              type: 'text',
              onChange: (e) => this.change(e, 'url', 'url'),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12} lg={10}>
          <InputLabel>
            Mật khẩu sẽ tự động tạo sau khi đăng ký hoàn tất
          </InputLabel>
        </ItemGrid>
      </GridContainer>
    );
  }
}
Step3.contextType = UserContext;
export default withStyles(style)(Step3);
