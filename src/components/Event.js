import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Event = () => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};

	return (
		<>
			<Wrap>
				<Slider {...settings}>
					<div>
						<img
							alt="kurly1"
							src="https://img-cf.kurly.com/banner/main/pc/img/31df528e-ad56-40d6-921e-c6d129f9ac20"
						/>
					</div>
					<div>
						<img
							alt="kurly2"
							src="https://img-cf.kurly.com/banner/main/pc/img/e66ae80e-90ac-4fb8-a7d6-bdeb1bbae2ed"
						/>
					</div>
					<div>
						<img
							alt="kurly3"
							src="https://img-cf.kurly.com/banner/main/pc/img/33fd993f-2fcd-45ce-9409-131a4d9b2f4b"
						/>
					</div>
					<div>
						<img
							alt="kurly4"
							src="https://img-cf.kurly.com/banner/main/pc/img/aeb07faf-fe19-4d85-acbd-fbcc1e0adafc"
						/>
					</div>
					<div>
						<img
							alt="kurly5"
							src="https://img-cf.kurly.com/banner/main/pc/img/e98407c8-6242-4660-be4c-eb33b2223eb6"
						/>
					</div>
				</Slider>
			</Wrap>
		</>
	);
};

const Wrap = styled.div`
	width: 100%;
	img {
		width: 100%;
	}
`;

export default Event;