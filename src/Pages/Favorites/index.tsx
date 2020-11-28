import React from 'react';
import { IFavorite } from '../../interfaces';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    data: IFavorite[];
    removeFavorite: (id: number) => void;
}

function FavoritesPage({ data }: Props) {
    return (
        <div className="favorites-page">
            {data.length ?
                data.map((item, index) => (
                    <div key={index}>
                        <span>{item.name}</span>
                        <span>{item.preparationTime}</span>
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                ))
            :
                <p className="info-message">No recipe found in your favorites list.</p>
            }
        </div>
    );
}

export default FavoritesPage;