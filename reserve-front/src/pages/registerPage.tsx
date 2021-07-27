import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from 'styled-components';

const StyledMainDiv = style.div`
  border-top: 1px solid rgba(190, 190, 190, .5);
`;
const StyledRegisterDiv = style.div`
  margin: 80px auto;
  padding: 0px 30px 30px 30px;
  width: 400px;
  height: 570px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;

  img {
    margin: 30px 70px 0px 70px;
    width: 260px;
    height: 80px;
  }
  .ToginText {
    margin-left: 150px;
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

const RegisterPage = (): JSX.Element => (
  <StyledMainDiv>
    <StyledRegisterDiv>
      <img alt="logo" src="img/logo.png" />
      <div className="ToginText">회원가입</div>
      <TextField
        className="TextFieldStyle"
        id="id"
        label="아이디"
        variant="outlined"
        size="small"
      />
      <TextField
        className="TextFieldStyle"
        id="password"
        label="비밀번호"
        variant="outlined"
        type="password"
        autoComplete="current-password"
        size="small"
      />
      <TextField
        className="TextFieldStyle"
        id="password"
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        autoComplete="current-password"
        size="small"
      />
      <TextField
        className="TextFieldStyle"
        id="id"
        label="성함"
        variant="outlined"
        size="small"
      />
      <TextField
        className="TextFieldStyle"
        id="id"
        label="휴대폰 번호"
        variant="outlined"
        size="small"
      />
      <Button className="ButtonStyle" variant="contained" color="secondary">
        가입하기
      </Button>
    </StyledRegisterDiv>
  </StyledMainDiv>
);

export default RegisterPage;
