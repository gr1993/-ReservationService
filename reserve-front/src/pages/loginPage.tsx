import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { memberLogin } from '../state/actions/memberAction';
import { LOGIN_SUCCESS } from '../state/actions/memberActionType';

const StyledMainDiv = style.div`
  border-top: 1px solid rgba(190, 190, 190, .5);
`;
const StyledLoginDiv = style.div`
  margin: 80px auto;
  padding: 0px 30px 30px 30px;
  width: 400px;
  height: 430px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;

  img {
    margin: 30px 70px 0px 70px;
    width: 260px;
    height: 80px;
  }
  .ToginText {
    margin-left: 160px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 1.5em;
    color: #005BAC;
  }
  .TextFieldStyle {
    margin: 10px 0px;
    width: 100%;
  }
  .ButtonStyle {
    margin-top: 10px;
    width: 100%;
    height: 80px;
    font-size: 25px;
  }
`;

const LoginPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const login = async () => {
    if (!id || !password) {
      alert('위에 항목을 모두 입력하세요');
    } else {
      const returnValue = await memberLogin({
        id,
        password,
      });

      console.log(returnValue);
      alert(returnValue.msg);
      if (returnValue.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: returnValue.data.accessToken,
        });
        history.push('/');
      }
    }
  };

  return (
    <StyledMainDiv>
      <StyledLoginDiv>
        <img alt="logo" src="img/logo.png" />
        <div className="ToginText">로그인</div>
        <TextField
          className="TextFieldStyle"
          id="id"
          label="아이디"
          variant="outlined"
          value={id}
          onChange={onChangeId}
        />
        <TextField
          className="TextFieldStyle"
          id="password"
          label="비밀번호"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={onChangePassword}
        />
        <Button className="ButtonStyle" variant="contained" color="primary" onClick={login}>
          로그인
        </Button>
      </StyledLoginDiv>
    </StyledMainDiv>
  );
};

export default LoginPage;
