import React from 'react';
import ReactDOM from 'react-dom';
import SimilarRecipes from '..';
import { render, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockFavorites, mockSimilarRecipes } from '../../../mock-data';
import '@testing-library/jest-dom';

const setup = () => {
    const history = createMemoryHistory();
    const component = (
        <Router history={history}>
            <SimilarRecipes
                data={mockSimilarRecipes}
                favorites={mockFavorites}
                message=""
                removeFavorite={() => void 0}
            />
        </Router>
    );
    const utils = render(component);
    const input = utils.getByTestId('similar-recipes');

    return {
        component,
        input,
        ...utils
    }
}

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement('div');
    const { component } = setup();
    ReactDOM.render(component, div);
});

it("renders list of data", () => {
    const { getAllByTestId } = setup();
    const listItems = getAllByTestId('favorite-item');
    expect(listItems).toHaveLength(mockSimilarRecipes.length);
    // listItems.forEach((item, index) => {
    //     const { getByText } = within(item);
    //     const { readyInMinutes, title } = mockSimilarRecipes[index];
    //     expect(getByText(title)).toBeInTheDocument();
    //     expect(getByText(readyInMinutes.toString(), { exact: false })).toBeInTheDocument();
    // })
});

// it("renders favorite icon if item is favorite", () => {
//     const { getAllByTestId } = setup();
//     const listItems = getAllByTestId('favorite-item');
//     expect(listItems).toHaveLength(mockSimilarRecipes.length);
//     listItems.forEach((item, index) => {
//         const { queryByTestId } = within(item);
//         const { id } = mockSimilarRecipes[index];
//         const isFavorite = mockFavorites.find(m => m.id === id);
//         isFavorite ? expect(queryByTestId('favorite-icon')).toBeTruthy() : expect(queryByTestId('favorite-icon')).toBeFalsy();
//     })
// });

it("renders message if no data", () => {
    const history = createMemoryHistory();
    const component = (
        <Router history={history}>
            <SimilarRecipes
                data={[]}
                favorites={mockFavorites}
                message=""
                removeFavorite={() => void 0}
            />
        </Router>
    );
    
    const { getByText } = render(component);
    expect(getByText(/no similar recipes/i)).toBeInTheDocument();
})