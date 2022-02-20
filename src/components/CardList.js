import React from 'react';
import styled from 'styled-components';

import Card from '../elements/Card';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 1em;
	width: 100%;
	padding: 50px 0;
`;

const Contents = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	width: 55%;
	margin: 30px 0 30px;
	@media screen and (max-width: 1280px) {
		justify-content: center;
	}
	/* img {
		width: 330px;
		margin: 10px;
	} */
`;

const CardList = ({ productsList }) => {
	console.log('productsList', productsList);
	return (
		<>
			<Container>
				<p style={{ fontWeight: '400', fontSize: '30px' }}>판매상품</p>
				<Contents>
					{productsList?.map((v, i) => (
						<Card
							key={i}
							title={v.title}
							img={v.img}
							price={v.price}
							width="330px"
							height="450px"
							id={v._id}
							icon
						/>
					))}
				</Contents>
			</Container>
			{/* <Modal visible={true} /> */}
		</>
	);
};

export default CardList;