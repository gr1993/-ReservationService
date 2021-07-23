import React from 'react';
import styled from 'styled-components';
import { Grid, Button, StylesProvider } from '@material-ui/core';

const StyledImg = styled.img`
  height: 36px;
`;
const StyledButtion = styled(Button)`
  margin-right: 5px;
  font-weight: bold;
`;

function Navigator(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <StyledImg alt="logo" src="img/logo.png" />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <StyledButtion variant="outlined">회원가입</StyledButtion>
            <StyledButtion variant="outlined">로그인</StyledButtion>
          </Grid>
        </Grid>
      </Grid>
    </StylesProvider>
  );
}

export default Navigator;
