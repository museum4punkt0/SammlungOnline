import React, { ReactElement } from 'react';
import {
  CarouselHeadline,
  Carousel,
  CollectionCard,
  TextSection,
  TextSectionData,
  TopicCollectionContextData,
  TopicService,
  useConfigLoader,
} from 'src';
import { useTranslation } from 'react-i18next';
import useStyles from './topicsSection.jss';
import { LinkBuilder } from 'src/utils/LinkBuilder';

const cardCollection = (
  contextData: Array<TopicCollectionContextData>,
  navigator: LinkBuilder,
) => {
  return contextData.map((topic: TopicCollectionContextData) => {
    return {
      title: topic.title,
      subtitle: topic.subtitle,
      tintColor: 'rgba(0, 0, 0, 0.5)',
      count: topic.collectionObjects.length,
      onClick: () => navigator.toTopics(topic.id, topic.title),
      id: topic.id,
      image: topic.previewImageCard,
    };
  });
};

function TopicSection({
  textSectionData,
}: {
  textSectionData: TextSectionData;
}): ReactElement {
  const toppicService = new TopicService();
  const { contextData } = toppicService.getTopics();
  const { config } = useConfigLoader();
  const navigator = new LinkBuilder();
  const { t } = useTranslation();

  const collections = cardCollection(contextData, navigator);
  const classes = useStyles();
  return (
    <div
      className={classes.content}
      style={{ backgroundColor: textSectionData.moduleBackgroundColor }}
    >
      <TextSection textSectionData={textSectionData} isWrapped={true} />
      <div>
        <CarouselHeadline
          color={textSectionData.titleColor}
          href={config.TOPICS_DOMAIN}
        >
          Themen aus den Sammlungen
        </CarouselHeadline>
        <Carousel
          cellSpacing={32}
          color={textSectionData.titleColor}
          visibleSlides={{
            xs: 1,
            sm: 2,
            lg: 2,
          }}
        >
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              actionText={t('collections module discover button')}
              {...collection}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default TopicSection;
