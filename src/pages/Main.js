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
	height: 100%;
	margin: 80px auto;
`;

// const product_list_count = useSelector(
//     (state) => state.product.products.numberOfElements
//   );


const Main = () => {
	const dispatch = useDispatch();
	// const user_info = useSelector((state) => state.user.user);

	const productsList = useSelector(state => state.product.list);
	// const productsList = useSelector(state => state.product.products);
	useEffect(() => {
		dispatch(productsActions.getProductsMiddleWare());
	}, []);

	return (
		<>
			<Container>
				<Event />
				<ProductSlickLayout>
					<ProductSlick productsList={productsList}/>
				</ProductSlickLayout>
				{/* <Bargain /> */}
				{/* <CardList productsList={productsList} /> */}
			</Container>
		</>
	);
};

export default Main;