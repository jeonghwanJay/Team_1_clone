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
	list: [
		{
			title: '[올리타리아] 엑스트라 버진 올리브유',
			img: 'https://img-cf.kurly.com/shop/data/goods/1587519777879l0.jpg',
			price: 15000,
		},
	],
};

const getProductsMiddleWare = () => {
	return dispatch => {
		dispatch(loading(true));
		api
			.get('page/main/new')
			.then(
				res => {
					const products = res.data.post;
					dispatch(getProducts(products));
				},
				{ withCredentials: true },
			)
			.catch(err => {
				console.error(err);
				dispatch(loading(false));
			});
	};
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