import React, { useState } from 'react';
import OTPInput from 'otp-input-react';
import styled from 'styled-components';

const SWrapper = styled.div`
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
  display: flex;
  justify-content: space-between;
  display: table !important;
  input {
    background: transparent;
    width: 50px !important;
    border: none;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 0%;
    border-bottom: 1.25px solid #181818 !important;
    vertical-align: middle;
    position: relative;
    @media (max-width: 1024px) {
      width: 40px !important;
    }
    @media (max-width: 768px) {
      width: 26px !important;
    }
    @media (max-width: 414px) {
      width: 43px !important;
    }
    @media (max-width: 375px) {
      width: 38px !important;
    }
    @media (max-width: 360px) {
      width: 35px !important;
    }
    @media (max-width: 320px) {
      width: 30px !important;
    }
  }
  div {
    margin: 0px auto;
  }
`;

const InputOTP = ({ size, register, name }) => {
  const [value, setValue] = useState('');
  const onChange = (value) => {
    setValue(value);
  };
  const OTPProps = {
    OTPLength: size,
    otpType: 'number',
  };
  return (
    <SWrapper>
      <OTPInput {...OTPProps} onChange={onChange} value={value} />
      {register && (
        <input
          name={name}
          className="d-none"
          ref={register}
          value={value}
          readOnly
        />
      )}
    </SWrapper>
  );
};

InputOTP.defaultProps = {
  size: 4,
  name: 'otp',
};

export default InputOTP;
