import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const SButton = styled(Button)`
  padding: 11px;
  font-size: 16px;
  height: 44px;
  cursor: pointer;
  &:focus {
    box-shadow: none;
  }
  &:disabled {
    background: #9e9e9e;
  }
`;

const CButton = ({ children, ...props }) => (
  <SButton {...props} type="primary">
    {children}
  </SButton>
);

export default CButton;
