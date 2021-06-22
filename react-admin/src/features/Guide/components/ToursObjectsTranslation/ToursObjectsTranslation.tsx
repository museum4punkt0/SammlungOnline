import React from 'react';

import { Resource } from 'react-admin';
import ToursObjectsList from '../ToursObjects/List/ToursObjectsList';
import ToursObjectsEdit from '../ToursObjects/Edit/ToursObjectsEdit';

const ToursObjectsTranslationResource = (
    <Resource
        name={'smb_tours_objects'}
        list={ToursObjectsList}
        edit={ToursObjectsEdit}
        options={{ label: 'title.smb_tours_objects' }}
    />
);

export default ToursObjectsTranslationResource;
