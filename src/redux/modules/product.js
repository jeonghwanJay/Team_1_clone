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
	list: [],
	isLoading: false,
};

	// 메인페이지 제품들 보여주기
const getProductsMiddleWare = () => {
	return function (dispatch) {
	  
	  dispatch(loading(true));
  
	  api
	  	.get('/page/main/new')
		.then((result) => {
		  console.log(result.data.sortByNew)
		  
		  const sort = result.data.sortByNew
			
		  let products = [];

		  sort.forEach((p) => {
			
			let product = {
			  postId: p.postId,
			  title: p.title,
			  price: p.price,
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