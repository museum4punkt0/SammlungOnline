/* eslint-disable */

import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// @ts-ignore The .tsx ending seems to be needed, not 100% sure why
import App from '../src/App.tsx';
import {
  ExhibitService,
  GraphqlService,
  loadConfig,
  ImageUrlBuilderService,
  LinkBuilder,
  ExhibitModel,
  AppStage,
} from '@smb/smb-react-components-library';

const PORT = 80;
const app = express();
app.use(express.static(path.resolve(__dirname, '../build')));

// This does the server-side rendering on the '/' route, works because we are a single page app
app.use('^/(.*)$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Could not render the app server-side');
    }
    const ssr = ReactDOMServer.renderToString(<App ssr={true} />);
    data = data.replace('<div id="root"></div>', `<div id="root">${ssr}</div>`);
    return res.send(data);
  });
});

app.use('/detail/:exhibitId/:exhibitTitle?', async (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Could not render the app server-side');
    }

    const config = loadConfig(AppStage.PRODUCTION);
    const gqlService = new GraphqlService(config.GRAPHQL_ENDPOINT);
    const imageBuilder = new ImageUrlBuilderService(config);
    const exhibitService = new ExhibitService(config, gqlService, imageBuilder);
    const exhibitId = req.params.exhibitId;

    exhibitService.findOne(exhibitId).then(exh => {
      const exhibit = exh instanceof ExhibitModel ? exh : undefined;
      const canonicalLink = new LinkBuilder().getPermalinkHref(exhibitId, exhibit?.title);
      const title =
        exhibit?.title?.replace(/["]/g, '') || 'Recherche | Staatliche Museen zu Berlin';
      const description = exhibit?.description?.formatted.substring(0, 300).replace(/["]/g, '');

      const ssr = ReactDOMServer.renderToString(<App ssr={true} />);
      data = data.replace('<div id="root"></div>', `<div id="root">${ssr}</div>`);

      let requestBody = {
        query: `
          query FetchObjectAttachments {
            smb_objects_by_pk(id: ${exhibitId}) {
              attachments(order_by: [{ primary: desc }, { attachment: asc }], limit: 1) {
                filename: attachment
              }
            }
          }`,
      };
      fetch(config.GRAPHQL_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }).then(gqlResponse => {
        gqlResponse.json().then(result => {
          let meta = '';
          // title
          meta += `<title>${title}</title>`;
          meta += `<meta property=\"title\" content="${title}" />`;
          meta += `<meta property=\"og:title\" content="${title}" />`;
          meta += `<meta name=\"twitter:title\" content="${title}" />`;
          // description
          if (description) {
            meta += `<meta name="description" content="${description}" />`;
            meta += `<meta property="og:description" content="${description}" />`;
            meta += `<meta name="twitter:description" content="${description}" />`;
          }
          // link
          meta += `<link rel="canonical" href="${canonicalLink}" />`;
          meta += `<meta property=\"og:url\" content="${canonicalLink}" />`;
          // image
          const image = result?.data?.smb_objects_by_pk?.attachments[0];
          if (image?.filename && image.filename.indexOf('restricted') === -1) {
            const img = imageBuilder.buildUrl(image.filename, 1200, 630);
            meta += `<meta property=\"og:image\" content="${img}" />`;
            meta += `<meta name=\"twitter:image\" content="${img}" />`;
          }
          // more
          meta += `<meta name="twitter:card" content="summary"/>`;

          // finally done
          data = data.replace(/<title>.+?<\/title>/, '');
          data = data.replace(/<meta\s+name="description"\s+content=".+?"\s*\/?>/m, '');
          data = data.replace('<meta name="placeholder">', meta);
          return res.send(data);
        });
      });
    });
  });
});

app.use((req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Could not render the app server-side');
    }
    const ssr = ReactDOMServer.renderToString(<App ssr={true} />);
    data = data.replace('<div id="root"></div>', `<div id="root">${ssr}</div>`);
    return res.send(data);
  });
});

// This basically starts the app
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
