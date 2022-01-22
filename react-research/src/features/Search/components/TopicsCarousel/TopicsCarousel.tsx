import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CarouselHeadline,
  Carousel,
  CollectionCard,
} from '@smb/smb-react-components-library';

import { useCoreContext } from '../../../../context/core.context';
import { useDependency } from '../../../../context/dependency.context';
import { Link } from '@material-ui/core';

const getCollectionData = (data: any, link: any): Array<any> => {
  return data.map((item: any) => ({
    id: item.id,
    image: item.previewImageCard,
    title: item.title,
    subtitle: item.subtitle,
    tintColor: 'rgba(0, 0, 0, 0.5)',
    elementCount: item.collectionObjects?.length || 3,
    onClick: () => link.toTopics(item.id, item.title),
  }));
};

export const TopicsCarousel = () => {
  const { configuration } = useCoreContext();
  const { t } = useTranslation();

  const { topicsService, linkBuilder } = useDependency();

  const topics = topicsService.getTopics().contextData;
  const topicsCollections = useMemo(
    () => getCollectionData(topics, linkBuilder),
    [topics],
  );

  const visibleSlides = {
    xs: 1,
    sm: 2,
    lg: 2,
  };

  return (
    <>
      <CarouselHeadline color="#f9ff04" href={configuration.TOPICS_DOMAIN}>
        {t('search.topics.title')}
      </CarouselHeadline>
      <Carousel
        color="#f9ff04"
        cellSpacing={32}
        visibleSlides={visibleSlides}
        nextButtonAriaLabel={t('carousel.nextTopic')}
        previousButtonAriaLabel={t('carousel.previousTopic')}
      >
        {topicsCollections.map((collection) => {
          const mouseClickHandler = (event: React.MouseEvent<HTMLElement>) =>
            event.preventDefault();
          return (
            <Link
              onClick={mouseClickHandler}
              href={linkBuilder.getTopicsLink(collection.id, collection.title)}
              key={collection.id}
              style={{ textDecoration: 'none' }}
            >
              <CollectionCard
                {...collection}
                actionText={t('collections module discover button')}
                count={collection.elementCount}
              />
            </Link>
          );
        })}
      </Carousel>
    </>
  );
};
