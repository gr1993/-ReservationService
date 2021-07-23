import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Navigator from './components/navigator';
import MainPage from './pages/mainPage';
import EmptyPage from './pages/emptyPage';

const StyledDiv = styled.div`
  width: 100%;
  max-width: 1024px;
  @media only screen and (min-width: 1024px) {
    margin:0px auto;
  }
`;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <StyledDiv>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Navigator />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route>
                <EmptyPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
