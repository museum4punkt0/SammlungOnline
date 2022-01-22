import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TextSectionData,
  TextSection,
  HighlightService,
  useConfigLoader,
} from 'src';

import {
  CarouselImageCard,
  ICarouselImageCardProps,
  CarouselHeadline,
  Carousel,
  useWidth,
  EBreakpoints,
  LoadingSpinner,
} from 'src';

import useStyles from './researchSection.jss';

function ResearchSection({
  textSectionData,
}: {
  textSectionData: TextSectionData;
}): ReactElement {
  const highlightsService = new HighlightService();
  const { loading, contextData } = highlightsService.getHighlightsObjects();
  const { config } = useConfigLoader();
  const { t } = useTranslation();

  const width = useWidth();
  const slidesToShowMap: Record<EBreakpoints, number> = {
    xs: 1,
    sm: 3,
    md: 4,
    lg: 6,
    xl: 6,
  };
  const slidesToShow = slidesToShowMap[width];

  const classes = useStyles();

  return (
    <div
      className={classes.content}
      style={{ backgroundColor: textSectionData.moduleBackgroundColor }}
    >
      <TextSection textSectionData={textSectionData} isWrapped={true} />

      <div>
        <CarouselHeadline
          href={config.RESEARCH_DOMAIN}
          color={textSectionData.titleColor}
        >
          {t('highlights from the collection')}
        </CarouselHeadline>
        {loading && (
          <div className={classes.loaderContainer}>
            <LoadingSpinner />
          </div>
        )}
        {!loading && (
          <Carousel
            color={'#000'}
            getControlsContainerStyles={(key) => {
              switch (key) {
                case 'CenterLeft':
                  return {
                    top: '100px',
                  };
                default:
                  return {
                    top: '100px',
                  };
              }
            }}
            cellSpacing={12}
            slidesToShow={slidesToShow}
          >
            {contextData.map((item: ICarouselImageCardProps, index: number) => {
              return <CarouselImageCard key={index} {...item} />;
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default ResearchSection;
