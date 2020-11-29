import React from 'react';
import { IFavorite } from '../../interfaces';
import FavoritesList from '../../Components/FavoritesList';

interface Props {
    data: IFavorite[];
    removeFavorite: (id: number) => void;
}

function FavoritesPage({ data, removeFavorite }: Props) {
    return (
        <div className="favorites-page">
            {data.length ?
                <FavoritesList
                    data={data}
                    removeFavorite={removeFavorite}
                />
            :
                <p className="info-message">No recipe found on your favorites list.</p>
            }
        </div>
    );
}

export default FavoritesPage;