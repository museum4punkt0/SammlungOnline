import React from 'react';

import { Resource } from 'react-admin';
import IntroSlidesResource from './components/IntroSlides/IntroSlides';
import IntroTextModules from './components/IntroTextModules/IntroTextModules';
import IntroTextModuleTranslation from './components/IntroTextModuleTranslation/IntroTextModuleTranslation';
import IntroSlidesTranslation from './components/IntroSlidesTranslation/IntroSlidesTranslation';

const IntroResources = [
    IntroSlidesResource,
    IntroSlidesTranslation,
    IntroTextModules,
    IntroTextModuleTranslation,
    <Resource name={'smb_intro_text_module_type'} />,
];

export default IntroResources;
