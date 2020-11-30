import React, { useState } from 'react';
import Search from '../../Components/Search';
import axios, { CancelTokenSource } from 'axios';
import { API_ENDPOINT, API_KEY } from '../../config';
import { IFavorite, IRecipe } from '../../interfaces';
import RecipeList from '../../Components/RecipeList';
import './style.scss';
import Loading from '../../Components/Loading';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const initialMessage = 'Start typing to search through the recipes!';
const initialResultsLimit = 15;

interface Props {
    favorites: IFavorite[];
    removeFavorite: (id: number) => void;
}

let cancel: CancelTokenSource | null = null;

function HomePage({ favorites, removeFavorite }: Props) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [message, setMessage] = useState<string>(initialMessage);
    const [resultsLimit, setResultsLimit] = useState<number>(initialResultsLimit);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchRecipes = async (query: string, limit: number) => {
        try {
            if (cancel) {
                cancel.cancel();
            }

            cancel = axios.CancelToken.source();
            const { data } = await axios.get(`${API_ENDPOINT}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${limit}`, { cancelToken: cancel.token });
            
            if (data && data.results && data.results.length) {
                setRecipes(data.results);
                setTotalResults(data.totalResults);
                setMessage('');
            } else {
                setRecipes([]);
                setTotalResults(0);
                setMessage('No recipes found.')
            }
        } catch(e) {
            if (!axios.isCancel(e)) {
                setRecipes([]);
                setTotalResults(0);
                setMessage('Failed to fetch search results.')
            }
        }

        setIsLoading(false);
    }

    const onSearchChange = (value: string) => {
        setSearchValue(value);

        if (value) {
            setIsLoading(true);
            setResultsLimit(initialResultsLimit);
            fetchRecipes(value, initialResultsLimit);
        } else {
            setRecipes([]);
            setMessage(initialMessage);
        }
    }

    const onLoadMore = () => {
        const newResultsLimit = resultsLimit + 15;
        setResultsLimit(newResultsLimit);
        setIsLoading(true);
        fetchRecipes(searchValue, newResultsLimit);
    }

    const showLoadMore = resultsLimit < totalResults;

    return (
        <div className="home-page" data-testid="home-page">
            <Link to="/favorites" className="favorites-title" data-testid="favorites-title">
                <div>
                    <AiFillStar/>
                    <span>Favorites</span>
                </div>
            </Link>
            <Search
                value={searchValue}
                onChange={onSearchChange}
            />
            <RecipeList
                favorites={favorites}
                message={message}
                recipes={recipes}
                removeFavorite={removeFavorite}
            />
            {showLoadMore && (
                <div className="load-more">
                    <button onClick={onLoadMore}>LOAD MORE</button>
                </div>
            )}
            {isLoading && <Loading/>}
        </div> 
    );
}

export default HomePage;