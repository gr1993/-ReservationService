import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Navigator from './components/navigator';
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import InfoPage from './pages/infoPage';
import EmptyPage from './pages/emptyPage';

const StyledMainDiv = styled.div`
  width: 100%;
  max-width: 1024px;
  @media only screen and (min-width: 1024px) {
    margin:0px auto;
  }
`;
const StyledHeaderDiv = styled.div`
  margin: 10px 0px;
`;
const StyledContentDiv = styled.div`
`;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <StyledMainDiv>
        <StyledHeaderDiv>
          <Navigator />
        </StyledHeaderDiv>
        <StyledContentDiv>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/myinfo">
              <InfoPage />
            </Route>
            <Route>
              <EmptyPage />
            </Route>
          </Switch>
        </StyledContentDiv>
      </StyledMainDiv>
    </BrowserRouter>
  );
}

export default App;
