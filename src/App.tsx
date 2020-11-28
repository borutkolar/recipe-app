import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomePage from './Pages/Home';
import RecipePage from './Pages/Recipe';
import { IFavorite } from './interfaces';
import FavoritesPage from './Pages/Favorites';
import { GiForkKnifeSpoon } from 'react-icons/gi'
import './App.scss';

const localStorageKey = 'favorites';

const localStorageFavorites = localStorage.getItem(localStorageKey);
const initialFavoritesState = (localStorageFavorites && JSON.parse(localStorageFavorites)) || [];

function App() {
  const [favorites, setFavorites] = useState<IFavorite[]>(initialFavoritesState);

  const addFavorite = (item: IFavorite) => {
    setFavorites(currentValue => {
      const newFavorites = [...currentValue, item];
      setLocalStorageFavorites(newFavorites);
      return newFavorites;
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites(currentValue => {
      const newFavorites = currentValue.filter(c => c.id !== id);
      setLocalStorageFavorites(newFavorites);
      return newFavorites;
    })
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <Link to="/" className="app-title">
          <GiForkKnifeSpoon/>
          <h1>RECIPE APP</h1>
        </Link>
        <Switch>
          <Route path="/" exact>
            <HomePage
              favorites={favorites}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/recipe/:id">
            <RecipePage
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/favorites">
            <FavoritesPage
              data={favorites}
              removeFavorite={removeFavorite}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

const setLocalStorageFavorites = (data: IFavorite[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}
