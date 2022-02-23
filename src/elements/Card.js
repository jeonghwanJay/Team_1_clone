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
	postId,
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
			{modalOpen && <Modal close={modalClose} postId={postId} title={title} price={price} id={id} img={img}/>}
			<Layout {...styles}>
				<Photo>
					{<CartBtn onClick={modalClose} />}
					<img alt="img" src={img} />
				</Photo>
				<TextLayout>
					<Subject titleSize={titleSize}>{title}</Subject>
					<Price priceSize={priceSize} color={color}>
						{price && priceUnit(price)}
					</Price>
				</TextLayout>
			</Layout>
		</>
	);
};

Card.defaultProps = {
	width: '338px',
	height: '600px',
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
	background-image: url("https://res.kurly.com/pc/ico/2010/ico_cart.svg");
`;

export default Card;