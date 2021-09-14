import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { memberSelect, memberUpdate } from '../state/actions/memberAction';
import { RootReducerType } from '../state/store';

const StyledMainDiv = style.div`
  border-top: 1px solid rgba(190, 190, 190, .5);
`;
const StyledInfoDiv = style.div`
  margin: 80px auto;
  padding: 30px 30px 30px 30px;
  width: 400px;
  height: 420px;
  border: 1px solid rgba(190, 190, 190, 1);
  border-radius: 5px;

  .InfoText {
    margin-left: 130px;
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

const InfoPage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeMobile = (e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value);

  useEffect(() => {
    async function fetchMember() {
      if (!memberReducer.accessToken) {
        alert('로그인 후 이용이 가능합니다.');
        history.push('/login');
        return;
      }

      const response = await memberSelect(memberReducer.accessToken);
      if (response.success) {
        setId(response.data.id);
        setName(response.data.name);
        setMobile(response.data.mobile);
      }
    }
    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memberInfoModify = async () => {
    if (!name || !mobile) {
      alert('성함 또는 핸드폰 번호 항목을 모두 입력하세요');
    } else {
      const { accessToken } = memberReducer;
      if (!accessToken) {
        alert('로그인 후 이용이 가능합니다.');
        return;
      }

      const returnValue = await memberUpdate(accessToken, {
        password,
        name,
        mobile,
      });

      alert(returnValue.msg);
      if (returnValue.success) {
        history.push('/myinfo');
      }
    }
  };

  return (
    <StyledMainDiv>
      <StyledInfoDiv>
        <div className="InfoText">개인정보변경</div>
        <TextField
          className="TextFieldStyle"
          id="id"
          label="아이디"
          variant="outlined"
          size="small"
          value={id}
          disabled
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
        <Button className="ButtonStyle" variant="contained" color="primary" onClick={memberInfoModify}>
          변경하기
        </Button>
      </StyledInfoDiv>
    </StyledMainDiv>
  );
};

export default InfoPage;
