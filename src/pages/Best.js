import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductSlick1 from '../components/ProductSlick1'
import { actionCreators as productsActions } from '../redux/modules/product';

const Best = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(state => state.product.list);

	useEffect(() => {
		dispatch(productsActions.bestProductM());
	}, []);

	return (
		<>
			<Container>
                    <ImgBanner>
						<img
							alt="MarketCurly"
							src="https://img-cf.kurly.com/category/banner/pc/c9abee3e-cecd-4229-8642-c96e417a9a70"
						/>
					</ImgBanner>
				<ProductSlickLayout>
					<ProductSlick1 productsList={productsList} />
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

const ImgBanner = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export default Best;