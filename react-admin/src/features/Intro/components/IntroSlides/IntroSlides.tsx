import React from 'react';

import { Resource } from 'react-admin';
import IntroSlidesList from './List/IntroSlidesList';
import IntroSlidesCreate from './Create/IntroSlidesCreate';
import IntroSlidesEdit from './Edit/IntroSlidesEdit';
import IntroSlidesShow from './Show/IntroSlidesShow';

const IntroSlidesResource = (
    <Resource
        name={'smb_intro_slides'}
        list={IntroSlidesList}
        create={IntroSlidesCreate}
        edit={IntroSlidesEdit}
        show={IntroSlidesShow}
        options={{ label: 'title.smb_intro_slides' }}
    />
);

export default IntroSlidesResource;
