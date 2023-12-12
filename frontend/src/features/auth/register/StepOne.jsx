import React, { useState } from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { RegisterStepOneValidationSchema } from '@features/auth/base/yup';
import { Suggest, Input, Form, Button } from '@features/auth/base/components';
import userApi from '@api/userApi';

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
const SMesg = styled.span`
  color: #d20000;
  position: absolute;
  top: 30%;
`;
function StepOne({ onSetCurrentStep, onSetCurrentEmail }) {
  const [messageServer, setMessageServer] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleSubmit, errors, control } = useForm({
    validationSchema: RegisterStepOneValidationSchema,
  });
  const onSubmit = async (data) => {
    setMessageServer('');
    setLoading(true);
    try {
      const res = await userApi.checkEmail(data);
      if (res?.status) {
        onSetCurrentEmail(data.email);
        onSetCurrentStep((prev) => prev + 1);
      } else {
        setMessageServer(res?.message);
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Spin spinning={loading}>
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
            {messageServer && <SMesg>{messageServer}</SMesg>}
            <SPadding size="30px" />
            <SPadding size="30px" />
            <SButton htmlType="submit" block>
              Tiếp tục
            </SButton>
            <Suggest type="sign-in" />
            <SPadding size="32px" />
          </Col>
        </Row>
      </form>
    </Spin>
  );
}

export default StepOne;
