import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { api } from '../../shared/api';

const ADD_CART = 'ADD_CART';
const LOADING = 'LOADING';
const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';
const UPDATE_CART = 'UPDATE_CART';

const addCart = createAction(ADD_CART, cart => ({
	cart,
}));
const setCart = createAction(SET_CART, cartList => ({ cartList }));
const loading = createAction(LOADING, isLoading => ({
	isLoading,
}));
const deleteCart = createAction(DELETE_CART, postId => ({ postId }));
const updateCart = createAction(UPDATE_CART, (postId, quantity) => ({
	postId,
	quantity,
}));

const initialState = {
	cart_list: [],
	list: [
		{
			title: '[올리타리아] 엑스트라 버진 올리브유',
			img: 'https://img-cf.kurly.com/shop/data/goods/1587519777879l0.jpg',
			price: 15000,
		},
	],
};

const addCardMiddleWare = (id, title, price, img, quantity) => {
	return (dispatch, { history }) => {
		console.log('장바구니비동기요청');
		console.log(id, title, price, img, quantity);
		dispatch(loading(true));
		api
			.post(`/carts/${id}`, {
				title,
				price,
				img,
				quantity,
			})
			.then(res => {
				// const products = res.data.post;
				// dispatch(addCart(products));
				dispatch(loading(false));
				alert('장바구니에 상품을 담았습니다!');
			})
			.catch(err => {
				console.log(err.response);
				if (err.response.statusText === 'Unauthorized') {
					alert('로그인 후 이용해주세요.');
					dispatch(loading(false));
					return;
				}
				alert(err.response.data.msg);
				dispatch(loading(false));
			});
	};
};

const getCartAPI = () => {
	return function (dispatch, getState, { history }) {
		// getToken();
		api
			.get(`/carts`)
			.then(res => {
				console.log(res);
				dispatch(setCart(res.data.cartAllList));
			})
			.catch(err => {
				console.log('err장바구니조회', err);
			});
	};
};

//DELETE
const deleteCartMddleWares = postId => {
	return function (dispatch, getState, { history }) {
		api
			.delete(`/carts`, { postId })
			.then(res => {
				console.log(res);
				dispatch(deleteCart(postId));
			})
			.catch(err => {
				console.log(err, '삭제에러임');
			});
	};
};

const updateQuantity = (quantity, postId) => {
	return function (dispatch, getState, { history }) {
		api
			.put(`/carts`, { quantity, postId })
			.then(res => {
				console.log(res);
				dispatch(updateCart(postId, quantity));
			})
			.catch(err => {
				console.log(err.response);
			});
	};
};

export default handleActions(
	{
		[ADD_CART]: (state, action) =>
			produce(state, draft => {
				draft.list = action.payload.cart;
				draft.isLoading = false;
			}),
		[LOADING]: (state, action) =>
			produce(state, draft => {
				draft.isLoading = action.payload.isLoading;
			}),
		[SET_CART]: (state, action) =>
			produce(state, draft => {
				draft.cart_list = action.payload.cartList;
			}),
		[DELETE_CART]: (state, action) =>
			produce(state, draft => {
				let idx = draft.cart_list.findIndex(c => c.postId === action.payload.postId);
				draft.cart_list.splice(idx, 1);
			}),
		[UPDATE_CART]: (state, action) =>
			produce(state, draft => {
				let idx = draft.cart_list.findIndex(p => p.postId === action.payload.postId);
				console.log('action.payload.quantity');
				console.log(action.payload.quantity);
				draft.cart_list[idx] = { ...draft.cart_list[idx], quantity: action.payload.quantity };
			}),
	},
	initialState,
);

const actionCreators = {
	addCardMiddleWare,
	getCartAPI,
	deleteCartMddleWares,
	updateQuantity,
	updateCart,
};

export { actionCreators };