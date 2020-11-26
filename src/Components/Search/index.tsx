import React from 'react';
import './style.scss';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

function Search({ value, onChange }: Props) {
    return (
        <div className="search-input">
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={event => onChange(event.target.value)}
            />
        </div>
    )
}

export default Search;