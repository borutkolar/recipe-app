import React from 'react';
import { IFavorite } from '../../interfaces';
import { CgTimer } from 'react-icons/cg'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import './style.scss';

interface Props {
    data: IFavorite;
    removeFavorite: (id: number) => void;
}

function FavoriteItem({ data, removeFavorite }: Props) {
    const { id, name, preparationTime } = data;

    const onFavoriteClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event.preventDefault();
        removeFavorite(id);
    }

    return (
        <Link to={`/recipe/${id}`} className="favorite-item">
            <div className="recipe-data">
                <p>{name}</p>
                <div className="preparation-time">
                    <CgTimer/>
                    <span>{`${preparationTime} minutes`}</span>
                </div>
            </div>
            <AiFillStar className="favorite-icon" onClick={onFavoriteClick}/>
        </Link>
    );
}

export default FavoriteItem;