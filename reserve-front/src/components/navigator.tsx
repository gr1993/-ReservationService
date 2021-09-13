import React from 'react';
import styled from 'styled-components';
import { Grid, Button, StylesProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../state/store';

const StyledImg = styled.img`
  height: 36px;
`;
const StyledButtion = styled(Button)`
  margin-right: 5px;
  font-weight: bold;
`;

function Navigator(): JSX.Element {
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

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
            {memberReducer.isLogin ? (
              <div>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">예매확인</StyledButtion>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <StyledButtion variant="outlined">정보수정</StyledButtion>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
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
