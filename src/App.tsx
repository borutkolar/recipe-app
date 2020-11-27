import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomePage from './Pages/Home';
import RecipePage from './Pages/Recipe';
import { IFavorite } from './interfaces';
import FavoritesPage from './Pages/Favorites';
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const localStorageFavorites = localStorage.getItem('favorites');
const initialFavoritesState = (localStorageFavorites && JSON.parse(localStorageFavorites)) || [];

function App() {
  const [favorites, setFavorites] = useState<IFavorite[]>(initialFavoritesState);

  const addFavorite = (item: IFavorite) => {
    setFavorites(currentValue => {
      const newFavorites = [...currentValue, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    })
  }

  const removeFavorite = (name: string) => {
    setFavorites(currentValue => {
      const newFavorites = currentValue.filter(c => c.name !== name);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    })
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <Link to="/" className="app-title">
          <FontAwesomeIcon icon={faUtensils}/>
          <h1>RECIPE APP</h1>
        </Link>
        <Switch>
          <Route path="/" exact>
            <HomePage
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/recipe/:id">
            <RecipePage />
          </Route>
          <Route path="/favorites">
            <FavoritesPage
              data={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
