import React, { ReactElement, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { getOrgUnitObject } from '../../config/orgUnitConfig';
import useConfigLoader from '../../hooks/useConfigLoader.hook';
import LanguageService from 'src/utils/LanguageService';

import './searchButtons.scss';

export interface IAssets {
  url: string;
}
export interface ISearchButtonsData {
  type: string;
  title: string;
  text: string;
  searchButtonGroupHeadline: {
    '0': { title: string };
    '1': { title: string };
    '2': { title: string };
  };
  assets: IAssets[];
}

function SearchButtons({ data }: { data: ISearchButtonsData }): ReactElement {
  const [links, setLinks] = useState<any[]>([]);
  const lang = LanguageService.getCurrentStrapiLanguage();

  useEffect(() => {
    const res = getOrgUnitObject();
    setLinks(res);
  }, []);

  const { config } = useConfigLoader();

  function createMarkup(richText: string) {
    return { __html: richText };
  }
  const getTextClassVariant = () => {
    return lang === 'de-LS' ? 'text-card__rich-text__leichte-sprache' : '';
  };
  return (
    <>
      <div className={'intro-section'}>
        <div className={'intro-section__divider'} />

        <Typography
          variant="h3"
          component={'h4'}
          className={'intro-section__title'}
        >
          {data.title}
        </Typography>

        {!data.assets.length && data?.text && (
          <Typography
            variant={'body2'}
            component={'div'}
            className={`intro-section__text ${getTextClassVariant()}`}
            dangerouslySetInnerHTML={createMarkup(data?.text)}
          />
        )}

        {data.assets.length > 0 && (
          <div className="video-card__video-conatiner intro-section__video">
            {data.assets.map((asset, index) => {
              return (
                <ReactPlayer
                  key={`video-search-buttons-block-${index}`}
                  className={'video-card__player'}
                  url={asset.url}
                  controls
                />
              );
            })}
          </div>
        )}

        {links.length > 0 &&
          links.map((level, index) => {
            return (
              data.searchButtonGroupHeadline[index].title && (
                <div
                  key={`level-${index}`}
                  className={'intro-section__links-wrapper'}
                >
                  <Typography variant={'h6'} component={'h5'}>
                    {`${data.searchButtonGroupHeadline[index].title}`}
                  </Typography>
                  <div className={'intro-section__links-container'}>
                    {level?.links.length &&
                      level?.links.map((link: any, index: number) => (
                        <React.Fragment
                          key={`sammlung_link_${index}_${link.name}`}
                        >
                          {link.isActive ? (
                            <Link
                              href={`${config.RESEARCH_DOMAIN}/?collectionKey=${link.value}`}
                              aria-label={`Suchen in ${link.name}`}
                              variant="body2"
                              rel="noopener noreferrer"
                              className="intro-section__link"
                            >
                              {link.name}
                            </Link>
                          ) : (
                            <span className="intro-section__link intro-section__link--inactive">
                              {link.name}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              )
            );
          })}
      </div>
    </>
  );
}

export default SearchButtons;
