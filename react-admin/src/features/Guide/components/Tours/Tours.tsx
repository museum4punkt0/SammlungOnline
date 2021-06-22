import React from 'react';

import { Resource } from 'react-admin';
import ToursList from './List/ToursList';
import ToursCreate from './Create/ToursCreate';
import ToursEdit from './Edit/ToursEdit';

const ToursResource = (
    <Resource
        name={'smb_tours'}
        list={ToursList}
        create={ToursCreate}
        edit={ToursEdit}
        options={{ label: 'title.smb_tours' }}
    />
);

export default ToursResource;
