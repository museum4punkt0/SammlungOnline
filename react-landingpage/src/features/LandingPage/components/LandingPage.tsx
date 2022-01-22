import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

import {
  LoadingSpinner,
  Slider,
  Slide,
  TopicSection,
  TextModuleType,
  TextSection,
  TextSectionContextData,
  TextSectionData,
  ResearchSection,
  GuideSection,
  Sections,
  IntroService,
  useConfigLoader,
} from '@smb/smb-react-components-library';
import useStyles from './landingPage.jss';

function LandingPage(): ReactElement {
  const classes = useStyles();
  const { config } = useConfigLoader();

  const introService = new IntroService(config);
  const { loading, contextData } = introService.getIntroContextData();

  const textSectionContext: TextSectionContextData = {
    sections: contextData.textModulesContextData,
  };

  if (loading) {
    return (
      <div data-testid={'page-loading-spinner-wrapper'}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div data-testid={'page-content-wrapper'}>
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
      <Sections sections={textSectionContext.sections}></Sections>
    </div>
  );
}

export default LandingPage;
