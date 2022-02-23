// Header.js

// import를 한다.
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements/index';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import user, { actionCreators as userActions } from '../redux/modules/user';

// image
import HeaderLeftImg from '../images/header-left-delivery.gif';

// Header의 함수형 컴포넌트를 만든다.
const Header = props => {
	const dispatch = useDispatch();
	const is_login = useSelector(state => state.user.is_login);
	const userInfo = useSelector(state => state.user.user);
	console.log(userInfo)

	const headerChange = () => {
		const headerbox = document.querySelector('.header');
		const loginbox = document.querySelector('.scroll-event');

		if (window.scrollY > 105) {
			loginbox.style.display = 'none';
			headerbox.style.position = 'fixed';
			headerbox.style.zIndex = '300';
			headerbox.style.width = '1050px';
		} else {
			loginbox.style.display = 'block';
			headerbox.style.position = '';
		}
	};

	useEffect(() => {
		dispatch(userActions.isLogin());
	}, [dispatch]);

	const readyAlert = () => {
		// alert('버전2를 기대해 주세요');
	};

	return (
		<React.Fragment>
			<Grid width="1050px" margin="10px auto 0 auto">
				<HeaderWrap className="header">
					<ScrollMenu className="scroll-event">
						<Grid flex bg="white" height="22px">
							<img
								style={{ cursor: 'pointer', margin: '3px 0px 0px 0px' }}
								src="https://res.kurly.com/pc/service/common/2011/delivery_210801.png"
								width="121px"
								alt="서울, 경기, 인천 샛별배송, 수도권 이외 지역 택배배송"
							/>
							<HeaderMenu>
								{!is_login && (
									<React.Fragment>
										<li onClick={() => history.push('/signup')} className="header-menu signup">
											회원가입
										</li>
										<li onClick={() => history.push('/login')} className="header-menu">
											로그인
										</li>
									</React.Fragment>
								)}
								{is_login && (
									<React.Fragment>
										<li className="header-menu">
											<MemberSpan>웰컴</MemberSpan>
											{/* {userInfo?.user.name}님 */}
											{userInfo?.email}님
										</li>
										<li
											className="header-menu"
											onClick={() => {
												dispatch(userActions.logout());
											}}
										>
											로그아웃
										</li>
									</React.Fragment>
								)}
								<li className="arrow" onClick={readyAlert}>
									고객센터
								</li>
							</HeaderMenu>
						</Grid>
						<Grid center height="63px">
							<LogoImg
								src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
								width="103px"
								alt="마켓컬리 로고"
								style={{ cursor: 'pointer' }}
								onClick={() => history.push('/')}
							/>
						</Grid>
					</ScrollMenu>
					<Grid flex>
						<Grid>
							<HeaderCategory onClick={readyAlert}>
								<li className="all-category">전체 카테고리</li>
								<li onClick={() => history.push('/')}>신상품</li>
								<li onClick={() => history.push('/Best')}>베스트</li>
								<li onClick={() => history.push('/Discount')}>알뜰쇼핑 </li>
								<li onClick={() => history.push('/Special')}> 특가/혜택</li>
							</HeaderCategory>
						</Grid>
						<Grid>
							<SearchInput
								type="text"
								placeholder="검색어를 입력해주세요."
								onClick={readyAlert}
								readOnly
							/>
						</Grid>
						<Grid>
							<Icons className="adress-icon" onClick={readyAlert} />
							<Icons 
								className='heart-icon'
								onClick={() => {
									if (!userInfo) {
										// alert('로그인 후 사용해주세요!');
										return false;
									}
									// history.push('/cart');
								}}
							></Icons>
							<Icons
								className="cart-icon"
								onClick={() => {
									if (!userInfo) {
										alert('로그인 후 사용해주세요!');
										return false;
									}
									history.push('/cart');
								}}
							></Icons>
						</Grid>
					</Grid>
				</HeaderWrap>
			</Grid>
		</React.Fragment>
	);
};

// styled-components를 사용한다.
const HeaderWrap = styled.div`
	background-color: #ffffff;
`;

const HeaderMenu = styled.ul`
	display: flex;
	font-size: 12px;
	& li {
		padding: 0px 24px 0px 0px;
		position: relative;
		top: -1px;
		cursor: pointer;
		list-style: none;
		&.arrow {
			padding-right: 11px;
		}
		&.arrow:after {
			content: '';
			width: 8px;
			height: 5px;
			background: url('https://res.kurly.com/pc/ico/1908/ico_down_8x5.png');
			display: inline-block;
			position: relative;
			left: 4px;
		}
		&.header-menu:after {
			content: '';
			float: right;
			width: 1px;
			height: 13px;
			position: relative;
			top: 4px;
			left: 12px;
			background-color: #d8d8d8;
		}
	}
	& .signup {
		color: #5f0080;
	}
`;
const LogoImg = styled.img`
	position: relative;
	top: -22px;
	left: -8px;
`;
const HeaderCategory = styled.ul`
	display: flex;
	padding: 0px;
	& li {
		padding: 0px 70px 0px 0px;
		cursor: pointer;
		display: block;
		&:hover {
			color: #5f0081;
		}
	}
	& .all-category:hover::before {
		content: url('https://res.kurly.com/pc/service/common/1908/ico_gnb_all.png');
		position: relative;
		top: 2px;
		margin-right: 13px;
	}
	& .all-category::before {
		content: url('https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off.png');
		position: relative;
		top: 2px;
		margin-right: 13px;
	}
`;

const SearchInput = styled.input`
	box-sizing: border-box;
	border: 1px solid #f7f7f7;
	background-color: #f7f7f7;
	border-radius: 18px;
	margin-left: -150px;
	outline: none;
	width: 235px;
	height: 35px;
	color: #666;
	font-size: 12px;
	padding-left: 34px;
	background-image: url('https://res.kurly.com/pc/service/common/1908/ico_search_x2.png');
	background-repeat: no-repeat;
	background-size: 30px 30px;
	background-position: center right + 2px;
	font-size: 12px;
	font-family: 'Noto Sans KR', sans-serif;
	letter-spacing: -1px;
	&:focus {
		background-color: #ffffff;
	}
`;

const Icons = styled.span`
	display: inline-block;
	width: 36px;
	height: 36px;
	position: relative;
	top: 3px;
	cursor: pointer;
	position: relative;
	&.adress-icon {
		background-image: url('https://res.kurly.com/pc/ico/2008/ico_delivery_setting.svg?ver=1');
		margin: 0px 15px 0px -100px;
		&:hover {
			background-image: url('https://res.kurly.com/pc/ico/2010/ico_delivery_setting_on.svg');
		}
	}
	&.heart-icon {
		background-image: url('https://res.kurly.com/pc/service/pick/btn-heart-off.svg');
		margin: 0px 15px 0px 0px;
		&:hover {
			/* background-image: url('file:///Users/jeonghwan/Desktop/heart-3510.svg'); */
			background-color: none;
			border: none;
		}
	}
	&.cart-icon {
		background-image: url('https://res.kurly.com/pc/service/common/2011/ico_cart.svg');
		&:hover {
			background-image: url('https://res.kurly.com/pc/service/common/2011/ico_cart_on.svg?v=1');
		}
	}
`;

const MemberSpan = styled.span`
	font-size: 10px;
	color: #5f0080;
	border: 1px solid #5f0080;
	padding: 0px 9px;
	border-radius: 15px;
	margin-right: 5px;
`;

const ScrollMenu = styled.div``;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Header;