// Button.js

// import를 한다.
import React from 'react';
import styled from 'styled-components';

// Button 함수형 컴포넌트를 만든다.
const Button = props => {
	// 둘째, defaultProps에서 설정해준 값을 가져온다.
	const {
		text,
		children,
		width,
		color,
		bg,
		padding,
		margin,
		disabled,
		size,
		bold,
		borderColor,
		onClick,
	} = props;

	// 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
	const styles = {
		width: width,
		padding: padding,
		margin: margin,
		color: color,
		bg: bg,
		size: size,
		bold: bold,
		borderColor: borderColor,
	};

	return (
		<React.Fragment>
			<BasicButton {...styles} onClick={onClick} disabled={disabled}>
				{text ? text : children}
			</BasicButton>
		</React.Fragment>
	);
};

// 첫째, defaultProps를 설정한다.
Button.defaultProps = {
	children: null,
	text: false,
	width: '100%',
	padding: '15px 15px',
	margin: false,
	color: '#fff',
	bg: '#5f0081',
	disabled: false,
	size: '16px',
	bold: false,
	borderColor: '1px solid #5f0081',
	onClick: () => {},
};

// 셋째, styled-components를 사용한다.
const BasicButton = styled.button`
	width: ${props => props.width};
	cursor: pointer;
	background-color: ${props => props.bg};
	color: ${props => props.color};
	padding: ${props => props.padding};
	border: ${props => props.borderColor};
	border-radius: 3px;
	box-sizing: border-box;
	font-size: ${props => props.size};
	${props => (props.margin ? `margin:${props.margin};` : '')}
	${props => (props.bold ? 'font-weight:600;' : '')}
  outline: none;
	&:focus {
		outline: none;
	}
	&:disabled {
		background-color: #ddd;
		border: 1px solid #ddd;
	}
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Button;