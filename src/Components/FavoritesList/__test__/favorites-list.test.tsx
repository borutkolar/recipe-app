import React from 'react';
import ReactDOM from 'react-dom';
import FavoritesList from '..';
import { render, cleanup, within } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockFavorites } from '../../../mock-data';
import '@testing-library/jest-dom';

const setup = () => {
    const history = createMemoryHistory();
    const component = (
        <Router history={history}>
            <FavoritesList
                data={mockFavorites}
                removeFavorite={() => void 0}
            />
        </Router>
    );
    const utils = render(component);
    const input = utils.getByTestId('favorites-list');

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

it("renders title", () => {    
    const { getByText } = setup();
    expect(getByText(/favorite recipes/i)).toBeInTheDocument();
})

it("renders list of data", () => {
    const { getAllByTestId } = setup();
    const listItems = getAllByTestId('favorite-item');
    expect(listItems).toHaveLength(mockFavorites.length);
});