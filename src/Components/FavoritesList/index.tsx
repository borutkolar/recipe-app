import React from 'react';
import { IFavorite } from '../../interfaces';
import FavoriteItem from '../FavoriteItem';
import './style.scss';

interface Props {
    data: IFavorite[];
    removeFavorite: (id: number) => void;
}

function FavoritesList({ data, removeFavorite }: Props) {
    return (
        <div className="favorites-list">
            <h1>Your favorite recipes</h1>
            {data.map((item, index) => (
                <FavoriteItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    preparationTime={item.preparationTime}
                    removeFavorite={removeFavorite}
                />
            ))}
        </div>
    );
}

export default FavoritesList;