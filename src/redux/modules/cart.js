import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { api } from '../../shared/api';
import instance from '../../shared/request';

const ADD_CART = 'ADD_CART';
const LOADING = 'LOADING';
const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';
const UPDATE_CART = 'UPDATE_CART';

const addCart = createAction(ADD_CART, (cart) => ({ cart }));
const setCart = createAction(SET_CART, (cartList) => ({ cartList }));
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
	carts_list: [],
	postId: 0,
	quantity: 0,
};

//CREATE
const addCardMiddleWare = (postId, quantity) => async (dispatch, getState) => {
	console.log(postId, quantity);
	// dispatch(loading(true));
	api
    .post(`/cart/${postId}`, {
		// postId: postId,
		quantity: quantity,
	  })
	  .then((res) => {
		console.log(res);
		dispatch(addCart(res.data));
		// dispatch(loading(false));
	  })
	  .catch((err) => {
		console.log(err);
	  });
  };

// const addCardMiddleWare = (title, currentPrice, img, quantity) => {
// 	return (dispatch, { history }) => {
// 		console.log('장바구니비동기요청');
// 		console.log(title, quantity);
// 		dispatch(loading(true));
// 		api
// 			.post(`/cart/:postId`, {
// 				title,
// 				currentPrice,
// 				img,
// 				quantity,
// 			})
// 			.then(res => {
// 				// const products = res.data.post;
// 				// dispatch(addCart(products));
// 				dispatch(loading(false));
// 				alert('장바구니에 상품을 담았습니다!');
// 			})
// 			.catch(err => {
// 				console.log(err.response);
// 				if (err.response.statusText === 'Unauthorized') {
// 					alert('오류로 인하여 장바구니에 상품을 담을 수 없습니다!');
// 					dispatch(loading(false));
// 					return;
// 				}
// 				alert(err.response.data.msg);
// 				dispatch(loading(false));
// 			});
// 	};
// };

const getCartAPI = () => async (dispatch, getState) => {
	api
    .get("/cart/")
	  .then((res) => {
		console.log(res);
		const cart_data = res.data.carts;
		console.log(cart_data);
		let cart_list = [];
  
		cart_data.forEach((doc) => {
		  cart_list.push({ id: doc.id, ...doc });
		});
		dispatch(setCart(cart_list));
	  })
	  .catch((err) => {
		console.log(err);
	  });
  };

// const getCartAPI = () => {
// 	return function (dispatch, getState, { history }) {
// 		// getToken();
// 		api
// 			.get(`/cart`)
// 			.then(res => {
// 				console.log(res);
// 				dispatch(setCart(res.data.cartAllList));
// 			})
// 			.catch(err => {
// 				console.log('err장바구니조회', err);
// 			});
// 	};
// };

//DELETE

//


//
const deleteCartMddleWares = (postId) => async (dispatch, getState) => {
		api
			.delete(`/cart/${postId}`, { 
				// postId: postId,
			 })
			.then(res => {
				console.log(res);
				dispatch(deleteCart(postId));
			})
			.catch(err => {
				console.log(err, '삭제에러임');
			});
	};

//UPDATE
// const updateQuantity = (quantity, postId) => async (dispatch, getState) => {
// 		api
// 			.put(`/cart/${postId}`, {
// 				 quantity: quantity, 
// 				//  postId: postId,
// 				 })
// 			.then(res => {
// 				console.log(res);
// 				dispatch(updateCart(postId, quantity));
// 			})
// 			.catch(err => {
// 				console.log(err.response);
// 			});
// 	};

const updateQuantityP = (quantity, postId) => async (dispatch, getState) => {
	api
		.put(`/cart/inc/${postId}`, {
				// quantity: quantity, 
			//  postId: postId,
				})
		.then(res => {
			console.log(res);
			dispatch(updateCart(postId, quantity));
		})
		.catch(err => {
			console.log(err.response);
		});
};

const updateQuantityM = (quantity, postId) => async (dispatch, getState) => {
	api
		.put(`/cart/dec/${postId}`, {
				// quantity: quantity, 
			//  postId: postId,
				})
		.then(res => {
			console.log(res);
			dispatch(updateCart(postId, quantity));
		})
		.catch(err => {
			console.log(err.response);
		});
};

export default handleActions(
	{
		// [ADD_CART]: (state, action) =>
		// 	produce(state, draft => {
		// 		draft.list = action.payload.cart;
		// 		draft.isLoading = false;
		// 	}),
		
		[ADD_CART]: (state, action) => {
			console.log("리듀서로 ADD_CART 가 도착했습니다.");
			const new_cart_list = [...state.list, action.payload.cart];
	  
			return { ...state, carts_list: new_cart_list };
		  },

		[LOADING]: (state, action) =>
			produce(state, draft => {
				draft.isLoading = action.payload.isLoading;
			}),
		// [SET_CART]: (state, action) =>
		// 	produce(state, draft => {
		// 		draft.cart_list = action.payload.cart_list;
		// 	}),
		[SET_CART]: (state = initialState, action = {}) => {
			console.log("LOAD_CART 리듀서로 도착했습니다", state, action.payload);
			return { ...state, cart_list: action.payload.cartList };
		  },
		

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
	// updateQuantity,
	updateQuantityM,
	updateQuantityP,
	updateCart,
	
};

export { actionCreators };