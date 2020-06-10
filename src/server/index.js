import path from 'path';
import express from 'express';
import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import App from '../App';

// import htmlMiddleware from './middleware/html';
// import renderMiddleware from './middleware/render';

const publicPath = path.join(__dirname, '/public');
const app = express();

app.use(express.static(publicPath));
// app.use(htmlMiddleware());
// app.use(renderMiddleware());

const template = ({ body, helmet }, data) => {
    return `
      <!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${helmet.script.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${body}</div>
          <script>window.__data = ${serialize(data)}</script>
        </body>
      </html>
    `
}

app.get('*', (req, res, next) => {
    (async function() {
      try {
        const data = {}

        const appString = ReactDOMServer.renderToString(<App />);
        const helmet = Helmet.renderStatic();
   
        res.send(template({ body: appString, helmet: helmet }, data));
      } catch(error) {
        next(error);
      }
    })();
   });

export default app;
