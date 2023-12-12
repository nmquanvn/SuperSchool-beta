
import React from 'react';

const Padding = ({ size, children }) => {
	return <div style={{ padding: size }}>
		{children}
	</div>
};

export default Padding;
