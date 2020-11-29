import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IFavorite, IRecipeInformation, ISimilarRecipe } from '../../interfaces';
import Loading from '../../Components/Loading';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { CgTimer } from 'react-icons/cg'
import { HiUserGroup } from 'react-icons/hi';
import './style.scss';
import SimilarRecipes from '../../Components/SimilarRecipes';

interface Props extends RouteComponentProps<{ id: string }> {
    favorites: IFavorite[];
    addFavorite: (item: IFavorite) => void;
    removeFavorite: (id: number) => void;
}

function RecipePage({ favorites, match, addFavorite, removeFavorite }: Props) {
    const [recipeInformation, setRecipeInformation] = useState<IRecipeInformation | null>(null);
    const [recipeInformationMessage, setRecipeInformationMessage] = useState<string>('');
    const [similarRecipes, setSimilarRecipes] = useState<ISimilarRecipe[]>([]);
    const [similarRecipesMessage, setSimilarRecipesMessage] = useState<string>('');
    const [recipeInformationLoading, setRecipeInformationLoading] = useState<boolean>(true);
    const [similarRecipesLoading, setSimilarRecipesLoading] = useState<boolean>(true);

    const fetchRecipeInformation = useCallback(async () => {
        setRecipeInformationLoading(true);
        
        try {
            const { data } = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/information?apiKey=${API_KEY}`);
            if (data && data.id) {
                setRecipeInformation(data)
            }
        } catch(e) {
            setRecipeInformationMessage('Failed to fetch recipe information.')
        }

        setRecipeInformationLoading(false);
    }, [match.params.id])

    const fetchSimilarRecipes = useCallback(async () => {
        setSimilarRecipesLoading(true);

        try {
            const { data } = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/similar?apiKey=${API_KEY}`);
            if (data && data.length) {
                setSimilarRecipes(data);
                setSimilarRecipesMessage('');
            } else {
                setSimilarRecipes([]);
                setSimilarRecipesMessage('No similar recipes found.');
            }
        } catch(e) {
            setSimilarRecipesMessage('Failed to fetch recipe information.')
        }

        setSimilarRecipesLoading(false);
    }, [match.params.id])
    
    useEffect(() => {
        fetchRecipeInformation();
        fetchSimilarRecipes();
    }, [fetchRecipeInformation, fetchSimilarRecipes]);

    const favoriteElement = (recipeInformation && favorites.find(f => f.id === recipeInformation.id)) ? (
        <div
            className="favorite-text is-favorite"
            onClick={() => removeFavorite(recipeInformation.id)}
        >
            <AiFillStar/>
            <span>Remove from Favorites</span>
        </div>
    ) : (
        <div
            className="favorite-text not-favorite"
            onClick={() => recipeInformation && addFavorite({ id: recipeInformation.id, name: recipeInformation.title, preparationTime: recipeInformation.readyInMinutes })}
        >
            <AiOutlineStar/>
            <span>Add to Favorites</span>
        </div>
    );

    return (
        <div className="recipe-page" data-testid="recipe-page">
            {recipeInformation ? 
                <div className="recipe-information-content">
                    <div className="main-wrapper">
                        <img
                            src={recipeInformation.image}
                            className="recipe-img"
                            alt={recipeInformation.title}
                            data-testid="recipe-img"
                        />
                        <h1>{recipeInformation.title}</h1>
                        {favoriteElement}
                        <div className="icon-text-row">
                            <CgTimer/>
                            <span>{`${recipeInformation.readyInMinutes} minutes (preparation time)`}</span>
                        </div>
                        <div className="icon-text-row">
                            <HiUserGroup/>
                            <span>{`${recipeInformation.servings} (servings)`}</span>
                        </div>
                        <p>{recipeInformation.instructions}</p>
                    </div>
                    <SimilarRecipes
                        data={similarRecipes}
                        favorites={favorites}
                        message={similarRecipesMessage}
                        removeFavorite={removeFavorite}
                    />
                </div>
            :
                <p className="info-message">{recipeInformationMessage}</p>
            
            }
            {(recipeInformationLoading || similarRecipesLoading) && <Loading/>}
        </div>
    );
}

export default withRouter(RecipePage);