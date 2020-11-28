import React from 'react';
import { IFavorite, IRecipe } from '../../interfaces';
import RecipeItem from '../RecipeItem';
import './style.scss';

interface Props {
    favorites: IFavorite[];
    recipes: IRecipe[];
    removeFavorite: (id: number) => void;
}

function RecipeList({ favorites, recipes, removeFavorite }: Props) {
    return (
        <div className="recipe-list">
            {recipes.map((item, index) => {
                const favoriteFound = favorites.find(f => f.id === item.id);

                return (
                    <RecipeItem
                        key={index}
                        data={item}
                        isFavorite={Boolean(favoriteFound)}
                        removeFavorite={removeFavorite}
                    />
                )
            })}
        </div>
    );
}

export default RecipeList;