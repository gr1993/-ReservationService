import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigator from './components/navigator';
import MainPage from './pages/mainPage';
import EmptyPage from './pages/emptyPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigator />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
