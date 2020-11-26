import React from 'react';
import { IRecipe } from '../../interfaces';
import './style.scss';

interface Props {
    data: IRecipe;
}

function RecipeItem({ data }: Props) {
    const { image, title } = data;

    return (
        <div className="recipe-item">
            <img className="recipe-img" src={image} alt={title}/>
            <p className="recipe-title">{title}</p>
        </div>
    );
}

export default RecipeItem;