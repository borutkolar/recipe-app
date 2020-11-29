import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from '..';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Favorites
            data={[]}
            removeFavorite={() => void 0}
        />,
        div)
    ;
});