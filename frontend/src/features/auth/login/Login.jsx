import React, { useState } from 'react';
import AuthLayout from '../base/layout';
import RedirectHome from '@features/auth/base/use-home';
import { useForm } from 'react-hook-form';
import { Row, Col, Divider, Spin, message } from 'antd';
import styled from 'styled-components';
import { LogInEndValSchemaOne } from '@features/auth/base/yup';
import LoginGG from './LoginGG';
import { Suggest, Input, Form, Button } from '@features/auth/base/components';
import userApi from '@api/userApi';
const { FormItem } = Form;

const SPadding = styled.div`
  padding-top: ${(props) => props.size};
`;
const SBottom = styled.div`
  div {
    margin-bottom: 0px !important;
  }
`;
const SDivider = styled(Divider)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: normal;
  margin: 0px 0px !important;
  &::before,
  &::after {
    border-color: #ffffff;
  }
  span {
    padding: 0 4px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: normal;
  }
`;
const SButton = styled(Button)`
  font-weight: bold;
  border-radius: 6px;
`;

function Login() {
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const { handleSubmit, control, errors } = useForm({
    validationSchema: LogInEndValSchemaOne,
  });
  const onSubmit = async (data) => {
    setLoginLoading(true);
    try {
      const res = await userApi.login(data);
      if (res?.status) {
        localStorage.setItem('token', res?.access_token);
        localStorage.setItem('refresh_token', res?.refresh_token);
        window.location.href = '/';
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error('Đăng nhập thất baij');
      throw error;
    }
    setLoginLoading(false);
  };
  return (
    <AuthLayout>
      <Spin spinning={loading}>
        <RedirectHome />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Row style={{ maxWidth: 400 }} className="mx-auto">
            <Col className="w-100">
              <FormItem
                as={<Input />}
                label="Email"
                name="email"
                control={control}
                error={errors.email?.message}
                defaultValue=""
              />
              <SPadding size="30px" />
              <SBottom>
                <FormItem
                  as={<Input.Password />}
                  label="Mật khẩu"
                  name="password"
                  control={control}
                  error={errors.password?.message}
                  defaultValue=""
                />
              </SBottom>
              <Row></Row>
              <SPadding size="32px" />
              <SButton htmlType="submit" block loading={loginLoading}>
                Hoàn tất
              </SButton>
              <Suggest type="sign-up" />
              <SPadding size="32px" />
              <SDivider>Hoặc</SDivider>
              <SPadding size="32px" />
              <div className="w-100 d-flex justify-content-center">
                <LoginGG onSetLoading={setLoading}>
                  Đăng nhập tài khoản bằng Google
                </LoginGG>
              </div>
              <SPadding size="20px" />
            </Col>
          </Row>
        </form>
      </Spin>
    </AuthLayout>
  );
}

export default Login;
