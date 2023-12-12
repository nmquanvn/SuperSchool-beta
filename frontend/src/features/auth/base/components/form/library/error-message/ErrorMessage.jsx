import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled.div`
  color: #d20000;
  opacity: 0.8;
  font-size: 14px;
`;

function ErrorMessage({ msg = '', ...props }) {
  return <StyledError {...props}>{msg}</StyledError>;
}

ErrorMessage.propTypes = {
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ErrorMessage;
