// Input.js

// import를 한다.
import React from 'react';
import styled from 'styled-components';

// Input의 함수형 컴포넌트를 만든다.
const Input = props => {
	// 둘째, defaultProps에서 설정해준 값을 가져온다.
	const { placeholder, onChange, type, width, margin, padding, onClick } = props;

	// 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
	const styles = {
		width: width,
		margin: margin,
		padding: padding,
	};

	return (
		<React.Fragment>
			<ElInput
				{...styles}
				type={type}
				placeholder={placeholder}
				onClick={onClick}
				onChange={onChange}
			></ElInput>
		</React.Fragment>
	);
};

// 첫째, defaultProps를 설정한다.
Input.defaultProps = {
	placeholder: '텍스트를 입력하시오.',
	_onChange: () => {},
	_onClick: () => {},
	type: 'text',
	value: '',
	width: '100%',
	margin: false,
	padding: false,
};

// 셋째, styled-components를 사용한다.
const ElInput = styled.input`
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: ${props => (props.padding ? `${props.padding};` : '19px 19px;')};
	outline: none;
	width: ${props => props.width};
	box-sizing: border-box;
	${props => (props.margin ? `margin:${props.margin};` : '')}
	&::placeholder {
		color: #cacaca;
		font-weight: 500;
	}
	&:focus {
		border: 1px solid #333333;
	}
`;

export default Input;