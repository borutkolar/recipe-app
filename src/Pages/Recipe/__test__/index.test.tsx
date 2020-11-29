import React from 'react';
import RecipePage from '..';
import { mockFavorites, mockRecipeInformation, mockRecipes } from "../../../mock-data";
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import { cleanup, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setup = () => {
    const history = createMemoryHistory();
    const component = (
        <Router history={history}>
            <RecipePage
                addFavorite={() => void 0}
                favorites={mockFavorites}
                removeFavorite={() => void 0}
            />
        </Router>
    );
    const utils = render(component);

    return {
        component,
        ...utils
    }
}

afterEach(cleanup);

test('renders recipe information', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRecipeInformation });
    const { getByTestId, getByText } = setup();
    
    await waitFor(() => expect(getByTestId('recipe-page')).toBeInTheDocument());    
    await waitFor(() => expect(getByText(mockRecipeInformation.title)).toBeTruthy());
    await waitFor(() => expect(getByTestId('recipe-img')).toHaveAttribute('src', mockRecipeInformation.image));
    await waitFor(() => expect(getByText(mockRecipeInformation.instructions)).toBeTruthy());
    await waitFor(() => expect(getByText(mockRecipeInformation.readyInMinutes.toString(), { exact: false })).toBeTruthy());
    await waitFor(() => expect(getByText(`${mockRecipeInformation.servings} (servings)`)).toBeTruthy());
});

test('renders error message', async () => {
    mockedAxios.get.mockRejectedValue({});
    const { getByTestId, getByText } = setup();
    
    await waitFor(() => expect(getByTestId('recipe-page')).toBeInTheDocument());    
    await waitFor(() => expect(getByText(/failed to fetch/i)).toBeTruthy());
});