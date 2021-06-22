import React from 'react';

import { Resource } from 'react-admin';
import IntroTextModulesList from './List/List';
import IntroTextModulesCreate from './Create/IntroTextModulesCreate';
import IntroTextModulesEdit from './Edit/IntroTextModulesEdit';
import IntroTextModulesShow from './Show/IntroTextModulesShow';

const IntroTextModulesResource = (
    <Resource
        name={'smb_intro_text_modules'}
        list={IntroTextModulesList}
        create={IntroTextModulesCreate}
        edit={IntroTextModulesEdit}
        show={IntroTextModulesShow}
        options={{ label: 'title.smb_intro_text_modules' }}
    />
);

export default IntroTextModulesResource;
