import React from 'react';
import { IRecipe } from '../../interfaces';
import RecipeItem from '../RecipeItem';
import './style.scss';

interface Props {
    recipes: IRecipe[];
}

function RecipeList({ recipes }: Props) {
    return (
        <div className="recipe-list">
            {recipes.map((item, index) => (
                <RecipeItem
                    key={index}
                    data={item}
                />
            ))}
        </div>
    );
}

export default RecipeList;