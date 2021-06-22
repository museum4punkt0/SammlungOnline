import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import useConfigLoader from '../../../Util/ConfigLoader';
import { LinkBuilder } from '../../../Util/LinkBuilder';
import TextSection from './TextSection';
import { TextSectionData } from './TextSectionContext';

import { CarouselHeadline, Carousel, CollectionCard } from 'smb-react-components-library';
import ImageUrlBuilder from '../../../Util/ImageUrlBuilder';
// import { ICollectionContextData } from '../../../Services/Interfaces/IGuideCollectionContextData';
// import GuideService from '../../../Services/GuideService';
import { GuideService, ICollectionContextData } from 'smb-react-components-library';

const cardCollection = (contextData: ICollectionContextData[], navigator: LinkBuilder) => {
    return contextData.map((tour: ICollectionContextData, i: number) => {
        return {
            title: tour.title,
            subtitle: tour.subtitle,
            image: tour.previewImageCard,
            tintColor: 'rgba(0, 0, 0, 0.5)',
            count: tour.collectionObjects.length,
            onClick: () => navigator.toGuide(tour.id, tour.title),
            id: tour.id,
        };
    });
};

function GuideSection({ textSectionData }: { textSectionData: TextSectionData }): ReactElement {
    const { config } = useConfigLoader();
    const navigator = new LinkBuilder();
    const { t } = useTranslation();
    const imageUrlBuilder = new ImageUrlBuilder();
    const guideService = new GuideService(imageUrlBuilder);
    const { loading, contextData } = guideService.getGuides(
        config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
        config.DATA_CONFIG.CAROUSEL_IMAGE_SIZE,
    );
    const collections = cardCollection(contextData, navigator);

    return (
        <TextSection textSectionData={textSectionData}>
            <div style={{ marginTop: '2rem' }}>
                <CarouselHeadline href={config.GUIDE_DOMAIN} color={textSectionData.titleColor}>
                    {t('routes in the collection')}
                </CarouselHeadline>
                <Carousel
                    cellSpacing={32}
                    visibleSlides={{
                        xs: 1,
                        sm: 2,
                        lg: 2,
                    }}
                >
                    {collections.map((collection) => {
                        return (
                            <CollectionCard
                                key={collection.id}
                                actionText={t('collections module discover button')}
                                {...collection}
                            ></CollectionCard>
                        );
                    })}
                </Carousel>
            </div>
        </TextSection>
    );
}

export default GuideSection;
