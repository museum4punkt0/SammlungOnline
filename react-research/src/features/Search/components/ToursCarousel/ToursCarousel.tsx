import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CarouselHeadline, Carousel, CollectionCard } from 'smb-react-components-library';

import { useCoreContext } from '../../../../core/store/core.context';
import { useDependency } from '../../../../core/store/dependency.context';

const getCollectionDataGuide = (data: any, link: any): Array<any> => {
    return data.map((tour: any) => {
        return {
            title: tour.title,
            subtitle: tour.subtitle,
            tintColor: 'rgba(0, 0, 0, 0.5)',
            elementCount: tour.collectionObjects.length,
            onClick: () => link.toGuide(tour.id, tour.title),
            id: tour.id,
            image: tour.previewImageCard,
        };
    });
};

export const ToursCarousel = () => {
    const { configuration } = useCoreContext();
    const { toursService, linkBuilder } = useDependency();

    const { t } = useTranslation();
    const guides = toursService.getGuides().contextDataGuides;
    const guideCollections = useMemo(() => getCollectionDataGuide(guides, linkBuilder), [guides]);

    const visibleSlides = {
        xs: 1,
        sm: 2,
        lg: 2,
    };

    return (
        <>
            <CarouselHeadline color="#f25b5b" href={configuration.GUIDE_DOMAIN}>
                {t('search.guide.title')}
            </CarouselHeadline>
            <Carousel
                cellSpacing={32}
                visibleSlides={visibleSlides}
                color={'#f25b5b'}
                nextButtonAriaLabel={t('carousel.nextTour')}
                previousButtonAriaLabel={t('carousel.previousTour')}
            >
                {guideCollections.map((collection) => {
                    return (
                        <CollectionCard
                            {...collection}
                            key={collection.id}
                            actionText={t('collections module discover button')}
                            count={collection.elementCount}
                        />
                    );
                })}
            </Carousel>
        </>
    );
};
