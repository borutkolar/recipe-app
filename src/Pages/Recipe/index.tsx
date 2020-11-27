import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IRecipeInformation } from '../../interfaces';

function RecipePage({ match }: RouteComponentProps<{ id: string }>) {
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
            const similarRecipesRequest = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/similar?apiKey=${API_KEY}`);
            console.log(similarRecipesRequest.data);
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

    return (
        <div className="recipe-page">RECIPE PAGE</div>
    );
}

export default withRouter(RecipePage);