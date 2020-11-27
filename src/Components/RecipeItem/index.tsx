import React from 'react';
import { IRecipe } from '../../interfaces';
import { Link } from 'react-router-dom';
import './style.scss';

interface Props {
    data: IRecipe;
}

function RecipeItem({ data }: Props) {
    const { id, image, title } = data;

    return (
        <Link to={`/recipe/${id}`} className="recipe-item">
            <img className="recipe-img" src={image} alt={title}/>
            <p className="recipe-title">{title}</p>
        </Link>
    );
}

export default RecipeItem;