// Grid.js

// // import를 한다.
import React from 'react';
import styled from 'styled-components';

// Grid 함수형 컴포넌트를 만든다.
const Grid = props => {
	// 둘째, defaultProps에서 설정해준 값을 가져온다.
	const { flex, gridBox, width, margin, padding, bg, children, center, height } = props;

	// 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
	const styles = {
		flex: flex,
		width: width,
		margin: margin,
		padding: padding,
		bg: bg,
		center: center,
		gridBox: gridBox,
		height: height,
	};

	if (gridBox) {
		return (
			<React.Fragment>
				<ParentsGridbox {...styles}>{children}</ParentsGridbox>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<GridBox {...styles}>{children}</GridBox>
		</React.Fragment>
	);
};

// 첫째, defaultProps를 설정한다.
Grid.defaultProp = {
	children: null,
	flex: false,
	width: '100%',
	padding: false,
	margin: false,
	bg: false,
	center: false,
	gridBox: false,
	height: false,
};

// 셋째, styled-components를 사용한다.
const GridBox = styled.div`
	width: ${props => props.width};
	box-sizing: border-box;
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	${props => (props.flex ? `display:flex; align-items:center; justify-content:space-between;` : '')}
	${props => (props.height ? `height:${props.height};` : '')}
`;

const ParentsGridbox = styled.div`
	width: ${props => props.width};
	box-sizing: border-box;
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	display: grid;
	grid-template-columns: repeat(3, 308px);
	grid-column-gap: 24px;
	align-items: center;
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Grid;