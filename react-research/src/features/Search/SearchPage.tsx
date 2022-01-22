import React from 'react';

import { Grid } from '@material-ui/core';
import { ToursCarousel } from './components/ToursCarousel/ToursCarousel';
import { TopicsCarousel } from './components/TopicsCarousel/TopicsCarousel';
import SearchContainer from './components/SearchContainer/SearchContainer';

import useStyles from './searchPage.jss';
import {
  IntroService,
  Sections,
  TextModuleType,
  TextSectionContextData,
  useConfigLoader,
} from '@smb/smb-react-components-library';

const SearchPage: React.FC = () => {
  const classes = useStyles();
  const { config } = useConfigLoader();

  const introService = new IntroService(config);
  const { contextData } = introService.getIntroContextData();
  const textSectionContext: TextSectionContextData = {
    sections: contextData.textModulesContextData,
  };
  return (
    <div className={classes.content}>
      <SearchContainer />
      <Sections
        sections={textSectionContext.sections}
        allowedSectionTypes={[TextModuleType.TOPIC, TextModuleType.GUIDE]}
      ></Sections>
    </div>
  );
};

export default SearchPage;
