import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Card from '../elements/Card';
import Grid from '../elements/Grid'

const Wrap = styled.div`
	width: 100%;
	margin: 0;
`;

const Count = styled.p`
  font-size: 12px;
  color: #333;
  line-height: 18px;
`;

const Sort = styled.p`
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-left: 6px;
  cursor: pointer;
`;

const Line = styled.p`
  font-size: 12px;
  color: #9999;
  line-height: 18px;
  margin-left: 6px;
`;

function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				width: '50px',
				height: '50px',
				right: '-27px',
				top: '150px',
			}}
			onClick={onClick}
		>
			<img
				src={require('../images/arrow.png').default}
				alt="arrowNext"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					right: '5px',
					top: '-10px',
					border: '1px solid rgb(197, 197, 197)',
					borderRadius: '50%',
				}}
			/>
		</div>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				width: '50px',
				height: '50px',
				right: '-27px',
				top: '150px',
				zIndex: '999',
			}}
			onClick={onClick}
		>
			<img
				src={require('../images/arrowL.png').default}
				alt="arrowNext"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					left: '0px',
					top: '-10px',
					border: '1px solid rgb(197, 197, 197)',
					borderRadius: '50%',
				}}
			/>
		</div>
	);
}

const ProductSlick1 = ({ productsList }) => {
	const settings = {
		speed: 500,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1700,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
return (
    <>
        <Wrap>
            <div style={{ textAlign: 'center', marginBottom: '2em' }}>
                <span style={{ fontSize: '1.8em', fontWeight: 'bold', }}>베스트</span>
            </div>
			<Grid width="1050px" flex>
			<Count>총 296개</Count>
			<div style={{ display: "flex" }}>
                <Sort>추천순</Sort>
                <Line> | </Line>
                <Sort>신상품순</Sort>
                <Line> | </Line>
                <Sort>인기상품순</Sort>
                <Line> | </Line>
                <Sort>낮은 가격순</Sort>
                <Line> | </Line>
                <Sort>높은 가격순</Sort>
              </div>
			</Grid>
            <Slider {...settings}>
                {productsList?.map((v, i) => (
                    <Card key={i} title={v.title} img={v.img} price={v.price} />
                ))}
            </Slider>
        </Wrap>
    </>
);

	
};



export default ProductSlick1;