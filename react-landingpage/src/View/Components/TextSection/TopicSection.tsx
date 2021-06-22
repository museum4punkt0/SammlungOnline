import React, { ReactElement } from 'react';
import { TextSectionData } from './TextSectionContext';
import TextSection from './TextSection';
import TopicsService from '../../../Services/TopicsService';
import { LinkBuilder } from '../../../Util/LinkBuilder';
import useConfigLoader from '../../../Util/ConfigLoader';
import { TopicsCollectionContextData } from '../../../Services/TopicsService';
import { CarouselHeadline, Carousel, CollectionCard } from 'smb-react-components-library';
import { useTranslation } from 'react-i18next';

const cardCollection = (contextData: Array<TopicsCollectionContextData>, navigator: LinkBuilder) => {
    return contextData.map((topic: TopicsCollectionContextData, i: number) => {
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

function TopicSection({ textSectionData }: { textSectionData: TextSectionData }): ReactElement {
    const toppicsService = new TopicsService();
    const { contextData } = toppicsService.getTopics();
    const { config } = useConfigLoader();
    const navigator = new LinkBuilder();
    const { t } = useTranslation();

    const collections = cardCollection(contextData, navigator);

    return (
        <TextSection textSectionData={textSectionData}>
            <div style={{ marginTop: '2rem' }}>
                <CarouselHeadline color={textSectionData.titleColor} href={config.TOPICS_DOMAIN}>
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
        </TextSection>
    );
}

export default TopicSection;
