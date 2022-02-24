import React from 'react';
import styled from 'styled-components';

const Button = props => {
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

export default Button;