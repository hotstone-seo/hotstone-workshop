import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from '../App';

// const tags = window.__data.tags
// console.log(">>> TAGS: ", tags)
ReactDOM.hydrate(
    <BrowserRouter>
        <App data={window.__data} />
    </BrowserRouter>,
    document.getElementById('root')
);
