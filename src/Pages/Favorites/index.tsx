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
            <FavoritesList
                data={data}
                emptyListMessage="No recipe found on your favorites list."
                removeFavorite={removeFavorite}
            />
        </div>
    );
}

export default FavoritesPage;