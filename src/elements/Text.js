// Text.js

// import를 한다.
import React from 'react';
import styled from 'styled-components';

// Text의 함수형 컴포넌트를 만든다.
const Text = props => {
	// 둘째, defaultProps에서 설정해준 값을 가져온다.
	const { children, bold, color, size, margin, onClick } = props;

	// 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
	const styles = {
		bold: bold,
		color: color,
		size: size,
		margin: margin,
	};
	return (
		<P {...styles} onClick={onClick}>
			{children}
		</P>
	);
};

// 첫째, defaultProps를 설정한다.
Text.defaultProps = {
	children: null,
	bold: false,
	coloe: '#222831',
	size: '14px',
	margin: 'false',
	onClick: () => {},
};

// 셋째, styled-components를 사용한다.
const P = styled.p`
	color: ${props => props.color};
	font-size: ${props => props.size};
	font-weight: ${props => (props.bold ? '600' : '400')};
	${props => (props.margin ? `margin:${props.margin};` : 'margin:0px')}
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Text;