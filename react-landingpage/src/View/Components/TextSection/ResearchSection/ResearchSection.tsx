import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { TextSectionData } from '../TextSectionContext';
import TextSection from '../TextSection';
import HighlightsService from '../../../../Services/HighlightsService';
import useConfigLoader from '../../../../Util/ConfigLoader';

import {
    CarouselImageCard,
    ICarouselImageCardProps,
    CarouselHeadline,
    Carousel,
    useWidth, EBreakpoints, LoadingSpinner
} from 'smb-react-components-library';

import useStyles from "./researchSection.jss";

function ResearchSection({ textSectionData }: { textSectionData: TextSectionData }): ReactElement {
    const highlightsService = new HighlightsService();
    const { loading, contextData } = highlightsService.getHighlightsObjects();
    const { config } = useConfigLoader();
    const { t } = useTranslation();

    const width = useWidth();
    const slidesToShowMap: Record<EBreakpoints, number> = {
        xs: 1,
        sm: 3,
        md: 4,
        lg: 6,
        xl: 6
    }
    const slidesToShow = slidesToShowMap[width];

    const classes = useStyles();

    return (
        <TextSection textSectionData={textSectionData}>
            <div style={{ marginTop: '2rem' }} >
                <CarouselHeadline href={config.RESEARCH_DOMAIN} color={textSectionData.titleColor}>
                    {t('highlights from the collection')}
                </CarouselHeadline>
                {loading && <div className={classes.loaderContainer}>
                    <LoadingSpinner />
                </div>}
                {!loading && <Carousel
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
                </Carousel>}
            </div>
        </TextSection>
    );
}

export default ResearchSection;
