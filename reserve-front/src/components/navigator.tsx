import React from 'react';
import styled from 'styled-components';
import { Grid, Button, StylesProvider } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../state/store';
import { LOGOUT_SUCCESS } from '../state/actions/memberActionType';

const StyledImg = styled.img`
  height: 36px;
`;
const StyledButtion = styled(Button)`
  margin-right: 5px;
  font-weight: bold;
`;

function Navigator(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const logout = () => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    alert('로그아웃 처리되었습니다.');
  };

  return (
    <StylesProvider injectFirst>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <StyledImg alt="logo" src="img/logo.png" />
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
            {memberReducer.accessToken ? (
              <div>
                <Link to="/reserve" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">예매확인</StyledButtion>
                </Link>
                <Link to="/myinfo" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">정보수정</StyledButtion>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }} onClick={logout}>
                  <StyledButtion variant="outlined">로그아웃</StyledButtion>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">회원가입</StyledButtion>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">로그인</StyledButtion>
                </Link>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </StylesProvider>
  );
}

export default Navigator;
