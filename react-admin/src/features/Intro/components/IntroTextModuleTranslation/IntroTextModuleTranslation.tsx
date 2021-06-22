import React from 'react';

import { Resource } from 'react-admin';
import IntroTextModuleTranslationsList from './List/IntroTextModuleTranslationsList';
import IntroTextModuleTranslationsEdit from './Edit/IntroTextModuleTranslationsEdit';

const IntroTextModuleTranslationResource = (
    <Resource
        name={'smb_intro_text_module_translations'}
        list={IntroTextModuleTranslationsList}
        edit={IntroTextModuleTranslationsEdit}
        options={{ label: 'title.smb_intro_text_module_translations' }}
    />
);

export default IntroTextModuleTranslationResource;
