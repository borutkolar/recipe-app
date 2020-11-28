import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IFavorite, IRecipeInformation } from '../../interfaces';
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

const mockRecipeInformation: IRecipeInformation = {
    id: 123,
    image: 'https://iheartumami.com/wp-content/uploads/2020/04/Paleo-Tuna-Pasta-I-Heart-Umami-2.jpg',
    instructions: `First, boil a big pot of water and cook the spaghetti, following the package instructions. If going low carb, see the next section below for an alternative method.
    In the meantime, lightly mash the canned tuna and combine with all the other ingredients in a large heat-proof bowl. Set the bowl on the stovetop next to the pasta boiler pot. This will warm up the tuna and the spices in the bowl gently and the tuna stays moist.
    Add the spaghetti into the tuna bowl. Toss and add the freshly chopped herbs. Season with salt and pepper to taste.`,
    readyInMinutes: 20,
    servings: 2,
    title: 'Pasta with Tuna'
}

const mockSimilarRecipes: IFavorite[] = [
    {
        id: 1,
        name: 'Pasta with salsa',
        preparationTime: 10
    },
    {
        id: 2,
        name: 'Pasta with chicken',
        preparationTime: 25
    },
    {
        id: 3,
        name: 'Pasta with zucchini',
        preparationTime: 30
    }
]

function RecipePage({ favorites, match, addFavorite, removeFavorite }: Props) {
    const [recipeInformation, setRecipeInformation] = useState<IRecipeInformation | null>(mockRecipeInformation);
    const [recipeInformationMessage, setRecipeInformationMessage] = useState<string>('');
    const [similarRecipesMessage, setSimilarRecipesMessage] = useState<string>('');
    
    // useEffect(() => {
    //     const fetchRecipeInformation = async () => {
    //         try {
    //             const recipeInformationRequest = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/information?apiKey=${API_KEY}`);
    //             if (recipeInformationRequest.data && recipeInformationRequest.data.id) {
    //                 setRecipeInformation(recipeInformationRequest.data)
    //             }
    //         } catch(e) {
    //             setMessage('Failed to fetch recipe information.')
    //         }
    //     }
    
    //     const fetchSimilarRecipes = async () => {
    //         try {
    //             // const similarRecipesRequest = await axios.get(`${API_ENDPOINT}/recipes/${match.params.id}/similar?apiKey=${API_KEY}`);
    //             // console.log(similarRecipesRequest.data);
    //             // if (recipeInformationRequest.data && recipeInformationRequest.data.id) {
    //             //     setRecipeInformation(recipeInformationRequest.data)
    //             // }
    //         } catch(e) {
    //             // setMessage('Failed to fetch recipe information.')
    //         }
    //     }

    //     fetchRecipeInformation();
    //     fetchSimilarRecipes();
    // }, [match.params.id]);

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
        <div className="recipe-page">
            {recipeInformation ? 
                <div className="recipe-information-content">
                    <div className="main-wrapper">
                        <img src={recipeInformation.image} className="recipe-img" alt={recipeInformation.title}/>
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
                        data={mockSimilarRecipes}
                        favorites={favorites}
                        message={similarRecipesMessage}
                        removeFavorite={removeFavorite}
                    />
                </div>
            : (recipeInformationMessage && similarRecipesMessage) ?
                <p className="info-message">{recipeInformationMessage}</p>
            :
                <Loading/>
            }
        </div>
    );
}

export default withRouter(RecipePage);