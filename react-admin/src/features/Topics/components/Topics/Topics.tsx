import React from 'react';

import { Resource } from 'react-admin';
import TopicsList from './List/TopicsList';
import TopicsCreate from './Create/TopicsCreate';
import TopicsEdit from './Edit/TopicsEdit';
import TopicsShow from './Show/TopicsShow';

const TopicsResource = (
    <Resource
        name={'smb_topics'}
        list={TopicsList}
        create={TopicsCreate}
        edit={TopicsEdit}
        show={TopicsShow}
        options={{ label: 'title.smb_topics' }}
    />
);

export default TopicsResource;
