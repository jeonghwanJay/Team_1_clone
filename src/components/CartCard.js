import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { priceUnit } from '../shared/common';
import { actionCreators as cartActions } from '../redux/modules/cart';

const CartCard = props => {
	// const [count, setCount] = useState(0);
	// const originalPrice = props.productCount;
	const dispatch = useDispatch();
	const [cartList, setCartList] = useState();

	const cart = useSelector(state => state.cart.cart_list);
	console.log(cartList);

	useEffect(() => {
		setCartList(cart);
	}, [cartList, cart]);

	function onClickMinus(quantity, postId) {
		if (quantity > 1) {
			dispatch(cartActions.updateQuantityM(quantity - 1, postId));
			return;
		}
	}

	const onClickPlus = (quantity, postId) => {
		dispatch(cartActions.updateQuantityP(quantity + 1, postId));
	};
	

	return (
		<React.Fragment>
			{cart.map((e, index) => {
				return (
					<CartBox key={index}>
						<img src={e.img} width="60px" height="78px" alt="img" />
						<TitleBox>
							<h4>{e.title}</h4>
						</TitleBox>
						<h3>{e.quantity}</h3>
						<CountBox>
							<CountBtn onClick={() => onClickPlus(e.quantity, e.postId)}>+</CountBtn>
							<CountBtn onClick={() => onClickMinus(e.quantity, e.postId)}>-</CountBtn>
						</CountBox>
						<h4>{parseInt(e.price.replace(/,/g, "")) * e.quantity}원</h4>
						<DeleteBtn
							onClick={() => {
								console.log(e.postId);
								dispatch(cartActions.deleteCartMddleWares(e.postId));
							}}
						/>
					</CartBox>
				);
			})}
		</React.Fragment>
	);
};
export default CartCard;

const CartBox = styled.div`
	display: flex;
	height: 150px;
	align-items: center;
	gap: 10px;
	margin-left: -10px;
	border-bottom: 1px solid #eaeaea;
	padding: 0px 30px;
	& h4 {
		font-size: 16px;
		font-weight: 400;
	}
`;

const TitleBox = styled.div`
	width: 285px;
	text-align: left;
	margin-left: 12px;
`;

const CountBox = styled.div`
	margin: 0px 50px;
	border: 1px solid lightgray;
	border-radius: 4px;
	overflow: hidden;
	width: 82px;
	height: 26px;
	display: flex;
	width: 50px;
	height: 20px;
`;

const CountBtn = styled.button`
	width: 28px;
	height: 22px;
	background-color: white;
	font-size: 18px;
	position: relative;
	top: -1px;
	border: none;
	outline: none;
	cursor: pointer;
`;

const DeleteBtn = styled.button`
	background-image: url('https://res.kurly.com/pc/service/cart/2007/ico_delete.svg');
	background-position: 50% 50%;
	background-color: #ffffff;
	outline: none;
	border: none;
	width: 30px;
	height: 30px;
	cursor: pointer;
`;