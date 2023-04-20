/* eslint-disable no-console */
import React, { ReactElement, useState } from 'react';
import { CarouselHeadline, useConfigLoader } from 'src';
import { useTranslation } from 'react-i18next';

import { CollectionCard } from '../../features/collection/components/CollectionCard/CollectionCardNew';
import Pagination from '../Pagination';

import CollectionsPagination from '../CollectionsPagination';
import { SwiperCarousel } from '../../features/index';
import { CollectionsData } from './typeInterface';
import { getCollections } from './serviceHelper';
import DropdownFilters from '../../features/DropdownFilters/DropdownFilters';

import './collections.scss';

function Collections({
  pagination,
  hideInOverviewTopicStories,
  paginationData,
  data,
}: {
  hideInOverviewTopicStories: boolean;
  pagination?: boolean;
  paginationData?: { section: string; limit: number };
  data: CollectionsData;
}): ReactElement {
  const [offset, setOffset] = useState(0);
  const [storiesPlatform, setStoriesPlatform] = useState('all');
  const [sorting, setSorting] = useState('last');
  const { t } = useTranslation();
  const { config } = useConfigLoader();
  const collections = getCollections(
    hideInOverviewTopicStories,
    data?.slug,
    data?.cta,
    storiesPlatform,
  );

  const paginationLimit =
    paginationData && paginationData?.limit ? paginationData?.limit : 8;

  const getTitleHref = () => {
    switch (data.slug) {
      case 'INTRO':
        return config.INTRO_DOMAIN;
      case 'RESEARCH':
        return config.RESEARCH_DOMAIN;
      case 'TOPIC':
        return config.TOPICS_DOMAIN;
      case 'GUIDE':
        return config.GUIDE_DOMAIN;
      default:
        return '';
    }
  };

  const getSectionSlug = () => {
    switch (data.slug) {
      case 'RESEARCH':
        return 'research-pair';
      case 'TOPIC':
        return 'topics-pair';
      case 'GUIDE':
        return 'guide-pair';
      case 'INTRO':
      default:
        return '';
    }
  };

  const onChange = (value: number) => {
    setOffset(value);
    const bodyRect = document.body.getBoundingClientRect();
    const elRect = document
      .querySelector('#filters-section')
      ?.getBoundingClientRect();
    if (elRect && bodyRect) {
      window.scrollTo({
        top: elRect.top - bodyRect.top - 32,
        behavior: 'smooth',
      });
    }
  };

  const getPaginatedCollections = (sorting: string) => {
    const paginatedCollections = collections.cards
      ? [...collections.cards]
      : [];

    switch (sorting) {
      case 'last':
        paginatedCollections.sort((a: any, b: any) => {
          if (a.publishedAt > b.publishedAt) {
            return -1;
          }
          if (a.publishedAt < b.publishedAt) {
            return 1;
          }

          return -1;
        });
        break;
      case 'desc':
        paginatedCollections.sort((a: any, b: any) => {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }

          return -1;
        });
        break;
      case 'asc':
        paginatedCollections.sort((a: any, b: any) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }

          return 1;
        });
        break;

      default:
        break;
    }

    return paginatedCollections.slice(offset, offset + paginationLimit);
  };

  const getFilters = () => {
    const SORTING_FILTERS = {
      label: t('stt.sorting.label'),
      iconPosition: 'end',
      options: [
        {
          title: t('stt.sorting.latest'),
          value: 'last',
          id: 'last',
        },
        {
          title: t('stt.sorting.asc'),
          value: 'asc',
          id: 'asc',
        },
        {
          title: t('stt.sorting.desc'),
          value: 'desc',
          id: 'desc',
        },
      ],
    };

    if (collections && collections?.filters) {
      return {
        filters: {
          ...collections?.filters,
          default: 0,
        },
        sorting: {
          ...SORTING_FILTERS,
          default: 0,
        },
      };
    }
  };

  const onFilterSelect = (val: string) => {
    setStoriesPlatform(val);
  };

  const onSortingSelect = (val: string) => {
    setSorting(val);
  };

  const renderSection = (pagination: boolean | undefined) => {
    if (pagination) {
      return (
        <>
          <div className="collections">
            <CarouselHeadline
              assets={data.assets}
              href={getTitleHref()}
              text={data.text}
              link={false}
            >
              {data.title}
            </CarouselHeadline>
            {Object.keys(collections?.filters).length > 0 &&
              collections?.filters?.options.length > 1 && (
                <>
                  <DropdownFilters
                    data={getFilters()}
                    onFilterSelect={onFilterSelect}
                    onSortingSelect={onSortingSelect}
                  />

                  {sorting && collections.cards.length > 0 && (
                    <CollectionsPagination
                      data={getPaginatedCollections(sorting)}
                    />
                  )}
                  <Pagination
                    limit={paginationLimit}
                    total={collections.cards.length}
                    offset={offset}
                    section={'pagination.section'}
                    onOffsetChange={(offset: number) => {
                      onChange(offset);
                    }}
                  />
                </>
              )}
          </div>
        </>
      );
    }
    return (
      <>
        {collections.cards && collections.cards.length > 0 && (
          <div className="collections">
            <CarouselHeadline
              assets={data.assets}
              href={getTitleHref()}
              text={data.text}
              link={false}
            >
              {data.title}
            </CarouselHeadline>

            <SwiperCarousel
              data={collections.cards as any}
              type="pair"
              sliderComponent={CollectionCard}
              section={getSectionSlug()}
            />
          </div>
        )}
      </>
    );
  };

  return <>{renderSection(pagination)}</>;
}

export default Collections;
