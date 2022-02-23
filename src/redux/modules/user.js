import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { api } from '../../shared/api';
import { setCookie } from '../../shared/Token';

const LOGIN = 'LOGIN';
const LOG_OUT = 'LOG_OUT';
const SET_USER = 'SET_USER';

const setUser = createAction(SET_USER, user => ({ user }));
const setLogin = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));

const initialState = {
	user: [],
	is_login: false,
};

	// 회원가입
const signupAPI = (email, password, confirmpassword, name) => {
	return function (dispatch, getState, { history }) {

		console.log('아이디', email);
		console.log('비밀번호', password);
		console.log('이름', name);
		api
			.post('/user/join', {

				email: email,
				password: password,
				confirmpassword: confirmpassword,
				name: name,
				
			})
			.then(res => {
				window.alert('회원가입이 되었습니다!');
				history.push('/');
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
const loginAPI =
  (email, password) =>
  async (dispatch, getState, { history }) => {
    api
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("로그인성공", res);

        const _auth = res.data.token;
        const _cookie = _auth;

        setCookie("token", _cookie, 7);
        localStorage.setItem("token", _cookie);

        dispatch(
          setLogin({
            email: email,
          })
        );
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

	// 로그아웃
const logout = () => {
	return function (dispatch, getState, { history }) {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		dispatch(logOut());
		history.replace('/');
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

	// 리듀서
export default handleActions(
	{	
		[LOGIN]: (state, action) =>
      		produce(state, (draft) => {
        console.log("LOGIN 리듀서로 도착했습니다", state, action.payload);
        		draft.user = action.payload.user;
				draft.is_login = true;
      }),
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

const actionCreators = {
	signupAPI,
	loginAPI,
	logout,
	isLogin,
};

export { actionCreators };