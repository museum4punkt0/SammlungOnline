import React, { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';

// SMB Components
import { GuideService, Slider, Slide, CollectionsModule, ICollectionsContextData, CollectionsContext } from 'smb-react-components-library';
// import { SliderModule } from '../Components/Slider';
// import Slide from '../Components/Slider/Slide';
import HighlightButton from '../Components/HighlightButton/HightlightButton';
import { TextBoxModule } from '../Components/TextBox';
import { TextSectionContextData } from '../Components/TextBox/TextBoxContext';

// Materialui Components
import { Typography } from '@material-ui/core';

// import GuideService from '../../Services/GuideService';
import IntroService from '../../Services/IntroService';

import { LinkBuilder } from '../../Util/LinkBuilder';

import useStyles from './landingPage.jss';
import ImageUrlBuilder from '../../Util/ImageUrlBuilder';
import useConfigLoader from '../../Util/ConfigLoader';



function LandingPage(): ReactElement {
    const { config } = useConfigLoader();
    const classes = useStyles();
    const { t } = useTranslation();

    const link = new LinkBuilder();

    const [activeIndex, setActiveIndex] = useState(0);

    const onCollectionClick = (id: number, title: string): void => {
        link.toGuide(id, title)
    };

    const guideService = new GuideService(new ImageUrlBuilder());
    const { loading, contextData } = guideService.getGuides(config.DATA_CONFIG.COLLECTION_CARD_IMAGE_SIZE, config.DATA_CONFIG.SLIDER_IMAGE_SIZE);

    const collectionsContext: ICollectionsContextData = {
        collections: contextData,
        onCollectionClick: onCollectionClick,
    };

    const introService = new IntroService();
    const { textContextData } = introService.getIntroContextData();
    const textSectionContext: TextSectionContextData = {
        sections: textContextData.textModulesContextData,
    };

    return (
        <div className={classes.content}>
            {!loading && (
                <Slider autoplay enableKeyboardControls pauseOnHover >
                    {collectionsContext.collections.map((tour, index) => {
                        return (
                            <Slide key={index} image={tour.previewImageSlider}>
                                <div className={classes.slideTintCover}>
                                    <div className={classes.slideContentWrapper}>
                                        <div className={classes.slideContent}>
                                            {/* TODO replace collectionContext to get subtitle of tour nicer */}
                                            {/* TODO tour.previewImageMediaPlayer == tour subtitle */}
                                            <Typography
                                                variant={'overline'}
                                                color={'secondary'}
                                                className={classes.slideTitle}
                                            >{tour.previewImageMediaPlayer}</Typography>
                                            <Typography
                                                variant={'h2'}
                                                className={classes.slideTitle}
                                            >{tour.title}</Typography>
                                            <Typography
                                                variant={'h5'}
                                            >
                                                {tour.subtitle}
                                            </Typography>
                                            <HighlightButton
                                                caption={t('go to tour')}
                                                onClick={() => link.toGuide(tour.id, tour.title)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                        );
                    })}
                </Slider>
            )}

            {!loading && (
                <CollectionsContext.Provider value={collectionsContext}>
                    <div style={{ padding: 10 }}>
                        <CollectionsModule collectionModuleClasses={classes.collectionModule} />
                    </div>
                </CollectionsContext.Provider>
            )}

            {/* <TextSectionContext.Provider value={textSectionContext}> */}
            <TextBoxModule sections={textSectionContext.sections} />
            {/* </TextSectionContext.Provider> */}
        </div>
    );
}

export default LandingPage;