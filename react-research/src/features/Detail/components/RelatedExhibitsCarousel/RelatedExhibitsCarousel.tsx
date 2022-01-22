import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@material-ui/core';
import {
  Carousel,
  CarouselHeadline,
  CarouselImageCard,
  ExhibitModel,
  useWidth,
  EBreakpoints,
} from '@smb/smb-react-components-library';

import { useRelatedExhibits } from '../../hooks/use-related-exhibits.hook';
import { useDependency } from '../../../../context/dependency.context';

interface IRelatedExhibitsCarouselProps {
  exhibit: ExhibitModel;
}

const RelatedExhibitsCarousel: React.FC<IRelatedExhibitsCarouselProps> = ({
  exhibit,
}) => {
  const { imageUrlBuilder } = useDependency();

  const { t } = useTranslation();
  const width = useWidth();

  const { exhibits: relatedExhibits } = useRelatedExhibits(exhibit);

  const relatedObjectsWithImages = relatedExhibits.map((exhibit: ExhibitModel) => {
    const encodedTitle = encodeURIComponent(exhibit.title);
    const size = 200;

    return {
      img: imageUrlBuilder.createUrlFromTemplate(exhibit?.src ?? '', size, size),
      caption: exhibit.title || '',
      link: `/detail/${exhibit.id}/${encodedTitle})}`,
    };
  });

  if (!relatedExhibits.length) {
    return null;
  }

  const slidesToShowMap: Record<EBreakpoints, number> = {
    xs: 1,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  };
  const slidesToShow = slidesToShowMap[width];

  return (
    <Box paddingBottom={10}>
      <CarouselHeadline>{t('details.referencesToOtherExhibits')}</CarouselHeadline>
      <Carousel color="#000" cellSpacing={16} slidesToShow={slidesToShow}>
        {relatedObjectsWithImages.map((item, index) => {
          return (
            <CarouselImageCard
              key={index}
              img={item.img}
              link={item.link}
              caption={item.caption}
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default RelatedExhibitsCarousel;
