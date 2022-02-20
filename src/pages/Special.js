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

const ImgBanner1 = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    /* margin-top: 10px; */
`;

const ImgBanner = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
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
			<Container >
				{/* <Event /> */}
				{/* <ProductSlickLayout>
					<ProductSlick productsList={productsList} />
				</ProductSlickLayout> */}
				{/* <Bargain /> */}
				{/* <CardList productsList={productsList} /> */}
                <ImgBanner1 >
                        <img 
                        alt='MarketCurly1'
                        src="https://img-cf.kurly.com/shop/data/event/cc7877f29c7f1757f2d8dbad698d7d02.jpg"
                        />
					</ImgBanner1>
                <ImgBanner>
                        <img 
                        alt='MarketCurly2'
                        src="https://img-cf.kurly.com/shop/data/event/cca687922fb0bead0bb9ad609d3ce5fa.jpg"
                        />
					</ImgBanner>
                    <ImgBanner>
                        <img 
                        alt='MarketCurly3'
                        src="https://img-cf.kurly.com/shop/data/event/8670525d2579012ab30de640012d9ead.jpg"
                        />
					</ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly4'
                    src="https://img-cf.kurly.com/shop/data/event/92b379968795cccd6d85d8a75e1979e2.jpg"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly5'
                    src="https://img-cf.kurly.com/shop/data/event/79a5c3b890d988a545199b3210f10ec9.jpg"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly6'
                    src="https://img-cf.kurly.com/shop/data/event/683b53c277e9091d82813291896cf1ac.jpg"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly7'
                    src="//img-cf.kurly.com/shop/data/event/56bd78423f911b5a8eb152a76461eb5f.jpg"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly8'
                    src="https://img-cf.kurly.com/shop/data/event/dee4c6585d5304ac71e4563dbc4eb8b2.jpg"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly9'
                    src="https://img-cf.kurly.com/shop/data/event/908eded0caa275eff34418037de6d692.png"
                    />
                </ImgBanner>
                <ImgBanner>
                    <img 
                    alt='MarketCurly10'
                    src="https://img-cf.kurly.com/shop/data/event/fe05f6ca41faa6e7d8a063d918872fad.jpg"
                    />
                </ImgBanner>
			</Container>
		</>
	);
};

export default Main;