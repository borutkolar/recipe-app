import React from 'react';
import { IRecipe } from '../../interfaces';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    data: IRecipe;
    isFavorite: boolean;
    removeFavorite: (id: number) => void;
}

function RecipeItem({ data, isFavorite, removeFavorite }: Props) {
    const { id, image, title } = data;

    const onFavoriteClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        removeFavorite(id);
    }

    return (
        <Link to={`/recipe/${id}`} className="recipe-item">
            <img className="recipe-img" src={image} alt={title}/>
            <div className="recipe-title">
                <span>{title}</span>
                {isFavorite &&
                    <FontAwesomeIcon icon={faStar} onClick={onFavoriteClick}/>
                }
            </div>
        </Link>
    );
}

export default RecipeItem;