import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import RecipePage from './Pages/Recipe';
import './App.scss';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/recipe/:id">
            <RecipePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
