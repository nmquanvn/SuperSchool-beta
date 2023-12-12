import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
// material-ui components
import InputLabel from 'material-ui/Input/InputLabel';
import withStyles from 'material-ui/styles/withStyles';
// material-ui-icons
import PermIdentity from 'material-ui-icons/PermIdentity';
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from 'react-datetime';
//momentjs
import moment from 'moment';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import RegularCard from '@cmscomponents/Cards/RegularCard.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import Clearfix from '@cmscomponents/Clearfix/Clearfix.jsx';
import ImageUpload from '@cmscomponents/CustomUpload/ImageUpload.jsx';
// style for this view
import validationFormsStyle from '@cmsassets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx';
function UserProfile({ ...props }) {
  const { handleSubmit, register, control } = useForm();
  const info = {
    username: 'Raykad552',
    fullname: 'Nguyễn Minh Quân',
    email: 'nmquanvn@gmail.com',
    phonenumber: 'Không thay đổi',
    dob: 'Không thay đổi',
    reg: 'Không thay đổi',
    group: '',
    role: '',
    description: 'Chưa có mô tả',
  };
  useEffect(() => {}, 200);
  const [state, setState] = useState({
    ...info,
    //Form Input
    // type validation
    required: '',
    requiredState: '',
    typeEmail: '',
    typeEmailState: '',
    number: '',
    numberState: '',
    url: '',
    urlState: '',
    equalTo: '',
    whichEqualTo: '',
    equalToState: '',
    // range validation
    minLength: '',
    minLengthState: '',
    maxLength: '',
    maxLengthState: '',
    range: '',
    rangeState: '',
    minValue: '',
    minValueState: '',
    maxValue: '',
    maxValueState: '',
  });
  useEffect(() => {
    setTimeout(() => {
      const fetch_data_backend = {
        username: 'Raykad552',
        fullname: 'Nguyễn Minh Quân',
        email: 'nmquanvn@gmail.com',
        phonenumber: '09056251563',
        dob: '25/12/1998',
        reg: '08/02/2021',
        group: 'Học viên',
        description:
          "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...",
      };
    }, 300);
  }, []);

  const isValidated = () => {
    if (
      this.state.usernameState === 'success' &&
      this.state.fullnameState === 'success' &&
      this.state.emailState === 'success'
    ) {
      return true;
    } else {
      if (state.usernameState !== 'success') {
        setState({ ...state, usernameState: 'error' });
      }
      if (state.fullnameState !== 'success') {
        setState({ ...state, fullnameState: 'error' });
      }
      if (state.emailState !== 'success') {
        setState({ ...state, emailState: 'error' });
      }
    }
    return false;
  };
  const verifyEmail = function (value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  const verifyLength = function (value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const verifyName = function (value) {
    var nameRex = new RegExp('/^([^0-9]*)$/');
    if (nameRex.test(value)) {
      return true;
    }
    return false;
  };
  const verifyNumber = function (value) {
    var numberRex = new RegExp('^[0-9]+$');
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const verifyUrl = function (value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  const compare = function (string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  };
  const change = function (
    itemstate,
    event,
    stateName,
    type,
    stateNameEqualTo,
    maxValue
  ) {
    switch (type) {
      case 'name':
        if (verifyName(event.target.value)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'email':
        if (verifyEmail(event.target.value)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'password':
        if (verifyLength(event.target.value, 1)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'equalTo':
        if (compare(event.target.value, state[stateNameEqualTo])) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'checkbox':
        if (event.target.checked) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: '',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'number':
        if (verifyNumber(event.target.value)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'length':
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'max-length':
        if (!verifyLength(event.target.value, stateNameEqualTo + 1)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'url':
        if (verifyUrl(event.target.value)) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'min-value':
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'max-value':
        if (
          verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      case 'range':
        if (
          verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          setState({
            ...state,
            [itemstate]: event.target.value,
            [stateName + 'State']: 'success',
          });
        } else {
          setState({ ...state, [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
  };
  return (
    <form>
      <div>
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={8}>
            <IconCard
              icon={PermIdentity}
              iconColor="rose"
              title="Cập nhật thông tin cá nhân - "
              category="Complete your profile"
              content={
                <div>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Super School ©Ltd. Co"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          defaultValue: state.username,
                          onInput: (e) =>
                            setState({ ...state, username: e.target.value }),
                          // setState({
                          //   ...state,
                          //   username: e.target.value,
                          // }),
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        name="email"
                        labelText="Địa chỉ Email (không thay đổi)"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: state.email,
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Họ tên"
                        id="fullname"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          defaultValue: state.fullname,
                          onInput: (e) =>
                            setState({ ...state, fullname: e.target.value }),
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <Controller
                        name="phonenumber"
                        as={CustomInput}
                        control={control}
                        success={state.minLengthState === 'success'}
                        error={state.minLengthState === 'error'}
                        labelText="SDT"
                        id="phonenumber"
                        ref={register}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                          defaultValue: state.phonenumber,
                          onChange: function (event) {
                            change(
                              'phonenumber',
                              event,
                              'minLength',
                              'length',
                              9
                            );
                          },
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <br />
                      <Datetime
                        id="dob"
                        timeFormat={false}
                        onChange={(date) => {
                          setState({
                            ...state,
                            dob: moment(date).format('DD/MM/YYYY').toString(),
                          });
                        }}
                        inputProps={{
                          disabled: true,
                          placeholder: 'Chọn ngày sinh',
                          value: state.dob,
                          onChange: (e) => setState({ dob: e.target.value }),
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Ngày đăng ký"
                        name="reg"
                        id="reg"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: info.reg,
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: '#AAAAAA' }}>
                        Giới thiệu về bản thân
                      </InputLabel>
                      <CustomInput
                        labelText={info.description}
                        id="description"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                        }}
                      />
                    </ItemGrid>
                  </GridContainer>
                  <Button onClick={isValidated} color="rose" right>
                    Xác nhận
                  </Button>
                  <Clearfix />
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              content={
                <div>
                  <br />
                  <br />
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={3} />
                    <ItemGrid xs={12} sm={12} md={6}>
                      <ImageUpload
                        avatar
                        oldimage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/250px-Brad_Pitt_2019_by_Glenn_Francis.jpg"
                      />
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <p>
                        Ảnh đại diện không chỉ giúp mọi người nhận ra bạn trong
                        hàng triệu người đang sử dụng trang web mà còn biểu thị
                        được cá tính riêng của mình với các bức ảnh đầy thu hút
                        & nhiều màu sắc.
                      </p>
                    </ItemGrid>
                  </GridContainer>
                </div>
              }
            ></RegularCard>
          </ItemGrid>
        </GridContainer>
      </div>
    </form>
  );
}

export default withStyles(validationFormsStyle)(UserProfile);
