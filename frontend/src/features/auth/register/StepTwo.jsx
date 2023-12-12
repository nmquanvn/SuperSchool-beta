import {
  Button,
  InputOTP,
  Padding,
  ShareComp,
} from '@features/auth/base/components';
import { Col, Row, Spin, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as Yup from 'yup';
import userApi from '@api/userApi';

const { SErrMsg, SResend } = ShareComp;

const SPadding = styled.div`
  margin-top: ${(props) => props.size};
`;
const SMesg = styled.span`
  color: #d20000;
  position: relative;
  top: 30%;
`;
const SMsg = styled.div`
  text-align: justify;
  font-size: 16px;
  @media (max-width: 1024px) {
    margin-left: auto;
  }
  @media (max-width: 414px) {
    margin-left: auto;
  }
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
const OTPValidationSchema = Yup.object().shape({
  otp: Yup.string().length(4, 'Vui lòng nhập mã OTP gồm 4 số'),
});

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Gửi OTP thành công',
    description: 'Hãy kiểm tra mã OTP trong email của bạn',
  });
};

function StepTwo({ onChangeTitle, onSetCurrentStep, currentEmail }) {
  const [messageServer, setMessageServer] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: OTPValidationSchema,
  });
  useEffect(() => {
    onChangeTitle('Xác thực OTP');
  }, [onChangeTitle]);
  const onSubmit = async (data) => {
    setLoading(true);
    const dataToSend = {
      otp: data?.otp,
      email: currentEmail,
    };
    try {
      const res = await userApi.confirmOTP(dataToSend);
      if (res?.status) {
        onSetCurrentStep((prev) => prev + 1);
      } else {
        setMessageServer('Mã OTP không chính xác');
      }
    } catch (error) {
      setMessageServer('Xác thực OTP thất bại');
    }
    setLoading(false);
  };
  const handleResendOTP = async () => {
    setResendLoading(true);
    setMessageServer('');
    const emailToSend = { email: currentEmail };
    try {
      const res = await userApi.checkEmail(emailToSend);
      if (res?.status) {
        openNotificationWithIcon('success');
      } else {
        setMessageServer(res?.message);
      }
    } catch (error) {}
    setResendLoading(false);
  };
  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: 400 }} className="mx-auto">
        <SPadding size="24px" />
        <Row>
          <Col>
            <SMsg>
              SuperSchool đã gửi mã OTP qua địa chỉ email: {currentEmail} của
              bạn. Hãy dùng mã này để xác nhận việc đăng ký.
            </SMsg>
          </Col>
        </Row>
        <Row>
          <Col>
            <Padding size="4px 0px 0px 0px" />
            <div className="text-center"></div>
          </Col>
        </Row>
        <SPadding size="40px" />
        <Row>
          <Col xs={24} md={24} className="d-flex justify-content-center">
            <Padding size="20px 0px 0px 0px" xs={24} md={24}>
              <InputOTP register={register} name="otp" />
            </Padding>
            <SErrMsg>{errors.otp?.message}</SErrMsg>
          </Col>
        </Row>
        <Row>{messageServer !== '' && <SMesg>{messageServer}</SMesg>}</Row>
        <SPadding size="54px" />
        <Row>
          <Col className="w-100">
            <SButton
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
              block
              id="confirm-button"
            >
              Xác nhận
            </SButton>
            <Spin spinning={resendLoading}>
              <SResend onClick={handleResendOTP} className="mt-3">
                Gửi lại OTP
              </SResend>
            </Spin>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

export default StepTwo;
