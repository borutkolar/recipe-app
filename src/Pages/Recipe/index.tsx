import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IFavorite, IRecipeInformation } from '../../interfaces';
import Loading from '../../Components/Loading';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

interface Props extends RouteComponentProps<{ id: string }> {
    favorites: IFavorite[];
    addFavorite: (item: IFavorite) => void;
    removeFavorite: (id: number) => void;
}

function RecipePage({ favorites, match, addFavorite, removeFavorite }: Props) {
    const [recipeInformation, setRecipeInformation] = useState<IRecipeInformation | null>(null);
    const [message, setMessage] = useState<string>('');

    const fetchRecipeInformation = async () => {
        try {
            const recipeInformationRequest = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/information?apiKey=${API_KEY}`);
            if (recipeInformationRequest.data && recipeInformationRequest.data.id) {
                setRecipeInformation(recipeInformationRequest.data)
            }
        } catch(e) {
            setMessage('Failed to fetch recipe information.')
        }
    }

    const fetchSimilarRecipes = async () => {
        try {
            // const similarRecipesRequest = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/similar?apiKey=${API_KEY}`);
            // console.log(similarRecipesRequest.data);
            // if (recipeInformationRequest.data && recipeInformationRequest.data.id) {
            //     setRecipeInformation(recipeInformationRequest.data)
            // }
        } catch(e) {
            // setMessage('Failed to fetch recipe information.')
        }
    }
    
    useEffect(() => {
        fetchRecipeInformation();
        fetchSimilarRecipes();
    }, []);

    const favoriteElement = (recipeInformation && favorites.find(f => f.id === recipeInformation.id)) ? (
        <div
            className="favorite-text is-favorite"
            onClick={() => addFavorite({ id: recipeInformation.id, name: recipeInformation.title, preparationTime: recipeInformation.readyInMinutes })}
        >
            <FontAwesomeIcon icon={faStarSolid}/>
            <span>Remove from Favorites</span>
        </div>
    ) : (
        <div
            className="favorite-text not-favorite"
            onClick={() => recipeInformation && removeFavorite(recipeInformation.id)}
        >
            <FontAwesomeIcon icon={faStarRegular}/>
            <span>Add to Favorites</span>
        </div>
    );

    console.log(recipeInformation);

    return (
        <div className="recipe-page">
            {recipeInformation ? 
                <div className="recipe-information-content">
                    <div className="main-wrapper">
                        <img src={recipeInformation.image} className="recipe-img" alt={recipeInformation.title}/>
                        <h1>{recipeInformation.title}</h1>
                        {favoriteElement}
                    </div>
                    <div className="similar-recipes"/>
                </div>
            : message ?
                <p className="info-message">{message}</p>
            :
                <Loading/>
            }
        </div>
    );
}

export default withRouter(RecipePage);