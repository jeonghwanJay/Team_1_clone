import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Bargain from '../components/Bargain';
import CardList from '../components/CardList';
import Event from '../components/Event';
import ProductSlick from '../components/ProductSlick';
import { actionCreators as productsActions } from '../redux/modules/product';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 1050px;
	overflow: hidden;
	/* height: 100vh; */
`;

const ProductSlickLayout = styled.div`
	width: 53%;
	height: 500px;
	margin: 80px auto;
`;

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(state => state.product.list);

	useEffect(() => {
		dispatch(productsActions.getProductsMiddleWare());
	}, [dispatch]);

	return (
		<>
			<Container>
				<Event />
				<ProductSlickLayout>
					<ProductSlick productsList={productsList} />
				</ProductSlickLayout>
				{/* <Bargain /> */}
				{/* <CardList productsList={productsList} /> */}
			</Container>
		</>
	);
};

export default Main;