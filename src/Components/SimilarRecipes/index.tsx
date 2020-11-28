import React from 'react';
import { IFavorite } from '../../interfaces';
import FavoriteItem from '../FavoriteItem';
import './style.scss';

interface Props {
    data: IFavorite[];
    favorites: IFavorite[];
    message: string;
    removeFavorite: (id: number) => void;
}

function SimilarRecipes({ data, favorites, message, removeFavorite }: Props) {
    const infoMessage = message || 'No similar recipes found.'

    return (
        <div className="similar-recipes">
            {data.length ?
                <div className="similar-recipes-container">
                    <h3>Similar recipes</h3>
                    {data.map((item, index) => {
                        const favoriteFound = favorites.find(f => f.id === item.id);
                        const isFavorite = Boolean(favoriteFound);
                        
                        return (
                            <FavoriteItem
                                key={index}
                                data={item}
                                isFavorite={isFavorite}
                                removeFavorite={removeFavorite}
                            />
                        )
                    })}
                </div>
            :
                <p className="info-message">{infoMessage}</p>
            }
        </div>
    );
}

export default SimilarRecipes;