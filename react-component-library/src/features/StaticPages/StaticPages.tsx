/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { ReactElement } from 'react';
import ReactPlayer from 'react-player';

import './static-pages.scss';

import LanguageService from '../../utils/LanguageService';
import { loadConfig } from '../../config/index';

function StaticPages({ content }: { content: any }): ReactElement {
  function createMarkup(value: string) {
    const externSvg = `<svg
  className={classes.svg}
  xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 195 191"
>
  <g fill="#000">
    <path d="M185.818,0.161 L128.778,0.161 C123.807,0.161 119.778,4.19 119.778,9.161 C119.778,14.132 123.807,18.161 128.778,18.161 L164.09,18.161 L77.79,104.461 C74.275,107.976 74.275,113.674 77.79,117.189 C79.548,118.946 81.851,119.825 84.154,119.825 C86.457,119.825 88.76,118.946 90.518,117.189 L176.818,30.889 L176.818,66.202 C176.818,71.173 180.847,75.202 185.818,75.202 C190.789,75.202 194.818,71.173 194.818,66.202 L194.818,9.162 C194.818,4.19 190.789,0.161 185.818,0.161 Z" />
    <path d="M149,75.201 C144.029,75.201 140,79.23 140,84.201 L140,172.657 L18,172.657 L18,50.657 L111.778,50.657 C116.749,50.657 120.778,46.628 120.778,41.657 C120.778,36.686 116.749,32.657 111.778,32.657 L9,32.657 C4.029,32.657 0,36.686 0,41.657 L0,181.657 C0,186.628 4.029,190.657 9,190.657 L149,190.657 C153.971,190.657 158,186.628 158,181.657 L158,84.201 C158,79.23 153.971,75.201 149,75.201 Z" />
  </g>
</svg></a> `;
    const regex = /<\/a>/g;
    const formattedText = value.replace(regex, `${externSvg}`);
    return { __html: formattedText };
  }

  const matomoLang = LanguageService.getDefaultLanguage();
  const currentLang = LanguageService.getCurrentStrapiLanguage();
  const config = loadConfig(process.env.REACT_APP_STAGE ?? null);
  const matomoParams = `?module=CoreAdminHome&action=optOut&language=${matomoLang}&backgroundColor=&fontColor=&fontSize=16px&fontFamily=Arial`;

  return (
    <section className={'static-pages'} data-testid={'page-privacy-wrapper'}>
      <div className={'static-pages__content'}>
        <h1 className={`static-pages__header`}>{content.title}</h1>
        {content.block.length > 0 && (
          <>
            {content.block.map(
              (
                row: {
                  text: string;
                  assetBaseUrl: string;
                  id: number;
                  assets: any[];
                  videoAssets: any[];
                },
                index: number,
              ) => {
                return (
                  <div
                    className={`static-pages__innerContent`}
                    key={`page-block-${index}-${row.id}`}
                  >
                    {currentLang === 'de-DGS' && row.videoAssets.length > 0 && (
                      <div className={'static-pages__asset'}>
                        {row.videoAssets.map((asset: any, index: number) => (
                          <ReactPlayer
                            key={`video-${index}`}
                            className={'video-card__player'}
                            url={`${row.assetBaseUrl}${asset.attributes.url}`}
                            controls
                          />
                        ))}
                      </div>
                    )}
                    <div
                      key={`page-block-${index}-${row.id}`}
                      className={`static-pages__rich-text`}
                      dangerouslySetInnerHTML={createMarkup(row.text)}
                    />
                    {row.assets.length > 0 && (
                      <div className={'static-pages__asset'}>
                        {row.assets.map((asset: any, index: number) => (
                          <img
                            key={`image_${index}`}
                            src={`${row.assetBaseUrl}${asset.attributes.url}`}
                            alt={asset.attributes.alternativeText}
                            width="243"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </>
        )}

        {content.matomo && (
          <iframe
            className={'static-pages__iframe'}
            src={`${config.MATOMO_URL}${matomoParams}`}
          ></iframe>
        )}
      </div>
    </section>
  );
}

export default StaticPages;
