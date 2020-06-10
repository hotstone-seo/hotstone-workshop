import React from 'react';
import ReactDOM from 'react-dom';
import {HotStone} from 'hotstone-client'
import './index.css';
import App from '../App';

ReactDOM.hydrate(
    <HotStone tags={window.__data.tags}>
        <App />
    </HotStone>,
    document.getElementById('root')
);
