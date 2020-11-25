import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './Home';
import RecipePage from './Recipe';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/recipe/:id">
          <RecipePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
