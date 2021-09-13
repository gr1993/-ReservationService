import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const RegisterPage = (): JSX.Element => {
  const history = useHistory();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eslintError = '';
    return setPasswordCheck(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeMobile = (e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value);

  const register = async () => {
    if (!id || !password || !passwordCheck || !name || !mobile) {
      alert('위에 항목을 모두 입력하세요');
    } else if (password !== passwordCheck) {
      alert('패스워드와 확인이 일치하지 않습니다.');
    } else {
      const response = await axios.post('http://localhost:8080/member', {
        id,
        password,
        name,
        mobile,
      });

      alert(response.data.msg);
      if (response.data.success) {
        history.push('/login');
      }
    }
  };

  return (
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
          size="small"
          value={password}
          onChange={onChangePassword}
        />
        <TextField
          className="TextFieldStyle"
          id="passwordCheck"
          label="비밀번호 확인"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          size="small"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        <TextField
          className="TextFieldStyle"
          id="name"
          label="성함"
          variant="outlined"
          size="small"
          value={name}
          onChange={onChangeName}
        />
        <TextField
          className="TextFieldStyle"
          id="mobile"
          label="휴대폰 번호"
          variant="outlined"
          size="small"
          value={mobile}
          onChange={onChangeMobile}
        />
        <Button className="ButtonStyle" variant="contained" color="secondary" onClick={register}>
          가입하기
        </Button>
      </StyledRegisterDiv>
    </StyledMainDiv>
  );
};

export default RegisterPage;
