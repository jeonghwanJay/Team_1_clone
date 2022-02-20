
   
// 리덕스

// 1.import
// 첫째,createAction와 handleActions는 Action과 리듀서를 편하게 만들어준다.
import { createAction, handleActions } from 'redux-actions';
// 둘째, immer를 가지고와야 불변성관리가 편하다.
import { produce } from 'immer';
import { api } from '../../shared/api';

// 2. actions(액션타입)
// 첫째, 로그아웃 정보를 가지고 온다.
const LOG_OUT = 'LOG_OUT';
// 둘째, 유저정보를 가져온다.
const SET_USER = 'SET_USER';

// 3. action creator(액션 생성 함수들)
// 첫째, createAction사용해서 LOG_IN타입을 넘겨준다. ()안에는 파라미터 값 즉 정보를 주고 user값을 넘겨준다.
const setUser = createAction(SET_USER, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));

// 4. initialState(초기값)을 잡아준다.
const initialState = {
	user: null,
	is_login: false,
};

// 회원가입
const signupAPI = (id, pw, passwordConfirm, email, name) => {
	return function (dispatch, getState, { history }) {
		console.log('아이디', id);
		console.log('비밀번호', pw);
		console.log('비밀번호확인', passwordConfirm);
		console.log('이메일', email);
		console.log('이름', name);
		api
			.post('/user/join', {
				userId: id,
				password: pw,
				passwordConfirm: passwordConfirm,
				email: email,
				name: name,
			})
			.then(res => {
				window.alert('회원가입이 되었습니다!');
				history.push('/user/login');
			})
			.catch(err => {
				console.log(err.response);
				if (err.response.data.msg) {
					alert(err.response.data.msg);
				}
			});
	};
};

// 로그인
const loginAPI = (id, pw) => {
	return function (dispatch, getState, { history }) {
		console.log(id, pw);
		api
			.post('/user/login', {
				userId: id,
				password: pw,
			})
			.then(res => {
				console.log(res);
				localStorage.setItem('token', res.data.token);
				const base64Payload = res.data.token.split('.')[1];
				const payload = Buffer.from(base64Payload, 'base64');
				const result = JSON.parse(payload.toString());
				localStorage.setItem('userInfo', result.userId);
				dispatch(
					setUser({
						name: result.userId,
					}),
				);
				history.push('page/main/new');
			})
			.catch(err => {
				alert(err.response.data.msg);
			});
	};
};

// 로그아웃
const logout = () => {
	return function (dispatch, getState, { history }) {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		dispatch(logOut());
		history.replace('page/main/new');
	};
};

const isLogin = () => {
	return function (dispatch, getState, { history }) {
		const token = localStorage.getItem('token');
		const userInfo = localStorage.getItem('userInfo');

		if (!token || !userInfo) {
			return false;
		}
		dispatch(
			setUser({
				name: userInfo,
			}),
		);
	};
};

// 5. reducer(리듀서)
export default handleActions(
	{
		[SET_USER]: (state, action) =>
			produce(state, draft => {
				draft.user = action.payload.user;
				draft.is_login = true;
			}),
		[LOG_OUT]: (state, action) =>
			produce(state, draft => {
				draft.user = null;
				draft.is_login = false;
			}),
	},
	initialState,
);

// 6. action creator export
// 액션생성함수를 내보낸다.
const actionCreators = {
	signupAPI,
	loginAPI,
	logout,
	isLogin,
};

export { actionCreators };