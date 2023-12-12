import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import Label from '../label';
import ErrorMessage from '../error-message';

const StyledFormItem = styled.div.attrs((props) => ({
  spaceBot: `${props.spaceBot}px`,
}))``;

const StyleForm = styled.div`
  border-radius: 10px 10px 10px 10px;
  border: 0px solid #000000;
  height: 100%;
  input {
    border: none !important;
    border-style: none !important;
  }
`;

function FormItem({
  spaceBot,
  control,
  defaultValue,
  as,
  onChange,
  withoutControl,
  name,
  label = '',
  error,
  required,
  opacity,
  subLabel,
}) {
  return (
    <StyledFormItem spaceBot={spaceBot}>
      <Label
        opacity={opacity}
        label={label}
        subLabel={subLabel}
        required={required}
      />
      <StyleForm className="input-msg-group">
        <div>
          {as && withoutControl === false && (
            <Controller
              as={as}
              control={control}
              onChange={onChange}
              name={name}
              defaultValue={defaultValue}
            />
          )}
          {withoutControl && as}
          <ErrorMessage msg={error} />
        </div>
      </StyleForm>
    </StyledFormItem>
  );
}

FormItem.defaultProps = {
  mode: 'block',
  withoutControl: false,
};

FormItem.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.func,
    PropTypes.node,
  ]),
  name: PropTypes.string,
  withoutControl: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
};

export default FormItem;
