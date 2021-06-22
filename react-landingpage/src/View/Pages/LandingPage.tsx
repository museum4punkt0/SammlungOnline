import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


import IntroService from '../../Services/IntroService';
import TextSectionContext, { TextSectionContextData } from '../Components/TextSection/TextSectionContext';
import TextSectionModule from '../Components/TextSection/TextSectionModule';

import { LoadingSpinner, Slider, Slide } from 'smb-react-components-library';
import { useTranslation } from 'react-i18next';
import useStyles from './landingPage.jss';

function LandingPage(): ReactElement {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const [activeIndex, setActiveIndex] = useState(0);
    const introService = new IntroService();
    const { loading, contextData } = introService.getIntroContextData();

    const textSectionContext: TextSectionContextData = {
        sections: contextData.textModulesContextData,
    };

    if (loading) {
        return (
            <div>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            <Slider enableKeyboardControls pauseOnHover>
                {contextData.sliderContextData.map((introSlider, index) => (
                    <Slide key={index} image={introSlider.slideImage}>
                        <div className={classes.slideContentWrapper}>
                            <div className={classes.slideContent}>
                                <Typography variant={'h2'} className={classes.slideTitleTypo}>
                                    {introSlider.slideText}
                                </Typography>
                            </div>
                        </div>
                    </Slide>
                ))}
            </Slider>
            {/* <CollectionsContext.Provider value={collectionsContext}> */}
            <TextSectionContext.Provider value={textSectionContext}>
                <TextSectionModule />
            </TextSectionContext.Provider>
            {/* </CollectionsContext.Provider> */}
        </div>
    );
}

export default LandingPage;
