import path from 'path';
import express from 'express';
import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import { HotStoneClient } from 'hotstone-client';
import {HotStone} from '../hotstone'
import App from '../App';

// import htmlMiddleware from './middleware/html';
// import renderMiddleware from './middleware/render';

const publicPath = path.join(__dirname, '/public');
const app = express();

app.use(express.static(publicPath));
// app.use(htmlMiddleware());
// app.use(renderMiddleware());

const hotstoneURL = 'http://localhost:8089'
const clientKey = 'Otdu1qe.A5eKbNQ3Kj26kiTQmwWAmzaQGk5uYmSI'
const cacheConfig = { cacheManager: `./hotstone-local-cache` }
const client = new HotStoneClient(hotstoneURL, clientKey, cacheConfig);

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
    (async function () {
        try {
            const rule = await client.match(req.path);
            const tags = await client.tags(rule, "en_US");
            const data = { tags }

            const appString = ReactDOMServer.renderToString(
                <HotStone tags={tags}>
                    <App />
                </HotStone>
            );
            const helmet = Helmet.renderStatic();
            res.send(template({ body: appString, helmet: helmet }, data));
        } catch (error) {
            next(error);
        }
    })();
});

export default app;
