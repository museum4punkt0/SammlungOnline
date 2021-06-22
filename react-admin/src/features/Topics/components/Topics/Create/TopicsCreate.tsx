import React from 'react';
import { ResourceComponentProps } from 'ra-core';

import { BooleanInput, Create, SimpleForm, TextInput } from 'react-admin';
import UnreferencedHint from '../../../../../shared/UnreferencedHint/UnreferencedHint';

const TopicsCreate: React.FC<ResourceComponentProps> = (props) => {
    // TODO: Image-Selection
    return (
        <Create {...props} title={'title.smb_topics'}>
            <SimpleForm>
                <BooleanInput source={'has_slide'} label={'field.has_slide'} />
                <TextInput source={'preview_image'} label={'field.preview_image'} />
                <UnreferencedHint />
            </SimpleForm>
        </Create>
    );
};
export default TopicsCreate;
