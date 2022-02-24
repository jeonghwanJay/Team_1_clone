import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Event from '../components/Event';
import ProductSlick from '../components/ProductSlick';
import { actionCreators as productsActions } from '../redux/modules/product';

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(state => state.product.list);

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
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 1050px;
	overflow: hidden;
`;

const ProductSlickLayout = styled.div`
	width: 53%;
	height: 100%;
	margin: 80px auto;
`;

export default Main;