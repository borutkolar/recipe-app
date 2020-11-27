import React, { useState } from 'react';
import Search from '../../Components/Search';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { IFavorite, IRecipe } from '../../interfaces';
import RecipeList from '../../Components/RecipeList';
import './style.scss';
import Loading from '../../Components/Loading';

const initialMessage = 'Start typing to search through the recipes!';

interface Props {
    favorites: IFavorite[];
    addFavorite: (item: IFavorite) => void;
    removeFavorite: (name: string) => void;
}

function HomePage({ favorites, addFavorite, removeFavorite }: Props) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [message, setMessage] = useState<string>(initialMessage);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchRecipes = async (query: string) => {
        try {
            const recipesRequest = await axios.get(`${API_ENDPOINT}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`);
            if (recipesRequest.data && recipesRequest.data.results && recipesRequest.data.results.length) {
                setRecipes(recipesRequest.data.results);
                setMessage('');
            } else {
                setRecipes([]);
                setMessage('No recipes found.')
            }
        } catch(e) {
            setMessage('Failed to fetch search results.')
        }

        setIsLoading(false);
    }

    const onSearchChange = (value: string) => {
        setSearchValue(value);

        if (value) {
            setIsLoading(true);
            fetchRecipes(value);
        } else {
            setRecipes([]);
            setMessage(initialMessage);
        }
    }

    return (
        <div className="home-page">
            <button onClick={() => addFavorite({ name: 'Test', preparationTime: 30 })}>ADD TO FAVORITE</button>
            <Search
                value={searchValue}
                onChange={onSearchChange}
            />
            {message ?
                <p className="info-message">{message}</p>
            :
                <RecipeList recipes={recipes}/>
            }
            {isLoading && <Loading/>}
        </div> 
    );
}

export default HomePage;