import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { priceUnit } from '../shared/common';
import Modal from '../components/Modal';

const Card = ({
	title,
	price,
	img,
	width,
	height,
	margin,
	priceSize,
	titleSize,
	center,
	color,
	icon,
	id,
}) => {
	const styles = {
		width: width,
		height: height,
		margin: margin,
		center: center,
	};

	const [modalOpen, setModalOpen] = useState(false);

	const modalClose = useCallback(() => {
		setModalOpen(!modalOpen);
	}, [modalOpen]);

	return (
		<>
			{modalOpen && <Modal close={modalClose} title={title} price={price} id={id} img={img}/>}
			<Layout {...styles}>
				<Photo>
					{icon && <CartBtn onClick={modalClose} />}
					<img alt="img" src={img} />
				</Photo>
				<TextLayout>
					<Subject titleSize={titleSize}>{title}</Subject>
					<Price priceSize={priceSize} color={color}>
						{price && priceUnit(price)}원
					</Price>
				</TextLayout>
			</Layout>
		</>
	);
};

Card.defaultProps = {
	width: '250px',
	height: '400px',
	margin: '0',
	priceSize: '1.2em',
	titleSize: '1em',
	center: false,
	color: 'black',
	icon: false,
};

const Layout = styled.div`
	width: ${props => props.width};
	height: ${props => props.height};
	margin: ${props => props.margin};
	text-align: ${props => (props.center ? 'center' : 'unset')};
	/* border: 1px solid gray; */
`;

const Photo = styled.div`
	position: relative;
	height: 70%;
	img {
		width: 98%;
		height: 100%;
	}
`;

const TextLayout = styled.div`
	width: 90%;
	padding: 0.5em;
	p {
		margin: 0.5em;
	}
`;

const Subject = styled.p`
	font-size: ${props => props.titleSize};
	font-weight: normal;
`;

const Price = styled.p`
	font-size: ${props => props.priceSize};
	font-weight: bold;
	color: ${props => props.color};
`;

const CartBtn = styled.div`
	position: absolute;
	right: 20px;
	bottom: 15px;
	width: 45px;
	height: 45px;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45' viewBox='0 0 45 45'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg%3E%3Cg%3E%3Cg transform='translate(-1143 -1896) translate(896 1561) translate(247 335)'%3E%3Ccircle cx='22.5' cy='22.5' r='22.5' fill='%232A0038' opacity='.5'/%3E%3Cg%3E%3Cpath stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21.176 0.465L17.995 0.465 15.404 12.874 3.042 12.874 0.451 3.068 16.813 3.068' transform='matrix(-1 0 0 1 32 15)'/%3E%3Cpath fill='%23FFF' d='M4.136 18.584c-.718 0-1.3-.583-1.3-1.301 0-.719.582-1.301 1.3-1.301.718 0 1.3.582 1.3 1.3 0 .72-.582 1.302-1.3 1.302zM15.387 17.283c0 .718-.582 1.3-1.3 1.3-.718 0-1.3-.582-1.3-1.3 0-.719.582-1.301 1.3-1.301.718 0 1.3.582 1.3 1.3' transform='matrix(-1 0 0 1 32 15)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
`;

export default Card;