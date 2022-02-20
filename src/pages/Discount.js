import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Bargain from '../components/Bargain';
import CardList from '../components/CardList';
import Event from '../components/Event';
import ProductSlick2 from '../components/ProductSlick2'
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

const ImgBanner = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Discount = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(state => state.product.list);

	useEffect(() => {
		dispatch(productsActions.getProductsMiddleWare());
	}, [dispatch]);

	return (
		<>
			<Container>
				{/* <Event /> */}
                <ImgBanner>
						<img
							alt="MarketCurly"
							src="https://img-cf.kurly.com/category/banner/pc/c9abee3e-cecd-4229-8642-c96e417a9a70"
						/>
					</ImgBanner>
				<ProductSlickLayout>
					<ProductSlick2 productsList={productsList} />
				</ProductSlickLayout>
				{/* <Bargain /> */}
				{/* <CardList productsList={productsList} /> */}
			</Container>
		</>
	);
};

export default Discount;