import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const SHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
  text-align: center;
`;

const SLogo = styled.div`
  display: inline;
  position: absolute;
  left: 5%;
  top: 2%;
  z-index: 100;
  img {
    width: 30px;
    height: 30px;
  }
`;

const AuthLayout = ({ title, children }) => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <SLogo>
        <Link to="/">Home</Link>
      </SLogo>
      <Row
        justify="center"
        type="flex"
        style={{ position: 'relative', width: '100vw', height: '100vh' }}
      >
        <Col xs={22} md={{ span: 10 }}>
          <div style={{ marginTop: '80px' }} />
          <SHeader>{title}</SHeader>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
