import React from 'react';
import { IFavorite, IRecipe } from '../../interfaces';
import RecipeItem from '../RecipeItem';
import './style.scss';

interface Props {
    favorites: IFavorite[];
    message: string;
    recipes: IRecipe[];
    removeFavorite: (id: number) => void;
}

function RecipeList({ favorites, message, recipes, removeFavorite }: Props) {
    return (
        <div data-testid="recipe-list" className="recipe-list">
            {recipes.length ?
                recipes.map((item, index) => {
                    const favoriteFound = favorites.find(f => f.id === item.id);
    
                    return (
                        <RecipeItem
                            key={index}
                            data={item}
                            isFavorite={Boolean(favoriteFound)}
                            removeFavorite={removeFavorite}
                        />
                    )
                })
            :
                <p className="info-message">{message}</p>
            }
        </div>
    );
}

export default RecipeList;