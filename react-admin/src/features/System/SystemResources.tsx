import React from 'react';

import { Resource } from 'react-admin';
import IgnorableKeysResource from './components/IgnorableKeys/IgnorableKeys';
import LanguageResource from './components/Language/Language';

const SystemResources = [
    IgnorableKeysResource,
    LanguageResource,
    <Resource name={'smb_objects'} />,
    <Resource name={'smb_attribute_translations'} />,
];

export default SystemResources;
