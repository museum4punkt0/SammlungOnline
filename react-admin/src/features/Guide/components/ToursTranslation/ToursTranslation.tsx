import React from 'react';

import { Resource } from 'react-admin';
import ToursObjectsTranslationList from '../ToursObjectsTranslation/List/ToursObjectsTranslationList';
import ToursObjectsTranslationEdit from '../ToursObjectsTranslation/Edit/ToursObjectsTranslationEdit';

const ToursTranslationResource = (
    <Resource
        name={'smb_tours_objects_translation'}
        list={ToursObjectsTranslationList}
        edit={ToursObjectsTranslationEdit}
        options={{ label: 'title.smb_tours_objects_translation' }}
    />
);

export default ToursTranslationResource;
