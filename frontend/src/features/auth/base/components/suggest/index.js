import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SText = styled.div`
  font-family: 'Roboto';
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  margin-top: 6px;
`;

const SLink = styled(Link)`
  color: #007bff;
`;

const SHref = styled.a`
  color: #007bff;
`;

const Suggest = ({ type, newTab }) => {
  switch (type) {
    case 'sign-in':
      if (newTab)
        return (
          <SText>
            Bạn đã có tài khoản ?{' '}
            <SHref href="/login" target="_blank">
              Đăng Nhập
            </SHref>
          </SText>
        );
      return (
        <SText>
          Bạn đã có tài khoản ? <SLink to="/login">Đăng Nhập</SLink>
        </SText>
      );
    default:
      return (
        <SText>
          Bạn chưa có tài khoản ? <SLink to="/register">Đăng Ký</SLink>
        </SText>
      );
  }
};

export default Suggest;
