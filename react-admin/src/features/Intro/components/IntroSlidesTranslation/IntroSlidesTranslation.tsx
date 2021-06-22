import React from 'react';

import { Resource } from 'react-admin';
import IntroSlidesTranslationList from './List/IntroSlidesTranslationList';
import IntroSlidesTranslationEdit from './Edit/IntroSlidesTranslationEdit';

const IntroSlidesTranslationResource = (
    <Resource
        name={'smb_intro_slide_translations'}
        list={IntroSlidesTranslationList}
        edit={IntroSlidesTranslationEdit}
        options={{ label: 'title.smb_intro_slide_translations' }}
    />
);

export default IntroSlidesTranslationResource;
