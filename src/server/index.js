import path from 'path';
import express from 'express';
import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import { HotStoneClient } from 'hotstone-client';
import { HelmetWrapper } from '../hotstone'
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
const fetchOpts = { cacheManager: `./hotstone-local-cache` }
const client = new HotStoneClient(hotstoneURL, clientKey, fetchOpts);

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
            const headerParams = {
              channelId: "WEB",
              currency: "IDR",
              customerSessionId: "d41d8cd98f00b204e9800998ecf8427e",
              isVerifiedPhoneNumber: "false",
              lang: "en",
              requestId: "23123123",
              serviceId: "gateway",
              storeId: "TIKETCOM",
              "true-client-ip": "192.168.1.1",
              "user-agent": "Chrome",
              username: "username",
              "x-forwarded-host": "192.168.1.1",
            }
            const rule = await client.match(req.path);
            const tags = await client.tags(rule, "en_US", headerParams);
            const data = { tags }

            const appString = ReactDOMServer.renderToString(
                <HelmetWrapper tags={tags}>
                    <App />
                </HelmetWrapper>
            );
            const helmet = Helmet.renderStatic();
            res.send(template({ body: appString, helmet: helmet }, data));
        } catch (error) {
            console.error('Log err: ', error)
            next(error);
        }
    })();
});

export default app;
