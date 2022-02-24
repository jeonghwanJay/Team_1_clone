import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { api } from '../../shared/api';

const GET_PRODUCTS = 'GET_PRODUCTS';
const LOADING = 'LOADING';

const BEST_PRODUCT = "BEST_PRODUCT";
const DISCOUNT_PRODUCT = "DISCOUNT_PRODUCT";

const getProducts = createAction(GET_PRODUCTS, products => ({
	products,
}));
const loading = createAction(LOADING, isLoading => ({
	isLoading,
}));

const bestProduct = createAction(BEST_PRODUCT, (post_list) => ({ post_list }));
const discountProduct = createAction(DISCOUNT_PRODUCT, (post_list) => ({post_list,}));

const initialState = {
	list: [],
	list2: [],
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

  const bestProductM = () => async (dispatch, getState) => {
	api
	  .get("page/sub/best")
	  .then((res) => {
		const best_data = res.data;
		const best_datas = best_data.sortByBest;
		let best_list = [];
  
		best_datas.forEach((doc) => {
		  best_list.push({ id: doc.id, ...doc });
		});
		dispatch(bestProduct(best_list));
	  })
	  .catch((err) => {
		console.log(err);
	  });
  };
  
  const discountProductM = () => async (dispatch, getState) => {
	api
	  .get("/page/sub/discount")
	  .then((res) => {
		const discount_data = res.data;
		const discount_datas = discount_data.sortByDis;
		let discount_list = [];
  
		discount_datas.forEach((doc) => {
		  discount_list.push({ id: doc.id, ...doc });
		});
		dispatch(discountProduct(discount_list));
	  })
	  .catch((err) => {
		console.log(err);
	  });
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
		[BEST_PRODUCT]: (state = initialState, action = {}) => {
				console.log("Best product 리듀서로 도착했습니다", state, action.payload);
				return { ...state, list: action.payload.post_list };
			  },
		  
		[DISCOUNT_PRODUCT]: (state = initialState, action = {}) => {
				return { ...state, list2: action.payload.post_list };
			  },
		
	},
	initialState,
);

const actionCreators = {
	getProducts,
	getProductsMiddleWare,
	bestProductM,
	discountProductM
};

export { actionCreators };