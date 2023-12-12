import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Row, Col, Spin, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Input, Form, Button } from '@features/auth/base/components';
import { RegisterStepThreeValidationSchema } from '@features/auth/base/yup';
import userApi from '@api/userApi';
import { uploadService } from '@utils/uploadService';

const { FormItem } = Form;

const SPadding = styled.div`
  padding-top: ${(props) => props.size};
`;
const SButton = styled(Button)`
  font-weight: bold;
  border-radius: 6px;
  border: none;
  width: 99.8%;
  margin-left: 1px;
  height: 44px;
  color: #ffffff;
  @media (max-width: 414px) {
    padding-top: ${(<SPadding />)};
  }
`;

function StepThree({ onChangeTitle, currentEmail }) {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState('');
  const { handleSubmit, errors, control } = useForm({
    validationSchema: RegisterStepThreeValidationSchema,
  });
  const uploadImage = async (options) => {
    const { file, onSuccess, onError } = options;
    const link = await uploadService('image', file);
    if (link) {
      onSuccess(file);
      setPicture(link);
    } else {
      onError(file);
    }
  };
  const onSubmit = async (data) => {
    if (!picture) return message.error('Chưa upload ảnh đại diện');
    setLoading(true);
    const dataToSend = {
      username: data?.username,
      password: data?.password,
      email: currentEmail,
      picture
    };
    try {
      const res = await userApi.register(dataToSend);
      if (res.status) {
        localStorage.setItem('token', res?.access_token);
        localStorage.setItem('refresh_token', res?.refresh_token);
        window.location.href = '/';
      }
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };
  useEffect(() => {
    onChangeTitle('Đăng ký thông tin người dùng');
  }, [onChangeTitle]);
  return (
    <Spin spinning={loading}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row style={{ maxWidth: 400 }} className="mx-auto">
          <Col className="w-100">
            <SPadding size="30px" />
            <FormItem
              as={<Input />}
              label="Tên người dùng"
              name="username"
              control={control}
              error={errors.username?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <FormItem
              as={<Input.Password />}
              label="Mật khẩu"
              name="password"
              control={control}
              error={errors.password?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <FormItem
              as={<Input.Password />}
              label="Nhập lại mật khẩu"
              name="repassword"
              control={control}
              error={errors.repassword?.message}
              defaultValue=""
            />
            <SPadding size="30px" />
            <div>Upload ảnh đại diện</div>
            <Upload
              accept="image/*"
              customRequest={uploadImage}
              maxCount={1}
              onRemove={() => setPicture('')}
            >
              <Button icon={<UploadOutlined />}>Upload image</Button>
            </Upload>
            <SPadding size="30px" />
            <SButton htmlType="submit" block>
              Hoàn thành
            </SButton>
            <SPadding size="32px" />
          </Col>
        </Row>
      </form>
    </Spin>
  );
}

export default StepThree;
