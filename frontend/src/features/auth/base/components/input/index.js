import React, { useState } from 'react';
import styled from 'styled-components';
import {
  WarningOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const SWrapper = styled.div`
  position: relative;
  input,
  select,
  textarea {
    background-color: rgb(0, 123, 255, 0.1);
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    border-radius: 4px;
    padding: 10px 16px;
    font-family: Roboto;
    border: ${(props) =>
      props.error
        ? 'solid 0.5px #d20000'
        : 'solid 0.5px rgba(0, 123, 255, 0.1)'};
    border-style: none;
    /* background-color: red !important; */
  }
`;

const SInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  padding: 10px 16px;
  font-family: Roboto;
  border: ${(props) =>
    props.error ? 'solid 0.5px #d20000' : 'solid 0.5px rgba(0, 123, 255, 0.1)'};
  border-style: none;
`;

const SErrorIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #d20000;
`;

const SViewPwIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #007bff;
  height: 24px;
  width: 24px;
  i {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

// const Input = ({ error, ...props }) => {
//   return (
//     <SWrapper>
//       <input autoComplete="off" error={error} {...props} />
//       {error && (
//         <SErrorIcon>
//           <WarningOutlined />
//         </SErrorIcon>
//       )}
//     </SWrapper>
//   );
// };

const Input = React.forwardRef(({ error, ...props }, ref) => {
  return (
    <SWrapper>
      <input autoComplete="off" error={error} {...props} />
      {error && (
        <SErrorIcon>
          <WarningOutlined />
        </SErrorIcon>
      )}
    </SWrapper>
  );
});

const InputPassWord = React.forwardRef(({ error, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const toggleViewClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <SWrapper>
      <SInput error={error} {...props} type={show ? 'text' : 'password'} />
      <SViewPwIcon>
        {show ? (
          <EyeOutlined onClick={toggleViewClick} />
        ) : (
          <EyeInvisibleOutlined onClick={toggleViewClick} />
        )}
      </SViewPwIcon>
    </SWrapper>
  );
});

Input.Password = InputPassWord;

export default Input;
