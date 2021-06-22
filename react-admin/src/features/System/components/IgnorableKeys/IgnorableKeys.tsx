import React from 'react';

import { Resource } from 'react-admin';
import IgnorableKeysList from './List/IgnorableKeysList';
import IgnorableKeysCreate from './Create/IgnorableKeysCreate';

const IgnorableKeysResource = (
    <Resource
        name={'smb_ignoreable_keys'}
        list={IgnorableKeysList}
        create={IgnorableKeysCreate}
        options={{ label: 'title.smb_ignoreable_keys' }}
    />
);

export default IgnorableKeysResource;
