import React, { useState } from 'react';
import Search from '../../Components/Search';
import axios from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { IRecipe } from '../../interfaces';
import RecipeList from '../../Components/RecipeList';

const initialMessage = 'Start typing to search through the recipes!';

function HomePage() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [message, setMessage] = useState<string>(initialMessage);

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
    }

    const onSearchChange = (value: string) => {
        setSearchValue(value);

        if (value) {
            fetchRecipes(value);
        } else {
            setRecipes([]);
            setMessage(initialMessage);
        }
    }

    return (
        <div className="home-page">
            <Search
                value={searchValue}
                onChange={onSearchChange}
            />
            <p>{message}</p>
            <RecipeList recipes={recipes}/>
        </div> 
    );
}

export default HomePage;