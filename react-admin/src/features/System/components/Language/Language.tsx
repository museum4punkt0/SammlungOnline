import React from 'react';

import { Resource } from 'react-admin';
import LanguageList from './List/LanguageList';
import LanguageCreate from './Create/LanguageCreate';
import LanguageEdit from './Edit/LanguageEdit';

const LanguageResource = (
    <Resource
        name={'smb_language'}
        list={LanguageList}
        create={LanguageCreate}
        edit={LanguageEdit}
        options={{ label: 'title.smb_language' }}
    />
);

export default LanguageResource;
