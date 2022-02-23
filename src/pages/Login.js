import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid, Text, Input, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {

    if (email === "" || password === "") {
      console.log("아이디 혹은 비밀번호를 입력해주세요.");

      return;
    }

    console.log(email, password, "의 로그인 요청을 dispatch 했습니다.");

    dispatch(userActions.loginAPI(email, password));
  };

  return (
    <React.Fragment>
      <LoginWrap>
        <Text size="20px" bold margin="0px 0px 30px 0px">
          로그인
        </Text>
        <Input
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          margin="10px 0px"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Grid flex width="340px" margin="-15px 0px 0px 0px">
          <Grid flex>
            <input type="checkbox" name="check" />
            <Text size="13px">보안접속</Text>
          </Grid>
          <Grid>
            <FindIdPw>
              <FindLi>아이디찾기</FindLi>
              <FindLi>비밀번호 찾기</FindLi>
            </FindIdPw>
          </Grid>
        </Grid>
        <Button
          margin="17px 0px 0px 0px"
          onClick={() => {
            login(email, password);
          }}
        >
          로그인
        </Button>
        <Button
          margin="10px"
          bg="#ffffff"
          color="#5f0080"
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Button>
      </LoginWrap>
    </React.Fragment>
  );
};

const LoginWrap = styled.div`
  width: 340px;
  margin: -50px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 90px 0px 120px 0px;
`;

const FindIdPw = styled.ul`
  font-size: 13px;
  display: flex;
  gap: 5px;
  & li:nth-child(1)::after {
    content: "|";
    font-size: 6px;
    font-weight: 600;
    margin-left: 5px;
    position: relative;
    top: -2px;
  }
`;

const FindLi = styled.li`
  list-style: none;
`;

export default Login;
