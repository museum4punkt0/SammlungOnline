import React from 'react';

import { Resource } from 'react-admin';
import TopicsResource from './components/Topics/Topics';
import TopicsTranslationResource from './components/TopicsTranslation/TopicsTranslation';

const TopicsResources = [TopicsResource, TopicsTranslationResource, <Resource name={'smb_topics_objects'} />];

export default TopicsResources;
