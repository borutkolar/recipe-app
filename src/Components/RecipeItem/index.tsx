import React from 'react';
import { IRecipe } from '../../interfaces';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import './style.scss';

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
        <Link
            to={`/recipe/${id}`}
            className="recipe-item with-box-shadow with-hover-scale"
            data-testid="recipe-item"
        >
            <img className="recipe-img" src={image} alt={title}/>
            <div className="recipe-title">
                <span>{title}</span>
                {isFavorite &&
                    <AiFillStar data-testid="recipe-favorite" onClick={onFavoriteClick}/>
                }
            </div>
        </Link>
    );
}

export default RecipeItem;