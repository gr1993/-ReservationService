import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from 'styled-components';

const StyledMainDiv = style.div`
  border-top: 1px solid rgba(190, 190, 190, .5);
`;
const StyledLoginDiv = style.div`
  margin: 80px auto;
  padding: 0px 30px 30px 30px;
  width: 400px;
  height: 400px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;

  img {
    margin: 30px 70px;
    width: 260px;
    height: 80px;
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

const LoginPage = (): JSX.Element => (
  <StyledMainDiv>
    <StyledLoginDiv>
      <img alt="logo" src="img/logo.png" />
      <TextField
        className="TextFieldStyle"
        id="id"
        label="아이디"
        variant="outlined"
      />
      <TextField
        className="TextFieldStyle"
        id="password"
        label="비밀번호"
        variant="outlined"
        type="password"
        autoComplete="current-password"
      />
      <Button className="ButtonStyle" variant="contained" color="primary">
        로그인
      </Button>
    </StyledLoginDiv>
  </StyledMainDiv>
);

export default LoginPage;
