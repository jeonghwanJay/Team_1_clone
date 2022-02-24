import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text, Input, Button } from '../elements/index';
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { pwMacth, emailCheck } from '../shared/common';
import { api } from '../shared/api';

const Signup = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [emailDup, setEmailDup] = useState(false);
	const dispatch = useDispatch();

	const changeId = e => {
		setEmail(e.target.value);
	};
	console.log('아이디', email);
	console.log('비밀번호', password);
	console.log('비밀번호확인', confirmpassword);
	console.log('이름', name);

	const changePw = e => {
		const targetPw = e.target.value;
		setPassword(targetPw);
	};

	const changePwCheck = e => {
		const targetPwCheck = e.target.value;
		setConfirmPassword(targetPwCheck)
	};

	const changeName = e => {
		const targetName = e.target.value;
		setName(targetName)
	}

	const checkIdAPI = email => {
		api
			.post('/user/join/check', {
				email: email,
			})
			.then(res => {
				setEmailDup(true);
				alert('사용가능한 아이디 입니다.');
			})
			.catch(err => {
				alert(err.response.data.errorMessage);
			});
	};

	const signUp = () => {
		if (email === '' || password === '' || confirmpassword === '' || name === '') {
			alert('필수 입력사항을 모두 입력해주세요!');
			return false;
		}

		if (emailDup === false) {
			alert('아이디 중복확인을 해주세요.');
			return false;
		}

		if (!pwMacth(password)) {
			alert('비밀번호의 형식을 맞춰 입력해주세요. ');
			return;
		}

		if (password !== confirmpassword) {
			alert('동일한 비밀번호를 입력해주세요.');
			return;
		}

		if (name === '') {
			alert('이름을(를) 입력해주세요.');
			return false;
		}

		dispatch(userActions.signupAPI(email, password, confirmpassword, name));
	};
	return (
		<React.Fragment>
			<SignupWrap>
				<Text bold size="30px">
					회원가입
				</Text>
				<RightWrap>
					<Text size="12px" color="#666666">
						<CheckSpan>*</CheckSpan>필수입력사항
					</Text>
				</RightWrap>
				<Line />
				<SignTable>
					<tbody>
						<tr>
							<td>
								아이디<CheckSpan>*</CheckSpan>
							</td>
							<td>
								<Grid flex width="460px">
									<Input
										placeholder="예: marketCurly@Curly.com"
										padding="14px"
										width="332px"
										onClick={() => {}}
										onChange={e => {
											changeId(e);
										}}
									/>
									<Button
										size="14px"
										bg="#ffffff"
										color="#5f0080"
										width="120px"
										padding="11px 14px"
										onClick={() => {
											if (!emailCheck(email)) {
												alert('잘못된 이메일 형식입니다.');
												return false;
											}
											checkIdAPI(email);
										}}
									>
										중복확인
									</Button>
								</Grid>
							</td>
						</tr>
						<tr>
							<td>
								비밀번호<CheckSpan>*</CheckSpan>
							</td>
							<td>
								<Grid flex>
									<Input
										placeholder="비밀번호를 입력해주세요"
										type="password"
										padding="14px"
										width="332px"
										onClick={() => {}}
										onChange={e => {
											changePw(e);
										}}
									/>
								</Grid>
								<InfoUl className="checkPw">
									<li>·10글자 이상 입력</li>
									<li>·영문/숫자/특수문자(공백 제외)만 허용, 3개 이상의 조합</li>
								</InfoUl>
							</td>
						</tr>
						<tr>
							<td>
								비밀번호확인<CheckSpan>*</CheckSpan>
							</td>
							<td>
								<Grid flex>
									<Input
										placeholder="비밀번호를 한번 더 입력해주세요"
										type="password"
										padding="14px"
										width="332px"
										onClick={() => {}}
										onChange={e => {
											changePwCheck(e);
										}}
									/>
								</Grid>
							</td>
						</tr>
						<tr>
							<td>
								이름<CheckSpan>*</CheckSpan>
							</td>
							<td>
								<Grid>
									<Input
										placeholder="이름을 입력해주세요."
										padding="14px"
										width="332px"
										onChange={e => {
											changeName(e);
										}}
									/>
								</Grid>
							</td>
						</tr>
					</tbody>
				</SignTable>
				<Button width="240px" onClick={signUp}>
					가입하기
				</Button>
			</SignupWrap>
		</React.Fragment>
	);
};

const SignupWrap = styled.div`
	width: 640px;
	display: flex;
	align-items: center;
	margin: 0 auto;
	justify-content: center;
	flex-direction: column;
	padding: 64px 0px 120px 0px;
`;

const CheckSpan = styled.span`
	color: #ee6a7b;
`;

const Line = styled.span`
	display: block;
	width: 100%;
	height: 2px;
	background-color: #333333;
	margin-top: 10px;
`;

const RightWrap = styled.div`
	text-align: right;
	width: 100%;
	margin: 23px 0px 0px 0px;
`;

const SignTable = styled.table`
	margin-top: 15px;
	padding-bottom: 49px;
	width: 100%;
	& tr {
		text-align: left;
		font-size: 14px;
		font-weight: 500;
	}
	& td {
		position: relative;
		padding-bottom: 16px;
	}
	& td:nth-child(1) {
		box-sizing: border-box;
		padding: 15px 0px 0px 18px;
		width: 152px;
		vertical-align: top;
	}
`;
const InfoUl = styled.ul`
	font-size: 12px;
	color: #666666;
	position: relative;
	left: -40px;
	font-weight: 400;
	list-style: none;
`;

export default Signup;