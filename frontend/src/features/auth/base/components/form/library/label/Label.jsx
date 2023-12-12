/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
	font-size: 16px !important;
	display: block;
	opacity: ${(props) => props.opacity };
	color: rgba(0, 0, 0, 0.87);
	font-family: Roboto !important;
	span.required-icon {
		display: ${(props) => props.required ? 'normal' : 'none'};
		color: red;
	}
`;

function Label({
	label,
	required,
	bold,
	opacity=1,
	subLabel
}) {
	return (
		<StyledLabel className="label-ui" required={required} bold={bold} opacity={opacity}>
			{label}
			{subLabel}
			<span className="required-icon">*</span>
		</StyledLabel>
	);
}

Label.defaultProps = {
	required: false,
	inline: false,
	bold: false,
	label: ''
};

export default Label;
