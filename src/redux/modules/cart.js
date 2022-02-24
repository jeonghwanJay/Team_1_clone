import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { api } from '../../shared/api';

const ADD_CART = 'ADD_CART';
const LOADING = 'LOADING';
const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';
const UPDATE_CART = 'UPDATE_CART';

const addCart = createAction(ADD_CART, (cart) => ({ cart }));
const setCart = createAction(SET_CART, (cartList) => ({ cartList }));
const deleteCart = createAction(DELETE_CART, postId => ({ postId }));
const updateCart = createAction(UPDATE_CART, (postId, quantity) => ({postId,quantity}));

const initialState = {
	cart_list: [],
	carts_list: [],
	postId: 0,
	quantity: 0,
};

	//CREATE
const addCardMiddleWare = (postId, quantity) => async (dispatch) => {
	console.log(postId, quantity);
	api
    .post(`/cart/${postId}`, {
		quantity: quantity,
	  })

	  .then((res) => {
		console.log(res);
		dispatch(addCart(res.data));
	  })

	  .catch((err) => {
		console.log(err);
	  });
  };

  	//READ
const getCartAPI = () => async (dispatch) => {
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

  	//UPDATE
const updateQuantityP = (quantity, postId) => async (dispatch) => {
	api
		.put(`/cart/inc/${postId}`, {
				})

		.then(res => {
			console.log(res);
			dispatch(updateCart(postId, quantity));
		})

		.catch(err => {
			console.log(err.response);
		});
};

const updateQuantityM = (quantity, postId) => async (dispatch) => {
	api
		.put(`/cart/dec/${postId}`, {
				})

		.then(res => {
			console.log(res);
			dispatch(updateCart(postId, quantity));
		})

		.catch(err => {
			console.log(err.response);
		});
};

const deleteCartMddleWares = (postId) => async (dispatch) => {
	api
		.delete(`/cart/${postId}`, { 
		 		})

		.then(res => {
			console.log(res);
			dispatch(deleteCart(postId));
		})

		.catch(err => {
			console.log(err, '삭제에러임');
		});
};

	//REDUCER
export default handleActions(
	{
		[ADD_CART]: (state, action) => {
			console.log("리듀서로 ADD_CART 가 도착했습니다.");
			const new_cart_list = [...state.list, action.payload.cart];
	  
			return { ...state, carts_list: new_cart_list };
		  },
		
		[LOADING]: (state, action) =>
		  produce(state, draft => {
			  draft.isLoading = action.payload.isLoading;
		}),

		[SET_CART]: (state = initialState, action = {}) => {
			console.log("리듀서로 SET_CART 도착했습니다", state, action.payload);
			return { ...state, cart_list: action.payload.cartList };
		  },
		
		[UPDATE_CART]: (state, action) =>
		produce(state, draft => {
			let idx = draft.cart_list.findIndex(p => p.postId === action.payload.postId);
			console.log('action.payload.quantity');
			console.log(action.payload.quantity);
			draft.cart_list[idx] = { ...draft.cart_list[idx], quantity: action.payload.quantity };
		}),

		[DELETE_CART]: (state, action) =>
			produce(state, draft => {
				let idx = draft.cart_list.findIndex(c => c.postId === action.payload.postId);
				draft.cart_list.splice(idx, 1);
			}),		
	},
	initialState,
);

const actionCreators = {
	addCardMiddleWare,
	getCartAPI,
	deleteCartMddleWares,
	updateQuantityM,
	updateQuantityP,
	updateCart,
	
};

export { actionCreators };