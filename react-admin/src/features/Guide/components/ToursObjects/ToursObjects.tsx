import React from 'react';

import { Resource } from 'react-admin';
import ToursTranslationList from '../ToursTranslation/List/ToursTranslationList';
import ToursTranslationEdit from '../ToursTranslation/Edit/ToursTranslationEdit';

const ToursObjectsResource = (
    <Resource
        name={'smb_tours_translation'}
        list={ToursTranslationList}
        edit={ToursTranslationEdit}
        options={{ label: 'title.smb_tours_translation' }}
    />
);

export default ToursObjectsResource;
