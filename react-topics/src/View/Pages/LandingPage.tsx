import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import SliderModule from '../Components/Slider/SliderModule';
// import Slide from '../Components/Slider/Slide';
// import CollectionsModule from '../Components/Collection/CollectionsModule';
import { useHistory, useLocation } from 'react-router-dom';
// import CollectionsContext, { CollectionsContextData } from '../Components/Collection/CollectionsContext';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import HighlightButton from '../Components/HighlightButton/HightlightButton';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import LinkTextCard from '../Components/LinkTextCard/LinkTextCard';
import TopicsService from '../../Services/TopicsService';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { LinkBuilder } from '../../Util/LinkBuilder';
import useConfigLoader from '../../Util/ConfigLoader';
import useDefaultStyles from '../../Themes/defaultStyles.jss';
import ImageUrlBuilder from '../../Util/ImageUrlBuilder';
import {
    Slider, Slide,
    CollectionsModule, CollectionsContext, ICollectionsContextData,
    IntroService, ITextSectionContextData, TextModuleType,
    GuideService
} from 'smb-react-components-library';
import useStyles from './landingPage.jss';

function LandingPage(): ReactElement {
    const classes = useStyles();
    const defaultClasses = useDefaultStyles();
    const { config } = useConfigLoader();
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const link = new LinkBuilder(config);

    const topicsService = new TopicsService();
    const { loading, contextData } = topicsService.getTopics();

    const guideService = new GuideService(new ImageUrlBuilder());
    // const { loading: introLoading, contextData: intoContextData } = guideService.getGuides(config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE, config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE);

    const introService = new IntroService(new ImageUrlBuilder());
    const { loading: introLoading, contextData: intoContextData } = introService.getIntroContextData(config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE);

    const textSectionContext: ITextSectionContextData = {
        sections: intoContextData.textModulesContextData,
    };
    console.log(textSectionContext)

    const onCollectionClick = (id: number, title: string): void => {
        history.push(`/collections/${id}/${title}`);
    };

    const collectionsContext: ICollectionsContextData = {
        collections: contextData,
        onCollectionClick: onCollectionClick,
    };

    useLayoutEffect(() => {
        if (contextData) {
            console.log(location.hash.slice(1));
            var element = document.getElementById(location.hash.slice(1));
            element?.scrollIntoView();
        }
    });

    if (loading || !contextData) {
        return (
            <div className={classes.content}>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <Grid>
            <div className={classes.content}>
                {contextData?.length > 1 &&
                    <React.Fragment>
                        <Slider autoplay enableKeyboardControls pauseOnHover>
                            {collectionsContext.collections.map((collectionContextData, index) => {
                                return (
                                    <Slide key={index} image={collectionContextData.previewImageSlider} >
                                        <div className={classes.slideTintCover}>
                                            <div className={classes.slideContentWrapper}>
                                                <div className={classes.slideContent}>
                                                    <Typography variant={'h2'}>{collectionContextData.title}</Typography>
                                                    <Typography
                                                        component="div"
                                                        variant={'h5'}
                                                        className={clsx(defaultClasses.highlightTxtBig, classes.slideContentSubtitle)}
                                                    >
                                                        {collectionContextData.subtitle}
                                                    </Typography>
                                                    <HighlightButton
                                                        caption={t('go to topic')}
                                                        onClick={(): void =>
                                                            link.toTopics(collectionContextData.id, collectionContextData.title)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Slide>
                                );
                            })}
                        </Slider>
                        <Grid container justify='center'>
                            <div id={'topics'} className={classes.collectionsModuleWrapper} style={{ padding: '2rem', maxWidth: '80rem' }}>
                                <CollectionsContext.Provider value={collectionsContext}>
                                    <CollectionsModule collectionModuleClasses={classes.collectionModule} />
                                </CollectionsContext.Provider>
                            </div>
                        </Grid>
                    </React.Fragment>
                }
                {intoContextData?.textModulesContextData &&
                    <div className={classes.outboundLinksModule}>
                        <Grid container spacing={4} direction={'row'} justify={'space-between'} alignItems={'center'}>
                            {textSectionContext.sections.map((section) => {
                                if (section.moduleType === TextModuleType.RESEARCH) {
                                    return (
                                        <Grid item={true} xs={12} sm={6}>
                                            <LinkTextCard
                                                ariaLabel={t('go to collection')}
                                                title={section.subtitle}
                                                subtitle={section.text}
                                                textColor={section.textAreaColor}
                                                textAreaColor={section.textColor}
                                                cardClasses={classes.discoverCollectionCardContent}
                                                onClick={() => link.toResearch()}
                                            />
                                        </Grid>
                                    )
                                } else if (section.moduleType === TextModuleType.GUIDE) {
                                    return (
                                        <Grid item={true} xs={12} sm={6}>
                                            <LinkTextCard
                                                ariaLabel={t('find tour"')}
                                                title={section.subtitle}
                                                subtitle={section.text}
                                                textColor={section.textColor}
                                                textAreaColor={section.textAreaColor}
                                                cardClasses={classes.findTourCardContent}
                                                onClick={() => link.toGuide()}
                                            />
                                        </Grid>
                                    )
                                }
                                return null
                            })}
                        </Grid>
                    </div>
                }
            </div>
        </Grid>
    );
}

export default LandingPage;
