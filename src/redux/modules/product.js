// import { createAction, handleActions } from 'redux-actions';
// import { produce } from 'immer';

// import { api } from '../../shared/api';

// const GET_PRODUCTS = 'GET_PRODUCTS';
// const LOADING = 'LOADING';

// const getProducts = createAction(GET_PRODUCTS, products => ({
// 	products,
// }));
// const loading = createAction(LOADING, isLoading => ({
// 	isLoading,
// }));

// const initialState = {
// 	products: [],
// 	isLoading: false,
// 	// list: [
// 	// 	{	
// 	// 		postId: "postId",
// 	// 		title: '[올리타리아] 엑스트라 버진 올리브유',
// 	// 		img: 'https://img-cf.kurly.com/shop/data/goods/1587519777879l0.jpg',
// 	// 		price: 15000,
// 	// 	},
// 	// ]
// };

// const getProductsMiddleWare = () => {
// 	return function (dispatch, getState, { history }) {
// 		dispatch(loading(true));
// 		api
// 			.get('page/main/new')
// 			.then(
// 				(res) => {
// 					// const products = res.data;
// 					// const products = res.data.post;
// 					// const products = res.data.list
// 					let products = [];
// 					res.forEach((p)=>{
// 						let product = {
// 							postId: p.postId,
// 							title: p.title,
// 							price: p.price,
// 							img: p.img,
// 						}
// 					products.push(product);
// 					})
// 					dispatch(getProducts(products));
// 				},
// 				// { withCredentials: true },
// 			)
// 			.catch(err => {
// 				console.error(err);
// 				dispatch(loading(false));
// 			});
// 	};

// 	// return function(dispatch) {
// 	// 	api 
// 	// 	.get('/page/main/new')
// 	// 	.then(res=>{
		  
// 	// 		dispatch(getProducts(res.data));
// 	// 	})
// 	// 	.catch(err=> console.log(err));
// 	// }
// };

// export default handleActions(
// 	{
// 		[GET_PRODUCTS]: (state, action) =>
// 			produce(state, draft => {
// 				draft.list = action.payload.products;
// 				// draft.sortByNew = action.payload.products;
// 				draft.isLoading = false;
// 			}),
// 		[LOADING]: (state, action) =>
// 			produce(state, draft => {
// 				draft.isLoading = action.payload.isLoading;
// 			}),
// 	},
// 	initialState,
// );

// const actionCreators = {
// 	getProducts,
// 	getProductsMiddleWare,
// };

// export { actionCreators };

import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { api } from '../../shared/api';

const GET_PRODUCTS = 'GET_PRODUCTS';
const LOADING = 'LOADING';

const getProducts = createAction(GET_PRODUCTS, products => ({
	products,
}));
const loading = createAction(LOADING, isLoading => ({
	isLoading,
}));

const initialState = {
	// list: [
	// 	{	
	// 		postId: 'postId',
	// 		title: '[올리타리아] 엑스트라 버진 올리브유',
	// 		img: 'https://img-cf.kurly.com/shop/data/goods/1587519777879l0.jpg',
	// 		price: 15000,
	// 	},
	// ],
	list: [],
	isLoading: false,
};

// const getProductsMiddleWare = () => {
// 	return dispatch => {
// 		dispatch(loading(true));
// 		api
// 			.get('/page/main/new')
// 			.then(
// 				res => {
// 					const products = res.data.post;
// 					dispatch(getProducts(products));
// 				},
// 				{ withCredentials: true },
// 			)
// 			.catch(err => {
// 				console.error(err);
// 				dispatch(loading(false));
// 			});
// 	};
// };

const getProductsMiddleWare = () => {
	return function (dispatch, getState, { history }) {
	  
	  dispatch(loading(true));
  
	  api
	  	.get('/page/main/new')
	//   fetch(API).then((response) => response.json())
		.then((result) => {
		  console.log(result.data.sortByNew)
		  
		  const sort = result.data.sortByNew
			
		  let products = [];

		  sort.forEach((p) => {
			
			let product = {
			  postId: p.postId,
			  title: p.title,
			  price: p.price,
			//   subtext: p.subtext,
			  img:p.img,
			}
		  products.push(product);
		  });
		  dispatch(getProducts(products));
		})
	}
  };

export default handleActions(
	{
		[GET_PRODUCTS]: (state, action) =>
			produce(state, draft => {
				draft.list = action.payload.products;
				draft.isLoading = false;
			}),
		[LOADING]: (state, action) =>
			produce(state, draft => {
				draft.isLoading = action.payload.isLoading;
			}),
	},
	initialState,
);

const actionCreators = {
	getProducts,
	getProductsMiddleWare,
};

export { actionCreators };