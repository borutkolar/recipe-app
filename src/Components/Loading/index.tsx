import React from 'react';
import './style.scss';

function Loading() {
    return (
        <div className="loading-overlay">
            <div className="lds-ripple">
                <div/>
                <div/>
            </div>
        </div>
    );
}

export default Loading;