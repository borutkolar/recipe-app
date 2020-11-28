import React from 'react';
import './style.scss';

interface Props {
    data: any[];
    message: string;
}

function SimilarRecipes({ data, message }: Props) {
    const infoMessage = message || 'No similar recipes found.'

    return (
        <div className="similar-recipes">
            {data.length ?
                null
            :
                <p className="info-message">{infoMessage}</p>
            }
        </div>
    );
}

export default SimilarRecipes;