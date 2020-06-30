import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetWrapper } from '../hotstone'
import './index.css';
import App from '../App';

ReactDOM.hydrate(
    <HelmetWrapper tags={window.__data.tags}>
        <App />
    </HelmetWrapper>,
    document.getElementById('root')
);
