import React from 'react';
import styled from 'styled-components';
import Card from '../elements/Card';
import Grid from '../elements/Grid'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
                <span style={{ fontSize: '1.8em', fontWeight: 'bold', }}>?????????</span>
            </div>
			<Grid width="1050px" flex >
			<div style={{ display: "flex" , marginLeft: '-18px'}}>
			<Count>??? 99???</Count>
			</div>
			<div style={{ display: "flex" , marginRight: '15px'}}>
                <Sort>?????????</Sort>
                <Line> | </Line>
                <Sort>????????????</Sort>
                <Line> | </Line>
                <Sort>???????????????</Sort>
                <Line> | </Line>
                <Sort>?????? ?????????</Sort>
                <Line> | </Line>
                <Sort>?????? ?????????</Sort>
              </div>
			</Grid>
			<Grid gridBox {...settings}>
					{productsList?.map((v, i) => (
						<div style={{ display:'flex'}} key={i}>
							<Card key={i} title={v.title} img={v.img} price={v.price} postId={v.postId}/>
						</div>
					))}
				</Grid>
        </Wrap>
    </>
	);	
};

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

export default ProductSlick1;