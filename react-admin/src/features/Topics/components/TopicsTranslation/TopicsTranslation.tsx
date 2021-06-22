import React from 'react';

import { Resource } from 'react-admin';
import TopicsTranslationsList from './List/TopicsTranslationsList';
import TopicsTranslationsEdit from './Edit/TopicsTranslationsEdit';

const TopicsTranslationResource = (
    <Resource
        name={'smb_topics_translations'}
        list={TopicsTranslationsList}
        edit={TopicsTranslationsEdit}
        options={{ label: 'title.smb_topics_translations' }}
    />
);

export default TopicsTranslationResource;
