/* eslint-disable no-console */
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CommonTheme from '../../typografie/CommonTheme';
import Highlights from '../../components/Highlights';
import { HighlightsData } from '../../components/Highlights/typeInterface';

import Collections from '../../components/Collections';
import { CollectionsData } from '../../components/Collections/typeInterface';

import { VideoSection, IVideoSectionData } from '../../components/VideoSection';
import { ISearchButtonsData } from '../SearchButtons/SearchButtons';

import {
  SearchButtons,
  TextModuleType,
  TextSection,
  TextSectionData,
} from 'src';

import './scss/section-factory.scss';

function SectionFactory({
  textSectionData,
  pagination = false,
  hideInOverviewTopicStories = false,
  hasSvg,
  isFooter,
}: {
  children?: any;
  textSectionData: TextSectionData;
  pagination?: boolean;
  hideInOverviewTopicStories: boolean;
  sorting?: string;
  hasSvg?: boolean;
  isFooter?: boolean;
}) {
  const getSectionTheme = () => {
    let theme = '';
    switch (textSectionData.moduleType) {
      case TextModuleType.RESEARCH:
        theme = 'section--secondary';
        break;
      case TextModuleType.TOPIC:
        theme = 'section--tertiary';
        break;
      case TextModuleType.GUIDE:
        theme = 'section--quaternary';
        break;
      case TextModuleType.TEXT:
        theme = 'section--quinary';
        break;
      case TextModuleType.INTRO:
        theme = hasSvg ? `section--top-0 section--default` : 'section--default';
        break;
      default:
        theme = 'section--default';
        break;
    }
    return theme;
  };

  const getPaddingSettings = (hasSwiperBlock: boolean) => {
    return !hasSwiperBlock;
  };

  const getTextSectionBlock = (
    textBlockData: TextSectionData,
    index: number,
  ) => {
    return (
      <TextSection
        key={`text-section-${index}`}
        textSectionData={textBlockData}
        noPadding={getPaddingSettings(textSectionData.hasSwiperBlock)}
        isFooter={isFooter}
        target={pagination ? '' : '_blank'}
      />
    );
  };

  const getSearchButtonsSectionBlock = (
    searchBlockData: ISearchButtonsData,
    index: number,
  ) => {
    return (
      <SearchButtons
        key={`search-buttons-section-${index}`}
        data={searchBlockData}
      />
    );
  };

  const getHighlightsBlock = (
    highlightsBlockData: HighlightsData,
    index: number,
  ) => {
    return (
      <Highlights
        key={`highlights-section-${index}`}
        data={highlightsBlockData}
      />
    );
  };

  const getCollectionsBlock = (
    collectionsBlockData: CollectionsData,
    index: number,
  ) => {
    return (
      <Collections
        key={`collections-section-${index}`}
        data={collectionsBlockData}
        pagination={pagination}
        hideInOverviewTopicStories={hideInOverviewTopicStories}
      />
    );
  };

  const getVideoSectionBlock = (
    videoBlockData: IVideoSectionData,
    index: number,
  ) => {
    return (
      <VideoSection
        key={`video-section-${index}`}
        data={videoBlockData}
        noPadding={getPaddingSettings(textSectionData.hasSwiperBlock)}
        target={pagination ? '' : '_blank'}
      />
    );
  };

  return (
    <MuiThemeProvider theme={CommonTheme}>
      <section className={`section ${getSectionTheme()}`}>
        <div className={`section__content-container`}>
          {textSectionData?.sections &&
            textSectionData?.sections.map((blockData, index) => {
              switch (blockData.type) {
                case 'VideoBlock':
                  return getVideoSectionBlock(blockData, index);
                case 'TextBlock':
                  return getTextSectionBlock(blockData, index);
                case 'SearchButtonBlock':
                  return getSearchButtonsSectionBlock(blockData, index);
                case 'HighlightsBlock':
                  return getHighlightsBlock(blockData, index);
                case 'CollectionsBlock':
                  return getCollectionsBlock(blockData, index);
                default:
                  return (
                    <React.Fragment
                      key={`text-section-${index}`}
                    ></React.Fragment>
                  );
              }
            })}
        </div>
      </section>
    </MuiThemeProvider>
  );
}

export default SectionFactory;
